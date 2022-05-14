
<template>
    <!-- Team Number Section Start -->
    <div class="my-16">
        <div class="team-one">
            <span class="text-primary text-lg uppercase font-semibold mb-4 block">{{ jugadoresInscritos.length }} inscritos</span>
            <h2 class="font-bold uppercase text-xl md:text-4xl mb-8">Jugadores Torneo</h2>
            <swiper class="swiper"
                :modules="swiperOption.modules"
                :pagination="{ clickable: true }"
                navigation
                :options="swiperOption">
                <swiper-slide v-for="(team, index) in jugadoresInscritos" :key="index">
                    <div class="rounded-50">
                        <div class>
                            <div v-if="showDeleteButton(team.id)" class="text-sm absolute p-1 right-0 top-0 bg-red-500 rounded-tr-lg">
                                <Popper
                                    placement="top"
                                    hover>
                                    <button @click="salirDeTorneo(team.id)" >
                                        X
                                    </button>
                                    <template #content class="z-99">
                                        <div>Retirar inscripción</div>
                                    </template>
                                </Popper>
                            </div>
                            
                                <RouterLink :to="{ name: 'player', params:{ id: team.id } }">
                                    <div class="absolute flex flex-col text-center border border-primary rounded-tl-2xl bg-gris-oscuro">
                                        <strong>
                                            {{ team.ranking }}
                                        </strong>
                                        <small class="text-sm italic">Rank</small>
                                    </div>
                                    <img
                                        class="rounded-2xl"
                                        :src="team.avatar ?? '/images/blog/blog3.webp'"
                                        :alt="team.nombre"
                                    />
                                    <h3
                                        class="absolute w-full text-center text-dark-gray bg-gray-800 bg-opacity-90 bottom-0"
                                    >
                                            {{ team.nombre }}
                                    </h3>
                                </RouterLink>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
            <div v-if="jugadoresInscritos.length==0">
                <p class="p-2 text-primary">
                    No tenemos jugadores inscritos en este torneo
                </p>
            </div>
        </div>
    </div>
    <!-- Team Number Section End -->
</template>

<script>

// import Swiper core and required modules
import { Navigation, Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/vue';
import Popper from "vue3-popper";
import { mapGetters, mapActions } from "vuex";

import { ref } from "vue";

// Import Swiper styles
import 'swiper/css/bundle';

export default {
    props: {
        jugadoresInscritos: {
            type: Object,
            required: true
        },
        torneo: {
            type: Object
        },
    },
    components: {
        Swiper,
        SwiperSlide,
        Popper
    },
    computed:{
        ...mapGetters({
            user: 'getUser'
        })
    },
    methods:{
        ...mapActions(["quitarDeTorneo"]),
        salirDeTorneo(userId){
            this.quitarDeTorneo({
                torneo_id: this.torneo.id,
                jugador_id: userId
            }).then(r => {
                console.log('this.inscritos',this.inscritos)
                this.$emit('reload-inscritos')
            })
        },
        showDeleteButton(userId){
            let torneo_por_iniciar = !this.torneo.modo_juego && !this.torneo.n_grupos;

            let user_con_permisos = this.user ? (this.user.player.id == this.torneo.organizador.id || this.user.player.id == userId) : false;

            return torneo_por_iniciar && user_con_permisos
        }
    },
    data() {
        return {
            swiperOption: {
                modules: [Navigation, Pagination],
                slidesPerView: 6,
                spaceBetween: 30,
                loop: true,
                pagination: false,
                navigation: true,
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
        }
    },
    setup(props){
        const inscritos = ref([]);

        inscritos.value = props.jugadoresInscritos;

        console.log('props')
        console.log(props)
        console.log('props.jugadoresInscritos')
        console.log(props.jugadoresInscritos)

        return {
            inscritos
        }
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
</style>