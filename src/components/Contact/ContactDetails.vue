<template>
    <!-- Contact Details Start -->
    <div class="lg:mb-32 md:mb-20 mb-15">
        <div class="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div class="text-white align-cener bg-no-repeat bg-scroll bg-center bg-cover md:pt-14 md:pb-12 md:px-12 sm:py-14 sm:px-6 py-14 px-10 h-460 pl-15" :style="{backgroundImage: `url(${ service.videoBannerBg })`}" v-for="(service, index) in services" :key="index">
                <div class="mb-120 align-center" :class="service.imageposition">
                    <img :src="service.imgSrc" :alt="service.name">
                </div>
                <div class="block" :class="service.contentposition">
                    <h3 class="text-white font-exo text-xl md:text-3xl font-bold uppercase mb-4">{{service.live}}</h3>
                    <span class="text-white">
                        <p class="text-lg leading-9">{{service.text}}</p>
                        <a :href="service.linkOnehref" class="block mb-2 last:mb-0 text-lg transition-all hover:text-primary">{{service.linkOne}}</a>
                        <a :href="service.linkTwohref" class="block mb-2 last:mb-0 text-lg transition-all hover:text-primary">{{service.linkTwo}}</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <!-- Contact Details End -->
</template>

<script>
    export default {
        data() {
            return {
                services: [
                    {
                        imgSrc: "/images/icon/email.webp",
                        name: "Service Image",
                        live: "Email:",
                        videoBannerBg: "/images/others/gaming-world-bg1.webp",
                        imageposition: "text-left",
                        contentposition: "text-left",
                        linkOnehref: "mailto:sistemas@santana.ec",
                        linkOne: "sistemas@santana.ec",
                        linkTwohref: "mailto:soporte@santana.ec",
                        linkTwo: "soporte@santana.ec"

                    },
                    {
                        imgSrc: "/images/icon/location.webp",
                        name: "Service Image",
                        live: "Ubicación:",
                        videoBannerBg: "/images/others/gaming-world-bg2.webp",
                        text: "Ambato - Tungurahua, Quito 04-55 y Cevallos",
                        imageposition: "text-center",
                        contentposition: "text-center"
                    },
                    {
                        imgSrc: "/images/icon/phone.webp",
                        name: "Service Image",
                        live: "Teléfonos:",
                        videoBannerBg: "/images/others/gaming-world-bg3.webp",
                        imageposition: "text-right",
                        contentposition: "text-right",
                        linkOnehref: "mailto:(593)983706086",
                        linkOne: "(593) 983706086",
                        linkTwohref: "",
                        linkTwo: ""
                    }
                ]
            }
        },
    }
</script>