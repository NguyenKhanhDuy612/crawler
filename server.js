const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const { extractData } = require('./extractor/extractor');

const app = express();
const PORT = 3000;

app.use(cors());

/**
 * Hàm lấy HTML từ URL
 * @param {string} url - URL của trang web cần lấy dữ liệu
 * @returns {string} - HTML của trang web
 */
async function fetchHTML(url) {
	try {
		const { data } = await axios.get(url);
		return data;
	} catch (error) {
		console.error(`Failed to fetch HTML from ${url}: ${error.message}`);
    	throw new Error(`Failed to fetch HTML from ${url}`);
	}
}

/**
 * Hàm xử lý yêu cầu crawl dữ liệu
 * @param {Request} req - Yêu cầu từ phía client
 * @param {Response} res - Phản hồi trả về cho client
 */
async function handleCrawl(req, res) {
	const url = req.query.url;

	if (!url) {
		return res.status(400).json({ error: 'URL parameter is required' });
	}

	try {
		// Lấy HTML từ URL
		const html = await fetchHTML(url);

		// Trích xuất dữ liệu từ HTML
		const result = extractData(html);

		// Trả về dữ liệu đã crawl
		return res.json(result);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

// Endpoint API để crawl dữ liệu
app.get('/api/crawl', handleCrawl);

// Khởi động server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});