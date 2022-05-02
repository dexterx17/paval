<script>
import { mapGetters, mapActions } from "vuex";
import { computed } from 'vue';

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
    components: {
        vSelect
    },
    data() {
        return {
            procesando: false,
            puntosApostados:10,
            puntosOpciones:[10,25,50,100]
        }
    },
    props: ["torneo","player"],
    computed:{
        ...mapGetters({
            retador: 'getUser'
        })
    },
    methods: {
        ...mapActions(["iniciarReto"]),
        formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
            if (!value) return value
            return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
        },
        submit() {
            const retador = computed(() => this.$store.getters["getUser"]);
            console.log('retador', retador.value)
            console.log('nombre', retador.value.player.nombre)
            console.log('avatar', retador.value.player.avatar)
            this.procesando = true;
            this.iniciarReto({
                torneo: this.torneo,
                retador: {
                    jugador_id: retador.value.uid,
                    nombre: retador.value.player.nombre,
                    avatar: retador.value.player.avatar,
                    puntos: 0,
                    sets: 0,
                    posicion: 0
                },
                retado: {
                    jugador_id: this.player.uid,
                    nombre: this.player.nombre,
                    avatar: this.player.avatar,
                    puntos: 0,
                    sets: 0,
                    posicion: 0
                },
            }).then((inscrito) => {
               // this.procesando = false;
                console.log('inscrito');
                console.log(inscrito);
                if (inscrito.id) {
                    this.$emit('hide-modal')
                }
            })
        }
    },

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
                                <div class="text-center">
                                    <img
                                        class="w-16 h-16 rounded-2xl"
                                        :src="retador.player ? (retador.player.avatar ??  '/images/others/upcoming-game-thumb3.webp') : ''"
                                        :alt="retador.player ? retador.player.nombre : ''"
                                    />
                                    <h4 class="text-center">{{ retador.player ? retador.player.nombre : '' }}</h4>
                                </div>
                                <img
                                    class="w-16 h-16 lg:mx-9 mx-5"
                                    src="/images/others/game-vs1.webp"
                                    alt="Feature Icon"
                                />
                                <div class="text-center">
                                    <img
                                        class="w-16 h-16 rounded-2xl"
                                        :src="player ? ( player.avatar ?? '/images/others/upcoming-game-thumb3.webp') : ''"
                                        :alt="player ? player.nombre : ''"
                                    />
                                    <h4 class="text-center">{{ player ? player.nombre : '' }}</h4>
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
                    >Puntos apostados</label>
                    <v-select
                        id="grid-club"
                        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :options="puntosOpciones"
                        value="id"
                        label="label"
                        v-model="puntosApostados"
                        :modelValue="puntosApostados"
                        :clearable="false"
                    ></v-select>
                </div>
            </div>

            <div class="single-fild col-span-2">
                <div v-if="procesando" class="flex justify-center w-full">
                    <h3 class="text-primary">Próximamente...</h3>
                </div>
                <div v-else class="form-btn-wrap flex justify-center w-full mt-4">
                    <button
                        type="submit"
                        value="submit"
                        name="submit"
                        class="form-btn group primary-btn opacity-100 transition-all uppercase"
                        style="background-image:url(/images/others/btn-bg.webp)"
                    >
                        Retar
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
    max-height: 300px;
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