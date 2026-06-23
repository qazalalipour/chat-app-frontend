<script setup lang="ts">
import { LoaderCircle, Mail, Lock } from 'lucide-vue-next'

definePageMeta({
    layout: 'auth',
})

const router = useRouter()

const authStore = useAuthStore()

const form = reactive({
    email: '',
    password: '',
})

const submit = async () => {
    authStore.clearErrors()

    const result = await authStore.login({
        email: form.email,
        password: form.password,
    })

    if (result.success) {
        router.push('/')
    }
    if (!result.success && result.statusCode === 404) {
        return navigateTo('/register')
    }
}
onMounted(() => {
    authStore.clearErrors()
})
</script>

<template>
    <div class="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div class="mb-8 text-center">
            <h2 class="text-3xl font-bold text-white">
                Welcome back
            </h2>

            <p class="mt-2 text-slate-400">
                Sign in to continue chatting
            </p>
        </div>

        <form class="space-y-5" @submit.prevent="submit">
            <div v-if="authStore.generalError"
                class="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                {{ authStore.generalError }}
            </div>

            <div>
                <label class="mb-2 block text-sm text-slate-300">
                    Email
                </label>

                <div class="relative">
                    <Mail class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                    <input v-model="form.email" type="email" placeholder="john@example.com" :class="[
                        'w-full rounded-xl border bg-slate-800 py-3 pl-12 pr-4 text-white outline-none transition',
                        authStore.getFieldError('email')
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-slate-700 focus:border-indigo-500'
                    ]">
                </div>

                <p v-if="authStore.getFieldError('email')" class="mt-2 text-sm text-red-400">
                    {{ authStore.getFieldError('email') }}
                </p>
            </div>

            <div>
                <label class="mb-2 block text-sm text-slate-300">
                    Password
                </label>

                <div class="relative">
                    <Lock class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                    <input v-model="form.password" type="password" placeholder="••••••••" :class="[
                        'w-full rounded-xl border bg-slate-800 py-3 pl-12 pr-4 text-white outline-none transition',
                        authStore.getFieldError('password')
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-slate-700 focus:border-indigo-500'
                    ]">
                </div>

                <p v-if="authStore.getFieldError('password')" class="mt-2 text-sm text-red-400">
                    {{ authStore.getFieldError('password') }}
                </p>
            </div>

            <button type="submit" :disabled="authStore.loading"
                class="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50">
                <LoaderCircle v-if="authStore.loading" class="h-5 w-5 animate-spin" />

                <span>
                    {{
                        authStore.loading
                            ? 'Signing in...'
                            : 'Sign in'
                    }}
                </span>
            </button>
        </form>

        <p class="text-center text-sm text-slate-400 mt-6">
            Don't have an account?

            <NuxtLink to="/register" class="font-medium text-indigo-400 hover:text-indigo-300">
                Create one
            </NuxtLink>
        </p>
    </div>
</template>