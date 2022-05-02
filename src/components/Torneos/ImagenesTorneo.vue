<script>
import { mapGetters, mapActions, useStore } from "vuex";

import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";

import ImagesUploader from "@/components/ImagesUploader.vue";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


export default {
    components: {
        ImagesUploader
    },
    props: ['torneo'],
    setup(props, { emit }) {
        const store = useStore();

        const changeImage = (image) => {
            console.log('image');
            console.log(image);

            const storage = getStorage();
            const imgName = `${Date.now()}`;
            const storageRef = sRef(storage, `torneos/${props.torneo.id}/${imgName}`);

            uploadBytes(storageRef, image)
                .then(function (snapshot) {
                    getDownloadURL(snapshot.ref).then((downloadURL) => {
                        console.log('Imagen torneo at', downloadURL);
                        store.dispatch('addImageTorneo', {
                            torneo_id: props.torneo.id,
                            imagenURL: downloadURL
                        })
                            .then((response) => {
                                if (response.id) {
                                    console.log('ok', response);
                                    Swal.fire(
                                        'Imagen cargada!',
                                        'La imagen ha sido subida correctamente.',
                                        'success'
                                    )
                                    emit('imagen-cargada', response);
                                } else {
                                    alert('error creando club');
                                }

                            });
                    });
                });
        }

        return {
            changeImage
        };
    }
}

</script>

<template>
    <div>
        <ImagesUploader @change-image="changeImage" :imagenes="[]" label="Imagenes Torneo" />
    </div>
</template>