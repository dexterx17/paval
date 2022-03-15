<script>
    import { useRouter } from 'vue-router';
    import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

    export default {
        setup(){
            const authInstance = getAuth();
            const router = useRouter();

            onAuthStateChanged(authInstance, _user => {
                if (!_user) {
                    router.replace({ name: "login" });
                }
            });
        },
        data() {
            return {
                error: null
            };
        },
        methods: {
            logout() {
                const auth = getAuth();
                signOut(auth).then(() => {
                // Sign-out successful.
                this.$router.replace({ name: "home" });
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    this.error = err.message;
                });
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