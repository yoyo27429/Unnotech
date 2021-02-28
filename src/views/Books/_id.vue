<script>
import { computed, onMounted, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const bookDataArr = computed(() => store.getters.bookDataArr);
    const detail = reactive({ price: 0, count: 0 });
    const id = route.params.id;
    watch(
      () => route.path,
      () => {
        //   when user change the children router, this function will watch
        //   the new id and update the book's id
        if (route.path != "/books" || "") {
          const id = route.path.substr(1).split("/")[1];
          initBookData(id);
        }
      }
    );

    const initBookData = (id) => {
      // This function will initialize the book's detail
      store.dispatch("handBookData", id).then((res) => {
        // console.log(res);
        detail.price = res.price;
        detail.count = res.count;
      });
    };
    const AddNum = (type) => {
      // When the price or count number are added
      if (type === "price") {
        detail.price++;
      }
      if (type === "count") {
        detail.count++;
      }
    };
    const RemoveNum = (type) => {
      // When the price or count number are removed
      if (type === "price") {
        if (detail.price - 1 < 0) return 0;
        return detail.price--;
      }
      if (type === "count") {
        if (detail.count - 1 < 0) return 0;
        return detail.count--;
      }
    };
    const handSubmit = () => {
      // when click the submit btn, it will trigger this function to update new data to the server
      const newData = reactive({ id: 0, price: 0, count: 0 });
      newData.id = id;
      newData.price = detail.price;
      newData.count = detail.count;
      //   console.log(newData);
      axios
        .patch(`https://fe-interview-api.unnotech.com/profile/${id}`, {
          price: newData.price,
          count: newData.count,
        })
        .then(() => {
          alert("修改成功");
          router.go(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    onMounted(() => {
      initBookData(id);
    });
    return { bookDataArr, detail, AddNum, RemoveNum, handSubmit };
  },
};
</script>

<template>
  <div class="box">
    <div class="smBox">
      <a class="btn" href="javascript:;" @click="RemoveNum('price')">-</a>
      <div class="input">
        價格：<input type="text" name="" id="price" v-model="detail.price" />
      </div>
      <a class="btn" href="javascript:;" @click="AddNum('price')">+</a>
    </div>
    <div class="smBox">
      <!-- {{ detail.count }} -->
      <a class="btn" href="javascript:;" @click="RemoveNum('count')">-</a>
      <div class="input">
        數量：<input type="text" name="" id="count" v-model="detail.count" />
      </div>
      <a class="btn" href="javascript:;" @click="AddNum('count')">+</a>
    </div>
    <div class="smBox"><button @click="handSubmit">確認修改</button></div>
  </div>
</template>

<style lang="scss" scoped>
.smBox {
  width: 50%;
  float: left;
  margin-left: 25%;
  > .btn {
    display: block;
    height: 1.5rem;
    width: 1.5rem;
    font-size: 1.5rem;
    line-height: 1.5rem;
    text-decoration: none;
    border: solid 1px black;
    border-radius: 0.3rem;
    margin: 0.5rem;
    color: black;
    float: left;
  }
  > .input {
    font-size: 1.5rem;
    float: left;
  }
  > button {
    float: right;
  }
}
</style>
