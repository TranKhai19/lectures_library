const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const lecturesRouter = require('./routes/lectures');
const gamesRouter = require('./routes/games');
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Khai báo middleware fileUpload trước các route
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // Giới hạn kích thước tệp là 50MB
}));

// Để phục vụ các tệp đã tải lên
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/lectures', lecturesRouter);
app.use('/games', gamesRouter);

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '../')));

// Cấu hình lưu file vào thư mục "uploads"
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Lưu file vào thư mục "uploads"
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Đặt tên file tránh trùng lặp
    }
});

const upload = multer({ storage: storage });

// API lấy danh sách bài giảng từ thư mục "uploads"
app.get("/lectures/list", (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi đọc thư mục", error: err });
        }
        const fileList = files.map(file => ({
            name: file,
            url: `http://localhost:${port}/uploads/${file}` // Tạo link để tải file
        }));
        res.json({ lectures: fileList });
    });
});

app.get("../../data/", (req, res) => {
    fs.readFile("data/documents.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi đọc file dữ liệu" });
        }
        res.json(JSON.parse(data));
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
