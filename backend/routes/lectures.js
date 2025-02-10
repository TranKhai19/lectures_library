const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const UPLOAD_FOLDER = path.join(__dirname, "../uploads");

// Đảm bảo thư mục uploads tồn tại
if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
}

// Cấu hình multer để lưu file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// API tải lên file
router.post("/upload", upload.single("file"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Không có file nào được tải lên!" });
        }
        res.json({ message: "Tải lên thành công!", filename: req.file.filename });
    } catch (error) {
        console.error("Lỗi khi tải lên file:", error);
        res.status(500).json({ error: "Lỗi server khi tải lên file", details: error.message });
    }
});


// API lấy danh sách bài giảng
router.get("/", (req, res) => {
    fs.readdir(UPLOAD_FOLDER, (err, files) => {
        if (err) return res.status(500).json({ error: "Lỗi khi đọc thư mục" });

        const fileList = files.map(file => ({
            name: file,
            url: `/uploads/${file}`
        }));

        res.json({ lectures: fileList });
    });
});

module.exports = router;
