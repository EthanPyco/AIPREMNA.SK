<script setup lang="ts">
const navLinks = [
  { to: '/tahak', label: 'Ťahák promptov', icon: 'lucide:clipboard-list' },
  { to: '/naposledy', label: 'Naposledy otvorené', icon: 'lucide:history' },
  { to: '/ulozene', label: 'Uložené', icon: 'lucide:bookmark' },
]
</script>

<template>
  <header
    class="sticky top-0 z-30 border-b border-ink/10 bg-bg/90 backdrop-blur"
    data-testid="app-header"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3">
      <NuxtLink
        to="/"
        class="font-heading text-xl text-primary"
        data-testid="brand"
      >
        AIPREMNA.SK
      </NuxtLink>

      <nav class="hidden items-center gap-5 md:flex" data-testid="header-nav">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-2 text-sm text-ink/80 transition-colors hover:text-primary"
        >
          <Icon :name="link.icon" class="h-4 w-4" />
          <span>{{ link.label }}</span>
        </NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-3">
        <HeaderSearch class="hidden md:block" />
        <LocaleToggle />
      </div>
    </div>
  </header>
</template>
