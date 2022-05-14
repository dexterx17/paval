<script>

import Breadcrumb from "@/components/Breadcrumb.vue";
import SerieForm from "@/components/Clubs/SerieForm.vue";
import SerieClubPlayers from "@/components/Clubs/SerieClubPlayers.vue";
import ClubDetails from "@/components/Clubs/ClubDetails.vue";

import CounterUp from "@/components/CounterUp.vue";
import Footer from "@/components/Footer.vue";

import { computed, ref, watch } from "vue";
import { useRoute } from 'vue-router'
import { useStore, mapGetters } from "vuex";


export default {
    components: {
        Breadcrumb,
        ClubDetails,
        CounterUp,
        Footer,
        SerieForm,
        SerieClubPlayers
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
    computed: {
        ...mapGetters(["isUserAuth"]),
    },
    setup() {
        const route = useRoute();
        const store = useStore();
        const clubData = ref(null);
        const showModal = ref(false);

        const loadClubData = (clubId) => {
            store.dispatch('fetchClub', clubId).then((value) => {
                console.log('value');
                console.log(value);
                clubData.value = value;
            });
        }

        loadClubData(route.params.id);


        // fetch the user information when params change
        watch(
            () => route.params.id,
            async newId => {
                console.log('newId', newId);
                loadClubData(newId);
            }
        )

        return {
            clubData,
            showModal,
        }
    }
};
</script>
<template>
    <Breadcrumb :BreadcrumbTitle="BreadcrumbTitle" :BreadcrumbSubTitle="BreadcrumbSubTitle" />

    <ClubDetails v-if="clubData" :club="clubData" />

    <div class="container">
        <SerieClubPlayers />
    </div>

    <div v-if="clubData">
        <SerieForm v-if="clubData.total_series < 3" :paddingTop="paddingTop" />
    </div>

    <Footer />
</template>