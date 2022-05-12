<template>
    <div class="container relative" v-if="club">
        <!-- Team Varses Team Start -->
        <div class="container mb-12">
            <div class="flex justify-center items-center w-full p-0">
                <img class="lg:mr-9 mr-5 w-24 h-24 rounded-lg border-4 border-light-blue-500" :src="club.logo"
                    :alt="club.nombre" />
                    <button
                        v-if="isUserAuth && isClubAdmin"
                        @click="showModalAdministradores = true"
                        class="group primary-btn opacity-100 transition-all w-auto px-2 bg-cover"
                        style="background-image:url(/images/others/button2.png);"
                    >
                        Admins
                        <img
                            src="/images/icon/arrrow-icon.webp"
                            alt="Arrow Icon"
                            class="ml-3 w-5 h-5 group-hover:ml-4 transition-all"
                        />
                    </button>
            </div>
        </div>
        <!-- Team Varses Team End -->

        <vue-final-modal  v-if="isUserAuth" class="bg-transparent" name="modal-retar" classes="modal-container " content-class="modal-content"
            v-model="showModalAdministradores" :width="1000" :height="700" :adaptive="true">
            <AdministradoresClub :club="club" @hide-modal="showModalAdministradores = false" />
            <button
                class="absolute top-0 right-0 icofont-close-line z-999 font-bold text-3xl text-white hover:text-primary transition-all transform hover:rotate-90"
                @click="showModalAdministradores = false"></button>
        </vue-final-modal>


        <!-- <p class="date text-primary font-bold mb-3">03 January, 2021, 05:01:00 AM</p> -->

        <h2
            class="text-white font-bold uppercase xl:text-title lg:text-5xl md:text-4xl sm:text-3xl text-2xl xl:leading-70 lg:leading-12 leading-10">
            {{ club.nombre }}</h2>
        
        <div class="flex justify-center items-center">
            <p class="px-2 pt-5">Que esperas para unirte?</p>
            <div class="about_btn"  v-if="isUserAuth">
                <vue-final-modal  class="bg-transparent" name="modal-retar" classes="modal-container " content-class="modal-content"
                v-model="showModalSolicitarAfiliacion" :width="1000" :height="700" :adaptive="true">
                <SolicitarAfiliacion :club="club" @hide-modal="showModalSolicitarAfiliacion = false" />
                <button
                    class="absolute top-0 right-0 icofont-close-line z-999 font-bold text-3xl text-white hover:text-primary transition-all transform hover:rotate-90"
                    @click="showModalSolicitarAfiliacion = false"></button>
                </vue-final-modal>
                <button
                    @click="showModalSolicitarAfiliacion = true"
                    class="group primary-btn opacity-100 transition-all w-auto px-2 bg-cover"
                    style="background-image:url(/images/others/button2.png);"
                >
                    Solicitar Afiliación
                    <img
                        src="/images/icon/arrrow-icon.webp"
                        alt="Arrow Icon"
                        class="ml-3 w-5 h-5 group-hover:ml-4 transition-all"
                    />
                </button>
            </div>
            <RouterLink class="text-primary font-extrabold hover:text-rojo-claro" to="/register" v-else>Regístrate</RouterLink>
        </div>

        <SolicitudesPendientes :club="club" v-if="isUserAuth && isClubAdmin" />

        <div class="content-details">
            <div class="description mt-6">
                <p class="leading-8">{{ club.historia }}</p>
            </div>

            <div class="gameslide my-8" v-if="club.imagenes.length > 0">
                <swiper class="swiper" :modules="swiperOption.modules" :pagination="{ clickable: true }"
                    :navigation="swiperOption.navigation" :options="swiperOption" @slideChange="onSlideChange">
                    <swiper-slide v-for="(game, imageIndex) in club.imagenes" :key="imageIndex">
                        <div class="relative">
                            <img class="sm:h-full h-64 w-full object-cover" :src="`${game}`"
                                :alt="club.nombre" />
                        </div>
                    </swiper-slide>
                </swiper>

                <!-- Testimonial Arrows -->

                <div class="flex  justify-between mt-4">
                    <div class="flex">
                        <div
                            class="gameslide-button-prev swipper-arrow text-white md:w-68 w-55 md:h-55 h-11 bg-cover flex items-center justify-center hover:bg-arrow-hover-shape bg-arrow-shape transition-all z-50 mr-2">
                            <img class="w-4 h-6" src="/images/icon/navigation-arrow2.webp" alt />
                        </div>
                        <div
                            class="gameslide-button-next swipper-arrow text-white md:w-68 w-55 md:h-55 h-11 flex items-center justify-center hover:bg-arrow-hover-shape bg-arrow-shape bg-cover transition-all z-50 ml-2">
                            <img class="w-4 h-6" src="/images/icon/navigation-arrow1.webp" alt />
                        </div>
                    </div>
                    <div>
                        <Popper v-if="club.imagenes.length < 3" hover>
                            <button @click="showImagesUploader = true"
                                class="swipper-arrow align-self-end self-end text-white md:w-68 w-55 md:h-55 h-11 flex items-center justify-center hover:bg-arrow-hover-shape bg-arrow-shape bg-cover transition-all z-50 ml-2">
                                <img class="w-4 h-6" src="/images/icon/facebook-bg.webp" alt="Agregar Imagen Torneo" />
                            </button>
                            <template #content>
                                <div>Agregar Imagen</div>
                            </template>
                        </Popper>

                        <Popper v-if="isUserAuth && isClubAdmin" hover>
                            <button @click="eliminarImagen()"
                                class="swipper-arrow align-self-end self-end text-white md:w-68 w-55 md:h-55 h-11 flex items-center justify-center hover:bg-arrow-hover-shape bg-arrow-shape bg-cover transition-all z-50 ml-2">
                                <img class="w-4 h-6" src="/images/icon/dribble.webp" alt="Eliminar" />
                            </button>
                            <template #content>
                                <div>Eliminar Imagen</div>
                            </template>
                        </Popper>
                    </div>
                </div>
            </div>

            <ImagenesClub v-if="showImagesUploader" :club="club" @imagen-cargada="imagenCargada" />

            <div class="description mt-6">
                <h3 class="text-2xl text-white uppercase font-bold mb-5">Calendario Interno:</h3>
                <p class="leading-8">Es el calendario del torneo interno permanente, práctica y
entrenamiento del Club de Tenis de Mesa PAVAL. El calendario puede ser cambiado en cualquier momento del
año dependiendo de las necesidades del club y de los jugadores. El torneo interno del club se jugará en dos fechas por semana, una fecha para torneo por equipos y otra para individuales por categorías:</p>
            </div>
            
            <blockquote class="py-5 mb-5">
                <p class="font-bold text-yellow italic lg:text-3xl text-xl">
                    <ul class="font-bold text-yellow italic lg:text-3xl text-xl">
                        <li>Lunes: 19h30 CATEGORÍA B </li>
                        <li>Martes: 19H00 CATEGORIA C</li>
                        <li>Jueves: 19h00 CATEGORÍA A</li>
                        <li>Sábado: 14h00 TODAS LAS CATEGORÍAS</li>
                    </ul>
                </p>
            </blockquote>

            <div class="description mt-6">
                <h3 class="text-2xl text-primary uppercase font-bold mb-5">El torneo interno podrá suspenderse por</h3>
                <p class="leading-8">
                    <ol>
                        <li>1. Participaciones externas con otros clubes</li>
                        <li>2. Por no disponibilidad de mesas</li>
                        <li>3. Por no completar el mínimo de jugadores requerido.</li>
                        <li>4. Ó por resolución de Directorio, lo cual será comunicado en el grupo del whatsapp con la debida antelación.</li>
                    </ol>
                </p>
            </div>


            <div class="additional-information-area bg-secondary-100 px-9 py-9 rounded-2xl mb-9">
                <h3 class="text-2xl text-white uppercase font-bold mb-6">Additional Information:</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 text-white">
                    <div class="additional_information_text">
                        <h4 class="font-bold mb-5">FUNDACIÓN:</h4>
                        <p class="text-gray-400">{{ club.fecha_constitucion }}</p>
                    </div>
                    <div class="additional_information_text">
                        <h4 class="font-bold mb-5">SERIES:</h4>
                        <p class="text-gray-400">{{ club.total_series }}</p>
                    </div>
                    <div class="additional_information_text">
                        <h4 class="font-bold mb-5">TORNEOS:</h4>
                        <p class="text-gray-400">{{ club.total_torneos }}</p>
                    </div>
                    <div class="additional_information_text">
                        <h4 class="font-bold mb-5">MIEMBROS</h4>
                        <p class="text-gray-400">{{ club.total_miembros }}</p>
                    </div>
                    <div class="additional_information_text">
                        <h4 class="font-bold mb-5">PARTIDOS:</h4>
                        <p class="text-gray-400">{{ club.total_partidos }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { mapGetters, mapActions } from "vuex";

import { $vfm, VueFinalModal } from 'vue-final-modal'

import { computed, ref, watch } from "vue";
import { useRoute } from 'vue-router'
import Popper from "vue3-popper";

import ImagenesClub from "@/components/Clubs/ImagenesClub.vue";
import SolicitarAfiliacion from "@/components/Clubs/SolicitarAfiliacion.vue";
import AdministradoresClub from "@/components/Clubs/AdministradoresClub.vue";
import SolicitudesPendientes from "@/components/Clubs/SolicitudesPendientes.vue";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Import Swiper styles
import 'swiper/css/bundle';

export default {
    components: {
        Swiper,
        SwiperSlide,
        Navigation,
        Pagination,
        Popper,

        ImagenesClub,
        SolicitarAfiliacion,
        SolicitudesPendientes,
        AdministradoresClub,
        VueFinalModal
    },
    props:['club'],
    methods: {
        ...mapActions(["fetchClub","removeImageClub"]),
        onSlideChange(slide) {
            console.log('slide');
            console.log(slide);
            console.log(slide.activeIndex);
            this.activeImage = slide.activeIndex;
        },
        imagenCargada(response) {
            this.showImagesUploader = false;
        },
        eliminarImagen() {
            console.log(this.club.imagenes, this.activeImage);
            Swal.fire({
                title: 'Estás seguro?',
                text: "Quieres borrar esta imagen?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrarla!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    let imgURL = this.club.imagenes[this.activeImage];
                    this.procesando = true;
                    this.removeImageClub({
                        club_id: this.club.id,
                        imagenURL: imgURL
                    }).then((club) => {
                        this.procesando = false;
                        console.log('club');
                        console.log(club);
                        Swal.fire(
                            'Borrada!',
                            'La imagen ha sido borrada.',
                            'success'
                        )
                        this.$emit('imagen-cargada', club);
                    })
                }
            })
        }
    },
    computed: {
        ...mapGetters(["isUserAuth", "getUser"]),
        isClubAdmin(){
            return this.club.administradores.includes(this.getUser.player.id);
        }
    },
    data() {
        return {
            swiperOption: {
                slidesPerView: 1,
                spaceBetween: 30,
                pagination: true,
                navigation: {
                    nextEl: '.gameslide .gameslide-button-next',
                    prevEl: '.gameslide .gameslide-button-prev'
                },
                modules: [Navigation, Pagination],
            },
            activeImage: 0,
            procesando: false,
        }
    },
    setup(props) {
        const showImagesUploader = ref(false);
        const showModalSolicitarAfiliacion = ref(false);
        const showModalAdministradores = ref(false);

        showImagesUploader.value = props.club.imagenes.length == 0;

        return {
            showImagesUploader,
            showModalSolicitarAfiliacion,
            showModalAdministradores
        }
    }
}
</script>