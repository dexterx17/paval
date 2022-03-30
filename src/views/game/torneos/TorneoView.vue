<script>
import { mapGetters, mapActions } from "vuex";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

import { useRoute } from 'vue-router'

export default {
    data() {
        return {};
    },
    methods: {
        ...mapActions(["fetchTorneo", "inscribirEnTorneo"]),
        formatDate (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
          if (!value) return value
          return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
        }
    },
    computed: {
        //...mapGetters(["getTorneo"]),
    },
    setup() {
        const route = useRoute();
        const store = useStore();
        const torneoData = ref(null);

        store.dispatch('fetchTorneo',route.params.id).then((value)=>{
            console.log('value');
            console.log(value);
            torneoData.value = value;
        });

        // fetch the user information when params change
        watch(
            () => route.params.id,
                async newId => {
                    console.log('newId',newId);
                    torneoData.value = await fetchTorneo(newId)
                }
        )

        return {
            torneoData
        }
    }
}
</script>

<template>
    <div>
        <header v-if="torneoData">
            <div class="flex flex-1 flex-col justify-between p-2">
                <div class="flex justify-between">
                    <h5>
                    <span v-if="torneoData.club"><i class="text-xs">Club:</i> {{ torneoData.club }}</span>
                    <span v-if="torneoData.serie"><i class="text-xs">Serie:</i> {{ torneoData.serie }}</span>
                    </h5>
                    <h4 class="flex flex-col">
                    <span>
                        <span class="capitalize">
                        {{ formatDate(torneoData.fecha,{weekday: "long"}) }},
                        </span>
                        {{ formatDate(torneoData.fecha) }}
                        {{ torneoData.hora }}

                    </span>
                    <small><i class="text-xs">T. espera: </i> {{ torneoData.tiempo_espera }} min.</small>
                    </h4>
                </div>
                <div>
                    <i class="text-xs">Ubicación: </i>
                    <span>
                    {{ torneoData.ciudad }} 
                    </span>
                    <small class="px-1">{{ torneoData.lugar }}</small>
                </div>
                <div class="text-xs">
                    <span>
                    Inscritos: 
                    </span>
                    <ul>
                    <li></li>
                    </ul>
                </div>
            </div>
        </header>
    </div>
</template>