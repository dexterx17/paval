<template>
    <div class="mr-8">
        <FooterWidgetTitle :title="title" />

        <div class="grid grid-cols-3 sm:grid-cols-3 gap-3">
            <RouterLink v-for="(match, index) in matches" :key="index" to="/player">
                <img :src="`${match.gamingBg}`" :alt="match.gamingAlt" />
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
            title: "Ganadores de Hoy",
            matches: [
                {
                    gamingBg: "/images/others/winners1.webp",
                    gamingAlt: "Winner"
                },
                {
                    gamingBg: "/images/others/winners2.webp",
                    gamingAlt: "Winner"
                },
                {
                    gamingBg: "/images/others/winners3.webp",
                    gamingAlt: "Winner"
                },
                {
                    gamingBg: "/images/others/winners4.webp",
                    gamingAlt: "Winner"
                },
                {
                    gamingBg: "/images/others/winners5.webp",
                    gamingAlt: "Winner"
                },
                {
                    gamingBg: "/images/others/winners6.webp",
                    gamingAlt: "Winner"
                }
            ]
        }
    },
}
</script>