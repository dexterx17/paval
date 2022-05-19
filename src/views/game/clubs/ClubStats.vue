<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import Footer from "@/components/Footer.vue";

import RankingGeneralGraph from "@/components/Clubs/RankingGeneralGraph.vue";

import RankingGraph from "@/components/Clubs/RankingGraph.vue";

import { useStore, mapGetters, mapActions } from "vuex";
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

export default {
    components: {
        Footer,
        Breadcrumb,
        RankingGeneralGraph,
        RankingGraph
    },
    data(){
        return {
            tableData:[],
            tableRow: [],
            BreadcrumbTitle: "Estadísticas Club",
            BreadcrumbSubTitle: "PAVAL",
        }
    },
    methods:{
        ...mapActions(["importPlayers"]),
        onLoad(){
        }
    },
    setup() {
        const route = useRoute();
        const store = useStore();
        const clubData = ref(null);
        const showModal = ref(false);
        const totalImportar = ref(0);
        const seriesData = ref([]);

        const loadClubData = (clubId) => {
            store.dispatch('fetchClub', clubId).then((value) => {
                console.log('value');
                console.log(value);
                clubData.value = value;
            });
        }

        loadClubData(route.params.id);

        const loadPlayersSerieData = () => {
            store.dispatch('loadSeriesClub', {
                club: route.params.id
            }).then((grupos) => {
                console.log('gruposClub');
                console.log(grupos);
                seriesData.value = grupos;
            });
        };

        loadPlayersSerieData();

        // fetch the user information when params change
        watch(
            () => route.params.id,
            async newId => {
                console.log('newId', newId);
                if(newId){
                    loadClubData(newId);
                }
            }
        )

        return {
            clubData,
            showModal,
            totalImportar,
            seriesData,
        }
    }

}
</script>

<template>
    <Breadcrumb :BreadcrumbTitle="BreadcrumbTitle" :BreadcrumbSubTitle="BreadcrumbSubTitle" />

    <div class="container relative" v-if="clubData">
        <!-- Team Varses Team Start -->
        <div class="container mb-12">
            <div class="flex justify-center items-center w-full p-0">
                <img class="lg:mr-9 mr-5 w-24 h-24 rounded-lg border-4 border-light-blue-500" :src="clubData.logo"
                    :alt="clubData.nombre" />
            </div>
        </div>
        <h2
            class="text-white font-bold uppercase xl:text-title lg:text-5xl md:text-4xl sm:text-3xl text-2xl xl:leading-70 lg:leading-12 leading-10">
            {{ clubData.nombre }}</h2>

        <div class="description mt-6">
            <h3 class="text-2xl text-white uppercase font-bold mb-5">Ranking General</h3>            
        </div>

        <RankingGeneralGraph />
    </div>

    <RankingGraph />

    <Footer />
</template>

