const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const lectures = [
    { name: 'Bài Giảng 1', description: 'Mô tả ngắn về bài giảng 1', path: '/uploads/sample1.pdf' },
    { name: 'Bài Giảng 2', description: 'Mô tả ngắn về bài giảng 2', path: '/uploads/sample2.pdf' }
];

router.get('/', (req, res) => {
    res.json(lectures.slice(0, 10));
});

router.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const lectureFile = req.files.lecture;
    const uploadPath = path.join(__dirname, '../uploads', lectureFile.name);

    lectureFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        const { name, description } = req.body;

        lectures.push({
            name: name || lectureFile.name,
            description: description || 'Không có mô tả',
            path: `/uploads/${lectureFile.name}`
        });

        res.send('File uploaded!');
    });
});

module.exports = router;