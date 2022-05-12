<script>
import { mapGetters, mapActions } from "vuex";
import { computed, ref } from "vue";
import { useStore } from "vuex";

import Breadcrumb from "@/components/Breadcrumb.vue";
import Avatar from "@/components/Avatar.vue";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  components: {
    Breadcrumb,
    Avatar
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
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const playerData = ref(null);
    const showForm = ref(false);
    const isProcessing = ref(false);

    console.log("store");
    console.log(store);
    console.log("store.getters.getUser");
    console.log(store.getters.getUser);


    // const player = computed(() => store.getters["getUser"]);

    // console.log('player');
    // console.log(player);
    // console.log(player.value.uid);
    playerData.value = props.player;

    // store.dispatch("loadProfile", player.value.uid).then((value) => {
    //   console.log("profile", value);
    //   playerData.value = value;
    //   playerData.value.uid = player.value.uid;
    // });

    const changeImage = (image) => {
      console.log('image');
      console.log(image);

      const storage = getStorage();
      const imgName = `${Date.now()}`;
      const storageRef = sRef(storage, "players/" + imgName);

      uploadBytes(storageRef, image)
          .then(function (snapshot) {
              getDownloadURL(snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  playerData.value.avatar = downloadURL;
              });
          });
    }

    const submit = () => {
      console.log("updateProfile");
      console.log(playerData.value);
      isProcessing.value = true;
      store.dispatch("updateProfile", playerData.value)
        .then((response) => {
          isProcessing.value = false;
          console.log("response");
          console.log(response);
          showForm.value = false;
        });
    };

    return {
      playerData,

      showForm,
      isProcessing,

      submit,
      changeImage
    };
  },
};
</script>
<template>
  <div class="mt-4 flex justify-end">
    <button
      style="background-image:url(/images/others/btn-signup.webp); background-size: 275px 60px;"
      class="signup-btn transition-all w-auto px-3"
      type="button"
      v-if="!showForm"
      @click="showForm = true"
    >Actualizar Datos de Perfil</button>
  </div>
  <div v-if="playerData">
    <form @submit.prevent="submit" v-if="showForm" class="w-full max-w-lg mx-auto py-1">
      <h4 class="my-2 font-extrabold uppercase">Datos de perfil</h4>

      <Avatar @change-image="changeImage" :imagen="playerData.avatar" />
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
            placeholder="vEj: Naty Armas"
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
            list="ciudades"
          />
          <datalist id="ciudades">
              <option value="Ambato"/>
              <option value="Quito"/>
              <option value="Baños"/>
              <option value="Puyo"/>
          </datalist>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-organizador"
          >Acerca de mi</label>
          <textarea
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-organizador"
            type="text"
            placeholder="Cuéntanos un poco de ti"
            v-model="playerData.about"
          />
        </div>
      </div>
      <div v-if="isProcessing" class="flex justify-center w-full">
          <h2 class="text-primary">Procesando...</h2>
      </div>
      <div v-else class="flex justify-around">
        <button
          style="background-image:url(/images/others/btn-signup.webp);"
          class="signup-btn transition-all"
          type="submit"
        >Actualizar</button>
        <button
          class="signup-btn transition-all border-gray-200 border rounded-2xl"
          @click="showForm = false"
          type="button"
        >Cancelar</button>
      </div>
    </form>
  </div>
</template>