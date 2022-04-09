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
        ...mapActions(["addPartidoTorneo"]),
        formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
            if (!value) return value
            return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
        },
        submit() {
            this.procesando = true;
            this.addPartidoTorneo({
                torneo_id: this.partido.torneo.id,
                grupo_id: this.partido.grupo.id,
                playerA: this.partido.playerA,
                playerB: this.partido.playerB,
                modo_juego: this.modoJuego,
                resultados: []
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
    data() {
        return {
            modosJuego: [
                {
                    id: '2de3',
                    label: 'El mejor de 3 partidos (2 de 3)'
                },
                {
                    id: '3de5',
                    label: 'El mejor de 5 partidos (3 de 5)'
                },
                {
                    id: '4de7',
                    label: 'El mejor de 7 partidos (4 de 7)'
                },
                {
                    id: '5de9',
                    label: 'El mejor de 9 partidos (5 de 9)'
                },
            ]
        }
    },
    setup() {
        const modoJuego = ref('3de5');
        const procesando = ref(false);

        return {
            modoJuego,
            procesando
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
            <div class="col-span-2 flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3 mb-2">
                    <label
                        class="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                        for="grid-club"
                    >Modo de Juego</label>
                    <v-select
                        id="grid-club"
                        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :options="modosJuego"
                        value="id"
                        label="label"
                        v-model="modoJuego"
                        :modelValue="modoJuego"
                        :clearable="false"
                    ></v-select>
                </div>
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
                        class="form-btn group primary-btn opacity-100 transition-all"
                        style="background-image:url(/images/others/btn-bg.webp)"
                    >
                        Iniciar Partido
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
    width: 50%;
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