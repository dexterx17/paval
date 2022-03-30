<script>
import { mapGetters, mapActions } from "vuex";
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  methods: {
    ...mapActions(["loadProfile"]),
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
  <div>
    <div v-if="playerData">
      <header class="flex">
        <div>
          <img
            :src="
              playerData.avatar
                ? playerData.avatar
                : 'https://via.placeholder.com/42/42/player.png'
            "
            :alt="playerData.nombre"
          />
        </div>
        <div>
          <h3>{{ playerData.nombre }}</h3>
        </div>
      </header>

      <form
        @submit.prevent="submit"
        v-if="showForm"
        class="w-full max-w-lg mx-auto py-1"
      >
        <h4 class="my-2 font-extrabold uppercase">Datos de perfil</h4>

        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label
              class="
                block
                uppercase
                tracking-wide
                text-gray-700 text-xs
                font-bold
                mb-2
              "
              for="grid-nombre"
              >Nombre</label
            >
            <input
              class="
                appearance-none
                block
                w-full
                bg-gray-200
                text-gray-700
                border 
                rounded
                py-3
                px-4
                mb-3
                leading-tight
                focus:outline-none focus:bg-white
              "
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
              class="
                block
                uppercase
                tracking-wide
                text-gray-700 text-xs
                font-bold
                mb-2
              "
              for="grid-bod"
              >Fecha de Nacimiento</label
            >
            <input
              class="
                appearance-none
                block
                w-full
                bg-gray-200
                text-gray-700
                border border-gray-200
                rounded
                py-3
                px-4
                leading-tight
                focus:outline-none focus:bg-white focus:border-gray-500
              "
              id="grid-bod"
              type="date"
              placeholder="Ej: 01/15/2022"
              v-model="playerData.bod"
              required
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="
                block
                uppercase
                tracking-wide
                text-gray-700 text-xs
                font-bold
                mb-2
              "
              for="grid-sexo"
              >Género</label
            >
            <div class="relative">
              <select
                class="
                  block
                  appearance-none
                  w-full
                  bg-gray-200
                  border border-gray-200
                  text-gray-700
                  py-3
                  px-4
                  pr-8
                  rounded
                  leading-tight
                  focus:outline-none focus:bg-white focus:border-gray-500
                "
                id="grid-sexo"
                v-model="playerData.sexo"
                required
              >
                <option value="H">Hombre</option>
                <option value="M">Mujer</option>
              </select>
              <div
                class="
                  pointer-events-none
                  absolute
                  inset-y-0
                  right-0
                  flex
                  items-center
                  px-2
                  text-gray-700
                "
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
              class="
                block
                uppercase
                tracking-wide
                text-gray-700 text-xs
                font-bold
                mb-2
              "
              for="grid-nacionalidad"
              >Nacionalidad</label
            >
            <div class="relative">
              <select
                class="
                  block
                  appearance-none
                  w-full
                  bg-gray-200
                  border border-gray-200
                  text-gray-700
                  py-3
                  px-4
                  pr-8
                  rounded
                  leading-tight
                  focus:outline-none focus:bg-white focus:border-gray-500
                "
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
                class="
                  pointer-events-none
                  absolute
                  inset-y-0
                  right-0
                  flex
                  items-center
                  px-2
                  text-gray-700
                "
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
              class="
                block
                uppercase
                tracking-wide
                text-gray-700 text-xs
                font-bold
                mb-2
              "
              for="grid-lugar"
              >Ciudad</label
            >
            <input
              class="
                appearance-none
                block
                w-full
                bg-gray-200
                text-gray-700
                border border-gray-200
                rounded
                py-3
                px-4
                leading-tight
                focus:outline-none focus:bg-white focus:border-gray-500
              "
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