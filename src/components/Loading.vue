<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();
    const isLoad = computed(() => store.getters.isLoad);
    return { isLoad };
  },
};
</script>

<template> 
    <img v-show="!isLoad" class="load" src="~@/assets/load.gif" alt="">
</template>

<style>
.load{
    width: 10%;
}
</style>
