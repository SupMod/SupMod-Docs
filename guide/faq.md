# FAQ

## Installation {#installation}

### Does SupMod work on Paper, Purpur, Folia? {#does-supmod-work-on-paper-purpur-folia}

Spigot, Paper and their forks (Purpur...) are supported, from Minecraft 1.21 to 26.x with Java 21 or newer. Folia is not supported: its scheduler is different and the plugin does not declare itself compatible, so Folia refuses to load it.

### Do I need MySQL? {#do-i-need-mysql}

No. SQLite is used by default and works very well for one server. MySQL is only needed to share the data between several servers. See [Database](/guide/storage).

### Does it work with Bedrock players (Geyser / Floodgate)? {#does-it-work-with-bedrock-players-geyser-floodgate}

Yes. Bedrock names can contain spaces or dots: SupMod never inserts such a name into a console command (rewards, zones...), so they cannot be used to inject extra arguments.

## Commands and permissions {#commands-and-permissions}

### A command of SupMod opens the command of another plugin {#a-command-of-supmod-opens-the-command-of-another-plugin}

Two plugins use the same name (`/gm`, `/vanish`, `/ban`...). Write it with the plugin name: `/supmod:gm 1`, `/supmod:ban Steve 1d`. To choose the plugin used by default, set the command in the `commands.yml` file of the server ([Bukkit aliases](https://bukkit.fandom.com/wiki/Commands.yml)):

```yaml
aliases:
  ban:
    - "supmod:ban $1-"
```

### Players cannot use /report {#players-cannot-use-report}

Check that they have `supmod.report` (given to everyone by default, unless your permission plugin removes it) and that `report.enabled` is `true`.

### A moderator cannot punish an operator {#a-moderator-cannot-punish-an-operator}

That is on purpose: operators have `supmod.punish.exempt`. The console can still punish them.

### How do I give only some tools to my helpers? {#how-do-i-give-only-some-tools-to-my-helpers}

See the LuckPerms example of [Permissions and ranks](/guide/permissions#luckperms-example).

## Moderation {#moderation}

### How do I unban a player who is offline? {#how-do-i-unban-a-player-who-is-offline}

`/unban <player> [reason]`, or open `/history <player>` and click the ban to revoke it. Every punishment command except `/kick` works with offline players who joined at least once.

### A banned player says he never got a code to appeal {#a-banned-player-says-he-never-got-a-code-to-appeal}

The appeal code is shown on the ban screen with `%code%`. If your language file was created before 2.3, add the line yourself: see [Languages and messages](/guide/languages#the-ban-screen).

### The staff mode took my inventory after a crash {#the-staff-mode-took-my-inventory-after-a-crash}

It is saved in `plugins/SupMod/data/staffmode/` when you enter the staff mode, and given back at your next connection, even after a crash.

## Display {#display}

### The tab or the nametags fight with another plugin {#the-tab-or-the-nametags-fight-with-another-plugin}

Disable what the other plugin already does: `tab.enabled: false` in `display.yml`, or only `tab.sort-by-priority: false` (the sorting uses scoreboard teams, like nametag plugins). See [MOTD, tab, sidebar](/features/display).

### The sidebar does not show {#the-sidebar-does-not-show}

It is off by default: set `scoreboard.enabled: true` in `display.yml`. It also stays hidden while another plugin shows its own scoreboard (`respect-other-plugins`), and in the worlds of `disabled-worlds`. Players can hide it with `/sidebar`.

### The holograms disappeared after a restart {#the-holograms-disappeared-after-a-restart}

They are recreated by SupMod when their chunk loads: they are never saved in the world. If one is missing, check that its world still exists and type `/sm holograms near` next to it.

## Economy {#economy}

### I already have an economy plugin {#i-already-have-an-economy-plugin}

Set `coins.vault: false` to keep your current economy in Vault, or `coins.enabled: false` to disable the coins completely. See [Coins and Vault](/features/economy).

## Other {#other}

### Where can I see what my staff did? {#where-can-i-see-what-my-staff-did}

`/sm staffhistory [staff]` lists every staff action (punishments, vanish, freeze, game mode, inventory edition, tickets...). `/sm staffstats` shows the activity of each staff member. Actions can also be sent to [Discord](/features/discord).

### How do I reset a file to the default? {#how-do-i-reset-a-file-to-the-default}

Rename or delete it and restart: SupMod creates it again with the default content.

### I found a bug or I have an idea {#i-found-a-bug-or-i-have-an-idea}

Tell us on the [Discord server](https://discord.gg/f7eKwemeMX) with your version (`/sm version`) and, for a bug, the error of the console.
