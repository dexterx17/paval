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
    ...mapActions(["loadProfile"]),
  },
  setup() {
    const store = useStore();

     console.log('store');
     console.log(store);
     console.log('store.getters.getUser');
     console.log(store.getters.getUser  );

     const companies = computed(() => store.getters["getUser"]);

     console.log(companies.value.uid);

     store.dispatch('loadProfile',companies.value.uid).then((value)=>{
       console.log('profile',value);
     });
     
    return {
      
    };
  },
};
</script>

<template>
    <div>

    </div>
</template>