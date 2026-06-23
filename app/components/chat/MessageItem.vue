<script setup lang="ts">
const props = defineProps<{
    message: any
}>()

const authStore = useAuthStore()

const isMine = computed(() => {
    return authStore.user?.id === props.message.user.id
})
</script>

<template>
    <div class="flex" :class="isMine ? 'justify-end' : 'justify-start'">
        <div class="max-w-md rounded-2xl px-4 py-3" :class="isMine
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-100'
            ">
            <div v-if="!isMine" class="mb-1 text-xs font-semibold text-indigo-400">
                {{ message.user.name }}
            </div>

            <p class="wrap-break-word">
                {{ message.message }}
            </p>

            <div class="mt-2 text-right text-xs opacity-70">
                {{ new Date(message.created_at).toLocaleTimeString() }}
            </div>
        </div>
    </div>
</template>