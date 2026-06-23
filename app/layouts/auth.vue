<script setup lang="ts"></script>

<template>
    <div class="min-h-screen bg-slate-950">
        <div class="grid min-h-screen lg:grid-cols-2">
            <div
                class="hidden lg:flex flex-col justify-center bg-linear-to-br from-indigo-600 via-violet-600 to-sky-500 p-16 text-white">
                <h1 class="mb-6 text-5xl font-bold">
                    Real-Time Chat
                </h1>

                <p class="max-w-md text-lg text-white/80">
                    Secure, scalable and real-time messaging powered by Laravel Reverb,
                    Redis and Nuxt.
                </p>
            </div>

            <div class="flex items-center justify-center p-6">
                <slot />
            </div>
        </div>
    </div>
</template>