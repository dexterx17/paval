<script>
import { mapGetters, mapActions } from "vuex";
import { computed } from "vue";
import { useStore } from "vuex";

import Breadcrumb from "@/components/Breadcrumb.vue";
import Footer from "@/components/Footer.vue";

export default {
  components:{
    Breadcrumb,
    Footer
  },
  data() {
    return {
      BreadcrumbTitle: "Jugadores",
      BreadcrumbSubTitle: "Listado",
      players: [],
      maxPerPage: 12,
      showReadMore: true,
      procesandoShowMore: false
    };
  },
  methods: {
    ...mapActions(["loadPlayers"]),
    loadMore() {
        let lastPlayer = this.players[this.players.length-1];
        let resultados = this.loadPlayers({
            limit: this.maxPerPage,
            lastPlayer: lastPlayer
        });
    },
  },
  computed: {
    ...mapGetters(["getPlayers"]),
    totalResults() {
        return Object.keys(this.players).length
    },
  },
  mounted() {
    this.loadPlayers({
            limit: this.maxPerPage
    });
    
  },

  setup() {
    const store = useStore();

    let players = computed(function () {
      return store.state.playersStore.players;
    });

    // setTimeout(function(){
    //   store.dispatch('updateAllPlayers',{
    //     players: players.value
    //   });
    // },2500);
    // console.log("players");
    // console.log(players.value);

    return {
      players,
    };
  },
};
</script>

<template>

  <Breadcrumb :BreadcrumbTitle="BreadcrumbTitle" :BreadcrumbSubTitle="BreadcrumbSubTitle" />

  <!-- Blog Post Section Start -->
  <div class="container">
      
      <div  v-if="players" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div class="relative group w-300 sm:w-full mx-auto" v-for="(player, index) in players" :key="index">
              <div class="w-full rounded-4xl overflow-hidden relative">
                  <div class="absolute p-2 flex flex-col text-center border border-primary rounded-tl-2xl bg-gris-oscuro">
                        <strong>
                            {{ player.ranking }}
                        </strong>
                        <small class="text-sm italic">Rank</small>
                    </div>
                  <img :src="player.avatar ?? '/images/player/list/player-1.webp'" :alt="player.nombre">
                  <RouterLink :to="`/player/${player.id}`" class="w-full h-full absolute left-0 top-0 bg-gray-900 rounded-5xl opacity-0 group-hover:opacity-70 border-4 border-gray-400 rounded-4xl"></RouterLink>
                  <ul class="social-link absolute left-0 text-center bottom-0 group-hover:bottom-8 w-full space-x-2 opacity-0 group-hover:opacity-100 transition-all z-20 text-white">
                      <li class="text-center inline-block">
                          <div title="Torneos" class="w-12 h-10 flex items-center justify-center transition-all bg-cover text-white hover:bg-arrow-shape bg-arrow-hover-shape z-50">
                              <i class="icofont-badge pr-1"></i>
                              {{ player.total_torneos }}
                          </div>
                      </li>
                      <li class="text-center inline-block">
                          <div title="Partidos" class="w-12 h-10 flex items-center justify-center transition-all bg-cover text-white hover:bg-arrow-shape bg-arrow-hover-shape z-50">
                              <i class="icofont-tennis-player pr-1"></i>
                              {{ player.total_partidos }}
                          </div>
                      </li>
                      <li class="text-center inline-block">
                          <div title="Victorias" class="w-12 h-10 flex items-center justify-center transition-all bg-cover text-white hover:bg-arrow-shape bg-arrow-hover-shape z-50">
                              <i class="icofont-circled-up pr-1"></i>
                              {{ player.total_victorias }}
                          </div>
                      </li>
                      <li class="text-center inline-block">
                          <div title="Derrotas" class="w-12 h-10 flex items-center justify-center transition-all bg-cover text-white hover:bg-arrow-shape bg-arrow-hover-shape z-50">
                              <i class="icofont-circled-down pr-1"></i>
                              {{ player.total_derrotas }}
                          </div>
                      </li>
                  </ul>
              </div>
              <div class="flex flex-col justify-center items-center mt-8 bg-team-shape bg-cover h-24 sm:h-20 md:h-28 lg:h-24 xl:h-32 2xl:h-32 group-hover:bg-team-hover-shape hover:transition-all">
                  <h3 class="text-white font-bold text-lg md:text-2xl uppercase mb-2 xl:mb-4 leading-tight">
                      <RouterLink :to="`/player/${player.id}`">{{player.nombre}}</RouterLink>
                  </h3>
                  <span class="text-white text-sm group-hover:text-white transition-all">{{player.ciudad}}</span>
              </div>
          </div>
      </div>

      <div
          class="flex justify-center mt-73"
          v-if="showReadMore"
      >
          <div class="flex flex-col justify-center items-center">
              <small class="text-center text-primary py-2">
                  Mostrando {{ totalResults }} jugadores...
              </small>
              <button
                  class="primary-btn"
                  style="background-image:url(/images/others/btn-bg.webp);"
                  @click="loadMore"
              >Más Jugadres</button>
          </div>
      </div>

      <p v-else>Aún no hay jugadores registrados.</p>

  </div>
  <!-- Blog Post Section End -->

  <Footer />
  
</template>
