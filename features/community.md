# Ignore, staff list and polls

Three features for the players: ignore a player who bothers you, find a staff member online, and vote in the polls of the staff. All of them are on by default; their options are in `/sm settings` › **Community**.

## Ignore a player {#ignore}

| Command | |
|---|---|
| `/ignore <player>` | ignore a player, or stop ignoring him if he is already ignored |
| `/ignore add <player>` | ignore a player (never removes him: for a player named `list`, `remove`...) |
| `/ignore list` | the players you ignore, as heads; click one to stop ignoring him |
| `/unignore <player>` or `/ignore remove <player>` | stop ignoring a player |

The players you ignore are hidden from you:

- their messages in the public chat;
- their @mentions (no ping sound);
- the announcements of the [bounties](/features/bounties) they place.

It works for offline players, and it also works with another chat plugin, as long as it uses the recipients of the chat message. Private messages (`/msg` of another plugin) are not filtered: SupMod has no private message system.

Staff members (`supmod.ignore.exempt`) cannot be ignored: the players always see the staff. A player can ignore at most `ignore.max` (50) players. The lists are saved in the database (`sm_ignores`): with [several servers](/guide/network), they follow the player.

::: tip Command conflicts
EssentialsX also has `/ignore` and `/unignore`. If the commands of EssentialsX answer, use `/supmod:ignore`, or remove the commands of one of the plugins in `commands.yml` of the server.
:::

## Staff online: /staff {#staff-list}

`/staff` (aliases `/stafflist`, `/helpers`, `/equipe`) opens the list of the staff members online that the player can see, with their role and their status:

| Status | |
|---|---|
| available | ready to help |
| busy | in [staff mode](/features/staff-tools#staff-mode) |
| AFK | [AFK](/features/afk) (hidden with `staff-list.show-afk: false`) |

The role is **Administrator** for the players with `supmod.admin`, **Moderator** for the others. Click a head to write a private message (`/msg <player>` is prepared in the chat). The **Ask for help** button prepares `/helpop` in the chat, to create a [ticket](/features/tickets). Staff members also get a button to switch the staff mode. From the console, `/staff` prints the list.

Invisible staff members are only listed for the staff who can see them (`supmod.vanish.see`). A staff member appears in the list with `supmod.staff.listed` (given by `supmod.staff`); to hide an administrator, set this permission to `false` for him.

::: info /staff and the staff mode
Before 2.4, `/staff` was an alias of `/staffmode`. Use `/staffmode` or `/mod` to switch the staff mode. With `staff-list.enabled: false`, `/staff` switches the staff mode again for the staff members.
:::

## Polls {#polls}

The staff asks a question, the players answer with one click.

```text
/poll create 10m Next event? | PvP tournament | Build contest | Treasure hunt
```

| Command | Permission | |
|---|---|---|
| `/poll` | `supmod.poll.vote` | the vote menu of the current poll |
| `/poll vote <number>` or `/poll <number>` | `supmod.poll.vote` | vote for an answer |
| `/poll create [duration] <question> \| <answer> \| <answer>...` | `supmod.poll.manage` | start a poll |
| `/poll create` | `supmod.poll.manage` | guided creation: question, answers and duration typed in the chat |
| `/poll end` | `supmod.poll.manage` | end the poll now and announce the results |
| `/poll cancel` | `supmod.poll.manage` | cancel the poll, without results |

Aliases: `/polls`, `/sondage`. The **Polls** button of the [staff hub](/features/staff-hub) starts the guided creation, or opens the current poll.

- **2 to 6 answers**, separated by `|`. Question: 100 characters at most, answer: 40.
- **Duration**: `90s`, `5m`, `1h`, or a number of minutes; from 30 seconds to `max-duration-minutes` (60). Without duration: `default-duration-minutes` (5). A number is only read as the duration when it is a possible duration: in `/poll create 2024 recap? | ...`, "2024" stays in the question.
- The poll is announced to everyone with **clickable answers**. The vote menu shows the answers and, with `show-results-live`, the number of votes of each one (the staff always sees them).
- A **boss bar** shows the question and the remaining time (`bossbar`). Halfway, the players who have not voted are reminded (polls of 2 minutes or more).
- One vote per player; it can be changed until the end.
- At the end, the results are announced, sorted, with percentages and bars, and written to the console and the staff history (`POLL_START`, `POLL_END`, `POLL_CANCEL`).

Colour codes in the question and the answers are removed unless the creator has `supmod.poll.color` (admin).

::: warning One poll per server, in memory
One poll at a time per server. Polls are not saved: a restart cancels the running poll, and so does switching `polls.enabled` off. With several servers, each server has its own polls.
:::

## Options (config.yml) {#options-config-yml}

| Option | Default | |
|---|---|---|
| `ignore.enabled` | `true` | `/ignore` on / off |
| `ignore.max` | `50` | ignored players per player |
| `staff-list.enabled` | `true` | `/staff` on / off (off: `/staff` switches the staff mode) |
| `staff-list.show-afk` | `true` | show the AFK staff members |
| `polls.enabled` | `true` | polls on / off |
| `polls.max-duration-minutes` | `60` | longest poll |
| `polls.default-duration-minutes` | `5` | duration when none is given |
| `polls.bossbar` | `true` | boss bar with the question and the remaining time |
| `polls.show-results-live` | `true` | players see the votes before the end |

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.ignore` | `/ignore` and `/unignore` (everyone) |
| `supmod.ignore.exempt` | cannot be ignored (staff) |
| `supmod.stafflist` | `/staff` (everyone) |
| `supmod.staff.listed` | appears in `/staff` (staff; negate it to stay hidden) |
| `supmod.poll.vote` | vote in the polls (everyone) |
| `supmod.poll.manage` | create, end and cancel polls, see the results before the end (staff) |
| `supmod.poll.color` | colour codes in the polls (admin) |
