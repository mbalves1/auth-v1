// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/supabase',
    'nuxt-lucide-icons',
    '@pinia/nuxt',
    '@nuxt/ui',
    "nuxt-charts"
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
  plugins: [
    '~/plugins/m-mask-lib.client.js'
  ],
  components: {
    dirs: [
      '~/components', // Diretório padrão
      'composables'
    ],
  },
})