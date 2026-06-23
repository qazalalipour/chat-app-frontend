<script setup lang="ts">
const showModal = ref(false)

definePageMeta({
    middleware: ['auth'],
    layout: 'chat',
})

const roomStore = useRoomStore()

onMounted(async () => {
    await roomStore.fetchRooms()
})
</script>

<template>
    <div class="p-8">
        <div class="mb-8 flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold text-white">
                    Chat Rooms
                </h1>

                <p class="mt-2 text-slate-400">
                    Select a room to start chatting
                </p>
            </div>

            <button class="rounded-xl bg-indigo-600 px-4 py-3 text-white" @click="showModal = true">
                + Create Room
            </button>
        </div>

        <div v-if="roomStore.loading" class="text-slate-400">
            Loading rooms...
        </div>

        <div v-else class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <NuxtLink v-for="room in roomStore.rooms" :key="room.id" :to="`/rooms/${room.id}`"
                class="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-indigo-500 hover:bg-slate-800">
                <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-white">
                        {{ room.name }}
                    </h3>

                    <span class="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-400">
                        Join
                    </span>
                </div>

                <p class="mt-3 text-sm text-slate-400">
                    Enter room and start real-time chatting.
                </p>
            </NuxtLink>
        </div>
    </div>

    <ChatCreateRoomModal v-if="showModal" @close="showModal = false" />
</template>