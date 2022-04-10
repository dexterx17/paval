<template>
    <div class="container">
        <p class="date text-primary font-bold mb-3 flex justify-between">
            <span>
                <span class="capitalize">{{ formatDate(match.fecha, { weekday: "long" }) }},</span>
                {{ formatDate(match.fecha) }}
                {{ match.hora }}
            </span>
            <span>
                <i class="text-xs"></i>
                <span>{{ match.ciudad }}</span>
                <small class="px-1">{{ match.lugar }}</small>
            </span>
        </p>
        <h2
            class="text-white font-bold uppercase xl:text-title lg:text-5xl md:text-4xl sm:text-3xl text-2xl xl:leading-70 lg:leading-12 leading-10"
        >{{ match.nombre }}</h2>
        <div class="content-details">
            <div class="description mt-6">
                <p class="leading-8">El tiempo de espera es de {{ match.tiempo_espera }} minutos.</p>
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

            <div class="gameslide my-8" v-if="match.imagenes.length > 0">
                <swiper class="swiper" :options="swiperOption">
                    <swiper-slide v-for="(game, imageIndex) in match.imagenes" :key="imageIndex">
                        <div class="relative">
                            <img
                                class="sm:h-full h-64 max-h-[450px] w-full rounded-md object-contain"
                                :src="`${game}`"
                            />                            
                        </div>
                    </swiper-slide>
                </swiper>

                <!-- Testimonial Arrows -->

                <div class="flex mt-4">
                    <div
                        class="gameslide-button-prev swipper-arrow text-white md:w-68 w-55 md:h-55 h-11 bg-cover flex items-center justify-center hover:bg-arrow-hover-shape bg-arrow-shape transition-all z-50 mr-2"
                    >
                        <img class="w-4 h-6" src="/images/icon/navigation-arrow2.webp" alt />
                    </div>
                    <div
                        class="gameslide-button-next swipper-arrow text-white md:w-68 w-55 md:h-55 h-11 flex items-center justify-center hover:bg-arrow-hover-shape bg-arrow-shape bg-cover transition-all z-50 ml-2"
                    >
                        <img class="w-4 h-6" src="/images/icon/navigation-arrow1.webp" alt />
                    </div>
                </div>
            </div>

            
            <ImagenesTorneo v-if="torneoData" :torneo="torneoData" />

        </div>

    </div>
</template>

<script>
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import ImagenesTorneo from "@/components/Torneos/ImagenesTorneo.vue";

export default {
    components: {
        Swiper,
        SwiperSlide,
        Navigation,
        Pagination,

        ImagenesTorneo
    },
    props: ["match"],
    data() {
        return {
            swiperOption: {
                slidesPerView: 1,
                spaceBetween: 30,
                pagination: false,
                navigation: {
                    nextEl: '.gameslide .gameslide-button-next',
                    prevEl: '.gameslide .gameslide-button-prev'
                }
            },
            gameslide: [
                {
                    gamingBg: "/images/others/game-details-thumb.webp"
                },
                {
                    gamingBg: "/images/others/game-details-thumb.webp"
                },
                {
                    gamingBg: "/images/others/game-details-thumb.webp"
                }
            ]
        }
    },
    methods: {
        formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
            if (!value) return value
            return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
        }
    },
}
</script>