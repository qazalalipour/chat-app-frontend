<script setup lang="ts">
import { SendHorizontal, LoaderCircle } from 'lucide-vue-next'

const props = defineProps<{
    roomId: any
}>()

const messageStore = useMessageStore()

const text = ref('')

const send = async () => {
    if (!text.value.trim() || !props.roomId) return

    await messageStore.sendMessage({
        room_id: props.roomId,
        message: text.value
    })

    text.value = ''
}
</script>

<template>
    <div class="border-t border-slate-800 p-4">
        <form class="flex items-center gap-3" @submit.prevent="send">
            <input v-model="text" type="text" placeholder="Type a message..." :disabled="messageStore.sending"
                class="flex-1 rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-white outline-none transition focus:border-indigo-500 disabled:opacity-50">

            <button type="submit" :disabled="messageStore.sending ||
                !text.trim()
                "
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50">
                <LoaderCircle v-if="messageStore.sending" class="h-5 w-5 animate-spin" />

                <SendHorizontal v-else class="h-5 w-5" />
            </button>
        </form>
    </div>
</template>