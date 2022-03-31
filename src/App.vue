<script>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import HeaderSection from "@/components/HeaderSection.vue";
import OffCanvasMobileMenu from "@/components/Header/OffCanvasMobileMenu.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      navOpen: false,
      paddingTop: "pt-32"
    }
  },
  components: {
    HeaderSection,
    OffCanvasMobileMenu
  },
  methods: {
    ...mapActions(["authAction"]),
  },
  computed: {
    ...mapGetters(["getUser", "isUserAuth"]),
  },
  mounted() {
    this.authAction();
  },
};
</script>

<template>
  <main>
    <HeaderSection />

    <OffCanvasMobileMenu :class="{ 'show-mobile-menu': navOpen }" @togglenav="navOpen = !navOpen" />

    <!-- <header>
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/logo.svg"
        width="125"
        height="125"
      />

      <div class="wrapper">
        <HelloWorld msg="Ping Pong Rank" />

        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink v-if="!isUserAuth" to="/login">Ingresar</RouterLink>
          <RouterLink v-if="!isUserAuth" to="/register">Registrarme</RouterLink>
          <RouterLink v-if="!isUserAuth" to="/about">About</RouterLink>
          <RouterLink v-if="isUserAuth" to="/profile">Mi Perfil</RouterLink>
          <RouterLink v-if="isUserAuth" to="/players">Players</RouterLink>
          <RouterLink v-if="isUserAuth" to="/torneos">Torneos</RouterLink>
          <RouterLink v-if="isUserAuth" to="/dashboard">Dashboard</RouterLink>
        </nav>
      </div>
    </header>-->
    <RouterView />
  </main>
</template>
