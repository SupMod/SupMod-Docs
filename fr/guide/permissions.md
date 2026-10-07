# Permissions et grades

SupMod compte environ 160 permissions, mais vous avez rarement besoin de les donner une par une. La liste complète se trouve sur la page [Permissions](/fr/reference/permissions).

## Sans plugin de permissions {#without-permission-plugin}

- Chaque joueur a les permissions de joueur : `/report`, `/ticket`, `/appeal`, `/rewards`, `/stats`, `/coins`, `/playtime`, `/afk`, `/ignore`, `/staff`, `/poll`...
- Les opérateurs ont tout.

## Les groupes {#the-groups}

| Permission | À donner aux | Contient |
|---|---|---|
| `supmod.staff` | modérateurs | fiches joueur, téléportation, consultation d'inventaire, signalements, avertissement / mute / unmute / kick, menu et historique des sanctions, mode staff, vanish, freeze, chat staff, espion de commandes, contrôle du chat, alertes, contournement de l'anti-spam, santé, mondes (consultation), mode de jeu survie / spectateur, soin, nourriture, notes, tags, chronologie, tickets, statistiques du staff, recherche d'objets et alertes d'objets suspects, vérification à la connexion et verrouillage (avec leurs contournements), sondages |
| `supmod.admin` | administrateurs | tout `supmod.staff` + ban / ipban / unban / définitif / révocation, modèles de sanction, paramètres, historique du staff, adresses IP, modification d'inventaire, vidage d'inventaire, créatif / aventure, appels, outils du serveur (lag, maintenance, redémarrage, zones, hologrammes...), administration de l'économie, réseau, journal des drops (`supmod.admin.drops`, `supmod.admin.drops.watch`), couleurs dans les sondages |
| `supmod.*` | propriétaire | identique à `supmod.admin` ; n'ajoute ni `supmod.admin.commands` ni les permissions d'exemption et de contournement (un plugin de permissions comme LuckPerms peut développer le joker lui-même) |

`supmod.admin.commands` ne fait volontairement partie d'aucun groupe : elle permet de modifier les commandes console exécutées par le plugin. Voir [Configuration](/fr/guide/configuration).

## Exemple avec LuckPerms {#luckperms-example}

```text
# Helper : signalements, tickets, avertissement et mute, visible dans /staff
/lp group helper permission set supmod.player true
/lp group helper permission set supmod.admin.report.receive true
/lp group helper permission set supmod.admin.report.manage true
/lp group helper permission set supmod.ticket.manage true
/lp group helper permission set supmod.ticket.notify true
/lp group helper permission set supmod.punish.warn true
/lp group helper permission set supmod.punish.mute true
/lp group helper permission set supmod.punish.menu true
/lp group helper permission set supmod.punish.history true
/lp group helper permission set supmod.staffchat true
/lp group helper permission set supmod.staff.listed true

# Modérateur : tous les outils du staff
/lp group moderator parent add helper
/lp group moderator permission set supmod.staff true

# Admin : tout sauf les commandes console
/lp group admin parent add moderator
/lp group admin permission set supmod.admin true
```

## Permissions spéciales utiles {#useful-special-permissions}

| Permission | Effet | Par défaut |
|---|---|---|
| `supmod.punish.exempt` | ne peut pas être sanctionné par un membre du staff (la console le peut toujours) | opérateurs |
| `supmod.player.exempt` | protégé des actions rapides, des changements de mode de jeu et de la modification d'inventaire par les autres membres du staff (les opérateurs le peuvent quand même) | admin |
| `supmod.freeze.exempt` | ne peut pas être gelé | staff |
| `supmod.punish.permanent` | bans et mutes définitifs (sans elle, une durée est obligatoire) | admin |
| `supmod.punish.template.cheat` | utiliser le modèle de sanction « cheat » (ses étapes de ban demandent aussi `supmod.punish.ban`, voir [Modèles](/fr/features/punishments#templates)) | staff |
| `supmod.maintenance.bypass` | se connecter pendant la maintenance | admin |
| `supmod.afk.exempt` | jamais marqué AFK | staff |
| `supmod.afk.kickexempt` | jamais kické pour inactivité (AFK) | staff |
| `supmod.bypass.xray` | aucune alerte de x-ray (builders en créatif...) | personne |
| `supmod.commandspy.exempt` | commandes jamais montrées aux espions | personne |
| `supmod.announce.bypass` | ne reçoit pas les annonces automatiques | personne |
| `supmod.bounty.exempt` | aucune prime ne peut être placée sur ce joueur | personne |
| `supmod.admin.drops.watch` | surveiller des joueurs dans le [journal des drops](/fr/features/drop-log) ; à donner aux modérateurs qui doivent le gérer | admin |
| `supmod.verification.bypass` | jamais soumis à la [vérification à la connexion](/fr/features/verification#join-verification) | staff |
| `supmod.lockdown.bypass` | peut se connecter pendant un [verrouillage](/fr/features/verification#lockdown), même avec un nouveau compte | staff |
| `supmod.security.bypass-ip-limit` | non limité par `security.max-accounts-per-ip` | staff |
| `supmod.chat.bypass-new-delay` | peut écrire tout de suite avec un nouveau compte | staff |
| `supmod.ignore.exempt` | ne peut pas être [ignoré](/fr/features/community#ignore) | staff |
| `supmod.staff.listed` | apparaît dans `/staff` ; mettez-la à `false` pour cacher un membre du staff | staff |
| `supmod.punish.warn-acknowledge.bypass` | [avertissements](/fr/features/punishments#warning-acknowledgment) montrés une fois sans rien bloquer | admin |
| `supmod.bypass.itemsearch` | jamais signalé par l'[analyse automatique des objets](/fr/features/item-search#automatic-scan) (builders en créatif...) | personne |

::: tip Permissions des modèles de sanction
Un modèle de sanction peut exiger sa propre permission (`permission:` dans `punishments.yml`), comme `supmod.punish.template.cheat`. Utilisez-la pour réserver les modèles les plus lourds aux modérateurs expérimentés.
:::

## Modes de jeu {#game-modes}

`/gm` demande `supmod.gamemode` **et** la permission du mode : `supmod.gamemode.survival`, `.creative`, `.adventure`, `.spectator`. Changer le mode d'un autre joueur demande aussi `supmod.gamemode.others`. Les modérateurs ont survie et spectateur ; les administrateurs ont aussi créatif et aventure.
