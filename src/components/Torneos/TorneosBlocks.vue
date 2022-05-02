<template>
    <div class="container mb-120">
        <TitleSection :title="title" :text="text" />

        <div class="filter-wrap bg-secondary-100 rounded-2xl px-5 py-7 mb-10">
            <div class="flex flex-col sm:flex-row justify-between">
                <div class="category-filter">
                    <div class="filter-option">
                        <select
                            id="selectgame"
                            class="px-5 h-14 w-full mb-8 sm:mb-0 sm:w-64 text-white bg-secondary-100 border-2 border-solid rounded-lg focus:outline-none border-gray-400 block"
                        >
                            <option value class="bg-black">Todas los clubs</option>
                        </select>
                    </div>
                </div>
                <div class="search-filter">
                    <div class="search-bx">
                        <div class="filter-option">
                            <select
                                id="selectgame"
                                class="px-5 h-14 w-full mb-8 sm:mb-0 sm:w-64 text-white bg-secondary-100 border-2 border-solid rounded-lg focus:outline-none border-gray-400 block"
                            >
                                <option value class="bg-black">Últimos Torneos</option>
                                <option value="semana">Semana anterior</option>
                                <option value="mes">Mes anterior</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class>

            <div
                v-for="(match, imageIndex) in matchesData"
                :key="imageIndex"
                class="border-4 border-light-blue-500 rounded-4xl px-10 lg:px-16 py-8 mb-7.5 last:mb-0"
            >
                <div class="grid md:grid-cols-12 grid-cols-1 items-center">
                    <div
                        class="md:col-start-1 md:col-end-7 flex flex-col md:justify-start md:items-start justify-center items-center text-center mr-5"
                    >
                        <p class="sm:text-base text-sm font-medium">
                            
                            {{ formatDate(match.fecha) }}
                            <span
                                class="text-primary font-bold"
                            >{{ match.hora }}</span>
                        </p>
                        <RouterLink
                            :to="`/torneo/${match.id}`"
                            class="transition-all text-2xl lg:text-4xl font-bold uppercase font-exo text-white mb-4 hover:text-primary"
                        >{{ match.nombre }}</RouterLink>
                        <span
                            class="text-primary font-normal text-sm font-exo"
                        >{{ match.inscritos.length }} jugadores inscritos</span>
                    </div>
                    <div
                        class="md:col-start-7 md:col-end-9 lg:mr-12 mr-5 md:my-auto my-8 flex flex-col items-center text-center"
                    >
                        <RouterLink
                            :to="`/torneo/${match.id}`"
                            class="lg:w-120 lg:h-120 w-88 h-88 bg-primary rounded-full block relative"
                        >
                            <img
                                class="max-w-full h-auto w-auto absolute-center"
                                :src="`/images/others/play-btn2.webp`"
                                :alt="match.playAlt"
                            />
                        </RouterLink>
                        <br />
                        <span class="text-warning">Galería</span>
                    </div>
                    <div
                        class="md:col-end-13 flex md:justify-end justify-center items-center w-full px-20 sm:px-0 sm:w-auto"
                    >
                        <img
                            class="lg:mr-9 mr-5 w-24 h-24 rounded-lg"
                            :src="match.club ? match.club.logo : '/images/others/upcoming-game-thumb3.webp'"
                            :alt="match.club ? match.club.nombre : 'No Club'"
                            :title="match.club ? match.club.nombre : 'No Club'"
                        />

                        <img
                            class="w-24 h-24"
                            :src="match.serie ? match.serie.logo : '/images/others/seriei.png'"
                            :alt="match.serie ? match.serie.nombre : 'No Serie'"
                            :title="match.serie ? match.serie.nombre : 'No Serie'"
                        />
                    </div>
                </div>
            </div>
            <!-- <li
                v-for="(match, imageIndex) in matchesData"
                :key="imageIndex"
            >{{ formatDate(match.fecha) }}</li> -->
        </div>

        <div
            class="flex justify-center mt-73"
            v-if="showReadMore"
        >
            <div class="flex flex-col justify-center items-center">
                <small class="text-center text-primary py-2">
                    Mostrando {{ totalResults }} torneos...
                </small>
                <button
                    class="primary-btn"
                    style="background-image:url(/images/others/btn-bg.webp);"
                    @click="loadMore"
                >Más Torneos</button>
            </div>
        </div>

        <div
            class="flex flex-col items-center justify-center mt-73"
            v-if="matchesData.length == 0"
        >
            <p class="text-primary">
                No tenemos torneos registrados para esta semana
            </p>
            <!-- <RouterLink
                class="primary-btn"
                style="background-image:url(/images/others/btn-bg.webp);"
                to="/torneos"
            >Ver todos los torneos</RouterLink> -->
        </div>

        

    </div>
</template>
<script>
import TitleSection from '@/components/Title/TitleSection.vue'
import moment from 'moment';

import { computed } from 'vue';
import { mapActions, useStore } from "vuex";

export default {
    components: {
        TitleSection,
    },
    data() {
        return {
            title: "Torneos",
            text: "Listado de torneos ordenados cronológicamente",
            index: null,
            maxPerPage: 3,
            showReadMore: true,
            procesandoShowMore: false
        }
    },
    methods: {
        ...mapActions(["loadTorneos"]),
        loadMore() {
            let lastTorneo = this.matchesData[this.matchesData.length-1];
            console.log('%cTorneosBlocks.vue line:160 lastTorneo', 'color: #007acc;', lastTorneo);
            let resultados = this.loadTorneos({
                limit: this.maxPerPage,
                lastTorneo: lastTorneo
            });
            console.log('%cTorneosBlocks.vue line:165 resultados', 'color: #007acc;', resultados);
            console.log('%cTorneosBlocks.vue line:165 resultados.value', 'color: #007acc;', resultados.value);
            console.log('%cTorneosBlocks.vue line:165 resultados.length', 'color: #007acc;', resultados.length);
        },
        formatDate(date, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
            if (date) {
                //console.log('formateDate', date, String(date));
                moment.locale('es');
                return moment(date, "YYYY-MM-DD hh:mm").format('dddd, Do MMMM YYYY')
            }
        },
    },
    computed: {
        totalResults() {
            return Object.keys(this.matchesData).length
        },
    },
    setup() {
        const store = useStore();

        let matchesData = computed(function () {
            return store.state.torneosStore.torneos;
        });

        return {
            matchesData
        };
    },
    mounted() {
        this.loadTorneos({
            limit: this.maxPerPage
        });
    },
}
</script>