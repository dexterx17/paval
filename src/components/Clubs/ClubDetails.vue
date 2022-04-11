<template>
    <div class="container relative" v-if="clubData">
        <!-- Team Varses Team Start -->
        <div class="container mb-12">
            <div class="flex justify-center items-center w-full p-0">
                <img class="lg:mr-9 mr-5 w-24 h-24 rounded-lg border-4 border-light-blue-500" :src="clubData.logo"
                    :alt="clubData.nombre" />
            </div>
        </div>
        <!-- Team Varses Team End -->

        <!-- <p class="date text-primary font-bold mb-3">03 January, 2021, 05:01:00 AM</p> -->
        <h2
            class="text-white font-bold uppercase xl:text-title lg:text-5xl md:text-4xl sm:text-3xl text-2xl xl:leading-70 lg:leading-12 leading-10">
            {{ clubData.nombre }}</h2>
        <div class="content-details">
            <div class="description mt-6">
                <p class="leading-8">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a
                    galley of type and scrambled it to make a type specimen book. It has survived not only five
                    centuries, but also the leap electro typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                    more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
                    Ipsum.</p>
            </div>

            <div class="gameslide my-8" v-if="clubData.imagenes.length > 0">
                <swiper class="swiper" :modules="swiperOption.modules" :pagination="{ clickable: true }"
                    :navigation="swiperOption.navigation" :options="swiperOption" @slideChange="onSlideChange">
                    <swiper-slide v-for="(game, imageIndex) in gameslide" :key="imageIndex">
                        <div class="relative">
                            <img class="sm:h-full h-64 w-full object-cover" :src="`${game.gamingBg}`"
                                :alt="clubData.nombre" />
                        </div>
                    </swiper-slide>
                </swiper>

                <!-- Testimonial Arrows -->

                <div class="flex mt-10">
                    <div>
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
                        <Popper v-if="torneo.imagenes.length < 3" hover>
                            <button @click="showImagesUploader = true"
                                class="swipper-arrow align-self-end self-end text-white md:w-68 w-55 md:h-55 h-11 flex items-center justify-center hover:bg-arrow-hover-shape bg-arrow-shape bg-cover transition-all z-50 ml-2">
                                <img class="w-4 h-6" src="/images/icon/facebook-bg.webp" alt="Agregar Imagen Torneo" />
                            </button>
                            <template #content>
                                <div>Agregar Imagen</div>
                            </template>
                        </Popper>

                        <Popper hover>
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

            <ImagenesTorneo v-if="showImagesUploader" :torneo="torneo" @imagen-cargada="imagenCargada" />

            <div class="description mt-6">
                <h3 class="text-2xl text-white uppercase font-bold mb-5">Description:</h3>
                <p class="leading-8">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a
                    galley of type and scrambled it to make a type specimen book. It has survived not only five
                    centuries, but also the leap electro typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                    more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
                    Ipsum.</p>
            </div>
            <div class="description mt-6">
                <h3 class="text-2xl text-primary uppercase font-bold mb-5">Whats New!</h3>
                <p class="leading-8">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a
                    galley of type and scrambled it to make a type specimen book. It has survived not only five
                    centuries, but also the leap electro typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                    more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
                    Ipsum.</p>
            </div>

            <blockquote class="py-5 mb-5">
                <p class="font-bold text-yellow italic lg:text-3xl text-xl">Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry has been the industry's standard dummy text ever since the 1500
                    printer took galley of type scrambled it to make a type specimen book.</p>
            </blockquote>

            <div class="additional-information-area bg-secondary-100 px-9 py-9 rounded-2xl mb-9">
                <h3 class="text-2xl text-white uppercase font-bold mb-6">Additional Information:</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 text-white">
                    <div class="additional_information_text">
                        <h4 class="font-bold mb-5">FUNDACIÓN:</h4>
                        <p class="text-gray-400">{{ clubData.fecha_constitucion }}</p>
                    </div>
                    <div class="additional_information_text">
                        <h4 class="font-bold mb-5">SERIES:</h4>
                        <p class="text-gray-400">0</p>
                    </div>
                    <div class="additional_information_text">
                        <h4 class="font-bold mb-5">MIEMBROS</h4>
                        <p class="text-gray-400">80,000,000+</p>
                    </div>
                    <div class="additional_information_text">
                        <h4 class="font-bold mb-5">TORNEOS:</h4>
                        <p class="text-gray-400">0</p>
                    </div>
                    <div class="additional_information_text">
                        <h4 class="font-bold mb-5">PARTIDOS:</h4>
                        <p class="text-gray-400">0</p>
                    </div>
                </div>
            </div>
            <div class="description mt-6">
                <p class="leading-8">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a
                    galley of type and scrambled it to make a type specimen book. It has survived not only five
                    centuries, but also the leap electro typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                    more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
                    Ipsum.</p>
            </div>
        </div>
    </div>
</template>

<script>

import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { mapGetters, mapActions } from "vuex";

import { computed, ref, watch } from "vue";
import { useRoute } from 'vue-router'
import { useStore } from "vuex";
import Popper from "vue3-popper";

import ImagenesTorneo from "@/components/Torneos/ImagenesTorneo.vue";

// Import Swiper styles
import 'swiper/css/bundle';

export default {
    components: {
        Swiper,
        SwiperSlide,
        Navigation,
        Pagination,
        Popper,

        ImagenesTorneo
    },
    methods: {
        ...mapActions(["fetchClub"]),
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
            console.log(this.clubData.imagenes, this.activeImage);
            let imgURL = this.clubData.imagenes[this.activeImage];
            this.procesando = true;
            this.removeImageClub({
                clubData_id: this.clubData.id,
                imagenURL: imgURL
            }).then((clubData) => {
                this.procesando = false;
                console.log('clubData');
                console.log(clubData);
            })
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
    setup() {
        const route = useRoute();
        const store = useStore();
        const clubData = ref(null);
        const showModal = ref(false);
        const showImagesUploader = ref(false);

        const loadClubData = (clubId) => {
            store.dispatch('fetchClub', clubId).then((value) => {
                console.log('value');
                console.log(value);
                clubData.value = value;
                showImagesUploader.value = clubData.value.imagenes.length == 0;
            });
        }

        loadClubData(route.params.id);


        // fetch the user information when params change
        watch(
            () => route.params.id,
            async newId => {
                console.log('newId', newId);
                loadClubData(newId);
            }
        )

        return {
            clubData,
            showModal,
            showImagesUploader
        }
    }
}
</script>