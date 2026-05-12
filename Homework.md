# 作業4 通貨膨脹-你關心缺蛋嗎?

## 繳交期限 **2026/5/13 (三) 23:59**

## 通貨膨脹(Inflation)

https://zh.wikipedia.org/zh-tw/%E9%80%9A%E8%B4%A7%E8%86%A8%E8%83%80

是指 一段時間內貨幣購買力下降、物價普遍上升的現象。

> 你最近是不是發現：
> 
> - 50 嵐、清心福全的飲料默默漲了 5 元
> - 大學自助餐一個便當輕鬆破百
> - 連泡麵、雞蛋都一直漲
> 
> **104 人力銀行調查**：大學生平均每週飲食花費 **2,344 元**，每餐超過百元。 其中 **34% 的人因為漲價而「放棄雞排、鹽酥雞」**。
> 
>  https://udn.com/news/story/6928/8353825
> 

## **消費者物價指數 (Consumer Price Index, CPI)**

https://zh.wikipedia.org/zh-tw/%E6%B6%88%E8%B2%BB%E8%80%85%E7%89%A9%E5%83%B9%E6%8C%87%E6%95%B8

是國家統計代表性商品和服務價格變動的綜合指標。

舉例來說，台灣 2021 年 1 月的 CPI 是 103.08，2022 年 1 月的 CPI 是 106.01，那這一年的通貨膨脹率就是 (106.01 – 103.08) / 103.08，等於 2.8%。

**最新數據**：台灣 2026 年 3 月 CPI 年增率為 1.2%， 雖然官方數字溫和，但**民眾體感**和官方 CPI 落差很大 — 因為每個人關心的商品不同。

> 舉例：政府的 CPI 籃子裡有汽車、家電、房租等。 但對你來說，**手搖飲漲 5 元、便當漲 10 元** 才是真實生活的通膨。
> 
> 
> **這就是「個人化 CPI」的價值** — 你可以根據自己的消費習慣，追蹤你關心的商品價格， 算出**屬於你的通膨率**。
> 

> **本作業要做的就是：設計一個前、後端與資料庫管理的物價追蹤網站， 讓你輸入商品價錢、檢視歷史清單，追蹤你最在意的物價變化。**
> 

#### **此作業，可以讓對特定商品感興趣的使用者一起關心物價變化，**

#### **用「自己的數據」理解通貨膨脹。**

# 作業說明

1. 請至 google 表單，附上你所關心商品的【商品名稱】與【商品資料來源網站】。
    
    參考商品：科學麵、滷肉飯、雞排、珍奶、台鐵便當等。
    
2. 網站請包含
    1. 根據你的主題，幫網站取一個網站標題。
    2. 輸入(日期、商品名稱、商品價格)
    3. 簡易查詢
        1. 直接以表格或清單呈現物價變化
        2. 或是可以輸入文字框，縮小搜尋範圍等功能。
3. 網頁需要有前端網頁、後端用 express.js 寫 web api、與 SQLite 資料庫。
4. 請使用 openspec 將實作過程紀錄下來。
5. 請先將網頁原始碼上傳到 GitHub ，不需要執行。
6. 請使用 hackmd / notion ，或是其他可雲端分享的文件，說明實作過程：
    - 打上姓名、班級、網站標題
    - 請介紹商品特色，【你】為什麼選這類型的商品?
    - 請附上 spec 規格表，說明實作過程。
    - 請附上 localhost 的執行流程與畫面，以圖文並茂的方式說明。
    - 這份文件是一個教學說明，讓大家看你的文件，就可以學會怎麼做。
    - [**問題解決人才媒合會**](https://www.cakeresume.com/campaigns/Talent-Attract)

#### 請至 google 表單 [作業4 特定商品CPI](https://docs.google.com/spreadsheets/d/1LzFaSOuwNJAQzAQS3m2VpahbuFT_84nOn1FpX4qAWDI/edit?gid=21585170#gid=21585170) 填寫目標商品

# 加分區

### 自由決定要不要加入爬蟲功能

請參考以下 chatgpt 問答來開發爬蟲

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a36a185b-feb6-4c2c-a9c6-6e96c952fa1e/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4d11c834-c44b-49a1-bb65-107f149850e4/Untitled.png)

程式執行結果

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ed6ae312-af5f-4fbf-8a12-d23aa8645977/Untitled.png)

### 自由決定要不要部署作品到雲端

### **1. 用 Azure App Service 部署 Express + SQLite 作品（學生指引）**

> 本文件帶你把作業 4「物價追蹤網站」從 localhost 部署到 Azure App Service，讓同學、老師打開網址就能看到你的作品。
> 
> 
> 全程使用 **Azure for Students 免費方案**、**不需信用卡**，預計 30–40 分鐘完成。
> 
> 跟 Render 比，Azure 的優點是 **SQLite 資料庫可以持久保存**，作品比較像真實服務。
> 

---

## **0. 你會用到的東西**

- 一個 GitHub 帳號（推 code 用）
- 一個 **學校 email**（驗證學生身份用）
- 一個 Microsoft 帳號（Azure 登入用，可用學校 email 註冊）
- 你已經寫好的 Express + SQLite 作品

---

## **1. 申請 Azure for Students（第一次才需要做）**

1. 前往 https://azure.microsoft.com/free/students
2. 點 **Activate now**，用 Microsoft 帳號登入
3. 用**學校 email** 驗證學生身份（或上傳學生證）
4. 通過後會獲得：
    - **$100 美金額度**（12 個月）
    - **App Service F1 免費方案**（永久免費）
    - 不需要信用卡 ✅
    - 額度用完不會自動扣款 ✅

> 💡 本作業只會用到永久免費的 F1 方案，**完全不會花到那 $100 額度**。
> 

---

## **2. 確認專案結構**

最少需要長這樣：

```
your-project/
├── server.js           # Express 入口檔
├── package.json
├── package-lock.json
├── public/             # 前端 HTML/CSS/JS
│   └── index.html
└── (data.db)           # SQLite 檔（會自動產生，不必先建立）
```

> ⚠️ **不要把 `node_modules/` 推上 GitHub**。在專案根目錄建立 `.gitignore`：
> 
> 
> ```
> node_modules/
> data.db
> .env
> ```
> 

---

## **3. 改 3 個地方，讓程式能在 Azure 跑**

### **3-1. `server.js` 的 port 必須用環境變數**

Azure 會動態分配 port，**不可以寫死 3000**。

```jsx
// ❌ 不行
app.listen(3000);

// ✅ 正確
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
```

### **3-2. SQLite 檔案路徑要切換到 Azure 的持久資料夾**

Azure App Service 上**只有 `/home` 這個資料夾會持久保存**，重啟、重新部署都不會消失。

```jsx
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// 在 Azure 用 /home/data，本機用當前資料夾
const isAzure = !!process.env.WEBSITE_SITE_NAME;
const dataDir = isAzure ? '/home/data' : '.';

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(path.join(dataDir, 'data.db'));
```

> 💡 `WEBSITE_SITE_NAME` 是 Azure App Service 自動注入的環境變數，本機跑時會是 `undefined`，剛好可以拿來判斷環境。
> 

### **3-3. `package.json` 補上 `start` 與 `engines`**

Azure 預設執行 `npm start`：

```json
{
  "name": "price-tracker",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": ">=20"
  },
  "dependencies": {
    "express": "^4.19.2",
    "sqlite3": "^5.1.7"
  }
}
```

---

## **4. 推上 GitHub**

```bash
cd your-project
git init
git add .
git commit -m "feat: 物價追蹤網站初版"
git branch -M main
git remote add origin https://github.com/你的帳號/price-tracker.git
git push -u origin main
```

開啟 GitHub repo 確認檔案都在、`node_modules/` 不在。

---

## **5. 在 Azure Portal 建立 Web App**

### **5-1. 進入建立頁面**

1. 登入 [https://portal.azure.com](https://portal.azure.com/)
2. 上方搜尋列輸入 `App Services` → 點擊
3. 點 **Create** → **Web App**

### **5-2. 填寫 Basics 頁籤**

| 欄位 | 填法 |
| --- | --- |
| **Subscription** | `Azure for Students` |
| **Resource Group** | 點 **Create new** → 命名為 `web-homework`（之後作業可重用） |
| **Name** | `price-tracker-你的學號`（會變成網址前綴，全 Azure 唯一） |
| **Publish** | `Code` |
| **Runtime stack** | `Node 20 LTS` |
| **Operating System** | **Linux**（重要，不要選 Windows） |
| **Region** | `East Asia` 或 `Southeast Asia`（離台灣最近） |

### **5-3. 切到 Pricing plan 頁籤**

| 欄位 | 填法 |
| --- | --- |
| **Linux Plan** | 點 **Create new** → 命名 `student-plan` |
| **Pricing plan** | 點 **Explore pricing plans** → 選 **Free F1** → **Select** |

> ⚠️ 預設可能是付費方案，**一定要手動切到 F1**，否則會用到 $100 額度。
> 

### **5-4. 建立**

1. 其他頁籤（Database / Networking / Monitoring）保持預設
2. 點 **Review + create** → **Create**
3. 等 1–2 分鐘，看到 **Your deployment is complete** 即可

---

## **6. 設定 GitHub 自動部署**

### **6-1. 開啟 Deployment Center**

1. 部署完成後點 **Go to resource**
2. 左側選單找到 **Deployment** → **Deployment Center**

### **6-2. 連結 GitHub**

| 欄位 | 填法 |
| --- | --- |
| **Source** | `GitHub` |
| **Organization** | 你的 GitHub 帳號 |
| **Repository** | `price-tracker`（剛才推上去的 repo） |
| **Branch** | `main` |
| **Authentication type** | `User-assigned identity`（推薦） |

點 **Save** 後，Azure 會：

- 自動在你的 repo 產生 `.github/workflows/main_xxx.yml`
- 觸發第一次 GitHub Actions 部署
- 之後每次 push 到 `main` 都會自動部署

### **6-3. 觀察部署進度**

1. 切到 **Logs** 頁籤看 Azure 端紀錄
2. 或回 GitHub repo → **Actions** 頁籤看 workflow 跑到哪
3. 第一次部署需要 3–5 分鐘

---

## **7. 取得你的 demo 網址**

回 App Service 頁面 **Overview**，會看到 **Default domain**：

```
https://price-tracker-你的學號.azurewebsites.net
```

點開測試 — **可以直接貼給老師、同學**。

---

## **8. 截圖加進你的 HackMD/Notion 文件**

老師作業要求附上「執行流程與畫面」，建議包含：

- ✅ Azure Portal 的 Web App **Overview** 頁面（顯示 Running 狀態）
- ✅ Deployment Center 的成功紀錄
- ✅ GitHub Actions 的綠勾勾
- ✅ 在 Azure 網址打開的網站操作畫面
- ✅ 新增一筆物價資料 → 重新整理 → 資料還在的對照（展示 SQLite 持久化）

---

## **9. 常見錯誤排除**

| 症狀 | 原因 | 解法 |
| --- | --- | --- |
| 網址打開顯示 **Application Error** | server.js 沒啟動成功 | 看 **Log stream**（左側選單）找錯誤訊息 |
| 看到預設 Azure 歡迎頁 | 還沒部署完成 | 等 GitHub Actions 跑完再開 |
| Build 失敗：找不到 `sqlite3` | Azure 預設不會自動裝原生模組 | 在 App Service **Configuration → Application settings** 加 `SCM_DO_BUILD_DURING_DEPLOYMENT = true` |
| 部署成功但網站超慢 | F1 方案 CPU 配額被吃完 | 等隔天配額重置；或暫時升 B1（用學生額度） |
| `EACCES` 寫檔錯誤 | SQLite 路徑沒切到 `/home/data` | 回頭檢查第 3-2 步 |
| GitHub Actions 一直失敗 | secrets 沒設好 | 刪掉 Deployment Center 設定，重新連結一次 |

### **怎麼看 Log**

App Service 頁面 → **Monitoring** → **Log stream**，會即時顯示 server.js 的 console.log 與錯誤訊息，是最重要的 debug 工具。

---

## **10. 學生訂閱注意事項**

- ✅ **F1 方案永久免費**，不會吃到 $100 額度
- ✅ 額度用完只會停服務，**不會欠費**
- ⚠️ 12 個月後學生訂閱到期，**記得把不用的 Resource Group 刪掉**
- ⚠️ 不要不小心建到 **Standard / Premium** 方案，那會吃額度很快

### **怎麼確認自己沒花到錢**

Portal 左側 → **Cost Management + Billing** → 看當月使用金額，應該保持 **$0.00**。

---

## **11. 之後要更新作品怎麼辦？**

只要 push 到 GitHub 的 `main` 分支，Azure 會**自動重新部署**：

```bash
git add .
git commit -m "fix: 修正搜尋功能"
git push
```

GitHub repo → **Actions** 頁籤可以看到部署進度。

---

## **12. Azure vs Render 怎麼選？**

| 你的情況 | 推薦 |
| --- | --- |
| 想最快讓作業可以 demo | **Render**（15 分鐘完成） |
| 想讓 SQLite 資料持久保存 | **Azure**（/home 資料夾持久） |
| 想累積業界雲端服務經驗 | **Azure**（履歷加分） |
| 之後想接其他雲端服務（資料庫、AI） | **Azure**（生態系完整） |

兩個都會的話，**履歷上「熟悉 Azure 雲端部署」這條會比同學強一截**。

---

## **繳交清單檢查**

- [ ]  程式碼已上 GitHub（連結放進文件）
- [ ]  Azure App Service 部署成功，網址可開啟
- [ ]  確認 SQLite 資料在重新整理 / 重啟後仍存在
- [ ]  文件包含商品介紹、選擇理由
- [ ]  文件包含 localhost 與 Azure 線上 demo 截圖
- [ ]  文件包含完整實作步驟教學

完成 ✅

### 2. 用 Render 部署 Express + SQLite 作品（學生指引）

> 本文件帶你把作業 4「物價追蹤網站」從 localhost 部署到 Render，讓同學、老師打開網址就能看到你的作品。
> 
> 
> 全程**免費**、**不需信用卡**，預計 15–20 分鐘完成。
> 

---

## 0. 你會用到的東西

- 一個 GitHub 帳號（推 code 用）
- 一個 Render 帳號（部署用，建議直接用 GitHub 登入）
- 你已經寫好的 Express + SQLite 作品

---

## 1. 確認專案結構

最少需要長這樣：

```
your-project/
├── server.js           # Express 入口檔
├── package.json
├── package-lock.json
├── public/             # 前端 HTML/CSS/JS
│   └── index.html
└── (data.db)           # SQLite 檔（會自動產生，不必先建立）
```

> ⚠️ **不要把 `node_modules/` 推上 GitHub**。在專案根目錄建立 `.gitignore`：
> 
> 
> ```
> node_modules/
> data.db
> .env
> ```
> 

---

## 2. 改 3 個地方，讓程式能在 Render 跑

### 2-1. `server.js` 的 port 必須用環境變數

Render 會動態分配 port，**不可以寫死 3000**。

```jsx
// ❌ 不行
app.listen(3000, () => console.log('on 3000'));

// ✅ 正確
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on${PORT}`));
```

### 2-2. `package.json` 補上 `start` 與 `engines`

Render 預設執行 `npm start`，所以必須有 start script：

```json
{
  "name": "price-tracker",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": ">=18"
  },
  "dependencies": {
    "express": "^4.19.2",
    "sqlite3": "^5.1.7"
  }
}
```

> 沒有 `start` 指令的話 Render 會直接部署失敗。
> 

### 2-3. SQLite 檔案路徑用相對路徑

```jsx
// ✅ 用相對路徑
const db = new sqlite3.Database('./data.db');
```

> ⚠️ Render **免費版**沒有持久化磁碟，**每次重新部署或休眠喚醒後 `data.db` 會重置**。
對於「作業 demo」夠用 — 老師打開看一下功能就好。
如果要長期保存資料，請見文末「進階：持久化資料」章節。
> 

---

## 3. 推上 GitHub

```bash
cd your-project
git init
git add .
git commit -m "feat: 物價追蹤網站初版"
git branch -M main
git remote add origin https://github.com/你的帳號/price-tracker.git
git push -u origin main
```

開啟 GitHub repo 確認檔案都在、`node_modules/` 不在。

---

## 4. 在 Render 建立 Web Service

### 4-1. 註冊與登入

1. 前往 [https://render.com](https://render.com/)
2. 點 **Get Started** → 選 **Sign in with GitHub**（推薦，省事）
3. 授權 Render 讀取你的 repo

### 4-2. 建立服務

1. Dashboard 右上角 **New +** → 選 **Web Service**
2. 找到你剛剛推上去的 repo，點 **Connect**
3. 填入以下設定：

| 欄位 | 填法 |
| --- | --- |
| **Name** | `price-tracker`（會變成網址前綴，可自訂） |
| **Region** | `Singapore`（離台灣最近） |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | **Free** |
1. 拉到底，點 **Create Web Service**

### 4-3. 等待部署

- Render 會自動跑：`git clone` → `npm install` → `npm start`
- 第一次大約需要 2–5 分鐘
- Log 跑出 `Server running on 10000`（或類似 port）就表示成功

---

## 5. 取得你的 demo 網址

部署成功後，畫面最上方會出現：

```
https://price-tracker-xxxx.onrender.com
```

這就是你的作品網址，**可以直接貼給老師、同學**。

---

## 6. 截圖加進你的 HackMD/Notion 文件

老師作業要求附上「執行流程與畫面」，建議包含：

- ✅ Render Dashboard 的 service 狀態（Live 綠燈）
- ✅ 部署 log 最後幾行（顯示伺服器啟動訊息）
- ✅ 在 Render 網址打開的網站操作畫面
- ✅ 新增一筆物價資料的前後對照

---

## 7. 常見錯誤排除

| 症狀 | 原因 | 解法 |
| --- | --- | --- |
| Build 失敗，找不到模組 | 沒把 `package.json` 推上去，或漏裝套件 | 本機跑 `npm install <套件>` 後重新 commit、push |
| Deploy 成功但網址打不開 | port 寫死成 3000 | 改成 `process.env.PORT || 3000` |
| `Cannot find module 'sqlite3'` | sqlite3 套件編譯失敗 | `package.json` 的 `engines.node` 改成 `>=18`，或改用 `better-sqlite3` |
| 過 15 分鐘沒人用就 503 | 免費版會休眠 | 正常，再次造訪需等 30–50 秒喚醒 |
| 重新部署後資料消失 | 免費版檔案系統不持久化 | 預期行為，見下方進階章節 |

---

## 8. 進階：讓資料持久化（選做）

免費方案不支援 disk，有兩個選擇：

### 選項 A：升級 Render 付費 disk（最低 $1/月）

Service → **Disks** → 掛載 `/var/data`，把 SQLite 路徑改成 `/var/data/data.db`。

### 選項 B：改用免費雲端 SQLite 服務

- [**Turso**](https://turso.tech/)：libSQL（SQLite 衍生），免費額度大方，學生最推薦
- [**Cloudflare D1**](https://developers.cloudflare.com/d1/)：Cloudflare 的 SQLite，免費額度足夠

> 對於這次作業，**用免費方案就好**，不需要為了資料持久化額外花錢。
> 

---

## 9. 之後要更新作品怎麼辦？

只要 push 到 GitHub 的 `main` 分支，Render 會**自動重新部署**：

```bash
git add .
git commit -m "fix: 修正搜尋功能"
git push
```

回 Render Dashboard 看 Events 就會看到新的 deploy 在跑。

---

## 繳交清單檢查

- [ ]  程式碼已上 GitHub（連結放進文件）
- [ ]  Render 部署成功，網址可開啟
- [ ]  文件包含商品介紹、選擇理由
- [ ]  文件包含 localhost 與線上 demo 截圖
- [ ]  文件包含完整實作步驟教學

完成 ✅

[render-deploy-guide](https://www.notion.so/render-deploy-guide-3594d6634bf680009aa2f6aecf40acac?pvs=21)

# 作業檢查清單 (checklist)

## A. 網站功能

| # | Spec |
| --- | --- |
| A1 | 網站可在本機透過 `npm install` 與 `npm start` 成功啟動，不產生錯誤訊息 |
| A2 | 網站有**自訂的標題**（與所選商品主題相關，例如「科學麵物價追蹤」、「便當價格觀測站」） |
| A3 | 提供輸入介面，能讓使用者輸入【日期】、【商品名稱】、【商品價格】三個欄位 |
| A4 | 輸入的資料會被儲存—**重新整理頁面後資料仍存在**（驗證資料庫寫入） |
| A5 | 能以**表格或清單**方式呈現所有已輸入的物價歷史紀錄 |
| A6 | 至少包含 **3 筆以上**的測試資料，能展示物價變化 |

## B. 技術架構

| # | Spec |
| --- | --- |
| B1 | **前端**使用 HTML/CSS/JavaScript（不使用框架） |
| B2 | **後端**使用 Express.js 撰寫 Web API |
| B3 | **資料庫**使用 SQLite 儲存資料 |
| B4 | 前端透過 `fetch` 或 `axios` 呼叫後端 API，能成功**取得與寫入**資料 |

## C. 原始碼繳交

| # | Spec |
| --- | --- |
| C1 | 程式碼已**上傳到 GitHub** |
| C2 | GitHub repo **不包含 node_modules 資料夾**（已使用 .gitignore） |
| C3 | 包含完整的 **package.json**（含 express、sqlite3 等必要相依） |
| C4 | GitHub repo 為**公開或可透過連結瀏覽**（評分人可開啟） |

## D. 技術說明文件

| # | Spec |
| --- | --- |
| D1 | 文件使用雲端平台撰寫（HackMD/Notion/Google Doc 等），**分享權限已開啟** |
| D2 | 文件包含【**商品介紹**】與【**個人選擇理由**】 |
| D3 | 文件包含 [localhost](http://localhost) **執行流程截圖**（至少 3 張，包含啟動、輸入、查詢畫面） |
| D4 | 文件包含**關鍵程式碼片段**（前端、後端、資料庫操作各至少 1 段並附說明） |
| D5 | 文件**足以作為教學說明**——他人讀完後能照著做出類似網站 |

## E. 加分項目（選做）

| # | Spec |
| --- | --- |
| E1 | 實作**爬蟲功能**，能自動從來源網站抓取最新價格 |
| E2 | 將作品**部署到雲端**（Render 或 Azure），提供可公開存取的 demo 網址 |

# 參考資料

- [清心福全漲價！52 款調漲品項一次看 (2025/7)](https://tw.news.yahoo.com/%E6%B8%85%E5%BF%83%E7%A6%8F%E5%85%A8%E6%92%90%E4%B8%8D%E4%BD%8F-7-26%E8%B5%B7%E6%BC%B25%E5%85%83-%E8%AA%BF%E6%BC%B2%E5%93%81%E9%A0%85-%E6%AC%A1%E7%9C%8B-092400153.html)
- [手搖飲霸主全漲！50 嵐貴 5 元、清心漲 8%](https://www.nownews.com/news/5732999)
- [物價漲！大學生三餐負擔大 每餐逾百元每周平均 2,344 元 (聯合報)](https://udn.com/news/story/6928/8353825)
- [從泡麵到進口車都悄悄漲價 通膨已來襲 (天下雜誌)](https://www.cw.com.tw/article/5118912)
- [大通膨時代：測驗你的體感通膨程度 (聯合報互動)](https://vip.udn.com/newmedia/2024/inflation-quiz/)
- [全球食品價格指數連續上漲 (FAO)](https://www.fao.org/worldfoodsituation/foodpricesindex/en/)

- [**問題解決人才媒合會**](https://www.cakeresume.com/campaigns/Talent-Attract)
- [**電商歷史價格查詢**](https://twbuyer.info/)
- [什麼都貴！1 月 CPI 年增率 3.04%、創半年新高，通貨膨脹怎麼來的？](https://www.managertoday.com.tw/articles/view/64720)
- [中華食物網](http://www.foodchina.com.tw/)
- [**美國2月CPI 3.2%略高於預期！CPI 是什麼？如何用 CPI 計算通膨率？升息為什麼能抑制通膨？**](https://ynews.page.link/53ZpH)
- [**通膨已成為新常態時，2023年的全球經濟還面臨哪4大挑戰？**](https://www.gvm.com.tw/article/100382)