<script>
import { mapGetters, mapActions } from "vuex";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from 'vue-router';

import Breadcrumb from "@/components/Breadcrumb.vue";
import Footer from "@/components/Footer.vue";
import PlayerCounters from "@/components/Players/PlayerCounters.vue";
import ClubsPlayer from "@/components/Players/ClubsPlayer.vue";
import RetarJugador from "@/components/Players/RetarJugador.vue";
import { $vfm, VueFinalModal } from 'vue-final-modal'

export default {
  components: {
    Breadcrumb,
    Footer,
    PlayerCounters,
    RetarJugador,
    ClubsPlayer,

    VueFinalModal
  },
  data() {
    return {
      BreadcrumbTitle: "Perfil",
      BreadcrumbSubTitle: "Perfil",
      showModalRetar: false
    };
  },
  computed: {
        ...mapGetters(["isUserAuth", "getUser"]),
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const playerData = ref(null);

    const loadInfoPlayer = (playerId) => {
      store.dispatch("loadProfile", playerId).then((value) => {
        console.log("publicProfile", value);
        playerData.value = value;
      });
    }

    loadInfoPlayer(route.params.id);

    return {
      playerData,
    };
  },
};
</script>

<template>
  <Breadcrumb :BreadcrumbTitle="BreadcrumbTitle" :BreadcrumbSubTitle="BreadcrumbSubTitle" />

  <div class="container" v-if="playerData">
    <div class="flex md:flex-row flex-col bg-secondary-100 p-8 md:p-68 rounded-50">
      <div class="md:w-2/5">
        <div
          class="border-4 border-gray-400 rounded-3xl d-flex max-w-full md:max-w-sm overflow-hidden"
        >
          <img
            class="w-full"
            :src="playerData.avatar ?? '/images/player/list/player-1.webp'"
            :alt="playerData.nombre"
          />
        </div>

        <div
          class="flex flex-col justify-center items-center relative mt-8 max-w-full md:max-w-sm z-10 py-7"
        >
          <h3
            class="text-white font-bold text-lg md:text-2xl uppercase"
          >{{ playerData.nacionalidad }}</h3>
          <span class="text-white text-sm md:text-base transition-all">
            <small>{{ playerData.ciudad }}</small>
          </span>
          <span class="text-white text-sm md:text-base transition-all">
            0
            <small>pts</small>
          </span>
          <div class="absolute top-0 left-0 w-full z-n1">
            <img class="absolute w-full h-120" src="/images/others/tam-text-shape2.webp" alt />
          </div>
        </div>

        <ul class="flex justify-center text-white mt-8 max-w-full md:max-w-sm">
          <li class="mr-2">
            <a
              href="https://www.twitch.tv"
              class="w-12 h-12 rounded-full border-2 border-yellow flex justify-center items-center hover:border-yellow hover:bg-yellow transition-all"
            >
              <i class="icofont-twitch"></i>
            </a>
          </li>
          <li class="mr-2 ml-2">
            <a
              href="https://www.youtube.com"
              class="w-12 h-12 rounded-full border-2 border-bright flex justify-center items-center hover:border-bright hover:bg-bright transition-all"
            >
              <i class="icofont-youtube-play"></i>
            </a>
          </li>
          <li class="ml-2">
            <a
              href="https://www.twitter.com"
              class="w-12 h-12 rounded-full border-2 border-punch flex justify-center items-center hover:border-punch hover:bg-punch transition-all"
            >
              <i class="icofont-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
      <div class="md:w-3/5 md:pl-10 mt-16 md:mt-0">
        <div class="about_title lg:mb-6 mb-4">
          <h5
            class="text-primary text-xl uppercase font-bold pl-24 lg:mb-6 mb-4 relative before:absolute content-before before:left-0 before:top-1/2 before:-translate-y-1/2 before:transform before:h-1 before:bg-primary before:w-16"
          >Perfil de Jugador</h5>
          <h2
            class="text-white font-exo font-bold uppercase xl:text-title lg:text-5xl md:text-4xl sm:text-3xl text-2xl xl:leading-70 lg:leading-12 leading-10 max-w-sm md:max-w-xl lg:max-w-2xl"
          >{{ playerData.nombre }}</h2>
        </div>

        <div class="about_desc mb-10" v-if="playerData.sexo">
          <p class="lg:text-xl lg:leading-8">{{ playerData.about }}</p>
        </div>

        <div v-if="isUserAuth" class="about_btn">
          <vue-final-modal  class="bg-transparent" name="modal-retar" classes="modal-container " content-class="modal-content"
              v-model="showModalRetar" :width="1000" :height="700" :adaptive="true">
              <RetarJugador :player="playerData" />
              <button
                  class="absolute top-0 right-0 icofont-close-line z-999 font-bold text-3xl text-white hover:text-primary transition-all transform hover:rotate-90"
                  @click="showModalRetar = false"></button>
          </vue-final-modal>
          <button
            @click="showModalRetar = true"
            class="group primary-btn opacity-100 transition-all"
            style="background-image:url(/images/others/btn-bg.webp)"
          >
            Retar
            <img
              src="/images/icon/arrrow-icon.webp"
              alt="Arrow Icon"
              class="ml-3 w-5 h-5 group-hover:ml-4 transition-all"
            />
          </button>
        </div>
        <p v-else><RouterLink class="text-primary font-extrabold hover:text-rojo-claro" to="/register">Regístrate!</RouterLink> para poder retar a este jugador</p>
        <br>
        <br>
        <ClubsPlayer :player="playerData" />
        
      </div>
    </div>
  </div>

  <PlayerCounters  v-if="playerData" :player="playerData" />

  <Footer />
</template>