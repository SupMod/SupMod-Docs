# Discord

SupMod sends logs to Discord channels with **webhooks**: no bot to install. Each event can use its own channel and colour.

## Set it up {#set-it-up}

1. In Discord: channel settings › **Integrations** › **Webhooks** › New webhook › copy the URL.
2. In game: `/sm settings` › **Discord** › **Webhook URL**, paste the URL (or `discord.webhook-url` in `config.yml`).
3. `/sm webhook on`, then `/sm webhook test` to check. The test is sent as a `report` event, to its URL: keep this event on while testing.

::: warning Keep the URL private
Anyone with the webhook URL can write in your channel. Don't share `config.yml` or a screenshot of it.
:::

## Events {#events}

| Event | Default | Sent when |
|---|---|---|
| `report` | on | a player is reported |
| `punishment` | on | a player is warned, muted, kicked or banned |
| `appeal` | on | a player appeals a punishment |
| `alert` | on | alt account, x-ray, [suspicious items](/features/item-search#automatic-scan), low TPS, maintenance |
| `lockdown` | on | an [anti-raid lockdown](/features/verification#lockdown) starts (by a staff member or automatically) or ends |
| `chat-filter` | on | a message contains a filtered word |
| `ticket` | off | a ticket is created |
| `staff-chat` | off | a message is written in the staff chat |
| `bounty` | off | a bounty is placed or claimed |
| `chat` | off | every chat message |
| `join`, `quit` | off | a player joins or leaves |
| `kill` | off | a player kills another player |

From the game: `/sm webhook <event> on` / `off` (permission `supmod.admin.webhook`).

```yaml
discord:
  enabled: true
  webhook-url: "https://discord.com/api/webhooks/..."
  events:
    report:
      enabled: true
      color: "#FF8800"      # "#RRGGBB" or RANDOM
      url: ""               # another webhook for this event ("" = the default one)
    punishment:
      enabled: true
      color: "#C0392B"
      url: "https://discord.com/api/webhooks/...another channel..."
```

## Good to know {#good-to-know}

- The messages are sent in the background, in order, and Discord's rate limits are respected: the server never waits for Discord.
- What players write is escaped: a player cannot format the message or ping `@everyone`.
- The texts of the messages are in the language files (`discord.*`).
