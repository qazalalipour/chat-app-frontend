export const messageService = {
    async getRoomMessages(roomId: number | string, page = 1) {
        const api = useApi()

        try {
            return await api(`/api/rooms/${roomId}/messages?page=${page}`)
        } catch (error: any) {
            throw {
                statusCode: error.response?.status || 500,
                data: error.data
            }
        }
    },

    async sendMessage(data: {
        room_id: number | string,
        message: string
    }) {
        const api = useApi()

        try {
            return await api(`/api/messages`, {
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