# OpenSpec 實作紀錄：物價追蹤網站

## 1. 專案概述 (Project Overview)
本專案為一個用於追蹤特定商品（如：手搖飲、便當、科學麵等）物價變動的 Web 應用程式。使用者可以記錄日期、商品名稱及價格，並查看歷史價格變動，以理解「體感通膨」。

## 2. 技術架構 (Technical Architecture)
- **前端 (Frontend)**: 原生 HTML, CSS, JavaScript (使用 `fetch` 呼叫 API)
- **後端 (Backend)**: Node.js + Express.js
- **資料庫 (Database)**: SQLite (使用 `sqlite3` 模組)

## 3. 資料庫設計 (Database Schema)
使用 SQLite 儲存物價紀錄，資料表 `records` 結構如下：

| 欄位名稱 | 型態 | 說明 |
| :--- | :--- | :--- |
| id | INTEGER | 主鍵，自動遞增 |
| service_name | TEXT | 商品名稱 |
| price | INTEGER | 商品價格 |
| record_date | TEXT | 記錄日期 (YYYY-MM-DD) |

## 4. API 規格 (API Specifications)

### 4.1 取得所有紀錄
- **URL**: `/api/records`
- **Method**: `GET`
- **Response**: 返回所有物價紀錄的 JSON 陣列。

### 4.2 新增物價紀錄
- **URL**: `/api/records`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "service_name": "商品名稱",
    "price": 100,
    "record_date": "2026-05-13"
  }
  ```
- **Response**: `新增成功！` 或錯誤訊息。

## 5. 實作過程紀錄 (Implementation Steps)

### 第一步：環境初始化
1. 建立專案資料夾。
2. 執行 `npm init -y` 初始化 `package.json`。
3. 安裝必要套件：`npm install express sqlite3 cors`。

### 第二步：資料庫設定 (`db.js`)
使用 `sqlite3` 建立並連線至 `digital_inflation.db`，並在啟動時自動檢查並建立 `records` 資料表。

### 第三步：後端伺服器開發 (`server.js`)
1. 設定 Express 伺服器並連結靜態資料夾 `public`。
2. 實作 `GET /api/records` 讀取資料。
3. 實作 `POST /api/records` 寫入資料。

### 第四步：前端介面開發 (`public/`)
1. **HTML**: 設計輸入表單（日期、名稱、價格）與顯示表格。
2. **CSS**: 基本排版優化。
3. **JS**: 
    - 使用 `loadRecords()` 函數在頁面載入時取得資料並渲染表格。
    - 監聽表單提交事件，使用 `fetch` 發送 `POST` 請求。

### 第五步：測試與驗證
1. 啟動伺服器：`node server.js`。
2. 開啟 `http://localhost:3000` 測試新增資料與查詢。
3. 確認重新整理頁面後，資料依然存在於清單中。

## 6. 自定義資訊
- **網站標題**: 你知道這是什麼嗎？訂閱費通膨觀測
- **商品特色與選擇理由**: 
    談到通貨膨脹，通常最先想到的是便當或雞蛋等實體民生物資的漲價。不過通膨除了顯示於實體物品上面，數位相關產品等非實體商品也都有相關通膨漲幅。

    還記得 2022 年最佳 YouTube Premium 廣告商亞馬遜電商網紅（Ellen Pro）嗎？當時 YouTube Premium 也才剛推出沒幾年，正是會員增長的全盛期，而過沒多久的今年，訂閱價格又成長了許多。

    此外，最近關注到身邊的家人朋友們都有購買不同串流平台會員，雖然身為貧窮大學生大多是蹭家人朋友的家庭方案，但也不禁好奇隨著串流平台百家爭鳴且接連調漲，一旦同時訂閱多個服務，每月累積的數位開銷其實非常驚人。加上這種訂閱方案基本上「回不去了」，習慣了無廣告模式就難以忍受中斷，每個月固定且漸漸增加的費用算起來十分可觀。

    因此，我決定以此為主題，建立「數位訂閱費觀測站」，用實際的數據來追蹤這些無形的數位通膨是如何蠶食我們的生活費，看清這些興起才短短幾十年的數位娛樂訂閱價格之漲幅變化趨勢。
