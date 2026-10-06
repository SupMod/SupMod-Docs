# Permissions and ranks

SupMod has about 140 permissions, but you rarely need to give them one by one. The full list is on the [Permissions](/reference/permissions) page.

## Without permission plugin {#without-permission-plugin}

- Every player has the player permissions: `/report`, `/ticket`, `/appeal`, `/rewards`, `/stats`, `/coins`, `/playtime`, `/afk`...
- Operators have everything.

## The groups {#the-groups}

| Permission | Give it to | Contains |
|---|---|---|
| `supmod.staff` | moderators | player files, teleport, inventory view, reports, warn / mute / unmute / kick, punishment menu and history, staff mode, vanish, freeze, staff chat, command spy, chat control, alerts, anti-spam bypass, health, worlds (view), game mode survival / spectator, heal, feed, notes, tags, timeline, tickets, staff statistics |
| `supmod.admin` | administrators | everything in `supmod.staff` + ban / ipban / unban / permanent / revoke, templates, settings, staff history, IP addresses, inventory edition, clear, creative / adventure, appeals, server tools (lag, maintenance, restart, zones, holograms...), economy administration, network |
| `supmod.*` | owner | same as `supmod.admin`; it does not add `supmod.admin.commands` nor the exempt and bypass permissions (a permission plugin such as LuckPerms may expand the wildcard itself) |

`supmod.admin.commands` is in no group on purpose: it allows editing console commands run by the plugin. See [Configuration](/guide/configuration).

## LuckPerms example {#luckperms-example}

```text
# Helper: reports, tickets, warn and mute
/lp group helper permission set supmod.player true
/lp group helper permission set supmod.admin.report.receive true
/lp group helper permission set supmod.admin.report.manage true
/lp group helper permission set supmod.ticket.manage true
/lp group helper permission set supmod.ticket.notify true
/lp group helper permission set supmod.punish.warn true
/lp group helper permission set supmod.punish.mute true
/lp group helper permission set supmod.punish.menu true
/lp group helper permission set supmod.punish.history true
/lp group helper permission set supmod.staffchat true

# Moderator: the whole staff toolkit
/lp group moderator parent add helper
/lp group moderator permission set supmod.staff true

# Admin: everything except the console commands
/lp group admin parent add moderator
/lp group admin permission set supmod.admin true
```

## Useful special permissions {#useful-special-permissions}

| Permission | Effect | Default |
|---|---|---|
| `supmod.punish.exempt` | cannot be punished by a staff member (the console still can) | operators |
| `supmod.player.exempt` | protected from quick actions, game mode changes and inventory edition by other staff members (operators still can) | admin |
| `supmod.freeze.exempt` | cannot be frozen | staff |
| `supmod.punish.permanent` | permanent bans and mutes (without it, a duration is required) | admin |
| `supmod.punish.template.cheat` | use the "cheat" template (its ban steps also need `supmod.punish.ban`, see [Templates](/features/punishments#templates)) | staff |
| `supmod.maintenance.bypass` | join during the maintenance | admin |
| `supmod.afk.exempt` | never marked AFK | staff |
| `supmod.afk.kickexempt` | never kicked for being AFK | staff |
| `supmod.bypass.xray` | no x-ray alert (builders in creative...) | nobody |
| `supmod.commandspy.exempt` | commands never shown to the spies | nobody |
| `supmod.announce.bypass` | does not receive the automatic announcements | nobody |
| `supmod.bounty.exempt` | no bounty can be placed on this player | nobody |

::: tip Template permissions
A punishment template can require its own permission (`permission:` in `punishments.yml`), like `supmod.punish.template.cheat`. Use it to keep the heaviest templates for senior moderators.
:::

## Game modes {#game-modes}

`/gm` needs `supmod.gamemode` **and** the permission of the mode: `supmod.gamemode.survival`, `.creative`, `.adventure`, `.spectator`. Changing the mode of another player also needs `supmod.gamemode.others`. Moderators get survival and spectator; administrators also get creative and adventure.
