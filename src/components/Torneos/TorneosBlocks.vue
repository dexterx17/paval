<template>
    <div class="container mb-120">
        <TitleSection :title="title" :text="text" />

        <div class="filter-wrap bg-secondary-100 rounded-2xl px-5 py-7 mb-10">
            <div class="flex flex-col sm:flex-row justify-between">
                <div class="category-filter">
                    <div class="filter-option">
                        <select
                            id="selectgame"
                            class="px-5 h-14 w-full mb-8 sm:mb-0 sm:w-64 text-white bg-secondary-100 border-2 border-solid rounded-lg focus:outline-none border-gray-400 block"
                        >
                            <option value class="bg-black">Todas los clubs</option>
                        </select>
                    </div>
                </div>
                <div class="search-filter">
                    <div class="search-bx">
                        <div class="filter-option">
                            <select
                                id="selectgame"
                                class="px-5 h-14 w-full mb-8 sm:mb-0 sm:w-64 text-white bg-secondary-100 border-2 border-solid rounded-lg focus:outline-none border-gray-400 block"
                            >
                                <option value class="bg-black">Últimos Torneos</option>
                                <option value="semana">Semana anterior</option>
                                <option value="mes">Mes anterior</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import TitleSection from '@/components/Title/TitleSection.vue'

import { computed } from 'vue';
import { mapActions, useStore } from "vuex";

export default {
    components: {
        TitleSection,
    },
    data() {
        return {
            title: "Torneos",
            text: "Listado de torneos ordenados cronológicamente"
        }
    },
    methods: {
        ...mapActions(["loadTorneos"]),
    },
    setup() {
        const store = useStore();

        let torneosData = computed(function () {
            return store.state.torneosStore.torneos;
        });

        return {
            torneosData
        };
    },
    mounted() {
        this.loadTorneos();
    },
}
</script>