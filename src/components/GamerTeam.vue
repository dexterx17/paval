<template>
    <!-- Blog Post Section Start -->
    <div class="container pt-32">

        <!-- Title Section Start -->
        <TitleSection :title="title" :text="text"/>
        <!-- Title Section End -->
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div class="relative group w-300 sm:w-full mx-auto" v-for="(service, index) in services" :key="index">
                <div class="flex justify-center">
                    <img :src="service.imgSrc" :alt="service.alt">
                </div>
                <div class="flex flex-col justify-center items-center absolute bottom-0 left-0 right-0 bg-team-shape bg-cover h-24 sm:h-20 md:h-28 lg:h-24 xl:h-32 2xl:h-32 group-hover:bg-team-hover-shape hover:transition-all">
                    <h3 class="text-white font-bold text-lg md:text-2xl uppercase mb-2 xl:mb-4 leading-tight">{{service.name}}</h3>
                    <span class="text-primary text-sm md:text-base group-hover:text-white transition-all">{{service.subtitle}}</span>
                </div>
            </div>
        </div>

    </div>
    <!-- Blog Post Section End -->
</template>

<script>
    import TitleSection from '@/components/Title/TitleSection.vue';

    export default {
        components: {
            TitleSection
        },
        data() {
            return {
                title: "Conoce al Equipo de Desarrollo",
                text: "Queremos ofrecerte la mejor plataforma para que registres todos tus partidos de Tenis de Mesa",
                services: [
                    {
                        imgSrc: "/images/others/logo_simple_color.png",
                        alt: "Santana estudio",
                        name: "Santana estudio",
                        subtitle: "Desarrollo",
                    },
                    {
                        imgSrc: "/images/others/paval.jpg",
                        alt: "Club PAVAL",
                        name: "Club PAVAL",
                        subtitle: "Know-How",
                    },
                    {
                        imgSrc: "/images/others/team3.webp",
                        alt: "...",
                        name: "...",
                        subtitle: "Inversión"
                    }
                ]
            }
        }
    }
</script>