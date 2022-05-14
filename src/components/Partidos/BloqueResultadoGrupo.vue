<script>
import Popper from "vue3-popper";

export default {
    components:{
        Popper
    },
    data(){
        return {
            partidoKey: this.playerA.id + '_' + this.playerB.id
        }
    },
    props:['playerA','playerB','grupo','resultado','principal'],
    computed:{
        puntosA ()  {      
            let puntosA = parseInt(this.resultado.split(':')[0]);
            return puntosA;
        },
        puntosB () {
            let puntosB = parseInt(this.resultado.split(':')[1]);
            return puntosB;
        },
        ganador () {
            return this.puntosA > this.puntosB ? this.playerA : this.playerB;
        },
        perdedor () {
            return this.puntosB > this.puntosA ? this.playerB : this.playerA;
        }
    },
}
</script>
<template>
    <Popper>
        <div class="cursor-pointer hover:text-rojo-claro">
            <div v-if="resultado">
                <div class="flex flex-col" v-if="resultado">
                    
                    <span :class="ganador.id == principal.id ? 'order-1' : 'order-2'">
                        {{ ganador.id == playerA.id ? puntosA : puntosB }}
                    </span>
                    <span :class="perdedor.id == principal.id ? 'order-2' : 'order-1'">
                       {{ ganador.id == playerA.id ? puntosB : puntosA }}
                    </span>
                </div>
            </div>
            <div v-else>
                <img class="w-8 h-8 rounded-xl mx-auto" src="/images/others/play-btn2.webp"
                alt="Ir a Partido" />
            </div>
        </div>
        <template #content>
            <h2 class="uppercase">
                <RouterLink
                    class="hover:text-rojo"
                    :to="{ name: 'partido', params: { id: grupo.partidos[grupo.jugados.indexOf(partidoKey)] } }">
                    Resultados
                </RouterLink>
            </h2>
            <div class="p-0 flex flex-col">
                <div class="flex justify-between items-stretch items-center border rounded-b-md">
                    <div class="flex items-center align-middle p-1">
                        <img class="w-8 h-8 rounded-xl mx-auto"
                            :src="playerA.avatar ?? '/images/others/upcoming-game-thumb3.webp'" :alt="playerA.nombre" />
                        <div class="text-center pl-2">
                            <span class="text-center">{{ playerA.nombre }}</span>
                        </div>
                    </div>
                    <div class="border border-primary flex items-center p-1 font-bold">
                        <span>
                            {{ puntosA }}
                        </span>
                    </div>
                </div>
                <div class="flex justify-between items-stretch items-center border rounded-t-md">
                    <div class="flex items-center align-middle p-1">
                        <img class="w-8 h-8 rounded-xl mx-auto"
                            :src="playerB.avatar ?? '/images/others/upcoming-game-thumb3.webp'" :alt="playerB.nombre" />
                        <div class="text-center pl-2">
                            <span class="text-center">{{ playerB.nombre }}</span>
                        </div>
                    </div>
                    <div class="border border-primary flex items-center p-1 font-bold">
                        <span>
                            {{ puntosB }}
                        </span>
                    </div>
                </div>
            </div>
        </template>
    </Popper>
</template>