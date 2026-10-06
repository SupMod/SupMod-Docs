# Signalements

Les joueurs signalent un tricheur ou une insulte avec `/report`. Le staff reçoit le signalement avec les derniers messages du joueur comme preuves, le prend en charge puis le ferme, ou sanctionne en un clic.

## Pour les joueurs {#for-the-players}

1. `/report` ouvre la liste des joueurs en ligne (ou `/report <player>` passe directement à l'étape suivante ; les joueurs hors ligne peuvent aussi être signalés si `allow-offline-target` est activé).
2. Un menu affiche les **motifs** (cheat, duplication, comportement, grief...).
3. Le joueur peut ajouter un **commentaire** dans le chat, ou taper `skip`.

Le joueur qui a signalé est prévenu quand un membre du staff traite son signalement (`notify-reporter-when-handled`). Le joueur signalé ne sait jamais qui l'a signalé ; il peut être prévenu qu'il a été signalé (`notify-target`, désactivé par défaut).

Un délai (`cooldown-seconds`, 60 s) évite le spam, et un joueur ne peut pas signaler à nouveau le même joueur tant que son premier signalement est encore ouvert. Personne ne peut se signaler soi-même.

## Pour le staff {#for-the-staff}

- Chaque nouveau signalement est annoncé au staff qui a `supmod.admin.report.receive`, avec un clic pour l'ouvrir. Il peut aussi être envoyé sur [Discord](/fr/features/discord).
- `/sm reports` liste les signalements (filtres : ouverts, fermés, tous). Les membres du staff qui se connectent reçoivent un rappel des signalements ouverts.
- `/sm report <id>` ouvre un signalement :

| Bouton | Ce qu'il fait |
|---|---|
| Prendre le signalement | Le prend en charge : les autres membres du staff voient « pris en charge par ... » et ne peuvent pas le fermer. Il est libéré après `claim-expire-minutes` (30) sans action. |
| Preuves | Les derniers messages du joueur signalé (15 par défaut), sous forme de livre. |
| Historique du chat | Ses messages et commandes récents. |
| Note du staff | Une note que seul le staff peut lire. |
| Sanctionner le joueur | Ouvre le menu des sanctions avec le modèle du motif proposé en premier ; le signalement est fermé automatiquement (`resolve-when-punished`). |
| Résolu / Rejeté | Ferme le signalement (clic droit : avec une note). |
| Téléportation | Téléporte vers le joueur signalé s'il est en ligne. |

`supmod.admin.report.override` permet de prendre ou de fermer un signalement pris en charge par quelqu'un d'autre.

## Configurer les motifs {#configure-the-reasons}

Les motifs du menu sont dans `config.yml` › `report.reasons` (28 au maximum). `template` est le [modèle de sanction](/fr/features/punishments) proposé quand le staff sanctionne depuis un signalement avec ce motif.

```yaml
report:
  reasons:
    cheat:
      title: "&cCheat"
      item: DIAMOND_SWORD
      template: cheat
      lore:
        - "&7Hacked client, x-ray, fly..."
    behaviour:
      title: "&eBehaviour"
      item: PAPER
      template: insult
      lore:
        - "&7Insults, harassment, spam"
```

Items : noms de la [liste des Material](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Material.html) (`DIAMOND_SWORD`, `PAPER`...).

## Options {#options}

| Option (`report.`) | Par défaut | |
|---|---|---|
| `enabled` | `true` | module activé / désactivé |
| `cooldown-seconds` | `60` | délai entre deux signalements d'un joueur (`supmod.bypass.report.cooldown` l'ignore) |
| `allow-offline-target` | `true` | signaler des joueurs hors ligne |
| `notify-target` | `false` | prévenir le joueur signalé (jamais de qui vient le signalement) |
| `notify-reporter-when-handled` | `true` | prévenir l'auteur quand le signalement est fermé |
| `remind-staff-on-join` | `true` | rappeler les signalements ouverts au staff qui se connecte |
| `ask-comment`, `comment-max-length` | `true`, `150` | demander un commentaire après le motif |
| `evidence.enabled`, `evidence.messages` | `true`, `15` | joindre les derniers messages du joueur |
| `evidence.include-commands` | `false` | joindre aussi ses commandes |
| `claim-expire-minutes` | `30` | libérer un signalement pris en charge après X minutes sans action (0 = jamais) |
| `resolve-when-punished` | `true` | sanctionner depuis un signalement le ferme |

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.report` | utiliser `/report` (tout le monde) |
| `supmod.admin.report.receive` | recevoir les nouveaux signalements |
| `supmod.admin.report.manage` | `/sm reports`, traiter les signalements |
| `supmod.admin.report.override` | traiter un signalement pris en charge par quelqu'un d'autre |
| `supmod.bypass.report.cooldown` | pas de délai |
