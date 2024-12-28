import React, {useEffect, useState} from "react"
import all_verses from "../../total.json"
import Play from "./Play"
import {FaArrowLeft} from "react-icons/fa"

function Shlokas({chapter, selectedLanguage}) {
	const [verseClicked, setVerseClicked] = useState({})

	// const [playRepeat, setPlayRepeat] = useState(true)
	const goToHome = () => {
		window.location.reload() // Navigates to the Home component
	}
	const verses = all_verses.filter(
		(verse, i) => verse.chapter_id === chapter + 1
	)

	const handleVerseClicked = (verse) => {
		setVerseClicked(verse)
	}

	return (
		<>
			<div className="absolute left-0 text-orange-500 text-lg m-1 px-4 py-2 cursor-pointer hover:scale-105 hover:bg-gray-50">
				<FaArrowLeft onClick={goToHome} />
			</div>
			{Object.keys(verseClicked).length === 0 ? (
				verses.map((verse, i) => (
					<div
						key={i}
						onClick={() => handleVerseClicked(verse)}
						className="w-[95%] max-w-md h-auto m-1 text-orange-500 font-semibold bg-white border border-gray-300 shadow-sm text-left px-4 py-4 cursor-pointer transition-transform transform hover:scale-105 hover:bg-gray-50 overflow-hidden"
					>
						{selectedLanguage === "Sanskrit"
							? verse.text
									.split("\n\n")
									.map((line, idx) => <p key={idx}>{line}</p>)
							: verse.transliteration
									.split("\n")
									.map((line, idx) => <p key={idx}>{line}</p>)}
					</div>
				))
			) : (
				<>
					<Play
						verse={verseClicked}
						selectedLanguage={selectedLanguage}
						verses_g={verses}
					/>
				</>
			)}
		</>
	)
}

export default Shlokas
