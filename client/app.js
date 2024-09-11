document
	.getElementById("crawl-form")
	.addEventListener("submit", async function (e) {
		e.preventDefault();

		const url = document.getElementById("url-input").value;
		const errorMessage = document.getElementById("error-message");
		// const resultContainer = document.getElementById("result-container");

		errorMessage.classList.add("hidden");
		// resultContainer.classList.add("hidden");

		try {
			const response = await fetch(`http://localhost:9000/api/crawl?url=${encodeURIComponent(url)}`);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to crawl data");
			}
			console.log('data',data);
			
			// displayResult(data);
		} catch (error) {
			errorMessage.textContent = error.message;
			errorMessage.classList.remove("hidden");
		}
	});

// function displayResult(data) {
// 	document.getElementById("result-title").textContent = data.title;
// 	document.getElementById("result-description").textContent = data.description;
// 	document.getElementById("result-h1").textContent = data.h1;

// 	const paragraphsContainer = document.getElementById("result-paragraphs");
// 	const linksContainer = document.getElementById("result-links");
// 	const imagesContainer = document.getElementById("result-images");
// 	const videoContainer = document.getElementById("result-videos");
// 	const headingsContainer = document.getElementById("result-headings");

// 	// Clear previous content
// 	paragraphsContainer.innerHTML = "";
// 	linksContainer.innerHTML = "";
// 	imagesContainer.innerHTML = "";
// 	videoContainer.innerHTML = "";
// 	headingsContainer.innerHTML = "";

// 	// Display paragraphs
// 	data.paragraphs.forEach((paragraph) => {
// 		const li = document.createElement("li");
// 		li.textContent = paragraph;
// 		paragraphsContainer.appendChild(li);
// 	});

// 	// Display links
// 	data.links.forEach((link) => {
// 		const li = document.createElement("li");
// 		const a = document.createElement("a");
// 		a.href = link;
// 		a.textContent = link;
// 		a.target = "_blank";
// 		li.appendChild(a);
// 		linksContainer.appendChild(li);
// 	});

// 	// Display images
// 	data.images.forEach((imgSrc) => {
// 		const img = document.createElement("img");
// 		img.src = imgSrc;
// 		img.alt = "Image";
// 		img.classList.add("w-full", "h-auto", "object-cover", "rounded-md");
// 		imagesContainer.appendChild(img);
// 	});

// 	data.videos.forEach((videoSrc) => {
// 		const video = document.createElement("video");
// 		video.src = videoSrc;
// 		video.alt = "video";
// 		video.classList.add("w-full", "h-auto", "object-cover", "rounded-md");
// 		videoContainer.appendChild(video);
// 	});

// 	// Display headings
// 	data.headings.forEach((heading) => {
// 		const li = document.createElement("li");
// 		li.textContent = heading;
// 		headingsContainer.appendChild(li);
// 	});
	

// 	// Show result container
// 	document.getElementById("result-container").classList.remove("hidden");
// }
