import {useState} from "react"
import chapters from "../assets/chapers.json"
// import Shlokas from "./Shlokas"
import LangauageBtns from "./LangauageBtns"
const Gita = () => {
	const [selectedChapter, setSelectedChapter] = useState(null)
	const [selectedLanguage, setSelectedLanguage] = useState("Sanskrit")

	const handleChapterClick = (chapter) => {
		setSelectedChapter(chapter)
	}

	const handleLanguageChange = (selectedLanguage) => {
		setSelectedLanguage(selectedLanguage)
	}

	return (
		<div className="flex flex-col items-center">
			<LangauageBtns onLanguageChange={handleLanguageChange} />
			{selectedChapter === null
				? chapters.map((chapter, i) => (
						<p
							key={i}
							className="w-full max-w-xs h-auto m-1 text-orange-500 bg-white border border-gray-300 shadow-sm rounded-lg text-left px-4 py-2 cursor-pointer transition-transform transform hover:scale-105 hover:bg-gray-50 overflow-hidden"
							onClick={() => handleChapterClick(i)}
							style={{
								whiteSpace: "nowrap",
								textOverflow: "ellipsis",
								overflow: "hidden",
							}}
						>
							<span className="font-semibold">{chapter.chapter_number}</span> -{" "}
							{selectedLanguage === "Sanskrit"
								? chapter.name
								: chapter.name_transliterated}
						</p>
				  ))
				: {
						/* <Shlokas
					chapter={selectedChapter}
					selectedLanguage={selectedLanguage}
				/> */
				  }}
		</div>
	)
}

export default Gita
