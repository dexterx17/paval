<template>
    <div class="container relative" v-if="gameData">
        <!-- Team Varses Team Start -->
        <div class="container mb-12">
            <div class="flex justify-center items-center w-full p-0">
                <img
                    class="lg:mr-9 mr-5 w-24 h-24 rounded-lg border-4 border-light-blue-500"
                    :src="gameData.logo"
                    :alt="gameData.nombre"
                />
            </div>
        </div>
        <!-- Team Varses Team End -->

        <!-- <p class="date text-primary font-bold mb-3">03 January, 2021, 05:01:00 AM</p> -->
        <h2
            class="text-white font-bold uppercase xl:text-title lg:text-5xl md:text-4xl sm:text-3xl text-2xl xl:leading-70 lg:leading-12 leading-10"
        >{{ gameData.nombre }}</h2>
        <div class="content-details">
            <div class="description mt-6">
                <p
                    class="leading-8"
                >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>

            <div class="gameslide my-15">
                <swiper class="swiper" :options="swiperOption">
                    <swiper-slide v-for="(game, imageIndex) in gameslide" :key="imageIndex">
                        <div class="relative">
                            <img
                                class="sm:h-full h-64 w-full object-cover"
                                :src="`${game.gamingBg}`"
                            />
                        </div>
                    </swiper-slide>
                </swiper>

                <!-- Testimonial Arrows -->

                <div class="flex mt-10">
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

            <div class="description mt-6">
                <h3 class="text-2xl text-white uppercase font-bold mb-5">Description:</h3>
                <p
                    class="leading-8"
                >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div class="description mt-6">
                <h3 class="text-2xl text-primary uppercase font-bold mb-5">Whats New!</h3>
                <p
                    class="leading-8"
                >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>

            <blockquote class="py-5 mb-5">
                <p
                    class="font-bold text-yellow italic lg:text-3xl text-xl"
                >Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the 1500 printer took galley of type scrambled it to make a type specimen book.</p>
            </blockquote>

            <div class="additional-information-area bg-secondary-100 px-9 py-9 rounded-2xl mb-9">
                <h3 class="text-2xl text-white uppercase font-bold mb-6">Additional Information:</h3>
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 text-white"
                >
                    <div class="additional_information_text">
                        <h4 class="font-bold mb-5">FUNDACIÓN:</h4>
                        <p class="text-gray-400">{{ gameData.fecha_constitucion }}</p>
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
                <p
                    class="leading-8"
                >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap electro typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
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

// Import Swiper styles
import 'swiper/css/bundle';

export default {
    components: {
        Swiper,
        SwiperSlide,
        Navigation,
        Pagination
    },
    methods: {
        ...mapActions(["fetchClub"]),
    },
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
    setup() {
        const route = useRoute();
        const store = useStore();
        const gameData = ref(null);
        const showModal = ref(false);

        store.dispatch('fetchClub', route.params.id).then((value) => {
            console.log('value');
            console.log(value);
            gameData.value = value;
        });

        // fetch the user information when params change
        watch(
            () => route.params.id,
            async newId => {
                console.log('newId', newId);
                gameData.value = await fetchTorneo(newId)
            }
        )

        return {
            gameData,
            showModal
        }
    }
}
</script>