const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const lecturesRouter = require('./routes/lectures');
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Khai báo middleware fileUpload trước các route
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // Giới hạn kích thước tệp là 50MB
}));

// Để phục vụ các tệp đã tải lên
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/lectures', lecturesRouter);

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '../')));

app.post('/chatbot', (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    let reply = 'Xin lỗi, tôi không hiểu yêu cầu của bạn.';

    if (userMessage.includes('sách') || userMessage.includes('bài giảng')) {
        fs.readdir(uploadDir, (err, files) => {
            if (err) {
                return res.status(500).send('Unable to scan directory: ' + err);
            }
            reply = 'Đây là một số tài liệu mà bạn có thể quan tâm:\n';
            files.forEach(file => {
                reply += `- ${file}\n`;
            });
            res.json({ response: reply });
        });
    } else {
        res.json({ response: reply });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

