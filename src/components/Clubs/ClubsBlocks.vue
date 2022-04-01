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
                            <option value class="bg-black">Todas las ciudades</option>
                            <option value="Ambato">Ambato</option>
                            <option value="Pelileo">Pelileo</option>
                            <option value="Baños">Baños</option>>
                        </select>
                    </div>
                </div>
                <div class="search-filter">
                    <div class="search-bx">
                        <form action="#" class="relative">
                            <input
                                type="text"
                                placeholder="Buscar"
                                class="px-5 h-14 w-full sm:w-64 bg-secondary-100 border-2 border-solid rounded-lg focus:outline-none"
                            />
                            <button
                                type="submit"
                                class="absolute px-5 top-0 right-0 bg-transparent transition-all inline-block h-full text-white hover:text-primary"
                            >
                                <i class="icofont-search-1"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-6"
        >
            <div
                class="relative group before:empty-content before:absolute before:w-full before:h-full before:opacity-0 before:bg-black before:top-0 before:left-0 before:right-0 before:bottom-0 overflow-hidden hover:before:opacity-70 transition-all hover:before:transition-all before:border-4 before:border-white before:rounded-4xl before:border-opacity-20"
                v-for="(games, index) in clubsData"
                :key="index"
            >
                <img
                    class="w-full rounded-4xl"
                    :src="games.gameImage ?? '/images/others/popular-game-thumb1.webp'"
                    :alt="games.nombre"
                />
                <RouterLink
                    :to="`/club/${games.id}`"
                    class="group primary-btn absolute-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
                    style="background-image:url(/images/others/btn-bg.webp)"
                >
                    Detalles Club
                    <img
                        src="/images/icon/arrrow-icon.webp"
                        alt="Arrow Icon"
                        class="ml-3 w-5 h-5 group-hover:ml-4 transition-all"
                    />
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<script>
import gameHome from '@/data/games.json'
import TitleSection from '@/components/Title/TitleSection.vue'

import { computed } from 'vue';
import { mapActions, useStore } from "vuex";

export default {
    components: {
        TitleSection,
    },
    data() {
        return {
            gameHome,
            title: "Clubs",
            text: "Partners y Auspiciantes de nuestra plataforma"
        }
    },
    methods: {
        ...mapActions(["loadClubs"]),
    },
    setup() {
        const store = useStore();

        let clubsData = computed(function () {
            return store.state.clubsStore.clubs;
        });

        return {
            clubsData
        };
    },
    mounted() {
        this.loadClubs();
    },
}
</script>