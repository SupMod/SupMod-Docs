# Recherche d'objets (anti-dupe)

Une faille de duplication se voit par des joueurs qui possèdent beaucoup trop d'objets de valeur. La recherche d'objets trouve **qui possède un objet** parmi les joueurs en ligne, et l'analyse liste les joueurs **au-dessus de quantités suspectes**, à la main ou automatiquement.

## Chercher un objet {#search-an-item}

`/sm itemsearch <item> [min-amount]` (alias `/sm searchitem`, `/sm isearch`) liste les joueurs en ligne qui ont cet objet, du plus au moins. La complétion propose les noms des objets.

```text
/sm itemsearch netherite_ingot
/sm itemsearch elytra 2
```

La recherche compte les objets :

- dans l'inventaire (et l'objet tenu par le curseur de la souris) ;
- dans le coffre de l'Ender ;
- dans les **conteneurs** portés comme objets : shulkers, sacs (bundles) et coffres ou tonneaux remplis, y compris un conteneur dans un autre (deux niveaux).

Chaque joueur des résultats affiche le total et le détail : inventaire, coffre de l'Ender, dans des conteneurs.

| Clic sur un joueur | |
|---|---|
| Clic | son inventaire (modifiable ou en lecture seule, comme depuis la [fiche joueur](/fr/features/player-management#inventory-edition)) |
| Maj + clic | son coffre de l'Ender |
| Clic droit | sa fiche joueur |

Les résultats sont une photo à un instant donné : le bouton **Relancer la recherche** la refait. Depuis la console, les 15 premiers joueurs sont affichés dans le chat (inventaire / coffre de l'Ender / conteneurs).

## Analyser les quantités suspectes {#scan}

`/sm itemsearch scan` liste les joueurs qui ont **plus** que les quantités de `item-search.thresholds` :

| Objet | Alerte au-delà de |
|---|---|
| `NETHERITE_INGOT` | 32 |
| `NETHERITE_BLOCK` | 4 |
| `NETHERITE_SCRAP`, `ANCIENT_DEBRIS` | 64 |
| `DIAMOND_BLOCK` | 64 |
| `ELYTRA` | 2 |
| `ENCHANTED_GOLDEN_APPLE` | 16 |
| `TOTEM_OF_UNDYING` | 8 |
| `BEACON` | 4 |
| `NETHER_STAR` | 8 |
| `DRAGON_EGG` | 1 |

Adaptez la liste à votre économie : dans `/sm settings` › **Alertes** › **Quantités suspectes**, chaque ligne s'écrit `OBJET: quantité`. Les shulkers ne sont volontairement pas dans la liste (il en existe 16 couleurs et les joueurs en ont souvent beaucoup).

Le bouton **Scan des objets** du [hub du staff](/fr/features/staff-hub) lance l'analyse.

## Analyse automatique et alertes {#automatic-scan}

Avec `item-search.auto-scan.enabled: true`, les joueurs en ligne sont analysés toutes les `interval-minutes` (10) minutes. Un joueur au-dessus d'une quantité est signalé :

- au staff qui a `supmod.alerts.items`, avec un clic pour ouvrir sa fiche ;
- dans l'historique des alertes, filtre **Objets suspects** (`/sm alerts items`, voir [Alertes](/fr/features/alerts#suspicious-items)) ;
- sur [Discord](/fr/features/discord) (événement `alert`) et sur les autres serveurs du [réseau](/fr/guide/network).

Le même joueur n'est pas signalé de nouveau pour le même objet avant `alert-cooldown-minutes` (60) minutes, même s'il se reconnecte. Quand 4 joueurs ou plus sont signalés par une même analyse, une seule alerte résumée est envoyée (clic : lancer l'analyse). Les joueurs en mode créatif ou spectateur sont ignorés (`ignore-creative`), et ceux qui ont `supmod.bypass.itemsearch` ne sont jamais signalés par l'analyse automatique (la recherche manuelle les trouve quand même).

## Performances et sécurité {#performance-and-safety}

- La recherche est étalée sur plusieurs ticks : `players-per-tick` (5) joueurs par tick, et au plus quelques millisecondes par tick.
- Seuls les conteneurs sont ouverts, et au plus 5 000 objets dans des conteneurs sont lus par joueur. Un joueur qui dépasse cette limite est affiché avec un avertissement (« trop d'objets dans des conteneurs ») : c'est suspect en soi (objets dupliqués ou objets de crash).
- Une recherche à la fois par membre du staff, 4 au maximum sur le serveur. Seuls les joueurs en ligne sont cherchés.
- Les joueurs invisibles sont cachés aux membres du staff qui ne peuvent pas les voir.

## Options (config.yml) {#options-config-yml}

| Option (`item-search.`) | Par défaut | |
|---|---|---|
| `enabled` | `true` | recherche d'objets activée / désactivée |
| `players-per-tick` | `5` | joueurs vérifiés par tick (1-100) |
| `thresholds` | voir ci-dessus | quantités suspectes : alerte quand un joueur en a plus |
| `auto-scan.enabled` | `false` | analyse périodique avec alertes |
| `auto-scan.interval-minutes` | `10` | temps entre deux analyses |
| `auto-scan.ignore-creative` | `true` | ignorer les joueurs en mode créatif ou spectateur |
| `auto-scan.alert-cooldown-minutes` | `60` | pas de nouvelle alerte pour le même joueur et le même objet avant ce délai |

Toutes les options se modifient en jeu : `/sm settings` › **Alertes**.

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.itemsearch` | `/sm itemsearch` et l'analyse (staff) |
| `supmod.alerts.items` | recevoir les alertes de l'analyse automatique (staff) |
| `supmod.bypass.itemsearch` | jamais signalé par l'analyse automatique (personne par défaut) |
| `supmod.admin.inventory`, `.edit` | ouvrir l'inventaire et le coffre de l'Ender depuis les résultats |
| `supmod.player` | ouvrir la fiche joueur depuis les résultats |

::: tip Suivez ensuite les objets
Une alerte est un indice : ouvrez l'inventaire, [surveillez ses drops](/fr/features/drop-log) pour voir qui reçoit les objets, et regardez sa [chronologie](/fr/features/player-management#timeline).
:::
