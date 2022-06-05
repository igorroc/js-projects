const maxLives = 5
const placeholder = document.querySelector("#word")
const fails = document.querySelector("#fails")
const rights = document.querySelector("#rights")
const hints = document.querySelector("#hints")
const input = document.querySelector("form input")

var config = {
	palavra: "",
	palavraLimpa: "",
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

	if (wrongLetters.includes(letter) || rightLetters.includes(letter)) {
		return
	}

	let achou = false
	for (let i = 0; i < config.palavra.length; i++) {
		if (letter == config.palavraLimpa[i]) {
			placeholder.children[i].innerHTML = config.palavra[i]

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
		for (let i = 0; i < config.palavra.length; i++) {
			placeholder.children[i].innerHTML = config.palavra[i]
		}
		setTimeout(() => {
			alert("Você perdeu!")
		}, 200)
	}
	if (qtdRights >= config.palavra.length) {
		setTimeout(() => {
			alert("Você ganhou!")
		}, 200)
	}
}

async function randomWord(config) {
	await fetch("https://api.dicionario-aberto.net/random")
		.then((data) => data.json())
		.then(async (data) => {
			config.palavra = await data.word

			for (let i = 0; i < config.palavra.length; i++) {
				if (config.palavra[i] == "ç") {
					config.palavraLimpa += "c"
				} else if (
					config.palavra[i] == "á" ||
					config.palavra[i] == "ã" ||
					config.palavra[i] == "â"
				) {
					config.palavraLimpa += "a"
				} else if (
					config.palavra[i] == "é" ||
					config.palavra[i] == "ê"
				) {
					config.palavraLimpa += "e"
				} else if (config.palavra[i] == "í") {
					config.palavraLimpa += "i"
				} else if (
					config.palavra[i] == "õ" ||
					config.palavra[i] == "ó"
				) {
					config.palavraLimpa += "o"
				} else if (config.palavra[i] == "ú") {
					config.palavraLimpa += "u"
				} else {
					config.palavraLimpa += config.palavra[i]
				}
			}
		})

	for (let i = 0; i < config.palavra.length; i++) {
		placeholder.innerHTML += "<div class='letterSlot'></div>"
	}

	input.focus()
}

async function showHint() {
	await fetch(`https://api.dicionario-aberto.net/near/${config.palavra}`)
		.then((data) => data.json())
		.then(async (data) => {
			console.log(data)
		})
	// hints += `<div class='hint'>${config.hint[dicasDadas++]}</div>`
}

function reload() {
	document.location.reload(true)
}
