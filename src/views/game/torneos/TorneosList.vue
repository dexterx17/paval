<script>
import { mapGetters, mapActions } from "vuex";
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["loadTorneos"]),
  },
  computed: {
    ...mapGetters(["getTorneos"]),
  },
  mounted() {
    this.loadTorneos();
  },
  setup() {
    const store = useStore();
    const showForm = ref(false);
    const torneoModel = {
        club: null,
        serie: null,
        organizador: "",
        tiempo_espera: 5,
        fecha: Date(),
        hora: "19:00",
        lugar: ""
    };

    const torneoData = ref(torneoModel);

    const initTorneo = () => {
        console.log('initTorneo');
        showForm.value = true;
        torneoData.value = torneoModel;
    };

    let torneos = computed(function () {
      return store.state.torneosStore.torneos;
    });

    return {
      torneos,
      torneoData,
      showForm,

      initTorneo
    };
  },
};
</script>

<template>
  <div>
    <header>
      <h3>Torneos List</h3>
    </header>
    <section>
      <article class="bg-gray-200">
          <button v-if="!showForm" @click="initTorneo">
              Nuevo Torneo
          </button>
          <form class="w-full max-w-lg">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        First Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
      <p class="text-red-500 text-xs italic">Please fill out this field.</p>
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Last Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe">
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Password
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************">
      <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-2">
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
        City
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque">
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        State
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>New Mexico</option>
          <option>Missouri</option>
          <option>Texas</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
        Zip
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210">
    </div>
  </div>
</form>
          <form v-if="showForm">
              <h4>Datos Torneo</h4>
              <div class="flex flex-col">
                  <div>
                    <label for="serie">Club</label>
                    <input type="text" v-model="torneoData.club">
                  </div>

                  <div>
                    <label for="serie">Serie</label>
                    <input type="text" v-model="torneoData.serie">
                  </div>

                  <label for="organizador">Organizador</label>
                  <input type="text" v-model="torneoData.organizador">

                  <label for="fecha">Fecha</label>
                  <input type="date" v-model="torneoData.fecha">

                  <label for="hora">Hora</label>
                  <input type="time" v-model="torneoData.hora">

                  <label for="lugar">Tiempo de Espera</label>
                  <input type="number" v-model="torneoData.tiempo_espera">

                  <label for="lugar">Lugar</label>
                  <input type="text" v-model="torneoData.lugar">

                  <button type="submit">
                      Crear Torneo
                  </button>

                  <button @click="showForm = false" type="button">
                      Cancelar
                  </button>

              </div>
          </form>
      </article>
      <ul v-if="torneos">
        <li
          v-for="torneo in torneos"
          :key="torneo.id"
          class="flex my-2 border border-gray-300 rounded-md"
        >
          <img
            src="https://via.placeholder.com/42/42/torneo.png"
            :alt="torneo.nombre"
          />
          <div class="flex flex-col pl-2">
            <h5>{{ torneo.nombre }}</h5>
            <h5>{{ torneo.nacionalidad }}</h5>
          </div>
        </li>
      </ul>
      <p v-else>Aún no hay torneos registrados.</p>
    </section>
  </div>
</template>
