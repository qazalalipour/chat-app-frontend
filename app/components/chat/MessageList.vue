<script setup lang="ts">
const messageStore = useMessageStore()

const messagesContainer = ref<HTMLElement | null>(null)

const scrollToBottom = async () => {
    await nextTick()

    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

watch(
    () => messageStore.messages.length,
    async () => {
        await scrollToBottom()
    }
)

onMounted(async () => {
    await scrollToBottom()
})
</script>

<template>
    <div ref="messagesContainer" class="flex-1 overflow-y-auto p-6">
        <div v-if="messageStore.loading" class="flex h-full items-center justify-center text-slate-400">
            Loading messages...
        </div>

        <div v-else-if="!messageStore.messages.length" class="flex h-full items-center justify-center text-slate-500">
            No messages yet
        </div>

        <div v-else class="flex flex-col gap-4">
            <ChatMessageItem v-for="message in messageStore.messages" :key="message.id" :message="message" />
        </div>
    </div>
</template>