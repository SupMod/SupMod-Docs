# Statistics

## /stats and leaderboards {#leaderboards}

`/stats [player]` shows the statistics of a player: play time, kills, deaths, K/D, coins, daily streak and his rank in each leaderboard. `/stats top [board]` shows a leaderboard.

| Board | |
|---|---|
| `playtime` | play time (without the AFK time) |
| `kills` | players killed |
| `coins` | richest players |
| `streak` | daily login streak |

The leaderboards are computed in the background every `refresh-minutes` (5) and shown from memory. They are also available as [placeholders](/reference/placeholders) (`%supmod_top_kills_1_name%`...) and [holograms](/features/holograms#leaderboards).

```yaml
stats:
  enabled: true
  allow-others: true        # /stats <player>
  refresh-minutes: 5
  size: 10
  leaderboards:
    playtime: true
    kills: true
    coins: true
    streak: true
```

`/stats on` / `off` / `refresh` with `supmod.stats.admin`.

## Minecraft statistics {#minecraft-statistics}

SupMod copies the statistics of Minecraft (the ones of the statistics screen of the game) to its database, at each disconnection and every `interval-minutes` (10). The copy is spread over the ticks, one player per tick, so it never makes the server lag.

Copied: play time, distance (walking, sprinting, swimming, flying, riding...), blocks mined, blocks placed, items crafted, mobs killed, players killed, deaths, jumps, damage dealt and taken, fish caught, animals bred, villager trades, items enchanted, and the AFK time.

The staff sees them with `/sm mcstats <player>` or in the [player file](/features/player-management). They are in the table `sm_player_stats` for your website or web panel.

```yaml
statistics:
  vanilla:
    enabled: true
    interval-minutes: 10
    detailed: true          # blocks mined / placed and crafts: a sum over every material
```

## Daily activity {#daily-activity}

One line per day in the table `sm_daily`: unique players, new players, peak, active play time (AFK excluded), punishments, reports and tickets. `/sm activity` (permission `supmod.activity`) shows the last 28 days with small graphs:

- each day: unique players, new players, peak, play time, punishments, reports, tickets;
- the trend of the unique players, the peak and the play time over the period.

### Retention {#retention}

The same menu shows how well players stay:

| | |
|---|---|
| Active players | players connected in the last 7 and 30 days, known players |
| Connection days | average number of days a player connected in the last 30 days |
| Return of new players | the share of new players who came back at least 7 days (and 30 days) after their first connection |
| Comebacks | players who came back this week after 7+ (and 30+) days of absence |

For one player, his file shows his **seniority** and his number of **connection days**.

```yaml
statistics:
  daily:
    enabled: true
    players-retention-days: 400   # how long the players of each day are kept (retention)
```

## Staff statistics {#staff-statistics}

`/sm staffstats` shows your own activity; with `supmod.staffstats.others`, the ranking of the staff and `/sm staffstats <staff>` for one member. Period: 7 days, 30 days, 365 days or since the beginning.

| | |
|---|---|
| Punishments | warnings, mutes, kicks, bans given |
| Reports | reports handled and average answer time |
| Tickets | tickets handled, average time before taking one, average rating from the players |
| Appeals | appeals decided |
| Time | time in staff mode and in vanish |

The results are cached for a minute or two: the menus can be opened often without loading the database.
