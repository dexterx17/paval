<template>
    <div class="mr-8">
        <FooterWidgetTitle :title="title" />

        <div class="grid grid-cols-3 sm:grid-cols-3 gap-3">
            <RouterLink v-for="(match, index) in matches" :key="index" :to="match.url" class="flex justify-center">
                <img :class="match.class" :src="`${match.gamingBg}`" :alt="match.gamingAlt" />
            </RouterLink>
        </div>
    </div>
</template>
<script>
import FooterWidgetTitle from '@/components/Footer/FooterWidgetTitle.vue';

export default {
    components: {
        FooterWidgetTitle,
    },
    data() {
        return {
            title: "Auspiciantes",
            matches: [
                {
                    gamingBg: "/images/others/logo_simple_color.png",
                    gamingAlt: "SANTANA estudio",
                    class: 'w-24',
                    url: '/'
                },
                {
                    gamingBg: "/images/others/paval.jpg",
                    gamingAlt: "PAVAL Ping Pong Club",
                    class: 'w-16 mx-auto pl-2',
                    url: '/club/oL8oMhB6NMnkwzSnwIPq'
                },
                {
                    gamingBg: "/images/others/winners3.webp",
                    gamingAlt: "Winner",
                    class: '',
                    url: '/player'
                },
                {
                    gamingBg: "/images/others/winners4.webp",
                    gamingAlt: "Winner",
                    class: '',
                    url: '/player'
                },
                {
                    gamingBg: "/images/others/winners5.webp",
                    gamingAlt: "Winner",
                    class: '',
                    url: '/player'
                },
                {
                    gamingBg: "/images/others/winners6.webp",
                    gamingAlt: "Winner",
                    class: '',
                    url: '/player'
                }
            ]
        }
    },
}
</script>