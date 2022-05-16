<template>
        <form @submit.prevent="submit" class="w-full max-w-lg mx-auto py-1">
            <h4 class="my-2 font-extrabold uppercase text-primary text-center">Datos Categoría</h4>

            <Avatar @change-image="changeImage" :imagen="serieData.logo" label="Badge" />

            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3 mb-2 md:mb-0">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-nombre-serie"
                    >Nombre de Categoría</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-nombre-serie"
                        type="text"
                        placeholder="Ej: A"
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

            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full px-3 mb-2 md:mb-0">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-nombre-serie"
                    >Puntajes por posición en esta categoría</label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-nombre-serie"
                        type="text"
                        placeholder="Ej: 200,180,160,140"
                        v-model="serieData.puntajes"
                    />
                </div>
            </div>
            <div v-if="procesandoForm" class="flex justify-center w-full">
                <h2 class="text-primary">Procesando...</h2>
            </div>
            <div v-else class="flex justify-around">
                <button
                    style="background-image:url(/images/others/btn-signup.webp);"
                    class="signup-btn transition-all"
                    type="submit"
                >Actualizar Categoría</button>
                <button
                    class="signup-btn transition-all border-gray-200 border rounded-2xl"
                    @click="$emit('hide-modal')"
                    type="button"
                >Cancelar</button>
            </div>
        </form>
</template>


<script>
import { mapGetters, mapActions, useStore } from "vuex";
import { computed, ref, watch } from "vue";

import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";

import { useRoute } from 'vue-router'
import Avatar from "@/components/Avatar.vue";

export default {
    components: {
        Avatar
    },
    props: {
        paddingTop: String,
        serieData: Object
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
    setup(props,{emit}) {
        const store = useStore();
        const route = useRoute();

        const procesandoForm = ref(false);
        

        //const serieData = ref(props.serie);

        watch(props.serieData, ()=>{
            initSerie();
        });

        const initSerie = () => {
            console.log('initSerie');
            
            //serieData.value = props.serie;
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
                        props.serieData.logo = downloadURL;
                    });
                });

        }

        const submit = () => {
            procesandoForm.value = true;
            console.log('updateSerie');
            console.log(props.serieData);
            props.serieData.puntajes = props.serieData.puntajes.split(',')
            store.dispatch('updateSerie', props.serieData).then((response) => {
                procesandoForm.value = false;
                emit('hide-modal')
                console.log('response');
                console.log(response);
            });
        }

        return {
            //serieData,
            procesandoForm,

            initSerie,
            submit,
            changeImage
        };
    },
}
</script>