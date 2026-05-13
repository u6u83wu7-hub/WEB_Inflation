import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
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

// 🚀 [API 3] 加分題：爬蟲自動抓取 Disney+ 最新價格
app.get('/api/scrape/disney', async (req, res) => {
    try {
        const targetUrl = 'https://www.sogi.com.tw/articles/disney-plus/6268023'; 
        const response = await axios.get(targetUrl, { 
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } 
        });
        const $ = cheerio.load(response.data);
        
        let foundRecords = [];
        let seenKeys = new Set();
        
        // 🕵️‍♂️ 真正的爬蟲思維：我們去掃描所有可能包含數據的「區塊」(TableRow 或 Paragraph)
        $('tr, p, li').each((index, element) => {
            const text = $(element).text().replace(/\s+/g, ' '); // 清掉多餘空格

            // 1. 定義「日期特徵」: 尋找 2021~2026 年，以及後面的月份
            const dateMatch = text.match(/(202[1-6])\s*[年\/\-\.]\s*(\d{1,2})/);
            
            // 2. 定義「價格特徵」: 尋找 3 位數且後面跟著「元」或「幣」的數字
            const priceMatch = text.match(/(\d{3})\s*[元|幣]/);

            if (priceMatch) {
                const price = parseInt(priceMatch[1]);
                let year, month;

                if (dateMatch) {
                    // A. 如果同一行有日期，直接抓取
                    year = dateMatch[1];
                    month = dateMatch[2].padStart(2, '0');
                } else {
                    // B. 如果同一行沒日期，我們試著去抓「文章開頭」或「標題」的日期作為基準
                    const articleDate = $('.post_info_date, .date').first().text().match(/(202[1-6])[\/\-](\d{1,2})/);
                    year = articleDate ? articleDate[1] : "2024";
                    month = articleDate ? articleDate[2].padStart(2, '0') : "01";
                }

                const uniqueKey = `${year}-${month}-${price}`;
                if (!seenKeys.has(uniqueKey) && price > 100) { // 過濾掉太小的數字
                    seenKeys.add(uniqueKey);
                    foundRecords.push({ 
                        service_name: price >= 320 ? "Disney+ 高級方案(爬蟲)" : "Disney+ 標準方案(爬蟲)", 
                        price: price, 
                        record_date: `${year}-${month}` 
                    });
                }
            }
        });

        // 排序：按時間由舊到新
        foundRecords.sort((a, b) => a.record_date.localeCompare(b.record_date));
        
        res.json({ success: true, data: foundRecords });
    } catch (error) {
        res.status(500).json({ error: '解析失敗: ' + error.message });
    }
});