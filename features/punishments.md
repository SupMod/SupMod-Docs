# Punishments

Warnings, mutes, kicks, bans and IP bans, temporary or permanent, with a full history. **Templates** turn your rules into ladders that SupMod follows for you.

## Commands {#commands}

| Command | |
|---|---|
| `/warn <player> [reason] [-s]` | warning (shown at the next connection if the player is offline) |
| `/mute <player> [duration] [reason] [-s]` | mute; no duration = permanent |
| `/kick <player> [reason] [-s]` | kick |
| `/ban <player> [duration] [reason] [-s]` | ban, works for offline players |
| `/ipban <player> [duration] [reason] [-s]` | ban the player and his IP |
| `/unmute`, `/unban <player> [reason]` | lift the punishment |
| `/punish <player> [template] [-s]` | the punishment menu, or the next step of a template |
| `/history <player>` | the history, click a punishment in force to revoke it |

Durations: `30s`, `10m`, `2h`, `7d`, `2w`, `1mo`, `1y`, combinable (`1d12h`). Without `supmod.punish.permanent`, a duration is required.

`-s` makes the punishment **silent**: it is not announced to the players, only to the staff with `supmod.punish.notify`.

```text
/mute Steve 30m Spam in the chat
/ban Steve 7d Kill aura -s
/punish Steve insult
```

## The punishment menu {#the-punishment-menu}

`/punish <player>` (or the axe of the player file, the staff mode or a report) shows:

- the number of warnings, mutes, kicks and bans already received;
- every **template**, with the step that will be applied next ("Next: mute 1 h, step 2/4");
- quick buttons for a custom warning, mute, kick, ban or IP ban (duration and reason typed in the chat);
- a **silent** switch and the history.

A confirmation is asked before applying a template (`confirm-in-menu` in `punishments.yml`). The quick buttons apply directly once the duration and reason are typed.

## Templates {#templates}

A template is a ladder for one kind of fault. The number of punishments already received **with this template** gives the step: first time = first step, second time = second step... The last step is repeated after that.

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

| Key | |
|---|---|
| `type` | `WARN`, `MUTE`, `KICK` or `BAN` |
| `duration` | for `MUTE` and `BAN`; `perm` = permanent |
| `ip: true` | IP ban / IP mute |
| `permission` | optional: needed to use the template |

Applying a step also needs the permission of its type (`supmod.punish.ban` for a `BAN` step, `supmod.punish.ipban` with `ip: true`) and `supmod.punish.permanent` for a `perm` step. With the default groups, moderators (`supmod.staff`) cannot apply the ban steps of the templates: `cheat`, `grief` and `freeze-quit` are refused to them, `advertising` from its 2nd step and `insult` from its 4th. Give them `supmod.punish.ban` or adapt the templates.

Six templates are included: insult, spam, advertising, grief, cheat and `freeze-quit` (applied automatically when a frozen player disconnects). Edit them in game with `/sm templates` or in `punishments.yml`.

Templates are also used automatically by the [anti-spam](/features/chat#anti-spam) (`spam`) and the [freeze](/features/staff-tools#freeze) (`freeze-quit`), and proposed by the [report reasons](/features/reports#configure-the-reasons).

## What the punished player sees {#what-the-punished-player-sees}

- **Ban**: the ban screen with the reason, the staff member, the duration and the [appeal code](/features/appeals). Its text is `punish.screen.*` in the language file.
- **Mute**: a message at each attempt to talk; the commands of `muted-commands` (`/msg`, `/r`...) are blocked too.
- **Warning**: a message, a big title (`warn-title`) and a sound; shown at the next connection if he was offline.

## Settings (punishments.yml) {#settings-punishments-yml}

| Option (`settings.`) | Default | |
|---|---|---|
| `broadcast` | `true` | announce the punishments to everyone (`false`: only to the staff) |
| `silent-flag` | `-s` | flag of the silent punishments |
| `appeal-url` | `""` | link shown on the ban screen (your Discord, forum...) |
| `confirm-in-menu` | `true` | confirmation before applying from a menu |
| `warn-title` | `true` | title shown to the warned player |
| `muted-commands` | `msg`, `tell`, `r`... | commands blocked while muted |
| `default-reasons` | | reason used when none is given, per type |

## Protection {#protection}

- Operators have `supmod.punish.exempt`: a staff member cannot punish them. The console can.
- A banned player who joins with another account on the same IP can be refused: see [Alerts](/features/alerts) (`block-banned-alts`).
- With several servers on one database, a ban applies everywhere at once: see [Several servers](/guide/network).

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.punish.warn`, `.mute`, `.unmute`, `.kick` | staff |
| `supmod.punish.ban`, `.unban`, `.ipban`, `.permanent`, `.revoke` | admin |
| `supmod.punish.menu`, `.history`, `.notify`, `.silent` | staff |
| `supmod.punish.templates` | edit the templates (admin) |
| `supmod.punish.template.<id>` | templates that require a permission |
