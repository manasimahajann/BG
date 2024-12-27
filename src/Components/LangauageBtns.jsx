function LangauageBtns({onLanguageChange}) {
	return (
		<>
			<div className="flex mb-2">
				<div className="flex flex-grow text-center font-bold">
					<button
						className="w-full max-w-xs h-auto m-1 text-orange-500 bg-white border border-gray-300 shadow-sm rounded-lg text-left px-4 py-2 cursor-pointer transition-transform transform hover:scale-105 hover:bg-gray-50 overflow-hidden"
						onClick={() => {
							onLanguageChange("Sanskrit")
						}}
					>
						Sanskrit
					</button>
					<button
						className="w-full max-w-xs h-auto m-1 text-orange-500 bg-white border border-gray-300 shadow-sm rounded-lg text-left px-4 py-2 cursor-pointer transition-transform transform hover:scale-105 hover:bg-gray-50 overflow-hidden"
						onClick={() => {
							onLanguageChange("English")
						}}
					>
						English
					</button>
				</div>
			</div>
		</>
	)
}

export default LangauageBtns
