<template>
    <!-- upcoming Matches Section Start  -->
    <div class="mt-28">
        <div class="container">
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
                            <p
                                class="sm:text-base text-sm font-medium"
                            >{{ formatDate(match.fecha) }}</p>
                            <RouterLink
                                :to="`/torneo/${match.id}`"
                                class="transition-all text-2xl lg:text-4xl font-bold uppercase font-exo text-white mb-4 hover:text-primary"
                            >{{ match.nombre }}</RouterLink>
                            <span
                                class="text-primary font-normal text-sm font-exo"
                            >{{ match.players }} jugadores inscritos</span>
                        </div>
                        <div
                            class="md:col-start-7 md:col-end-9 lg:mr-12 mr-5 md:my-auto my-8 flex flex-col items-center text-center"
                        >
                            <a
                                @click="index = imageIndex"
                                class="lg:w-120 lg:h-120 w-88 h-88 bg-primary rounded-full block relative"
                                href="#/"
                            >
                                <img
                                    class="max-w-full h-auto w-auto absolute-center"
                                    :src="`/images/others/play-btn2.webp`"
                                    :alt="match.playAlt"
                                />
                            </a>
                            <br />
                            <span class="text-warning">Inscribirme</span>
                        </div>
                        <div
                            class="md:col-end-13 flex md:justify-end justify-center items-center w-full px-20 sm:px-0 sm:w-auto"
                        >
                            <img class="lg:mr-9 mr-5" :src="match.teamOne" alt="Club" />

                            <img :src="match.teamTwo" alt="Serie" />
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
                >Other Features</button>
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
            // matchesData,
            title: "Próximos Torneos",
            text: "Recuerda que solo puedes inscribirte en un torneo antes de la fecha y hora del evento",
            index: null,
            currentPage: 3,
            maxPerPage: 1,
            showReadMore: true
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
        ...mapActions(["loadTorneos"]),
        loadMore() {
            this.currentPage += 1
        },
        formatDate(date) {
            console.log('formateDate', date, String(date));
            if (date) {
                return moment(date, "YYYY-MM-DD hh:mm").format('YYYY-MM-DD - hh:mm A')
            }
        }
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
        this.loadTorneos();
    },
}
</script>