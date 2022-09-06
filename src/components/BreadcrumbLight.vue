<template>
    <!-- Breadcrumb Start -->
    <div
        class="flex items-center relative bg-no-repeat bg-scroll bg-center bg-cover md:mb-20 mb-15 h-40 lg:h-60"
        style="background-image:url(/images/bg/hero-bg3.png);"
    >
        <div class="container">
            <div
                class="relative pt-20 z-10 flex justify-between items-end text-center"
            >
                <h1
                    class="text-white font-metal uppercase font-normal lg:text-5.5xl md:text-7xl text-5xl tracking-wide mb-6 text-shadow"
                    v-if="BreadcrumbTitle"
                >{{ BreadcrumbTitle }}</h1>

                <ul class="flex">
                    <li>
                        <RouterLink
                            class="text-white uppercase text-base sm:text-lg font-bold mr-2 transition-all hover:text-primary"
                            to="/"
                        >Home</RouterLink>
                    </li>
                    <li>
                        <span class="text-white uppercase text-base sm:text-lg font-bold mr-2">//</span>
                    </li>
                    <li>
                        <span
                            class="text-primary uppercase text-base sm:text-lg font-bold"
                            v-if="BreadcrumbSubTitle"
                        >{{ BreadcrumbSubTitle }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Breadcrumb End -->
</template>

<script>
export default {
    props: {
        BreadcrumbTitle: {
            type: String,
            required: false,
        },
        BreadcrumbSubTitle: {
            type: String,
            required: false,
        }
    },
    components: {
    }
};
</script>