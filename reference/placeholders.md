# Placeholders

## PlaceholderAPI {#placeholderapi}

With [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed, these placeholders work in every plugin (tab, scoreboard, chat, holograms...). Nothing to download: SupMod registers them itself.

### Player {#player}

| Placeholder | Example | |
|---|---|---|
| `%supmod_playtime%` | `3d 4h` | play time (without the AFK time) |
| `%supmod_playtime_hours%` | `76` | play time in hours |
| `%supmod_playtime_seconds%` | `273600` | play time in seconds |
| `%supmod_kills%` | `42` | players killed |
| `%supmod_deaths%` | `17` | deaths |
| `%supmod_kdr%` | `2.47` | kills / deaths |
| `%supmod_first_join%` | `12/03/2025 18:40` | first connection |
| `%supmod_last_join%` | `05/10/2026 21:02` | last connection |
| `%supmod_reports%` | `3` | reports received |
| `%supmod_reports_open%` | `1` | open reports received |
| `%supmod_chat_flags%` | `0` | messages caught by the word filter |

### Economy and rewards {#economy-and-rewards}

| Placeholder | Example | |
|---|---|---|
| `%supmod_coins%` | `$1250` | balance with the symbol |
| `%supmod_coins_number%` | `1250` | balance without the symbol |
| `%supmod_coins_raw%` | `1250.0` | raw value |
| `%supmod_bounty%` | `$500` | bounty on the player |
| `%supmod_bounty_raw%` | `500.0` | raw value |
| `%supmod_streak%` | `6` | current daily streak |
| `%supmod_best_streak%` | `21` | best daily streak |

### State {#state}

| Placeholder | Values | |
|---|---|---|
| `%supmod_afk%` | `true` / `false` | AFK |
| `%supmod_afk_tag%` | `[AFK] ` or nothing | to put before a name (text in the language file: `afk.tag`) |
| `%supmod_muted%` | `true` / `false` | muted |
| `%supmod_vanished%` | `true` / `false` | vanished |
| `%supmod_frozen%` | `true` / `false` | frozen |
| `%supmod_staffmode%` | `true` / `false` | in staff mode |
| `%supmod_chat_locked%` | `true` / `false` | chat locked |
| `%supmod_online_visible%` | `25` | online players, vanished staff not counted |

### Leaderboards {#leaderboards}

Boards: `playtime`, `kills`, `coins`, `streak`.

| Placeholder | Example | |
|---|---|---|
| `%supmod_rank_<board>%` | `%supmod_rank_kills%` → `4` | rank of the player (`-` if not in the top) |
| `%supmod_top_<board>_<n>_name%` | `%supmod_top_kills_1_name%` → `Steve` | name of the n-th player |
| `%supmod_top_<board>_<n>_value%` | `%supmod_top_kills_1_value%` → `128` | his value, formatted |

The tops go up to `stats.size` (10) and are refreshed every `stats.refresh-minutes` (5).

::: tip Fast
Every placeholder is read from memory: a scoreboard refreshed every tick never queries the database.
:::

## Placeholders of SupMod's own displays {#placeholders-of-supmod-s-own-displays}

In `display.yml` (MOTD, tab, sidebar, boss bars, join messages) and in the holograms, SupMod has its own short placeholders, even without PlaceholderAPI:

| Placeholder | |
|---|---|
| `%player%` | name of the player |
| `%online%`, `%max%` | online players (vanished staff not counted), maximum |
| `%staff_online%` | visible staff members online |
| `%ping%` | ping of the player |
| `%tps%` | TPS of the last minute |
| `%world%` | world of the player |
| `%time%`, `%date%` | time and date (time zone of `timezone`) |
| `%coins%`, `%playtime%`, `%kills%`, `%deaths%`, `%streak%`, `%bounty%` | values of the player |
| `%afk%` | `[AFK] ` or nothing |
| `%maintenance%` | `ON` or `OFF` |

With PlaceholderAPI installed, every PlaceholderAPI placeholder also works there. The MOTD only supports `%online%` and `%max%`; holograms only the placeholders that are the same for every player.

## From 1.x {#from-1-x}

The placeholders of SupMod 1.x were renamed in 2.0:

| SupMod 1.x | SupMod 2 |
|---|---|
| `%supmod_count_kill%` | `%supmod_kills%` |
| `%supmod_count_death%` | `%supmod_deaths%` |
| `%supmod_time_played%` | `%supmod_playtime%` |
| `%supmod_count_report%` | `%supmod_reports%` |
| `%supmod_count_active_report%` | `%supmod_reports_open%` |
| `%supmod_count_bad_words%` | `%supmod_chat_flags%` |
| `%supmod_first_connexion%` | `%supmod_first_join%` |
| `%supmod_last_connexion%` | `%supmod_last_join%` |
| `%supmod_coins%` | `%supmod_coins%` (unchanged) |
