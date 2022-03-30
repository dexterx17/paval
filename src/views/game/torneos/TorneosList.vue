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
        formatDate (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
          if (!value) return value
          return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
        }
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
                    class="flex justify-between  my-2 border border-gray-300 rounded-md"
                >
                    <img class="w-24" src="https://via.placeholder.com/42/42/torneo.png" :alt="torneo.nombre" />

                    <div class="flex flex-1 flex-col justify-between p-2">
                        <div class="flex justify-between">
                          <h5>
                            <span v-if="torneo.club"><i class="text-xs">Club:</i> {{ torneo.club }}</span>
                            <span v-if="torneo.serie"><i class="text-xs">Serie:</i> {{ torneo.serie }}</span>
                          </h5>
                          <h4 class="flex flex-col">
                            <span>
                              <span class="capitalize">
                                {{ formatDate(torneo.fecha,{weekday: "long"}) }},
                              </span>
                              {{ formatDate(torneo.fecha) }}
                              {{ torneo.hora }}

                            </span>
                            <small><i class="text-xs">T. espera: </i> {{ torneo.tiempo_espera }} min.</small>
                          </h4>
                        </div>
                        <div>
                          <i class="text-xs">Ubicación: </i>
                          <span>
                            {{ torneo.ciudad }} 
                          </span>
                          <small class="px-1">{{ torneo.lugar }}</small>
                        </div>
                        <div class="text-xs">
                          <span>
                            Inscritos: 
                          </span>
                          <ul>
                            <li></li>
                          </ul>
                        </div>
                    </div>
                    <RouterLink :to="{ name: 'torneo' , params: { id: torneo.id } }" >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </RouterLink>
                </li>
            </ul>
            <p v-else>Aún no hay torneos registrados.</p>
        </section>
    </div>
</template>
