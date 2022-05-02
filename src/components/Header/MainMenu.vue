<template>
    <!-- Menu Start -->
    <div class="px-8 hidden lg:block">
        <nav>
            <ul class="flex">
                <li
                    class="relative mr-14 group z-10 before:bg-nav-shape before:empty-content before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100"
                >
                    <RouterLink to="/" class="text-white uppercase font-bold font-exo relative">Home</RouterLink>
                </li>
                <li
                    class="relative mr-14 z-10 before:bg-nav-shape before:empty-content before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100"
                >
                    <RouterLink
                        to="/torneos"
                        class="text-white uppercase font-bold font-exo relative"
                    >Torneos</RouterLink>
                </li>
                <li
                    class="relative mr-14 z-10 before:bg-nav-shape before:empty-content before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100"
                >
                    <RouterLink
                        to="/clubs"
                        class="text-white uppercase font-bold font-exo relative"
                    >Clubs</RouterLink>
                </li>
                <li
                    class="relative mr-14 z-10 before:bg-nav-shape before:empty-content before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100"
                >
                    <RouterLink
                        to="/players"
                        class="text-white uppercase font-bold font-exo relative"
                    >Jugadores</RouterLink>
                </li>

                <li
                    class="relative mr-14 z-10 before:bg-nav-shape before:empty-content before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100"
                >
                    <RouterLink
                        to="/about"
                        class="text-white uppercase font-bold font-exo relative"
                    >Nosotros</RouterLink>
                </li>
                
                <!-- <li
                    class="relative mr-14 group z-10 before:bg-nav-shape before:empty-content before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100"
                >
                    <RouterLink to="/" class="text-white uppercase font-bold font-exo relative">Blog</RouterLink>
                    <ul
                        class="flex flex-col bg-white absolute w-56 px-5 py-5 rounded left-0 right-auto top-12 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all group-hover:top-9"
                    >
                        <li>
                            <RouterLink
                                to="/blog-without-sidebar"
                                class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary"
                            >Blog Without Sidebar Page</RouterLink>
                        </li>
                    </ul>
                </li> -->
                <!-- <li
                    class="relative mr-14 z-10 before:bg-nav-shape before:empty-content before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100"
                >
                    <RouterLink
                        to="/contactos"
                        class="text-white uppercase font-bold font-exo relative"
                    >Contactos</RouterLink>
                </li> -->
            </ul>
        </nav>
    </div>
    <!-- Menu End -->
</template>