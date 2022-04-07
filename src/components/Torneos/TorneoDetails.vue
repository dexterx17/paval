<template>
    <div class="container">
        <p class="date text-primary font-bold mb-3 flex justify-between">
            <span>
                <span class="capitalize">{{ formatDate(match.fecha, { weekday: "long" }) }},</span>
                {{ formatDate(match.fecha) }}
                {{ match.hora }}
            </span>
            <span>
                <i class="text-xs"></i>
                <span>{{ match.ciudad }}</span>
                <small class="px-1">{{ match.lugar }}</small>
            </span>
        </p>
        <h2
            class="text-white font-bold uppercase xl:text-title lg:text-5xl md:text-4xl sm:text-3xl text-2xl xl:leading-70 lg:leading-12 leading-10"
        >{{ match.nombre }}</h2>
        <div class="content-details">
            <div class="description mt-6">
                <p class="leading-8">El tiempo de espera es de {{ match.tiempo_espera }} minutos.</p>
            </div>
            <blockquote class="py-5 mb-5">
                <p class="font-bold text-yellow italic lg:text-3xl text-xl">
                    El ganador de cada partido será el mejor en
                    3 de 5 set.
                </p>
            </blockquote>
            <div class="description mt-6">
                <p class="leading-8">...</p>
            </div>
        </div>

    </div>
</template>

<script>


export default {
    props: ["match"],

    methods: {
        formatDate(value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) {
            if (!value) return value
            return new Intl.DateTimeFormat('es-ES', formatting).format(new Date(value))
        }
    },
}
</script>