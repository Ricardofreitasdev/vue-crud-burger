import { createStore } from "vuex";

const store = createStore({
  state: {
    status: {
      solicited: 0,
      production: 0,
      done: 0,
    },
    orders: [],
  },
  mutations: {
    ["UPDATE_STATUS"](state, payload) {
      state.status = {
        solicited: payload.solicited.length,
        production: payload.production.length,
        done: payload.done.length,
      };
    },
    ["GET_ALL"](state, payload) {
      state.orders = payload;
    },
  },
  actions: {
    async ["GET_ORDERS"]({ commit }) {
      const req = await fetch("http://localhost:3000/burgers");
      const data = await req.json();

      const status = formatStatus(data);

      commit("UPDATE_STATUS", status);
      commit("GET_ALL", data);

      return data;
    },
    async ["GET_STATUS"]() {
      const req = await fetch("http://localhost:3000/status");
      const data = await req.json();
      return data;
    },
    async ["UPDATE"](_, { event_name, option, id }) {
      const status_id = event_name;
      const data = {
        status: {
          name: option,
          id: status_id,
        },
      };

      const dataJson = JSON.stringify(data);

      const res = await fetch(`http://localhost:3000/burgers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });

      return res;
    },
  },
});

const formatStatus = (arr) => {
  const list = arr.map((item) => {
    return item.status;
  });

  const counterStatus = {
    solicited: list.filter((item) => item.id == 1),
    production: list.filter((item) => item.id == 2),
    done: list.filter((item) => item.id == 3),
  };

  return counterStatus;
};

export default store;
