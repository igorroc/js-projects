const modal = document.querySelector("#modal")
const userModal = document.querySelector("#user")
const input = document.querySelector("#modal input")

// blog: "http://ilrocha.com"
// company: "TecnoJr"
// created_at: "2019-04-16T19:58:01Z"
// email: null
// events_url: "https://api.github.com/users/igorroc/events{/privacy}"
// followers: 24
// followers_url: "https://api.github.com/users/igorroc/followers"
// following: 29
// following_url: "https://api.github.com/users/igorroc/following{/other_user}"
// gists_url: "https://api.github.com/users/igorroc/gists{/gist_id}"
// gravatar_id: ""
// hireable: true
// html_url: "https://github.com/igorroc"
// id: 49696574
// location: "Ilhéus"
// node_id: "MDQ6VXNlcjQ5Njk2NTc0"
// organizations_url: "https://api.github.com/users/igorroc/orgs"
// public_gists: 2
// public_repos: 40
// received_events_url: "https://api.github.com/users/igorroc/received_events"
// repos_url: "https://api.github.com/users/igorroc/repos"
// type: "User"

function searchUser(ev) {
	ev = ev || window.event
	ev.preventDefault()
	let user = ev.target[0].value

	fetch(`https://api.github.com/users/${user}`).then(async (res) => {
		if (!res.ok) {
			popupError(user)
		} else {
			let data = await res.json()
			console.log(data)
			userModal.innerHTML = `
				<div class="imagem">
					<img src="${data.avatar_url}"/>
				</div>
				<div class="content">
					<a href="${data.html_url}" target="_blank">
						${data.name}
						<span class="iconify" data-icon="akar-icons:link-chain"></span>
					</a>

					${data.bio ? `<p>${data.bio}</p>` : ""}
				
					<div class="buttons">
						<div class="card">
							<span>Gists</span>
							<p>${data.public_gists}</p>
						</div>
						<div class="card">
							<span>Repos</span>
							<p>${data.public_repos}</p>
						</div>
						<div class="card">
							<span>Followers</span>
							<p>${data.followers}</p>
						</div>
					</div>
					<div class="links">
						<div class="link">
							<a href="${
								data.blog
							}" target="_blank"><span class="iconify" data-icon="charm:globe"></span></a>
						</div>
					</div>
				</div>
			`

			modal.classList.remove("search")
		}
	})
}

function popupError(userName) {
	let popup = document.querySelector("#popupErro")

	popup.innerHTML = `
	<div>
		<h1>Ops!</h1>
		<p>
			Não consegui encontrar o usuário <b> ${userName} </b></br>
			Verifique o nome de usuário e tente novamente!
		</p>
	</div>
	`

	input.value = ""
	input.focus()

	popup.classList.add("appear")
	popup.classList.remove("disappear")
	setTimeout(() => {
		popup.classList.remove("appear")
		popup.classList.add("disappear")
	}, 6000)
}

function backToSearch() {
	modal.classList.add("search")
	input.value = ""
	input.focus()
}
