<template>
    <!-- Contact Banner Section Start -->
    <div class="container" :class="paddingTop">
        <div
            v-if="!showForm"
            class="flex justify-center md:justify-between flex-col md:flex-row items-center bg-no-repeat bg-scroll bg-center bg-cover lg:px-100 px-10 h-300"
            :style="{ backgroundImage: `url(${videoBannerBg})` }"
        >
            <div>
                <h4
                    class="text-white md:text-4xl lg:text-5xl xl:text-title sm:text-3xl text-2xl text-center md:text-left mb-6 md:mb-0 uppercase font-bold leading-9 lg:leading-70"
                >
                    Series
                </h4>
                <p>Cada club puede tener varias series</p>
            </div>
            <div>
                <button
                    @click="initSerie"
                    class="group primary-btn opacity-100 transition-all"
                    style="background-image:url(/images/others/btn-bg.webp)"
                >
                    {{ btnName }}
                    <img
                        src="/images/icon/arrrow-icon.webp"
                        alt="Arrow Icon"
                        class="ml-3 w-5 h-5 group-hover:ml-4 transition-all"
                    />
                </button>
            </div>
        </div>

        <form @submit.prevent="submit" v-if="showForm" class="w-full max-w-lg mx-auto py-1">
            <h4 class="my-2 font-extrabold uppercase">Datos Serie</h4>
            
            <Avatar @change-image="changeImage" :imagen="clubData.avatar" label="Badge" />

            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3 mb-2 md:mb-0">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-nombre"
                    >Nombre de Serie</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-nombre"
                        type="text"
                        placeholder="Ej: Haku Ping Pong"
                        v-model="serieData.nombre"
                    />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-1">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-min_integrantes"
                    >Mínimo Integrantes</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-min_integrantes"
                        type="number"
                        placeholder="Ej: 8"
                        v-model="serieData.min_integrantes"
                        required
                    />
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-max_integrantes"
                    >Máximo Integrantes</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-max_integrantes"
                        type="number"
                        placeholder="Ej: 14"
                        v-model="serieData.max_integrantes"
                        required
                    />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3 mb-6 md:mb-0">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-prioridad"
                    >Prioridad</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-prioridad"
                        type="number"
                        placeholder="Ej: 1"
                        v-model="serieData.prioridad"
                    />
                </div>
            </div>
            <div class="flex justify-around">
                <button type="submit">Crear Serie</button>
                <button @click="showForm = false" type="button">Cancelar</button>
            </div>
        </form>
    </div>
    <!-- Contact Banner Section End -->
</template>

<script>
import { mapGetters, mapActions, useStore } from "vuex";
import { computed, ref } from "vue";

import { getStorage, ref as sRef, uploadBytes, getDownloadURL  } from "firebase/storage";

import { useRoute } from 'vue-router'
import Avatar from "@/components/Avatar.vue";

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
            btnName: "Nueva Serie"
        }
    },
    methods: {
        ...mapActions(["AddSerie"]),
    },
    setup() {
        const store = useStore();
        const route = useRoute();

        const showForm = ref(false);
        const serieModel = {
            club: route.params.id,
            nombre: "",
            max_integrantes: null,
            min_integrantes: null,
            relevancia: null
        };

        const serieData = ref(serieModel);

        const initSerie = () => {
            console.log('initSerie');
            showForm.value = true;
            serieData.value = serieModel;
        };

        const changeImage = (image) => {
            console.log('image');
            console.log(image);

            const storage = getStorage();
            const imgName = `${Date.now()}`;
            const storageRef = sRef(storage, "series/" + imgName);
    
            uploadBytes(storageRef, image)
            .then(function (snapshot) {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    serieData.value.logo = downloadURL;
                });
            });

        }

        const submit = () => {
            console.log('addSerie');
            console.log(store);
            store.dispatch('addSerie', serieData.value).then((response) => {
                console.log('response');
                console.log(response);
            });
        }

        return {
            serieData,
            showForm,

            initSerie,
            submit,
            changeImage
        };
    },
}
</script>