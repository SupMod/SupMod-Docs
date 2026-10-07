# Fiches joueur

`/sm profile <player>` ouvre la fiche d'un joueur, **en ligne ou hors ligne**. Elle s'ouvre aussi avec le livre du [mode staff](/fr/features/staff-tools), `/sm players` et les signalements.

## Liste des joueurs {#player-list}

`/sm players` (aussi dans le [hub du staff](/fr/features/staff-hub)) liste les joueurs en ligne. Chaque tête affiche le monde, le mode de jeu, le **ping** et la durée de la **session**, et des badges : nouveau joueur, AFK (et depuis combien de temps), [tags](#notes-and-tags), vanish, mode staff, gelé, muet, [drops surveillés](/fr/features/drop-log).

| Clic sur un joueur | |
|---|---|
| Clic | sa fiche |
| Clic droit | se téléporter à lui |
| Maj + clic | le [menu des sanctions](/fr/features/punishments#the-punishment-menu) |
| <kbd>Q</kbd> | surveiller ses drops, ou arrêter (`supmod.admin.drops.watch`, voir [Journal des drops](/fr/features/drop-log)) |

Les boutons du bas :

| Bouton | |
|---|---|
| Filtre | tous, staff, nouveaux joueurs, muets, gelés, étiquetés, AFK (clic : suivant, clic droit : précédent) ; le filtre actif est dans le titre |
| Tri | pseudo, durée de session (la plus longue d'abord), ping (le plus élevé d'abord), monde |
| Rechercher un joueur | voir ci-dessous |

Le filtre et le tri sont conservés quand vous revenez du menu des sanctions. Un joueur est **nouveau** quand sa première connexion date de moins de `gui.players.new-player-hours` (24) heures (0 = ni badge ni filtre).

## Recherche de joueurs {#player-search}

`/sm search <text>` (alias `/sm find`), ou le bouton **Rechercher un joueur** de la liste ou du [hub du staff](/fr/features/staff-hub), trouve les joueurs dont le pseudo contient le texte (2 à 16 caractères), parmi **tous les joueurs connus**, connectés ou non : les joueurs en ligne d'abord, puis les plus récemment vus. Cliquez sur un résultat pour ouvrir sa fiche, même hors ligne. Permission : `supmod.player`.

```text
/sm search ste      Steve, Steven_42, xXsteelXx...
```

## Ce que montre la fiche {#what-the-file-shows}

| | |
|---|---|
| Tête | statut (en ligne, monde, mode de jeu, vie), ban ou mute en cours, vanish, gelé, AFK, tags ; cliquez pour vous téléporter |
| Informations | première et dernière connexion, ancienneté, nombre de jours de connexion, UUID ; avec `supmod.admin.ip` : dernière IP et comptes sur la même IP |
| Temps de jeu | total, sans le temps AFK |
| Kills, morts | avec le détail de chaque kill |
| Signalements | signalements reçus |
| Chat | messages repérés par le filtre de mots, historique du chat et des commandes |
| Sanctions | avertissements, mutes, kicks et bans, l'historique et le menu des sanctions |
| Inventaire, coffre de l'Ender | les voir, ou les modifier (ci-dessous) |
| Transactions, alertes, drops | historique des coins, alertes multi-compte, x-ray et objets ; l'entonnoir ouvre le [journal des drops](/fr/features/drop-log) du joueur (clic droit : le surveiller ou arrêter) |
| Actions rapides, notes, chronologie, statistiques, tickets, appels | voir ci-dessous |

Chaque bouton n'apparaît que pour les membres du staff qui ont sa permission.

## Actions rapides {#quick-actions}

L'étoile du Nether de la fiche (ou `/sm actions <player>`) regroupe les actions sur un joueur en ligne :

| Action | Permission |
|---|---|
| Soigner (vie, feu, faim) | `supmod.player.heal` |
| Nourrir | `supmod.player.feed` |
| Mode de jeu | `supmod.gamemode` + le mode |
| Se téléporter vers lui | `supmod.admin.teleport` |
| L'amener ici | `supmod.player.tphere` |
| Freeze | `supmod.freeze` |
| Vider l'inventaire (avec confirmation, armure et seconde main comprises) | `supmod.player.clear` |
| Inventaire, coffre de l'Ender, journal d'inventaire | `supmod.admin.inventory`, `.edit`, `.log` |

Le joueur est prévenu de ce qui a été fait et par qui, et chaque action figure dans l'historique du staff.

## Édition d'inventaire {#inventory-edition}

Avec `supmod.admin.inventory.edit`, l'inventaire et le coffre de l'Ender d'un joueur en ligne peuvent être modifiés en direct :

| Clic | Effet |
|---|---|
| Clic sur un item du joueur | prendre la pile dans votre inventaire |
| Clic droit | en prendre la moitié |
| <kbd>Q</kbd> / <kbd>Ctrl</kbd> + <kbd>Q</kbd> | supprimer un item / la pile |
| Clic sur un item de **votre** inventaire | donner la pile |
| Clic droit dans votre inventaire | donner un item |

Chaque clic est une opération faite par le serveur, jamais un déplacement libre d'items : **rien ne peut être dupliqué**, même si le joueur utilise son inventaire au même moment. Vous ne pouvez pas prendre d'items en mode staff (son inventaire est remplacé quand vous le quittez).

Chaque item pris, donné, supprimé ou vidé est noté dans le **journal d'inventaire** avec le membre du staff, l'item et la quantité : `/sm invlog [player]` (permission `supmod.admin.inventory.log`).

::: info Joueurs protégés
Les joueurs qui ont `supmod.player.exempt` (les administrateurs par défaut, via `supmod.admin`) ne peuvent pas être modifiés, vidés, déplacés ni changer de mode de jeu par d'autres membres du staff. Les opérateurs peuvent quand même le faire. Sans la permission de modification, l'inventaire s'affiche en lecture seule.
:::

## Notes et tags {#notes-and-tags}

Les notes sont des messages que seul le staff peut lire : « averti en privé pour son langage », « double compte suspecté de X »... Les tags sont des étiquettes configurées dans `config.yml` :

```yaml
player-info:
  tags:
    watch: "&e⚑ To watch"
    cheat: "&c⚠ Suspected cheat"
    vip: "&6★ VIP"
  watch-alert:
    enabled: true
    tags: [watch, cheat]
```

Quand un joueur qui a l'un des tags de `watch-alert` se connecte, le staff qui a `supmod.watch.notify` est alerté (sur chaque serveur d'un [réseau](/fr/guide/network)).

| Commande | |
|---|---|
| `/sm notes <player>` | notes et tags (ajouter une note, changer les tags ; Maj + clic droit supprime une note) |
| `/sm note <player> <text>` | ajouter une note depuis le chat |
| `/sm tag <player> <tag>` | ajouter ou retirer un tag |
| `/sm watchlist` | tous les joueurs qui ont un tag |

Permissions : `supmod.notes`, `supmod.notes.delete`, `supmod.tags`, `supmod.watch.notify`.

## Chronologie {#timeline}

`/sm timeline <player>` (permission `supmod.timeline`) affiche tout ce qui concerne le joueur dans une seule liste, du plus récent au plus ancien : connexions et sessions, sanctions et révocations, signalements reçus et faits, notes, tickets et appels.

Depuis la chronologie, deux boutons listent les **pseudos** qu'il a utilisés et ses **adresses IP** (avec `supmod.admin.ip`). Cliquez sur une IP pour voir tous les comptes qui l'ont utilisée.

Les connexions, pseudos et IP viennent des sessions, conservées `storage.log-retention-days` (90) jours : l'historique des pseudos, des IP et des doubles comptes couvre cette période.

## Recherche d'IP {#ip-search}

`/sm ip <ip>` liste tous les comptes qui se sont connectés avec cette IP ; `/sm ip <player>` liste les IP d'un joueur (permission `supmod.admin.ip`). Pratique pour trouver les multi-comptes et les contournements de ban, avec les [alertes multi-compte](/fr/features/alerts).

## Statistiques Minecraft {#minecraft-statistics}

`/sm mcstats <player>` affiche les statistiques Minecraft copiées par SupMod : temps de jeu, distance, blocs minés et posés, crafts, mobs et joueurs tués, morts, dégâts, poissons, échanges, enchantements, et le temps AFK. Voir [Statistiques](/fr/features/statistics).
