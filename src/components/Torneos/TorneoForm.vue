<script>
import { useStore, mapActions } from "vuex";
import { computed, ref } from "vue";

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
    components: {
        vSelect
    },
    props: {
        paddingTop: String,
    },
    data() {
        return {
            videoBannerBg: "/images/bg/gaming-update.webp",
            btnName: "Nuevo Torneo"
        }
    },
    methods: {
        ...mapActions(["loadTorneos"]),
        selClub(club) {
            alert(club)
        }
    },
    setup() {
        const store = useStore();
        const showForm = ref(false);
        const procesandoForm = ref(false);
        const torneoModel = {
            club: null,
            serie: null,
            organizador: "",
            tiempo_espera: 5,
            fecha: Date(),
            hora: "19:00",
            lugar: "",
            ciudad: "Ambato",
            inscritos: [],
            imagenes: []
        };
        const seriesOptions = ref([]);

        const clubsOptions = ref([]);

        const torneoData = ref(torneoModel);


        const initTorneo = () => {
            console.log('initTorneo');
            store.dispatch('loadClubs').then((items) => {
                clubsOptions.value = items;
            });
            showForm.value = true;
            torneoData.value = torneoModel;
        };

        const selectClub = (club) => {
            console.log('club', club);
            torneoData.value.club = {
                id: club.id,
                nombre: club.nombre,
                logo: club.logo,
                ciudad: club.ciudad
            };

            store.dispatch('loadSeriesClub', {
                club: club.id
            }).then((items) => {
                console.log('items');
                seriesOptions.value = items;
                console.log(items);
            });

        }

        const selectSerie = (serie) => {
            console.log('serie', serie);
            torneoData.value.serie = {
                id: serie.id,
                nombre: serie.nombre,
                logo: serie.logo
            };
        }


        const submit = () => {
            procesandoForm.value = true;
            console.log('addTorneo');
            console.log(store);
            var vm = this;
            store.dispatch('addTorneo', torneoData.value).then((response) => {
                procesandoForm.value = false;
                console.log('response');
                console.log(response);
                console.log(response.id);
                if (response.id) {
                    showForm.value = false;
                    vm.loadTorneos()
                }
            });
        }

        return {
            torneoData,
            seriesOptions,
            clubsOptions,
            showForm,
            procesandoForm,

            initTorneo,
            selectClub,
            selectSerie,
            submit
        };
    },
}
</script>
<template>
    <!-- Contact Banner Section Start -->
    <div class="container" :class="paddingTop">
        <div
            v-if="!showForm"
            class="flex justify-center md:justify-between flex-col md:flex-row items-center bg-no-repeat bg-scroll bg-center bg-cover lg:px-100 px-10 h-300"
            :style="{ backgroundImage: `url(${videoBannerBg})` }"
        >
            <div>
                <h2
                    class="text-white md:text-4xl lg:text-5xl xl:text-title sm:text-3xl text-2xl text-center md:text-left mb-6 md:mb-0 uppercase font-bold leading-9 lg:leading-70"
                >
                    Listo para crear
                    <br />nuevos torneos.
                </h2>
            </div>
            <div>
                <button
                    @click="initTorneo"
                    class="group primary-btn opacity-100 transition-all"
                    style="background-image:url(/images/others/btn-bg.webp)"
                >
                    {{ btnName }}
                    <img
                        src="/images/icon/arrrow-icon.webp"
                        alt="Arrow Icon"
                        class="ml-3 w-5 h-5 group-hover:ml-4 transition-all"
                    />
                </button>
            </div>
        </div>

        <form @submit.prevent="submit" v-if="showForm" class="w-full max-w-lg mx-auto py-1">
            <h4 class="my-2 font-extrabold uppercase">Datos Torneo</h4>

            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-nombre"
                    >Nombre de Torneo</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-nombre"
                        type="text"
                        placeholder="Ej: Ranking Interno Categoria C"
                        v-model="torneoData.nombre"
                    />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full md:w-2/3 px-3 mb-4">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-club"
                    >Club</label>
                    <v-select
                        id="grid-club"
                        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :options="clubsOptions"
                        :modelValue="torneoData.club"
                        @update:modelValue="selectClub"
                    >
                        <template #selected-option="option">
                            <div class="flex border-b border-purple">
                                <img
                                    class="w-12 h-12"
                                    :src="option.logo ?? '/images/others/upcoming-game-thumb3.webp'"
                                    :alt="option.nombre"
                                />
                                <div class="p-2">
                                    <h3 class="font-bold">{{ option.nombre }}</h3>
                                    <em>
                                        {{ option.ciudad }}
                                        <small>{{ option.resolucion }}</small>
                                    </em>
                                </div>
                            </div>
                        </template>
                        <template #option="option">
                            <div class="flex items-center bg-purple-100 rounded-md my-1">
                                <img
                                    class="w-12 h-12"
                                    :src="option.logo ?? '/images/others/upcoming-game-thumb3.webp'"
                                    :alt="option.nombre"
                                />
                                <div class="p-2">
                                    <h3 class="font-bold">{{ option.nombre }}</h3>
                                    <em>
                                        {{ option.ciudad }}
                                        <small>{{ option.resolucion }}</small>
                                    </em>
                                </div>
                            </div>
                        </template>
                    </v-select>
                </div>
                <div class="w-full md:w-1/3 px-3">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-serie"
                    >Serie</label>
                    <v-select
                        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        :options="seriesOptions"
                        :modelValue="torneoData.serie"
                        @update:modelValue="selectSerie"
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
            </div>
            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-fecha"
                    >Fecha</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-fecha"
                        type="date"
                        placeholder="Ej: 01/15/2022"
                        v-model="torneoData.fecha"
                        required
                    />
                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-hora"
                    >Hora</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-hora"
                        type="time"
                        placeholder="Ej: 19:00"
                        v-model="torneoData.hora"
                        required
                    />
                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-tiempo-espera"
                    >T. espera</label>
                    <div class="relative">
                        <select
                            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-tiempo-espera"
                            v-model="torneoData.tiempo_espera"
                            required
                        >
                            <option value="5">5 minutos</option>
                            <option value="10">10 minutos</option>
                            <option value="15">15 minutos</option>
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
            </div>
            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-city"
                    >Ciudad</label>
                    <div class="relative">
                        <select
                            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                            v-model="torneoData.ciudad"
                            required
                        >
                            <option value="Ambato">Ambato</option>
                            <option value="Pelileo">Pelileo</option>
                            <option value="Baños">Baños</option>
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
                <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-lugar"
                    >Lugar</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-lugar"
                        type="text"
                        placeholder="Ej: Junto al Coliseo de Deportes"
                        v-model="torneoData.lugar"
                        required
                    />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3 mb-6 md:mb-0">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-organizador"
                    >Organizador</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-organizador"
                        type="text"
                        placeholder="Ej: Naty Armas"
                        v-model="torneoData.organizador"
                    />
                </div>
            </div>
            <div v-if="procesandoForm" class="flex justify-center w-full">
                <h2 class="text-primary">Procesando...</h2>
            </div>
            <div v-else class="flex justify-around">
                <button
                    style="background-image:url(/images/others/btn-signup.webp);"
                    class="signup-btn transition-all"
                    type="submit"
                >Crear Torneo</button>
                <button
                    class="signup-btn transition-all border-gray-200 border rounded-2xl"
                    @click="showForm = false"
                    type="button"
                >Cancelar</button>
            </div>
        </form>
    </div>
    <!-- Contact Banner Section End -->
</template>