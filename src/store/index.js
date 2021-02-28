import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    bookArr: [],
    isLoad: false,
    bookDataArr: [],
  },
  mutations: {
    initData(state, payload) {
      state.bookArr = payload;
    },
    Load(state, bool) {
      state.isLoad = bool;
    },
    bookData(state, payload) {
      state.bookDataArr = payload;
    },
  },
  actions: {
    handInitData({ commit }) {
      return axios
        .get("https://fe-interview-api.unnotech.com/books")
        .then((res) => {
          commit("initData", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handLoad({ commit }, bool) {
      commit("Load", bool);
    },
    handBookData({ commit }, id) {
      return axios
        .get(`https://fe-interview-api.unnotech.com/profile/${id}`)
        .then((res) => {
          // console.log(res.data);
          // console.log("Get Books'id data", res.data);
          commit("bookData", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    bookArr(state) {
      return state.bookArr;
    },
    isLoad(state) {
      return state.isLoad;
    },
    bookDataArr(state) {
      return state.bookDataArr;
    },
  },
});
