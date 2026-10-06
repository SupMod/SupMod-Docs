# Several servers

Servers behind a proxy (BungeeCord, Velocity) can share one MySQL database. SupMod then keeps them in sync **through the database only**: no plugin on the proxy, no port to open, no external service.

## What is shared {#what-is-shared}

| Shared by the database itself | Sent to the other servers in a few seconds |
|---|---|
| Player files, play time, punishment history | A ban, kick, mute or warning: applied where the player is |
| Reports, tickets, appeals and their answers | A mute or ban lifted |
| Staff notes, tags, statistics | The staff chat |
| Bans: checked at every login, on every server | Staff alerts: new reports, tickets, appeals, x-ray, alt accounts, watched players |

The messages of another server show its name: <span class="mc">[survival] Ticket #12 from Steve: ...</span>

## Set it up {#set-it-up}

On **every** server:

1. Use MySQL with the same database: see [Database](/guide/storage).
2. In `config.yml`:

```yaml
network:
  enabled: true
  # A different name on each server
  server-name: "survival"
  poll-seconds: 2
  retention-hours: 24
  sync:
    punishments: true
    staff-chat: true
    alerts: true
```

3. Restart.

Check with `/sm network`: it shows the name of the server, the number of events sent and received, and the last read.

::: warning Give each server its own name
The name is shown in the alerts and the tickets. If two servers keep the default name `server`, the console warns you.
:::

## How it works {#how-it-works}

Each server writes its events in the table `sm_sync_events` and reads the events of the others every `poll-seconds` seconds (one small query on an index). The database stays the reference: an event about a punishment only carries its number, and each server reads the punishment itself. Events are deleted after `retention-hours`.

The format of the events is documented on the [Database and web panel](/reference/database#sync-events) page: a web panel can publish events too.

## Limits {#limits}

- Vanish, freeze and staff mode stay on the server where they were used.
- The Minecraft statistics (`/sm mcstats`) come from the world files of each server: on a network they show the last server played.
- Each server keeps its own `config.yml`: copy it if the servers must behave the same way.
