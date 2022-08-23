<template>
  <div v-if="orders.length > 0" class="admin">
    <div v-for="order in orders" :key="order.id" class="admin__item" :class="order.status">
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
                    {{item}}
                </li>
              </ul>
           </div>
            <div class="admin__burger--status">
            <select name="status" class="status" @change="updateBurger($event, order.id)">
            <option :value="s.tipo" v-for="s in status" :key="s.id" :selected="order.status == s.tipo">
              {{ s.tipo }}
            </option>
          </select>
          <button class="delete-btn" @click="deleteBurger(order.id)">Cancelar</button>
        </div>
        </div>
    </div>
  </div>
  <div v-else>Nenhum pedido realizado</div>
</template>

<script>
export default {
    name: "Admin",
    data(){
        return {
            orders: [],
            status: [],
            class: null
        }
    },
    methods: {
        async getOrdersApi(){
            const req = await fetch('http://localhost:3000/burgers')
            const data = await req.json()
            this.orders = data
        },

        async getStatus() {
        const req = await fetch('http://localhost:3000/status')
        const data = await req.json()
        this.status = data
         },

        async updateBurger(event, id) {
        const option = event.target.value;
        const dataJson = JSON.stringify({status: option});
        const req = await fetch(`http://localhost:3000/burgers/${id}`, {
          method: "PATCH",
          headers: { "Content-Type" : "application/json" },
          body: dataJson
        });

        await req.json()
        this.getOrdersApi()
        },

        async deleteBurger(id) {
            const req = await fetch(`http://localhost:3000/burgers/${id}`, {
            method: "DELETE"
            });
            await req.json()
            this.getOrdersApi()
        },
    },
    async mounted() {
        await this.getOrdersApi()
        await this.getStatus()
    }
}
</script>

<style scoped>
 .admin__item{
    display: flex;
    padding: 8px 16px;
    justify-content: space-between;
    align-items: center;
    background: var(--bg);
    border-radius: 4px;
    margin-bottom: 10px;

 }

 .admin__client{
  display: flex;
  flex: 1;
  flex-direction: column;
 }

 .admin__burger{
    display: flex;
    flex: 2;
    justify-content: space-between;
 }

 .admin__burger--status{
  display: flex;
  flex-direction: column;
 }

.admin__burger--status, .admin__burger--carne,.admin__burger--pao, .admin__burger--opcionais{
  flex: 1;
}
 span{
  font-weight: bold;
  font-size: 12px;
 }
</style>