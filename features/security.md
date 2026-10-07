# Security

## Blacklist {#blacklist}

Refuse an IP address or a name before the player even joins:

| Command | |
|---|---|
| `/sm blacklist ban ip <ip>` | an IP (`192.168.0.15`), or every IP starting the same way with `*` (`192.168.0.*`) |
| `/sm blacklist ban username <name>` | a name |
| `/sm blacklist unban ip\|username <value>` | remove an entry |
| `/sm blacklist list` | the blacklist |
| `/sm blacklist reload` | reload the files |

Online players matching a new entry are kicked at once. The lists are in `plugins/SupMod/security/blacklisted_ips.txt` and `blacklisted_names.txt` (one entry per line, then `/sm blacklist reload`). In `blacklisted_names.txt`, a line can also be a regular expression, for example `^Admin.*` or `.*hack.*`.

Permissions: `supmod.blacklist.admin` (everything), or `supmod.blacklist.ban`, `.unban`, `.list`, `.reload`.

## Connection throttle {#connection-throttle}

Bots and crash attempts connect many times from the same IP. The throttle blocks an IP temporarily after too many connections:

```yaml
security:
  enabled: true
  connection-throttle:
    enabled: true
    max-connections: 5
    per-seconds: 10
    block-minutes: 10
    whitelist:
      - "127.0.0.1"
```

If your server is behind a proxy that does not forward the real IPs, every player has the IP of the proxy: add it to the whitelist (or better, enable IP forwarding on the proxy).

## Join verification and anti-raid {#anti-raid}

The join verification (anti-bot), the anti-raid lockdown, the maximum number of accounts per IP and the chat delay of new players have their own page: [Join verification and anti-raid](/features/verification).

## Drop log {#drop-log}

The drop log (watched players, durations, modes, automatic watch) has its own page since 2.4: [Drop log](/features/drop-log). To find duplicated items, see also the [item search](/features/item-search).

## What SupMod protects by itself {#what-supmod-protects-by-itself}

- Passwords: `/login`, `/register`... are never shown to the command spy nor saved in the chat history.
- Console commands set in the configuration (rewards, zones, first join kit, restarts) can only be edited with `supmod.admin.commands`, and player names are checked before being inserted into a command.
- Player messages can't inject colours or formatting into the messages of the plugin, the menus or Discord.
- Staff members can't punish operators (`supmod.punish.exempt`) or act on protected players (`supmod.player.exempt`).
- Inventory edition can't duplicate items, and every item moved is logged.
- The [item search](/features/item-search) reads containers with limits (depth, number of items, time per tick): a trapped shulker box cannot freeze the server.
