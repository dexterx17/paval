<script>
import { mapGetters, mapActions } from "vuex";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  data() {
    return {
    };
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

    let torneos = computed(function () {
      return store.state.torneosStore.torneos;
    });
    // console.log("torneos");
    // console.log(torneos.value);

    return {
      torneos,
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
