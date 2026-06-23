import { defineStore } from 'pinia'
import { roomService } from '~/services/room.service'

export const useRoomStore = defineStore('room', () => {
    const rooms = ref<any[]>([])
    const loading = ref(false)

    async function fetchRooms() {
        loading.value = true

        try {
            const response: any = await roomService.getAll()

            rooms.value = response.data
        } finally {
            loading.value = false
        }
    }

    async function createRoom(name: string) {
        const response: any = await roomService.create({
            name,
        })

        rooms.value.unshift(response.data)

        return response.data
    }

    return {
        rooms,
        loading,
        fetchRooms,
        createRoom,
    }
})