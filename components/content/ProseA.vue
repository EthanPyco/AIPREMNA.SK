<template>
  <a
    v-if="isExternal"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :title="title"
  >
    <slot />
  </a>
  <a
    v-else
    :href="resolvedHref"
    :title="title"
    @click="handleClick"
  >
    <slot />
  </a>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  href: { type: String, default: '' },
  title: { type: String, default: '' }
})

const router = useRouter()
const route = useRoute()

const isExternal = computed(() => {
  const h = props.href || ''
  return /^https?:\/\//i.test(h) || /^mailto:/i.test(h) || h.startsWith('//')
})

// Strip relative prefixes and trailing .md so we end up with a `/jednotlive_.../guide-name`
// path that matches what queryCollection('content').path(...) expects.
const normaliseInternal = (raw) => {
  if (!raw) return null
  let p = raw.trim()
  // Drop leading ../ or ./ segments
  p = p.replace(/^(?:\.\.?\/)+/, '/')
  // Drop trailing .md / .mdx
  p = p.replace(/\.mdx?(?:#.*)?$/i, '')
  // Drop any trailing slash for consistency
  p = p.replace(/\/$/, '')
  // Anchor at /
  if (!p.startsWith('/')) p = '/' + p
  return p
}

const isContentLink = computed(() => {
  const h = props.href || ''
  // Either ends in .md, or starts with a relative prefix, or starts with one of the content roots
  return /\.mdx?(?:#|$)/i.test(h)
    || /^\.{1,2}\//.test(h)
    || /^\/(?:initial_info|jednotlive_usecases|jednotlive_tools)\//.test(h)
})

const resolvedHref = computed(() => {
  if (!isContentLink.value) return props.href
  const target = normaliseInternal(props.href)
  // Keep the visible href as an in-app URL so right-click → "Open in new tab" still works.
  return target ? `/?card=${encodeURIComponent(target)}` : props.href
})

const handleClick = (e) => {
  // Honour modifier keys and middle-click — let the browser open normally.
  if (e.defaultPrevented) return
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
  if (!isContentLink.value) return
  e.preventDefault()
  const target = normaliseInternal(props.href)
  if (!target) return
  router.push({ path: route.path, query: { ...route.query, card: target } })
}
</script>
