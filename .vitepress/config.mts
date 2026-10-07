import { defineConfig } from 'vitepress'
import { enSidebar, frSidebar } from './sidebar'

const DISCORD = 'https://discord.gg/WtKt5vG9Yn'
const SPIGOT = 'https://www.spigotmc.org/resources/supmod.108806/'
const REPO = 'https://github.com/SupMod/SupMod-Docs'
const VERSION = '2.3.0'

export default defineConfig({
  base: '/SupMod-Docs/',
  title: 'SupMod',
  description: 'Moderation and server management plugin for Spigot and Paper',
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['README.md', 'data/**', 'scripts/**'],

  head: [
    ['link', { rel: 'icon', href: '/SupMod-Docs/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/SupMod-Docs/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#ca1c45' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'SupMod documentation' }],
    ['meta', { property: 'og:image', content: 'https://supmod.github.io/SupMod-Docs/logo.png' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@500;700&family=Rubik:wght@400;500;600;700&display=swap' }]
  ],

  markdown: {
    lineNumbers: false
  },

  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'SupMod',
    socialLinks: [{ icon: 'discord', link: DISCORD }],
    search: {
      provider: 'local',
      options: {
        locales: {
          fr: {
            translations: {
              button: { buttonText: 'Rechercher', buttonAriaLabel: 'Rechercher' },
              modal: {
                displayDetails: 'Afficher la liste détaillée',
                resetButtonTitle: 'Effacer la recherche',
                backButtonTitle: 'Fermer la recherche',
                noResultsText: 'Aucun résultat pour',
                footer: { selectText: 'choisir', navigateText: 'naviguer', closeText: 'fermer' }
              }
            }
          }
        }
      }
    }
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
          { text: 'Features', link: '/features/reports', activeMatch: '/features/' },
          { text: 'Commands', link: '/reference/commands' },
          { text: 'Permissions', link: '/reference/permissions' },
          {
            text: `v${VERSION}`,
            items: [
              { text: 'Changelog', link: '/changelog' },
              { text: 'Download on SpigotMC', link: SPIGOT },
              { text: 'Support on Discord', link: DISCORD }
            ]
          }
        ],
        sidebar: enSidebar,
        outline: { level: [2, 3], label: 'On this page' },
        editLink: { pattern: `${REPO}/edit/master/:path`, text: 'Improve this page on GitHub' },
        footer: {
          message: 'SupMod is made by Alstarte. This documentation is open source.',
          copyright: `Documentation for SupMod ${VERSION}`
        }
      }
    },
    fr: {
      label: 'Français',
      lang: 'fr-FR',
      link: '/fr/',
      description: 'Plugin de modération et de gestion de serveur pour Spigot et Paper',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/fr/guide/', activeMatch: '/fr/guide/' },
          { text: 'Fonctionnalités', link: '/fr/features/reports', activeMatch: '/fr/features/' },
          { text: 'Commandes', link: '/fr/reference/commands' },
          { text: 'Permissions', link: '/fr/reference/permissions' },
          {
            text: `v${VERSION}`,
            items: [
              { text: 'Changelog', link: '/fr/changelog' },
              { text: 'Télécharger sur SpigotMC', link: SPIGOT },
              { text: 'Aide sur Discord', link: DISCORD }
            ]
          }
        ],
        sidebar: frSidebar,
        outline: { level: [2, 3], label: 'Sur cette page' },
        editLink: { pattern: `${REPO}/edit/master/:path`, text: 'Améliorer cette page sur GitHub' },
        docFooter: { prev: 'Page précédente', next: 'Page suivante' },
        lastUpdated: { text: 'Mis à jour le' },
        returnToTopLabel: 'Remonter en haut',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Apparence',
        lightModeSwitchTitle: 'Passer en mode clair',
        darkModeSwitchTitle: 'Passer en mode sombre',
        langMenuLabel: 'Changer de langue',
        notFound: {
          title: 'PAGE INTROUVABLE',
          quote: "Cette page n'existe pas ou a changé d'adresse avec la nouvelle documentation.",
          linkLabel: "Aller à l'accueil",
          linkText: "Retour à l'accueil"
        },
        footer: {
          message: 'SupMod est créé par Alstarte. Cette documentation est open source.',
          copyright: `Documentation de SupMod ${VERSION}`
        }
      }
    }
  }
})
