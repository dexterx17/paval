<script>

import Breadcrumb from "@/components/Breadcrumb.vue";
import Error404 from "@/components/Error404.vue";
import Footer from "@/components/Footer.vue";


export default {
    components: {
        Breadcrumb,
        Error404,
        Footer
    },
    data() {
        return {
            BreadcrumbTitle: "Página No Encontrada",
            BreadcrumbSubTitle: "No Encontrada",
            paddingTop: "pt-8"
        };
    },
};
</script>

<template>
    <Breadcrumb :BreadcrumbTitle="BreadcrumbTitle" :BreadcrumbSubTitle="BreadcrumbSubTitle" />

    <Error404 />

    <Footer />
</template>
