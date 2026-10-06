# AFK

A player who does nothing for 5 minutes becomes **AFK**. Only what the player does himself counts: turning his head, walking, chatting, typing a command, using an item or a block, clicking in an inventory. Being pushed by water or riding a minecart does not count.

`/afk` (alias `/away`, permission `supmod.afk`) sets you AFK by hand; any activity brings you back.

## What it changes {#what-it-changes}

- **Play time**: the AFK time is removed from the play time (from the moment the player stopped moving, not only from the detection), and therefore from the [play time rewards](/features/rewards) and the leaderboards. An AFK farm no longer earns rewards.
- **Statistics**: the AFK time of each player is counted apart ([Minecraft statistics](/features/statistics)), and the "active play time" of the [daily statistics](/features/statistics#daily-activity) only counts players who are not AFK.
- **Player file**: "AFK for 12 min" in the head of the file.
- **Placeholders**: `%supmod_afk%` (true / false) and `%supmod_afk_tag%` (`[AFK]` or nothing) for the tab, the nametags or the chat; `%afk%` in the SupMod tab and sidebar.

## Kick the AFK players {#kick-the-afk-players}

| Option (`afk.`) | Default | |
|---|---|---|
| `kick-after-minutes` | `0` | kick after X minutes AFK (0 = never) |
| `kick-when-full` | `false` | server full: the player AFK for the longest time is kicked to let a new player join (never during the maintenance) |

Players with `supmod.afk.kickexempt` (the staff) are never kicked.

## Options (config.yml) {#options-config-yml}

| Option (`afk.`) | Default | |
|---|---|---|
| `enabled` | `true` | module on / off |
| `minutes` | `5` | minutes without activity |
| `count-movement` | `true` | walking counts as an activity (`false`: only the head, the chat, commands and interactions) |
| `announce` | `false` | tell the other players |
| `exclude-from-playtime` | `true` | remove the AFK time from the play time |

`supmod.afk.exempt` (part of `supmod.staff`, so staff members by default) prevents a player from being marked AFK automatically.
