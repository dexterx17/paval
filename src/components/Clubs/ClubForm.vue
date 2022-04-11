<template>
    <!-- Contact Banner Section Start -->
    <div class="container" :class="paddingTop">
        <div v-if="!showForm"
            class="flex justify-center md:justify-between flex-col md:flex-row items-center bg-no-repeat bg-scroll bg-center bg-cover lg:px-100 px-10 h-300"
            :style="{ backgroundImage: `url(${videoBannerBg})` }">
            <div>
                <h4
                    class="text-white md:text-4xl lg:text-5xl xl:text-title sm:text-3xl text-2xl text-center md:text-left mb-6 md:mb-0 uppercase font-bold leading-9 lg:leading-70">
                    Clubs</h4>
                <p>Que esperas para registrar tu club</p>
            </div>
            <div>
                <button @click="initClub" class="group primary-btn opacity-100 transition-all"
                    style="background-image:url(/images/others/btn-bg.webp)">
                    {{ btnName }}
                    <img src="/images/icon/arrrow-icon.webp" alt="Arrow Icon"
                        class="ml-3 w-5 h-5 group-hover:ml-4 transition-all" />
                </button>
            </div>
        </div>

        <form @submit.prevent="submit" v-if="showForm" class="w-full max-w-lg mx-auto py-1">
            <h4 class="my-2 font-extrabold uppercase">Datos Club</h4>

            <Avatar @change-image="changeImage" :imagen="clubData.logo" label="Logo" />

            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-nombre">Nombre de Club</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-nombre" type="text" placeholder="Ej: Haku Ping Pong" v-model="clubData.nombre" />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-fecha_constitucion">Fecha de constitución</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-fecha_constitucion" type="date" placeholder="Ej: 01/15/2022"
                        v-model="clubData.fecha_constitucion" required />
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-resolucion">Resolución</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-resolucion" type="text" placeholder="Ej: ASDF#2334" v-model="clubData.resolucion"
                        required />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-city">Ciudad</label>
                    <div class="relative">
                        <select
                            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state" v-model="clubData.ciudad" required>
                            <option value="Ambato">Ambato</option>
                            <option value="Pelileo">Pelileo</option>
                            <option value="Baños">Baños</option>
                        </select>
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-sede">Sede</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-sede" type="text" placeholder="Ej: Junto al Coliseo de Deportes"
                        v-model="clubData.sede" required />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-representante">Representante</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-representante" type="text" placeholder="Ej: Naty Armas"
                        v-model="clubData.representante" />
                </div>
            </div>
            <div class="flex justify-around">
                <button type="submit">Crear Club</button>
                <button @click="showForm = false" type="button">Cancelar</button>
            </div>
        </form>
    </div>
    <!-- Contact Banner Section End -->
</template>

<script>
import { mapGetters, mapActions, useStore } from "vuex";
import { computed, ref } from "vue";
import Avatar from "@/components/Avatar.vue";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
    components: {
        Avatar
    },
    props: {
        paddingTop: String,
    },
    data() {
        return {
            videoBannerBg: "/images/bg/gaming-update.webp",
            btnName: "Nuevo Club"
        }
    },
    methods: {
        ...mapActions(["AddClub"]),
    },
    setup() {
        const store = useStore();
        const showForm = ref(false);
        const clubModel = {
            nombre: "",
            fecha_constitucion: Date(),
            resolucion: "",
            ciudad: "Ambato",
            sede: "",
            representante: "",
            imagenes: []
        };

        const clubData = ref(clubModel);

        const initClub = () => {
            console.log('initClub');
            showForm.value = true;
            clubData.value = clubModel;
        };

        const changeImage = (image) => {
            console.log('image');
            console.log(image);

            const storage = getStorage();
            const imgName = `${Date.now()}`;
            const storageRef = sRef(storage, "clubs/" + imgName);

            uploadBytes(storageRef, image)
                .then(function (snapshot) {
                    getDownloadURL(snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        clubData.value.logo = downloadURL;
                    });
                });
        }


        const submit = () => {
            console.log('addClub');
            console.log(store);
            store.dispatch('addClub', clubData.value).then((response) => {
                if (response.id) {
                    showForm.value = false;
                } else {
                    alert('error creando club');
                }

            });
        }

        return {
            clubData,
            showForm,

            initClub,
            submit,
            changeImage
        };
    },
}
</script>