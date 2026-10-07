# Staff hub

`/sm` without argument opens the **staff hub**: a dashboard with live counters and shortcuts to every staff menu. It is the starting point of a moderator's day.

- The hub opens for the players who can use at least one of its buttons (the staff). The other players and the console get the help, as before.
- `/sm help` always prints the help.
- `gui.hub.enabled: false` (in `/sm settings` › **General**) brings back the old behaviour: `/sm` prints the help.

## Counters {#counters}

The first row is refreshed every 2 seconds:

| Counter | Details | Click |
|---|---|---|
| Players | online / maximum, peak of the day, new players, AFK | player list |
| Staff online | in staff mode, vanished | |
| Open reports | | reports |
| Waiting tickets | | tickets |
| Pending appeals | | appeals |
| Alerts (last hour) | | alert history |
| TPS | tick time (MSPT), memory | server health |
| Server status | chat locked, slow mode, maintenance, pending restart | |

The reports, tickets, appeals and alerts counters come from the database: they are read in the background and updated every 30 seconds (one query per counter for the whole staff, never on the main thread). With [several servers](/guide/network) on MySQL, they count the whole network. A counter only appears for the staff members who can open its menu.

## Shortcuts {#shortcuts}

The rows below group the staff menus. Each button runs the matching `/sm` command, so the permissions and the messages are exactly those of the command. A button is hidden when you don't have its permission or when its module is disabled, and an empty group is not shown.

| Group | Buttons |
|---|---|
| Moderation | [reports](/features/reports), [tickets](/features/tickets), [appeals](/features/appeals), [alerts](/features/alerts), [chat control](/features/chat#chat-control), [punishment templates](/features/punishments#templates), [staff history](/features/staff-tools#staff-history) |
| Players | [player list](/features/player-management#player-list), [player search](/features/player-management#player-search), [watchlist](/features/player-management#notes-and-tags), [activity](/features/statistics#daily-activity), [staff statistics](/features/statistics#staff-statistics), [drop log](/features/drop-log), [item scan](/features/item-search#scan) |
| Server | [health](/features/server-health), [lag tools](/features/server-health), [worlds](/features/worlds), [maintenance](/features/maintenance), [restart](/features/maintenance), [lockdown](/features/verification#lockdown), [join verification](/features/verification#join-verification) |
| Configuration | [settings](/guide/configuration), [announcements](/features/announcements), [polls](/features/community#polls), [zones](/features/zones), [holograms](/features/holograms) |

The **Help** button at the bottom prints the help in the chat.

## Quick actions {#quick-actions}

Some buttons act directly, with a confirmation for the important actions:

| Button | Click | Right click | Shift + click |
|---|---|---|---|
| Chat control | lock / unlock the chat | slow mode: type the seconds, or `off` | clear the chat (confirmation) |
| Maintenance | start or stop the maintenance (confirmation) | | |
| Restart | restart in 5 minutes, or cancel the pending restart (confirmation) | type the delay (`10m`, `now`...) | |
| Lockdown | start the lockdown until it is ended, or end it (confirmation) | state in the chat | |
| Join verification | type the name of a player to verify | | |
| Polls | open the running poll, or create one (guided) | | |
| Item scan | scan the suspicious amounts | | |
| Search a player | type a part of a name | | |

Each action needs the permission of its command (`supmod.chat.lock`, `.slow`, `.clear`, `supmod.maintenance`, `supmod.restart`, `supmod.lockdown`...), checked again at the click.

## Permissions {#permissions}

The hub has no permission of its own: each button uses the permission of its command. A staff member sees the hub as soon as he has one of them; with the groups, moderators (`supmod.staff`) and administrators (`supmod.admin`) have it. The **Help** button needs `supmod.help`.

The **Staff online** counter counts the players with `supmod.staff` and the players in staff mode.
