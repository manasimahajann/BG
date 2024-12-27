import React, {useEffect} from "react"
import {useNavigate} from "react-router-dom"

const CustomBackButtonHandler = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const handleBackButton = (event) => {
			// Example: Navigate to home on back button press
			navigate("/")
		}

		window.addEventListener("popstate", handleBackButton)
		return () => window.removeEventListener("popstate", handleBackButton)
	}, [navigate])

	return null
}

export default CustomBackButtonHandler
