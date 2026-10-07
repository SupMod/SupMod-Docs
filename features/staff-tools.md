# Staff tools

## Staff mode {#staff-mode}

`/staffmode` (alias `/mod`) puts a moderator "on duty":

- his inventory, game mode and flight are **saved** (also in a file, so nothing is lost even if the server crashes);
- he becomes invisible (`vanish`), can fly (`fly`) and cannot take damage (`invulnerable`);
- he receives the tools in his hotbar.

Typing `/staffmode` again, disconnecting or stopping the server gives everything back.

::: info /staff is now the staff list
Since 2.4, `/staff` is no longer an alias of `/staffmode`: it shows the [staff members online](/features/community#staff-list) to the players, and its menu has a button to switch the staff mode. With `staff-list.enabled: false`, `/staff` switches the staff mode again, as before.
:::

| Tool | Use |
|---|---|
| Compass | right click: teleport to a random player (never the same ones twice in a row) |
| Packed ice | right click a player: freeze / unfreeze |
| Book | right click a player: his [player file](/features/player-management) |
| Chest | right click a player: his inventory (read only in staff mode) |
| Iron axe | right click a player: the [punishment menu](/features/punishments) |
| Command block | right click: your game mode; right click a player: his game mode |
| Spyglass | list of the online players |
| Dye | vanish on / off |
| Barrier | leave the staff mode |

The tools cannot be dropped, moved or placed. Each one can be moved to another slot, given another item or disabled in `config.yml` › `staff-mode.items`:

```yaml
staff-mode:
  enabled: true
  vanish: true
  fly: true
  invulnerable: true
  gamemode: KEEP          # SURVIVAL, CREATIVE, ADVENTURE, SPECTATOR or KEEP
  items:
    random-tp: { enabled: true, slot: 0, material: COMPASS }
    freeze: { enabled: true, slot: 1, material: PACKED_ICE }
    # ...
```

::: tip In spectator mode
The hotbar cannot be used in spectator mode: use `/gm` to come back.
:::

## Vanish {#vanish}

`/vanish` (alias `/v`) hides you from the players, the tab list, the tab completion and the SupMod menus. Staff members with `supmod.vanish.see` still see you. `/vanish <player>` (`supmod.vanish.others`) works on another staff member.

| Option (`vanish.`) | Default | |
|---|---|---|
| `persist` | `true` | stay invisible after a reconnection |
| `hide-join-quit` | `true` | no join / quit message while invisible |
| `fake-messages` | `false` | fake join / quit message when toggling |
| `action-bar` | `true` | reminder in the action bar |
| `night-vision` | `true` | night vision while invisible |

Invisible staff members are not counted in the MOTD, the tab (`%online%`) or `/sm randomtp`, and mobs ignore them. They pick up items only while sneaking.

## Freeze {#freeze}

`/freeze <player>` (alias `/ss`) stops a player for a check (screen share, questions...):

- he cannot move, build, fight, use items, ride or run commands (except those of `allowed-commands`: `/msg`, `/r`, `/helpop`...);
- he sees a menu that cannot be closed, with a button to call the staff, and a title;
- he cannot take damage (`invulnerable`).

If he **disconnects while frozen**, the staff is alerted and the template `freeze-quit` (7-day ban, then permanent) is applied automatically. Change it with `freeze.on-quit.template` (`""` = nothing).

Staff members have `supmod.freeze.exempt`: they cannot be frozen.

## Staff chat {#staff-chat}

`/sc <message>` (or `/staffchat`) writes in the staff chat. `/sc` alone switches your chat to the staff chat until you type it again. A message starting with `#` also goes to the staff chat (`staff-chat.prefix-char`).

The staff chat can be sent to [Discord](/features/discord) and shared between [several servers](/guide/network).

## Command spy {#command-spy}

`/commandspy` (aliases `/cmdspy`, `/spy`) shows you the commands typed by the players. Commands with passwords (`/login`, `/register`...) are never shown (`command-spy.ignored-commands`), and players with `supmod.commandspy.exempt` are never spied.

## Teleportation {#teleportation}

| Command | |
|---|---|
| `/sm tp <player>` | teleport to a player |
| `/sm randomtp` | a random player (staff members excluded by default, `random-tp.exclude-staff`) |
| `/sm spectp on` | go into spectator mode at each SupMod teleport (`/sm tp`, random tp, menus) |
| `/sm return` | after such a spectator teleport, come back where you were before, in your previous game mode |

## Game mode {#game-mode}

`/gm <0-3> [player]`, `/gmc`, `/gms`, `/gma`, `/gmsp`, or `/gm` alone for a menu. Each mode needs its own permission (`supmod.gamemode.creative`...), and `supmod.gamemode.others` for another player. The player is told who changed his mode (`gamemode.notify-target`), and every change is in the staff history.

```text
/gm 3              spectator
/gmc Steve         Steve in creative
```

## Staff history {#staff-history}

Every action of the staff is saved: punishments, revocations, vanish, freeze, staff mode, game mode, teleportation, inventory edition, notes, tags, tickets, appeals, settings... `/sm staffhistory` shows them all, `/sm staffhistory <staff>` those of one staff member (permission `supmod.staff.log`). They are kept `staff-log-retention-days` (180) days.

For the activity of each staff member (number of punishments, reports handled, average answer time, time in staff mode), see [Statistics](/features/statistics#staff-statistics).
