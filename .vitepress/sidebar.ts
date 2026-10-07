import type { DefaultTheme } from 'vitepress'

/** Sidebar of one language. {@code t} gives the texts, {@code p} the path prefix ("" or "/fr"). */
function sidebar(p: string, t: Record<string, string>): DefaultTheme.Sidebar {
  return [
    {
      text: t.guide,
      items: [
        { text: t.intro, link: `${p}/guide/` },
        { text: t.installation, link: `${p}/guide/installation` },
        { text: t.firstSteps, link: `${p}/guide/first-steps` },
        { text: t.configuration, link: `${p}/guide/configuration` },
        { text: t.permissionsGuide, link: `${p}/guide/permissions` },
        { text: t.languages, link: `${p}/guide/languages` },
        { text: t.storage, link: `${p}/guide/storage` },
        { text: t.network, link: `${p}/guide/network` },
        { text: t.updating, link: `${p}/guide/updating` },
        { text: t.faq, link: `${p}/guide/faq` }
      ]
    },
    {
      text: t.moderation,
      collapsed: false,
      items: [
        { text: t.staffHub, link: `${p}/features/staff-hub` },
        { text: t.reports, link: `${p}/features/reports` },
        { text: t.punishments, link: `${p}/features/punishments` },
        { text: t.appeals, link: `${p}/features/appeals` },
        { text: t.staffTools, link: `${p}/features/staff-tools` },
        { text: t.playerManagement, link: `${p}/features/player-management` },
        { text: t.tickets, link: `${p}/features/tickets` },
        { text: t.chat, link: `${p}/features/chat` },
        { text: t.alerts, link: `${p}/features/alerts` },
        { text: t.dropLog, link: `${p}/features/drop-log` },
        { text: t.itemSearch, link: `${p}/features/item-search` },
        { text: t.afk, link: `${p}/features/afk` }
      ]
    },
    {
      text: t.server,
      collapsed: false,
      items: [
        { text: t.health, link: `${p}/features/server-health` },
        { text: t.worlds, link: `${p}/features/worlds` },
        { text: t.maintenance, link: `${p}/features/maintenance` },
        { text: t.display, link: `${p}/features/display` },
        { text: t.zones, link: `${p}/features/zones` },
        { text: t.holograms, link: `${p}/features/holograms` },
        { text: t.announcements, link: `${p}/features/announcements` },
        { text: t.discord, link: `${p}/features/discord` },
        { text: t.security, link: `${p}/features/security` },
        { text: t.verification, link: `${p}/features/verification` }
      ]
    },
    {
      text: t.players,
      collapsed: false,
      items: [
        { text: t.rewards, link: `${p}/features/rewards` },
        { text: t.bounties, link: `${p}/features/bounties` },
        { text: t.statistics, link: `${p}/features/statistics` },
        { text: t.economy, link: `${p}/features/economy` },
        { text: t.community, link: `${p}/features/community` }
      ]
    },
    {
      text: t.reference,
      items: [
        { text: t.commands, link: `${p}/reference/commands` },
        { text: t.permissions, link: `${p}/reference/permissions` },
        { text: t.placeholders, link: `${p}/reference/placeholders` },
        { text: t.configFiles, link: `${p}/reference/config-files` },
        { text: t.database, link: `${p}/reference/database` },
        { text: t.changelog, link: `${p}/changelog` }
      ]
    }
  ]
}

export const enSidebar = sidebar('', {
  guide: 'Getting started', intro: 'What is SupMod?', installation: 'Installation', firstSteps: 'First steps',
  configuration: 'Configuration', permissionsGuide: 'Permissions and ranks', languages: 'Languages and messages',
  storage: 'Database', network: 'Several servers', updating: 'Updating', faq: 'FAQ',
  moderation: 'Moderation', staffHub: 'Staff hub', reports: 'Reports', punishments: 'Punishments', appeals: 'Appeals', staffTools: 'Staff tools',
  playerManagement: 'Player files', tickets: 'Tickets', chat: 'Chat and anti-spam', alerts: 'Alerts', dropLog: 'Drop log',
  itemSearch: 'Item search (anti-dupe)', afk: 'AFK',
  server: 'Server management', health: 'Health and lag', worlds: 'Worlds', maintenance: 'Maintenance and restarts',
  display: 'MOTD, tab, sidebar', zones: 'Zones', holograms: 'Holograms', announcements: 'Announcements and rules',
  discord: 'Discord', security: 'Security', verification: 'Verification and anti-raid',
  players: 'Player features', rewards: 'Rewards', bounties: 'Bounties', statistics: 'Statistics', economy: 'Coins and Vault',
  community: 'Ignore, staff list, polls',
  reference: 'Reference', commands: 'Commands', permissions: 'Permissions', placeholders: 'Placeholders',
  configFiles: 'Configuration files', database: 'Database and web panel', changelog: 'Changelog'
})

export const frSidebar = sidebar('/fr', {
  guide: 'Bien démarrer', intro: "SupMod, c'est quoi ?", installation: 'Installation', firstSteps: 'Premiers pas',
  configuration: 'Configuration', permissionsGuide: 'Permissions et grades', languages: 'Langues et messages',
  storage: 'Base de données', network: 'Plusieurs serveurs', updating: 'Mettre à jour', faq: 'FAQ',
  moderation: 'Modération', staffHub: 'Hub du staff', reports: 'Signalements', punishments: 'Sanctions', appeals: 'Appels', staffTools: 'Outils du staff',
  playerManagement: 'Fiches joueurs', tickets: 'Tickets', chat: 'Chat et anti-spam', alerts: 'Alertes', dropLog: 'Journal des drops',
  itemSearch: "Recherche d'objets (anti-dupe)", afk: 'AFK',
  server: 'Gestion du serveur', health: 'Santé et lag', worlds: 'Mondes', maintenance: 'Maintenance et redémarrages',
  display: 'MOTD, tab, sidebar', zones: 'Zones', holograms: 'Hologrammes', announcements: 'Annonces et règles',
  discord: 'Discord', security: 'Sécurité', verification: 'Vérification et anti-raid',
  players: 'Côté joueurs', rewards: 'Récompenses', bounties: 'Primes', statistics: 'Statistiques', economy: 'Coins et Vault',
  community: 'Ignorer, staff, sondages',
  reference: 'Référence', commands: 'Commandes', permissions: 'Permissions', placeholders: 'Placeholders',
  configFiles: 'Fichiers de configuration', database: 'Base de données et panel web', changelog: 'Changelog'
})
