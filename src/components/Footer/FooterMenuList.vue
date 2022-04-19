<template>
    <!-- Footer Menu Start -->
    <div class="xl:pl-16">
        <FooterWidgetTitle :title="title" />
        <ul class="flex flex-col">
            <li v-for="(link, index) in links" :key="index" class="mb-4 last:mb-0">
                <RouterLink
                    :to="link.pageLink"
                    class="text-white transition-all hover:text-primary"
                >{{ link.className }}</RouterLink>
            </li>
        </ul>
    </div>

    <!-- Footer Menu End -->
</template>
<script>
import FooterWidgetTitle from '@/components/Footer/FooterWidgetTitle.vue';

export default {
    components: {
        FooterWidgetTitle,
    },
    data() {
        return {
            title: "Content",
            links: [
                {
                    pageLink: "/about",
                    className: "Copywriting"
                },
                {
                    pageLink: "/contactos",
                    className: "Social Media"
                },
                {
                    pageLink: "/contactos",
                    className: "Interactive Media"
                },
                {
                    pageLink: "/about",
                    className: "Motion Design"
                },
                {
                    pageLink: "/content",
                    className: "Illustration"
                }
            ]
        }
    }
}
</script>