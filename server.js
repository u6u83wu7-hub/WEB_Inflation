import express from 'express';
import cors from 'cors';
import db from './db.js'; // 引入資料庫

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // 解決同源政策問題

// 讓 app 讀取 public 資料夾裡的網頁
app.use(express.static('public'));

// ==========================================
// 🚀 API 區塊
// ==========================================

// 1. 取得所有歷史紀錄 (GET)
app.get('/api/records', (req, res) => {
    db.all('SELECT * FROM records ORDER BY record_date DESC', [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: '讀取失敗' });
            return;
        }
        res.json(rows);
    });
});

// 2. 新增一筆紀錄 (POST)
app.post('/api/records', (req, res) => {
    const { service_name, price, record_date } = req.body;
    const sql = 'INSERT INTO records (service_name, price, record_date) VALUES (?, ?, ?)';
    
    db.run(sql, [service_name, price, record_date], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('新增失敗');
            return;
        }
        res.send('新增成功！');
    });
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`伺服器執行中：http://localhost:${PORT}`);
});