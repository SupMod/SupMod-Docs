<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()

const TEXT = {
  en: {
    title: 'Where do you start?',
    paths: [
      {
        who: 'I run the server',
        what: 'Install SupMod, choose the database and give the right permissions to each rank.',
        links: [
          ['Install in 2 minutes', '/guide/installation'],
          ['First steps checklist', '/guide/first-steps'],
          ['Permissions for your ranks', '/guide/permissions'],
          ['Change the settings in game', '/guide/configuration']
        ]
      },
      {
        who: 'I am on the staff',
        what: 'Everything a moderator does every day, from a report to a ban appeal.',
        links: [
          ['Handle the reports', '/features/reports'],
          ['Punish with templates', '/features/punishments'],
          ['Staff mode, vanish, freeze', '/features/staff-tools'],
          ['Answer the tickets', '/features/tickets']
        ]
      },
      {
        who: 'I customise everything',
        what: 'Every command, permission, placeholder and option, generated from the plugin itself.',
        links: [
          ['All the commands', '/reference/commands'],
          ['All the permissions', '/reference/permissions'],
          ['Placeholders', '/reference/placeholders'],
          ['Configuration files', '/reference/config-files']
        ]
      }
    ],
    news: 'New in 2.3: quick actions, inventory edition, notes, tickets, appeals, AFK, statistics and several servers on one database.',
    newsLink: ['See what changed', '/changelog']
  },
  fr: {
    title: 'Par où commencer ?',
    paths: [
      {
        who: 'Je gère le serveur',
        what: 'Installer SupMod, choisir la base de données et donner les bonnes permissions à chaque grade.',
        links: [
          ['Installer en 2 minutes', '/fr/guide/installation'],
          ['La liste des premiers pas', '/fr/guide/first-steps'],
          ['Les permissions de vos grades', '/fr/guide/permissions'],
          ['Régler tout en jeu', '/fr/guide/configuration']
        ]
      },
      {
        who: 'Je fais partie du staff',
        what: "Tout ce qu'un modérateur fait chaque jour, du signalement à l'appel d'un ban.",
        links: [
          ['Traiter les signalements', '/fr/features/reports'],
          ['Sanctionner avec les modèles', '/fr/features/punishments'],
          ['Mode staff, vanish, freeze', '/fr/features/staff-tools'],
          ['Répondre aux tickets', '/fr/features/tickets']
        ]
      },
      {
        who: 'Je personnalise tout',
        what: 'Chaque commande, permission, placeholder et option, générés depuis le plugin lui-même.',
        links: [
          ['Toutes les commandes', '/fr/reference/commands'],
          ['Toutes les permissions', '/fr/reference/permissions'],
          ['Les placeholders', '/fr/reference/placeholders'],
          ['Les fichiers de configuration', '/fr/reference/config-files']
        ]
      }
    ],
    news: 'Nouveau en 2.3 : actions rapides, édition d’inventaire, notes, tickets, appels, AFK, statistiques et plusieurs serveurs sur une même base.',
    newsLink: ['Voir les nouveautés', '/fr/changelog']
  }
}

const t = computed(() => (lang.value.startsWith('fr') ? TEXT.fr : TEXT.en))
</script>

<template>
  <section class="home-paths">
    <h2 class="home-paths-title">{{ t.title }}</h2>
    <div class="home-paths-grid">
      <div v-for="(path, i) in t.paths" :key="i" class="home-path">
        <h3>{{ path.who }}</h3>
        <p>{{ path.what }}</p>
        <ul>
          <li v-for="link in path.links" :key="link[1]">
            <a :href="withBase(link[1])">{{ link[0] }}</a>
          </li>
        </ul>
      </div>
    </div>
    <p class="home-news">
      {{ t.news }}
      <a :href="withBase(t.newsLink[1])">{{ t.newsLink[0] }}</a>
    </p>
  </section>
</template>

<style scoped>
.home-paths {
  max-width: 1152px;
  margin: 0 auto;
  padding: 8px 24px 64px;
}

.home-paths-title {
  font-family: 'Pixelify Sans', var(--vp-font-family-base);
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 24px;
  border: none;
  padding: 0;
}

.home-paths-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

@media (min-width: 768px) {
  .home-paths-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.home-path {
  border-top: 4px solid var(--vp-c-brand-2);
  padding-top: 16px;
}

.home-path:nth-child(2) {
  border-top-color: var(--sm-rust);
}

.home-path:nth-child(3) {
  border-top-color: var(--vp-c-text-3);
}

.home-path h3 {
  margin: 0 0 6px;
  font-size: 19px;
  font-weight: 600;
}

.home-path p {
  margin: 0 0 12px;
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.55;
}

.home-path ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.home-path li {
  margin: 0;
  padding: 5px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.home-path a,
.home-news a {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  text-decoration: none;
}

.home-path a:hover,
.home-news a:hover {
  text-decoration: underline;
}

.home-news {
  margin: 40px 0 0;
  padding: 14px 18px;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
  line-height: 1.6;
}
</style>
