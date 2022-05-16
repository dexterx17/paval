<script>
import { useStore, mapGetters, mapActions } from "vuex";
import { computed, ref, watch } from "vue";

import { CountTo } from 'vue3-count-to';

import Breadcrumb from "@/components/Breadcrumb.vue";
import Footer from "@/components/Footer.vue";
import TorneoDetails from "@/components/Torneos/TorneoDetails.vue";
import InscribirseTorneo from "@/components/Torneos/InscribirseTorneo.vue";
import InscribirAmigos from "@/components/Torneos/InscribirAmigos.vue";
import ConfigurarTorneo from "@/components/Torneos/ConfigurarTorneo.vue";
import CrearPartidoTorneo from "@/components/Partidos/CrearPartidoTorneo.vue";

import Inscritos from '@/components/Players/Inscritos.vue';

import { useRoute } from 'vue-router'

import { $vfm, VueFinalModal } from 'vue-final-modal'
import Popper from "vue3-popper";
import BloqueResultadoGrupo from "@/components/Partidos/BloqueResultadoGrupo.vue";


export default {
    components: {
    Breadcrumb,
    TorneoDetails,
    Footer,
    VueFinalModal,
   // ModalsContainer,
    CountTo,
    InscribirseTorneo,
    InscribirAmigos,
    ConfigurarTorneo,
    CrearPartidoTorneo,
    Inscritos,
    Popper,
    BloqueResultadoGrupo
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
        ...mapActions(["fetchTorneo"]),
        formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric', timeZone: "America/Guayaquil" }) {
            if (!value) return value
            return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
        },
        totalPartidosGrupo(jugadores){
            return ((jugadores.length-1) * 2);
        }
    },
    computed: {
        //...mapGetters(["getTorneo"]),
        isClubAdmin(){
            return false;
        },
    },
    setup() {
        const route = useRoute();
        const store = useStore();
        const torneoData = ref(null);
        const jugadoresInscritos = ref([]);
        const gruposTorneo = ref([]);
        const cuartosFinal = ref([]);

        const showModal = ref(false);
        const showModalConfigurarTorneo = ref(false);
        const showModalCrearPartido = ref(false);
        const showModalInscribirAmigos = ref(false);

        const newPartidoData = ref({
            playerA: null,
            playerB: null,
            grupo: null,
            torneo: null,
            resultados: []
        });


        const user = computed(() => store.getters.getUser);


        const loadInscritos = () => {
            store.dispatch('fetchInscritosTorneo', route.params.id).then((inscritos) => {
                console.log('inscritos');
                console.log(inscritos);
                jugadoresInscritos.value = inscritos;
            });
        };

        const loadTorneoData = () => {
            store.dispatch('fetchTorneo', route.params.id).then((torneo) => {
                console.log('torneoData');
                console.log(torneo);
                torneoData.value = torneo;
                newPartidoData.value.torneo = torneo;
            });
        };

        const loadGruposData = () => {
            store.dispatch('fetchGruposTorneo', route.params.id).then((grupos) => {
                console.log('gruposTorneo');
                console.log(grupos);
                gruposTorneo.value = grupos;
                cuartosFinal.value = grupos;

                cuartosFinal.value = cuartosFinal.value.map(gr => {
                    gr.jugadores = gr.jugadores.sort((a,b) => a.posicion-b.posicion);

                    gr.eliminatorias = [];
                    return gr;
                });

                
                for (let index = 0, index2= grupos.length-1; index < grupos.length; index++, index2-- ) {


                    cuartosFinal.value[index].eliminatorias.push({
                        playerA: cuartosFinal.value[index].jugadores[0],
                        playerB: cuartosFinal.value[index2].jugadores[1]
                    });

                }

                
            });
        };

        loadTorneoData();
        loadInscritos();
        loadGruposData();

        const crearPartido = (grupo, playerA, playerB) => {

            newPartidoData.value.grupo = grupo;
            newPartidoData.value.playerA = playerA;
            newPartidoData.value.playerB = playerB;
            showModalCrearPartido.value = true;
        }

        const handleNewImageUploaded = () => {
            loadTorneoData();
        }


        const hideModalInscripcion = () => {
            showModalInscribirAmigos.value = false;
            showModal.value = false;
            loadTorneoData();
            loadInscritos();
        }

        const hideModalConfigurar = () => {
            showModalConfigurarTorneo.value = false;
            loadTorneoData();
            loadGruposData();
        }

        const hideModalRegistrarPartido = () => {            
            showModalCrearPartido.value = false;
             console.log('vfm.openedModals');
             console.log($vfm.modals);

            loadGruposData();
        }

        const cerrarTodos = () => {
            console.log('cerrarA');
            $vfm.hideAll();
        }

        const resultadosPartido = (grupo, partidoKey) => {
            let index = grupo.jugados.indexOf(partidoKey);

            let partidoId = grupo.partidos[index];

            return grupo.resultados[partidoId] ?? null;
        }

        // fetch the user information when params change
        watch(
            () => route.params.id,
            async newId => {
                console.log('newId', newId);
                if (newId) {
                    loadTorneoData();
                }
            }
        )

        return {
            torneoData,
            jugadoresInscritos,
            gruposTorneo,
            cuartosFinal,
            showModal,
            showModalConfigurarTorneo,
            showModalCrearPartido,
            showModalInscribirAmigos,
            user,
            newPartidoData,

            hideModalConfigurar,
            hideModalInscripcion,
            hideModalRegistrarPartido,
            cerrarTodos,
            resultadosPartido,
            crearPartido,
            loadInscritos,

            handleNewImageUploaded
        }
    }
}
</script>

<template>
    <Breadcrumb :BreadcrumbTitle="BreadcrumbTitle" :BreadcrumbSubTitle="BreadcrumbSubTitle" />

    <!-- Team Varses Team Start -->
    <div class="container mb-12" v-if="torneoData">
        <div class="border-4 border-light-blue-500 rounded-4xl px-10 lg:px-16 py-8 max-w-lg mx-auto">
            <div class="grid grid-cols-1 items-center">
                <div class="flex justify-center items-center w-full px-20 sm:px-0">
                    <Popper hover>
                        <img class="lg:mr-9 mr-5 w-16 h-16 rounded-lg"
                            :src="torneoData.club ? torneoData.club.logo : '/images/others/upcoming-game-thumb3.webp'"
                            alt="Club" />
                        <template #content>
                            <RouterLink :to="`/club/${torneoData.club.id}`">
                                Ver página de club
                            </RouterLink>
                        </template>
                    </Popper>
                    <!-- <img class="lg:mr-9 mr-5" :src="torneoData.teamVs" alt="Feature Icon" /> -->
                    <img class="w-16 h-16" :src="torneoData.serie ? torneoData.serie.logo : '/images/others/seriei.png'"
                        alt="Serie" />
                </div>
            </div>
        </div>
    </div>
    <!-- Team Varses Team End -->

    <!-- Match Counterup Start -->
    <div class="container" v-if="torneoData">
        <div
            class="match_details_counterup flex flex-col sm:flex-row justify-between items-center py-12 mb-12 border-b-2 border-secondary-80">
            <div>
                <div v-if="commentsVisible" class="grid grid-cols-3">
                    <div class="mr-6 pr-6 lg:mr-16 lg:pr-16 relative pt-4">
                        <p class="uppercase md:text-lg text-sm font-semibold text-primary">Jugadores:</p>
                        <count-to class="text-white text-4xl lg:text-5xl font-bold" :startVal="0"
                            :endVal="torneoData.inscritos.length" :duration="3000" :autoplay="true"></count-to>
                        <span class="absolute right-0 top-0 transform rotate-12 bg-secondary-80 h-28 w-0.5"></span>
                    </div>
                    <div class="mr-6 pr-6 lg:mr-20 lg:pr-20 relative pt-4">
                        <p class="uppercase md:text-lg text-sm font-semibold text-primary">Modo Juego:</p>
                        <!-- <count-to class="text-white text-4xl lg:text-5xl font-bold" :startVal="0" :endVal="16"
                            :duration="3000" :autoplay="true"></count-to> -->
                        <span class="text-white text-4xl lg:text-5xl font-bold">{{ torneoData.modo_juego ?? '-' }}</span>
                        <span class="absolute right-0 top-0 transform rotate-12 bg-secondary-80 h-28 w-0.5"></span>
                    </div>
                    <div class="mr-6 pr-6 lg:mr-16 lg:pr-16 relative pt-4">
                        <p class="uppercase md:text-lg text-sm font-semibold text-primary">Premio Ganador:</p>
                        <count-to class="text-white text-4xl lg:text-5xl font-bold" :startVal="0" :endVal="6800"
                            :duration="3000" :autoplay="true"></count-to>
                    </div>
                </div>
            </div>
            <div v-if="user" class="flex flex-col justify-end mt-16 md:mt-0">
                <div v-if="torneoData.organizador.id == user.player.id || isClubAdmin">
                    <button v-if="!torneoData.modo_juego && !torneoData.n_grupos" @click="showModalInscribirAmigos = true"
                        class="group primary-btn opacity-100 transition-all"
                        style="background-image:url(/images/others/btn-bg.webp)">
                        Inscribir Amigos
                        <img src="/images/icon/arrrow-icon.webp" alt="Arrow Icon"
                            class="ml-3 w-5 h-5 group-hover:ml-4 transition-all" />
                    </button>
                </div>
                <div v-if="torneoData.inscritos.includes(user.player.id)"
                    class="flex flex-col align-content-center content-center">
                    <h3>Ya estas inscrito en este torneo</h3>
                    <h2
                        class="flex justify-center items-center py-2 uppercase text-2xl font-semibold text-primary text-center">
                        <small class="text-xs italic capitalize">Jugador</small>
                        <span class="pl-2"># {{ (torneoData.inscritos.indexOf(user.player.id) + 1) }}</span>
                    </h2>
                </div>
                <div v-else>
                    <button v-if="!torneoData.modo_juego && !torneoData.n_grupos" @click="showModal = true"
                        class="group primary-btn opacity-100 transition-all"
                        style="background-image:url(/images/others/btn-bg.webp)">
                        {{ btnName }}
                        <img src="/images/icon/arrrow-icon.webp" alt="Arrow Icon"
                            class="ml-3 w-5 h-5 group-hover:ml-4 transition-all" />
                    </button>
                </div>
                <div v-if="torneoData.organizador.id == user.player.id || isClubAdmin">
                    <button @click="showModalConfigurarTorneo = true" v-if="!torneoData.modo_juego && !torneoData.n_grupos"
                        class="group primary-btn opacity-100 transition-all"
                        style="background-image:url(/images/others/btn-bg.webp)">
                        Iniciar Torneo
                        <img src="/images/icon/arrrow-icon.webp" alt="Arrow Icon"
                            class="ml-3 w-5 h-5 group-hover:ml-4 transition-all" />
                    </button>
                </div>
            </div>
            <div v-else>
                <div class="flex flex-col align-content-center content-center">
                    <RouterLink to="/login">
                        <h3 class="text-center">Regístrate para poder inscribirte</h3>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div v-if="!torneoData.modo_juego && !torneoData.n_grupos && user">
            <vue-final-modal  class="bg-transparent" name="modal-inscribirse" classes="modal-container " content-class="modal-content"
                v-model="showModal" :width="1000" :height="700" :adaptive="true">
                <InscribirseTorneo :torneo="torneoData" @hide-modal="hideModalInscripcion" />
                <button
                    class="absolute top-0 right-0 icofont-close-line z-999 font-bold text-3xl text-white hover:text-primary transition-all transform hover:rotate-90"
                    @click="showModal = false"></button>
            </vue-final-modal>
            <vue-final-modal v-if="torneoData.organizador.id == user.player.id || isClubAdmin" class="bg-transparent" name="modal-inscribir-amigos" classes="modal-container " content-class="modal-content"
                v-model="showModalInscribirAmigos" :width="1000" :height="700" :adaptive="true">
                <InscribirAmigos :torneo="torneoData" @hide-modal="hideModalInscripcion" />
                <button
                    class="absolute top-0 right-0 icofont-close-line z-999 font-bold text-3xl text-white hover:text-primary transition-all transform hover:rotate-90"
                    @click="showModalInscribirAmigos = false"></button>
            </vue-final-modal>
            <vue-final-modal class="bg-transparent" name="modal-configurar-torneo" classes="modal-container " content-class="modal-content"
                v-model="showModalConfigurarTorneo" :width="1000" :height="700" :adaptive="true">
                <ConfigurarTorneo :torneo="torneoData" :inscritos="jugadoresInscritos" @hide-modal="hideModalConfigurar" />
                <button
                    class="absolute top-0 right-0 icofont-close-line z-999 font-bold text-3xl text-white hover:text-primary transition-all transform hover:rotate-90"
                    @click="showModalConfigurarTorneo = false"></button>
            </vue-final-modal>
        </div>
    </div>
    <!-- Match Counterup End -->

    <TorneoDetails v-if="torneoData" :torneo="torneoData" @imagen-cargada="handleNewImageUploaded" />

    <div class="container">
        <div  class="bg-white rounded grid gap-1 text-gray-700" :class="'grid-cols-'+(gruposTorneo.length)" >
            <div>
                <div v-for="grupo in cuartosFinal" :key="grupo.id">
                    <div class="flex flex-col border border-primary m-2 rounded"  v-for="partido, index2 in grupo.eliminatorias" :key="index2">
                        <div class="border border-primary border-dotted">
                            <div class="flex justify-between align-middle ">
                                <div class="flex flex-row items-center pl-1">
                                    <img class="w-8 h-8 rounded-xl mx-auto"
                                        :src="partido.playerA.avatar ?? '/images/others/upcoming-game-thumb3.webp'" :alt="partido.playerA.nombre" />
                                    <div class="text-center">
                                        <span class="text-center">{{ partido.playerA.nombre }} 1ero</span>
                                    </div>
                                </div>
                                <span class="bg-gris-oscuro px-2 py-1 text-white font-bold">
                                    0
                                </span>
                            </div>
                        </div>
                        <div class="border">
                            <div class="flex justify-between align-middle ">
                                <div class="flex flex-row items-center pl-1">
                                    <img class="w-8 h-8 rounded-xl mx-auto"
                                        :src="partido.playerB.avatar ?? '/images/others/upcoming-game-thumb3.webp'" :alt="partido.playerB.nombre" />
                                    <div class="text-center">
                                        <span class="text-center">{{ partido.playerB.nombre }} 2do</span>
                                    </div>
                                </div>
                            
                                <span class="bg-gris-oscuro px-2 py-1 text-white font-bold">
                                    0
                                </span>
                            </div>
                        </div>
                    </div>
    
                </div>

            </div>
            <div class="flex flex-col border border-primary row-span-2" >
                <div class="border">
                    Primero Grupo 2
                </div>
                <div class="border">
                    Segundo Grupo 1
                </div>
            </div>

        </div>
        <div class="my-16" v-for="grupo in gruposTorneo" :key="grupo.id">
            <div class="team-one">
                <span class="text-primary text-lg uppercase font-semibold mb-4 block">Grupo {{ grupo.grupo }}</span>
                <!-- <h2 class="font-bold uppercase text-xl md:text-4xl mb-8">Jugadores Inscritos</h2> -->
                <section>
                    <table class="border-2 border-primary mx-auto">
                        <thead>
                            <tr>
                                <th>
                                    <div class="flex flex-col italic text-primary">
                                        <span>{{
                                            totalPartidosGrupo(grupo.jugadores)
                                        }}
                                            Partidos
                                        </span>
                                        <small>
                                            <i class="">{{ (grupo.jugadores.length-1) }}</i>
                                            x Jugador
                                        </small>
                                    </div>
                                </th>
                                <td v-for="ply in grupo.jugadores" :key="ply.id" class="border p-1">
                                    <div class="flex flex-col align-middle">
                                        <img class="w-8 h-8 rounded-xl mx-auto"
                                            :src="ply.avatar ?? '/images/others/upcoming-game-thumb3.webp'" :alt="ply.nombre" />
                                        <div>
                                            <span class>{{ ply.nombre }}</span>
                                        </div>
                                    </div>
                                </td>
                                <th class="border px-1 bg-black">Puntos</th>
                                <th class="border px-1 bg-black">Sets</th>
                                <th class="border px-1 bg-black">Puesto</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border" v-for="ply in grupo.jugadores" :key="ply.id">
                                <td>
                                    <div class="flex flex-col align-middle pl-1">
                                        <img class="w-8 h-8 rounded-xl mx-auto"
                                            :src="ply.avatar ?? '/images/others/upcoming-game-thumb3.webp'" :alt="ply.nombre" />
                                        <div class="text-center">
                                            <span class="text-center">{{ ply.nombre }}</span>
                                        </div>
                                    </div>
                                </td>
                                <td v-for="play in grupo.jugadores" :key="play.id" class="text-center border">
                                    <div v-if="play.id == ply.id" class="flex flex-col">
                                        <img class="w-8 h-8 rounded-xl mx-auto" :src="torneoData.club.logo ? torneoData.club.logo : '/images/others/santana.png'"
                                            alt="Ping Pong Ranking" />
                                    </div>
                                    <div v-else>
                                        <div v-if="grupo.jugados.includes(ply.id + '_' + play.id)">
                                            <BloqueResultadoGrupo :principal="ply" :player-a="ply" :player-b="play" :resultado="resultadosPartido(grupo, ply.id + '_' + play.id)" :grupo="grupo" />
                                        </div>
                                        <div v-else-if="grupo.jugados.includes(play.id + '_' + ply.id)">
                                            <BloqueResultadoGrupo :principal="ply" :player-a="play" :player-b="ply"  :resultado="resultadosPartido(grupo, play.id + '_' + ply.id)" :grupo="grupo" />
                                        </div>
                                        <div v-else class="p-1">
                                            <Popper hover>
                                                <button @click="crearPartido(grupo, ply, play)"
                                                    type="button" 
                                                    >
                                                    <img class="w-8 h-8 rounded-xl mx-auto" src="/images/others/play-btn.webp"
                                                        alt="Registrar Resultados" />
                                                </button>
                                                <template #content>
                                                    Registrar Resultados
                                                </template>
                                            </Popper>
                                        </div>
                                    </div>
                                </td>
                                <td class="border text-center bg-black">{{ ply.puntos }}</td>
                                <td class="border text-center bg-black">{{ ply.sets }}</td>
                                <td class="border text-center bg-black">{{ ply.posicion }}</td>
                            </tr>
                        </tbody>
                    </table>

                </section>
            </div>
        </div>
        <vue-final-modal class="bg-transparent" name="modal-crear-partido" classes="modal-container "
            content-class="modal-content" v-model="showModalCrearPartido" 
            @closed="cerrarTodos"
            :esc-to-close="true"
            :adaptive="true">
            <CrearPartidoTorneo v-if="torneoData" :partido="newPartidoData"
                @hide-modal="hideModalRegistrarPartido" />
            <button
                class="absolute top-0 right-0 icofont-close-line z-999 font-bold text-3xl text-white hover:text-primary transition-all transform hover:rotate-90"
                @click="hideModalRegistrarPartido"></button>
        </vue-final-modal>
    </div>

    <div class="container" v-if="torneoData">
        <Inscritos v-if="jugadoresInscritos" :torneo="torneoData" :jugadores-inscritos="jugadoresInscritos" @reload-inscritos="loadInscritos" />

        <div class="description mt-6">
            <RouterLink :to="{ name: 'torneos' }">
                <h3 class="text-2xl text-primary hover:text-white uppercase font-bold mb-5">
                    Regresar a Torneos
                </h3>
            </RouterLink>
        </div>
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