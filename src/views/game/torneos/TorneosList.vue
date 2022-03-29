<script>
import { mapGetters, mapActions } from "vuex";
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
    data() {
        return {};
    },
    methods: {
        ...mapActions(["loadTorneos", "AddTorneo"]),
    },
    computed: {
        ...mapGetters(["getTorneos"]),
    },
    mounted() {
        this.loadTorneos();
    },
    setup() {
        const store = useStore();
        const showForm = ref(false);
        const torneoModel = {
            club: null,
            serie: null,
            organizador: "",
            tiempo_espera: 5,
            fecha: Date(),
            hora: "19:00",
            lugar: "",
            ciudad: "Ambato",
        };

        const torneoData = ref(torneoModel);

        const initTorneo = () => {
            console.log('initTorneo');
            showForm.value = true;
            torneoData.value = torneoModel;
        };

        let torneos = computed(function () {
            return store.state.torneosStore.torneos;
        });

        const submit = () => {
            console.log('addTorneo');
            console.log(store);
            store.dispatch('addTorneo', torneoData.value).then((response) => {
                console.log('response');
                console.log(response);
            });
        }

        return {
            torneos,
            torneoData,
            showForm,

            initTorneo,
            submit
        };
    },
};
</script>

<template>
    <div>
        <header>
            <h3>Torneos List</h3>
        </header>
        <section>
            <article class="bg-red-200">
                <button v-if="!showForm" @click="initTorneo">Nuevo Torneo</button>

                <form @submit.prevent="submit" v-if="showForm" class="w-full max-w-lg mx-auto py-1">
                    <h4 class="my-2 font-extrabold uppercase">Datos Torneo</h4>

                    <div class="flex flex-wrap -mx-3 mb-2">
                        <div class="w-full md:w-1/2 px-3">
                            <label
                                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-club"
                            >Club</label>
                            <input
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-club"
                                type="text"
                                placeholder="Ej: Paval"
                                v-model="torneoData.club"
                            />
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label
                                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-serie"
                            >Serie</label>
                            <input
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-serie"
                                type="text"
                                placeholder="Ej: A"
                                v-model="torneoData.serie"
                            />
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
                                placeholder="90210"
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
                                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-organizador"
                                type="text"
                                placeholder="Ej: Naty Armas"
                                v-model="torneoData.organizador"
                                required
                            />
                            <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                    </div>
                    <div class="flex justify-around">
                        <button type="submit">Crear Torneo</button>
                        <button @click="showForm = false" type="button">Cancelar</button>
                    </div>
                </form>
            </article>
            <ul v-if="torneos">
                <li
                    v-for="torneo in torneos"
                    :key="torneo.id"
                    class="flex my-2 border border-gray-300 rounded-md"
                >
                    <img src="https://via.placeholder.com/42/42/torneo.png" :alt="torneo.nombre" />

                    <div class="flex flex-col pl-2">
                        <h5>
                            <span v-if="torneo.serie">{{ torneo.serie }}</span>
                            {{ torneo.fecha }} {{ torneo.hora }}
                            <small>{{ torneo.tiempo_espera }} min.</small>
                        </h5>
                        <h5>{{ torneo.lugar }}</h5>
                    </div>
                </li>
            </ul>
            <p v-else>Aún no hay torneos registrados.</p>
        </section>
    </div>
</template>
