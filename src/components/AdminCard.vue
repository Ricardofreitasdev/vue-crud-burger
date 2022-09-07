<template>
  <div>
    <div class="admin__client">
      <span>Cliente</span>
      <p>{{ order.name }}</p>
      <p>pedido - # {{ order.id }}</p>
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
          @change="
            $emit('onChangeUpdate', {
              event_name: $event.target.selectedOptions[0].attributes[0].value,
              option: $event.target.value,
              id: order.id,
            })
          "
        >
          <option
            :value="s.tipo"
            v-for="s in status"
            :key="s.id"
            :data-id="s.id"
            :selected="order.status.name == s.tipo"
          >
            {{ s.tipo }}
          </option>
        </select>
        <button
          class="delete-btn"
          :id="order.id"
          @click="$emit('onClickDelete', order.id)"
        >
          Entregue
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminCard",
  props: {
    order: {
      type: Object,
    },
    status: {
      type: Object,
    },
  },
};
</script>
