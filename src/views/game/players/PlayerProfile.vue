<script>
import { mapGetters, mapActions } from "vuex";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";

import Breadcrumb from "@/components/Breadcrumb.vue";
import Avatar from "@/components/Avatar.vue";
import Footer from "@/components/Footer.vue";
import PlayerForm from "@/components/Players/PlayerForm.vue";

export default {
  components: {
    Breadcrumb,
    Avatar,
    Footer,
    PlayerForm
  },
  methods: {
    ...mapActions(["loadProfile","signOutAction"]),
    logout() {
        this.signOutAction();
        this.$router.replace({ name: "home" });
    }
  },
  data() {
    return {
      BreadcrumbTitle: "Mi Perfil",
      BreadcrumbSubTitle: "Perfil",
    };
  },
  setup() {
    const store = useStore();
    const playerData = ref(null);

    const player = computed(() => store.getters["getUser"]);
    console.log('player', player.value)

    const loadInfoPlayer = (playerInfo) => {
      console.log('loadInfoPlayer', playerInfo);
      store.dispatch("loadProfile", playerInfo.uid).then((value) => {
        console.log("profile", value);
        playerData.value = value;
        playerData.value.uid = playerInfo.uid;
      });

    }

    if (player.value) {
      loadInfoPlayer(player.value);
    }

    watch(
      player, (curr, old) => {
        console.log('ahora si player')
        console.log(curr, old)

        console.log(curr);
        console.log(curr.uid);
        loadInfoPlayer(curr);
      }
    )


    return {
      playerData,
      player
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

          <div v-if="!playerData.sexo">
            <h3 class="text-lg italic">Bienvenid@</h3>
          </div>
          <h2
            class="text-white font-exo font-bold uppercase xl:text-title lg:text-5xl md:text-4xl sm:text-3xl text-2xl xl:leading-70 lg:leading-12 leading-10 max-w-sm md:max-w-xl lg:max-w-2xl"
          >{{ playerData.nombre }}</h2>
        </div>

        <div class="about_desc mb-10" v-if="playerData.sexo">
          <p class="lg:text-xl lg:leading-8">{{ playerData.about }}</p>
        </div>
        <div v-else>
          <p>Por favor actualiza tus datos de perfil</p>
        </div>

        <!-- <div class="about_btn">
          <RouterLink
            to="/contact"
            class="group primary-btn opacity-100 transition-all"
            style="background-image:url(/images/others/btn-bg.webp)"
          >
            Retar
            <img
              src="/images/icon/arrrow-icon.webp"
              alt="Arrow Icon"
              class="ml-3 w-5 h-5 group-hover:ml-4 transition-all"
            />
          </RouterLink>
        </div>-->

        <PlayerForm v-if="playerData" :player="playerData" />
        <button class="hover:text-primary underline italic" @click="logout">Cerrar sesión</button>
      </div>
    </div>
  </div>

  <Footer />
</template>