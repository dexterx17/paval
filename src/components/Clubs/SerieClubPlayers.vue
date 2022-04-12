<template>
    <!-- Team Number Section Start -->
    <div class="my-8">
        <div class="team-one mt-8" v-for="serie in seriesData" :key="serie.id">
            <span class="text-primary text-lg uppercase font-semibold mb-4 block">Serie {{ serie.nombre }}</span>
            <swiper class="swiper" :options="swiperOption">
                <swiper-slide v-for="(team, index) in teamplayers" :key="index">
                    <div class="rounded-50">
                        <div class>
                            <img :src="team.teamImage" alt="Team Image" />
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
    <!-- Team Number Section End -->
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

import { computed, ref, watch } from "vue";
import { useRoute } from 'vue-router'
import { useStore } from "vuex";

export default {
    components: {
        Swiper,
        SwiperSlide
    },
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
    setup(){
        const route = useRoute();
        const store = useStore();
        const seriesData = ref([]);

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

        return {
            seriesData
        };
    }
}

</script>
