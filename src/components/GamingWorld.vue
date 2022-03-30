<template>
    <!-- Gaming World Section Start -->
    <div class="lg:mb-32 md:mb-20 mb-15">
        <div class="container">
            <TitleSection :title="title" />
        </div>
        <div class="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div
                class="text-white text-center align-cener bg-no-repeat bg-scroll bg-center bg-cover md:pt-14 md:pb-12 md:px-12 sm:py-14 sm:px-6 py-14 px-10 h-460"
                :style="{ backgroundImage: `url(${service.videoBannerBg})` }"
                v-for="(service, index) in services"
                :key="index"
            >
                <div class="mb-12 text-center align-center">
                    <img class="h-37 w-36" :src="service.imgSrc" :alt="service.name" />
                </div>
                <div class="block">
                    <h3
                        class="text-white font-exo text-xl md:text-2xl font-bold uppercase mb-4"
                    >{{ service.live }}</h3>
                    <p class>{{ service.text }}</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Gaming World Section End -->
</template>

<script>
import TitleSection from '@/components/Title/TitleSection.vue';
export default {
    components: {
        TitleSection,
    },
    data() {
        return {
            title: "Cada día eres mejor que ayer",
            services: [
                {
                    imgSrc: "/images/others/gaming-world1.webp",
                    name: "Service Image",
                    live: "Clubs",
                    text: "Únete a un club para que puedas desarrollar tus habilidades",
                    videoBannerBg: "/images/others/gaming-world-bg1.webp"
                },
                {
                    imgSrc: "/images/others/gaming-world2.webp",
                    name: "Service Image",
                    live: "Series",
                    text: "Acumula puntos y avanza en las series A, B, o C de acuerdo a tu destreza",
                    videoBannerBg: "/images/others/gaming-world-bg2.webp"
                },
                {
                    imgSrc: "/images/others/gaming-world3.webp",
                    name: "Service Image",
                    live: "Torneos",
                    text: "Cada Serie realiza torneos 2 veces por semana, en los que te puedes participar",
                    videoBannerBg: "/images/others/gaming-world-bg3.webp"
                },
            ]
        }
    },
}
</script>