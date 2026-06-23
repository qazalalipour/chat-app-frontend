<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
    layout: 'chat',
})

const { $echo } = useNuxtApp()

const route = useRoute()

const roomId = computed(() => Number(route.params.id))

const roomStore = useRoomStore()
const messageStore = useMessageStore()
const auth = useAuthStore()

let channel: any = null

const joinRoom = () => {
    $echo.connector.options.auth.headers.Authorization =
        `Bearer ${auth.token}`

    $echo
        .private(`room.${roomId.value}`)
        .listen('.message.sent', (event: any) => {
            messageStore.messages.push(event)
        })
}

const leaveRoom = () => {
    if (channel) {
        $echo.leave(`private-room.${roomId.value}`)
        channel = null
    }
}

onMounted(async () => {
    await Promise.all([
        roomStore.fetchRooms(),
        messageStore.fetchMessages(roomId.value),
    ])

    joinRoom()
})

watch(
    () => route.params.id,
    async (newRoomId) => {
        leaveRoom()

        messageStore.clear()

        await messageStore.fetchMessages(Number(newRoomId))

        joinRoom()
    }
)

onBeforeUnmount(() => {
    leaveRoom()
    messageStore.clear()
})
</script>

<template>
    <div class="flex h-full flex-col">
        <div class="border-b border-slate-800 p-4">
            <h1 class="text-lg font-semibold">
                Room #{{ roomId }}
            </h1>
        </div>

        <ChatMessageList />

        <ChatMessageInput :room-id="roomId" />
    </div>
</template>