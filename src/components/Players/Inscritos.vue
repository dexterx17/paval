
<template>
    <!-- Team Number Section Start -->
    <div class="my-16">
        <div class="team-one">
            <span class="text-primary text-lg uppercase font-semibold mb-4 block">Team - 01</span>
            <h2 class="font-bold uppercase text-xl md:text-4xl mb-8">Jugadores Inscritos</h2>
            <swiper class="swiper" :options="swiperOption">
                <swiper-slide v-for="(team, index) in jugadoresInscritos" :key="index">
                    <div class="rounded-50">
                        <div class>
                            <img :src="team.avatar" :alt="team.nombre" />
                            <h3 class="absolute w-full text-center text-white  bg-gray-800 bg-opacity-90 bottom-0">{{ team.nombre }}</h3>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
    <!-- Team Number Section End -->
</template>

<script>

// import Swiper core and required modules
import { Navigation, Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css/bundle';

export default {
    props:{
        jugadoresInscritos:{
            type: Object
        }
    },
    components: {
        Swiper,
        SwiperSlide,
        Navigation,
        Pagination
    },
    data() {
        return {
            swiperOption: {
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