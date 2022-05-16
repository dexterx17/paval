<template>
    <div class="container mb-120">
        <TitleSection :title="title" :text="text" />

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
                            <p class="sm:text-base text-sm font-medium">
                                <span class="capitalize">{{ formatDate(match.fecha, { weekday: "long" }) }},</span>
                                {{ formatDate(match.fecha) }}
                            </p>
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
                            class="md:col-start-10 md:col-end-13 flex md:justify-end justify-center items-center w-full "
                        >
                            <div class="rounded-lg text-center">
                                <img :src="match.playerA.avatar ?? '/images/others/upcoming-game-thumb3.webp'" :alt="match.playerA.nombre">
                                <strong v-if="match.resultado"> {{ match.resultado.split(':')[0] }} </strong>
                            </div>
                            <img class="mx-5" src="/images/others/game-vs1.webp" alt="Feature Icon">
                            <div class="text-center">
                                <img class=" rounded-lg" :src="match.playerB.avatar ?? '/images/others/upcoming-game-thumb3.webp'" :alt="match.playerB.nombre">
                                <strong v-if="match.resultado"> {{ match.resultado.split(':')[1] }} </strong>
                            </div>
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
            title: "Últimos partidos",
            text: "Partidos de este jugador ordenados cronológicamente",
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
            formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
                if (!value) return value
                return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value+'T00:00'))
            }
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