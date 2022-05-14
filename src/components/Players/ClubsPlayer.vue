<template>
    <div>
        <div class="about_title lg:mb-6 mb-4">
          <h5
            class="text-primary text-xl uppercase font-bold pl-24 lg:mb-6 mb-4 relative before:absolute content-before before:left-0 before:top-1/2 before:-translate-y-1/2 before:transform before:h-1 before:bg-primary before:w-16"
          >Club</h5>
          <div v-if="player.clubs">
            <div
                class="border-4 border-light-blue-500 rounded-4xl px-10 lg:px-16 max-w-lg mx-auto"
            >
                <div class="grid grid-cols-1 items-center">
                    <div class="flex justify-center items-center w-full px-0 lg:px-8">
                        <div class="text-center" v-for="cl in player.clubs" :key="cl.id">
                            <RouterLink :to="`/club/${cl.id}`" >
                                <img
                                    class="w-16 h-16 rounded-2xl"
                                    :src="cl ? (cl.logo ??  '/images/others/upcoming-game-thumb3.webp') : ''"
                                    :alt="cl ? cl.nombre : ''"
                                />
                                <h4 class="text-center">{{ cl ? cl.nombre : '' }}</h4>
                            </RouterLink>
                        </div>
                    </div>
                </div>

            </div>
          </div>
          <p
            v-else
            class="text-white italic font-exo font-bold uppercase  text-2xl xl:leading-70 lg:leading-12 leading-10 max-w-sm md:max-w-xl lg:max-w-2xl"
          >Aún no perteneces a ningún club, <RouterLink class="text-gris underline hover:text-white" to="/clubs">Únete</RouterLink></p>
        </div>
    </div>
</template>

<script>
export default {
    props:["player"]
}
</script>