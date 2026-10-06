# Tickets

Les joueurs demandent de l'aide au staff avec `/ticket` ou `/helpop`. Les questions attendent dans une file, un membre du staff en prend une en charge et répond en jeu, et le joueur note l'aide reçue quand le ticket est fermé.

## Pour les joueurs {#for-the-players}

| Commande | |
|---|---|
| `/ticket <message>` ou `/helpop <message>` | poser une question |
| `/ticket reply <message>` | ajouter un message à votre ticket |
| `/ticket view` | votre ticket et les réponses |
| `/ticket close` | fermer votre ticket |

Les réponses du staff apparaissent dans le chat avec un lien pour répondre. Si le joueur est hors ligne, elles s'affichent à sa prochaine connexion. Quand le ticket est fermé, on lui demande de **noter l'aide** en cliquant de 1 à 5 étoiles.

Par défaut, un joueur a un seul ticket ouvert à la fois (`max-open-per-player`) et attend 60 secondes entre deux tickets. Un joueur gelé peut toujours utiliser `/helpop`.

## Pour le staff {#for-the-staff}

Les nouveaux tickets sont annoncés au staff qui a `supmod.ticket.notify` (cliquez pour ouvrir), et sur [Discord](/fr/features/discord) si vous le souhaitez. Les membres du staff qui se connectent reçoivent un rappel des tickets ouverts.

`/ticket list` (ou `/ticket` seul, ou `/sm tickets`) ouvre la file, du plus ancien au plus récent, avec des filtres : ouverts, libres, les miens, fermés, tous. Couleurs : vert = les vôtres, orange = pris par quelqu'un d'autre, blanc = libre.

Un ticket affiche la conversation et ces boutons :

| Bouton | |
|---|---|
| Prendre le ticket | les autres membres du staff voient que vous vous en occupez ; il redevient libre après `claim-expire-minutes` (30) sans action |
| Répondre | tapez la réponse dans le chat ; répondre à un ticket libre le prend en charge pour vous |
| Fermer | on demande au joueur de noter l'aide |
| Téléportation, fiche joueur | |

Depuis le chat : `/ticket claim <id>`, `/ticket answer <id> <message>`, `/ticket done <id>`.

`supmod.ticket.override` permet de reprendre ou de fermer un ticket pris en charge par quelqu'un d'autre.

Les notes et le temps de réponse moyen de chaque membre du staff sont dans les [statistiques du staff](/fr/features/statistics#staff-statistics). Avec [plusieurs serveurs](/fr/guide/network), les tickets sont partagés : le serveur du joueur est affiché, et une réponse le rejoint où qu'il soit.

## Options (config.yml) {#options-config-yml}

| Option (`tickets.`) | Par défaut | |
|---|---|---|
| `enabled` | `true` | module activé / désactivé |
| `cooldown-seconds` | `60` | délai entre deux tickets (`supmod.ticket.bypass.cooldown` l'ignore) |
| `max-open-per-player` | `1` | tickets ouverts par joueur |
| `min-length`, `max-length` | `5`, `200` | longueur d'un message |
| `claim-expire-minutes` | `30` | un ticket pris en charge redevient libre après X minutes (0 = jamais) |
| `rating` | `true` | le joueur note l'aide |
| `remind-staff-on-join` | `true` | rappeler les tickets ouverts au staff qui se connecte |

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.ticket` | créer, répondre, fermer et noter des tickets (tout le monde) |
| `supmod.ticket.notify` | recevoir les nouveaux tickets |
| `supmod.ticket.manage` | la file, prendre en charge, répondre et fermer |
| `supmod.ticket.override` | prendre ou fermer un ticket pris en charge par quelqu'un d'autre |
| `supmod.ticket.bypass.cooldown` | pas de délai entre deux tickets |
