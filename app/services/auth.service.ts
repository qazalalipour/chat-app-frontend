export const authService = {
    async login(data: { email: string; password: string }) {
        const api = useApi()
        try {
            return await api('/api/login', {
                method: 'POST',
                body: data,
            })
        } catch (error: any) {
            throw {
                statusCode: error.response?.status || 500,
                data: error.data
            }
        }
    },

    async register(data: { name: string; email: string; password: string }) {
        const api = useApi()
        try {
            return await api('/api/register', {
                method: 'POST',
                body: data,
            })
        } catch (error: any) {
            throw {
                statusCode: error.response?.status || 500,
                data: error.data
            }
        }
    },

    async me() {
        const api = useApi()
        try {
            return await api('/api/me', {
                method: 'GET'
            })
        } catch (error: any) {
            throw {
                statusCode: error.response?.status || 500,
                data: error.data
            }
        }
    },
}