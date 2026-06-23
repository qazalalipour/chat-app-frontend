<script setup lang="ts">
const emit = defineEmits<{
    close: []
}>()

const roomStore = useRoomStore()

const name = ref('')
const loading = ref(false)
const error = ref('')
const fieldErrors = ref<Record<string, string>>({})

const submit = async () => {
    error.value = ''
    fieldErrors.value = {}

    try {
        loading.value = true

        const room = await roomStore.createRoom(
            name.value
        )

        emit('close')

        await navigateTo(`/rooms/${room.id}`)
    } catch (e: any) {

        if (e.statusCode === 422 && e.data?.errors) {

            Object.entries(e.data.errors).forEach(
                ([field, messages]) => {
                    fieldErrors.value[field] =
                        Array.isArray(messages)
                            ? messages[0]
                            : String(messages)
                }
            )

        } else {

            error.value =
                e?.data?.message ??
                'Failed to create room'
        }

    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div class="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 class="mb-6 text-xl font-semibold text-white">
                Create Room
            </h2>

            <input v-model="name" placeholder="Room name..."
                class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />

            <p v-if="fieldErrors.name" class="mt-2 text-sm text-red-500">
                {{ fieldErrors.name }}
            </p>

            <p v-if="error" class="mt-2 text-sm text-red-500">
                {{ error }}
            </p>

            <div class="mt-6 flex justify-end gap-3">
                <button class="rounded-xl border border-slate-700 px-4 py-2 text-white" @click="emit('close')">
                    Cancel
                </button>

                <button :disabled="loading" class="rounded-xl bg-indigo-600 px-4 py-2 text-white" @click="submit">
                    {{
                        loading
                            ? 'Creating...'
                            : 'Create'
                    }}
                </button>
            </div>
        </div>
    </div>
</template>