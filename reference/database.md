# Database and web panel

All the data of SupMod is in ordinary SQL tables (SQLite or MySQL), prefixed with `sm_`. They are documented here for those who want to show it on a website, build a web panel or make backups.

::: warning Read freely, write carefully
Reading the tables is always safe. To change data, prefer the commands of the plugin: SupMod keeps some of it in memory (mutes, tags of online players...). The sections [Sync events](#sync-events) and [Appeals](#appeals) explain the two supported ways for another program to act on the server.
:::

Dates are in **milliseconds since 1970** (UTC), as returned by `System.currentTimeMillis()` or `Date.now()`. Players are identified by their UUID with dashes.

## Players {#players}

| Table | Content |
|---|---|
| `sm_players` | one line per player: `uuid`, `name`, `first_join`, `last_join`, `last_quit`, `playtime` (seconds, AFK excluded), `kills`, `deaths`, `last_ip` |
| `sm_sessions` | each connection: `uuid`, `name`, `ip`, `join_time`, `quit_time` |
| `sm_player_stats` | Minecraft statistics: `play_ticks`, `distance_cm`, `blocks_mined`, `blocks_placed`, `items_crafted`, `mob_kills`, `player_kills`, `deaths`, `jumps`, `damage_dealt`, `damage_taken`, `fish_caught`, `animals_bred`, `trades`, `enchants`, `afk_seconds`, `updated_at` |
| `sm_player_meta` | tags of the staff: `tags` (ids separated by commas) |
| `sm_player_notes` | staff notes: `uuid`, `author_name`, `note`, `created_at` |
| `sm_rewards` | rewards: `claimed` milestones, `streak`, `best_streak`, `last_daily`, `total_daily` |
| `sm_economy` | coins: `balance` |
| `sm_transactions` | coins history: `kind`, `amount`, `balance`, `other_name`, `details`, `created_at` |
| `sm_bounties` | bounties: `target_name`, `sponsor_name`, `amount`, `status`, `claimer_name` |

## Moderation {#moderation}

| Table | Content |
|---|---|
| `sm_punishments` | `type` (`WARN`, `MUTE`, `KICK`, `BAN`), `reason`, `template`, `staff_name`, `created_at`, `expires_at` (0 = permanent), `active` (0 = revoked), `ip_ban`, `revoked_by`, `revoked_at`, `revoke_reason`, `report_id` |
| `sm_reports` | `reporter_name`, `target_name`, `reason`, `comment`, `evidence`, `status` (`OPEN`, `RESOLVED`, `REJECTED`), `claimed_name`, `handler_name`, `handled_at`, `staff_note` |
| `sm_tickets` | `name`, `message`, `server`, `status` (`OPEN`, `CLOSED`), `claimed_name`, `claimed_at`, `closed_by`, `closed_at`, `rating` (1-5) |
| `sm_ticket_messages` | conversation: `ticket_id`, `author_name`, `staff` (1 = staff answer), `message`, `seen` |
| `sm_appeals` | `punishment_id`, `name`, `message`, `source` (`GAME`, `STAFF`, `WEB`), `status` (`PENDING`, `ACCEPTED`, `REFUSED`), `handler_name`, `response`, `notified` |
| `sm_chat_history` | last messages and commands: `kind` (`CHAT`, `CMD`), `message` |
| `sm_chat_flags` | messages caught by the word filter |
| `sm_alerts` | alt and x-ray alerts: `kind`, `details`, position |
| `sm_staff_log` | every staff action: `staff_name`, `action`, `target_name`, `details` |
| `sm_inventory_log` | inventory edition: `staff_name`, `container`, `action` (`TAKE`, `GIVE`, `DELETE`, `CLEAR`), `item`, `amount` |
| `sm_kills`, `sm_drops` | kills with the inventories, logged drops |
| `sm_connection_log` | refused connections (blacklist, throttle) |

## Statistics for graphs {#statistics-for-graphs}

| Table | Content |
|---|---|
| `sm_daily` | one line per day (`day` = `yyyy-MM-dd`): `uniques`, `new_players`, `peak`, `playtime` (active seconds), `punishments`, `reports`, `tickets` |
| `sm_daily_players` | which player connected which day (`day`, `uuid`): retention |
| `sm_staff_time` | `staff_mode_seconds`, `vanish_seconds` per staff member |
| `sm_server_stats` | a sample every 5 minutes: `tps`, `mspt`, `online`, `memory_used`, `memory_max`, `entities`, `chunks` |

Example: the players of the last 30 days, for a chart.

```sql
SELECT day, uniques, new_players, peak, playtime / 3600 AS hours
FROM sm_daily
ORDER BY day DESC
LIMIT 30;
```

## Sync events {#sync-events}

With [several servers](/guide/network), the servers talk through the table `sm_sync_events`:

| Column | |
|---|---|
| `id` | automatic |
| `server` | name of the sender (`network.server-name`; a web panel can use `web`) |
| `type` | type of the event |
| `payload` | a JSON object whose values are strings |
| `created_at` | date in milliseconds |

| Type | Payload | Effect on the servers |
|---|---|---|
| `PUNISH` | `{"id":"123"}` | reads the punishment 123 of `sm_punishments` and applies it where the player is (kick, mute...); tells the staff |
| `REVOKE` | `{"uuid":"...","type":"MUTE"}` | a mute (or ban) was lifted: the player can talk again |
| `STAFF_CHAT` | `{"player":"Steve","message":"..."}` | message in the staff chat |
| `ALERT` | `{"permission":"supmod.admin.report.receive","text":"...","command":"/supmod report 12"}` | staff alert. Only the alert permissions of SupMod are accepted, and only read-only commands can be clickable |
| `TICKET_ANSWER` | `{"uuid":"..."}` | the player has unread ticket answers |
| `APPEAL_DECIDED` | `{"uuid":"..."}` | the player has an appeal decision to read |

The servers only read the events written after their start; events are deleted after `network.retention-hours`. SupMod adds `"origin"` (an id of the sending server) to its own events to recognise them; an event without `origin` is ignored only by the server whose name is in the `server` column.

**Example: ban from a web panel**

```sql
INSERT INTO sm_punishments (uuid, name, type, reason, staff_name, created_at, expires_at, active, ip_ban, seen)
VALUES ('069a79f4-44e9-4726-a5be-fca90e38aaf5', 'Notch', 'BAN', 'Cheat', 'WebPanel', 1767225600000, 0, 1, 0, 1);

INSERT INTO sm_sync_events (server, type, payload, created_at)
VALUES ('web', 'PUNISH', '{"id":"42"}', 1767225600000);   -- 42 = id of the punishment created above
```

The ban is active on every server at the next login; the `PUNISH` event kicks the player if he is online. Without the network sync, the ban still works at the next login.

## Appeals {#appeals}

A web panel can create appeals that the staff handles in game (`/sm appeals`):

```sql
INSERT INTO sm_appeals (punishment_id, uuid, name, message, source, created_at, status, notified)
VALUES (42, '069a79f4-44e9-4726-a5be-fca90e38aaf5', 'Notch', 'I was not cheating...', 'WEB', 1767225600000, 'PENDING', 0);
```

To check the code typed by a player on your site: the code is `<punishment id>-<signature>`. The signature is the first 6 bytes of `HMAC-SHA256(key, "<punishment id>")`, each byte (0-255) taken modulo 32 in the alphabet `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`. The key is the hexadecimal value of `appeal_secret` in the table `sm_meta`: keep it secret.

A decision taken by the panel (`status` = `ACCEPTED` or `REFUSED`, `notified` = 0) is shown to the player at his next connection; to lift the punishment, also set `active = 0` in `sm_punishments` and publish a `REVOKE` event.
