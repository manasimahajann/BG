import {useState} from "react"
import Shlokas from "./Shlokas"
import LangauageBtns from "./LangauageBtns"
import Chapters from "./Chapters"
const Gita = () => {
	const [selectedLanguage, setSelectedLanguage] = useState("Sanskrit")

	const handleLanguageChange = (selectedLanguage) => {
		setSelectedLanguage(selectedLanguage)
	}
	return (
		<div className="flex flex-col items-center">
			<LangauageBtns onLanguageChange={handleLanguageChange} />
			<Chapters selectedLanguage={selectedLanguage} />
		</div>
	)
}

export default Gita
