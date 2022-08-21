<template>

<div>
    <p v-show="msg">{{ msg }}</p>
  <form @submit="handleClick">
    <div class="input-container">
        <label for="name">nome do cliente</label>
        <input type="text" id="name" required v-model="name" name="name" placeholder="digite o seu nome">
    </div>
    <div class="input-container">
        <label for="pao">Escolha o tipo do pão</label>
        <select name="pao" id="pao" v-model="pao" required>
            <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">{{ pao.tipo }}</option>
        </select>
    </div>
    <div class="input-container">
        <label for="carne">Escolha a carne</label>
        <select name="carne" id="carne" v-model="carne" required>
            <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">{{ carne.tipo }}</option>
        </select>
    </div>

    <div class="input-container">
        <label>opcionais</label>
        <div class="checkbox-container" v-for="op in opcionaisdata" :key="op.id">
            <input type="checkbox" v-model="opcionais" :value="op.tipo">
            <span>{{op.tipo}}</span>
        </div>
    </div>

    <div class="input-container">
        <input class="btn" type="submit" value="enviar">
    </div>

  </form>
</div>
</template>

<script>


export default {
    name: "Form",
    components: {
    },
    data() { 
        return {
            name: null,
            paes: null,
            carnes: null, 
            opcionaisdata: null,
            pao: null,
            carne: null,
            opcionais: [],
            msg: null
        }
    },
    methods: {
        async getIngredients(){
            const req = await fetch('http://localhost:3000/ingredientes')
            const data = await req.json()
            
            this.paes = data.paes;
            this.carnes = data.carnes;
            this.opcionaisdata = data.opcionais;
        },

        async createBurger(dataJson){
            const req = await fetch("http://localhost:3000/burgers", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: dataJson
            })
            const res = await req.json()

            return res
        },

        clearFields(){
            this.name = ""
            this.pao = "";
            this.carne = "";
            this.opcionais = [];
        },

        async handleClick(e){
            e.preventDefault()

        const data = {
            name: this.name,
            carne: this.carne,
            pao: this.pao,
            opcionais: Array.from(this.opcionais),
            status: "Solicitado",
        }

         const dataJson = JSON.stringify(data)
         try {
             const res = await this.createBurger(dataJson)
             console.log(res);
             this.msg = "Pedido realizado com sucesso, seu código é o: " + res.id
             this.clearFields()
         } catch (error) {
             console.log(error);
         }

        }
    },
    mounted() {
        this.getIngredients()
    }
}
</script>

<style scoped>

    form{
        padding: 8px;
        background: rgb(221, 221, 221);
        border-radius: 8px;
    }
    .input-container{
        padding: 8px;
        display: flex;
        flex-direction: column;
        width: 450px;
    }

    .checkbox-container span{
        margin-left: 5px;
    }
    label{
        padding: 5px;
        font-size: 12px;
    }

    input, select {
        border-radius: 4px;
        padding: 8px;
        outline: none;
        border: none;
    }

    .btn{
        background: green;
        color: #fff;
        font-size: 14px;
        transition: ease-in-out 0.3s;
    }

    .btn:hover{
        opacity: 0.8;
    }
</style>