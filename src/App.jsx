import "./App.css"
import Gita from "./Components/Gita"

import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/BG" element={<Gita />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
