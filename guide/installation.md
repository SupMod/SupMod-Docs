# Installation

## Install {#install}

1. Download `SupMod-2.4.0.jar` from [SpigotMC](https://www.spigotmc.org/resources/supmod.108806/).
2. Stop the server and put the file in the `plugins/` folder.
3. Start the server. SupMod creates `plugins/SupMod/` with its files and the SQLite database.
4. Type `/sm version` in game (as an operator) or in the console: SupMod answers with its version.

That's it: every module works with the default settings. Read the [first steps](/guide/first-steps) to adapt it to your server.

::: warning Don't use /reload
`/reload` (or PlugMan) reloads Java plugins in a way that breaks many of them. Restart the server instead. To apply a change of the SupMod configuration, use `/sm reload` or the reload button of `/sm settings`.
:::

## Optional plugins {#optional-plugins}

SupMod works alone. Two plugins add features when they are installed:

| Plugin | What it adds |
|---|---|
| [Vault](https://www.spigotmc.org/resources/vault.34315/) | The SupMod coins become the economy of the server: shops, jobs and other plugins use them. Disable it with `coins.vault: false`. |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | The [SupMod placeholders](/reference/placeholders) (`%supmod_kills%`...) work in other plugins, and the placeholders of other plugins work in the SupMod tab, sidebar, MOTD and holograms. |

## Files created {#files-created}

```text
plugins/SupMod/
├── config.yml          every module (each one has an "enabled" switch)
├── punishments.yml     punishment templates and settings
├── display.yml         MOTD, tab, sidebar, boss bars, join messages
├── rewards.yml         play time and daily rewards
├── announcements.yml   automatic announcements
├── zones.yml           zones (managed in game)
├── holograms.yml       holograms (managed in game)
├── emojis.yml          chat emojis
├── auto_rules.txt      rules message sent on join
├── lang/
│   ├── en_US.yml       English messages
│   └── fr_FR.yml       French messages
├── security/           IP and name blacklists (blacklisted_ips.txt, blacklisted_names.txt)
└── data/
    ├── database.db     SQLite database (when storage.type = sqlite)
    └── ...             internal files (maintenance, staff mode backups...)
```

You don't have to edit these files by hand: almost everything can be changed in game with `/sm settings`. See [Configuration](/guide/configuration).

## Updating from an older version {#updating-from-an-older-version}

Replace the jar and restart. New options, messages and database tables are added automatically and your values are kept. Read [Updating](/guide/updating) if you come from SupMod 1.x.
