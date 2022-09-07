<template>
  <div v-if="orders.length > 0" class="admin">
    <admin-card
      :order="order"
      :status="status"
      v-for="order in orders"
      :key="order.id"
      class="admin__item"
      :class="order.status"
      @onClickDelete="deleteBurger"
      @onChangeUpdate="updateBurger"
    ></admin-card>
  </div>
  <div class="admin__empty" v-else>
    <h2>
      Nenhum pedido realizado...
      <router-link to="/">monte agora o seu Burger</router-link>
    </h2>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import store from "../store";
import AdminCard from "./AdminCard.vue";
export default {
  name: "Admin",
  data() {
    return {
      class: null,
    };
  },
  methods: {
    formatStatus(arr) {
      const list = arr.map((item) => {
        return item.status;
      });

      const counterStatus = {
        do: list.filter((item) => item.id == 1),
        todo: list.filter((item) => item.id == 2),
        done: list.filter((item) => item.id == 3),
      };

      return counterStatus;
    },

    async deleteBurger(id) {
      const req = await fetch(`http://localhost:3000/burgers/${id}`, {
        method: "DELETE",
      });
      await req.json();
      store.dispatch("GET_ORDERS");
    },
  },

  components: { AdminCard },

  async setup() {
    store.dispatch("GET_ORDERS");
    const status = await store.dispatch("GET_STATUS");

    const orders = computed(() => store.state.orders);

    const updateBurger = async ({ event_name, option, id }) => {
      const res = await store.dispatch("UPDATE", {
        event_name,
        option,
        id,
      });

      if (res) {
        store.dispatch("GET_ORDERS");
      }
    };

    return {
      updateBurger,
      orders,
      store,
      status,
    };
  },
};
</script>

<style lang="scss">
.admin {
  &__item {
    display: flex;
    padding: 8px 16px;
    justify-content: space-between;
    align-items: flex-start;
    background: var(--bg);
    border-radius: 4px;
    margin-bottom: 10px;

    span {
      font-weight: bold;
      font-size: 12px;
    }
  }

  &__client {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  &__burger {
    display: flex;
    flex: 2;
    justify-content: space-between;

    &--carne,
    &--pao,
    &--opcionais {
      flex: 1;
    }
    &--status {
      display: flex;
      flex-direction: column;
      flex: 1;

      select {
        border-radius: 4px;
        outline: none;
        border: none;
        margin-bottom: 4px;
        padding: 4px;
      }

      button {
        background: red;
        border-radius: 4px;
        outline: none;
        border: none;
        margin-bottom: 4px;
        padding: 4px;
        color: #fff;
        cursor: pointer;
      }
    }
  }

  &__empty {
    text-align: center;

    a {
      color: blue;
    }
  }
}
</style>
