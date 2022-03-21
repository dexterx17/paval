<script>
    import { useRouter } from 'vue-router';

    export default {
        data() {
            return {
                error: null
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
    <div>
        Dashboard
        <hr>
        <div v-if="error" class="alert alert-danger">{{error}}</div>

        <button @click="logout">Cerrar sesión</button>
    </div>
</template>