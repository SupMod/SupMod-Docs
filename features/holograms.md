# Holograms

Floating texts made with the text displays of Minecraft: no armor stand, no hitbox, nothing to lag. They can show placeholders and **leaderboards** (top play time, kills, coins, daily streak). Permission: `supmod.holograms.admin`.

## Create a hologram {#create-a-hologram}

```text
/sm holograms create welcome &d&lWELCOME
```

The hologram appears 2 blocks above you; adjust it with `/sm holograms edit <id>`. In `/sm holograms`, the button "New hologram" creates a text hologram (left click) or a leaderboard (right click).

| Command | |
|---|---|
| `/sm holograms` | list of the holograms (click: edit, shift click: teleport) |
| `/sm holograms create <id> [text]` | new hologram |
| `/sm holograms edit <id>` | editor |
| `/sm holograms movehere <id>` | move it to your position |
| `/sm holograms addline <id> <text>` | add a line |
| `/sm holograms near` | the nearest hologram |
| `/sm holograms delete <id>` | delete |

## The editor {#the-editor}

The position is adjusted **live** while you look at it:

| Button | |
|---|---|
| X, Y, Z arrows | move by the current step; shift: 5 steps |
| Step | from 0.05 to 1 block (left: bigger, right: smaller) |
| Move here | left: 2 blocks above you; right: at your eyes; shift: also face your direction |
| Rotation, scale | left +, right − |
| Facing | `CENTER` (always faces the player), `VERTICAL`, `HORIZONTAL`, `FIXED` (uses the rotation) |
| Background | default, none, or a custom colour `#AARRGGBB` |
| Shadow, visible through blocks | switches |
| Lines | list editor: colours and placeholders |
| Line width, alignment | `LEFT`, `CENTER`, `RIGHT` |
| Refresh | every X seconds, for the placeholders (0 = never) |
| Leaderboard | none, playtime, kills, coins or streak; shift: size of the top |
| View distance | |

## Leaderboards {#leaderboards}

A leaderboard hologram shows a title and the top players of a [statistics](/features/statistics) board instead of its lines, refreshed with the leaderboards (`stats.refresh-minutes`). The title and the format of the lines are in the language file (`holograms.leaderboard-*`).

## Example {#example}

```yaml
holograms:
  welcome:
    world: world
    x: 0.5
    y: 70.0
    z: 0.5
    lines:
      - "&d&lWELCOME"
      - "&7%online% players online"
    scale: 1.0
    billboard: CENTER
    background: default
    shadow: true
    update-seconds: 5
  top-kills:
    world: world
    x: 10.5
    y: 70.0
    z: 0.5
    leaderboard: kills
    leaderboard-size: 10
```

::: info Placeholders in holograms
A hologram is the same for every player: use global placeholders (`%online%`, `%tps%`, `%date%`, `%staff_online%`...). Placeholders about the player who looks at it (`%player%`, `%coins%`) don't work there.
:::

Holograms are not saved in the world: SupMod creates them when their chunk loads and removes them when the server stops. If you uninstall SupMod, nothing stays behind.
