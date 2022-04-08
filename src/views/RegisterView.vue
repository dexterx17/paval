<script>
import { mapActions } from "vuex";
import { ref } from 'vue'

import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      BreadcrumbTitle: "Registrate",
      BreadcrumbSubTitle: "Registro",
      form: {
        name: "",
        email: "",
        password: ""
      },
      error: null,
    };
  },
  setup() {
    const showPassword = ref(false);
    const procesando = ref(false);
    return {
      showPassword,
      procesando
    };
  },
  methods: {
    ...mapActions(["signUpAction"]),
    submit() {
      this.procesando = true;
      this.signUpAction({
        email: this.form.email,
        password: this.form.password,
        name: this.form.name,
      }).then((response) => {
        this.procesando = false;
        console.log('response');
        console.log(response);
        if (response.user) {
          this.$router.replace({ name: "profile" });
        }
      });
    }
  }
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
            <div class="btn-wrapper text-center">
              <button
                class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                type="button"
                style="transition: all 0.15s ease 0s"
              >
                <img alt="Registrate con Github" class="w-5 mr-1" src="../assets/img/github.svg" />Github
              </button>
              <button
                class="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                type="button"
                style="transition: all 0.15s ease 0s"
              >
                <img alt="Registrate con Gmail" class="w-5 mr-1" src="../assets/img/google.svg" />Google
              </button>
            </div>
            <hr class="mt-6 border-b-1 border-gray-400" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <!-- <div class="text-gray-500 text-center mb-3 font-bold">
              <small>O registrate con tus credenciales</small>
            </div>-->
            <form id="contact-form" class="flex flex-col max-w-lg mx-auto" @submit.prevent="submit">
              <div class="single-fild">
                <input
                  type="text"
                  v-model="form.name"
                  class="px-6 h-14 mb-6 text-white border-secondary-80 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
                  placeholder="Nombre"
                  required
                />
              </div>
              <div class="single-fild">
                <input
                  type="email"
                  v-model="form.email"
                  class="px-6 h-14 mb-6 text-white border-secondary-80 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
                  placeholder="Correo electrónico"
                  required
                />
              </div>
              <div class="single-fild">
                <div class="flex relative">
                  <input
                    :type="showPassword ? 'password' : 'text'"
                    v-model="form.password"
                    class="px-6 h-14 mb-6 text-white border-secondary-80 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
                    placeholder="Contraseña"
                    style="transition: all 0.15s ease 0s"
                    required
                  />
                  <div class="absolute right-0 mr-3 mt-4">
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
              <div class="single-fild col-span-2">
                <div v-if="procesando">
                  <h2>Procesando...</h2>
                </div>
                <div v-else class="form-btn-wrap flex justify-center w-full mt-4">
                  <button
                    type="submit"
                    value="submit"
                    name="submit"
                    class="form-btn group primary-btn opacity-100 transition-all"
                    style="background-image:url(/images/others/btn-bg.webp)"
                  >
                    Registrarme
                    <img
                      src="/images/icon/arrrow-icon.webp"
                      alt="Arrow Icon"
                      class="ml-3 w-5 h-5 group-hover:ml-4 transition-all"
                    />
                  </button>
                  <p class="form-messege"></p>
                </div>
              </div>
            </form>
          </div>

          <!-- Contact Banner Section Start -->
          <div class="container pt-0">
            <div
              class="flex justify-center md:justify-between flex-col md:flex-row items-center bg-no-repeat bg-scroll bg-center bg-cover lg:px-100 px-10 h-300"
              :style="{ backgroundImage: `url(/images/bg/gaming-update.webp)` }"
            >
              <div>
                <h2
                  class="text-white md:text-4xl lg:text-5xl xl:text-title sm:text-3xl text-2xl text-center md:text-left mb-6 md:mb-0 uppercase font-bold leading-9 lg:leading-70"
                >Ya tienes cuenta</h2>
              </div>
              <div>
                <RouterLink
                  to="/login"
                  class="group primary-btn opacity-100 transition-all"
                  style="background-image:url(/images/others/btn-bg.webp)"
                >
                  Iniciar sesión
                  <img
                    src="/images/icon/arrrow-icon.webp"
                    alt="Arrow Icon"
                    class="ml-3 w-5 h-5 group-hover:ml-4 transition-all"
                  />
                </RouterLink>
              </div>
            </div>
          </div>
          <!-- Contact Banner Section End -->
        </div>
      </div>
    </div>
  </div>
</template>