const video = document.querySelector("#video")

navigator.mediaDevices
	.getUserMedia({ video: true })
	.then(function (stream) {
		if (stream.getVideoTracks().length > 0) {
			console.log("PERMITIDO")
			video.srcObject = stream
		} else {
			// code for when both devices are available
			console.log("nao permitido")
		}
		console.log(stream)
	})
	.catch(function (error) {
		// code for when there is an error
		console.log(error)
	})
