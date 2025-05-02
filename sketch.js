let capture;
let graphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background('#edede9'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上

  // 建立與視訊畫面相同大小的 graphics
  graphics = createGraphics(capture.width, capture.height);
  graphics.background(0); // 設定 graphics 的背景顏色為黑色
}

function draw() {
  background('#edede9'); // 確保背景顏色持續更新

  // 更新 graphics 的內容
  graphics.background(0); // 設定背景為黑色
  graphics.push(); // 儲存 graphics 畫布狀態
  graphics.translate(graphics.width, 0); // 將畫布的原點移到右上角
  graphics.scale(-1, 1); // 水平翻轉畫布

  for (let i = 0; i < capture.width; i += 20) {
    for (let j = 0; j < capture.height; j += 20) {
      let col = capture.get(i, j); // 取得 capture 對應位置的顏色
      graphics.fill(col); // 設定方框的顏色
      graphics.noStroke(); // 移除邊框
      graphics.rect(i, j, 18, 18); // 繪製方框

      // 繪製中間的黑色圓
      graphics.fill(0); // 設定圓的顏色為黑色
      graphics.ellipse(i + 9, j + 9, 10, 10); // 繪製圓，中心點位於方框的中心
    }
  }

  graphics.pop(); // 恢復 graphics 畫布狀態

  // 計算 graphics 的繪製位置，讓其居中
  let x = (width - capture.width) / 2; // 計算水平居中位置
  let y = (height - capture.height) / 2; // 計算垂直居中位置

  // 將 graphics 的內容繪製到畫布的中間
  image(graphics, x, y, capture.width, capture.height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
}
