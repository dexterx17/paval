<script>

import Breadcrumb from "@/components/Breadcrumb.vue";
import TorneosBlocks from "@/components/Torneos/TorneosBlocks.vue";
import TorneosRegularesHome from "@/components/TorneosRegularesHome.vue";
import TorneoForm from "@/components/Torneos/TorneoForm.vue";
import Footer from "@/components/Footer.vue";

import { mapGetters } from "vuex";

export default {
    components: {
        Breadcrumb,
        TorneosRegularesHome,
        Footer,
        TorneoForm,
        TorneosBlocks
    },
    data() {
        return {
            BreadcrumbTitle: "Torneos",
            BreadcrumbSubTitle: "Eventos Regulares",
            paddingTop: "pt-8"
        };
    },
    computed: {
        ...mapGetters(["isUserAuth"]),
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

    <!-- <TorneosBlocks /> -->
    <TorneosBlocks />

    <TorneoForm v-if="isUserAuth" :paddingTop="paddingTop" />

    <Footer />
</template>
