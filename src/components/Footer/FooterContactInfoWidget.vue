<template>
    <div class>
        <FooterWidgetTitle :title="title" />
        <div class="flex flex-col mb-5 pr-5 xl:pr-0">
            <span class="text-primary mb-3">Ubicación:</span>
            <p>Ambato</p>
        </div>
        <div class="flex flex-col">
            <span class="text-primary mb-3">Teléfono:</span>
            <a
                :href="`tel:${phone}`"
                class="text-white hover:text-primary transition-all"
            >{{ phone }}</a>
        </div>
    </div>
</template>
<script>
import FooterWidgetTitle from '@/components/Footer/FooterWidgetTitle.vue';

export default {
    components: {
        FooterWidgetTitle,
    },
    data() {
        return {
            title: "Contacto",
            phone: "(593) 983706086"
        }
    },
}
</script>