<script>
import { mapGetters, mapActions } from "vuex";
import user from "../../../vue-firebase-esencial/src/store/user";

export default {
    props: ["torneo"],
    methods: {
        ...mapActions(["inscribirEnTorneo"]),
        formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
            if (!value) return value
            return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
        },
        inscribirme(){
            this.inscribirEnTorneo({
                torneo: this.torneo.id,
                // nombre: user.nombre,
                // avatar: user.avatar
            });
        }
    },

}
</script>
<template>
    <div class>
        <form id="contact-form" class="grid sm:gap-x-8 gap-x-4 grid-cols-2">
            <div class="col-span-2">
                <h2
                    class="text-white text-center font-bold uppercase xl:text-xl lg:leading-12 leading-10"
                >{{ torneo.nombre }}</h2>
                <address class="my-2">
                    <i class="text-sm text-primary">Fecha:</i>
                    <span class="px-2">
                        <span class="uppercase">{{ formatDate(torneo.fecha, { weekday: "long" }) }},</span>
                        {{ formatDate(torneo.fecha) }}
                        <strong>{{ torneo.hora }}</strong>
                    </span>
                </address>
                <address class="my-2">
                    <i class="text-sm text-primary">Hora:</i>
                    <span class="px-2">
                        <strong>{{ torneo.hora }}</strong>
                        <small class="pl-4">Tiempo espera: {{ torneo.tiempo_espera }} minutos</small>
                    </span>
                </address>
                <address class="my-2">
                    <i class="text-sm text-primary">Ubicación:</i>
                    <span class="px-2">
                        {{ torneo.ciudad }}
                        <strong>{{ torneo.lugar }}</strong>
                    </span>
                </address>
            </div>
            <div class="single-fild col-span-2">
                <div class="form-btn-wrap flex justify-center w-full mt-4">
                    <button
                        type="submit"
                        value="submit"
                        name="submit"
                        class="form-btn group primary-btn opacity-100 transition-all uppercase"
                        style="background-image:url(/images/others/btn-bg.webp)"
                    >
                        INSCRIBIRME
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
    background-color: #fff;
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