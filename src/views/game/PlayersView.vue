<script>
import { mapGetters, mapActions } from "vuex";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  data() {
    return {
      players: [],
    };
  },
  methods: {
    ...mapActions(["loadPlayers"]),
  },
  computed: {
    ...mapGetters(["getPlayers"]),
  },
  mounted() {
    this.loadPlayers();
  },

  setup() {
    const store = useStore();

    let players = computed(function () {
      return store.state.playersStore.players;
    });
    console.log("players");
    console.log(players.value);

    return {
      players,
    };
  },
};
</script>

<template>
  <div>
    <header>
      <h3>Players List</h3>
    </header>
    <section>
      <ul v-if="players">
        <li
          v-for="player in players"
          :key="player.id"
          class="flex my-2 border border-gray-300 rounded-md"
        >
          <img
            src="https://via.placeholder.com/42/42/player.png"
            :alt="player.nombre"
          />
          <div class="flex flex-col pl-2">
            <h5>{{ player.nombre }}</h5>
            <h5>{{ player.nacionalidad }}</h5>
          </div>
        </li>
      </ul>
      <p v-else>Aún no hay jugadores registrados.</p>
    </section>
  </div>
</template>
