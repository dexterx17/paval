<script>
import { mapGetters, mapActions } from "vuex";
import { computed, ref } from "vue";
import { useStore } from "vuex";

import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  components: {
    Breadcrumb
  },
  methods: {
    ...mapActions(["loadProfile"]),
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
    const showForm = ref(true);

    console.log("store");
    console.log(store);
    console.log("store.getters.getUser");
    console.log(store.getters.getUser);

    const player = computed(() => store.getters["getUser"]);

    console.log(player.value.uid);

    store.dispatch("loadProfile", player.value.uid).then((value) => {
      console.log("profile", value);
      playerData.value = value;
      playerData.value.uid = player.value.uid;
    });

    const submit = () => {
      console.log("updateProfile");
      console.log(store);
      store.dispatch("updateProfile", playerData.value).then((response) => {
        console.log("response");
        console.log(response);
      });
    };

    return {
      playerData,
      showForm,

      submit,
    };
  },
};
</script>

<template>
  <Breadcrumb :BreadcrumbTitle="BreadcrumbTitle" :BreadcrumbSubTitle="BreadcrumbSubTitle" />

  <div class="container">
    <div class="flex md:flex-row flex-col bg-secondary-100 p-8 md:p-68 rounded-50">
      <div class="md:w-2/5">
        <div
          class="border-4 border-gray-400 rounded-3xl d-flex max-w-full md:max-w-sm overflow-hidden"
        >
          <img class="w-full" :src="playerData.avatar ?? '/images/player/list/player-1.webp'" alt />
        </div>

        <div
          class="flex flex-col justify-center items-center relative mt-8 max-w-full md:max-w-sm z-10 py-7"
        >
          <h3 class="text-white font-bold text-lg md:text-2xl uppercase">
            <n-link :to="`/player/${playerData.slug}`">{{ playerData.nombre }}</n-link>
          </h3>
          <span class="text-white text-sm md:text-base transition-all">
            {{ playerData.nacionalidad }}
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
          >Player Profile</h5>
          <h2
            class="text-white font-exo font-bold uppercase xl:text-title lg:text-5xl md:text-4xl sm:text-3xl text-2xl xl:leading-70 lg:leading-12 leading-10 max-w-sm md:max-w-xl lg:max-w-2xl"
          >{{ playerData.title }}</h2>
        </div>

        <div class="about_desc mb-10">
          <p
            class="lg:text-xl lg:leading-8"
          >It is a long established fact that a reader will be distracted the readable content of page when looking at it layout the point using lorem Ipsum is that it has a more-or-less normal distribution.</p>
          <p
            class="lg:text-xl lg:leading-8"
          >It is a long established fact that a reader will be distracted the readable content of page when looking at it layout the point using lorem Ipsum is that it has a more-or-less normal distribution.</p>
        </div>

        <div class="about_btn">
          <n-link
            to="/contact"
            class="group primary-btn opacity-100 transition-all"
            style="background-image:url(/images/others/btn-bg.webp)"
          >
            Contact Now
            <img
              src="/images/icon/arrrow-icon.webp"
              alt="Arrow Icon"
              class="ml-3 w-5 h-5 group-hover:ml-4 transition-all"
            />
          </n-link>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div v-if="playerData">
      <form @submit.prevent="submit" v-if="showForm" class="w-full max-w-lg mx-auto py-1">
        <h4 class="my-2 font-extrabold uppercase">Datos de perfil</h4>

        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-nombre"
            >Nombre</label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-nombre"
              type="text"
              placeholder="Ej: Naty Armas"
              v-model="playerData.nombre"
              required
            />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-4">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-bod"
            >Fecha de Nacimiento</label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-bod"
              type="date"
              placeholder="Ej: 01/15/2022"
              v-model="playerData.bod"
              required
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-sexo"
            >Género</label>
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-sexo"
                v-model="playerData.sexo"
                required
              >
                <option value="H">Hombre</option>
                <option value="M">Mujer</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-4">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-nacionalidad"
            >Nacionalidad</label>
            <div class="relative">
              <select
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-nacionalidad"
                v-model="playerData.nacionalidad"
                required
              >
                <option value="Ecuador">Ecuador</option>
                <option value="Colombia">Colombia</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Cuba">Cuba</option>
                <option value="Peru">Perú</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-lugar"
            >Ciudad</label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-ciudad"
              type="text"
              placeholder="Ej: Ambato"
              v-model="playerData.ciudad"
              required
            />
          </div>
        </div>
        <div class="flex justify-around">
          <button type="submit">Actualizar perfil</button>
          <button @click="showForm = false" type="button">Cancelar</button>
        </div>
      </form>
    </div>
    <div v-else></div>
  </div>
</template>