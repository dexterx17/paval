<script>
    import { useStore, mapGetters, mapActions } from "vuex";
    import { computed, ref, watch } from "vue";
    import { useRoute } from 'vue-router';
    import { CountTo } from 'vue3-count-to';


    import Breadcrumb from "@/components/Breadcrumb.vue";
    import Footer from "@/components/Footer.vue";

    export default {
        components:{
            Breadcrumb,
            Footer,
            CountTo
        },
        methods: {
            ...mapActions(["fetchPartido"]),
            formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
                if (!value) return value
                return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
            }
        },
        data() {
            return {
                BreadcrumbTitle: "Detalles Partido",
                BreadcrumbSubTitle: "Partido",
                commentsVisible: true,
            };
        },
        setup(){
            const store = useStore();
            const route = useRoute();
            const partidoData = ref(null);
            
            const user = computed(() => store.getters.getUser);


            const loadPartidoData = () => {
                store.dispatch('fetchPartido', route.params.id)
                .then((partido) => {
                    console.log('partidoData');
                    console.log(partido);
                    partidoData.value = partido;
                });
            };

            loadPartidoData();

            return {
                partidoData
            }
        }
    }
</script>

<template>
        <Breadcrumb :BreadcrumbTitle="BreadcrumbTitle" :BreadcrumbSubTitle="BreadcrumbSubTitle"/>

        <!-- Team Varses Team Start -->
        <div class="container mb-12" v-if="partidoData">
            <div class="border-4 border-light-blue-500 rounded-4xl px-10 lg:px-16 py-8 max-w-lg mx-auto">
                <div class="grid grid-cols-1 items-center">
                    <div class="flex justify-center items-center w-full px-20 sm:px-0">
                        <img class="lg:mr-9 mr-5 w-24 h-24 rounded-lg" :src="partidoData.playerA.avatar" :alt="partidoData.playerA.nombre">
                        <img class="lg:mr-9 mr-5" src="/images/others/game-vs1.webp" alt="Feature Icon">
                        <img class="w-24 h-24 rounded-lg" :src="partidoData.playerB.avatar ?? '/images/blog/blog3.webp'" :alt="partidoData.playerB.nombre">
                    </div>
                </div>
            </div>
        </div>
        <!-- Team Varses Team End -->


        <!-- Match Counterup Start -->
        <div class="container" v-if="partidoData">
            <div class="match_details_counterup flex flex-col sm:flex-row justify-between items-center py-12 mb-12 border-b-2 border-secondary-80">
                <div v-observe-visibility="{callback: visibilityChanged, once: true}">
                    <div v-if="commentsVisible" class="grid grid-cols-3">
                        <div class="mr-6 pr-6 lg:mr-16 lg:pr-16 relative pt-4">
                            <p class="uppercase md:text-lg text-sm font-semibold text-primary">Modo:</p>
                            <h4 class="text-white text-xl lg:text-5xl font-bold" >{{ partidoData.modo_juego }}</h4>
                            <!-- <countTo class="text-white text-4xl lg:text-5xl font-bold" :startVal='0' :endVal='280' :duration='3000' :autoplay='true'></countTo> -->
                            <span class="absolute right-0 top-0 transform rotate-12 bg-secondary-80 h-28 w-0.5"></span>
                        </div>
                        <div class=" mr-6 pr-6 lg:mr-20 lg:pr-20 relative pt-4">
                            <p class="uppercase md:text-lg text-sm font-semibold text-primary">Sets:</p>
                            <countTo class="text-white text-4xl lg:text-5xl font-bold" :startVal='0' :endVal='3' :duration='3000' :autoplay='true'></countTo>
                            <span class="absolute right-0 top-0 transform rotate-12 bg-secondary-80 h-28 w-0.5"></span>
                        </div>
                        <div class=" mr-6 pr-6 lg:mr-16 lg:pr-16 relative pt-4">
                            <p class="uppercase md:text-lg text-sm font-semibold text-primary">Puntos:</p>
                            <countTo class="text-white text-4xl lg:text-5xl font-bold" :startVal='0' :endVal='68' :duration='3000' :autoplay='true'></countTo>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end mt-16 md:mt-0">
                    <button class="group primary-btn opacity-100 transition-all" style="background-image:url(/images/others/btn-bg.webp)">
                        Resultados
                        <img src="/images/icon/arrrow-icon.webp" alt="Arrow Icon" class="ml-3 w-5 h-5 group-hover:ml-4 transition-all">
                    </button>  
                </div>
            </div>
        </div>
        <!-- Match Counterup End -->

        <div class="container" v-if="partidoData">
            <p class="date text-primary font-bold mb-3 flex justify-between">
                <!-- <span>
                    <span class="capitalize">{{ formatDate(partido.fecha, { weekday: "long" }) }},</span>
                    {{ formatDate(partido.fecha) }}
                    {{ partido.hora }}
                </span>
                <span>
                    <i class="text-xs"></i>
                    <span>{{ partido.ciudad }}</span>
                    <small class="px-1">{{ partido.lugar }}</small>
                </span> -->
            </p>
            <h2
                class="text-white font-bold uppercase xl:text-title lg:text-5xl md:text-4xl sm:text-3xl text-2xl xl:leading-70 lg:leading-12 leading-10"
            >{{ partidoData.nombre }}</h2>
        </div>

        <Footer></Footer>
</template>