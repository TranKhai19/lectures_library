const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../../uploads/');

router.get('/files', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        const fileInfos = files.map(file => {
            const filePath = path.join(uploadDir, file);
            const metaPath = `${filePath}.meta`;
            let category = 'Không xác định';
            if (fs.existsSync(metaPath)) {
                const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
                category = meta.category || 'Không xác định';
            }
            return {
                name: file,
                path: `/uploads/${file}`,
                category: category
            };
        });
        res.json(fileInfos);
    });
});

router.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const lectureFile = req.files.lectureFile;
    const category = req.body.lectureCategory;
    const uploadPath = path.join(uploadDir, lectureFile.name);

    // Ensure the directory exists
    fs.mkdirSync(uploadDir, { recursive: true });

    // Move the file to the upload directory
    lectureFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        // Lưu thông tin lĩnh vực vào metadata của tệp
        fs.writeFileSync(`${uploadPath}.meta`, JSON.stringify({ category: category }));

        res.send({ message: 'File uploaded!', fileName: lectureFile.name });
    });
});

module.exports = router;