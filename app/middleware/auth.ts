export default defineNuxtRouteMiddleware(async () => {
    const auth = useAuthStore()

    if (auth.token && !auth.user) {
        await auth.me()
    }

    if (!auth.user) {
        return navigateTo('/login')
    }
})