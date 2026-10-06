# Annonces et règles

## Annonces automatiques {#automatic-announcements}

Des messages envoyés dans le chat toutes les quelques minutes, avec des liens cliquables. Ils se trouvent dans `announcements.yml` et se gèrent en jeu avec `/sm announce` (permission `supmod.announce.admin`).

```yaml
enabled: true
interval-seconds: 300
random: false              # false = dans l'ordre du fichier
min-players: 1             # aucune annonce sous ce nombre de joueurs
sound: "block.note_block.pling"
header: "&8&m                                                  "
footer: "&8&m                                                  "
messages:
  rules:
    enabled: true
    lines:
      - "&d&lRULES &7» &fRead the rules with [&d&n/rules](cmd:/rules|&7Click to read the rules)&f."
  discord:
    enabled: true
    lines:
      - "&9&lDISCORD &7» &fJoin us: [&9&ndiscord.gg/example](url:https://discord.gg/example|&7Open the invite)&f!"
```

### Parties cliquables {#clickable-parts}

| Syntaxe | Au clic |
|---|---|
| `[text](url:https://example.com\|hover)` | ouvre le lien |
| `[text](cmd:/rewards\|hover)` | exécute la commande |
| `[text](suggest:/report \|hover)` | écrit la commande dans la barre du chat |
| `[text](copy:play.example.com\|hover)` | copie le texte |

La partie après `|` est le texte affiché au survol (facultatif). `%online%` est remplacé par le nombre de joueurs en ligne.

| Commande | |
|---|---|
| `/sm announce` | la liste (menu) : activer ou désactiver une annonce, l'envoyer maintenant |
| `/sm announce send <id>` | envoyer une annonce maintenant |
| `/sm announce on` / `off` | toutes les annonces |
| `/sm announce reload` | recharger le fichier |

Les joueurs qui ont `supmod.announce.bypass` ne les reçoivent pas.

## Règles à la connexion {#rules-on-join}

`auto_rules.txt` est envoyé à chaque joueur quelques secondes après sa connexion :

```text
&d&m                                              
&fWelcome &d%player%&f! Please respect the rules:
&7- &fNo cheating, no duplication glitches
&7- &fNo insults, no spam, no advertising
&7- &fNo griefing or stealing
&fUse &d/report &fto report a player to the staff.
&8%online% player(s) online - %full_date%
&d&m                                              
```

Placeholders : `%player%`, `%online%`, `%world%`, `%gamemode%`, `%full_date%`, `%date%`, `%time%`, et les placeholders PlaceholderAPI.

```yaml
auto-rules:
  enabled: true
  delay-seconds: 5
  first-join-only: false
```

## Commandes programmées {#scheduled-commands}

Des commandes console exécutées chaque jour à une heure donnée (fuseau horaire de `timezone`), éventuellement certains jours seulement :

```yaml
tasks:
  - time: "12:00"
    commands:
      - "say &6Hello everyone, it's time to eat!"
  - time: "21:00"
    days: [SATURDAY, SUNDAY]
    commands:
      - "weather clear"
```

`/sm tasks` les liste (permission `supmod.tasks.list`).

## Diffusion {#broadcast}

`/broadcast <message>` (alias `/br`, permission `supmod.broadcast`) : un message à tout le serveur avec le préfixe `broadcast.prefix`.
