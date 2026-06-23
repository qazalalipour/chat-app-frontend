export const useApi = () => {
    const auth = useAuthStore()

    return $fetch.create({
        baseURL: 'http://localhost:8000',

        onRequest({ options }) {
            if (auth.token) {
                options.headers.set(
                    'Authorization',
                    `Bearer ${auth.token}`
                )
            }
        }
    })
}