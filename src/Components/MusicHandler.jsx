import React, {useEffect, useRef, useState} from "react"
import {FaPlay} from "react-icons/fa"
import {IoPauseSharp} from "react-icons/io5"
import {BsArrowRepeat} from "react-icons/bs"
import "./MusicHandler.css"
import {TbRewindForward10} from "react-icons/tb"
import {TbRewindBackward10} from "react-icons/tb"

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
		audioRef.current.currentTime = newTime
		setProgress((newTime / duration) * 100)
		// Temporarily set the clicked state to true
		setIsClickedF(true)

		// Reset the state after 500ms (adjust as needed)
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

	// Effect for handling audio source change
	useEffect(() => {
		if (url !== currentUrl) {
			setCurrentUrl(url)
			setIsAudioReady(false) // Reset readiness
		}
	}, [url])

	// Effect to initialize the audio when the URL changes
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.pause()
			audioRef.current.src = currentUrl
			audioRef.current.load() // Load the new audio source
			setProgress(0)

			audioRef.current.oncanplay = () => {
				setIsAudioReady(true) // Set ready when the audio can play
			}
		}
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
