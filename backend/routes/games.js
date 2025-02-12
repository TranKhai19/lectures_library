const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const gamesFilePath = path.join(__dirname, '../../data/game.json');

// Đọc danh sách trò chơi từ file JSON
router.get('/files', (req, res) => {
    fs.readFile(gamesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Unable to read games file: ' + err);
        }
        const games = JSON.parse(data);
        res.json(games);
    });
});

// Xử lý tải lên trò chơi mới
router.post('/upload', (req, res) => {
    const newGame = {
        name: req.body.gameName,
        playerCount: req.body.playerCount,
        rules: req.body.gameRules
    };

    fs.readFile(gamesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Unable to read games file: ' + err);
        }
        const games = JSON.parse(data);
        games.push(newGame);

        fs.writeFile(gamesFilePath, JSON.stringify(games, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Unable to save game: ' + err);
            }
            res.json({ message: 'Game uploaded successfully!' });
        });
    });
});

module.exports = router;