import "./App.css"
import Gita from "./Components/Gita"

import {BrowserRouter, Routes, Route} from "react-router-dom"
import Shlokas from "./Components/Shlokas"
import Play from "./Components/Play"

function App() {
	return (
		<BrowserRouter basename="/BG">
			<Routes>
				<Route path="/chapters" element={<Gita />} />
				<Route
					path="/:chapter/verses/:selectedLanguage"
					element={<Shlokas />}
				/>
				<Route
					path="/:chapter/verses/:verse/:selectedLanguage"
					element={<Play />}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
