import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ElRow, ElCol } from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(ElCol)
  .use(ElRow)
  .mount("#app");
