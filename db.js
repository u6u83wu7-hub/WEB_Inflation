import sqlite3 from 'sqlite3';

// 1. 開啟或建立資料庫檔案
const db = new sqlite3.Database('./digital_inflation.db', (err) => {
    if (err) {
        console.error('資料庫連線失敗:', err.message);
    } else {
        console.log('✅ 成功連線到 SQLite 資料庫 (digital_inflation.db)');
    }
});

// 2. 建立資料表 (如果不存在的話)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        service_name TEXT NOT NULL,
        price INTEGER NOT NULL,
        record_date TEXT NOT NULL
    )`);
});

export default db;