# Bounties

Players put coins on the head of another player: whoever kills him takes the bounty. Needs the [coins](/features/economy).

```text
/bounty Steve 500
/bounty list
```

- Several players can add to the same bounty; the killer takes the total.
- The amount is taken when the bounty is placed. A tax (`tax-percent`) is kept by the server.
- A bounty not claimed after `expire-days` (14) is refunded to the sponsors.
- Bounties are announced to everyone when placed and claimed (`broadcast-place`, `broadcast-claim`), and on [Discord](/features/discord) if the `bounty` event is on.

## Anti-abuse {#anti-abuse}

| Option | Default | |
|---|---|---|
| `ignore-same-ip` | `true` | no reward when the killer and the target have the same IP (alt farming) |
| `sponsor-can-claim` | `false` | a sponsor cannot claim the bounty he paid for |
| `cooldown-seconds` | `60` | delay between two bounties of a player |
| `min-amount`, `max-amount` | `100`, `0` | limits (0 = no maximum) |

`supmod.bounty.exempt` (given to nobody by default) protects a player from bounties (checked when he is online).

## Administration {#administration}

`/bounty remove <player>` refunds and removes the bounties on a player; `/bounty on` / `off` switches the module (permission `supmod.bounty.admin`).

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.bounty` | place bounties (everyone) |
| `supmod.bounty.list` | see the bounties (everyone) |
| `supmod.bounty.bypass-cooldown` | no delay |
| `supmod.bounty.admin` | remove bounties, switch the module |
| `supmod.bounty.exempt` | cannot be targeted |

`%supmod_bounty%` shows the bounty on a player (for the tab or the nametag).
