<script>
    import { mapActions } from "vuex";
    import { useRouter } from 'vue-router';

    import Breadcrumb from "@/components/Breadcrumb.vue";

    export default {
        components:{
            Breadcrumb
        },
        data() {
            return {
                error: null,
                BreadcrumbTitle: "Sign Up",
                BreadcrumbSubTitle: "Sign up",
            };
        },
        methods: {
            ...mapActions(["signOutAction"]),
            logout() {
                this.signOutAction();
                this.$router.replace({ name: "home" });
                
            }
        }
    }


</script>
<template>
<Breadcrumb :BreadcrumbTitle="BreadcrumbTitle" :BreadcrumbSubTitle="BreadcrumbSubTitle"/>
    <div>
        Dashboard
        <hr>
        <div v-if="error" class="alert alert-danger">{{error}}</div>

        <button @click="logout">Cerrar sesión</button>
    </div>
</template>