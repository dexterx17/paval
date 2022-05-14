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
                this.$emit('hide-modal')
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
                    class="text-rojo-claro text-center font-bold uppercase xl:text-xl lg:leading-12 leading-10"
                >{{ club.nombre }}</h2>
                <address class="my-2">
                    <i class="text-sm text-primary">Ubicación:</i>
                    <span class="px-2 text-black">
                        {{ club.ciudad }}
                        <strong>{{ club.lugar }}</strong>
                    </span>
                </address>
                <p>
                    <ul class="text-gris-oscuro font-semibold">
                        <li>
                            El Club admite solo tres tipos de integrantes: SOCIO, SOCIO FDT Y AFICIONADO.
                        </li>
                        <li>
                            En apoyo mutuo con FDT, el jugador federado solamente debe presentar el carnet de FDT y será SOCIO FDT, pagando solamente la cuota de inscripción de $30, sin aportes mensuales y obtendrá todos los beneficios como socio e ingresará directamente al Chat y al Ranking del Club.
                        </li>
                        <li>
                            El integrante AFICIONADO será todo jugador que no desee ser socio y quiera participar en nuestro torneo interno permanente (dos por semana) e ingresar al ranking y chat provincial, con el pago de $3.0 dólares por torneo o $10 dólares mensuales.
                        </li>
                        <li>
                            El número mínimo de ascensos cada mes será de 2 jugadores, en caso de no existir jugadores con dos campeonatos en el mes, subirán el primero o los dos primeros del ranking.
                        </li>
                        <li>
                            Todo socio del club podrá en cualquier competencia participar y representar a otro equipo de tenis de mesa, siempre y cuando este no sea un club legalmente constituido, renunciando a los beneficios propios del club.
                        </li>

                    </ul>





                </p>
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
    background-color: white;
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