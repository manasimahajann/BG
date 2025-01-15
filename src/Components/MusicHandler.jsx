import React, {useEffect, useRef, useState} from "react"

import {FaPlay} from "react-icons/fa"
import {IoPauseSharp} from "react-icons/io5"
import {BsArrowRepeat} from "react-icons/bs"
import "./MusicHandler.css"
import {TbRewindForward10} from "react-icons/tb"
import {TbRewindBackward10} from "react-icons/tb"
import {openDB} from "idb"
function MusicHandler({url}) {
	const audioRef = useRef(null)

	const [progress, setProgress] = useState(0)
	const [duration, setDuration] = useState(0)

	const [isPlaying, setIsPlaying] = useState(true)
	const [isRepeating, setIsRepeating] = useState(false)

	const [isClickedB, setIsClickedB] = useState(false)
	const [isClickedF, setIsClickedF] = useState(false)

	const [currentUrl, setCurrentUrl] = useState(url) // Track the current URL
	const [isAudioReady, setIsAudioReady] = useState(false)

	const onPlayBtnChange = () => setIsPlaying((prev) => !prev)
	const onRepeatBtnChange = () => setIsRepeating((prev) => !prev)

	const handleTimeUpdate = () => {
		const currentTime = audioRef.current.currentTime

		setProgress((currentTime / duration) * 100)
	}
	const forwardByTenSeconds = () => {
		const newTime = audioRef.current.currentTime + 10
		if (isNaN(audioRef.current.duration) || audioRef.current.duration === 0) {
			console.warn("Audio duration is not available.")
			return
		}

		if (newTime <= audioRef.current.duration) {
			try {
				audioRef.current.currentTime = newTime

				const progressValue = (newTime / audioRef.current.duration) * 100

				setProgress(progressValue)

				// Temporarily set the clicked state to true
				setIsClickedF(true)
			} catch (error) {
				console.error("Error setting currentTime:", error)
			}
		} else {
			console.warn("Cannot seek beyond the duration of the audio.")
		}

		setTimeout(() => {
			setIsClickedF(false)
		}, 500)
	}
	const backwardByTenSeconds = () => {
		const newTime = audioRef.current.currentTime - 10
		audioRef.current.currentTime = newTime
		setProgress((newTime / duration) * 100)
		// Temporarily set the clicked state to true
		setIsClickedB(true)

		// Reset the state after 500ms (adjust as needed)
		setTimeout(() => {
			setIsClickedB(false)
		}, 500)
	}

	const handleLoadedMetadata = () => setDuration(audioRef.current.duration || 0)

	const handleProgressClick = (event) => {
		const clickX = event.nativeEvent.offsetX

		const width = event.target.clientWidth

		const newTime = (clickX / width) * duration
		if (audioRef.current.readyState > 0) {
			audioRef.current.currentTime = newTime
		} else {
			console.warn("Audio not ready")
		}
	}

	const handleAudioEnd = () => {
		audioRef.current.currentTime = 0
		setProgress(0)
		setIsPlaying(false)
	}
	const initDB = async () => {
		return openDB("AudioDB", 1, {
			upgrade(db) {
				if (!db.objectStoreNames.contains("verses")) {
					const store = db.createObjectStore("verses", {keyPath: "id"})
					store.createIndex("datetime", "datetime")
					store.createIndex("clicks", "clicks")
				}
			},
		})
	}

	// Save file to IndexedDB
	const saveToDB = async (id, fileBlob) => {
		const db = await initDB()
		const datetime = new Date().toISOString()
		const data = {id, fileBlob, datetime, clicks: 1}
		await db.put("verses", data)
	}

	// Effect for handling audio source change
	useEffect(() => {
		if (url !== currentUrl) {
			setCurrentUrl(url)
			setIsAudioReady(false) // Reset readiness
		}
	}, [url])

	const getId = (currentUrl) => {
		const match = String(currentUrl).match(/Ch(\d+)S(\d+)/)
		if (match) {
			const chapter = match[1].padStart(2, "0") // Add leading zero to chapter
			const shloka = match[2].padStart(2, "0") // Add leading zero to shloka
			let id = `${chapter}${shloka}`

			return id
		}
	}
	const handleDownload = async (currentUrl) => {
		try {
			const response = await fetch(currentUrl)

			const id = getId(currentUrl)
			const db = await initDB()
			const record = await db.get("verses", id)

			if (!record) {
				const blob = await response.blob()
				await saveToDB(id, blob)
			}
		} catch (error) {
			console.error("Error downloading MP3:", error)
		}
	}
	const getFromDB = async (id) => {
		const db = await initDB()
		return db.get("verses", id)
	}
	const incrementClicks = async (id) => {
		const db = await initDB()
		const record = await db.get("verses", id)
		if (record) {
			record.clicks += 1
			await db.put("verses", record)
		}
	}
	const handlePlay = async (currentUrl) => {
		let id = getId(currentUrl)
		const record = await getFromDB(id)
		if (record) {
			incrementClicks(id)
			const url = URL.createObjectURL(record.fileBlob)
			audioRef.current.src = url
			return true
		} else {
			audioRef.current.src = currentUrl

			setTimeout(async () => {
				await handleDownload(currentUrl)
			}, 0) // Defer to the next event loop cycle
		}
	}
	const clearExcessAudioChunks = async () => {
		try {
			// Open the database
			const db = await initDB()
			const transaction = db.transaction(["verses"], "readwrite")
			const store = transaction.objectStore("verses")

			// Fetch all records
			const allRecords = await store.getAll()

			if (allRecords.length > 30) {
				// Sort records by clicks (ascending) and datetime (oldest first)
				allRecords.sort((a, b) => {
					if (a.clicks !== b.clicks) {
						return a.clicks - b.clicks // Sort by clicks ascending
					}
					return new Date(a.datetime) - new Date(b.datetime) // Sort by datetime ascending
				})

				// Remove all but the top 2 records
				const recordsToRemove = allRecords.slice(0, allRecords.length - 30)

				for (const record of recordsToRemove) {
					await store.delete(record.id) // Delete each record
				}

				console.log(`Removed ${recordsToRemove.length} records.`)
			} else {
				console.log("No excess records to remove.")
			}

			transaction.oncomplete = () => {
				console.log("Database cleanup complete.")
			}

			transaction.onerror = (error) => {
				console.error("Error during transaction:", error.target.error)
			}
		} catch (error) {
			console.error("Error clearing excess audio chunks:", error)
		}
	}

	useEffect(() => {
		clearExcessAudioChunks()
	}, [])

	// Effect to initialize the audio when the URL changes
	useEffect(() => {
		const initializeAudio = async () => {
			if (audioRef.current) {
				audioRef.current.pause()
				await handlePlay(currentUrl)
				audioRef.current.load()
				setProgress(0)

				audioRef.current.oncanplay = () => {
					setIsAudioReady(true)
				}
			}
		}

		initializeAudio()
	}, [currentUrl])

	// Effect for controlling playback
	useEffect(() => {
		const controlAudio = async () => {
			if (audioRef.current) {
				if (isPlaying && isAudioReady) {
					try {
						await audioRef.current.play()
					} catch (err) {
						console.error("Error during play:", err)
					}
				} else {
					audioRef.current.pause()
				}
			}
		}
		controlAudio()
	}, [isPlaying, isAudioReady])
	return (
		<div className="music-handler-container">
			<audio
				preload="auto"
				ref={audioRef}
				autoPlay={false}
				loop={isRepeating}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onEnded={handleAudioEnd}
			>
				<source src={url} type="audio/mp3" />
				Your browser does not support the audio element.
			</audio>
			<div className="audio-controls">
				<button className="audio-button mr-3" onClick={backwardByTenSeconds}>
					<TbRewindBackward10
						className={isClickedB ? "text-blue-400" : "text-orange-500"}
					/>
				</button>

				<button className="audio-button" onClick={onPlayBtnChange}>
					{isPlaying ? (
						<IoPauseSharp className="text-orange-500" />
					) : (
						<FaPlay className="text-orange-500" />
					)}
				</button>
				<button className="audio-button" onClick={onRepeatBtnChange}>
					<BsArrowRepeat
						className={isRepeating ? "text-blue-400" : "text-orange-500"}
					/>
				</button>
				<button className="audio-button ml-3" onClick={forwardByTenSeconds}>
					<TbRewindForward10
						className={isClickedF ? "text-blue-400" : "text-orange-500"}
					/>
				</button>
			</div>
			<div className="progress-bar-container" onClick={handleProgressClick}>
				<div className="progress-bar" style={{width: `${progress}%`}}></div>
			</div>
		</div>
	)
}

export default MusicHandler
