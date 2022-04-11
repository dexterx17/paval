<template>
    <div class="container">
        <p class="date text-primary font-bold mb-3 flex justify-between">
            <span>
                <span class="capitalize">{{ formatDate(torneo.fecha, { weekday: "long" }) }},</span>
                {{ formatDate(torneo.fecha) }}
                {{ torneo.hora }}
            </span>
            <span>
                <i class="text-xs"></i>
                <span>{{ torneo.ciudad }}</span>
                <small class="px-1">{{ torneo.lugar }}</small>
            </span>
        </p>
        <h2
            class="text-white font-bold uppercase xl:text-title lg:text-5xl md:text-4xl sm:text-3xl text-2xl xl:leading-70 lg:leading-12 leading-10">
            {{ torneo.nombre }}</h2>
        <div class="content-details">
            <div class="description mt-6">
                <p class="leading-8">El tiempo de espera es de {{ torneo.tiempo_espera }} minutos.</p>
            </div>
            <!-- <blockquote class="py-5 mb-5">
                <p class="font-bold text-yellow italic lg:text-3xl text-xl">
                    El ganador de cada partido será el mejor en
                    3 de 5 set.
                </p>
            </blockquote> -->
            <div class="description mt-6">
                <p class="leading-8"></p>
            </div>

            <div class="gameslide my-8" v-if="torneo.imagenes.length > 0">
                <swiper class="swiper" :modules="swiperOption.modules" :pagination="{ clickable: true }"
                    :navigation="swiperOption.navigation" :options="swiperOption" @slideChange="onSlideChange">
                    <swiper-slide v-for="(game, imageIndex) in torneo.imagenes" :key="imageIndex">
                        <div class="relative">
                            <img class="sm:h-full h-64 max-h-[450px] w-full rounded-md object-contain" :src="`${game}`"
                                :alt="clubData.nombre" />
                        </div>
                    </swiper-slide>
                </swiper>

                <!-- Testimonial Arrows -->

                <div class="flex justify-between mt-4">
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

        </div>

    </div>
</template>

<script>
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { mapGetters, mapActions } from "vuex";
import ImagenesTorneo from "@/components/Torneos/ImagenesTorneo.vue";
import Popper from "vue3-popper";

export default {
    components: {
        Swiper,
        SwiperSlide,
        Popper,

        ImagenesTorneo
    },
    props: ["torneo"],
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
            showImagesUploader: this.torneo.imagenes.length == 0
        }
    },
    methods: {
        ...mapActions(['removeImageTorneo']),
        formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
            if (!value) return value
            return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
        },
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
            console.log(this.torneo.imagenes, this.activeImage);
            let imgURL = this.torneo.imagenes[this.activeImage];
            this.procesando = true;
            this.removeImageTorneo({
                torneo_id: this.torneo.id,
                imagenURL: imgURL
            }).then((torneo) => {
                this.procesando = false;
                console.log('torneo');
                console.log(torneo);

                // if (torneo.id) {
                // this.$emit('hide-modal')
                // }
            })
        }
    },
}
</script>

<style>
:root {
    --popper-theme-background-color: #281d59;
    --popper-theme-background-color-hover: #b154f0;
    --popper-theme-text-color: #ffffff;
    --popper-theme-border-width: 0px;
    --popper-theme-border-style: solid;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 20px;
    --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>