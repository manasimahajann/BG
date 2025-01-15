import React, {useEffect} from "react"
export const saveAudioChunks = async (url) => {
	const dbRequest = indexedDB.open("AudioDB", 1)

	dbRequest.onupgradeneeded = (event) => {
		const db = event.target.result
		if (!db.objectStoreNames.contains("audioChunks")) {
			db.createObjectStore("audioChunks", {keyPath: "id"})
		}
	}

	dbRequest.onsuccess = async (event) => {
		const db = event.target.result
		const response = await fetch(url)
		const reader = response.body.getReader()
		let chunkId = 0

		while (true) {
			const {done, value} = await reader.read()
			if (done) break

			const transaction = db.transaction("audioChunks", "readwrite")
			const store = transaction.objectStore("audioChunks")

			store.add({
				id: `${url}-${chunkId}`,
				chunk: value,
			})

			chunkId++
			await transaction.complete
		}
	}

	dbRequest.onerror = () => {
		console.error("Failed to open IndexedDB.")
	}
}
