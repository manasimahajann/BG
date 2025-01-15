import React, {useEffect, useState} from "react"
import {openDB} from "idb"

// Initialize IndexedDB
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
	const data = {id, fileBlob, datetime, clicks: 0}
	await db.put("verses", data)
}

// Get a file from IndexedDB
const getFromDB = async (id) => {
	const db = await initDB()
	return db.get("verses", id)
}

// Increment click count
const incrementClicks = async (id) => {
	const db = await initDB()
	const record = await db.get("verses", id)
	if (record) {
		record.clicks += 1
		await db.put("verses", record)
	}
}

const IndexedDBHandler = ({mp3Urls}) => {
	const [downloads, setDownloads] = useState([])

	// Download MP3 and save to IndexedDB
	const handleDownload = async (url, id) => {
		try {
			const response = await fetch(url)
			const blob = await response.blob()
			await saveToDB(id, blob)
			alert(`Downloaded and saved ${id} successfully.`)
		} catch (error) {
			console.error("Error downloading MP3:", error)
		}
	}

	// Play audio from IndexedDB

	useEffect(() => {
		setDownloads(mp3Urls)
	}, [mp3Urls])

	return (
		<div>
			<h2>Manage MP3 Files</h2>
			<ul>
				{downloads.map(({id, url}) => (
					<li key={id}>
						<span>{id}</span>
						<button onClick={() => handleDownload(url, id)}>Download</button>
						<button onClick={() => handlePlay(id)}>Play</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default IndexedDBHandler
