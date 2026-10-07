# Ignorer, liste du staff et sondages

Trois fonctions pour les joueurs : ignorer un joueur qui les dérange, trouver un membre du staff en ligne et voter aux sondages du staff. Elles sont toutes activées par défaut ; leurs options sont dans `/sm settings` › **Communauté**.

## Ignorer un joueur {#ignore}

| Commande | |
|---|---|
| `/ignore <player>` | ignorer un joueur, ou arrêter de l'ignorer s'il l'est déjà |
| `/ignore add <player>` | ignorer un joueur (sans jamais le retirer : pour un joueur nommé `list`, `remove`...) |
| `/ignore list` | les joueurs que vous ignorez, sous forme de têtes ; cliquez sur l'une d'elles pour ne plus l'ignorer |
| `/unignore <player>` ou `/ignore remove <player>` | ne plus ignorer un joueur |

Les joueurs que vous ignorez vous sont cachés :

- leurs messages dans le chat public ;
- leurs @mentions (pas de son) ;
- les annonces des [primes](/fr/features/bounties) qu'ils placent.

Cela fonctionne pour les joueurs hors ligne, et aussi avec un autre plugin de chat, du moment qu'il utilise les destinataires du message. Les messages privés (`/msg` d'un autre plugin) ne sont pas filtrés : SupMod n'a pas de système de messages privés.

Les membres du staff (`supmod.ignore.exempt`) ne peuvent pas être ignorés : les joueurs voient toujours le staff. Un joueur peut ignorer au maximum `ignore.max` (50) joueurs. Les listes sont enregistrées dans la base de données (`sm_ignores`) : avec [plusieurs serveurs](/fr/guide/network), elles suivent le joueur.

::: tip Conflits de commandes
EssentialsX a aussi `/ignore` et `/unignore`. Si ce sont les commandes d'EssentialsX qui répondent, utilisez `/supmod:ignore`, ou retirez les commandes d'un des plugins dans le `commands.yml` du serveur.
:::

## Staff en ligne : /staff {#staff-list}

`/staff` (alias `/stafflist`, `/helpers`, `/equipe`) ouvre la liste des membres du staff en ligne que le joueur peut voir, avec leur rôle et leur statut :

| Statut | |
|---|---|
| disponible | prêt à aider |
| occupé | en [mode staff](/fr/features/staff-tools#staff-mode) |
| AFK | [AFK](/fr/features/afk) (caché avec `staff-list.show-afk: false`) |

Le rôle est **Administrateur** pour les joueurs qui ont `supmod.admin`, **Modérateur** pour les autres. Cliquez sur une tête pour écrire un message privé (`/msg <player>` est préparé dans le chat). Le bouton **Demander de l'aide** prépare `/helpop` dans le chat, pour créer un [ticket](/fr/features/tickets). Les membres du staff ont aussi un bouton pour passer en mode staff. Depuis la console, `/staff` affiche la liste.

Les membres du staff invisibles ne sont listés que pour le staff qui peut les voir (`supmod.vanish.see`). Un membre du staff apparaît dans la liste avec `supmod.staff.listed` (donnée par `supmod.staff`) ; pour cacher un administrateur, mettez cette permission à `false` pour lui.

::: info /staff et le mode staff
Avant la 2.4, `/staff` était un alias de `/staffmode`. Utilisez `/staffmode` ou `/mod` pour passer en mode staff. Avec `staff-list.enabled: false`, `/staff` redevient le mode staff pour les membres du staff.
:::

## Sondages {#polls}

Le staff pose une question, les joueurs répondent en un clic.

```text
/poll create 10m Prochain événement ? | Tournoi PvP | Concours de build | Chasse au trésor
```

| Commande | Permission | |
|---|---|---|
| `/poll` | `supmod.poll.vote` | le menu de vote du sondage en cours |
| `/poll vote <number>` ou `/poll <number>` | `supmod.poll.vote` | voter pour une réponse |
| `/poll create [duration] <question> \| <answer> \| <answer>...` | `supmod.poll.manage` | lancer un sondage |
| `/poll create` | `supmod.poll.manage` | création guidée : question, réponses et durée tapées dans le chat |
| `/poll end` | `supmod.poll.manage` | terminer le sondage tout de suite et annoncer les résultats |
| `/poll cancel` | `supmod.poll.manage` | annuler le sondage, sans résultats |

Alias : `/polls`, `/sondage`. Le bouton **Sondages** du [hub du staff](/fr/features/staff-hub) lance la création guidée, ou ouvre le sondage en cours.

- **2 à 6 réponses**, séparées par `|`. Question : 100 caractères maximum, réponse : 40.
- **Durée** : `90s`, `5m`, `1h`, ou un nombre de minutes ; de 30 secondes à `max-duration-minutes` (60). Sans durée : `default-duration-minutes` (5). Un nombre n'est lu comme la durée que s'il peut en être une : dans `/poll create 2024 bilan ? | ...`, « 2024 » reste dans la question.
- Le sondage est annoncé à tous avec des **réponses cliquables**. Le menu de vote affiche les réponses et, avec `show-results-live`, le nombre de votes de chacune (le staff les voit toujours).
- Une **barre de boss** affiche la question et le temps restant (`bossbar`). À mi-parcours, les joueurs qui n'ont pas voté reçoivent un rappel (sondages de 2 minutes ou plus).
- Un vote par joueur ; il peut être changé jusqu'à la fin.
- À la fin, les résultats sont annoncés, triés, avec pourcentages et barres, et écrits dans la console et l'historique du staff (`POLL_START`, `POLL_END`, `POLL_CANCEL`).

Les codes couleur de la question et des réponses sont retirés si le créateur n'a pas `supmod.poll.color` (admin).

::: warning Un sondage par serveur, en mémoire
Un seul sondage à la fois par serveur. Les sondages ne sont pas enregistrés : un redémarrage annule le sondage en cours, tout comme la désactivation de `polls.enabled`. Avec plusieurs serveurs, chaque serveur a ses propres sondages.
:::

## Options (config.yml) {#options-config-yml}

| Option | Par défaut | |
|---|---|---|
| `ignore.enabled` | `true` | `/ignore` activé / désactivé |
| `ignore.max` | `50` | joueurs ignorés par joueur |
| `staff-list.enabled` | `true` | `/staff` activé / désactivé (désactivé : `/staff` passe en mode staff) |
| `staff-list.show-afk` | `true` | afficher les membres du staff AFK |
| `polls.enabled` | `true` | sondages activés / désactivés |
| `polls.max-duration-minutes` | `60` | durée maximale d'un sondage |
| `polls.default-duration-minutes` | `5` | durée quand aucune n'est donnée |
| `polls.bossbar` | `true` | barre de boss avec la question et le temps restant |
| `polls.show-results-live` | `true` | les joueurs voient les votes avant la fin |

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.ignore` | `/ignore` et `/unignore` (tout le monde) |
| `supmod.ignore.exempt` | ne peut pas être ignoré (staff) |
| `supmod.stafflist` | `/staff` (tout le monde) |
| `supmod.staff.listed` | apparaît dans `/staff` (staff ; retirez-la pour rester caché) |
| `supmod.poll.vote` | voter aux sondages (tout le monde) |
| `supmod.poll.manage` | créer, terminer et annuler des sondages, voir les résultats avant la fin (staff) |
| `supmod.poll.color` | codes couleur dans les sondages (admin) |
