# Drop log

The drop log records the items dropped by some players and **who picks them up** (a player, a mob or a hopper), with the place and the date. Use it to check a suspicious trade, a stuff given to an alt account or a duplication.

By default, only the **watched players** are logged: nothing is written until you watch somebody, so the log costs nothing on a server where nobody is watched.

## Watch a player {#watch-a-player}

Four ways, all of them work for offline players:

| Where | How |
|---|---|
| `/sm drops` | **Watch a player** button: type his name, then the duration and the reason in the chat |
| Player file | right click the hopper: watch with the default duration, or stop watching; shift + right click: choose the duration and the reason |
| `/sm players` | <kbd>Q</kbd> on a player: watch with the default duration, or stop watching |
| Chat | `/sm drops add <player> [duration] [reason]` |

The duration has the format of the punishments: `12h`, `7d`, `1mo`, or `perm` for a permanent watch. Without duration, the watch lasts `drop-log.default-duration` (7 days). Expired watches are removed automatically. Watching a player again changes his duration and reason.

```text
/sm drops add Steve 3d gave his stuff to a new account
/sm drops add Alex perm duplication suspected
/sm drops remove Steve
```

Each addition, change and removal is written in the [staff history](/features/staff-tools#staff-history) (`DROP_WATCH_ADD`, `DROP_WATCH_EDIT`, `DROP_WATCH_REMOVE`). With [several servers](/guide/network), the watch list is shared: a player watched on one server is logged on all of them.

### Automatic watch {#automatic-watch}

Some players are logged without being added to the list:

- players having one of the [staff tags](/features/player-management#notes-and-tags) of `drop-log.auto-watch.tags` (`watch` "To watch" and `cheat` "Suspected cheat" by default), as long as they have the tag;
- new players during their first `drop-log.auto-watch.new-players-minutes` minutes of play time (off by default).

They appear in the menu with an **Auto** badge and in `/sm drops list`. Right click to watch one of them manually.

## Commands {#commands}

| Command | Permission | |
|---|---|---|
| `/sm drops` | `supmod.admin.drops` | the menu of the watched players (from the console: the list) |
| `/sm drops list` | `supmod.admin.drops` | the watched players in the chat; click a name to open his log |
| `/sm drops log [player]` | `supmod.admin.drops` | the whole log, or the drops of one player |
| `/sm drops add <player> [duration] [reason]` | `supmod.admin.drops.watch` | watch a player, or change his duration and reason |
| `/sm drops remove <player>` | `supmod.admin.drops.watch` | stop watching (the log already written is kept) |
| `/sm drops on` / `off` | `supmod.admin.drops.watch` | switch the drop log on or off |
| `/sm drops mode watchlist` / `all` | `supmod.admin.drops.watch` | log the watched players only, or everybody |

## The menus {#the-menus}

`/sm drops` lists the watched players, the last added first, with the reason, who added them and when, the end of the watch and whether they are online. The header shows the mode, the number of watched players, the auto-watch settings and the drops not logged because of the limit.

| Click on a player | |
|---|---|
| Click | his drop log |
| Right click | stop watching (with confirmation); on an **Auto** player: watch him manually |
| Shift + click | change the duration and the reason |

The bottom buttons: **Watch a player**, drop log on / off, mode, **Whole drop log**, and **Settings** (the Security category of `/sm settings`).

The **drop log** shows each drop with the item, the place, the date and who picked it up. A filter cycles between *all*, *not picked up* and *picked up by somebody else*.

| Click on a drop | |
|---|---|
| Click | teleport to the place of the drop |
| Right click | file of the player who picked it up |

The log of a player is also opened by the hopper of his [player file](/features/player-management), which shows whether he is watched and until when.

## How it works {#how-it-works}

- An item is followed from the moment it is dropped until it is picked up, merged with another stack or despawns. An item dropped before a disconnection and picked up later by a friend is still found (items are followed 24 hours, and again after a restart).
- In mode `ALL`, every player is logged: keep it for small servers.
- To protect the server, each player has a limit of logged drops per minute (`max-per-minute`, 60). The other drops are only counted, and a line "N drops not logged" sums them up in the log.
- Worthless items (`ignored-items`: cobblestone, dirt, netherrack...) are never logged.
- The drops are written to the database in one batch every `flush-seconds` (3), never on the main thread.
- The log is kept `storage.log-retention-days` (90) days, like the other logs.

## Options (config.yml) {#options-config-yml}

| Option (`drop-log.`) | Default | |
|---|---|---|
| `enabled` | `true` | drop log on / off (servers updated from 2.3 keep their value) |
| `mode` | `WATCHLIST` | `WATCHLIST`: watched players only; `ALL`: every player |
| `max-watched` | `100` | maximum number of watched players (0 = no limit; automatic watches not counted) |
| `default-duration` | `7d` | duration of a watch added without duration (`perm` = permanent) |
| `max-per-minute` | `60` | logged drops per player and per minute (0 = no limit; in mode `ALL`, 0 still means 600) |
| `flush-seconds` | `3` | the drops are written in one batch every X seconds (1-60) |
| `ignored-items` | `COBBLESTONE`, `COBBLED_DEEPSLATE`, `DIRT`, `NETHERRACK`, `ROTTEN_FLESH` | items never logged |
| `auto-watch.tags` | `watch`, `cheat` | staff tags that log a player automatically |
| `auto-watch.new-players-minutes` | `0` | log the new players during their first X minutes of play (0 = off) |

Every option can be changed in game: `/sm settings` › **Security**.

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.admin.drops` | see the log, the watched players and the hopper of the player file (admin) |
| `supmod.admin.drops.watch` | watch and unwatch players, on / off, mode; includes `supmod.admin.drops` (admin) |

::: info Updating from 2.3
The players of the old `drop-log.players` list (UUIDs in `config.yml`) are moved to the database at the first start, as permanent watches, and the key is removed. Entries that are neither a UUID nor a known player name stay in `config.yml` with a warning in the console: fix them or add the players with `/sm drops add`.
:::

::: tip A drop is a clue
A player giving his stuff to another account is not always cheating. Check the [timeline](/features/player-management#timeline) and the IPs of both accounts before punishing.
:::
