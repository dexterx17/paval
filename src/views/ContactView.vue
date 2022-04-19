<script>

import Breadcrumb from "@/components/Breadcrumb.vue";
import ContactDetails from "@/components/Contact/ContactDetails.vue";
import ContactForm from "@/components/Contact/ContactForm.vue";
import GoogleMaps from "@/components/Contact/GoogleMaps.vue";
import Footer from "@/components/Footer.vue";


export default {
    components: {
        Breadcrumb,
        ContactDetails,
        ContactForm,
        GoogleMaps,
        Footer
    },
    data() {
        return {
            BreadcrumbTitle: "Contáctanos",
            BreadcrumbSubTitle: "Contactos",
            paddingTop: "pt-8"
        };
    },
};
</script>

<template>
    <Breadcrumb :BreadcrumbTitle="BreadcrumbTitle" :BreadcrumbSubTitle="BreadcrumbSubTitle" />

    <ContactDetails />

    <ContactForm />

    <GoogleMaps />

    <Footer />
</template>
