<script setup lang="ts"></script>

<template>
    <div class="flex h-screen bg-slate-950 text-white">
        <ChatSidebar />

        <main class="flex flex-1 flex-col overflow-hidden">
            <slot />
        </main>
    </div>
</template>