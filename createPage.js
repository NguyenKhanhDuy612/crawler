const fs = require('fs');
const path = require('path');

/**
 * Hàm tạo file HTML từ dữ liệu crawl
 * @param {Object} data - Dữ liệu crawl từ API
 * @param {string} pageName - Tên file HTML mới (ví dụ: 'page1.html')
 */
function createPage(data, pageName) {
	// Đường dẫn tới thư mục chứa các file HTML
	const outputPath = path.join(__dirname, 'client/pages', pageName);

	// Nội dung HTML với dữ liệu crawl
	const htmlContent = `
	<!DOCTYPE html>
	<html lang="en">
	
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>${data.title || 'Crawl Data'}</title>
		<script defer src="app.js"></script>
		<!-- Kết nối với file JavaScript -->
		<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
		<!-- Tailwind CSS -->
	</head>
	
	<body class="bg-gray-100">
		<div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
			<h1 class="text-2xl font-bold mb-4">Crawled Data for ${data.title || 'Page'}</h1>
			<div class="space-y-4">
				<div>
					<strong class="text-lg">Title:</strong>
					<p class="mt-1 text-gray-700">${data.title || 'No title available'}</p>
				</div>
				<div>
					<strong class="text-lg">Description:</strong>
					<p class="mt-1 text-gray-700">${data.description || 'No description available'}</p>
				</div>
				<div>
					<strong class="text-lg">H1:</strong>
					<p class="mt-1 text-gray-700">${data.h1 || 'No H1 available'}</p>
				</div>
				<div>
					<strong class="text-lg">Paragraphs:</strong>
					<ul class="list-disc list-inside mt-1 text-gray-700">
						${data.paragraphs.map(p => `<li>${p}</li>`).join('')}
					</ul>
				</div>
				<div>
					<strong class="text-lg">Links:</strong>
					<ul class="list-disc list-inside mt-1 text-blue-600">
						${data.links.map(link => `<li><a href="${link}" target="_blank">${link}</a></li>`).join('')}
					</ul>
				</div>
				<div>
					<strong class="text-lg">Images:</strong>
					<div class="grid grid-cols-2 gap-4 mt-1">
						${data.images.map(img => `<img src="${img}" alt="Image" class="w-full h-auto"/>`).join('')}
					</div>
				</div>
				<div>
					<strong class="text-lg">Video:</strong>
					<div class="grid grid-cols-2 gap-4 mt-1">
						${data.videos.map(video => `<video src="${video}" controls class="w-full h-auto"></video>`).join('')}
					</div>
				</div>
				<div>
					<strong class="text-lg">Headings:</strong>
					<ul class="list-disc list-inside mt-1 text-gray-700">
						${data.headings.map(h => `<li>${h}</li>`).join('')}
					</ul>
				</div>
			</div>
		</div>
	</body>
	
	</html>
	`;
	// Tạo thư mục nếu chưa tồn tại
	if (!fs.existsSync(path.dirname(outputPath))) {
		fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	}

	// Ghi nội dung vào file HTML
	fs.writeFileSync(outputPath, htmlContent, 'utf8');
	console.log(`Page created: ${outputPath}`);
}

module.exports = createPage;