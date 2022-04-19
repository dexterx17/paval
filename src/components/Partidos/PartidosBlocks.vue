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
                            <option value class="bg-black">Todos los Jugadores</option>
                            <option value="Ambato">Ambato</option>
                        </select>
                    </div>
                </div>
                <div class="category-filter">
                    <div class="filter-option">
                        <select
                            id="selectgame"
                            class="px-5 h-14 w-full mb-8 sm:mb-0 sm:w-64 text-white bg-secondary-100 border-2 border-solid rounded-lg focus:outline-none border-gray-400 block"
                        >
                            <option value class="bg-black">Todas los Clubs</option>
                            <option value="Ambato">Paval</option>
                        </select>
                    </div>
                </div>
                <div class="search-filter">
                    <div class="search-bx">
                        <form action="#" class="relative">
                            <input
                                type="text"
                                placeholder="Buscar"
                                class="px-5 h-14 w-full sm:w-64 bg-secondary-100 border-2 border-solid rounded-lg focus:outline-none"
                            />
                            <button
                                type="submit"
                                class="absolute px-5 top-0 right-0 bg-transparent transition-all inline-block h-full text-white hover:text-primary"
                            >
                                <i class="icofont-search-1"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

            <div class>
                <!-- <CoolLightBox :items="items" :index="index" @close="index = null"></CoolLightBox> -->

                <div
                    v-for="(match, imageIndex) in items"
                    :key="imageIndex"
                    class="border-4 border-light-blue-500 rounded-4xl px-10 lg:px-16 py-8 mb-7.5 last:mb-0"
                >
                    <div class="grid md:grid-cols-12 grid-cols-1 items-center">
                        <div
                            class="md:col-start-1 md:col-end-7 flex flex-col md:justify-start md:items-start justify-center items-center text-center mr-5"
                        >
                            <p class="sm:text-base text-sm font-medium">{{ formatDate(match.fecha) }}</p>
                            <RouterLink
                                :to="`/partido/${match.id}`"
                                class="transition-all text-2xl lg:text-4xl font-bold uppercase font-exo text-white mb-4 hover:text-primary"
                            >{{ match.playerA.nombre }}
                            <img class="w-8 h-8" src="/images/others/game-vs1.webp" alt="Feature Icon">
                            <br>
                            {{ match.playerB.nombre }}</RouterLink>
                            
                        </div>
                        <div
                            class="md:col-start-7 md:col-end-9 lg:mr-12 mr-5 md:my-auto my-8 flex flex-col items-center text-center"
                        >
                            <RouterLink
                                :to="`/partido/${match.id}`"
                                class="lg:w-120 lg:h-120 w-88 h-88 bg-primary rounded-full block relative"
                            >
                                <img
                                    class="max-w-full h-auto w-auto absolute-center"
                                    :src="`/images/others/play-btn2.webp`"
                                    :alt="match.playAlt"
                                />
                            </RouterLink>
                            <br />
                            <span class="text-warning">{{ match.stream }}</span>
                        </div>
                        <div
                            class="md:col-end-13 flex md:justify-end justify-center items-center w-full px-20 sm:px-0 sm:w-auto"
                        >
                            <img class="lg:mr-9 mr-5 w-24 h-24 rounded-lg" :src="match.playerA.avatar ?? '/images/others/upcoming-game-thumb3.webp'" :alt="match.playerA.nombre">
                            <img class="lg:mr-9 mr-5" src="/images/others/game-vs1.webp" alt="Feature Icon">
                            <img class="w-24 h-24 rounded-lg" :src="match.playerB.avatar ?? '/images/others/upcoming-game-thumb3.webp'" :alt="match.playerB.nombre">
                        </div>
                    </div>
                </div>
                <li
                    v-for="(match, imageIndex) in dateTime"
                    :key="imageIndex"
                >{{ formatDate(match.date) }}</li>
            </div>

            <div
                class="flex justify-center mt-73"
                v-if="currentPage * maxPerPage < matchesData.length"
            >
                <button
                    class="primary-btn"
                    style="background-image:url(/images/others/btn-bg.webp);"
                    @click="loadMore"
                >Más Partidos</button>
            </div>
    </div>
</template>
<script>
import TitleSection from '@/components/Title/TitleSection.vue'

import { computed } from 'vue';
import { mapActions, useStore } from "vuex";

import moment from 'moment';

export default {
    components: {
        TitleSection,
    },
    data() {
        return {
            title: "Partidos",
            text: "Busca entre los encuentros registrados en nuestra plataforma por jugador, club o fecha",
            index: null,
            currentPage: 3,
            maxPerPage: 1,
            showReadMore: true,
            oldestFirst: -1
        }
    },
    computed: {
        totalResults() {
            return Object.keys(this.matchesData).length
        },
        pageCount() {
            return Math.ceil(this.totalResults / this.maxPerPage)
        },
        pageOffest() {
            return this.maxPerPage * this.currentPage
        },
        items() {
            return this.matchesData.slice(0, this.currentPage * this.maxPerPage)
        },
        dateTime: function () {
            var order = this.oldestFirst ? 1 : -1;
            // `this` points to the vm instance
            this.matchesData.sort(function (a, b) {
                a = new Date(a.fecha);
                b = new Date(b.fecha);
                var results = a > b ? -1 : a < b ? 1 : 0;
                return results * order;
            });
        }
    },
    methods: {
        ...mapActions(["loadPartidos"]),
            loadMore() {
                this.currentPage += 1
            },
            formatDate(date, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
                if (date) {
                    return moment(date).locale('es').format('dddd, Do MMMM YYYY')
                }
            },
    },
    setup() {
        const store = useStore();

        let matchesData = computed(function () {
            return store.state.partidosStore.partidos;
        });

        return {
            matchesData
        };
    },
    mounted() {
        this.loadPartidos();
    },
}
</script>