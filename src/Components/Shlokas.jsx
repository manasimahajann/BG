import React, {useEffect, useState} from "react"
import all_verses from "../../total.json"
import Play from "./Play"
import {FaArrowLeft} from "react-icons/fa"
import {Link, useParams} from "react-router-dom"
import {useNavigate} from "react-router-dom"

function Shlokas() {
	const [verseClicked, setVerseClicked] = useState({})

	// const [playRepeat, setPlayRepeat] = useState(true)
	const {chapter, selectedLanguage} = useParams()
	const navigate = useNavigate()
	const chapterNum = Number(chapter) // Ensure it's a number

	const goToChapters = () => navigate("/BG/chapters")
	const verses = all_verses.filter(
		(verse, i) => verse.chapter_id === chapterNum + 1
	)

	return (
		<>
			<div className="flex flex-col items-center p-2">
				<div className="absolute left-0 text-orange-500 text-lg m-1 px-4 py-2 cursor-pointer hover:scale-105 hover:bg-gray-50">
					<FaArrowLeft onClick={goToChapters} />
				</div>
				{
					verses.map((verse, i) => (
						<Link
							key={i}
							// onClick={() => handleVerseClicked(verse)}
							to={`/${chapterNum}/verses/${i}/${selectedLanguage}`}
							className="w-[95%] max-w-md h-auto m-1 text-orange-500 font-semibold bg-white border border-gray-300 shadow-sm text-left px-4 py-4 cursor-pointer transition-transform transform hover:scale-105 hover:bg-gray-50 overflow-hidden"
						>
							{selectedLanguage === "Sanskrit"
								? verse.text
										.split("\n\n")
										.map((line, idx) => <p key={idx}>{line}</p>)
								: verse.transliteration
										.split("\n")
										.map((line, idx) => <p key={idx}>{line}</p>)}
						</Link>
					))
					//	)
					//	: (
					//		<>
					//</>			<Play
					//				verse={verseClicked}
					//				selectedLanguage={selectedLanguage}
					//				verses_g={verses}
					//</div>			/>
					//		</>
					//	)
				}
			</div>
		</>
	)
}

export default Shlokas
