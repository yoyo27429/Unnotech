<script>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import device from "current-device";
export default {
  setup() {
    const store = useStore();
    const isLoad = computed(() => store.getters.isLoad);
    const bookArr = computed(() => store.getters.bookArr);
    const isMobile = ref(false);
    if (device.mobile()) {
      isMobile.value = true;
    }

    const handBookLoad = (imgArr) => {
      // when loaded all image
      let i = 0;
      imgArr.forEach((image) => {
        const imgs = new Image();
        imgs.src = image.image;
        imgs.onload = () => {
          i++;
          // change the isLoad to true in the vuex store
          store.dispatch("handLoad", i === imgArr.length);
        };
      });
    };
    const initData = () => {
      store.dispatch("handInitData").then((res) => {
        handBookLoad(res);
      });
    };
    onMounted(() => {
      initData();
    });
    return { bookArr, isLoad, isMobile };
  },
};
</script>

<template>
  <div v-show="isLoad" id="box">
    <!-- <div v-for="item in bookArr" :key="item.id" class="card">
      <a href="#" class="book">
        <img :src="item.image" alt="" class="book" /> 
        {{ item.name }}
      </a>
    </div> -->
    <table v-show="!isMobile">
      <router-link
        v-for="item in bookArr"
        :key="item.id"
        :to="`/books/${item.id}`"
      >
        <tr>
          <td>
            <img :src="item.image" alt="" class="book" />
          </td>
        </tr>
        <tr>
          <td class="title">
            {{ item.name }}
          </td>
        </tr>
      </router-link>
    </table>

    <el-row :gutter="10" v-show="isMobile">
      <el-col v-for="item in bookArr" :key="item.id" :sm="24" :md="12" :lg="8">
        <router-link :to="`/books/${item.id}`" class="card">
          <img :src="item.image" alt="" class="book" />
          <p class="bookTitle">{{ item.name }}</p>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
#box {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.active {
  border: 1px solid;
}
.card {
  float: left;
}
.book {
  width: 200px;
  height: 271px;
}
.title {
  width: 100px;
  overflow: auto;
  word-break: break-all;
  padding: 0px 25px 0px 25px;
}
td {
  min-width: 250px;
  margin-right: 10px;
  /* border: 1px solid gray; */
}
a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
