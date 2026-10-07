# Join verification and anti-raid

Four protections against bot attacks and raids of new accounts:

| Protection | Default | |
|---|---|---|
| [Join verification](#join-verification) | off | a new account must click the right item in a menu before playing |
| [Lockdown](#lockdown) | manual, and automatic during a raid | new accounts are refused while it lasts |
| [Accounts per IP](#accounts-per-ip) | off | maximum number of players online with the same IP |
| [New player chat delay](#new-player-chat-delay) | off | a new account must wait before chatting |

For the IP and name blacklist and the connection throttle, see [Security](/features/security).

## Join verification {#join-verification}

A bot that joins and spams cannot click in a menu. With the verification, a new account sees a menu with **9 shuffled items** and must click the asked one ("Click: Diamond"):

- a wrong click shows a new puzzle; after `max-attempts` (3) wrong clicks, the player is kicked;
- if he does not answer within `timeout-seconds` (90), he is kicked;
- closing the menu opens it again;
- once passed, the verification is remembered and never asked again.

A kicked player can reconnect and try again. The kicks are written in the connection log (`VERIFICATION_FAILED`, `VERIFICATION_TIMEOUT`, see [Database](/reference/database#moderation)).

Until he passes it, the player can look around but **cannot**: move away, chat, use commands (except `allowed-commands`), interact, break or place blocks, pick up or drop items, use his inventory, teleport, use portals or vehicles, hurt or be hurt. All these restrictions always apply together.

### Who is asked {#who-is-asked}

- With `only-new-players: true` (default), only the accounts that never passed it. With `false`, every player at every join.
- Players who already have `trust-playtime-minutes` (30) of play time are trusted: you can enable the verification on an existing server without bothering your players.
- Staff members (`supmod.verification.bypass`), vanished players and players in staff mode are never asked.
- With `remember: true` (default), the accounts that passed it are saved in the database (`sm_verified`) and shared by the servers of a [network](/guide/network). With `false`, they are only remembered until the server restarts.

If you use a login plugin (AuthMe...), add its commands to `allowed-commands` (`login`, `register`), otherwise the players cannot log in before the verification.

### For the staff {#verification-staff}

| Command | |
|---|---|
| `/sm verify` | state of the verification and number of players verifying now |
| `/sm verify <player>` | mark a player as verified; if he is verifying, he is released at once |
| `/sm verify reset <player>` | forget his verification: it is asked again at his next join |

The **Join verification** button of the [staff hub](/features/staff-hub) asks a name and verifies the player. Both actions are written in the staff history (`VERIFY`, `VERIFY_RESET`).

::: tip A frozen player
The verification goes first: a [frozen](/features/staff-tools#freeze) player who must verify sees the freeze menu as soon as he has passed it.
:::

::: warning A basic anti-bot
The puzzle stops the bots that join and spam. A bot written for your server could read the items of the menu: combine the verification with the [lockdown](#lockdown).
:::

### Options (config.yml) {#verification-options}

| Option (`verification.`) | Default | |
|---|---|---|
| `enabled` | `false` | join verification on / off |
| `only-new-players` | `true` | `true`: only the accounts that never passed it; `false`: at every join |
| `remember` | `true` | remember the verified accounts in the database (`false`: until the restart) |
| `trust-playtime-minutes` | `30` | accounts with this play time are never asked (0 = off) |
| `timeout-seconds` | `90` | kicked if not done in time (15-600) |
| `max-attempts` | `3` | wrong clicks before the kick (1-10) |
| `allowed-commands` | empty | commands allowed before the verification (login plugin) |

## Lockdown {#lockdown}

During a raid, the lockdown closes the server to new accounts. Players who already played are not affected.

| Command | |
|---|---|
| `/sm lockdown` | state: since when, end, by whom, reason, refused connections |
| `/sm lockdown on [duration] [reason]` | start the lockdown; without duration, until `/sm lockdown off` (30 days at most); typed again, it changes the duration and the reason |
| `/sm lockdown off` | end the lockdown |

```text
/sm lockdown on 30m bot attack
/sm lockdown off
```

The **Lockdown** button of the [staff hub](/features/staff-hub) starts or ends it (with confirmation); right click shows the state.

### Who is refused {#who-is-refused}

During a lockdown, these accounts are refused at login with a message giving the reason and the end:

- accounts that never really played (less than one minute of play time);
- accounts whose first connection happened during the lockdown;
- when the [join verification](#join-verification) is on, accounts that have not passed it yet (and are not trusted by their play time).

`supmod.lockdown.bypass` (staff) can always join. If the database does not answer during a lockdown, the new account is refused. Each refused connection is counted and written in the connection log (`LOCKDOWN`).

### Automatic lockdown {#automatic-lockdown}

When `new-accounts` (8) new accounts arrive within `seconds` (30), SupMod starts a lockdown of `minutes` (10) minutes by itself. The staff with `supmod.lockdown.notify` is told when a lockdown starts and ends, and the [Discord](/features/discord) event `lockdown` is sent. `auto-lockdown.new-accounts: 0` disables the automatic lockdown.

The lockdown is kept after a restart (`plugins/SupMod/data/lockdown.yml`). With [several servers](/guide/network), it is shared by every server (`network-sync`); each server counts its own new accounts for the automatic lockdown.

`security.anti-raid.enabled: false` disables the lockdown completely: a running lockdown ends, `/sm lockdown on` is refused and there is no automatic lockdown.

### Options (config.yml) {#lockdown-options}

| Option (`security.anti-raid.`) | Default | |
|---|---|---|
| `enabled` | `true` | lockdown available (`false` = no lockdown at all) |
| `auto-lockdown.new-accounts` | `8` | new accounts that start the automatic lockdown (0 = no automatic lockdown) |
| `auto-lockdown.seconds` | `30` | ...within this time |
| `auto-lockdown.minutes` | `10` | duration of the automatic lockdown |
| `network-sync` | `true` | share the lockdown with the other servers of the network |

## Accounts per IP {#accounts-per-ip}

`security.max-accounts-per-ip` (0 = no limit) is the maximum number of players online with the same IP. Over it, the connection is refused ("Too many accounts") and written in the connection log (`IP_LIMIT`).

Never limited: local connections (`127.0.0.1`), the IPs of `security.connection-throttle.whitelist` and players with `supmod.security.bypass-ip-limit` (staff).

::: warning Behind a proxy
Without IP forwarding, every player has the IP of the proxy, and the players are refused as soon as the limit is reached. Enable the IP forwarding of the proxy (the console warns you once), or keep the limit at 0.
:::

## New player chat delay {#new-player-chat-delay}

`chat.new-player-delay-seconds` (0 = off): an account whose first connection is less than X seconds ago cannot chat yet, nor use the private message commands of `anti-spam.commands` (`/msg`, `/tell`, `/r`...). He is told how long to wait. Spam bots that join and write at once are stopped.

`supmod.chat.bypass-new-delay` (staff) can chat at once.

## Settings in game {#settings-in-game}

Every option can be changed in `/sm settings`: **Security** (verification, lockdown, accounts per IP), **Chat** (new player delay), **Discord** (`lockdown` event) and **Modules** (switches).

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.verification.bypass` | never asked to verify (staff) |
| `supmod.verification.manage` | `/sm verify` (staff) |
| `supmod.lockdown` | `/sm lockdown` (staff) |
| `supmod.lockdown.bypass` | can join during a lockdown, even with a new account (staff) |
| `supmod.lockdown.notify` | told when a lockdown starts or ends (staff) |
| `supmod.security.bypass-ip-limit` | not limited by `max-accounts-per-ip` (staff) |
| `supmod.chat.bypass-new-delay` | not affected by the new player chat delay (staff) |
