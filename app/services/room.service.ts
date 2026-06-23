export const roomService = {
    async getAll() {
        const api = useApi()

        try {
            return await api('/api/rooms', {
                method: 'GET'
            })
        } catch (error: any) {
            throw {
                statusCode: error.response?.status || 500,
                data: error.data
            }
        }
    },

    async create(data: { name: string }) {
        const api = useApi()

        try {
            return await api(`/api/rooms`, {
                method: 'POST',
                body: data
            })
        } catch (error: any) {
            throw {
                statusCode: error.response?.status || 500,
                data: error.data
            }
        }
    }
}