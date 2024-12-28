import {useState} from "react"
// import Shlokas from "./Shlokas"
import LangauageBtns from "./LangauageBtns"
const Gita = () => {
	const [selectedChapter, setSelectedChapter] = useState(null)
	const [selectedLanguage, setSelectedLanguage] = useState("Sanskrit")

	const chapters = [
		{
			chapter_number: 1,
			id: 1,
			image_name: "arjuna-vishada-yoga",
			name: "अर्जुनविषादयोग",
			name_meaning: "Arjuna's Dilemma",
			name_translation: "Arjuna Visada Yoga",
			name_transliterated: "Arjun Viṣhād Yog",
			verses_count: 47,
		},
		{
			chapter_number: 2,
			id: 2,
			image_name: "sankhya-yoga",
			name: "सांख्ययोग",
			name_meaning: "Transcendental Knowledge",
			name_translation: "Sankhya Yoga",
			name_transliterated: "Sānkhya Yog",
			verses_count: 72,
		},
		{
			chapter_number: 3,
			id: 3,
			image_name: "karma-yoga",
			name: "कर्मयोग",
			name_meaning: "Path of Selfless Service",
			name_translation: "Karma Yoga",
			name_transliterated: "Karm Yog",
			verses_count: 43,
		},
		{
			chapter_number: 4,
			id: 4,
			image_name: "jnana-karma-sanyasa-yoga",
			name: "ज्ञानकर्मसंन्यासयोग",
			name_meaning: "Path of Knowledge and the Disciplines of Action",
			name_translation: "Jnana Karma Sanyasa Yoga",
			name_transliterated: "Jñāna Karm Sanyās Yog",
			verses_count: 42,
		},
		{
			chapter_number: 5,
			id: 5,
			image_name: "karma-sanyasa-yoga",
			name: "कर्मसंन्यासयोग",
			name_meaning: "Path of Renunciation",
			name_translation: "Karma Sanyasa Yoga",
			name_transliterated: "Karm Sanyās Yog",
			verses_count: 29,
		},
		{
			chapter_number: 6,
			id: 6,
			image_name: "dhyana-yoga",
			name: "ध्यानयोग",
			name_meaning: "Path of Meditation",
			name_translation: "Dhyana Yoga",
			name_transliterated: "Dhyān Yog",
			verses_count: 47,
		},
		{
			chapter_number: 7,
			id: 7,
			image_name: "gyan-vigyana-yoga",
			name: "ज्ञानविज्ञानयोग",
			name_meaning: "Self-Knowledge and Enlightenment",
			name_translation: "Gyaan Vigyana Yoga",
			name_transliterated: "Jñāna Vijñāna Yog",
			verses_count: 30,
		},
		{
			chapter_number: 8,
			id: 8,
			image_name: "akshara-brahma-yoga",
			name: "अक्षरब्रह्मयोग",
			name_meaning: "Path of the Eternal God",
			name_translation: "Akshara Brahma Yoga",
			name_transliterated: "Akṣhar Brahma Yog",
			verses_count: 28,
		},
		{
			chapter_number: 9,
			id: 9,
			image_name: "raja-vidya-yoga",
			name: "राजविद्याराजगुह्ययोग",
			name_meaning: "Yoga through the King of Sciences",
			name_translation: "Raja Vidya Yoga",
			name_transliterated: "Rāja Vidyā Yog",
			verses_count: 34,
		},
		{
			chapter_number: 10,
			id: 10,
			image_name: "vibhooti-yoga",
			name: "विभूतियोग",
			name_meaning: "Yoga through Appreciating the Infinite Opulences of God",
			name_translation: "Vibhooti Yoga",
			name_transliterated: "Vibhūti Yog",
			verses_count: 42,
		},
		{
			chapter_number: 11,
			id: 11,
			image_name: "vishwaroopa-darshana-yoga",
			name: "विश्वरूपदर्शनयोग",
			name_meaning: "Yoga through Beholding the Cosmic Form of God",
			name_translation: "Vishwaroopa Darshana Yoga",
			name_transliterated: "Viśhwarūp Darśhan Yog",
			verses_count: 55,
		},
		{
			chapter_number: 12,
			id: 12,
			image_name: "bhakti-yoga",
			name: "भक्तियोग",
			name_meaning: "The Yoga of Devotion",
			name_translation: "Bhakti Yoga",
			name_transliterated: "Bhakti Yog",
			verses_count: 20,
		},
		{
			chapter_number: 13,
			id: 13,
			image_name: "kshetra-kshetrajna-vibhaga-yoga",
			name: "क्षेत्र-क्षेत्रज्ञविभागयोग",
			name_meaning:
				"Yoga through Distinguishing the Field and the Knower of the Field",
			name_translation: "Ksetra Ksetrajna Vibhaaga Yoga",
			name_transliterated: "Kṣhetra Kṣhetrajña Vibhāg Yog",
			verses_count: 35,
		},
		{
			chapter_number: 14,
			id: 14,
			image_name: "gunatraya-vibhaga-yoga",
			name: "गुणत्रयविभागयोग",
			name_meaning:
				"Yoga through Understanding the Three Modes of Material Nature",
			name_translation: "Gunatraya Vibhaga Yoga",
			name_transliterated: "Guṇa Traya Vibhāg Yog",
			verses_count: 27,
		},
		{
			chapter_number: 15,
			id: 15,
			image_name: "purushotamma-yoga",
			name: "पुरुषोत्तमयोग",
			name_meaning: "The Yoga of the Supreme Divine Personality",
			name_translation: "Purushottama Yoga",
			name_transliterated: "Puruṣhottam Yog",
			verses_count: 20,
		},
		{
			chapter_number: 16,
			id: 16,
			image_name: "daivasura-sampad-vibhaga-yoga",
			name: "दैवासुरसम्पद्विभागयोग",
			name_meaning: "Yoga through Discerning the Divine and Demoniac Natures",
			name_translation: "Daivasura Sampad Vibhaga Yoga",
			name_transliterated: "Daivāsura Sampad Vibhāg Yog",
			verses_count: 24,
		},
		{
			chapter_number: 17,
			id: 17,
			image_name: "shraddha-traya-vibhaga-yoga",
			name: "श्रद्धात्रयविभागयोग",
			name_meaning: "Yoga through Discerning the Three Divisions of Faith",
			name_translation: "Sraddhatraya Vibhaga Yoga",
			name_transliterated: "Śhraddhā Traya Vibhāg Yog",
			verses_count: 28,
		},
		{
			chapter_number: 18,
			id: 18,
			image_name: "moksha-sanyasa-yoga",
			name: "मोक्षसंन्यासयोग",
			name_meaning: "Yoga through the Perfection of Renunciation and Surrender",
			name_translation: "Moksha Sanyaas Yoga",
			name_transliterated: "Mokṣha Sanyās Yog",
			verses_count: 78,
		},
	]
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
