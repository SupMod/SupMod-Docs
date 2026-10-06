# Worlds

`/sm worlds` (permission `supmod.worlds`) lists the worlds of the server with their statistics; `/sm worlds <world>` opens one of them.

## Statistics {#statistics}

For each world: type (overworld, nether, end), players, loaded chunks, entities by type, age in game days and in real days, size on the disk.

## Actions {#actions}

With `supmod.worlds.manage`:

| Button | |
|---|---|
| Time | day, noon, night, midnight |
| Weather | clear, rain, thunder |
| Difficulty | next difficulty |
| PvP | on / off |
| Spawn | set the spawn at your position, or teleport to it |
| World border | left click: size; right click: center it on you |
| Game rules | the game rules menu (also `/sm gamerule [world]`, permission `supmod.admin.gamerule`) |
| Autosave | on / off; shift click: save now |
| Players, entities | lists of the world |
| Unload | saves then unloads the world (not the main world, not with players inside) |

## Load a world {#load-a-world}

Folders of the server that contain a world but are not loaded appear in the list. With `supmod.worlds.load`: left click loads it as an overworld, right click as a nether, shift click as an end. A world loaded this way is **not** loaded again automatically after a restart.

::: tip
For a world that must always be loaded, keep using your world manager (Multiverse...): SupMod's loader is for occasional worlds (an event map, an old world to check...).
:::
