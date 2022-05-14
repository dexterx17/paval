<script>
import { mapGetters, mapActions, useStore } from "vuex";
import { computed, ref } from 'vue';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import Popper from "vue3-popper";

export default {
    components: {
        vSelect,
        Popper
    },
    data() {
        return { }
    },
    props: ["torneo"],
    methods: {
        ...mapActions(["inscribirEnTorneo"]),
        formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
            if (!value) return value
            return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
        },
        submit() {
            const user = computed(() => this.$store.getters["getUser"]);
            console.log('user', user.value)
            console.log('nombre', user.value.player.nombre)
            console.log('avatar', user.value.player.avatar)
            this.procesando = true;

            this.jugadores.forEach((player) => {
                this.inscribirEnTorneo({
                    torneo: this.torneo,
                    jugador: {
                        jugador_id: player.id,
                        nombre: player.nombre,
                        avatar: player.avatar,
                        puntos: 0,
                        sets: 0,
                        posicion: 0,
                        ranking: player.ranking
                    },
                })
            });
            setTimeout(() => {
                this.procesando = false;
                this.$emit('hide-modal')
            },2000);
            
        }
    },
    setup(props){
        const clientesOptions = ref([]);
        const jugadores = ref([]);
        const store = useStore();
        const player = ref(null);
        const procesando = ref(false);

        const fetchClientesOptions = function(){
            // console.log('search',search);
            // console.log('loading',loading);
            store
                .dispatch("fetchPlayersOptions",{
                    //q:search,
                    idsInscritos: props.torneo.inscritos
                })
                .then(response => {
                    console.log('response options');
                    console.log(response);
                    if(response){
                        clientesOptions.value = response;
                    }
                })
                .catch((error) => {
                    console.log('error');
                    console.log(error);
                });
        }

        fetchClientesOptions();

        const addPlayer = (player) => {
            jugadores.value.push(player);
            let index = clientesOptions.value.indexOf(player);
            clientesOptions.value.splice(index,1);
        }

        const removePlayer =(player) =>{
            clientesOptions.value.push(player);
            let index = jugadores.value.indexOf(player);
            jugadores.value.splice(index,1);
        }
        

        return {
            clientesOptions,
            jugadores,
            player,
            procesando,

            addPlayer,
            removePlayer
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
                <address class="my-2">
                    <i class="text-sm text-primary">Ubicación:</i>
                    <span class="px-2">
                        {{ torneo.ciudad }}
                        <strong>{{ torneo.lugar }}</strong>
                    </span>
                </address>
            </div>
            <div class="col-span-2">
                <div class="">
                    <v-select
                        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :options="clientesOptions"
                        label="para_select"                        
                        @update:modelValue="addPlayer"
                        :modelValue="player"
                        placeholder="Buscar jugadores"
                    >
                        <template #selected-option="option">
                            <div class="flex border-b border-purple">
                                <img
                                    class="w-12 h-12"
                                    :src="option.avatar ?? '/images/others/upcoming-game-thumb3.webp'"
                                    :alt="option.nombre"
                                />
                                <div class="p-2 flex justify-between">
                                    <div>
                                        <h3 class="font-bold">{{ option.nombre }}</h3>
                                        <em>
                                            {{ option.ciudad }}
                                            <small>{{ option.nacionalidad }}</small>
                                        </em>
                                    </div>
                                    <div class="flex flex-col px-4 ml-2 text-center border border-primary rounded-md">
                                        <strong class="font-extrabold text-rojo-claro">    
                                            {{ option.ranking }}
                                        </strong>
                                        Rank
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #option="option">
                            <div class="flex items-center bg-purple-100 rounded-md my-1 hover:text-primary">
                                <img
                                    class="w-12 h-12"
                                    :src="option.avatar ?? '/images/others/upcoming-game-thumb3.webp'"
                                    :alt="option.nombre"
                                />
                                <div class="p-2 flex justify-between">
                                    <div>
                                        <h3 class="font-bold">{{ option.nombre }}</h3>
                                        <em>
                                            {{ option.ciudad }}
                                            <small>{{ option.nacionalidad }}</small>
                                        </em>
                                    </div>
                                    <div class="flex flex-col px-4 ml-2 text-center border border-primary rounded-md">
                                        <strong class="font-extrabold text-rojo-claro">    
                                            {{ option.ranking }}
                                        </strong>
                                        <small>
                                            Rank
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </v-select>
                </div>
                <div>

                    <ul class="grid grid-cols-4 p-2">
                       <li v-for="ply,index in jugadores" :key="index" class="border rounded-lg p-1">
                            <div
                                class="flex flex-col relative align-middle items-center"
                            >
                                <div class="text-sm absolute p-1 right-0 top-0 bg-red-500 rounded-tr-lg">
                                    <Popper
                                        hover>
                                        <button type="button" @click="removePlayer(ply)" >
                                            X
                                        </button>
                                        <template #content>
                                            <div>Retirar Jugador</div>
                                        </template>
                                    </Popper>
                                </div>
                                <img class="w-16 h-16 lg:w-24 lg:h-24" :src="ply.avatar ?? '/images/others/upcoming-game-thumb3.webp'" :alt="ply.nombre">
                                <h3 class="text-center">{{ ply.nombre }}</h3>
                            </div>
                        </li> 
                    </ul>
                </div>
            </div>
            <div class="single-fild col-span-2">
                <div v-if="procesando" class="flex justify-center w-full">
                    <h3 class="text-primary">Procesando...</h3>
                </div>
                <div v-else class="form-btn-wrap flex justify-center w-full mt-4">
                    <button
                        type="submit"
                        value="submit"
                        name="submit"
                        class="form-btn group primary-btn opacity-100 transition-all uppercase"
                        style="background-image:url(/images/others/btn-bg.webp)"
                    >
                        INSCRIBIR
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
    min-height: 300px;
    height: 90% !important;
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