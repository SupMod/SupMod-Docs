# Alerts

Alerts are sent to the staff members who have the permission, with a click to act. They are kept in `/sm alerts` (permission `supmod.alerts.view`; filters: `/sm alerts xray`, `alt`, `items`), can be sent to [Discord](/features/discord) (`alert` event) and are shared between [several servers](/guide/network).

## Alt accounts {#alt-accounts}

| Situation | Alert | Option (`alerts.alts.`) |
|---|---|---|
| A player joins with the IP of a banned account | <span class="mc">[Alt] Steve uses the IP of banned account(s): Griefer</span> | `notify-banned-alts` |
| Two online players share the same IP | <span class="mc">[Alt] Steve has the same IP as Alex</span> | `notify-shared-ip` |

With `block-banned-alts: true`, accounts sharing the IP of a banned account are **refused** at login (ban evasion). IPs of `ignored-ips` are never checked: add the IP of your proxy if it does not forward the real IPs, or of a school.

Permission: `supmod.alerts.alts`. To investigate, use `/sm ip <ip|player>` and the [timeline](/features/player-management#timeline).

## X-ray {#x-ray}

SupMod counts, for each player, the ore **veins** he mines compared to the stone around them over `window-minutes` (20). A normal player finds few veins per 100 blocks of stone; an x-ray user goes straight to them.

```yaml
alerts:
  xray:
    enabled: true
    window-minutes: 20
    cooldown-minutes: 10
    vein-distance: 4
    disabled-worlds: []
    ores:
      diamond:
        blocks: [DIAMOND_ORE, DEEPSLATE_DIAMOND_ORE]
        base: [STONE, DEEPSLATE, TUFF, GRANITE, DIORITE, ANDESITE, CALCITE]
        min-veins: 4
        max-per-100: 2.5
      ancient-debris:
        blocks: [ANCIENT_DEBRIS]
        base: [NETHERRACK, BASALT, BLACKSTONE]
        min-veins: 3
        max-per-100: 1.5
```

<p><span class="mc">[X-ray] Steve: 6 diamond veins for 140 blocks in 20 min (4.3/100)</span></p>

An alert is sent when a player found at least `min-veins` veins **and** more than `max-per-100` veins per 100 base blocks. Ores closer than `vein-distance` are the same vein. Other ores can be added the same way.

Permission: `supmod.alerts.xray`. `supmod.bypass.xray` (given to nobody by default) disables the alerts for a player, for example builders.

::: tip An alert is a clue, not a proof
Teleport to the player (click on the alert), watch him in [vanish](/features/staff-tools#vanish) and look at his blocks mined with `/sm mcstats <player>` before punishing.
:::

## Suspicious items {#suspicious-items}

The automatic scan of the [item search](/features/item-search#automatic-scan) (off by default, `item-search.auto-scan.enabled`) reports the players who own more than the suspicious amounts of `item-search.thresholds` (32 netherite ingots, 2 elytras, 8 totems...): a possible duplication.

<p><span class="mc">[Items] Steve has Netherite Ingot x96 (&gt; 32) (click: file)</span></p>

The alerts go to `supmod.alerts.items`, to the **Suspicious items** filter of `/sm alerts` (`/sm alerts items`), to Discord (`alert` event) and to the other servers of the network. The same player is not reported again for the same item for `alert-cooldown-minutes` (60). `supmod.bypass.itemsearch` (given to nobody by default) is never reported, for example a creative builder.

## Other alerts {#other-alerts}

- **Server health**: low TPS or memory almost full, to `supmod.health.alerts`. See [Health and lag](/features/server-health).
- **Watched players**: a tagged player joins, to `supmod.watch.notify`. See [Notes and tags](/features/player-management#notes-and-tags).
- **Freeze**: a frozen player disconnects. See [Freeze](/features/staff-tools#freeze).
- **Lockdown**: a lockdown starts or ends, automatic lockdowns included, to `supmod.lockdown.notify`. See [Join verification and anti-raid](/features/verification#automatic-lockdown).
