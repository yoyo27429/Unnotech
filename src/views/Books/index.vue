<script>
import BookList from "@/components/bookCard/BookList.vue";
import Loading from "@/components/Loading.vue";

export default {
  components: {
    BookList,
    Loading,
  },
};
</script>

<template>
  <div id="bookCardBox">
    <BookList />
    <Loading />
  </div>
  <div id="detailBox">
    <router-view />
  </div>
</template>

<style>
#bookCardBox {
  width: 80%;
  margin-left: 10%;
}
</style>
