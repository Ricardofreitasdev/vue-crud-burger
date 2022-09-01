<template>
  <div v-if="orders.length > 0" class="admin">
    <div
      v-for="order in orders"
      :key="order.id"
      class="admin__item"
      :class="order.status"
    >
      <div class="admin__client">
        <span>Cliente</span>
        <p>{{ order.name }}</p>
      </div>
      <div class="admin__burger">
        <div class="admin__burger--carne">
          <span>Tipo de carne:</span>
          <p>{{ order.carne }}</p>
        </div>
        <div class="admin__burger--pao">
          <span>Tipo de pao:</span>
          <p>{{ order.pao }}</p>
        </div>
        <div class="admin__burger--opcionais">
          <span>Opcionais:</span>
          <ul>
            <li v-for="(item, index) in order.opcionais" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="admin__burger--status">
          <select
            name="status"
            class="status"
            @change="updateBurger($event, order.id)"
          >
            <option
              :value="s.tipo"
              v-for="s in status"
              :key="s.id"
              :selected="order.status == s.tipo"
            >
              {{ s.tipo }}
            </option>
          </select>
          <button class="delete-btn" @click="deleteBurger(order.id)">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="admin__empty" v-else>
    <h2>
      Nenhum pedido realizado...
      <router-link to="/">monte agora o seu Burger</router-link>
    </h2>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      orders: [],
      status: [],
      class: null,
    };
  },
  methods: {
    async getOrdersApi() {
      const req = await fetch("http://localhost:3000/burgers");
      const data = await req.json();
      this.orders = data;
    },

    async getStatus() {
      const req = await fetch("http://localhost:3000/status");
      const data = await req.json();
      this.status = data;
    },

    async updateBurger(event, id) {
      const option = event.target.value;
      const dataJson = JSON.stringify({ status: option });
      const req = await fetch(`http://localhost:3000/burgers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
      });

      await req.json();
      this.getOrdersApi();
    },

    async deleteBurger(id) {
      const req = await fetch(`http://localhost:3000/burgers/${id}`, {
        method: "DELETE",
      });
      await req.json();
      this.getOrdersApi();
    },
  },
  async mounted() {
    await this.getOrdersApi();
    await this.getStatus();
  },
};
</script>

<style lang="scss" scoped>
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
