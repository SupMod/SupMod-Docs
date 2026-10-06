# Maintenance and restarts

## Maintenance {#maintenance}

`/sm maintenance on [delay] [reason]` (permission `supmod.maintenance`) closes the server:

```text
/sm maintenance on 5m Update of the plugins
```

1. A countdown is shown in the chat and in a boss bar (here 5 minutes; without delay it starts at once).
2. The players who cannot stay are kicked with the reason.
3. Until `/sm maintenance off`, only these players can join: operators, `supmod.maintenance.bypass` and the maintenance whitelist.
4. The server list shows the maintenance MOTD of `display.yml` (`motd.maintenance`).

| Command | |
|---|---|
| `/sm maintenance` | state of the maintenance |
| `/sm maintenance off` | open the server again |
| `/sm maintenance cancel` | cancel the countdown |
| `/sm maintenance add <player>` / `remove <player>` | whitelist of the maintenance (builders, testers...) |
| `/sm maintenance list` | the whitelist |

The maintenance stays on after a restart. It is announced on [Discord](/features/discord) when the `alert` event is on.

## Scheduled restarts {#scheduled-restarts}

```yaml
restart:
  enabled: false
  times: ["04:00"]          # time zone of "timezone"
  days: []                  # MONDAY ... SUNDAY, empty = every day
  warnings: [900, 600, 300, 120, 60, 30, 10, 5, 4, 3, 2, 1]
  method: SHUTDOWN          # or RESTART (restart-script of spigot.yml)
  commands-before:
    - "save-all"
  bossbar: true
  title: true
```

Before the restart, the players see a countdown in the chat and in a boss bar at each value of `warnings` (in seconds), and as a title during the last 10 seconds. The `commands-before` are run, then the server stops.

`SHUTDOWN` simply stops the server: your host or your start script starts it again. `RESTART` uses the `restart-script` of `spigot.yml`.

| Command (permission `supmod.restart`) | |
|---|---|
| `/sm restart 10m` | restart in 10 minutes |
| `/sm restart now` | restart now (with the commands before) |
| `/sm restart cancel` | cancel the countdown |
| `/sm restart status` | next scheduled restart |

::: info
Editing `commands-before` in game needs `supmod.admin.commands`.
:::

## Boss bar messages {#boss-bar-messages}

`/sm bossbar <seconds> [color] <text>` (permission `supmod.bossbar.admin`) shows a message to everyone in a boss bar:

```text
/sm bossbar 30 RED &cEvent in the arena in 5 minutes!
```

Colours: `PINK`, `BLUE`, `RED`, `GREEN`, `YELLOW`, `PURPLE`, `WHITE`. Rotating boss bars are set in [`display.yml`](/features/display#boss-bars).
