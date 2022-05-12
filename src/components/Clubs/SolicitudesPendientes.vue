<template>
    <div>
        <div class="my-16">
            <div class="team-one">
                <span class="text-primary text-lg uppercase font-semibold mb-4 block">{{ solicitudesData.length }} jugadores nuevos</span>
                <h2 class="font-bold uppercase text-xl md:text-4xl mb-8">Solicitudes Pendientes</h2>

                <div>
                        <div  v-if="solicitudesData" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            <div class="relative group w-300 sm:w-full mx-auto" v-for="(player, index) in solicitudesData" :key="index">
                                <div class="w-full rounded-4xl overflow-hidden relative">
                                    <img :src="player.avatar ?? '/images/player/list/player-1.webp'" :alt="player.nombre">
                                    <RouterLink :to="`/player/${player.jugador_id}`" class="w-full h-full absolute left-0 top-0 bg-gray-900 rounded-5xl opacity-0 group-hover:opacity-70 border-4 border-gray-400 rounded-4xl"></RouterLink>
                                    <ul class="social-link absolute left-0 text-center bottom-0 group-hover:bottom-8 w-full space-x-2 opacity-0 group-hover:opacity-100 transition-all z-20 text-white">
                                        <li class="text-center inline-block">
                                            <button @click="showAprobarJugador(player)" class="w-32 h-16 flex items-center justify-center transition-all bg-cover text-white hover:bg-arrow-shape bg-arrow-hover-shape z-50">
                                                Aprobar Jugador
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div class="flex flex-col justify-center items-center mt-8 bg-team-shape bg-cover h-24 sm:h-20 md:h-28 lg:h-24 xl:h-32 2xl:h-32 group-hover:bg-team-hover-shape hover:transition-all">
                                    <h3 class="text-white font-bold text-lg md:text-2xl uppercase mb-2 xl:mb-4 leading-tight">
                                        <RouterLink :to="`/player/${player.id}`">{{player.nombre}}</RouterLink>
                                    </h3>
                                    <span class="text-white text-sm group-hover:text-white transition-all">{{player.ciudad}}</span>
                                </div>
                            </div>
                        </div>
                </div>

                <vue-final-modal  class="bg-transparent" name="modal-retar" classes="modal-container " content-class="modal-content"
                    v-model="showModalAprobarSocio" :width="1000" :height="700" :adaptive="true">
                    <AprobarSolicitud :club="club" :player="currentPlayer" @hide-modal="showModalAprobarSocio = false" />
                <button
                    class="absolute top-0 right-0 icofont-close-line z-999 font-bold text-3xl text-white hover:text-primary transition-all transform hover:rotate-90"
                    @click="showModalAprobarSocio = false"></button>
                </vue-final-modal>

            </div>
        </div>
    </div>
</template>

<script>

import { computed, ref, watch } from "vue";
import { useRoute } from 'vue-router'
import { useStore } from "vuex";

import { $vfm, VueFinalModal } from 'vue-final-modal'

import AprobarSolicitud from "./AprobarSolicitud.vue";

export default {
    props:['club'],
    components:{
        AprobarSolicitud,
        VueFinalModal
    },
    setup(){
        const route = useRoute();
        const store = useStore();
        const solicitudesData = ref([]);
        const showModalAprobarSocio = ref(false);
        const currentPlayer = ref(null)

        const loadSolicitudesData = () => {
            store.dispatch('fetchSolicitudesClub', {
                club: route.params.id
            }).then((solicitudes) => {
                console.log('solicitudesClub');
                console.log(solicitudes);
                solicitudesData.value = solicitudes;
            });
        };

        loadSolicitudesData();

        const showAprobarJugador = (player) => {
            currentPlayer.value = player;
            showModalAprobarSocio.value = true;
        }

        return {
            solicitudesData,
            showModalAprobarSocio,
            currentPlayer,

            showAprobarJugador
        };
    }
}
</script>