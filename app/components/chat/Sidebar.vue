<script setup lang="ts">
import { MessageCircle, Plus } from 'lucide-vue-next'

const roomStore = useRoomStore()

const route = useRoute()
const router = useRouter()

onMounted(async () => {
    if (!roomStore.rooms.length) {
        await roomStore.fetchRooms()
    }
})

const activeRoomId = computed(() => Number(route.params.id))

const goToRoom = (id: number) => {
    router.push(`/rooms/${id}`)
}
</script>

<template>
    <aside class="flex h-screen w-80 flex-col border-r border-slate-800 bg-slate-900">
        <div class="border-b border-slate-800 p-5">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-xl font-bold text-white">
                        Chat Rooms
                    </h2>

                    <p class="mt-1 text-sm text-slate-400">
                        {{ roomStore.rooms.length }} rooms
                    </p>
                </div>

                <button class="rounded-xl bg-indigo-600 p-2 text-white transition hover:bg-indigo-500">
                    <Plus class="h-5 w-5" />
                </button>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto p-3">
            <div v-if="roomStore.loading" class="py-10 text-center text-slate-400">
                Loading rooms...
            </div>

            <div v-else-if="!roomStore.rooms.length" class="py-10 text-center text-slate-400">
                No rooms found
            </div>

            <div v-else class="space-y-2">
                <button v-for="room in roomStore.rooms" :key="room.id"
                    class="w-full rounded-2xl border p-4 text-left transition" :class="activeRoomId === room.id
                            ? 'border-indigo-500 bg-indigo-500/10'
                            : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                        " @click="goToRoom(room.id)">
                    <div class="flex items-start gap-3">
                        <div class="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800">
                            <MessageCircle class="h-5 w-5 text-slate-300" />
                        </div>

                        <div class="min-w-0 flex-1">
                            <div class="flex items-center justify-between gap-2">
                                <h3 class="truncate font-medium text-white">
                                    {{ room.name }}
                                </h3>
                            </div>

                            <p class="mt-1 text-xs text-slate-400">
                                Created by {{ room.user?.name }}
                            </p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </aside>
</template>