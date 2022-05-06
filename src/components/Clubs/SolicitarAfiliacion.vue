<script>
import { mapGetters, mapActions } from "vuex";
import { computed } from 'vue';
export default {
    data() {
        return {
            procesando: false
        }
    },
    props: ["club"],
    methods: {
        ...mapActions(["solicitarAfiliacion"]),
        formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
            if (!value) return value
            return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
        },
        submit() {
            const user = computed(() => this.$store.getters["getUser"]);
            console.log('user', user.value)
            console.log('nombre', user.value.player.nombre)
            console.log('avatar', user.value.player.avatar)
            this.procesando = true;
            this.solicitarAfiliacion({
                club: this.club,
                jugador: {
                    jugador_id: user.value.player.id,
                    nombre: user.value.player.nombre,
                    avatar: user.value.player.avatar,
                    aprobado: false,
                    fecha: new Date()
                },
            }).then((inscrito) => {
                this.procesando = false;
                console.log('inscrito');
                console.log(inscrito);
                if (inscrito.id) {
                    this.$emit('hide-modal')
                }
            })
        }
    },

}
</script>
<template>
    <div>
        <form
            @submit.prevent="submit"
            id="contact-form"
            class="grid sm:gap-x-8 gap-x-4 grid-cols-2"
        >
            <div class="col-span-2">
                <h2
                    class="text-white text-center font-bold uppercase xl:text-xl lg:leading-12 leading-10"
                >{{ club.nombre }}</h2>
                <address class="my-2">
                    <i class="text-sm text-primary">Fecha:</i>
                    <span class="px-2">
                        <span class="uppercase">{{ formatDate(club.fecha, { weekday: "long" }) }},</span>
                        {{ formatDate(club.fecha) }}
                        <strong>{{ club.hora }}</strong>
                    </span>
                </address>
                <address class="my-2">
                    <i class="text-sm text-primary">Hora:</i>
                    <span class="px-2">
                        <strong>{{ club.hora }}</strong>
                        <small class="pl-4">Tiempo espera: {{ club.tiempo_espera }} minutos</small>
                    </span>
                </address>
                <address class="my-2">
                    <i class="text-sm text-primary">Ubicación:</i>
                    <span class="px-2">
                        {{ club.ciudad }}
                        <strong>{{ club.lugar }}</strong>
                    </span>
                </address>
            </div>
            <div class="single-fild col-span-2">
                <div v-if="procesando" class="flex justify-center w-full">
                    <h3 class="text-primary">Procesando...</h3>
                </div>
                <div v-else class="form-btn-wrap flex justify-center w-full mt-4">
                    <button
                        type="submit"
                        value="submit"
                        name="submit"
                        class="form-btn group primary-btn opacity-100 transition-all uppercase w-auto bg-cover px-2"
                        style="background-image:url(/images/others/button2.png)"
                    >
                        SOLICITAR AFILIACIÓN
                        <img
                            src="/images/icon/arrrow-icon.webp"
                            alt="Arrow Icon"
                            class="ml-3 w-5 h-5 group-hover:ml-4 transition-all"
                        />
                    </button>
                    <p class="form-messege"></p>
                </div>
            </div>
        </form>
    </div>
</template>

<style>
.modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-content {
    position: relative;
    width: 50%;
    max-height: 300px;
    padding: 16px;
    overflow: auto;
    background-color: rgb(83,87,90);
    border-radius: 4px;
}
.modal-close {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    margin: 8px 8px 0 0;
    cursor: pointer;
}
.modal-close::hover {
    color: gray;
}
</style>