import React, {useEffect, useState} from "react"
import MusicHandler from "./MusicHandler"
import {MdKeyboardArrowLeft} from "react-icons/md"
import {MdKeyboardArrowRight} from "react-icons/md"
import {MdKeyboardDoubleArrowRight} from "react-icons/md"
import {MdKeyboardDoubleArrowLeft} from "react-icons/md"
import all_verses from "../../total.json"
import {useNavigate} from "react-router-dom"

function Play({verse, selectedLanguage, verses_g}) {
	const navigate = useNavigate()
	const [verses, setVerses] = useState(verses_g)
	const [chapterClick, setChapterClick] = useState(verses_g.chapter_id)

	const [currentVerse, setCurrentVerse] = useState(verse)

	const language = selectedLanguage

	const handleVerseClick = (verseNum) => {
		const verseSelected = verses.find(
			(shloka) => shloka.verse_number === verseNum
		)
		setCurrentVerse(verseSelected)
	}
	useEffect(() => {
		const handleBackButton = (event) => {
			// Example: Navigate to home on back button press
			navigate("/")
		}
		window.addEventListener("popstate", handleBackButton)
		return () => window.removeEventListener("popstate", handleBackButton)
	}, [navigate])

	useEffect(() => {
		// Use filter to get an array of chapters that match the chapter ID
		const newChapterArray = all_verses.filter(
			(chapter) => chapter.chapter_id === chapterClick
		)

		if (newChapterArray.length > 0) {
			setVerses(newChapterArray)
			setCurrentVerse(newChapterArray[0])
		}
	}, [chapterClick])

	const handleVerseIncrement = () => {
		const verseSelected = verses.find(
			(shloka) => shloka.verse_number === currentVerse.verse_number + 1
		)
		Object.keys(verses).length !== currentVerse.verse_number &&
			setCurrentVerse(verseSelected)
	}
	const handleVerseDecrement = () => {
		const verseSelected = verses.find(
			(shloka) => shloka.verse_number === currentVerse.verse_number - 1
		)

		currentVerse.verse_number !== 1 && setCurrentVerse(verseSelected)
	}
	return (
		<>
			<div className="h-10  w-[90%] flex items-center justify text-orange-500 text-lg">
				{/* <FaArrowLeft onClick={goToHome} className=" cursor-pointer" /> */}

				<div className="flex-grow text-center font-bold">
					{`BG ${currentVerse.chapter_id + "." + currentVerse.verse_number}`}
				</div>
			</div>

			<div className="w-[100%] m-1 h-[13rem] text-lg text-orange-500 font-semibold bg-white shadow-sm rounded-lg px-5 py-4 transition-transform transform overflow-hidden items-start flex flex-col music-handler-container">
				{currentVerse !== null
					? language === "Sanskrit"
						? currentVerse.text
								.split("\n\n")
								.map((line, index) => <p key={index}>{line}</p>)
						: currentVerse.transliteration
								.split("\n")
								.map((line, index) => <p key={index}>{line}</p>)
					: "run into issue"}
			</div>
			<br />

			{currentVerse !== null ? (
				<div className="flex flex-wrap justify-center gap-1 mb-5 ">
					<MusicHandler url={currentVerse.Play} />
				</div>
			) : (
				"music handler not working"
			)}

			<p className="text-orange-500 m-1 font-bold text-center text-xl flex">
				<MdKeyboardDoubleArrowLeft
					className="mt-1.5 mr-2"
					onClick={() => {
						if (currentVerse.chapter_id > 1) {
							setChapterClick(currentVerse.chapter_id - 1)
						}
					}}
				/>

				{`Chapter ${currentVerse.chapter_id}`}
				<MdKeyboardDoubleArrowRight
					className="mt-1.5 ml-2"
					onClick={() => {
						if (currentVerse.chapter_id > 0 && currentVerse.chapter_id < 18) {
							setChapterClick(currentVerse.chapter_id + 1)
						}
					}}
				/>
			</p>

			<div className="flex text-orange-500 font-semibold text-center text-x items-center mb-1">
				<MdKeyboardArrowLeft
					className="mr-2 cursor-pointer hover:scale-110"
					onClick={() => handleVerseDecrement()}
					size={20}
				/>
				<p className="">{`Verse ${currentVerse.verse_number}`}</p>
				<MdKeyboardArrowRight
					className="ml-2 cursor-pointer hover:scale-110"
					onClick={() => handleVerseIncrement()}
					size={20}
				/>
			</div>

			<div className="grid grid-cols-6 gap-1 w-[50%] mx-auto mb-5 ">
				{verses.map((verse, i) => (
					<span
						key={i}
						onClick={() => handleVerseClick(verse.verse_number)}
						className={`text-orange-500 px-1 py-1 font-bold text-center text-l border border-orange-300 ${
							currentVerse.verse_number === verse.verse_number
								? "bg-orange-500 text-white"
								: "text-orange-500"
						} hover:scale-110`}
					>
						{verse.verse_number}
					</span>
				))}
			</div>
		</>
	)
}

export default Play
