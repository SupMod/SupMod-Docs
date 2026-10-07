# Item search (anti-dupe)

A duplication glitch shows up as players owning far too many valuable items. The item search finds **who has an item** among the online players, and the scan lists the players **over suspicious amounts**, by hand or automatically.

## Search an item {#search-an-item}

`/sm itemsearch <item> [min-amount]` (aliases `/sm searchitem`, `/sm isearch`) lists the online players who have this item, the most first. Tab completion suggests the item names.

```text
/sm itemsearch netherite_ingot
/sm itemsearch elytra 2
```

The search counts the items:

- in the inventory (and the item held by the mouse cursor);
- in the ender chest;
- inside the **containers** carried as items: shulker boxes, bundles and filled chests or barrels, including a container inside another one (two levels).

Each player of the results shows the total and the details: inventory, ender chest, in containers.

| Click on a player | |
|---|---|
| Click | his inventory (editable or read only, as from the [player file](/features/player-management#inventory-edition)) |
| Shift + click | his ender chest |
| Right click | his player file |

The results are a snapshot: the **Search again** button runs the search again. From the console, the 15 first players are printed in the chat (inventory / ender chest / containers).

## Scan the suspicious amounts {#scan}

`/sm itemsearch scan` lists the players who have **more** than the amounts of `item-search.thresholds`:

| Item | Alert over |
|---|---|
| `NETHERITE_INGOT` | 32 |
| `NETHERITE_BLOCK` | 4 |
| `NETHERITE_SCRAP`, `ANCIENT_DEBRIS` | 64 |
| `DIAMOND_BLOCK` | 64 |
| `ELYTRA` | 2 |
| `ENCHANTED_GOLDEN_APPLE` | 16 |
| `TOTEM_OF_UNDYING` | 8 |
| `BEACON` | 4 |
| `NETHER_STAR` | 8 |
| `DRAGON_EGG` | 1 |

Adapt the list to your economy: in `/sm settings` › **Alerts** › **Suspicious amounts**, each line is `ITEM: amount`. Shulker boxes are not in the list on purpose (they come in 16 colours and players often own many).

The **Item scan** button of the [staff hub](/features/staff-hub) runs the scan.

## Automatic scan and alerts {#automatic-scan}

With `item-search.auto-scan.enabled: true`, the online players are scanned every `interval-minutes` (10). A player over a threshold is reported:

- to the staff with `supmod.alerts.items`, with a click to open his file;
- in the alert history, filter **Suspicious items** (`/sm alerts items`, see [Alerts](/features/alerts#suspicious-items));
- on [Discord](/features/discord) (`alert` event) and on the other servers of the [network](/guide/network).

The same player is not reported again for the same item before `alert-cooldown-minutes` (60), even if he reconnects. When 4 players or more are reported by one scan, a single summary alert is sent (click: run the scan). Players in creative or spectator mode are skipped (`ignore-creative`), and players with `supmod.bypass.itemsearch` are never reported by the automatic scan (the manual search still finds them).

## Performance and safety {#performance-and-safety}

- The search is spread over several ticks: `players-per-tick` (5) players per tick, and at most a few milliseconds per tick.
- Only containers are opened, and at most 5,000 items inside containers are read per player. A player over this limit is shown with a warning ("too many items in containers"): it is suspicious in itself (dupe or crash items).
- One search per staff member at a time, 4 at most on the server. Only the online players are searched.
- Vanished players are hidden from the staff members who cannot see them.

## Options (config.yml) {#options-config-yml}

| Option (`item-search.`) | Default | |
|---|---|---|
| `enabled` | `true` | item search on / off |
| `players-per-tick` | `5` | players checked per tick (1-100) |
| `thresholds` | see above | suspicious amounts: alert when a player has more |
| `auto-scan.enabled` | `false` | periodic scan with alerts |
| `auto-scan.interval-minutes` | `10` | time between two scans |
| `auto-scan.ignore-creative` | `true` | skip the players in creative or spectator mode |
| `auto-scan.alert-cooldown-minutes` | `60` | no new alert for the same player and item before this delay |

Every option can be changed in game: `/sm settings` › **Alerts**.

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.itemsearch` | `/sm itemsearch` and the scan (staff) |
| `supmod.alerts.items` | receive the alerts of the automatic scan (staff) |
| `supmod.bypass.itemsearch` | never reported by the automatic scan (nobody by default) |
| `supmod.admin.inventory`, `.edit` | open the inventory and the ender chest from the results |
| `supmod.player` | open the player file from the results |

::: tip Then follow the items
An alert is a clue: open the inventory, [watch his drops](/features/drop-log) to see who receives the items, and look at his [timeline](/features/player-management#timeline).
:::
