# Player files

`/sm profile <player>` opens the file of a player, **online or offline**. It is also opened by the book of the [staff mode](/features/staff-tools), `/sm players` and the reports.

## What the file shows {#what-the-file-shows}

| | |
|---|---|
| Head | status (online, world, game mode, health), ban or mute in force, vanished, frozen, AFK, tags; click to teleport |
| Information | first and last join, seniority, number of connection days, UUID; with `supmod.admin.ip`: last IP and accounts on the same IP |
| Play time | total, without the AFK time |
| Kills, deaths | with the details of each kill |
| Reports | reports received |
| Chat | messages caught by the word filter, chat and command history |
| Punishments | warnings, mutes, kicks and bans, the history and the punishment menu |
| Inventory, ender chest | see them, or edit them (below) |
| Transactions, alerts, drops | coins history, alt and x-ray alerts, drop log |
| Quick actions, notes, timeline, statistics, tickets, appeals | see below |

Each button only appears for the staff members who have its permission.

## Quick actions {#quick-actions}

The nether star of the file (or `/sm actions <player>`) groups the actions on an online player:

| Action | Permission |
|---|---|
| Heal (health, fire, food) | `supmod.player.heal` |
| Feed | `supmod.player.feed` |
| Game mode | `supmod.gamemode` + the mode |
| Teleport to him | `supmod.admin.teleport` |
| Bring him here | `supmod.player.tphere` |
| Freeze | `supmod.freeze` |
| Clear the inventory (with confirmation, armor and off hand included) | `supmod.player.clear` |
| Inventory, ender chest, inventory log | `supmod.admin.inventory`, `.edit`, `.log` |

The player is told what was done and by whom, and every action is in the staff history.

## Inventory edition {#inventory-edition}

With `supmod.admin.inventory.edit`, the inventory and the ender chest of an online player can be changed live:

| Click | Effect |
|---|---|
| Click an item of the player | take the stack into your inventory |
| Right click | take half of it |
| <kbd>Q</kbd> / <kbd>Ctrl</kbd> + <kbd>Q</kbd> | delete one item / the stack |
| Click an item of **your** inventory | give the stack |
| Right click in your inventory | give one item |

Each click is one operation done by the server, never a free movement of items: **nothing can be duplicated**, even if the player uses his inventory at the same time. You cannot take items while in staff mode (its inventory is replaced when you leave it).

Every item taken, given, deleted or cleared is written in the **inventory log** with the staff member, the item and the amount: `/sm invlog [player]` (permission `supmod.admin.inventory.log`).

::: info Protected players
Players with `supmod.player.exempt` (administrators by default, as part of `supmod.admin`) cannot be edited, cleared, moved or have their game mode changed by other staff members. Operators can still do it. Without the edit permission, the inventory is shown read only.
:::

## Notes and tags {#notes-and-tags}

Notes are messages that only the staff can read: "warned in private for his language", "suspected alt of X"... Tags are labels configured in `config.yml`:

```yaml
player-info:
  tags:
    watch: "&e⚑ To watch"
    cheat: "&c⚠ Suspected cheat"
    vip: "&6★ VIP"
  watch-alert:
    enabled: true
    tags: [watch, cheat]
```

When a player with one of the `watch-alert` tags joins, the staff with `supmod.watch.notify` is alerted (on every server of a [network](/guide/network)).

| Command | |
|---|---|
| `/sm notes <player>` | notes and tags (add a note, change the tags; shift + right click deletes a note) |
| `/sm note <player> <text>` | add a note from the chat |
| `/sm tag <player> <tag>` | add or remove a tag |
| `/sm watchlist` | every tagged player |

Permissions: `supmod.notes`, `supmod.notes.delete`, `supmod.tags`, `supmod.watch.notify`.

## Timeline {#timeline}

`/sm timeline <player>` (permission `supmod.timeline`) shows everything about the player in one list, newest first: connections and sessions, punishments and revocations, reports received and made, notes, tickets and appeals.

From the timeline, two buttons list the **names** he used and his **IP addresses** (with `supmod.admin.ip`). Click an IP to see every account that used it.

Connections, names and IPs come from the sessions, kept `storage.log-retention-days` (90) days: the name, IP and alt-account history covers this period.

## IP search {#ip-search}

`/sm ip <ip>` lists every account that connected with this IP; `/sm ip <player>` lists the IPs of a player (permission `supmod.admin.ip`). Useful to find alt accounts and ban evasion, together with the [alt alerts](/features/alerts).

## Minecraft statistics {#minecraft-statistics}

`/sm mcstats <player>` shows the Minecraft statistics copied by SupMod: play time, distance, blocks mined and placed, crafts, mobs and players killed, deaths, damage, fish, trades, enchantments, and the AFK time. See [Statistics](/features/statistics).
