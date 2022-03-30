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

                <li class="menu-item-has-children relative block">
                    <RouterLink
                        class="text-base font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                        to="/"
                    >Match</RouterLink>
                    <ul class="sub-menu ml-5">
                        <li>
                            <RouterLink
                                class="text-sm font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                                to="/match"
                            >Match Page</RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="text-sm font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                                to="/match/1"
                            >Match Details</RouterLink>
                        </li>
                    </ul>
                </li>

                <li class="menu-item-has-children relative block">
                    <RouterLink
                        class="text-base font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                        to="/"
                    >Pages</RouterLink>
                    <ul class="sub-menu ml-5">
                        <li>
                            <RouterLink
                                class="text-sm font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                                to="/about"
                            >About Us</RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="text-sm font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                                to="/game"
                            >All Games</RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="text-sm font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                                to="/game/1"
                            >Game Details</RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="text-sm font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                                to="/player"
                            >Players</RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="text-sm font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                                to="/player/1"
                            >Player Details</RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="text-sm font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                                to="/FAQ"
                            >FAQ</RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="text-sm font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                                to="/404Error"
                            >404-Error</RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="text-sm font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                                to="/signup"
                            >SignUp</RouterLink>
                        </li>
                    </ul>
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
                        <li>
                            <RouterLink
                                class="text-sm font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                                to="/blog-right-sidebar"
                            >Blog Right Sidebar</RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="text-sm font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                                to="/blog-left-sidebar"
                            >Blog Left Sidebar</RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="text-sm font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                                to="/blog-grid-right-sidebar"
                            >Blog Grid Right Sidebar</RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="text-sm font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                                to="/blog-grid-left-sidebar"
                            >Blog Grid Left Sidebar</RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="text-sm font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                                to="/blog-grid-without-sidebar"
                            >Blog Grid Without Sidebar</RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                class="text-sm font-semibold capitalize block pb-4 pt-4 border-b-1 border-gray-200 transition-all hover:text-primary text-black"
                                to="/blog/1"
                            >Blog Details</RouterLink>
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