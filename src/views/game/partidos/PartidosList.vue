<script>

import Breadcrumb from "@/components/Breadcrumb.vue";
import PartidosBlocks from "@/components/Partidos/PartidosBlocks.vue";
// import ClubForm from "@/components/Clubs/ClubForm.vue";


import Footer from "@/components/Footer.vue";


export default {
    components: {
        Breadcrumb,
        PartidosBlocks,
        Footer,
    },
    data() {
        return {
            BreadcrumbTitle: "Partidos",
            BreadcrumbSubTitle: "Partidos",
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

    <PartidosBlocks />

    <!-- <ClubForm :paddingTop="paddingTop" /> -->

    

    <Footer />
</template>
