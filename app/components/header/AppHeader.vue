<script setup lang="ts">
const { t } = useI18n()

const navLinks = computed(() => [
  { to: '/mapa-dopadu', label: t('nav.impactMap'), icon: 'lucide:target' },
  { to: '/tahak', label: t('nav.cheatsheet'), icon: 'lucide:clipboard-list' },
  { to: '/naposledy', label: t('nav.lastUsed'), icon: 'lucide:history' },
  { to: '/ulozene', label: t('nav.bookmarks'), icon: 'lucide:bookmark' },
])
</script>

<template>
  <header
    class="sticky top-0 z-30 border-b border-ink/10 bg-bg/90 backdrop-blur"
    data-testid="app-header"
  >
    <div class="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 md:px-8">
      <NuxtLink
        to="/"
        class="flex items-center gap-3"
        data-testid="brand"
      >
        <img
          src="/logo.png"
          :alt="t('brand.name')"
          class="h-10 w-auto"
        />
        <div class="hidden flex-col leading-tight sm:flex">
          <span class="font-heading text-sm uppercase tracking-tight text-ink">
            {{ t('brand.name') }}
          </span>
          <span class="font-heading text-[10px] uppercase tracking-[0.2em] text-secondary">
            {{ t('brand.tagline') }}
          </span>
        </div>
      </NuxtLink>

      <nav class="ml-auto hidden items-center gap-5 lg:flex" data-testid="header-nav">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-1.5 font-heading text-xs uppercase tracking-wider text-ink/60 transition-colors hover:text-primary"
        >
          <Icon :name="link.icon" class="h-4 w-4" />
          <span>{{ link.label }}</span>
        </NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-3 lg:ml-0">
        <HeaderSearch class="hidden md:block" />
        <LocaleToggle />
      </div>
    </div>
  </header>
</template>
