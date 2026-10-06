import { h } from 'vue'
import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import HeroMenu from './components/HeroMenu.vue'
import HomePaths from './components/HomePaths.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'home-hero-image': () => h(HeroMenu)
  }),
  enhanceApp({ app }) {
    app.component('HomePaths', HomePaths)
  }
} satisfies Theme
