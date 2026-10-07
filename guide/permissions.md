# Permissions and ranks

SupMod has about 160 permissions, but you rarely need to give them one by one. The full list is on the [Permissions](/reference/permissions) page.

## Without permission plugin {#without-permission-plugin}

- Every player has the player permissions: `/report`, `/ticket`, `/appeal`, `/rewards`, `/stats`, `/coins`, `/playtime`, `/afk`, `/ignore`, `/staff`, `/poll`...
- Operators have everything.

## The groups {#the-groups}

| Permission | Give it to | Contains |
|---|---|---|
| `supmod.staff` | moderators | player files, teleport, inventory view, reports, warn / mute / unmute / kick, punishment menu and history, staff mode, vanish, freeze, staff chat, command spy, chat control, alerts, anti-spam bypass, health, worlds (view), game mode survival / spectator, heal, feed, notes, tags, timeline, tickets, staff statistics, item search and suspicious item alerts, join verification and lockdown (with their bypass), polls |
| `supmod.admin` | administrators | everything in `supmod.staff` + ban / ipban / unban / permanent / revoke, templates, settings, staff history, IP addresses, inventory edition, clear, creative / adventure, appeals, server tools (lag, maintenance, restart, zones, holograms...), economy administration, network, drop log (`supmod.admin.drops`, `supmod.admin.drops.watch`), colours in polls |
| `supmod.*` | owner | same as `supmod.admin`; it does not add `supmod.admin.commands` nor the exempt and bypass permissions (a permission plugin such as LuckPerms may expand the wildcard itself) |

`supmod.admin.commands` is in no group on purpose: it allows editing console commands run by the plugin. See [Configuration](/guide/configuration).

## LuckPerms example {#luckperms-example}

```text
# Helper: reports, tickets, warn and mute, listed in /staff
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
/lp group helper permission set supmod.staff.listed true

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
| `supmod.admin.drops.watch` | watch players in the [drop log](/features/drop-log); give it to the moderators who should manage it | admin |
| `supmod.verification.bypass` | never asked to pass the [join verification](/features/verification#join-verification) | staff |
| `supmod.lockdown.bypass` | can join during a [lockdown](/features/verification#lockdown), even with a new account | staff |
| `supmod.security.bypass-ip-limit` | not limited by `security.max-accounts-per-ip` | staff |
| `supmod.chat.bypass-new-delay` | can chat at once on a new account | staff |
| `supmod.ignore.exempt` | cannot be [ignored](/features/community#ignore) | staff |
| `supmod.staff.listed` | listed in `/staff`; set it to `false` to hide a staff member | staff |
| `supmod.punish.warn-acknowledge.bypass` | [warnings](/features/punishments#warning-acknowledgment) shown once without blocking anything | admin |
| `supmod.bypass.itemsearch` | never reported by the automatic [item scan](/features/item-search#automatic-scan) (creative builders...) | nobody |

::: tip Template permissions
A punishment template can require its own permission (`permission:` in `punishments.yml`), like `supmod.punish.template.cheat`. Use it to keep the heaviest templates for senior moderators.
:::

## Game modes {#game-modes}

`/gm` needs `supmod.gamemode` **and** the permission of the mode: `supmod.gamemode.survival`, `.creative`, `.adventure`, `.spectator`. Changing the mode of another player also needs `supmod.gamemode.others`. Moderators get survival and spectator; administrators also get creative and adventure.
