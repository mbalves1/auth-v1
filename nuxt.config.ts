// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/supabase',
    'nuxt-lucide-icons',
    '@pinia/nuxt',
    '@nuxt/ui',
  ],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  imports: {
    dirs: ['composables']
  },
  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/register',
    },
  },
  components: {
    dirs: [
      '~/components', // Diretório padrão
      'composables'
    ],
  },
})