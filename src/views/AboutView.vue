<script>

import Breadcrumb from "@/components/Breadcrumb.vue";

import AboutUs from "@/components/AboutUs.vue";
import CounterUp from "@/components/CounterUp.vue";
import GamerTeam from "@/components/GamerTeam.vue";

import Footer from "@/components/Footer.vue";


export default {
    components: {
        Breadcrumb,
        AboutUs,
        Footer,
        GamerTeam,
        CounterUp
    },
    data() {
        return {
            BreadcrumbTitle: "Ping Pong Rank",
            BreadcrumbSubTitle: "Nosotros",
            paddingTop: "pt-8"
        };
    },
    methods: {
        formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
            if (!value) return value
            return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
        }
    },
};
</script>

<template>
    <Breadcrumb :BreadcrumbTitle="BreadcrumbTitle" :BreadcrumbSubTitle="BreadcrumbSubTitle" />

    <AboutUs />

    <CounterUp/>
    
    <GamerTeam/>

    <Footer />
</template>
