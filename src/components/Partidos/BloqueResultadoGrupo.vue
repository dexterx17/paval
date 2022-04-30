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
    props:['playerA','playerB','grupo'],
    methods:{
        resultadosPartido:  (grupo, partidoKey) => {
            let index = grupo.jugados.indexOf(partidoKey);

            let partidoId = grupo.partidos[index];

            return grupo.resultados[partidoId] ?? null;
        },
        esGanador : (grupo, partidoKey, playerA, playerB) => {
            let index = grupo.jugados.indexOf(partidoKey);

            let partidoId = grupo.partidos[index];

            let resultado =  grupo.resultados[partidoId] ?? null;

            console.log('resultado:::: ',resultado);
            

            let puntosA = parseInt(resultado.split(':')[0]);
            let puntosB = parseInt(resultado.split(':')[1]);
            
            console.log('puntosA:::: ',puntosA);
            console.log('puntosB:::: ',puntosB);
            
            console.log('playerA:::: ',playerA);

            return puntosA > puntosB ? playerA : playerB;
        },
        puntosA : (grupo, partidoKey) => {
            let index = grupo.jugados.indexOf(partidoKey);

            let partidoId = grupo.partidos[index];

            let resultado =  grupo.resultados[partidoId] ?? null;

            

            let puntosA = parseInt(resultado.split(':')[0]);
            
            return puntosA;

        },
        puntosB : (grupo, partidoKey) => {
            let index = grupo.jugados.indexOf(partidoKey);

            let partidoId = grupo.partidos[index];

            let resultado =  grupo.resultados[partidoId] ?? null;

            

            let puntosB = parseInt(resultado.split(':')[1]);
            
            return puntosB;

        },
    }
}
</script>
<template>
    <Popper hover>
        <RouterLink
            class="hover:text-primary"
            :to="{ name: 'partido', params: { id: grupo.partidos[grupo.jugados.indexOf(partidoKey)] } }">   
            <div v-if="resultadosPartido(grupo, partidoKey)">
                <div class="flex flex-col" v-if="resultadosPartido(grupo, partidoKey)">

                    <!-- {{  esGanador(grupo, partidoKey, playerA, playerB) }} 
                    <hr>
                    {{playerA}}
                    <hr> -->
                    <span>
                        {{  esGanador(grupo, partidoKey, playerA, playerB).id == playerA ?  puntosA(grupo, partidoKey) :  puntosB(grupo, partidoKey) }}
                    </span>
                    <span>
                        {{  esGanador(grupo, partidoKey, playerA, playerB).id == playerA ?  puntosB(grupo, partidoKey) : puntosA(grupo, partidoKey) }}
                    </span>
                </div>
            </div>
            <div v-else>
                <img class="w-8 h-8 rounded-xl mx-auto" src="/images/others/play-btn2.webp"
                alt="Ir a Partido" />
            </div>
        </RouterLink>
        <template #content>
            <div class="p-0">
                <h2 class="uppercase">Resultados</h2>
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
                            {{ resultadosPartido(grupo, partidoKey).split(':')[1] }}
                        </span>
                    </div>
                </div>
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
                            {{ resultadosPartido(grupo, partidoKey).split(':')[0] }}
                        </span>
                    </div>
                </div>
            </div>
        </template>
    </Popper>
</template>