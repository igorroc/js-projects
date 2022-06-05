import dictionary from "https://gist.githubusercontent.com/stavarengo/5d07112537f260e982b4309178d253b4/raw/e5925d94c84d277f76eee41115ac96afd24737a1/brazilian-synonyms.json"

const maxLives = 5
const placeholder = document.querySelector("#word")
const fails = document.querySelector("#fails")
const rights = document.querySelector("#rights")
const hints = document.querySelector("#hints")

var config = {
	palavra: "",
	dica: [],
}

let wrongLetters = []
let rightLetters = []
let qtdRights = 0
let dicasDadas = 0

randomWord(config)

function checkLetter(event) {
	event.preventDefault()

	let letter = event.target[0].value

	event.target[0].value = ""

	if (wrongLetters.includes(letter) || wrongLetters.includes(letter)) {
		return console.log("Voce ja tentou essa letra")
	}

	let achou = false
	for (let i = 0; i < config.palavra.length; i++) {
		if (letter == config.palavra[i]) {
			placeholder.children[i].innerHTML = letter
			achou = true
			qtdRights++
		}
	}
	if (!achou) {
		wrongLetters.push(letter)
		fails.innerHTML += `<div class='letterSlot'>${letter}</div>`
	} else {
		rightLetters.push(letter)
		rights.innerHTML += `<div class='letterSlot'>${letter}</div>`
	}

	if (wrongLetters.length >= maxLives) {
		alert("Você perdeu!")
		for (let i = 0; i < config.palavra.length; i++) {
			placeholder.children[i].innerHTML = config.palavra[i]
		}
	}
	if (qtdRights >= config.palavra.length) {
		alert("Você ganhou!")
	}
}

async function randomWord(config) {
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Host": "lexicala1.p.rapidapi.com",
			"X-RapidAPI-Key":
				"11f83973f4msh71b29aa939e03e2p1f740cjsnc5371152b08e",
		},
	}

	let [word, hint] = await fetch(
		"https://lexicala1.p.rapidapi.com/search?language=br&sample=1",
		options
	)
		.then((response) => response.json())
		.then(async (response) => {
			console.log(response)
			let palavra = await response.results[0].headword.text
			let type = await response.results[0].headword.pos
			let aux = await response.results[0].senses
			let hint = []
			aux.forEach((el) => hint.push(el.definition))
			return [palavra, [type, ...hint]]
		})
		.catch((err) => console.error(err))

	console.log(word, hint)
	config.palavra = word
	config.dica = hint
	for (let i = 0; i < config.palavra.length; i++) {
		placeholder.innerHTML += "<div class='letterSlot'></div>"
	}
}

function showHint(){
    hints += `<div class='hint'>${config.hint[dicasDadas++]}</div>`
}