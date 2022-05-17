<template>
    <div class="container mb-120">
        <TitleSection :title="title" :text="text" />

            <div class>
                <!-- <CoolLightBox :items="items" :index="index" @close="index = null"></CoolLightBox> -->

                <div
                    v-for="(match, imageIndex) in matchesData"
                    :key="imageIndex"
                    class="border-4 border-light-blue-500 rounded-4xl px-10 lg:px-16 py-8 mb-7.5 last:mb-0 relative"
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
                            <div class="rounded-lg text-center flex flex-col justify-center">
                                <img :src="match.playerA.avatar ?? '/images/others/upcoming-game-thumb3.webp'" :alt="match.playerA.nombre">
                                <strong v-if="match.resultado"> {{ match.resultado.split(':')[0] }} </strong>
                            </div>
                            <img class="mx-5" src="/images/others/game-vs1.webp" alt="Feature Icon">
                            <div class="text-center flex flex-col justify-center">
                                <img class=" rounded-lg" :src="match.playerB.avatar ?? '/images/others/upcoming-game-thumb3.webp'" :alt="match.playerB.nombre">
                                <strong v-if="match.resultado"> {{ match.resultado.split(':')[1] }} </strong>
                            </div>
                        </div>

                    </div>
                    <div v-if="showDeleteButton" class="text-sm absolute px-3 right-1 top-0 bg-red-500 rounded-tr-3xl">
                        <Popper
                            placement="top"
                            hover>
                            <button @click="eliminarPartido(match)" >
                                X
                            </button>
                            <template #content class="z-99">
                                <div>Eliminar Partido</div>
                            </template>
                        </Popper>
                    </div>
                </div>
            </div>

            <div
                class="flex justify-center mt-73"
                v-if="showReadMore"
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
import { mapActions, useStore, mapGetters } from "vuex";
import { useRoute } from 'vue-router'
import Popper from "vue3-popper";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
    components: {
        TitleSection,
        Popper
    },
    data() {
        return {
            title: "Últimos partidos",
            text: "Partidos de este torneo ordenados cronológicamente",
            index: null,
            maxPerPage: 3,
            showReadMore: true,
        }
    },
    props:['torneo'],
    computed: {
        ...mapGetters(["isUserAuth", "getUser"]),
        showDeleteButton() {
            return  this.getUser ? (this.torneo.organizador.id == this.getUser.player.id) : false;
        },
        totalResults() {
            return Object.keys(this.matchesData).length
        },
    },
    methods: {
        ...mapActions(["loadPartidosTorneo","deletePartidoTorneo"]),
        loadMore() {
            let lastPartido = this.matchesData[this.matchesData.length-1];
            let resultados = this.loadPartidosTorneo({
                limit: this.maxPerPage,
                torneo_id: this.$route.params.id,
                lastPartido: lastPartido
            });
        },
        formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
            if (!value) return value
            return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value+'T00:00'))
        },
        eliminarPartido(match){
            
            Swal.fire({
                title: 'Estás seguro?',
                text: "Quieres borrar este partido?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrarla!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    let resultadoA = match.resultado.split(':')[0];
                    let resultadoB = match.resultado.split(':')[1];

                    let idGanador = resultadoA > resultadoB ? match.playerA.id : match.playerB.id;
                    let idPerdedor = resultadoA > resultadoB ? match.playerB.id : match.playerA.id;
                    let puntosGanador = resultadoA > resultadoB ? resultadoA : resultadoB;
                    let puntosPerdedor = resultadoA > resultadoB ? resultadoB : resultadoA;


                    this.deletePartidoTorneo({
                        partido: match,
                        data:{
                            idGanador: idGanador,
                            puntosGanador: puntosGanador,
                            idPerdedor: idPerdedor,
                            puntosPerdedor: puntosPerdedor,
                        }
                    }).then(e => {
                        console.log('partido borrado correctamente', e)
                        this.$emit('reload-data');
                        this.matchesData = this.matchesData.filter(m => m.id != match.id)
                    });
                }
            });

        }
    },
    setup() {
        const store = useStore();
        const route = useRoute();

        // store.dispatch('loadSeriesClub', {
        //     club: props.club.id
        // }).then((items) => {
        //     console.log('items');
        //     seriesOptions.value = items;
        //     console.log(items);
        // });

        let matchesData = computed(function () {
            return store.state.partidosStore.partidos;
        });

        return {
            matchesData
        };
    },
    mounted() {

        this.loadPartidosTorneo({
            limit: this.maxPerPage,
            torneo_id: this.$route.params.id
        });
    },
}
</script>