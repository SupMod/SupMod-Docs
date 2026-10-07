# Journal des drops

Le journal des drops enregistre les objets jetés par certains joueurs et **qui les ramasse** (un joueur, un mob ou un entonnoir), avec le lieu et la date. Il sert à vérifier un échange suspect, un stuff donné à un double compte ou une duplication.

Par défaut, seuls les **joueurs surveillés** sont enregistrés : rien n'est écrit tant que personne n'est surveillé, le journal ne coûte donc rien sur un serveur où personne n'est surveillé.

## Surveiller un joueur {#watch-a-player}

Quatre façons, qui fonctionnent toutes pour les joueurs hors ligne :

| Où | Comment |
|---|---|
| `/sm drops` | bouton **Surveiller un joueur** : tapez son pseudo, puis la durée et la raison dans le chat |
| Fiche joueur | clic droit sur l'entonnoir : surveiller avec la durée par défaut, ou arrêter ; Maj + clic droit : choisir la durée et la raison |
| `/sm players` | <kbd>Q</kbd> sur un joueur : surveiller avec la durée par défaut, ou arrêter |
| Chat | `/sm drops add <player> [duration] [reason]` |

La durée s'écrit comme pour les sanctions : `12h`, `7d`, `1mo`, ou `perm` pour une surveillance définitive. Sans durée, la surveillance dure `drop-log.default-duration` (7 jours). Les surveillances expirées sont retirées automatiquement. Surveiller à nouveau un joueur change sa durée et sa raison.

```text
/sm drops add Steve 3d a donné son stuff à un nouveau compte
/sm drops add Alex perm duplication suspectée
/sm drops remove Steve
```

Chaque ajout, modification et retrait est écrit dans l'[historique du staff](/fr/features/staff-tools#staff-history) (`DROP_WATCH_ADD`, `DROP_WATCH_EDIT`, `DROP_WATCH_REMOVE`). Avec [plusieurs serveurs](/fr/guide/network), la liste est partagée : un joueur surveillé sur un serveur est enregistré sur tous.

### Surveillance automatique {#automatic-watch}

Certains joueurs sont enregistrés sans être ajoutés à la liste :

- les joueurs qui ont un des [tags du staff](/fr/features/player-management#notes-and-tags) de `drop-log.auto-watch.tags` (`watch` « À surveiller » et `cheat` « Suspect cheat » par défaut), tant qu'ils ont ce tag ;
- les nouveaux joueurs pendant leurs `drop-log.auto-watch.new-players-minutes` premières minutes de jeu (désactivé par défaut).

Ils apparaissent dans le menu avec un badge **Auto** et dans `/sm drops list`. Clic droit pour surveiller l'un d'eux manuellement.

## Commandes {#commands}

| Commande | Permission | |
|---|---|---|
| `/sm drops` | `supmod.admin.drops` | le menu des joueurs surveillés (depuis la console : la liste) |
| `/sm drops list` | `supmod.admin.drops` | les joueurs surveillés dans le chat ; cliquez sur un pseudo pour ouvrir son journal |
| `/sm drops log [player]` | `supmod.admin.drops` | tout le journal, ou les drops d'un joueur |
| `/sm drops add <player> [duration] [reason]` | `supmod.admin.drops.watch` | surveiller un joueur, ou changer sa durée et sa raison |
| `/sm drops remove <player>` | `supmod.admin.drops.watch` | arrêter de surveiller (le journal déjà écrit est conservé) |
| `/sm drops on` / `off` | `supmod.admin.drops.watch` | activer ou désactiver le journal des drops |
| `/sm drops mode watchlist` / `all` | `supmod.admin.drops.watch` | enregistrer seulement les joueurs surveillés, ou tout le monde |

## Les menus {#the-menus}

`/sm drops` liste les joueurs surveillés, du dernier ajouté au plus ancien, avec la raison, qui les a ajoutés et quand, la fin de la surveillance et s'ils sont en ligne. L'en-tête indique le mode, le nombre de joueurs surveillés, les réglages de surveillance automatique et les drops non enregistrés à cause de la limite.

| Clic sur un joueur | |
|---|---|
| Clic | son journal des drops |
| Clic droit | arrêter de le surveiller (avec confirmation) ; sur un joueur **Auto** : le surveiller manuellement |
| Maj + clic | changer la durée et la raison |

Les boutons du bas : **Surveiller un joueur**, activation du journal, mode, **Tout le journal des drops**, et **Paramètres** (la catégorie Sécurité de `/sm settings`).

Le **journal des drops** affiche chaque drop avec l'objet, le lieu, la date et qui l'a ramassé. Un filtre passe de *tous* à *pas ramassés* puis *ramassés par un autre*.

| Clic sur un drop | |
|---|---|
| Clic | se téléporter sur le lieu du drop |
| Clic droit | fiche du joueur qui l'a ramassé |

Le journal d'un joueur s'ouvre aussi avec l'entonnoir de sa [fiche joueur](/fr/features/player-management), qui indique s'il est surveillé et jusqu'à quand.

## Comment ça marche {#how-it-works}

- Un objet est suivi depuis le moment où il est jeté jusqu'à ce qu'il soit ramassé, fusionné avec une autre pile ou qu'il disparaisse. Un objet jeté avant une déconnexion puis ramassé plus tard par un ami est quand même retrouvé (les objets sont suivis 24 heures, et de nouveau après un redémarrage).
- En mode `ALL`, tous les joueurs sont enregistrés : à réserver aux petits serveurs.
- Pour protéger le serveur, chaque joueur a une limite de drops enregistrés par minute (`max-per-minute`, 60). Les drops suivants sont seulement comptés, et une ligne « N drops non enregistrés » les résume dans le journal.
- Les objets sans valeur (`ignored-items` : cobblestone, terre, netherrack...) ne sont jamais enregistrés.
- Les drops sont écrits dans la base de données en une seule fois toutes les `flush-seconds` (3) secondes, jamais sur le thread principal.
- Le journal est conservé `storage.log-retention-days` (90) jours, comme les autres journaux.

## Options (config.yml) {#options-config-yml}

| Option (`drop-log.`) | Par défaut | |
|---|---|---|
| `enabled` | `true` | journal des drops activé / désactivé (les serveurs mis à jour depuis la 2.3 gardent leur valeur) |
| `mode` | `WATCHLIST` | `WATCHLIST` : joueurs surveillés seulement ; `ALL` : tous les joueurs |
| `max-watched` | `100` | nombre maximum de joueurs surveillés (0 = sans limite ; les surveillances automatiques ne comptent pas) |
| `default-duration` | `7d` | durée d'une surveillance ajoutée sans durée (`perm` = définitive) |
| `max-per-minute` | `60` | drops enregistrés par joueur et par minute (0 = sans limite ; en mode `ALL`, 0 veut quand même dire 600) |
| `flush-seconds` | `3` | les drops sont écrits en une fois toutes les X secondes (1-60) |
| `ignored-items` | `COBBLESTONE`, `COBBLED_DEEPSLATE`, `DIRT`, `NETHERRACK`, `ROTTEN_FLESH` | objets jamais enregistrés |
| `auto-watch.tags` | `watch`, `cheat` | tags du staff qui font enregistrer un joueur automatiquement |
| `auto-watch.new-players-minutes` | `0` | enregistrer les nouveaux joueurs pendant leurs X premières minutes de jeu (0 = désactivé) |

Toutes les options se modifient en jeu : `/sm settings` › **Sécurité**.

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.admin.drops` | voir le journal, les joueurs surveillés et l'entonnoir de la fiche joueur (admin) |
| `supmod.admin.drops.watch` | surveiller et ne plus surveiller des joueurs, activation, mode ; inclut `supmod.admin.drops` (admin) |

::: info Mise à jour depuis la 2.3
Les joueurs de l'ancienne liste `drop-log.players` (UUID dans `config.yml`) sont déplacés dans la base de données au premier démarrage, en surveillances définitives, et la clé est retirée. Les entrées qui ne sont ni un UUID ni le pseudo d'un joueur connu restent dans `config.yml` avec un avertissement dans la console : corrigez-les ou ajoutez les joueurs avec `/sm drops add`.
:::

::: tip Un drop est un indice
Un joueur qui donne son stuff à un autre compte ne triche pas forcément. Regardez la [chronologie](/fr/features/player-management#timeline) et les IP des deux comptes avant de sanctionner.
:::
