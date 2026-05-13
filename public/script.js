let inflationChart = null; // 用來裝圖表的變數

// 1. 網頁載入時，立刻去後端拿資料 (GET)
window.onload = function() {
    fetchRecords();
};

async function fetchRecords() {
    try {
        const res = await fetch('http://localhost:3000/api/records');
        const data = await res.json();
        
        const tbody = document.getElementById('table_body');
        tbody.innerHTML = ''; 
        
        // 渲染下方的表格
        data.forEach(row => {
            tbody.innerHTML += `
                <tr>
                    <td>${row.service_name}</td>
                    <td>$${row.price}</td>
                    <td>${row.record_date}</td>
                </tr>
            `;
        });

        // 呼叫畫圖表的函數，把從資料庫拿到的資料傳進去畫圖
        updateChart(data);

    } catch (error) {
        console.error('讀取資料失敗:', error);
    }
}

// 產生與更新折線圖的專屬函數
function updateChart(data) {
    // 如果資料庫是空的，就不畫圖避免報錯
    if (data.length === 0) return;

    const ctx = document.getElementById('inflationChart').getContext('2d');

    // 1. 將資料按日期排序 (從舊到新)
    const sortedData = [...data].sort((a, b) => new Date(a.record_date) - new Date(b.record_date));

    // 2. 抓出所有不重複的日期作為 X 軸
    const allDates = [...new Set(sortedData.map(item => item.record_date))].sort();

    // 3. 將資料按服務名稱分組，並設定專屬顏色
    const services = {};
    const colors = {
        "YouTube Premium 家庭方案": "#FF0000", // YouTube 紅
        "Netflix 高級方案": "#86040b",         // Netflix 紅
        "Spotify 家庭方案": "#1DB954",         // Spotify 綠
        "Disney+ 高級方案": '#00fbff',         // 亮青色 (亮眼好辨識)
        "Disney+ 標準方案": '#3742fa'          // 深藍色 (與高級版區隔)
    };

    sortedData.forEach(row => {
        if (!services[row.service_name]) services[row.service_name] = [];
        services[row.service_name].push(row);
    });

    const datasets = [];
    for (const [serviceName, records] of Object.entries(services)) {
        // 對齊 X 軸的日期，沒有資料的月份補 null
        const dataPoints = allDates.map(date => {
            const record = records.find(r => r.record_date === date);
            return record ? record.price : null;
        });

        datasets.push({
            label: serviceName,
            data: dataPoints,
            borderColor: colors[serviceName] || '#ffffff',
            backgroundColor: colors[serviceName] || '#ffffff',
            tension: 0.2, // 讓線條稍微平滑
            spanGaps: true // 連接斷掉的點
        });
    }

    // 4. 如果圖表已經存在，先摧毀舊的再畫新的 (避免重疊閃爍)
    if (inflationChart) {
        inflationChart.destroy();
    }

    // 5. 繪製 Chart.js
    inflationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: allDates,
            datasets: datasets
        },
        options: {
            responsive: true,
            color: 'white', // 圖例文字顏色
            scales: {
                x: { ticks: { color: 'white' }, grid: { color: '#4a5568' } },
                y: { ticks: { color: 'white' }, grid: { color: '#4a5568' } }
            },
            plugins: {
                legend: { labels: { color: 'white' } }
            }
        }
    });
}

// 2. 監聽表單送出，把資料存進資料庫 (POST)
document.getElementById('record_form').addEventListener('submit', async (e) => {
    e.preventDefault(); // 阻止網頁重新整理
    
    const newData = {
        service_name: document.getElementById('service_name').value,
        price: document.getElementById('price').value,
        record_date: document.getElementById('record_date').value
    };

    try {
        const res = await fetch('/api/records', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        });
        
        const message = await res.text();
        document.getElementById('log').innerText = message;
        
        // 清空輸入框並重新讀取表格與圖表
        document.getElementById('price').value = '';
        fetchRecords(); 
    } catch (error) {
        document.getElementById('log').innerText = '新增失敗，請檢查伺服器';
    }
});

// 3. 監聽爬蟲按鈕 (一鍵寫入歷史紀錄)
document.getElementById('btn_scrape').addEventListener('click', async () => {
    const log = document.getElementById('log');
    log.innerText = '🤖 爬蟲出動中，正在取得歷年價格並寫入資料庫...';
    
    try {
        // 1. 呼叫爬蟲 API 拿回陣列資料
        const res = await fetch('/api/scrape/disney');
        const result = await res.json();
        
        if (result.success) {
            // 2. 使用 for 迴圈，把每一筆歷史價格都 POST 到資料庫
            for (let item of result.data) {
                await fetch('/api/records', { // ⚠️ 記得這裡要是 /api/records，不要加 localhost
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item)
                });
            }
            
            log.innerText = `✅ 爬蟲成功！已自動將 Disney+ 的歷史價格匯入觀測站！`;
            
            // 3. 重新整理下方的表格，讓新資料馬上顯示出來
            fetchRecords(); 
        }
    } catch (error) {
        log.innerText = '❌ 爬蟲失敗，請檢查伺服器連線。';
    }
});