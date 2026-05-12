# 📋 作業4「物價追蹤網站」完整任務清單

**繳交期限**: 2026/5/13 (三) 23:59  
**核心要求**: 前端 + Express 後端 + SQLite 資料庫  
**專案名稱**: Web_fcu_rent_tracker

---

## **第一階段：前置準備**

### ✅ 1. 確認商品選擇與主題
- [x] **去填 Google 表單**填寫你選擇的商品  
  - ✅ 商品名稱：**逢甲租屋價格**
  - ✅ 商品資料來源網站：逢甲大學租屋市場（591租屋、雨房等）
- [x] **決定網站標題**：**「逢甲租屋價格追蹤」**
- [x] **備註選擇理由**：
  - 作為逢甲大學學生，居住成本是每月最大固定開銷
  - 第一次找房時明顯感受到租屋市場通膨
  - 透過建立觀測站，記錄不同年份真實租金數據
  - 計算並呈現屬於學生的真實居住通膨率

---

## **第二階段：本機開發環境設置**

### ✅ 2. 設置項目結構
```
Web_fcu_rent_tracker/
├── package.json          ✅ 已改為 "type": "module"
├── package-lock.json
├── server.js             ⏳ 待建立（Express 主程式）
├── .gitignore            ⏳ 待建立
├── public/               ⏳ 待建立
│   ├── index.html        ⏳ 待建立
│   ├── style.css         ⏳ 待建立
│   └── script.js         ⏳ 待建立
└── db/                   ⏳ 待建立
    └── database.js       ⏳ 待建立（SQLite 連線設定）
```

### ✅ 3. 安裝必要的 npm 套件
```bash
npm install express sqlite3 body-parser cors
```

**為何需要：**
- `express`: 後端伺服器框架
- `sqlite3`: 資料庫驅動
- `body-parser`: 解析 POST 請求的 JSON
- `cors`: 允許前端呼叫後端 API

### ✅ 4. 修改 `package.json`（確認完整設定）
**檢查項目：**
```json
{
  "name": "web_fcu_rent_tracker",
  "version": "1.0.0",
  "type": "module",
  "description": "物價追蹤網站",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "engines": {
    "node": ">=18"
  }
}
```

- `"type": "module"` ✅ 已設定（使用 ES6 import/export）
- `"start"` script 需要補上（Azure/Render 部署時會執行）
- `"engines"` 指定 Node.js 版本

---

## **第三階段：後端開發**

### ✅ 5. 建立 SQLite 資料庫連線模組
**檔案：`db/database.js`**

```javascript
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 初始化資料庫
const db = new sqlite3.Database(path.join(__dirname, '../data.db'));

// 建立表格（如果不存在）
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS prices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_name TEXT NOT NULL,
      price REAL NOT NULL,
      record_date TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

export default db;
```

**關鍵點：**
- 建立 `prices` 表格：id、商品名稱、價格、日期、建立時間
- 使用 ES6 module 語法（因為 `"type": "module"`）

### ✅ 6. 建立 Express 後端伺服器
**檔案：`server.js`**

```javascript
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db/database.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 中間件設定
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// 設定動態 port（本機用 3000，Azure/Render 會自動分配）
const PORT = process.env.PORT || 3000;

// ========== API 路由 ==========

// 1. 新增物價記錄
app.post('/api/prices', (req, res) => {
  const { product_name, price, record_date } = req.body;
  
  if (!product_name || !price || !record_date) {
    return res.status(400).json({ error: '缺少必要欄位' });
  }

  db.run(
    `INSERT INTO prices (product_name, price, record_date) VALUES (?, ?, ?)`,
    [product_name, price, record_date],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: '新增成功' });
    }
  );
});

// 2. 取得所有物價記錄
app.get('/api/prices', (req, res) => {
  db.all(
    `SELECT * FROM prices ORDER BY record_date DESC`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

// 3. 搜尋物價（依商品名稱）
app.get('/api/prices/search/:product_name', (req, res) => {
  const { product_name } = req.params;
  
  db.all(
    `SELECT * FROM prices WHERE product_name LIKE ? ORDER BY record_date DESC`,
    [`%${product_name}%`],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

// 4. 刪除單筆記錄
app.delete('/api/prices/:id', (req, res) => {
  const { id } = req.params;
  
  db.run(
    `DELETE FROM prices WHERE id = ?`,
    [id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: '刪除成功' });
    }
  );
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`✅ 伺服器執行於 http://localhost:${PORT}`);
});
```

**API 端點說明：**
| 方法 | 路由 | 功能 |
|------|------|------|
| POST | `/api/prices` | 新增物價記錄 |
| GET | `/api/prices` | 取得所有記錄 |
| GET | `/api/prices/search/:product_name` | 搜尋商品 |
| DELETE | `/api/prices/:id` | 刪除記錄 |

---

## **第四階段：前端開發**

### ✅ 7. 建立前端 HTML 頁面
**檔案：`public/index.html`**

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>物價追蹤系統</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <!-- 標題 -->
    <header>
      <h1>💰 物價追蹤系統</h1>
      <p>紀錄商品價格變化，掌握你的通膨率</p>
    </header>

    <!-- 輸入表單 -->
    <section class="form-section">
      <h2>新增物價記錄</h2>
      <form id="priceForm">
        <div class="form-group">
          <label for="productName">商品名稱</label>
          <input type="text" id="productName" required>
        </div>
        <div class="form-group">
          <label for="price">價格 (元)</label>
          <input type="number" id="price" step="0.01" required>
        </div>
        <div class="form-group">
          <label for="recordDate">日期</label>
          <input type="date" id="recordDate" required>
        </div>
        <button type="submit" class="btn-submit">新增記錄</button>
      </form>
    </section>

    <!-- 搜尋功能 -->
    <section class="search-section">
      <h2>搜尋商品</h2>
      <div class="search-box">
        <input type="text" id="searchBox" placeholder="輸入商品名稱...">
        <button id="searchBtn" class="btn-search">搜尋</button>
        <button id="resetBtn" class="btn-reset">重置</button>
      </div>
    </section>

    <!-- 物價記錄表格 -->
    <section class="table-section">
      <h2>物價記錄</h2>
      <table id="priceTable" class="price-table">
        <thead>
          <tr>
            <th>商品名稱</th>
            <th>價格</th>
            <th>日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          <!-- JavaScript 動態填入 -->
        </tbody>
      </table>
      <p id="emptyMessage" class="empty-message">目前沒有記錄</p>
    </section>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### ✅ 8. 建立 CSS 樣式
**檔案：`public/style.css`**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

header {
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 3px solid #667eea;
  padding-bottom: 20px;
}

header h1 {
  color: #333;
  margin-bottom: 8px;
  font-size: 2em;
}

header p {
  color: #666;
  font-size: 1.1em;
}

section {
  margin-bottom: 30px;
}

section h2 {
  color: #333;
  margin-bottom: 15px;
  border-left: 4px solid #667eea;
  padding-left: 12px;
}

/* 表單樣式 */
.form-section, .search-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
}

/* 按鈕樣式 */
.btn-submit, .btn-search, .btn-reset, .btn-delete {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-submit {
  background: #667eea;
  color: white;
  width: 100%;
  font-size: 1em;
}

.btn-submit:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

.btn-search, .btn-reset {
  margin-right: 10px;
  background: #667eea;
  color: white;
}

.btn-search:hover, .btn-reset:hover {
  background: #5568d3;
}

.btn-reset {
  background: #6c757d;
}

.btn-reset:hover {
  background: #5a6268;
}

.btn-delete {
  background: #dc3545;
  color: white;
  padding: 5px 12px;
  font-size: 0.9em;
}

.btn-delete:hover {
  background: #c82333;
}

/* 搜尋框 */
.search-box {
  display: flex;
  gap: 10px;
}

.search-box input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* 表格樣式 */
.price-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.price-table thead {
  background: #667eea;
  color: white;
}

.price-table th, .price-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.price-table tbody tr:hover {
  background: #f5f5f5;
  transition: background 0.3s;
}

.price-table tbody tr:nth-child(even) {
  background: #f8f9fa;
}

.empty-message {
  text-align: center;
  color: #999;
  padding: 20px;
  font-style: italic;
}

/* 響應式設計 */
@media (max-width: 600px) {
  .container {
    padding: 15px;
  }

  .search-box {
    flex-direction: column;
  }

  .btn-search, .btn-reset {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }

  .price-table {
    font-size: 0.9em;
  }

  .price-table th, .price-table td {
    padding: 8px;
  }
}
```

### ✅ 9. 建立前端 JavaScript
**檔案：`public/script.js`**

```javascript
// API 基礎路徑
const API_BASE = 'http://localhost:3000/api';

// DOM 元素
const priceForm = document.getElementById('priceForm');
const productNameInput = document.getElementById('productName');
const priceInput = document.getElementById('price');
const recordDateInput = document.getElementById('recordDate');
const tableBody = document.getElementById('tableBody');
const emptyMessage = document.getElementById('emptyMessage');
const searchBox = document.getElementById('searchBox');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  loadPrices();
  // 設定預設日期為今天
  recordDateInput.valueAsDate = new Date();
});

// 1. 新增物價記錄
priceForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newPrice = {
    product_name: productNameInput.value,
    price: parseFloat(priceInput.value),
    record_date: recordDateInput.value,
  };

  try {
    const response = await fetch(`${API_BASE}/prices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPrice),
    });

    if (response.ok) {
      alert('✅ 新增成功！');
      priceForm.reset();
      recordDateInput.valueAsDate = new Date();
      loadPrices();
    } else {
      alert('❌ 新增失敗');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ 發生錯誤，請檢查伺服器');
  }
});

// 2. 載入所有物價記錄
async function loadPrices() {
  try {
    const response = await fetch(`${API_BASE}/prices`);
    const prices = await response.json();

    tableBody.innerHTML = '';

    if (prices.length === 0) {
      emptyMessage.style.display = 'block';
    } else {
      emptyMessage.style.display = 'none';
      prices.forEach((price) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${price.product_name}</td>
          <td>$${price.price.toFixed(2)}</td>
          <td>${price.record_date}</td>
          <td>
            <button class="btn-delete" onclick="deletePrice(${price.id})">刪除</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ 無法載入資料，請檢查伺服器是否執行');
  }
}

// 3. 搜尋物價
searchBtn.addEventListener('click', async () => {
  const keyword = searchBox.value.trim();

  if (!keyword) {
    alert('請輸入搜尋關鍵字');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/prices/search/${keyword}`);
    const results = await response.json();

    tableBody.innerHTML = '';

    if (results.length === 0) {
      emptyMessage.textContent = '找不到符合的商品';
      emptyMessage.style.display = 'block';
    } else {
      emptyMessage.style.display = 'none';
      results.forEach((price) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${price.product_name}</td>
          <td>$${price.price.toFixed(2)}</td>
          <td>${price.record_date}</td>
          <td>
            <button class="btn-delete" onclick="deletePrice(${price.id})">刪除</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ 搜尋失敗，請檢查伺服器');
  }
});

// 4. 重置搜尋
resetBtn.addEventListener('click', () => {
  searchBox.value = '';
  emptyMessage.textContent = '目前沒有記錄';
  loadPrices();
});

// 5. 刪除記錄
async function deletePrice(id) {
  if (!confirm('確定要刪除嗎？')) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/prices/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('✅ 刪除成功');
      loadPrices();
    } else {
      alert('❌ 刪除失敗');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ 發生錯誤');
  }
}
```

---

## **第五階段：版本控制與文檔**

### ✅ 10. 建立 `.gitignore`
**檔案：`.gitignore`**

```
node_modules/
data.db
.env
.DS_Store
```

### ✅ 11. 初始化 Git 與上傳 GitHub
```bash
# 初始化 git
git init
git add .
git commit -m "feat: 物價追蹤網站初版"

# 建立 GitHub repo，然後：
git branch -M main
git remote add origin https://github.com/你的帳號/web_fcu_rent_tracker.git
git push -u origin main
```

### ✅ 12. 編寫 HackMD 文檔（最重要的繳交項目）
**包含以下內容：**

1. **基本資訊**
   - 姓名、班級、學號
   - 網站標題

2. **商品介紹**（為什麼選這個商品？）
   - 商品說明
   - 與通膨的關聯性
   - 個人為什麼關心這個商品

3. **功能規格表**（Spec）
   | 項目 | 說明 |
   |------|------|
   | 前端技術 | HTML + CSS + Vanilla JavaScript |
   | 後端技術 | Express.js + Node.js |
   | 資料庫 | SQLite |
   | API 路由 | POST, GET, DELETE 操作 |
   | 主要功能 | 新增、查詢、搜尋、刪除物價 |

4. **實作步驟說明**
   - 環境設置
   - 資料庫設計
   - 後端 API 開發流程
   - 前端頁面設計
   - 測試過程

5. **localhost 執行截圖**（最重要！）
   - 新增物價的截圖
   - 顯示表格清單的截圖
   - 搜尋功能的截圖
   - 刪除功能的截圖

6. **GitHub 連結**

7. **心得與反思**

---

## **第六階段：測試與本機驗證**

### ✅ 13. 本機測試步驟
```bash
# 1. 進入項目資料夾
cd Web_fcu_rent_tracker

# 2. 安裝依賴
npm install

# 3. 啟動伺服器
npm start

# 4. 打開瀏覽器
# http://localhost:3000

# 5. 測試流程：
# ✅ 新增一筆記錄（商品、價格、日期）
# ✅ 重新整理頁面，確認資料還在
# ✅ 搜尋商品功能
# ✅ 刪除記錄
# ✅ 檢查 data.db 檔案已產生
```

---

## **第七階段：部署（選項，但推薦）**

### ✅ 14. 部署到 Azure（推薦，資料持久）
**修改 3 個地方：**

**3-1. `server.js` - 動態 port**
```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
```

**3-2. `server.js` - Azure 資料夾路徑**
```javascript
import fs from 'fs';
import path from 'path';

const isAzure = !!process.env.WEBSITE_SITE_NAME;
const dataDir = isAzure ? '/home/data' : '.';

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(path.join(dataDir, 'data.db'));
```

**3-3. `package.json` - 補上 start 與 engines**
```json
{
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": ">=18"
  }
}
```

然後跟著 Homework.md 的「Azure 部署指南」完成部署。

---

## **最終繳交清單**

- [ ] 程式碼已上傳 GitHub
- [ ] 本機測試成功（localhost 可正常運作）
- [ ] `.gitignore` 已建立（node_modules 未上傳）
- [ ] HackMD 文檔已完成
  - [ ] 包含商品介紹和選擇理由
  - [ ] 包含完整 Spec 規格表
  - [ ] 包含 localhost 執行截圖
  - [ ] 包含 GitHub 連結
- [ ] **部署到 Azure 或 Render（選項）**
  - [ ] 網址可正常打開
  - [ ] 資料可持久保存
  - [ ] 部署截圖附進文檔

---

## **快速命令參考**

### 初始設置
```bash
npm install express sqlite3 body-parser cors
mkdir db public
```

### 開發階段
```bash
npm start  # 啟動伺服器（localhost:3000）
```

### Git 操作
```bash
git init
git add .
git commit -m "feat: 初版提交"
git branch -M main
git remote add origin <GitHub URL>
git push -u origin main
```

### 常見問題排除
```bash
# 清除 npm 快取
npm cache clean --force

# 重新安裝依賴
rm -r node_modules package-lock.json
npm install

# 檢查 Node 版本
node --version
```

---

**祝作業順利！有任何問題歡迎提問。** 🚀
