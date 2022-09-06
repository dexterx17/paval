<script>
import { mapGetters, mapActions } from "vuex";
import { computed, ref } from 'vue';

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

import { VueDraggableNext } from 'vue-draggable-next'

export default {
    components: {
        vSelect,
        draggable : VueDraggableNext
    },
    props: ["torneo", 'grupos'],
    methods: {
        ...mapActions(["configurarTorneo"]),
        formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
            if (!value) return value
            return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
        },
        submit() {
            this.procesando = true;

            alert('proximamente...')
            //asignar orden original de jugadores en cada grupo
            // this.grupos = this.grupos.map(g=>{
            //     g.jugadores = g.jugadores.map((j,i) => {
            //         j.indice = (i+1);
            //         return j;
            //     });
            //     return g;
            // })

            // this.configurarTorneo({
            //     torneo_id: this.torneo.id,
            //     data: {
            //         modo_juego: this.modoJuego,
            //         n_grupos: this.nGrupos,
            //         n_mesas: this.nMesas
            //     },
            //     grupos: this.grupos
            // }).then((torneo) => {
            //     this.procesando = false;
            //     this.$emit('hide-modal')
            //     console.log('torneo');
            //     console.log(torneo);
            //     // if (torneo.id) {
            //     // this.$emit('hide-modal')
            //     // }
            // })
        }
    },
    data() {
        return {
            gruposOptions: [1, 2, 3, 4, 5],
            gruposOptions: [{
                id: 1,
                label: '1 Grupo (3 a 7 jugadores)'
             },{
                 id: 2,
                 label: '2 Grupos (6 a 10 jugadores)'
             },{
                 id: 3,
                 label: '3 Grupos (9 a 15 jugadores)'
             },{
                 id: 4,
                 label: '4 Grupos (12 a 20 jugadores)'
             },{
                 id: 5,
                 label: '5 Grupos (18 a 26 jugadores)'
            }],
            // grupos:[],
            modosJuego: [
                {
                    id: '2de3',
                    label: 'El mejor de 3 partidos (2 de 3)'
                },
                {
                    id: '3de5',
                    label: 'El mejor de 5 partidos (3 de 5)'
                },
                {
                    id: '4de7',
                    label: 'El mejor de 7 partidos (4 de 7)'
                },
                {
                    id: '5de9',
                    label: 'El mejor de 9 partidos (5 de 9)'
                },
            ]
        }
    },
    setup(props) {
        const modoJuego = ref('2de3');
        const nGrupos = ref(1);
        const nMesas = ref(4);
        const nGrupoOption = ref({
                id: 1,
                label: '1 Grupo (3 a 7 jugadores)'
            });
        const procesando = ref(false);

        // const grupos = ref([])

        // const selectTotalGrupos = (option) => {
        //     nGrupos.value = option.id;
        //     console.log('Total Grupos', option);
        //     grupos.value = [];
        //     for (let index = 1; index <= option.id; index++) {
        //         grupos.value.push({
        //             grupo: (index),
        //             jugadores: [],
        //             partidos: [],
        //             jugados:[],
        //             resultados:{}
        //         });
        //     }
        // }

        // const asignarJugadores = () => {
        //     selectTotalGrupos(nGrupoOption.value);
        //     let grupo = 0;
        //     console.log('this.inscritos');
        //     console.log(props.inscritos);
        //     console.log(grupos.value);
        //     for (let index = 0; index < props.inscritos.length; index++) {
        //         const inscrito = props.inscritos[index];
        //         console.log(grupos.value);
        //         grupos.value[grupo].jugadores.push(inscrito);
        //         console.log('grupo',grupo);
        //         console.log('totalGrupos',nGrupos.value);

        //         if(grupo < (nGrupos.value-1) ){
        //             console.log('cambiar de grupo');
        //             grupo++;
        //         }else if( grupo == (nGrupos.value-1) ){
        //             console.log('reiniciar Grupo');
        //             grupo = 0;
        //         }
        //     }
        // };

        return {
            modoJuego,
            nGrupos,
            nMesas,
            nGrupoOption,
       //     grupos,
            procesando,

         //   selectTotalGrupos,
         //   asignarJugadores
        }
    }

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
                >{{ torneo.nombre }}</h2>
                <h3 class="text-center italic">Verificar SemiFinales</h3>
                <address class="my-2">
                    <i class="text-sm text-primary">Grupos:</i>
                    <span class="px-2">{{ grupos.length }}</span>
                </address>
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
            </div>
            <div class="col-span-2">
                <div class="flex justify-around">
                    <div v-for="grp, grpIndex in grupos" :key="grpIndex" class="border border-white rounded-md">
                        <h2 class="text-center bg-primary rounded-t-md">Partido {{ grp.grupo }}</h2>
                         <draggable
                                :id="'grupo'+grpIndex"                                
                                v-model="grp.ganadores"
                                class="list-group"
                                tag="ul"
                                group="one"
                            >
                            <transition-group>
                                <li v-for="ply,index in grp.ganadores" :key="ply"
                                    class="flex justify-between my-1 border-b border-dashed">
                                        <div class="flex items-center px-1">
                                            <img
                                                class="w-8 h-8 rounded-xl"
                                                :src="ply.avatar ?? '/images/blog/blog3.webp'"
                                                :alt="ply.nombre"
                                            />
                                            <div class="flex flex-col pl-1">
                                                <span class>{{ ply.nombre }}</span>
                                                <small
                                                    class="text-xs text-primary flex justify-between"
                                                >
                                                    <span>
                                                        <i class="text-gris">Rank:</i> {{ ply.ranking }}
                                                    </span>
                                                    <span>
                                                        <i>#</i>  {{ (torneo.inscritos.indexOf(ply.jugador_id) + 1) }}
                                                    </span>
                                                </small>
                                            </div>
                                        </div>
                                        <div class="bg-white text-primary font-bold px-0 flex items-center ">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                            </span>
                                        </div>
                                </li>
                            </transition-group>
                        </draggable>
                    </div>
                </div>
            </div>
            <div class="single-fild col-span-2">
                <div v-if="procesando" class="flex justify-center w-full">
                    <h2 class="text-primary">Procesando...</h2>
                </div>
                <div v-else class="form-btn-wrap flex justify-center w-full mt-4">
                    <button
                        type="submit"
                        value="submit"
                        name="submit"
                        class="ml-2 form-btn group p-4 mt-2 opacity-100 transition-all bg-cover"
                        style="background-image:url(/images/others/button.png)"
                    >
                        Aprobar SemiFinales
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
    width: 80% !important;
    /* max-height: 300px; */
    height: 80% !important;
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