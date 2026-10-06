# Health and lag

## Server health {#server-health}

`/sm health` (aliases `/sm tps`, `/sm perf`, permission `supmod.health`) opens a dashboard refreshed every 2 seconds:

| | |
|---|---|
| TPS | 1, 5 and 15 minutes, measured by SupMod (works on Spigot too; 20 = perfect) |
| MSPT | average time of a tick (Paper and its forks) |
| Memory | used / maximum |
| Players, entities, chunks, worlds | with the peak of the day |
| Graphs | TPS, players and memory over the last 24 h (one bar per hour) |
| Last 7 days | peak of players and average TPS per day |

From the console, `/sm health` prints one line with the same values.

### Alerts {#alerts}

The staff with `supmod.health.alerts` is alerted (and [Discord](/features/discord) if the `alert` event is on) when:

- the TPS stays under `alert-tps` (15) for 2 minutes;
- the memory used reaches `alert-memory-percent` (90 %).

`alert-cooldown-minutes` (10) avoids repeated alerts. A sample is saved every 5 minutes and kept `history-days` (30) days.

## Lag tools {#lag-tools}

`/sm lag` (permission `supmod.lag`) shows the **most loaded chunks**: number of entities, living mobs, items, the most common entity type. Click a chunk to teleport there and see what is going on (a mob farm, items piling up...).

### Ground items cleanup {#ground-items-cleanup}

Off by default. When it is on, every `interval-minutes` (15) the items on the ground are removed after a countdown in the chat:

```yaml
lag:
  ground-items:
    enabled: false
    interval-minutes: 15
    warnings: [60, 30, 10, 5, 3, 2, 1]
    remove-xp-orbs: true
    remove-arrows: true        # only arrows stuck in blocks that players cannot pick up
    keep-named-items: true     # items renamed with an anvil are kept
    min-age-seconds: 10        # items dropped less than 10 s ago are kept
    disabled-worlds: []
```

::: warning
The cleanup also removes the items dropped at death if the player does not come back in time. Keep a long interval, or disable it in your survival worlds with `disabled-worlds`.
:::

Manual cleanup (permission `supmod.lag.clear`): `/sm lag clear` (now) or `/sm lag clear 30` (in 30 seconds), `/sm lag cancel` to cancel.

### Mob limit per chunk {#mob-limit-per-chunk}

Off by default. With `entity-limit.enabled: true`, new mobs are refused in a chunk that already has `per-chunk` (60) living entities, for the spawn reasons of `reasons` (natural, spawners, breeding, eggs). Players and existing mobs are never removed.

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.health` | `/sm health` (staff) |
| `supmod.health.alerts` | receive the TPS and memory alerts |
| `supmod.lag` | `/sm lag` |
| `supmod.lag.clear` | clear the ground items |
