<script>
import { mapGetters, mapActions } from "vuex";
import { computed, ref } from 'vue';

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
    components: {
        vSelect
    },
    props: ["partido"],
    methods: {
        ...mapActions(["setResultadosPartido"]),
        formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
            if (!value) return value
            return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
        },
        submit() {
            this.procesando = true;
            this.setResultadosPartido({
                partido_id: this.partido.id,
                resultados: this.resultados,
                resultado: this.resultado
            }).then((torneo) => {
                this.procesando = false;
                console.log('torneo');
                console.log(torneo);
                if (torneo.id) {
                    this.$emit('hide-modal')
                }
            })
        }
    },
    computed:{
        ganadosA:function(){
            return this.resultados.filter((item) => {
                return item.playerA > item.playerB;
            }).length
        },
        ganadosB:function(){
            return this.resultados.filter((item) => {
                return item.playerB > item.playerA;
            }).length
        },
        resultado:function(){
            return this.ganadosA+':'+this.ganadosB;
        },
    },
    data() {
        return {
        }
    },
    setup(props) {
        const modoJuego = ref('3de5');
        const procesando = ref(false);
        const nPartidos = ref(0);
        const resultados = ref([]);
        console.log('props');
        console.log(props.partido);
        console.log(props.partido.modo_juego);
        let modoJuegos = props.partido.modo_juego.split('de');

        console.log('modoJuegos',modoJuegos);

        nPartidos.value = parseInt(modoJuegos[1]);

        for (let index = 1; index <= nPartidos.value; index++) {
            resultados.value.push({
                set: index,
                playerA: null,
                playerB: null
            });
        }

        return {
            modoJuego,
            procesando,
            resultados,
            nPartidos
        }
    }

}
</script>
<template>
    <div>
        <form
            @submit.prevent="submit"
            id="contact-form"
            class="grid sm:gap-x-8 gap-x-4 grid-cols-2"
        >
            <div class="col-span-2">
                <!-- Team Varses Team Start -->
                <div class="container mb-2">
                    <div
                        class="border-4 border-light-blue-500 rounded-4xl px-10 lg:px-16 max-w-lg mx-auto"
                    >
                        <div class="grid grid-cols-1 items-center">
                            <div class="flex justify-center items-center w-full px-0 lg:px-8">
                                <div>
                                    <img
                                        class="w-24 h-24 rounded-2xl"
                                        :src="partido.playerA ? (partido.playerA.avatar ??  '/images/blog/blog3.webp') : ''"
                                        :alt="partido.playerA ? partido.playerA.nombre : ''"
                                    />
                                    <h4 class="text-center">{{ partido.playerA ? partido.playerA.nombre : '' }}</h4>
                                </div>
                                <img
                                    class="w-16 h-16 lg:mx-9 mx-5"
                                    src="/images/others/game-vs1.webp"
                                    alt="Feature Icon"
                                />
                                <div>
                                    <img
                                        class="w-24 h-24 rounded-2xl"
                                        :src="partido.playerB ? ( partido.playerB.avatar ?? '/images/blog/blog3.webp') : ''"
                                        :alt="partido.playerB ? partido.playerB.nombre : ''"
                                    />
                                    <h4 class="text-center">{{ partido.playerB ? partido.playerB.nombre : '' }}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Team Varses Team End -->
            </div>
            <div class="col-span-2 flex flex-wrap justify-around">
                <div class="font-extrabold">
                    {{ ganadosA }}
                </div>
                <label
                    class="block uppercase tracking-wide text-center text-primary text-xs font-bold mb-2"
                    for="grid-club"
                >Resultados</label>
                <div>
                    {{ ganadosB }}
                </div>
            </div>

            <div v-for="resultado in resultados"
                :key="resultado.set"
                class="col-span-2 flex flex-wrap -mx-3"
            >
                <div class="w-1/2 px-3 mb-2 flex  items-center">
                    <label
                        class="uppercase tracking-wide text-center text-primary text-xs font-bold mb-2"
                        for="grid-club"
                    >SET {{ resultado.set }}</label>
                    <input
                        class="px-6 h-12 text-white border-secondary-80 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
                        type="number"
                        v-model="resultado.playerA"
                        :placeholder="`Puntos (${partido.playerA.nombre})`"
                        required
                        />
                </div>
                <div class="w-1/2 px-3 mb-2 flex items-center">
                    <label
                        class="uppercase tracking-wide text-center text-primary text-xs font-bold mb-2"
                        for="grid-club"
                    >SET {{ resultado.set }}</label>
                    <input
                        class="px-6 h-12 text-white border-secondary-80 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
                        type="number"
                        v-model="resultado.playerB"
                        :placeholder="`Puntos (${partido.playerB.nombre})`"
                        required
                    />
                </div>
            </div>
            <div class="col-span-2 italic text-center text-xs">
                Los sets que no se jugaron, por favor complétalos con ceros (0)
            </div>
            <div class="single-fild col-span-2">
                <div v-if="procesando" class="flex justify-center w-full">
                    <h2 class="text-primary">Procesando...</h2>
                </div>
                <div v-else class="form-btn-wrap flex justify-center w-full mt-4">
                    <button
                        type="submit"
                        value="submit"
                        name="submit"
                        class="form-btn w-full group primary-btn opacity-100 transition-all"
                        style="background-image:url(/images/others/btn-bg.webp); background-repeat: no-repeat; background-size: 300px 60px; background-position: center;"
                    >
                        Actualizar resultados
                        <img
                            src="/images/icon/arrrow-icon.webp"
                            alt="Arrow Icon"
                            class="ml-3 w-5 h-5 group-hover:ml-4 transition-all"
                        />
                    </button>
                    <p class="form-messege"></p>
                </div>
            </div>
        </form>
    </div>
</template>

<style>
.modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-content {
    position: relative;
    width: 80% !important;
    /* max-height: 300px; */
    padding: 16px;
    overflow: auto;
    background-color: #fff;
    border-radius: 4px;
}
.modal-close {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    margin: 8px 8px 0 0;
    cursor: pointer;
}
.modal-close::hover {
    color: gray;
}
</style>