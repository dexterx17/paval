<template>
    <!-- Team Number Section Start -->
    <div class="my-8">
        <div class="team-one mt-8" v-for="serie in seriesData" :key="serie.id">
            <span class="text-primary text-lg uppercase font-semibold mb-4 flex justify-between">
                <span>
                    {{ serie.max_integrantes }} Jugadores
                </span>
                <small class="text-xs italic">
                    Puntos obtenidos por torneo
                </small>
            </span>
            <h2 class="flex flex-col md:flex-row justify-between font-bold uppercase text-xl md:text-4xl mb-8">
                <span>
                    Categoría {{ serie.nombre }}
                    <Popper v-if="isClubAdmin" hover>
                        <button 
                            @click="handleEditarSerie(serie)"
                            title="Editar Categoría"
                            class="swipper-arrow align-self-end self-end text-white md:w-68 w-55 md:h-55 h-11 flex items-center justify-center hover:bg-arrow-hover-shape bg-arrow-shape bg-cover transition-all z-50 ml-2">
                            <i class="icofont-edit"></i>
                        </button>
                        <template #content>
                            <div class="text-lg normal-case">Editar Categoría</div>
                        </template>
                    </Popper>
                </span>
                <table class="text-xs ">
                    <thead>
                        <tr>
                            <th class="border border-primary px-1">Posición</th>
                            <th v-for="puntaje, index in serie.puntajes" :key="index" class="border border-primary px-1">{{ (index+1) }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th class="border border-primary px-1">
                                Puntos
                            </th>
                            <td  v-for="puntaje, index in serie.puntajes" :key="index" class="border border-primary px-1 text-center">
                                {{ puntaje }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </h2>
            <swiper class="swiper" :options="swiperOption" navigation>
                <swiper-slide v-for="(jugador, index) in serie.jugadores" :key="index">
                    <div class="rounded-50">
                        <div class>
                            <RouterLink :to="{ name: 'player', params:{ id: jugador.jugador_id } }">
                                <div class="absolute flex flex-col text-center border border-primary rounded-tl-2xl bg-gris-oscuro">
                                    <strong>
                                        {{ jugador.ranking }}
                                    </strong>
                                    <small class="text-sm italic">Rank</small>
                                </div>
                                <img
                                    class="rounded-2xl"
                                    :src="jugador.avatar ?? '/images/blog/blog3.webp'"
                                    :alt="jugador.nombre"
                                />
                                <h3
                                    class="absolute w-full text-center text-dark-gray bg-gray-800 bg-opacity-90 bottom-0"
                                >
                                        {{ jugador.nombre }}
                                </h3>
                            </RouterLink>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>

    <vue-final-modal  class="bg-transparent" name="modal-inscribirse" classes="modal-container " content-class="modal-content"
        v-model="showModal" :width="1000" :height="700" :adaptive="true">
        <SerieFormModal :serie-data="serieModel" @hide-modal="hideModalSerie" />
        <button
            class="absolute top-0 right-0 icofont-close-line z-999 font-bold text-3xl text-white hover:text-primary transition-all transform hover:rotate-90"
            @click="showModal = false"></button>
    </vue-final-modal>
    </div>
    <!-- Team Number Section End -->
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import Popper from "vue3-popper";

import SerieFormModal from './SerieFormModal.vue';
import { computed, ref, watch } from "vue";
import { useRoute } from 'vue-router'
import { useStore, mapGetters } from "vuex";
import { $vfm, VueFinalModal } from 'vue-final-modal';

export default {
    components: {
        Swiper,
        SwiperSlide,
        SerieFormModal,
        VueFinalModal,
        Popper
    },
    props:['club'],
    data() {
        return {
            swiperOption: {
                slidesPerView: 6,
                spaceBetween: 0,
                loop: true,
                pagination: false,
                navigation: false,
                breakpoints: {
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    // when window width is >= 640px
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40
                    },
                    // when window width is >= 1024px
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 40
                    }
                },
            },
            teamplayers: [
                {
                    teamImage: "/images/others/players1.webp"
                },
                {
                    teamImage: "/images/others/players2.webp"
                },
                {
                    teamImage: "/images/others/players3.webp"
                },
                {
                    teamImage: "/images/others/players4.webp"
                },
                {
                    teamImage: "/images/others/players5.webp"
                },
                {
                    teamImage: "/images/others/players6.webp"
                },
                {
                    teamImage: "/images/others/players3.webp"
                },
                {
                    teamImage: "/images/others/players1.webp"
                },
                {
                    teamImage: "/images/others/players2.webp"
                },
            ]
        }
    },
    computed: {
        ...mapGetters(["isUserAuth", "getUser"]),
        isClubAdmin(){
            return this.getUser ? this.club.administradores.includes(this.getUser.player.id) : false;
        },
    },
    setup(props){
        const route = useRoute();
        const store = useStore();
        const seriesData = ref([]);

        const showModal = ref(false);

        const serieModel = ref({
            club: props.club.id,
            nombre: "",
            max_integrantes: null,
            min_integrantes: null,
            relevancia: null,
            puntajes: null,
            jugadores:[]
        });

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

        const handleEditarSerie = (serie) => {
            serieModel.value  = serie;
            showModal.value = true;
        };

        const hideModalSerie = () => {
            showModal.value = false;
        }

        return {
            seriesData,
            serieModel,

            showModal,
            
            hideModalSerie,
            handleEditarSerie
        };
    }
}

</script>

<style scoped>
.swiper-slide {
    display: flex;
    height: 200px !important;
    width: 200px !important;
    justify-content: center;
    align-items: center;
    color: #000;
    font-size: 24px;
    font-weight: 700;
}

.modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-content {
    position: relative;
    width: 80% !important;
    /* max-height: 300px; */
    height: 100% !important;
    padding: 16px;
    overflow: auto;
    background-color: #53575a !important;
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