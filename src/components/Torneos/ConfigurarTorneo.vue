<script>
import { mapGetters, mapActions } from "vuex";
import { computed, ref } from 'vue';

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
    components: {
        vSelect
    },
    props: ["torneo"],
    methods: {
        ...mapActions(["configurarTorneo"]),
        formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
            if (!value) return value
            return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
        },
        submit() {
            this.configurarTorneo({
                modo_juego: this.modoJuego,
                n_grupos: this.nGrupos
            }).then((torneo) => {
                console.log('torneo');
                console.log(torneo);
                if (torneo.id) {
                    this.$emit('hide-modal')
                }
            })
        }
    },
    computed: {
        grupos: function () {
            let grupos = [];
            for (let index = 0; index < this.nGrupos; index++) {
                const element = this.nGrupos;
                grupos.push({
                    grupo: (index + 1),
                    jugadores: []
                });
            }
            return grupos;
        }
    },
    data() {
        return {
            gruposOptions: [1, 2, 3, 4, 5],
            // grupos:[],
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
        const modoJuego = ref('2de3');
        const nGrupos = ref(1);

        return {
            modoJuego,
            nGrupos
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
                <h2
                    class="text-white text-center font-bold uppercase xl:text-xl lg:leading-12 leading-10"
                >{{ torneo.nombre }}</h2>
                <address class="my-2">
                    <i class="text-sm text-primary">Inscritos:</i>
                    <span class="px-2">{{ torneo.inscritos.length }} Jugadores</span>
                </address>
                <address class="my-2">
                    <i class="text-sm text-primary">Fecha:</i>
                    <span class="px-2">
                        <span class="uppercase">{{ formatDate(torneo.fecha, { weekday: "long" }) }},</span>
                        {{ formatDate(torneo.fecha) }}
                        <strong>{{ torneo.hora }}</strong>
                    </span>
                </address>
                <address class="my-2">
                    <i class="text-sm text-primary">Hora:</i>
                    <span class="px-2">
                        <strong>{{ torneo.hora }}</strong>
                        <small class="pl-4">Tiempo espera: {{ torneo.tiempo_espera }} minutos</small>
                    </span>
                </address>
            </div>
            <div class="col-span-2 flex flex-wrap -mx-3 mb-2">
                <div class="w-full md:w-2/3 px-3 mb-0">
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
                        :clearable="false"
                        :modelValue="modoJuego"
                    ></v-select>
                </div>
                <div class="w-full md:w-1/3 px-3">
                    <label
                        class="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
                        for="grid-serie"
                    >Grupos</label>
                    <v-select
                        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :options="gruposOptions"
                        v-model="nGrupos"
                        :modelValue="nGrupos"
                        :clearable="false"
                    ></v-select>
                </div>
            </div>
            <div class="col-span-2 flex justify-around">
                <div v-for="grp in grupos" :key="grp.id" class="border border-white">
                    <h2>Grupo {{ grp.grupo }}</h2>
                    <ul>
                        <li v-for="ply in grp.jugadores" :key="ply">{{ ply }}</li>
                    </ul>
                </div>
            </div>
            <div class="single-fild col-span-2">
                <div class="form-btn-wrap flex justify-center w-full mt-4">
                    <button
                        type="submit"
                        value="submit"
                        name="submit"
                        class="form-btn group primary-btn opacity-100 transition-all"
                        style="background-image:url(/images/others/btn-bg.webp)"
                    >
                        Iniciar Torneo
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