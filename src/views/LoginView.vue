<script>
import { mapActions, mapGetters } from "vuex";
import { ref } from 'vue'

import Breadcrumb from "@/components/Breadcrumb.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Breadcrumb,
    Footer
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        recordarme: false
      },
      error: null,
      navOpen: false,
      BreadcrumbTitle: "Ingresar",
      BreadcrumbSubTitle: "Ingreso",
      paddingTop: "pt-32"
    };
  },
  setup() {
    const showPassword = ref(false);
    return {
      showPassword
    };
  },
  computed: {
    ...mapGetters(['getError'])
  },
  methods: {
    ...mapActions(["signInAction"]),
    submit() {
      console.log('submit');
      this.signInAction({ email: this.form.email, password: this.form.password }).then((response) => {
        console.log('response');
        console.log(response);
        if (response.user) {
          this.$router.replace({ name: "dashboard" });
        }
      });
    }
  },
};
</script>

<template>
  <Breadcrumb :BreadcrumbTitle="BreadcrumbTitle" :BreadcrumbSubTitle="BreadcrumbSubTitle" />
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-white text-sm font-bold">Ingresa con</h6>
            </div>
            <div class="btn-wrapper text-center">
              <button
                class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                type="button"
                style="transition: all 0.15s ease 0s"
              >
                <img alt="..." class="w-5 mr-1" src="../assets/img/github.svg" />Github
              </button>
              <button
                class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                type="button"
                style="transition: all 0.15s ease 0s"
              >
                <img alt="..." class="w-5 mr-1" src="../assets/img/google.svg" />Google
              </button>
            </div>
            <hr class="mt-6 border-b-1 border-gray-400" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-gray-100 text-center mb-3 font-bold">
              <small>O ingresa con tus credenciales</small>
            </div>
            <form @submit.prevent="submit">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  v-model="form.email"
                  class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  placeholder="Correo electrónico"
                  style="transition: all 0.15s ease 0s"
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >Contraseña</label>
                <div class="flex relative">
                  <input
                    :type="showPassword ? 'password' : 'text'"
                    v-model="form.password"
                    class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Contraseña"
                    style="transition: all 0.15s ease 0s"
                  />
                  <div class="absolute right-0 mr-3 mt-3">
                    <button @click="showPassword = !showPassword" type="button">
                      <svg
                        v-if="showPassword"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gris"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>

                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gris"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    v-model="form.recordarme"
                    class="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                    style="transition: all 0.15s ease 0s"
                  />
                  <span class="ml-2 text-sm font-semibold text-gray-700">Recordarme</span>
                </label>
              </div>
              <div v-if="getError" class="text-red-800 text-center">{{ getError }}</div>
              <div class="text-center mt-6">
                <button
                  class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                  type="submit"
                  style="transition: all 0.15s ease 0s"
                >Iniciar sesión</button>
                <div class="flex justify-around flex-wrap bg-black mt-6">
                  <div class="w-1/2">
                    <a href="#pablo" class="text-gray-300">
                      <small>Olvidaste tu Contraseña?</small>
                    </a>
                  </div>
                  <div class="w-1/2">
                    <RouterLink to="/register" class="text-gray-300">Crear nueva cuenta</RouterLink>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>