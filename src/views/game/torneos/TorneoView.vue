<script>
import { mapGetters, mapActions } from "vuex";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

import { CountTo } from 'vue3-count-to';

import Breadcrumb from "@/components/Breadcrumb.vue";
import Footer from "@/components/Footer.vue";
import TorneoDetails from "@/components/Torneos/TorneoDetails.vue";
import InscribirseTorneo from "@/components/Torneos/InscribirseTorneo.vue";
import Inscritos from '@/components/Players/Inscritos.vue';

import { useRoute } from 'vue-router'

import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'


export default {
    components: {
        Breadcrumb,
        TorneoDetails,
        Footer,
        VueFinalModal,
        ModalsContainer,
        CountTo,
        InscribirseTorneo,
        Inscritos
    },
    data() {
        return {
            BreadcrumbTitle: "Detalles Torneo",
            BreadcrumbSubTitle: "Torneo",
            btnName: "INSCRIBIRME",
            commentsVisible: true,
        };
    },
    methods: {
        formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
            if (!value) return value
            return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
        }
    },
    computed: {
        //...mapGetters(["getTorneo"]),
    },
    setup() {
        const route = useRoute();
        const store = useStore();
        const torneoData = ref(null);
        const jugadoresInscritos = ref([]);
        const showModal = ref(false);
        

        const user = computed(() => store.getters.getUser);
        

        store.dispatch('fetchTorneo', route.params.id).then((torneo) => {
            console.log('torneoData');
            console.log(torneo);
            torneoData.value = torneo;

        });

        store.dispatch('fetchInscritosTorneo', route.params.id).then((inscritos) => {
            console.log('inscritos');
            console.log(inscritos);
            jugadoresInscritos.value = inscritos;
        });

        // fetch the user information when params change
        watch(
            () => route.params.id,
            async newId => {
                console.log('newId', newId);
                torneoData.value = await fetchTorneo(newId)
            }
        )

        return {
            torneoData,
            jugadoresInscritos,
            showModal,
            user
        }
    }
}
</script>

<template>
    <Breadcrumb :BreadcrumbTitle="BreadcrumbTitle" :BreadcrumbSubTitle="BreadcrumbSubTitle" />

    <!-- Team Varses Team Start -->
    <div class="container mb-12" v-if="torneoData">
        <div
            class="border-4 border-light-blue-500 rounded-4xl px-10 lg:px-16 py-8 max-w-lg mx-auto"
        >
            <div class="grid grid-cols-1 items-center">
                <div class="flex justify-center items-center w-full px-20 sm:px-0">
                    <img
                        class="lg:mr-9 mr-5 w-16 h-16 rounded-lg"
                        :src="torneoData.club ? torneoData.club.logo : '/images/others/upcoming-game-thumb3.webp'"
                        alt="Club"
                    />
                    <!-- <img class="lg:mr-9 mr-5" :src="torneoData.teamVs" alt="Feature Icon" /> -->
                    <img
                        class="w-16 h-16"
                        :src="torneoData.serie ? torneoData.serie.logo : '/images/others/seriei.png'"
                        alt="Feature Icon"
                    />
                </div>
            </div>
        </div>
    </div>
    <!-- Team Varses Team End -->

    <!-- Match Counterup Start -->
    <div class="container" v-if="torneoData">
        <div
            class="match_details_counterup flex flex-col sm:flex-row justify-between items-center py-12 mb-12 border-b-2 border-secondary-80"
        >
            <div>
                <div v-if="commentsVisible" class="grid grid-cols-3">
                    <div class="mr-6 pr-6 lg:mr-16 lg:pr-16 relative pt-4">
                        <p
                            class="uppercase md:text-lg text-sm font-semibold text-primary"
                        >Jugadores:</p>
                        <count-to
                            class="text-white text-4xl lg:text-5xl font-bold"
                            :startVal="0"
                            :endVal="torneoData.inscritos.length"
                            :duration="3000"
                            :autoplay="true"
                        ></count-to>
                        <span
                            class="absolute right-0 top-0 transform rotate-12 bg-secondary-80 h-28 w-0.5"
                        ></span>
                    </div>
                    <div class="mr-6 pr-6 lg:mr-20 lg:pr-20 relative pt-4">
                        <p
                            class="uppercase md:text-lg text-sm font-semibold text-primary"
                        >Ranking Avg:</p>
                        <count-to
                            class="text-white text-4xl lg:text-5xl font-bold"
                            :startVal="0"
                            :endVal="16"
                            :duration="3000"
                            :autoplay="true"
                        ></count-to>
                        <span
                            class="absolute right-0 top-0 transform rotate-12 bg-secondary-80 h-28 w-0.5"
                        ></span>
                    </div>
                    <div class="mr-6 pr-6 lg:mr-16 lg:pr-16 relative pt-4">
                        <p
                            class="uppercase md:text-lg text-sm font-semibold text-primary"
                        >Premio Ganador:</p>
                        <count-to
                            class="text-white text-4xl lg:text-5xl font-bold"
                            :startVal="0"
                            :endVal="6800"
                            :duration="3000"
                            :autoplay="true"
                        ></count-to>
                    </div>
                </div>
            </div>
            <div v-if="user" class="flex justify-end mt-16 md:mt-0">
                <div
                 v-if="torneoData.inscritos.includes(user.uid)"
                 class="flex flex-col align-content-center  content-center"
                >
                    <h3>Ya estas inscrito en este torneo</h3>
                    <h2 class="flex flex-col py-2 uppercase text-2xl font-semibold text-primary text-center">
                        <small class="text-xs italic capitalize">
                            Jugador
                        </small>
                        <span>
                        # {{ (torneoData.inscritos.indexOf(user.uid) + 1) }}
                        </span>
                    </h2>
                </div>
                <button
                    v-else
                    @click="showModal = true;"
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
        <vue-final-modal
            class="bg-transparent"
            name="my-modal"
            classes="modal-container "
            content-class="modal-content"
            v-model="showModal"
            :width="1000"
            :height="700"
            :adaptive="true"
        >
            <InscribirseTorneo :torneo="torneoData" @hide-modal="showModal = false" />
            <button
                class="absolute top-0 right-0 icofont-close-line z-999 font-bold text-3xl text-white hover:text-primary transition-all transform hover:rotate-90"
                @click="showModal = false"
            ></button>
        </vue-final-modal>
    </div>
    <!-- Match Counterup End -->

    <TorneoDetails v-if="torneoData" :match="torneoData" />

    <div class="container">
        <Inscritos v-if="jugadoresInscritos" :jugadores-inscritos="jugadoresInscritos" />
    </div>

    <Footer />
</template>

<style>
.modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-content {
    position: relative;
    width: 50%;
    max-height: 300px;
    padding: 16px;
    overflow: auto;
    background-color: #281d59;
    border-radius: 4px;
}
.modal-close {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    margin: 8px 8px 0 0;
    cursor: pointer;
}
.modal-close::hover {
    color: gray;
}
</style>