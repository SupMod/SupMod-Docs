# Zones

A zone is a box in a world with messages when players enter or leave it, and optional rules: no PvP, no flight, entry reserved to a permission. Everything is done in game with `/sm zones` (permission `supmod.zones.admin`).

## Create a zone {#create-a-zone}

1. `/sm zones wand` gives you the selection wand.
2. Left click a block for the first corner, right click for the opposite corner (or `/sm zones pos1` and `/sm zones pos2` at your position).
3. `/sm zones create spawn` creates the zone `spawn` from your selection and shows its borders with particles. Open its editor with `/sm zones edit spawn`.

The zone goes from the lowest to the highest corner, both included.

## The editor {#the-editor}

`/sm zones edit <id>` (or a click in `/sm zones`):

| Button | |
|---|---|
| West, east, bottom, top, north, south | push out (left click) or pull in (right click) one side, by 1 block or 5 with shift; the borders are shown live with particles |
| Show the borders | particles for 10 seconds, only for you (also `/sm zones show <id>`) |
| On enter, on leave | chat message, title and subtitle, action bar, sound and console commands |
| No PvP, no fly | rules inside the zone |
| Entry permission | players without it cannot enter (they are pushed back) |
| Priority | when zones overlap, the highest priority wins for the messages |
| Redefine with the wand | uses your current selection |
| Teleport, delete | |

`/sm zones here` lists the zones at your position.

## Example {#example}

```yaml
zones:
  spawn:
    world: world
    min: [-50, 60, -50]
    max: [50, 120, 50]
    priority: 0
    enter:
      title: "&d&lSPAWN"
      subtitle: "&7Safe zone"
      sound: "block.note_block.pling"
    leave:
      action-bar: "&7You left the spawn"
    flags:
      deny-pvp: true
      deny-fly: false
      entry-permission: ""
```

## Good to know {#good-to-know}

- Enter and leave actions run once per entry: walking back and forth on the border does not spam the player (2-second protection), and a reconnection inside a zone runs nothing.
- The rules also apply to teleportation, portals, respawn and vehicles: a player cannot enter a reserved zone with an ender pearl or a boat.
- `supmod.zones.bypass` ignores the entry permission and the no-fly rule (administrators by default).
- Commands use `%player%` and `%zone%`. Editing them in game needs `supmod.admin.commands`.
- Zones are saved in `zones.yml`.
