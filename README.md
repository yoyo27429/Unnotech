
# unnotech：

## 使用方法
```
npm install
```
```
npm run serve
```
打開瀏覽器進入http://localhost:8080 
首頁上方有兩個連結，點擊Books即可開始使用

## 專案架構：
從首頁進去後透過vue-router去管理路由，顯示書籍的詳細資料時，透過router取得書籍的id做動態router-link，並用nest-router的方式在下方顯示詳細資料，所有資料由vuex處理

## 第三方lib:
* **current-device** :可以判斷使用者正在使用裝置是手機、平板、或電腦。在 "Book List" 中由左到右排列，一般尺寸螢幕可以左右滾動，但如果在小尺寸螢幕上列表中的元素超出畫面就自動往下排列，透過這個來判斷顯示的方式
* **elment-ui**:在"Book List"如果使用者用手機觀看的話，他會將book card往下排列

## 遇到的困難及解決方式：
Book List的排版要求中，螢幕左右滾動想到的方式只有表格能滿足這個需求，但是表格沒辦法透過響應式的方式更改行列，最後解決的方法是寫兩種版本並透過v-show去開館，透過current-device先去判斷使用者的裝置，如果是手機的話顯示element-ui的響應式排版，如果是電腦的話就是顯示表個的左祐滾輪滑動


