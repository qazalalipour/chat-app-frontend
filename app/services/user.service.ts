export const userService = {
    async users(){
        const api = useApi()

        try {
            return await api('/api/users', {
                method: 'GET'
            })
        } catch (error: any) {
            throw {
                statusCode: error.response?.status || 500,
                data: error.data
            }
        }
    }
}