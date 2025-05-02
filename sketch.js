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
  let x = (width - capture.width) / 2; // 計算影像的水平居中位置
  let y = (height - capture.height) / 2; // 計算影像的垂直居中位置

  // 更新 graphics 的內容
  graphics.background(0); // 設定背景為黑色
  for (let i = 0; i < capture.width; i += 20) {
    for (let j = 0; j < capture.height; j += 20) {
      let col = capture.get(i, j); // 取得 capture 對應位置的顏色
      graphics.fill(col); // 設定圓的顏色
      graphics.noStroke(); // 移除圓的邊框
      graphics.ellipse(i + 10, j + 10, 15, 15); // 繪製圓，中心點偏移 10 以對齊單位格
    }
  }

  // 繪製 graphics 在視訊畫面的上方
  image(graphics, x, y - capture.height / 2 - 10, capture.width, capture.height / 2);

  // 繪製視訊畫面
  image(capture, x, y, capture.width, capture.height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 調整影像大小
}
