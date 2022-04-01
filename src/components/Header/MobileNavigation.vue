<template>
    <div class="mobile-navigation">
        <nav class="offcanvas-navigation" id="offcanvas-navigation">
            <ul>
                <li class="menu-item-has-children">
                    <RouterLink
                        class="text-base font-semibold capitalize block pb-4 pt-4 pt- border-b-1 border-gray-200 transition-all hover:text-primary text-black text-dark"
                        to="/"
                    >Home</RouterLink>
                </li>

                <li>
                    <RouterLink
                        class="text-base font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                        to="/torneos"
                    >Torneos</RouterLink>
                </li>

                <li>
                    <RouterLink
                        class="text-base font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                        to="/clubs"
                    >Clubs</RouterLink>
                </li>


                <li class="menu-item-has-children relative block">
                    <RouterLink
                        class="text-base font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                        to="/blog"
                    >Blog</RouterLink>
                    <ul class="sub-menu ml-5">
                        <li>
                            <RouterLink
                                class="text-sm font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                                to="/blog-without-sidebar"
                            >Blog Without Sidebar Page</RouterLink>
                        </li>
                    </ul>
                </li>

                <li>
                    <RouterLink
                        class="text-base font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                        to="/contact"
                    >Contact Us</RouterLink>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default{
        name: 'MobileNavMenu',
        mounted() {
            const offCanvasNav = document.querySelector('#offcanvas-navigation');
            const offCanvasNavSubMenu = offCanvasNav.querySelectorAll('.sub-menu');
            const anchorLinks = offCanvasNav.querySelectorAll('a');

            for (let i = 0; i < offCanvasNavSubMenu.length; i++){
                offCanvasNavSubMenu[i].insertAdjacentHTML("beforebegin", "<span class='menu-expand'><i class='plus-minus'></i></span>");
            }
        
            const menuExpand = offCanvasNav.querySelectorAll('.menu-expand');
            const numMenuExpand = menuExpand.length;
        
            for (let i = 0; i < numMenuExpand; i++) {
                menuExpand[i].addEventListener("click", (e) => {sideMenuExpand(e)});
            }
        
            for (let i = 0; i < anchorLinks.length; i++) {
                anchorLinks[i].addEventListener("click", () => {closeMobileMenu()});
            }

            const sideMenuExpand = (e) => {
                e.currentTarget.parentElement.classList.toggle('active');
            }
            const closeMobileMenu = () => {
                const offcanvasMobileMenu = document.querySelector('#offcanvas-mobile-menu');
                offcanvasMobileMenu?.classList.remove('active');
            }
        }
    };
</script>