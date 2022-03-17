<script>

import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";


export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
        .then((data) => {
          // Signed in 
          const user = data.user;
          console.log('registrado');
          console.log('data',data);
          updateProfile(user,{
              displayName: this.form.name,
              variable: 'vasd'
            })
            .then(() => {
              this.$router.replace({ name: "dashboard" });
            }).catch((error) => {
              console.log('fallo profile');
              console.log(error);
            });
          // ...
        })
        .catch((error) => {
          console.log('error');
          console.log(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          this.error = error.message;
          // ..
        });

    }
  }
};
</script>

<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full px-4">
        <div
          class="
            relative
            flex flex-col
            min-w-0
            break-words
            w-full
            mb-6
            shadow-lg
            rounded-lg
            bg-gray-300
            border-0
          "
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-gray-600 text-sm font-bold">Registrate con </h6>
            </div>
            <div class="btn-wrapper text-center">
              <button
                class="
                  bg-white
                  active:bg-gray-100
                  text-gray-800
                  font-normal
                  px-4
                  py-2
                  rounded
                  outline-none
                  focus:outline-none
                  mr-2
                  mb-1
                  uppercase
                  shadow
                  hover:shadow-md
                  inline-flex
                  items-center
                  font-bold
                  text-xs
                "
                type="button"
                style="transition: all 0.15s ease 0s"
              >
                <img
                  alt="..."
                  class="w-5 mr-1"
                  src="../assets/img/github.svg"
                />Github</button
              ><button
                class="
                  bg-white
                  active:bg-gray-100
                  text-gray-800
                  font-normal
                  px-4
                  py-2
                  rounded
                  outline-none
                  focus:outline-none
                  mr-1
                  mb-1
                  uppercase
                  shadow
                  hover:shadow-md
                  inline-flex
                  items-center
                  font-bold
                  text-xs
                "
                type="button"
                style="transition: all 0.15s ease 0s"
              >
                <img
                  alt="..."
                  class="w-5 mr-1"
                  src="../assets/img/google.svg"
                />Google
              </button>
            </div>
            <hr class="mt-6 border-b-1 border-gray-400" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-gray-500 text-center mb-3 font-bold">
              <small>O registrate con tus credenciales</small>
            </div>
            <form @submit.prevent="submit">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                  >Nombre</label
                ><input
                  type="text"
                  v-model="form.name"
                  class="
                    border-0
                    px-3
                    py-3
                    placeholder-gray-400
                    text-gray-700
                    bg-white
                    rounded
                    text-sm
                    shadow
                    focus:outline-none focus:ring
                    w-full
                  "
                  placeholder="Nombre"
                  style="transition: all 0.15s ease 0s"
                  required
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                  >Correo electrónico</label
                ><input
                  type="email"
                  v-model="form.email"
                  class="
                    border-0
                    px-3
                    py-3
                    placeholder-gray-400
                    text-gray-700
                    bg-white
                    rounded
                    text-sm
                    shadow
                    focus:outline-none focus:ring
                    w-full
                  "
                  placeholder="Correo electrónico"
                  style="transition: all 0.15s ease 0s"
                  required
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                  >Contraseña</label
                ><input
                  type="password"
                  v-model="form.password"
                  class="
                    border-0
                    px-3
                    py-3
                    placeholder-gray-400
                    text-gray-700
                    bg-white
                    rounded
                    text-sm
                    shadow
                    focus:outline-none focus:ring
                    w-full
                  "
                  placeholder="Contraseña"
                  style="transition: all 0.15s ease 0s"
                  required
                />
              </div>
              <div class="text-center mt-6">
                <button
                  class="
                    bg-gray-900
                    text-white
                    active:bg-gray-700
                    text-sm
                    font-bold
                    uppercase
                    px-6
                    py-3
                    rounded
                    shadow
                    hover:shadow-lg
                    outline-none
                    focus:outline-none
                    mr-1
                    mb-1
                    w-full
                  "
                  type="submit"
                  style="transition: all 0.15s ease 0s"
                >
                  Registrarme
                </button>
                <div class="flex justify-around flex-wrap bg-black mt-6">
                  <div class="w-1/2">
                   Ya tienes una cuenta?
                  </div>
                  <div class="w-1/2 ">
                    <RouterLink to="/login" class="text-gray-300">
                      Iniciar sesión
                    </RouterLink>

                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>