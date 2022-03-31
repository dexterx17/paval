<template>
    <!-- CounterUp Section Start -->
    <div class="container mt-32 pb-32">
        <div v-observe-visibility="{ callback: visibilityChanged, once: true }">
            <div v-if="commentsVisible" class="grid md:grid-cols-4 grid-cols-2 gap-9">
                <div
                    v-for="(count, imageIndex) in counter"
                    :key="imageIndex"
                    class="text-white text-center"
                >
                    <count-to
                        class="text-white text-5xl lg:text-10xl uppercase font-metal font-normal block"
                        :class="count.className"
                        :startVal="count.startVal"
                        :endVal="count.endVal"
                        :duration="3000"
                        :autoplay="true"
                    ></count-to>
                    <p class="uppercase mt-3 sm:mt-5 text-base lg:text-lg">{{ count.text }}</p>
                </div>
            </div>
        </div>
    </div>
    <!-- CounterUp Section End -->
</template>

<script>
import { CountTo } from 'vue3-count-to';

export default {
    components: {
        CountTo
    },
    data() {
        return {
            commentsVisible: true,
            counter: [
                {
                    startVal: 0,
                    endVal: 8697,
                    className: "text-yellow",
                    text: "Torneos"
                },
                {
                    startVal: 0,
                    endVal: 480,
                    className: "text-bright",
                    text: "Partidos"
                },
                {
                    startVal: 0,
                    endVal: 5367,
                    className: "text-punch",
                    text: "Jugadores"
                },
                {
                    startVal: 0,
                    endVal: 249,
                    className: "text-primary",
                    text: "Clubs"
                }
            ]
        }
    },
    methods: {
        visibilityChanged(isVisible) {
            console.log('visible', isVisible);
            this.commentsVisible = isVisible;
        },
    }
}
</script>