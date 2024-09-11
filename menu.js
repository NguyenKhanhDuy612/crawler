const fs = require('fs');
const path = require('path');

/**
 * Hàm thêm liên kết đến menu của trang chính
 * @param {string} pageName - Tên file HTML mới
 * @param {string} pageNameMenu - Tên file HTML mới
 */
function addToMenu(pageName, pageNameMenu) {
	const menuPath = path.join(__dirname, 'client/index.html'); // Đường dẫn tới file trang chính
	const menuItem = `<li><a href="pages/${pageName}" target="_blank" class="text-blue-600 hover:underline">${pageNameMenu || pageName}</a></li>`;

	fs.readFile(menuPath, 'utf8', (err, data) => {
		if (err) throw err;

		// Thêm menu item vào trước thẻ </ul>
		const updatedData = data.replace(/<\/ul>/, `${menuItem}</ul>`);

		fs.writeFile(menuPath, updatedData, 'utf8', (err) => {
			if (err) throw err;
			console.log(`Menu updated with ${pageName}`);
		});
	});
}

module.exports = addToMenu;
