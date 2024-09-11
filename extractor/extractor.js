const cheerio = require('cheerio');

/**
 * Hàm trích xuất tiêu đề từ HTML
 * @param {Object} $ - Cheerio object
 * @returns {string} - Tiêu đề của trang web
 */
function extractTitle($) {
	return $('title').text();
}

/**
 * Hàm trích xuất mô tả từ thẻ meta
 * @param {Object} $ - Cheerio object
 * @returns {string} - Mô tả của trang web
 */
function extractDescription($) {
	return $('meta[name="description"]').attr('content') || 'No description';
}

/**
 * Hàm trích xuất thẻ H1
 * @param {Object} $ - Cheerio object
 * @returns {string} - Nội dung thẻ H1
 */
function extractH1($) {
	return $('h1').text();
}

/**
 * Hàm trích xuất các đoạn văn (thẻ <p>)
 * @param {Object} $ - Cheerio object
 * @returns {Array} - Mảng các đoạn văn
 */
function extractParagraphs($) {
	const paragraphs = [];
	$('p').each((i, el) => {
		paragraphs.push($(el).text());
	});
	return paragraphs;
}

/**
 * Hàm trích xuất các liên kết (thẻ <a>)
 * @param {Object} $ - Cheerio object
 * @returns {Array} - Mảng các liên kết
 */
function extractLinks($) {
	const links = [];
	$('a').each((i, el) => {
		const href = $(el).attr('href');
		if (href) links.push(href);
	});
	return links;
}

/**
 * Hàm trích xuất các hình ảnh (thẻ <img>)
 * @param {Object} $ - Cheerio object
 * @returns {Array} - Mảng các URL của hình ảnh
 */
function extractImages($) {
	const images = [];
	$('img').each((i, el) => {
		const src = $(el).attr('src');
		if (src) images.push(src);
	});
	return images;
}

/**
 * Hàm trích xuất các video (thẻ <video> và <iframe>)
 * @param {Object} $ - Cheerio object
 * @returns {Array} - Mảng các URL của video
 */
function extractVideos($) {
	const videos = [];
	// Trích xuất từ thẻ <video>
	$('video').each((i, el) => {
		const src = $(el).attr('src');
		if (src) videos.push(src);
	});
	// Trích xuất từ thẻ <iframe> nếu chứa video
	$('iframe').each((i, el) => {
		const src = $(el).attr('src');
		if (src && src?.includes('youtube.com') || src?.includes('vimeo.com')) {
			videos.push(src);
		}
	});
	return videos;
}


/**
 * Hàm trích xuất các heading (h2, h3, h4)
 * @param {Object} $ - Cheerio object
 * @returns {Array} - Mảng các heading
 */
function extractHeadings($) {
	const headings = [];
	$('h2, h3, h4').each((i, el) => {
		headings.push($(el).text());
	});
	return headings;
}

/**
 * Hàm chính để trích xuất toàn bộ dữ liệu từ HTML
 * @param {string} html - Nội dung HTML của trang web
 * @returns {Object} - Dữ liệu đã trích xuất bao gồm tiêu đề, mô tả, thẻ h1, đoạn văn, liên kết, hình ảnh, heading
 */
function extractData(html) {
	const $ = cheerio.load(html);

	return {
		title: extractTitle($),
		description: extractDescription($),
		h1: extractH1($),
		paragraphs: extractParagraphs($),
		links: extractLinks($),
		images: extractImages($),
		videos: extractVideos($),
		headings: extractHeadings($),
	};
}

module.exports = {
	extractData,
	extractTitle,
	extractDescription,
	extractH1,
	extractParagraphs,
	extractLinks,
	extractImages,
	extractVideos,
	extractHeadings,
};
