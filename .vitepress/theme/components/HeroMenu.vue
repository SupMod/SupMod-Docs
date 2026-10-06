<script setup>
import { computed, ref } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const fr = computed(() => lang.value.startsWith('fr'))

/* 8x8 pixel icons drawn by the docs (no game texture): one letter = one colour */
const PALETTE = {
  G: '#8f9aa6', g: '#c9d1d9', B: '#7a4a24', b: '#a8743f', R: '#b3123a', r: '#e2264f', W: '#f4f1ea',
  K: '#2b2b33', Y: '#e8b923', y: '#fff2a8', I: '#7fc4f0', i: '#d4efff', C: '#6b4220', c: '#a56d38',
  T: '#d8b46a', S: '#ece7da', s: '#f0c8a0', E: '#3f9b3a', e: '#6cc35f', D: '#7b5232', d: '#99693f',
  P: '#c8c2b4', w: '#ffffff'
}
const ICONS = {
  head: ['.RRRRRR.', 'RRRRRRRR', 'RRssssRR', 'RsKssKsR', 'RssssssR', 'RssrrssR', '.RssssR.', '..RRRR..'],
  axe: ['....GGG.', '...GGGGG', '...GgGG.', '...bGG..', '..b.G...', '.b......', 'b.......', '........'],
  book: ['..RRRRR.', '.RRRRRRW', '.RRYYRRW', '.RRRRRRW', '.RRRRRRW', '.RRRRRRW', '.RRRRRRW', '..RRRRR.'],
  paper: ['.WWWWW..', '.WPPPWW.', '.WWWWWWW', '.WPPPPPW', '.WWWWWWW', '.WPPPPPW', '.WWWWWWW', '........'],
  star: ['...SS...', '..SyyS..', '.SyYYyS.', 'SyYYYYyS', 'SyYYYYyS', '.SyYYyS.', '..SyyS..', '...SS...'],
  tag: ['S.......', '.S......', '..TTTTT.', '.TTTTTTT', '.TT.TTTT', '.TTTTTTT', '..TTTTT.', '........'],
  compass: ['..GGGG..', '.GwwwwG.', 'GwwrwwwG', 'GwwrrwwG', 'GwwwKwwG', 'GwwwwwwG', '.GwwwwG.', '..GGGG..'],
  ice: ['IIIIIIII', 'IiiIIIiI', 'IiIIIiII', 'IIIIiIII', 'IIIiIIII', 'IIiIIIiI', 'IiIIIiiI', 'IIIIIIII'],
  chest: ['CCCCCCCC', 'CccccccC', 'CccccccC', 'CCCYYCCC', 'CccYYccC', 'CccccccC', 'CccccccC', 'CCCCCCCC'],
  grass: ['EEEEEEEE', 'EeEEeEEe', 'DEdDDEdD', 'DDdDDDdD', 'DdDDdDDD', 'DDDdDDdD', 'DdDDDDDd', 'DDDDdDDD'],
  bell: ['...YY...', '..YYYY..', '..YyYY..', '.YyYYYY.', '.YYYYYY.', 'YYYYYYYY', '........', '...YY...']
}

function pixels(name) {
  const out = []
  ICONS[name].forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const c = row[x]
      if (c !== '.') out.push({ x, y, fill: PALETTE[c] })
    }
  })
  return out
}

/* the buttons of the real "player file" menu of the plugin */
const ITEMS = [
  { slot: 4, icon: 'head', color: '#ffd84a',
    en: ['Steve_42', 'Online · survival · 12 h played', 'Click: teleport to the player'],
    fr: ['Steve_42', 'En ligne · survie · 12 h de jeu', 'Clic : se téléporter au joueur'] },
  { slot: 10, icon: 'axe', color: '#ff5f7e',
    en: ['Punish', 'Templates: insult, spam, cheat…', 'The next step is shown before you click'],
    fr: ['Sanctionner', 'Modèles : insulte, spam, cheat…', "L'étape suivante est affichée avant le clic"] },
  { slot: 11, icon: 'book', color: '#ffffff',
    en: ['Punishment history', '2 warnings · 1 mute', 'Revoke or check every punishment'],
    fr: ['Historique des sanctions', '2 avertissements · 1 mute', 'Lever ou consulter chaque sanction'] },
  { slot: 12, icon: 'paper', color: '#ffffff',
    en: ['Reports', '1 open report, with the chat as evidence', 'Claim, resolve or punish in one click'],
    fr: ['Signalements', '1 signalement ouvert, avec le chat en preuve', 'Prendre en charge, résoudre ou sanctionner'] },
  { slot: 13, icon: 'star', color: '#7fe3ff',
    en: ['Quick actions', 'Heal, feed, game mode, teleport,', 'freeze, edit the inventory (logged)'],
    fr: ['Actions rapides', 'Soigner, nourrir, mode de jeu, TP,', "geler, modifier l'inventaire (journalisé)"] },
  { slot: 14, icon: 'tag', color: '#ffd84a',
    en: ['Notes and tags', 'Tags: ⚑ To watch', 'The staff is alerted when he joins'],
    fr: ['Notes et tags', 'Tags : ⚑ À surveiller', 'Le staff est prévenu à sa connexion'] },
  { slot: 15, icon: 'compass', color: '#c9a7ff',
    en: ['Timeline', 'Sessions, punishments, reports,', 'tickets, names and IPs in one view'],
    fr: ['Chronologie', 'Sessions, sanctions, signalements,', 'tickets, pseudos et IP en une vue'] },
  { slot: 16, icon: 'ice', color: '#7fe3ff',
    en: ['Freeze', 'He cannot move, fight or leave', 'without being punished'],
    fr: ['Geler', 'Il ne peut plus bouger, se battre', 'ni partir sans être sanctionné'] },
  { slot: 20, icon: 'chest', color: '#ffb35c',
    en: ['Inventory', 'Take, give or delete items', 'No duplication possible'],
    fr: ['Inventaire', 'Prendre, donner ou supprimer', 'Aucune duplication possible'] },
  { slot: 22, icon: 'grass', color: '#8cf07a',
    en: ['Minecraft statistics', 'Distance, blocks, kills, AFK time', 'Saved for your graphs'],
    fr: ['Statistiques Minecraft', 'Distance, blocs, kills, temps AFK', 'Enregistrées pour vos graphiques'] },
  { slot: 24, icon: 'bell', color: '#ffd84a',
    en: ['Tickets and appeals', '/helpop questions, ban appeals', 'Answered in game, rated by players'],
    fr: ['Tickets et appels', 'Questions /helpop, appels de ban', 'Réponse en jeu, notée par les joueurs'] }
]

const slots = computed(() => {
  const list = []
  for (let i = 0; i < 27; i++) {
    const item = ITEMS.find((it) => it.slot === i)
    list.push({ index: i, item, px: item ? pixels(item.icon) : [] })
  }
  return list
})

const active = ref(13)
const current = computed(() => ITEMS.find((it) => it.slot === active.value))
const lines = computed(() => (current.value ? current.value[fr.value ? 'fr' : 'en'] : []))
const title = computed(() => (fr.value ? 'Fiche » Steve_42' : 'Player file » Steve_42'))
const hint = computed(() => (fr.value ? 'Survolez les objets : ce sont les vrais boutons du menu.' : 'Hover the items: these are the real buttons of the menu.'))
</script>

<template>
  <figure class="hero-menu" :aria-label="title">
    <div class="mc-window">
      <div class="mc-title">{{ title }}</div>
      <div class="mc-grid">
        <template v-for="s in slots" :key="s.index">
          <button
            v-if="s.item"
            type="button"
            class="mc-slot has-item"
            :class="{ active: active === s.index }"
            :aria-label="s.item[fr ? 'fr' : 'en'][0]"
            @mouseenter="active = s.index"
            @focus="active = s.index"
            @click="active = s.index"
          >
            <svg viewBox="0 0 8 8" width="100%" height="100%" shape-rendering="crispEdges" aria-hidden="true">
              <rect v-for="(p, n) in s.px" :key="n" :x="p.x" :y="p.y" width="1" height="1" :fill="p.fill" />
            </svg>
          </button>
          <span v-else class="mc-slot" aria-hidden="true"></span>
        </template>
      </div>
      <div
        v-if="current"
        class="mc-tooltip"
        :class="{ right: current.slot % 9 >= 6 }"
        :style="{ '--col': current.slot % 9, '--row': Math.floor(current.slot / 9) }"
        role="tooltip"
        aria-live="polite"
      >
        <div class="mc-tooltip-name" :style="{ color: current.color }">{{ lines[0] }}</div>
        <div v-for="(l, n) in lines.slice(1)" :key="n" class="mc-tooltip-lore">{{ l }}</div>
      </div>
    </div>
    <figcaption class="hero-menu-hint">{{ hint }}</figcaption>
  </figure>
</template>

<style scoped>
.hero-menu {
  margin: 0;
  width: 100%;
  max-width: 420px;
  font-family: 'Pixelify Sans', var(--vp-font-family-base);
}

.mc-window {
  --slot: clamp(30px, 9vw, 42px);
  position: relative;
  background: #c6c6c6;
  padding: 10px 12px 14px;
  border: 3px solid #1b1b1b;
  box-shadow: inset 3px 3px 0 #ffffff, inset -3px -3px 0 #555555;
  image-rendering: pixelated;
  text-align: left;
}

/* between 960 and 1127 px the hero leaves little room on the right: smaller slots */
@media (min-width: 960px) and (max-width: 1127px) {
  .mc-window {
    --slot: clamp(26px, calc((100vw - 765px) / 9), 42px);
  }
}

.mc-title {
  color: #3f3f3f;
  font-size: 15px;
  line-height: 1.2;
  margin: 0 0 8px 2px;
}

.mc-grid {
  display: grid;
  grid-template-columns: repeat(9, var(--slot));
  grid-auto-rows: var(--slot);
  justify-content: center;
}

.mc-slot {
  display: block;
  box-sizing: border-box;
  width: var(--slot);
  height: var(--slot);
  margin: 0;
  padding: 18%;
  background: #8b8b8b;
  border: 2px solid;
  border-color: #373737 #ffffff #ffffff #373737;
  border-radius: 0;
}

.mc-slot.has-item {
  cursor: pointer;
}

.mc-slot.has-item:hover,
.mc-slot.active {
  background: #a9a9a9;
}

.mc-slot.has-item:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
}

.mc-tooltip {
  position: absolute;
  z-index: 2;
  left: calc(12px + (var(--col) + 0.75) * var(--slot));
  top: calc(36px + (var(--row) + 0.85) * var(--slot));
  min-width: 190px;
  max-width: 260px;
  padding: 6px 9px 7px;
  background: rgba(16, 0, 16, 0.94);
  border: 2px solid #28005f;
  outline: 2px solid rgba(16, 0, 16, 0.94);
  pointer-events: none;
  font-size: 14px;
  line-height: 1.35;
  text-shadow: 2px 2px 0 #3a3a3a;
}

/* the tooltip of the slots on the right opens to the left */
.mc-tooltip.right {
  left: auto;
  right: calc(12px + (8.25 - var(--col)) * var(--slot));
}

.mc-tooltip-name {
  font-weight: 500;
}

.mc-tooltip-lore {
  color: #a8a8a8;
}

.hero-menu-hint {
  margin-top: 64px;
  font-family: var(--vp-font-family-base);
  font-size: 13px;
  color: var(--vp-c-text-2);
  text-align: center;
}

@media (max-width: 640px) {
  .mc-window {
    --slot: clamp(26px, calc((100vw - 90px) / 9), 42px);
  }

  /* on phones the tooltip goes under the grid instead of over the slots */
  .mc-tooltip,
  .mc-tooltip.right {
    position: static;
    margin-top: 8px;
    max-width: none;
    min-width: 0;
  }

  .hero-menu-hint {
    margin-top: 12px;
  }
}
</style>
