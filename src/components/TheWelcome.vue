<script setup>
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
import SupportIcon from "./icons/IconSupport.vue";

import { RouterLink } from "vue-router";

import {useStore} from "vuex";

 const store = useStore();

 console.log('store');
 console.log(store);
 console.log(store.state);
 console.log(store.state.authStore);

</script>

<template>
  <h1>{{ this.$store.state.authStore.test }}</h1>
  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Clubs</template>

    Get official tools and libraries for your project:

    a visit.
  </WelcomeItem>


  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Series</template>

    Got stuck? Ask your question on

  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Jugadores</template>

    De cada jugador se solicita 
  </WelcomeItem>


  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>
      <RouterLink to="/torneos">
          Torneos
      </RouterLink>
    </template>

    Club, horario, ubicación, organizador
    <br />

    More instructions are available in <code>README.md</code>.
  </WelcomeItem>


  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Grupos</template>

    Got stuck? Ask your question on
    
  </WelcomeItem>


  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Partidos</template>

    Got stuck? Ask your question on

  </WelcomeItem>

</template>
