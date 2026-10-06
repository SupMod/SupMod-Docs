# Sanctions

Avertissements, mutes, kicks, bans et bans IP, temporaires ou permanents, avec un historique complet. Les **modèles** transforment vos règles en paliers que SupMod suit pour vous.

## Commandes {#commands}

| Commande | |
|---|---|
| `/warn <player> [reason] [-s]` | avertissement (affiché à la prochaine connexion si le joueur est hors ligne) |
| `/mute <player> [duration] [reason] [-s]` | mute ; sans durée = permanent |
| `/kick <player> [reason] [-s]` | kick |
| `/ban <player> [duration] [reason] [-s]` | ban, fonctionne pour les joueurs hors ligne |
| `/ipban <player> [duration] [reason] [-s]` | bannit le joueur et son IP |
| `/unmute`, `/unban <player> [reason]` | lever la sanction |
| `/punish <player> [template] [-s]` | le menu des sanctions, ou l'étape suivante d'un modèle |
| `/history <player>` | l'historique ; cliquez sur une sanction en cours pour la révoquer |

Durées : `30s`, `10m`, `2h`, `7d`, `2w`, `1mo`, `1y`, que l'on peut combiner (`1d12h`). Sans `supmod.punish.permanent`, une durée est obligatoire.

`-s` rend la sanction **silencieuse** : elle n'est pas annoncée aux joueurs, seulement au staff qui a `supmod.punish.notify`.

```text
/mute Steve 30m Spam dans le chat
/ban Steve 7d Kill aura -s
/punish Steve insult
```

## Le menu des sanctions {#the-punishment-menu}

`/punish <player>` (ou la hache de la fiche joueur, du mode staff ou d'un signalement) affiche :

- le nombre d'avertissements, de mutes, de kicks et de bans déjà reçus ;
- chaque **modèle**, avec l'étape qui sera appliquée ensuite (« Suivant : mute 1 h, étape 2/4 ») ;
- des boutons rapides pour un avertissement, un mute, un kick, un ban ou un ban IP personnalisé (durée et motif tapés dans le chat) ;
- un interrupteur **silencieux** et l'historique.

Une confirmation est demandée avant d'appliquer un modèle (`confirm-in-menu` dans `punishments.yml`). Les boutons rapides s'appliquent directement une fois la durée et la raison tapées.

## Modèles {#templates}

Un modèle est une suite de paliers pour un type de faute. Le nombre de sanctions déjà reçues **avec ce modèle** donne l'étape : première fois = première étape, deuxième fois = deuxième étape... Ensuite, la dernière étape est répétée.

```yaml
templates:
  insult:
    name: "&cInsult"
    icon: PAPER
    reason: "Insults / disrespect"
    description:
      - "&7Insults, provocation, disrespect."
    steps:
      - type: WARN
      - type: MUTE
        duration: 1h
      - type: MUTE
        duration: 1d
      - type: BAN
        duration: 1d
  cheat:
    name: "&5Cheat"
    icon: DIAMOND_SWORD
    reason: "Use of a cheat client"
    permission: "supmod.punish.template.cheat"
    steps:
      - type: BAN
        duration: 30d
      - type: BAN
        duration: perm
```

| Clé | |
|---|---|
| `type` | `WARN`, `MUTE`, `KICK` ou `BAN` |
| `duration` | pour `MUTE` et `BAN` ; `perm` = permanent |
| `ip: true` | ban IP / mute IP |
| `permission` | facultatif : nécessaire pour utiliser le modèle |

Appliquer une étape demande aussi la permission de son type (`supmod.punish.ban` pour une étape `BAN`, `supmod.punish.ipban` avec `ip: true`) et `supmod.punish.permanent` pour une étape `perm`. Avec les groupes par défaut, les modérateurs (`supmod.staff`) ne peuvent pas appliquer les étapes de ban des modèles : `cheat`, `grief` et `freeze-quit` leur sont refusés, `advertising` à partir de sa 2e étape et `insult` à partir de sa 4e. Donnez-leur `supmod.punish.ban` ou adaptez les modèles.

Six modèles sont fournis : insult, spam, advertising, grief, cheat et `freeze-quit` (appliqué automatiquement quand un joueur gelé se déconnecte). Modifiez-les en jeu avec `/sm templates` ou dans `punishments.yml`.

Les modèles sont aussi utilisés automatiquement par l'[anti-spam](/fr/features/chat#anti-spam) (`spam`) et le [freeze](/fr/features/staff-tools#freeze) (`freeze-quit`), et proposés par les [motifs de signalement](/fr/features/reports#configure-the-reasons).

## Ce que voit le joueur sanctionné {#what-the-punished-player-sees}

- **Ban** : l'écran de ban avec le motif, le membre du staff, la durée et le [code d'appel](/fr/features/appeals). Son texte se trouve dans `punish.screen.*` du fichier de langue.
- **Mute** : un message à chaque tentative de parler ; les commandes de `muted-commands` (`/msg`, `/r`...) sont aussi bloquées.
- **Avertissement** : un message, un grand titre (`warn-title`) et un son ; affiché à la prochaine connexion s'il était hors ligne.

## Paramètres (punishments.yml) {#settings-punishments-yml}

| Option (`settings.`) | Par défaut | |
|---|---|---|
| `broadcast` | `true` | annoncer les sanctions à tout le monde (`false` : seulement au staff) |
| `silent-flag` | `-s` | option des sanctions silencieuses |
| `appeal-url` | `""` | lien affiché sur l'écran de ban (votre Discord, forum...) |
| `confirm-in-menu` | `true` | confirmation avant d'appliquer depuis un menu |
| `warn-title` | `true` | titre affiché au joueur averti |
| `muted-commands` | `msg`, `tell`, `r`... | commandes bloquées pendant un mute |
| `default-reasons` | | motif utilisé quand aucun n'est donné, par type |

## Protection {#protection}

- Les opérateurs ont `supmod.punish.exempt` : un membre du staff ne peut pas les sanctionner. La console le peut.
- Un joueur banni qui se connecte avec un autre compte sur la même IP peut être refusé : voir [Alertes](/fr/features/alerts) (`block-banned-alts`).
- Avec plusieurs serveurs sur une même base de données, un ban s'applique partout en même temps : voir [Plusieurs serveurs](/fr/guide/network).

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.punish.warn`, `.mute`, `.unmute`, `.kick` | staff |
| `supmod.punish.ban`, `.unban`, `.ipban`, `.permanent`, `.revoke` | admin |
| `supmod.punish.menu`, `.history`, `.notify`, `.silent` | staff |
| `supmod.punish.templates` | modifier les modèles (admin) |
| `supmod.punish.template.<id>` | modèles qui demandent une permission |
