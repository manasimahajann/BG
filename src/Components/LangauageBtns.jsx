import {useState} from "react"

function LangauageBtns({onLanguageChange}) {
	const [language, setLanguage] = useState("Sanskrit")
	return (
		<>
			<div className="heading">
				<div className="flex justify-between">
					<div className="heading font-bold">Bhagvad Gita</div>

					<div className="flex justify-end">
						<button
							className="heading-border flex justify-end "
							onClick={() => {
								const newLang = language === "Sanskrit" ? "English" : "Sanskrit"
								setLanguage(newLang)
								onLanguageChange(newLang)
							}}
						>
							{language.slice(0, 2)}
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default LangauageBtns
