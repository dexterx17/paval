<script>

import Breadcrumb from "@/components/Breadcrumb.vue";
import ClubsBlocks from "@/components/Clubs/ClubsBlocks.vue";
import ClubForm from "@/components/Clubs/ClubForm.vue";

import CounterUp from "@/components/CounterUp.vue";
import Footer from "@/components/Footer.vue";

import { mapGetters } from "vuex";

export default {
    components: {
        Breadcrumb,
        ClubsBlocks,
        CounterUp,
        Footer,
        ClubForm
    },
    data() {
        return {
            BreadcrumbTitle: "Clubs",
            BreadcrumbSubTitle: "Clubs",
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

    <ClubsBlocks />

    <ClubForm v-if="isUserAuth" :paddingTop="paddingTop" />

    <CounterUp />

    <Footer />
</template>
