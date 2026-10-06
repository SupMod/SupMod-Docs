# Changelog

The changes of each version of SupMod. Download the latest version on [SpigotMC](https://www.spigotmc.org/resources/supmod.108806/); to update, read [Updating](/guide/updating).

## 2.3.0 — Player management {#v2-3-0}

### Added
- **Quick game mode**:
  - `/gm 0-3 [player]`, `/gmc`, `/gms`, `/gma`, `/gmsp`; `/gm` alone opens a menu;
  - one permission per mode (`supmod.gamemode.creative`…) and `supmod.gamemode.others`;
  - button in the player file and new staff mode tool;
  - every change is written to the staff history.
- **Quick actions** in the player file: heal, feed, game mode, teleport to the player, teleport the player here, freeze, clear the inventory (with confirmation).
- **Editable inventory and ender chest** (`supmod.admin.inventory.edit`):
  - click: take the stack; right-click: take half; Q / Ctrl+Q: delete; click in your own inventory: give;
  - each click is an operation done by the server: no duplication is possible, even if the player uses their inventory at the same time;
  - every item taken, given, deleted or cleared is logged (`sm_inventory_log`, `/sm invlog`).
- **Staff notes and tags**:
  - notes (`/sm notes`, `/sm note`) and configurable tags ("to watch", "suspected cheating", "VIP");
  - watch list (`/sm watchlist`);
  - alert to the staff when a watched player joins.
- **Player timeline** (`/sm timeline`): sessions, punishments, reports made and received, notes, tickets and appeals in a single view, with the names and IPs used. `/sm ip <ip>` lists all the accounts of an IP.
- **AFK detection** and `/afk`:
  - AFK after X minutes without activity (head rotation, walking, chat, commands, interactions);
  - AFK time is removed from play time and from play time rewards;
  - optional kick after X minutes, or when the server is full;
  - placeholders `%supmod_afk%` and `%supmod_afk_tag%`.
- **Tickets** (`/ticket`, `/helpop`):
  - queue for the staff with claims, like reports;
  - in-game replies, delivered at the next login if the player is away;
  - the player rates the help from 1 to 5 stars.
- **Appeals**:
  - the ban screen shows a signed appeal code that cannot be guessed;
  - `/appeal <code> <message>`, or `/appeal <message>` for a mute;
  - the staff accepts (the punishment is lifted) or denies in `/sm appeals`; the player is notified, even when offline;
  - everything is logged; a future web panel can create appeals (`source = WEB`).
- **Statistics**:
  - copy of the Minecraft statistics (distance, blocks mined and placed, kills, deaths…) on logout and every 10 minutes, spread over ticks;
  - daily totals (`sm_daily`): unique players, new players, peak, active play time, punishments, reports, tickets, with charts (`/sm activity`);
  - staff statistics (`/sm staffstats`): punishments, reports handled and average response time, tickets and average rating, appeals, time in staff mode and in vanish;
  - retention: days played, seniority, new players who came back after 7 and 30 days, returns after an absence.
- **Multi-server sync** through the shared MySQL database:
  - bans, mutes, kicks, warnings, staff chat and staff alerts shared between servers;
  - no port, plugin or external service needed; `/sm network` shows the status;
  - event format documented for a future web panel.
- **In-game settings**: new categories Players, Tickets and appeals, Statistics and Network.
- **Discord**: `ticket` and `appeal` events.

### Changed
- The settings menu now has 6 rows.
- The ban screen messages (`punish.screen.ban` and `tempban`) show the appeal code (`%code%`).
- New indexes on punishments, reports, players and sessions, added automatically.

### Fixed
- The Security category did not appear in `/sm settings`.
- The Discord events `punishment`, `staff-chat`, `alert` and `bounty` were never sent.

### Security
- The staff mode inventory can neither receive nor give items while editing an inventory (the items would be lost).
- `supmod.player.exempt` protects staff from the actions of other staff members (operators keep full control).
- Appeal codes are limited to 5 errors per 10 minutes; nobody can handle their own appeal, and accepting an appeal requires the permission to lift the punishment.
- Alerts received from other servers are limited to the staff alert permissions and to read-only commands.
- Heavy statistics menus share their cached results: they cannot overload the database.

## 2.2.0 — Server management {#v2-2-0}

### Added
- **Server health** (`/sm health`): TPS over 1, 5 and 15 min, measured by SupMod (also works on Spigot), MSPT on Paper, memory, players, entities, chunks, uptime.
  - 24 h charts, summary of the last 7 days, menu refreshed every 2 s.
  - Alerts to the staff and on Discord when the TPS is low or the memory is almost full.
  - History kept in the `sm_server_stats` table.
- **Anti-lag tools** (`/sm lag`):
  - most loaded chunks, with one-click teleport;
  - ground item cleanup with a countdown (disabled by default);
  - mob limit per chunk (disabled by default).
- **World management** (`/sm worlds`):
  - statistics: players, chunks, entities by type, in-game days and real days, size on disk;
  - actions: time, weather, difficulty, PvP, spawn, border, auto-save, game rules;
  - loading an existing world folder, unloading a world.
- **Maintenance mode** (`/sm maintenance`): countdown, kicking players, whitelist, dedicated MOTD. Staff with `supmod.maintenance.bypass` can still join.
- **Scheduled restarts**:
  - at fixed times and days, or with `/sm restart 10m`;
  - countdown in the chat, as a title and in a boss bar;
  - commands run before the shutdown.
- **MOTD**: rotation, hex colors, maintenance MOTD, customizable displayed maximum, vanished staff excluded from the player count.
- **Tab**: animated header and footer, name format per permission, sorting by rank (optional), placeholders (ping, TPS, online staff…).
- Optional **sidebar**, without flickering. `/sidebar` hides it. It never replaces another plugin's scoreboard.
- **Boss bars**: rotating announcements and `/sm bossbar`.
- **Join messages**:
  - format per permission;
  - first join with the player's number;
  - welcome titles;
  - first join kit.
- **Zones** (`/sm zones`):
  - selection wand;
  - on enter and on leave: messages, titles, action bar, sounds, commands;
  - rules: no PvP, no flying, entry permission;
  - edges adjustable live, with a particle preview.
- **Holograms** (`/sm holograms`): `TextDisplay` entities, no armor stands.
  - Live position editor, in steps from 0.05 to 1 block.
  - Rotation, size, background, shadow, placeholders.
- **Hologram leaderboards**: top kills, play time, wealth and daily streak.
- **In-game settings**: 7 new categories (server, MOTD and tab, sidebar, join, worlds, zones, holograms) and the `display.yml` file.

### Security
- New permission **`supmod.admin.commands`**, not included in `supmod.admin`. It is required to change any console command run by SupMod: rewards, zones, welcome kit, restart.
- Every menu checks its permission again when opened and on every click, including confirmation menus and list editors.
- Player names inserted into console commands are checked, which protects against injection through Bedrock names.
- Only existing world folders can be loaded, with a checked name: no `../` path.
- **Zones**:
  - a player can never be trapped in one;
  - enter and leave commands work in pairs, with an anti-spam;
  - the entry permission is also checked for teleports, portals, vehicles and respawning.
- **Maintenance**: the check happens at login, once the permissions are loaded. A refused player never enters the world.

### Changed
- Menus can refresh automatically, and a confirmation menu inherits the permission of the menu that opened it.
- Zone and hologram changes are saved every 5 s, to avoid a write on every click.

---

## 2.1.0 — Complete moderation suite {#v2-1-0}

### Added
#### Moderation
- **Punishments**: `/warn`, `/mute`, `/kick`, `/ban`, `/ipban`, `/unmute`, `/unban`. They can be temporary (`30m`, `2h`, `7d`, `1mo`, `1y`, or combined like `1d12h`) or permanent (`perm`), and silent with `-s`.
  - A customizable ban screen, with an appeal link.
  - The ban is checked at login, then checked again after the player arrives.
  - A mute also blocks private messages.
- **Punishment templates** (`punishments.yml`): ladders like "Insult: 1st = warning, 2nd = 1 h mute, 3rd = 1 d ban".
  - Six templates are included.
  - A permission can be required per template.
  - They can be created and edited in game with `/sm templates`.
- **Punishment menu**: it opens from the player file, a report, the player list or the staff mode tool.
  - It shows the next step of each template.
  - It offers quick punishments with a duration and a reason typed in the chat.
  - It handles silent mode and asks for confirmation.
- **Punishment history**: `/history <player>`, with one-click undo and a reason.
- **Staff mode**: `/staffmode`. The inventory is saved (and restored even after a crash), with vanish, flight, invulnerability and 8 tools:
  - random TP;
  - freeze;
  - player file;
  - inventory;
  - punishment;
  - players;
  - vanish;
  - leave.
- **Vanish**: `/vanish`. The player is hidden from players, tab completion and menus. Join and leave messages are hidden, and vanish is kept after reconnecting.
- **Freeze**: `/freeze`. A frozen player can no longer move, build, fight, use commands or vehicles.
  - They see a menu they cannot close, with a "call the staff" button.
  - If they log out, an automatic punishment is applied.
- **Staff chat**: `/sc` (toggle or message) and the `#` prefix. **Command spy**: `/commandspy`.
- **Chat and command history**: the last 50 lines per player. They are automatically attached to reports as evidence, readable as a book.
- **Anti-spam**:
  - minimum delay, flood, repeated messages (similarity), capital letters and repeated characters;
  - advertising (IPs and domains, with a whitelist);
  - automatic punishment;
  - `/sm chat lock|unlock|clear|slow <s>`.
- **Alt account alerts**: same IP as a banned account or an online player, with optional blocking of banned players' accounts.
- **X-ray alerts**: abnormal ratio of diamond ore or ancient debris veins. Alerts are clickable (TP), with a history in `/sm alerts`.
- **Reports**:
  - free comment;
  - claim ("claimed by X", with an expiry);
  - staff note, closing with a note;
  - direct punishment, and automatic closing after a punishment;
  - action menu with `/sm report <id>`.
- **Staff action history**: `/sm staffhistory [staff]`.

#### Players
- **Rewards** (`rewards.yml`):
  - play time milestones (1 h, 10 h, 50 h, 100 h);
  - daily bonus with a streak (7-day cycle);
  - coins and/or commands;
  - `/rewards` and `/daily`;
  - in-game management.
- **Bounties**: `/bounty <player> <amount>`, paid to the killer.
  - A tax, a delay between two bounties and an expiry with a refund.
  - They are ignored between accounts with the same IP.
  - They can be turned on or off with `/bounty on|off`.
- **Statistics**: `/stats [player]` and cached leaderboards (play time, kills, wealth, streak). They can be turned on or off with `/stats on|off`.
- **Automatic announcements** (`announcements.yml`): rotating, with clickable links, commands and hover texts. They are managed with `/sm announce`.
- **Coin history**: `/coins history [player]`, which includes payments, rewards, bounties, staff and Vault.

#### Administration
- **`/sm settings`**: more than 160 settings editable in game in `config.yml`, `punishments.yml`, `rewards.yml` and `announcements.yml`.
  - Toggles, numbers, texts, lists, choices and materials.
  - Default value with a right-click.
  - Instant saving and reloading.
- **Detailed permissions** for each action, with the groups `supmod.staff`, `supmod.admin` and `supmod.*`.
- **Placeholders**: `bounty`, `streak`, `best_streak`, `muted`, `vanished`, `frozen`, `staffmode`, `chat_locked`, `online_visible`, `rank_<board>` and `top_<board>_<n>_<name|value>`.
- **Discord**: new events `punishment`, `staff-chat`, `alert` and `bounty`.

### Changed
- **Menus**:
  - border with colored corners (`gui.accent-material`);
  - click sound (`gui.click-sound`);
  - confirmations;
  - list editor.
- **Player file**:
  - ban and mute status;
  - punishment, history, chat, transactions, alerts, freeze and stats buttons.
- **Player list**:
  - vanish, freeze, mute and staff mode tags;
  - right-click to TP, shift-click to punish.
- **Report list**: a click opens the action menu, and a shift-click opens the player file.
- **Retention tasks** for the new tables: chat, staff actions, alerts and transactions.

### Fixed
- Banning or kicking a frozen player no longer triggers the "logout while frozen" punishment.
- The daily reward can no longer be paid twice: quick reconnect, several MySQL servers.
- Vanished and frozen players no longer stay stuck when the module is disabled, or after reconnecting.
- Vanished players no longer appear in tab completion, `/report` or the bounty menu.

---

## 2.0.0 — Complete rewrite {#v2-0-0}

### Compatibility
- Spigot and Paper, from **1.21** to **26.x** (Java 21 minimum; Java 25 for 26.x servers).
- The plugin is built with Maven (`mvn package`). The `.iml` file and the `out/` folder are no longer used.
- The jar only uses the Spigot API (nothing specific to Paper), and has been checked against the current 26.x API.

### Migration from 1.x (automatic)
- **`config.yml`** is converted to the new format, and the old one is saved as `config-1.x-backup.yml`.
  - Banned words switch to `LOG` mode, as in 1.x.
  - `emojy.yml` becomes `emojis.yml`.
- **Data**: players, play time, kills and deaths, reports, insults, kill and drop logs, coins (`coins.yml`).
  - They are imported only once, on the first startup.
  - The old tables are not deleted.
- **Permissions**: the old names are kept, but some have changed role.
  - `/report` now uses **`supmod.report`**, given to everyone by default. Before, it required `supmod.player`, which also opened the staff menu.
  - `supmod.player` remains the permission for the player menu, reserved for staff.
  - The report menu requires `supmod.admin.report.manage`, and no longer `supmod.admin`.
  - New group **`supmod.staff`** (moderators). `supmod.admin` includes everything.

### Bugs fixed
#### Crashes
- **Offline players**: menus crashed (ClassCastException, NullPointerException).
- **`/report` on an offline player**: the report was saved, then the plugin crashed before notifying the staff.
- **Game rules menu**: it crashed as soon as there were more than 36 rules (all recent versions). All rules are now handled, with pages and world selection.
- **Placeholders**: `%supmod_...%` crashed for offline players.

#### Security and permissions
- **Menus**: items could be dropped into them (lost when closed). All clicks and drags are now blocked.
- **`/report`**: the permission gave access to players' inventories and teleporting to them.
- **Discord**: a player could trigger an `@everyone` mention through the chat relay.
- **Login anti-spam**: it did not block bots, but permanently banned the IP of a real player. The block is now temporary, per IP, with a whitelist.
- **`report.notify-target`**: the reported player learned who had reported them. This is no longer the case.

#### Behavior errors
- "Daily" tasks ran every hour.
- The kill webhook swapped the killer and the victim.
- The pickup log recorded the player who had dropped the item instead of the one who picked it up.
- The mention sound was played to the sender instead of the mentioned player.
- `/broadcast` checked a permission that did not exist.
- The `/sm spec_teleport` messages were swapped.
- `/coins remove` showed a wrong balance.
- `/coins give` could exceed the integer limit.
- The menu page was shared between all moderators.
- Items tracked by the drop log no longer stacked.
- Messages from players who were already muted were still sent to Discord.

### Performance
- All SQL queries go through a dedicated thread: the server never waits for the database.
- Statistics and coins of online players are kept in memory. Placeholders and the scoreboard therefore cost nothing.
- HTTP calls (Discord, update check) are asynchronous and have timeouts. worldtimeapi.org is no longer used.
- Database indexes have been added, and old logs are purged automatically (`storage.log-retention-days`).

### New features
- Optional **MySQL/MariaDB**, to share data between several servers.
- **Vault**: coins become the server economy, usable by shops and other plugins. Also added: `/coins top`, `/coins pay` to an offline player, and optional decimals.
- **Reports**: delay between two reports, no duplicates, clickable notification for the staff, reminder of open reports at login, handled or rejected status, and a message to the player when their report is handled.
- **Complete player file, even offline**:
  - IP and accounts sharing the same IP;
  - Ender chest;
  - inventory of the killer and the victim at the time of the kill;
  - the player's drops.
- **Moderation tools**: `/sm tp` in spectator mode, then `/sm return` to go back to your position and game mode.
- **Chat filter**:
  - three modes: LOG, CENSOR (`****`) or BLOCK;
  - whole words;
  - variant detection (`b4dw0rd`, accents);
  - alerts to the staff and on Discord.
- **Statistics**: `/playtime` and `/playtime top`.
- **Languages**: new messages are added automatically to the language files, and hex colors `&#RRGGBB` are accepted. Text written by players can no longer inject colors.
- **Scheduled tasks**: they follow the real time and the configured time zone, and can be limited to certain days.
- **Console**: most `/sm` commands work there.
