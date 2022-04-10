<template>
    <div class="popup-mobile-menu popup-mobile-visiable" id="offcanvas-menu">
        <div
            class="mobile-menu-overlay"
            @click="mobiletoggleClass('removeClass', 'show-mobile-menu')"
        ></div>
        <div
            class="bg-white w-300 h-full left-0 top-0 absolute text-left transition-all py-8 px-5 overflow-y-scroll"
        >
            <div class="flex justify-between pb-8">
                <!-- Button Start -->
                <RouterLink
                    v-if="!isUserAuth"
                    to="/login"
                    style="background-image:url(/images/others/btn-signup.webp);"
                    class="signup-btn transition-all group"
                >
                    INGRESAR
                    <img
                        class="w-4 h-4 ml-2 group-hover:ml-3 transition-all"
                        src="/images/icon/arrrow-icon2.webp"
                        alt="Arrow Icon"
                    />
                </RouterLink>
                <!-- Button End -->
                
                <ProfileButton v-else />

                <button
                    class="icofont-close-line z-999 font-bold text-3xl text-black hover:text-primary transition-all transform hover:rotate-90"
                    @click="mobiletoggleClass('removeClass', 'show-mobile-menu')"
                ></button>
            </div>
            <div class="menu-content">
                <MobileNavigation />
            </div>
        </div>
    </div>
</template>

<script>
import MobileNavigation from '@/components/Header/MobileNavigation.vue';
import ProfileButton from '@/components/Button/ProfileButton.vue';

import { mapGetters } from "vuex";

export default {
    components: {
        MobileNavigation,
        ProfileButton
    },
    computed: {
        ...mapGetters(["isUserAuth"]),
    },
    methods: {
        // offcanvas menu close
        mobiletoggleClass(addRemoveClass, className) {
            const el = document.querySelector('#offcanvas-menu');
            if (addRemoveClass === 'addClass') {
                el.classList.add(className);
            } else {
                el.classList.remove(className);
            }
        }
    }
};
</script>