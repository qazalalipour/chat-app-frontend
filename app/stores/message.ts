import { defineStore } from 'pinia'
import { messageService } from '~/services/message.service'

export const useMessageStore = defineStore('message', () => {
    const messages = ref<any[]>([])
    const loading = ref(false)
    const sending = ref(false)

    async function fetchMessages(
        roomId: any
    ) {
        loading.value = true

        try {
            const response: any = await messageService.getRoomMessages(roomId)

            messages.value = response.data.reverse()
        } finally {
            loading.value = false
        }
    }

    async function sendMessage(data: {
        room_id: number | string,
        message: string
    }) {
        sending.value = true

        try {
            const response: any = await messageService.sendMessage(data)

            return response
        } finally {
            sending.value = false
        }
    }

    function addMessage(message: any) {
        const exists = messages.value.some(
            item => item.id === message.id
        )

        if (!exists) {
            messages.value.push(message)
        }
    }

    function clear() {
        messages.value = []
    }

    return {
        messages,
        loading,
        sending,
        fetchMessages,
        sendMessage,
        addMessage,
        clear,
    }
})