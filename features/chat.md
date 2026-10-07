# Chat and anti-spam

## Anti-spam {#anti-spam}

The anti-spam checks the chat and the private message commands (`anti-spam.commands`: `/msg`, `/tell`, `/r`...).

| Rule | Default | What it does |
|---|---|---|
| Minimum delay | 800 ms | between two messages of a player |
| Repeated message | 85 % similar within 30 s | blocks the same (or nearly the same) message |
| Flood | 5 messages in 6 s | blocks bursts of messages |
| Capital letters | over 70 % of a message of 6+ letters | `LOWERCASE` (sent in lower case) or `BLOCK` |
| Repeated characters | more than 4 | "aaaaaaa" becomes "aaaa" |
| Advertising | IPs and website addresses | `BLOCK` or `CENSOR`; your own addresses go in `whitelist` |

After `violations` (5) blocked messages within `within-seconds` (60), the template `spam` is applied automatically ([Punishments](/features/punishments)).

```yaml
anti-spam:
  advertising:
    enabled: true
    block-ips: true
    block-domains: true
    action: BLOCK
    whitelist:
      - "your-server.com"
      - "discord.gg/yourserver"
```

Bypass permissions (staff by default): `supmod.bypass.spam`, `supmod.bypass.advertising`.

## Word filter {#word-filter}

The filter is off by default. Add your words in `chat.filter.words` and choose the mode:

| Mode | |
|---|---|
| `LOG` | the message is sent; the staff with `supmod.admin.chat.alerts` is alerted and it is saved in the player file |
| `CENSOR` | the words are replaced by `***` (and logged) |
| `BLOCK` | the message is not sent (and logged) |

`whole-words: true` only matches whole words (*ass* does not match *class*). `supmod.bypass.chatfilter` ignores the filter. Filtered messages can be sent to [Discord](/features/discord) (`chat-filter` event).

## Chat control {#chat-control}

| Command | Permission | |
|---|---|---|
| `/sm chat lock` / `unlock` | `supmod.chat.lock` | only `supmod.bypass.chatlock` can talk; `lock` on a locked chat unlocks it |
| `/sm chat clear` | `supmod.chat.clear` | sends `clear-lines` (150) empty lines, except to `supmod.bypass.chatclear` |
| `/sm chat slow <seconds>` / `off` | `supmod.chat.slow` | one message every X seconds, except `supmod.bypass.slowmode` |

## New players {#new-players}

`chat.new-player-delay-seconds` (0 = off) stops the spam bots: an account whose first connection is less than X seconds old cannot chat yet, nor use the private message commands of `anti-spam.commands`. He is told how long to wait. `supmod.chat.bypass-new-delay` (staff) is not affected. See [Join verification and anti-raid](/features/verification#new-player-chat-delay).

## Ignore a player {#ignore}

Players can hide the messages of another player with `/ignore <player>`: his chat messages, his @mentions and his bounty announcements are no longer shown to them. Staff members cannot be ignored. See [Ignore, staff list and polls](/features/community#ignore).

## Chat history {#chat-history}

The last 50 messages and commands of each player (`chat-history.keep-per-player`) are kept for the staff: player file › Chat history, and as evidence in the [reports](/features/reports). Commands with passwords (`/login`, `/register`...) are never saved (`chat-history.ignored-commands`).

Permissions: `supmod.chat.history`, `supmod.chat.history.commands`.

## Mentions and emojis {#mentions-and-emojis}

- **Mentions**: writing `@Steve` highlights his name and plays a sound for him (`chat.mentions`), unless Steve [ignores](/features/community#ignore) the sender.
- **Emojis**: off by default. With `chat.emojis.enabled: true`, `:heart:` becomes ❤. The list is in `emojis.yml`:

```yaml
heart: "❤"
star: "★"
sword: "⚔"
```

::: tip
Symbols that are not in the Minecraft font are shown as squares: test a new symbol before adding it.
:::

## Broadcast {#broadcast}

`/broadcast <message>` (alias `/br`, permission `supmod.broadcast`) sends a message to the whole server with the prefix of `broadcast.prefix`. Colours are supported.
