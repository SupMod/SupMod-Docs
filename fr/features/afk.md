# AFK

Un joueur qui ne fait rien pendant 5 minutes devient **AFK**. Seul ce que le joueur fait lui-même compte : tourner la tête, marcher, écrire dans le chat, taper une commande, utiliser un item ou un bloc, cliquer dans un inventaire. Être poussé par l'eau ou rouler en wagonnet ne compte pas.

`/afk` (alias `/away`, permission `supmod.afk`) vous met AFK manuellement ; n'importe quelle activité vous fait revenir.

## Ce que ça change {#what-it-changes}

- **Temps de jeu** : le temps AFK est retiré du temps de jeu (à partir du moment où le joueur a arrêté de bouger, pas seulement à partir de la détection), et donc des [récompenses de temps de jeu](/fr/features/rewards) et des classements. Une ferme AFK ne rapporte plus de récompenses.
- **Statistiques** : le temps AFK de chaque joueur est compté à part ([statistiques Minecraft](/fr/features/statistics)), et le « temps de jeu actif » des [statistiques journalières](/fr/features/statistics#daily-activity) ne compte que les joueurs qui ne sont pas AFK.
- **Fiche joueur** : « AFK depuis 12 min » dans la tête de la fiche.
- **Placeholders** : `%supmod_afk%` (true / false) et `%supmod_afk_tag%` (`[AFK]` ou rien) pour le tab, les nametags ou le chat ; `%afk%` dans le tab et la sidebar de SupMod.

## Kicker les joueurs AFK {#kick-the-afk-players}

| Option (`afk.`) | Par défaut | |
|---|---|---|
| `kick-after-minutes` | `0` | kick après X minutes AFK (0 = jamais) |
| `kick-when-full` | `false` | serveur plein : le joueur AFK depuis le plus longtemps est kické pour laisser entrer un nouveau joueur (jamais pendant la maintenance) |

Les joueurs qui ont `supmod.afk.kickexempt` (le staff) ne sont jamais kickés.

## Options (config.yml) {#options-config-yml}

| Option (`afk.`) | Par défaut | |
|---|---|---|
| `enabled` | `true` | module activé / désactivé |
| `minutes` | `5` | minutes sans activité |
| `count-movement` | `true` | marcher compte comme une activité (`false` : seulement la tête, le chat, les commandes et les interactions) |
| `announce` | `false` | prévenir les autres joueurs |
| `exclude-from-playtime` | `true` | retirer le temps AFK du temps de jeu |

`supmod.afk.exempt` (incluse dans `supmod.staff`, donc le staff par défaut) empêche un joueur d'être mis AFK automatiquement.
