# What is SupMod?

SupMod is a moderation and server management plugin for **Spigot and Paper**. It replaces the handful of plugins a server usually needs for its staff (reports, bans, vanish, staff mode, logs...) and adds the tools to run the server itself (health, maintenance, MOTD, tab, zones, holograms...).

Everything is built around **menus**: a moderator rarely needs to remember a command. The player file opens from `/sm profile <player>` or from the staff mode tools, and every action is one click away.

## What you need {#what-you-need}

| | |
|---|---|
| Server | Spigot or Paper, Minecraft **1.21 to 26.x** |
| Java | **21** or newer |
| Database | Nothing to install: SQLite is used by default. MySQL / MariaDB is supported to share the data between servers. |
| Optional plugins | [Vault](https://www.spigotmc.org/resources/vault.34315/) (the coins become the server economy), [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) (SupMod placeholders in other plugins, other placeholders in SupMod) |
| Languages | English and French, every message can be edited |

## What it does {#what-it-does}

### For the staff {#for-the-staff}

- [Reports](/features/reports): `/report` with a reason menu, a comment and the last messages of the player as evidence. Moderators claim a report so that two of them never handle the same one.
- [Punishments](/features/punishments): warn, mute, kick, ban and IP ban, temporary or permanent, silent with `-s`. **Templates** apply the right step automatically: first insult = warning, second = 1 h mute...
- [Appeals](/features/appeals): the ban screen shows a code; the player appeals and the staff accepts or refuses in a menu.
- [Staff tools](/features/staff-tools): staff mode with its tools, vanish, freeze, staff chat, command spy, quick game mode.
- [Player files](/features/player-management): everything about a player, even offline: play time, punishments, reports, chat history, notes and tags, timeline, IP and alt accounts, quick actions and inventory edition.
- [Tickets](/features/tickets): `/helpop` questions in a queue, answered in game and rated by the players.
- [Chat](/features/chat): anti-spam, anti-advertising, word filter, chat history, lock, clear and slow mode.
- [Alerts](/features/alerts): alt accounts and ban evasion, x-ray detection.

### For the server {#for-the-server}

- [Health and lag](/features/server-health): TPS, memory and graphs, most loaded chunks, ground items cleanup.
- [Worlds](/features/worlds), [maintenance and restarts](/features/maintenance).
- [MOTD, tab, sidebar, boss bars and join messages](/features/display).
- [Zones](/features/zones) with messages and rules, [holograms](/features/holograms) and leaderboards.
- [Announcements](/features/announcements), [Discord logs](/features/discord), [security](/features/security).
- [Several servers](/guide/network) on one MySQL database: bans, mutes, staff chat and alerts are shared.

### For the players {#for-the-players}

- [Rewards](/features/rewards) for play time and daily logins, [bounties](/features/bounties), [statistics and leaderboards](/features/statistics), [coins](/features/economy).

## How the documentation is organised {#how-the-documentation-is-organised}

- **Getting started**: install the plugin, set it up and give the permissions.
- **Features**: one page per feature, with its commands, permissions and options.
- **Reference**: every [command](/reference/commands), [permission](/reference/permissions), [placeholder](/reference/placeholders) and [configuration file](/reference/config-files). These pages are generated from the plugin itself.

::: tip Need help?
Ask on the [Discord server](https://discord.gg/f7eKwemeMX). Give your SupMod version (`/sm version`), your server software and the error of the console if there is one.
:::
