<script>

import Breadcrumb from "@/components/Breadcrumb.vue";
import SerieForm from "@/components/Clubs/SerieForm.vue";
import ClubDetails from "@/components/Clubs/ClubDetails.vue";

import CounterUp from "@/components/CounterUp.vue";
import Footer from "@/components/Footer.vue";


export default {
    components: {
        Breadcrumb,
        ClubDetails,
        CounterUp,
        Footer,
        SerieForm
    },
    data() {
        return {
            BreadcrumbTitle: "Detalles Club",
            BreadcrumbSubTitle: "Club",
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

    <ClubDetails />

    <SerieForm :paddingTop="paddingTop" />

    <Footer />
</template>