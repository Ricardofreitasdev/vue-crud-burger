<template>
  <div
    class="production"
    :class="{
      'is-hide': !status.done && !status.production && !status.solicited,
    }"
  >
    <li>
      <i class="fa fa-burger"></i>
      <p>Solicitado</p>
      <b>{{ status.solicited }}</b>
    </li>
    <li>
      <i class="fa fa-fire"></i>
      <p>Produção</p>
      <b>{{ status.production }}</b>
    </li>
    <li>
      <i class="fa-solid fa-check"></i>
      <p>Pronto</p>
      <b>{{ status.done }}</b>
    </li>
  </div>
</template>

<script>
import { computed } from "vue";
import store from "../store";

export default {
  name: "Production",
  setup() {
    const status = computed(() => store.state.status);
    return {
      status,
    };
  },
};
</script>

<style lang="scss" scoped>
.production {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  margin: 0 auto;
  margin-bottom: 50px;

  &.is-hide {
    display: none;
  }
  li {
    padding: 8px 16px;
    display: flex;
    position: relative;

    p {
      margin: 0 10px;
    }

    b {
      position: absolute;
      background: var(--color-2);
      right: 0;
      border-radius: 50%;
      top: 0;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
    }
  }
}
</style>
