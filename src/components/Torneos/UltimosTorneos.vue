<template>
    <!-- upcoming Matches Section Start  -->
    <div class="mt-28">
        <div class="container">
            <TitleSection :title="title" :text="text" />

            <div class>
                <!-- <CoolLightBox :items="items" :index="index" @close="index = null"></CoolLightBox> -->

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
                                <span class="capitalize">{{ formatDate(match.fecha, { weekday: "long" }) }},</span>
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
            </div>

            <div
                class="flex justify-center mt-73"
            >
                <RouterLink
                    class="primary-btn w-auto px-3"
                    style="background-image:url(/images/others/btn-bg.webp);  background-size: 270px 75px;"
                    to="/torneos"
                >Ver todos los torneos</RouterLink>
            </div>

            <div
                class="flex flex-col items-center justify-center mt-73"
                v-if="matchesData.length == 0"
            >
                <p class="text-primary">
                    No tenemos torneos registrados para esta semana
                </p>
            </div>
        </div>
    </div>
    <!-- Upcoming Matches Section End  -->
</template>

<script>
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import moment from 'moment';


import matchesData from '@/data/matches.json'
import TitleSection from '@/components/Title/TitleSection.vue';
import { computed } from 'vue';
import { mapGetters, mapActions, useStore } from "vuex";

export default {
    components: {
        TitleSection,
        CoolLightBox,
        moment
    },
    data() {
        return {
            title: "Últimos Torneos",
            text: "Recuerda que solo puedes inscribirte en un torneo antes de la fecha y hora del evento",
        }
    },
    methods: {
        ...mapActions(["loadLastTorneos"]),
        formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
            if (!value) return value
            return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value+'T00:00'))
        }
    },
    setup() {
        const store = useStore();

        let matchesData = computed(function () {
            return store.state.torneosStore.ultimosTorneos;
        });

        return {
            matchesData
        };
    },
    mounted() {
        this.loadLastTorneos();
    },
}
</script>