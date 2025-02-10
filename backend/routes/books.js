const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Books');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;