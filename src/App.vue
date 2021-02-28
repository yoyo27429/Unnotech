<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const routeArr = ["", "books"];
    const route = useRoute();
    const idx = ref(0);
    watch(
      () => route.path,
      () => {
        routeArr.forEach((item, index) => {
          const routeName = route.path.substr(1).split("/")[0];
          if (routeName === item) {
            idx.value = index;
          }
        });
      }
    );
    return { idx };
  },
};
</script>
<template>
  <div id="nav">
    <router-link to="/" :class="{ active: idx === 0 }">Home</router-link> |
    <router-link to="/books" :class="{ active: idx === 1 }">Books</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.active {
      color: #42b983;
    }
  }
}
a {
  text-decoration: none;
  color: #000;
}
</style>
