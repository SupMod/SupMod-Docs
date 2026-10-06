# Outils du staff

## Mode staff {#staff-mode}

`/staffmode` (alias `/staff`, `/mod`) met un modérateur « en service » :

- son inventaire, son mode de jeu et son vol sont **sauvegardés** (aussi dans un fichier : rien n'est perdu, même si le serveur plante) ;
- il devient invisible (`vanish`), peut voler (`fly`) et ne peut pas subir de dégâts (`invulnerable`) ;
- il reçoit les outils dans sa barre d'action.

Retaper `/staffmode`, se déconnecter ou arrêter le serveur rend tout.

| Outil | Utilisation |
|---|---|
| Boussole | clic droit : téléportation vers un joueur au hasard (jamais les mêmes deux fois de suite) |
| Glace compactée | clic droit sur un joueur : freeze / unfreeze |
| Livre | clic droit sur un joueur : sa [fiche joueur](/fr/features/player-management) |
| Coffre | clic droit sur un joueur : son inventaire (lecture seule en mode staff) |
| Hache en fer | clic droit sur un joueur : le [menu des sanctions](/fr/features/punishments) |
| Bloc de commande | clic droit : votre mode de jeu ; clic droit sur un joueur : son mode de jeu |
| Longue-vue | liste des joueurs en ligne |
| Colorant | vanish activé / désactivé |
| Barrière | quitter le mode staff |

Les outils ne peuvent pas être jetés, déplacés ni posés. Chacun peut être mis sur un autre emplacement, remplacé par un autre item ou désactivé dans `config.yml` › `staff-mode.items` :

```yaml
staff-mode:
  enabled: true
  vanish: true
  fly: true
  invulnerable: true
  gamemode: KEEP          # SURVIVAL, CREATIVE, ADVENTURE, SPECTATOR ou KEEP
  items:
    random-tp: { enabled: true, slot: 0, material: COMPASS }
    freeze: { enabled: true, slot: 1, material: PACKED_ICE }
    # ...
```

::: tip En mode spectateur
La barre d'action ne peut pas être utilisée en mode spectateur : utilisez `/gm` pour revenir.
:::

## Vanish {#vanish}

`/vanish` (alias `/v`) vous cache des joueurs, de la liste tab, de l'autocomplétion et des menus de SupMod. Les membres du staff qui ont `supmod.vanish.see` vous voient toujours. `/vanish <player>` (`supmod.vanish.others`) agit sur un autre membre du staff.

| Option (`vanish.`) | Par défaut | |
|---|---|---|
| `persist` | `true` | rester invisible après une reconnexion |
| `hide-join-quit` | `true` | pas de message de connexion / déconnexion quand on est invisible |
| `fake-messages` | `false` | faux message de connexion / déconnexion quand on bascule |
| `action-bar` | `true` | rappel dans la barre d'action |
| `night-vision` | `true` | vision nocturne quand on est invisible |

Les membres du staff invisibles ne sont pas comptés dans le MOTD, le tab (`%online%`) ni `/sm randomtp`, et les mobs les ignorent. Ils ne ramassent les items que s'ils sont accroupis.

## Freeze {#freeze}

`/freeze <player>` (alias `/ss`) immobilise un joueur pour une vérification (partage d'écran, questions...) :

- il ne peut pas bouger, construire, combattre, utiliser d'items, monter sur une monture ni taper de commandes (sauf celles de `allowed-commands` : `/msg`, `/r`, `/helpop`...) ;
- il voit un menu impossible à fermer, avec un bouton pour appeler le staff, et un titre ;
- il ne peut pas subir de dégâts (`invulnerable`).

S'il **se déconnecte pendant qu'il est gelé**, le staff est alerté et le modèle `freeze-quit` (ban de 7 jours, puis permanent) est appliqué automatiquement. Changez-le avec `freeze.on-quit.template` (`""` = rien).

Les membres du staff ont `supmod.freeze.exempt` : ils ne peuvent pas être gelés.

## Chat du staff {#staff-chat}

`/sc <message>` (ou `/staffchat`) écrit dans le chat du staff. `/sc` seul bascule votre chat vers le chat du staff jusqu'à ce que vous le retapiez. Un message qui commence par `#` va aussi dans le chat du staff (`staff-chat.prefix-char`).

Le chat du staff peut être envoyé sur [Discord](/fr/features/discord) et partagé entre [plusieurs serveurs](/fr/guide/network).

## Espion de commandes {#command-spy}

`/commandspy` (alias `/cmdspy`, `/spy`) vous montre les commandes tapées par les joueurs. Les commandes avec mot de passe (`/login`, `/register`...) ne sont jamais affichées (`command-spy.ignored-commands`), et les joueurs qui ont `supmod.commandspy.exempt` ne sont jamais espionnés.

## Téléportation {#teleportation}

| Commande | |
|---|---|
| `/sm tp <player>` | se téléporter vers un joueur |
| `/sm randomtp` | un joueur au hasard (membres du staff exclus par défaut, `random-tp.exclude-staff`) |
| `/sm spectp on` | passer en mode spectateur à chaque téléportation de SupMod (`/sm tp`, tp aléatoire, menus) |
| `/sm return` | après une telle téléportation en spectateur, revenir là où vous étiez avant, dans votre mode de jeu précédent |

## Mode de jeu {#game-mode}

`/gm <0-3> [player]`, `/gmc`, `/gms`, `/gma`, `/gmsp`, ou `/gm` seul pour un menu. Chaque mode demande sa propre permission (`supmod.gamemode.creative`...), et `supmod.gamemode.others` pour un autre joueur. Le joueur est prévenu de qui a changé son mode (`gamemode.notify-target`), et chaque changement figure dans l'historique du staff.

```text
/gm 3              spectateur
/gmc Steve         Steve en créatif
```

## Historique du staff {#staff-history}

Chaque action du staff est enregistrée : sanctions, révocations, vanish, freeze, mode staff, mode de jeu, téléportation, édition d'inventaire, notes, tags, tickets, appels, paramètres... `/sm staffhistory` les affiche toutes, `/sm staffhistory <staff>` celles d'un membre du staff (permission `supmod.staff.log`). Elles sont conservées `staff-log-retention-days` (180) jours.

Pour l'activité de chaque membre du staff (nombre de sanctions, signalements traités, temps de réponse moyen, temps en mode staff), voir [Statistiques](/fr/features/statistics#staff-statistics).
