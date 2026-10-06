# First steps

SupMod works as soon as it is installed. This checklist adapts it to your server in about fifteen minutes. Each step links to the page that explains it in detail.

## 1. Choose the language {#_1-choose-the-language}

Open `/sm settings` › **General** › **Language** and choose `fr_FR` or `en_US`. The messages, menus and staff alerts change at once.

You can also set `language: fr_FR` in `config.yml` and type `/sm reload`.

## 2. Give the permissions to your staff {#_2-give-the-permissions-to-your-staff}

Operators have every permission. For your ranks, two permission groups do most of the work:

| Group | For | Contains |
|---|---|---|
| `supmod.staff` | moderators | player files, reports, warn / mute / kick, staff mode, vanish, freeze, staff chat, tickets... |
| `supmod.admin` | administrators | everything in `supmod.staff` plus bans, settings, templates, server tools... |

With LuckPerms:

```text
/lp group moderator permission set supmod.staff true
/lp group admin permission set supmod.admin true
```

Details and finer setups: [Permissions and ranks](/guide/permissions).

## 3. Check the punishment templates {#_3-check-the-punishment-templates}

Templates are punishment ladders: *insult: 1st time = warning, 2nd time = 1 h mute, 3rd time = 1 day mute...* Six templates are ready (insult, spam, advertising, grief, cheat, disconnected while frozen). Open `/sm templates` to adapt the durations to your rules. See [Punishments](/features/punishments).

## 4. Adapt the report reasons {#_4-adapt-the-report-reasons}

The `/report` menu shows the reasons of `config.yml` › `report.reasons` (cheat, duplication, behaviour, grief). Each reason can propose a template to the staff. See [Reports](/features/reports).

## 5. Set up what players see {#_5-set-up-what-players-see}

- **MOTD and tab**: edit `display.yml` (server name, colours, links). The sidebar is off by default. See [MOTD, tab, sidebar](/features/display).
- **Rules on join**: edit `auto_rules.txt`.
- **Announcements**: edit `announcements.yml` or use `/sm announce`. See [Announcements and rules](/features/announcements).

## 6. Optional: Discord logs {#_6-optional-discord-logs}

Create a webhook in a private channel of your Discord (channel settings › Integrations › Webhooks), paste its URL in `/sm settings` › **Discord** › **Webhook URL** (or `discord.webhook-url` in `config.yml`), then type `/sm webhook on`. Reports, punishments, appeals and alerts are sent by default. See [Discord](/features/discord).

## 7. Optional: MySQL and several servers {#_7-optional-mysql-and-several-servers}

SQLite is perfect for one server. To share bans, mutes and the staff chat between several servers, use MySQL. See [Database](/guide/storage) and [Several servers](/guide/network).

## Try it {#try-it}

- `/staffmode` gives you the staff tools in the hotbar. Right click a player with the book to open his file.
- `/report <player>` from another account, then `/sm reports` to handle it.
- `/sm health` to see how your server is doing.

::: tip Most used commands of the staff
`/sm profile <player>` · `/punish <player>` · `/history <player>` · `/sm reports` · `/staffmode` · `/vanish` · `/freeze <player>` · `/sc <message>` · `/ticket list`
:::
