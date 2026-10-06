# Reports

Players report a cheater or an insult with `/report`. The staff receives the report with the last messages of the player as evidence, takes it in charge and closes it, or punishes in one click.

## For the players {#for-the-players}

1. `/report` opens the list of online players (or `/report <player>` goes straight to the next step; offline players can be reported too if `allow-offline-target` is on).
2. A menu shows the **reasons** (cheat, duplication, behaviour, grief...).
3. The player can add a **comment** in the chat, or type `skip`.

The reporter is told when a staff member handles his report (`notify-reporter-when-handled`). The reported player is never told who reported him; he can be told that he was reported (`notify-target`, off by default).

A cooldown (`cooldown-seconds`, 60 s) prevents spam, and a player cannot report the same player again while his first report is still open. Nobody can report himself.

## For the staff {#for-the-staff}

- Every new report is announced to the staff with `supmod.admin.report.receive`, with a click to open it. It can also be sent to [Discord](/features/discord).
- `/sm reports` lists the reports (filters: open, closed, all). Connecting staff members are reminded of the open reports.
- `/sm report <id>` opens a report:

| Button | What it does |
|---|---|
| Take the report | Claims it: the other staff members see "handled by ..." and cannot close it. The claim is released after `claim-expire-minutes` (30) without action. |
| Evidence | The last messages of the reported player (15 by default) as a book. |
| Chat history | His recent messages and commands. |
| Staff note | A note only the staff can read. |
| Punish the player | Opens the punishment menu with the template of the reason proposed first; the report is closed automatically (`resolve-when-punished`). |
| Resolved / Rejected | Closes the report (right click: with a note). |
| Teleport | Teleports to the reported player when he is online. |

`supmod.admin.report.override` allows taking or closing a report claimed by somebody else.

## Configure the reasons {#configure-the-reasons}

The reasons of the menu are in `config.yml` › `report.reasons` (28 at most). `template` is the [punishment template](/features/punishments) proposed when the staff punishes from a report with this reason.

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

Items: names of the [Material list](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Material.html) (`DIAMOND_SWORD`, `PAPER`...).

## Options {#options}

| Option (`report.`) | Default | |
|---|---|---|
| `enabled` | `true` | module on / off |
| `cooldown-seconds` | `60` | delay between two reports of a player (`supmod.bypass.report.cooldown` ignores it) |
| `allow-offline-target` | `true` | report players who are offline |
| `notify-target` | `false` | tell the reported player (never who reported him) |
| `notify-reporter-when-handled` | `true` | tell the reporter when the report is closed |
| `remind-staff-on-join` | `true` | remind the open reports to connecting staff |
| `ask-comment`, `comment-max-length` | `true`, `150` | ask for a comment after the reason |
| `evidence.enabled`, `evidence.messages` | `true`, `15` | attach the last messages of the player |
| `evidence.include-commands` | `false` | also attach his commands |
| `claim-expire-minutes` | `30` | free a claimed report after X minutes without action (0 = never) |
| `resolve-when-punished` | `true` | punishing from a report closes it |

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.report` | use `/report` (everyone) |
| `supmod.admin.report.receive` | receive the new reports |
| `supmod.admin.report.manage` | `/sm reports`, handle the reports |
| `supmod.admin.report.override` | handle a report claimed by somebody else |
| `supmod.bypass.report.cooldown` | no cooldown |
