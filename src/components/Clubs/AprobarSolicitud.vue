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
    props: ["club", "player"],
    methods: {
        ...mapActions(["aprobarAfiliacion"]),
        formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
            if (!value) return value
            return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
        },
        submit() {
            console.log('clubAdmins', this.club)
            this.procesando = true;
            this.aprobarAfiliacion({
                club: this.club.id,
                aprobacion: this.aprobacionData,
                player: this.player
            })
            this.procesando = false;
            this.$emit('hide-modal')
            
        }
    },
    setup(props){
        const clientesOptions = ref([]);
        const seriesOptions = ref([]);
        const jugadores = ref([]);
        const store = useStore();
        const jugador = ref(null);
        const procesando = ref(false);

        const aprobacionData = ref({
            serie_id: null,
            puntos: null,
            ranking: null,
            n_socio: null,
            aprobado:true,
            estado: 'activo'  
        })

        const seriePlayer = ref(null);

        const setSerie = (s) => {
            aprobacionData.value.serie_id = s.id;
        }

        const fetchClientesOptions = function(){
            // console.log('search',search);
            // console.log('loading',loading);
            store
                .dispatch("fetchPlayersOptions",{
                    idsInscritos: props.club.administradores
                })
                .then(response => {
                    console.log('response options');
                    console.log(response);
                    console.log(props.club.administradores)
                    clientesOptions.value = response;

                    jugadores.value = response.filter( c => props.club.administradores.includes(c.id))

                })
                .catch((error) => {
                    console.log('error');
                    console.log(error);
                });
        }

        store.dispatch('loadSeriesClub', {
            club: props.club.id
        }).then((items) => {
            console.log('items');
            seriesOptions.value = items;
            console.log(items);
        });

        
        
        return {
            clientesOptions,
            seriesOptions,
            jugadores,
            jugador,
            procesando,
            aprobacionData,
            seriePlayer,
            setSerie
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
                    class="text-primary text-center font-bold uppercase xl:text-xl lg:leading-12 leading-10"
                >{{ club.nombre }}</h2>
            </div>
                        <div class="col-span-2">
                <!-- Team Varses Team Start -->
                <div class="container mb-2">
                    <div class="border-4 border-light-blue-500 rounded-4xl px-10 lg:px-16 max-w-lg mx-auto">
                        <div class="grid grid-cols-1 items-center">
                            <div class="flex justify-around items-center w-full px-0 lg:px-8">
                                
                                    <img class="w-16 h-16 rounded-2xl"
                                        :src="player ? (player.avatar ?? '/images/blog/blog3.webp') : ''"
                                        :alt="player ? player.nombre : ''" />
                                    <h4 class="text-primary">{{ player ? player.nombre : '' }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Team Varses Team End -->
            </div>
                <h5 class="py-2 text-gris-oscuro text-right">Aprobar Nuevo Miembro del Club</h5>
            <!-- <div >
                <div class="">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-serie"
                    >Serie</label>
                    <v-select
                        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :options="clientesOptions"
                        label="nombre"                        
                        @update:modelValue="addPlayer"
                        value="id"
                        :modelValue="jugador"
                        placeholder="Serie"
                    >
                        <template #selected-option="option">
                            <div class="flex border-b border-purple text-primary">
                                <img
                                    class="w-12 h-12"
                                    :src="option.avatar ?? '/images/others/upcoming-game-thumb3.webp'"
                                    :alt="option.nombre"
                                />
                                <div class="p-2">
                                    <h3 class="font-bold">{{ option.nombre }}</h3>
                                    <em>
                                        {{ option.ciudad }}
                                        <small>{{ option.nacionalidad }}</small>
                                    </em>
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
                                <div class="p-2">
                                    <h3 class="font-bold">{{ option.nombre }}</h3>
                                    <em>
                                        {{ option.ciudad }}
                                        <small>{{ option.nacionalidad }}</small>
                                    </em>
                                </div>
                            </div>
                        </template>
                    </v-select>
                </div>
            </div> -->
            <div>
                <v-select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    :options="seriesOptions"
                    v-model="seriePlayer"
                    :modelValue="seriePlayer"
                    @update:modelValue="setSerie"
                    placeholder="Seleccionar Serie"
                >
                    <template #selected-option="option">
                        <div class="flex items-center border-b border-purple">
                            <img
                                class="w-12 h-12"
                                :src="option.logo ?? '/images/others/serie.png'"
                                :alt="option.nombre"
                            />
                            <h3 class="font-bold p-2">{{ option.nombre }}</h3>
                        </div>
                    </template>
                    <template #option="option">
                        <div class="flex items-center bg-fuchsia-100 rounded-md">
                            <img
                                class="w-12 h-12"
                                :src="option.logo ?? '/images/others/serie.png'"
                                :alt="option.nombre"
                            />
                            <h3 class="font-bold p-2">{{ option.nombre }}</h3>
                        </div>
                    </template>
                </v-select>
            </div>
            <div>
                <div>
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-puntos"
                    >Puntos</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-puntos"
                        type="number"
                        placeholder="Ej: 1000"
                        v-model="aprobacionData.puntos"
                        required
                    />
                </div>
            </div>
            <div>
                <div>
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-ranking"
                    >Ranking</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-ranking"
                        type="number"
                        placeholder="Ej: 12"
                        v-model="aprobacionData.ranking"
                        required
                    />
                </div>
            </div>
            <div>
                <div class="mt-1">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-socio"
                    >N° Socio</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-socio"
                        type="number"
                        placeholder="Ej: 150"
                        v-model="aprobacionData.n_socio"
                        required
                    />
                </div>
            </div>
            <div>
                <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-city"
                >Estado</label>
                <div class="relative">
                    <select
                        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                        v-model="aprobacionData.estado"
                        required
                    >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                        <option value="suspendido">Suspendido</option>
                    </select>
                    <div
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                    >
                        <svg
                            class="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                            />
                        </svg>
                    </div>
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
                        APROBAR
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