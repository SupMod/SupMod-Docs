# Appeals

A punished player can ask the staff to reconsider his punishment. The staff accepts (the punishment is lifted) or refuses, and the player is told the decision, even if he is offline.

## The appeal code {#the-appeal-code}

A banned player cannot join, so the ban screen shows a **code**:

<p><span class="mc">Appeal code: 1284-K7QX9P</span></p>

The code contains the number of the ban and a signature made with a secret key of the server: it cannot be guessed or made up. With this code, the player can:

- appeal from **another account** or ask a friend: `/appeal 1284-K7QX9P I was not cheating, I use...`;
- send it to the staff on **Discord** or your forum: a staff member creates the appeal with `/sm appeal create 1284-K7QX9P <message>`.

Wrong codes are limited to 5 per player every 10 minutes.

::: tip Show the code
The code is the `%code%` placeholder of `punish.screen.ban` and `punish.screen.tempban` in the language files. Add it if your files were created before 2.3: see [Languages and messages](/guide/languages#the-ban-screen). You can also show a link with `appeal-url` in `punishments.yml`.
:::

## Mutes and warnings {#mutes-and-warnings}

A muted player is still on the server: he simply types

```text
/appeal I was answering a question, not spamming
```

and SupMod finds his current mute. Warnings can be appealed the same way if `allow-warn` is on.

## For the staff {#for-the-staff}

- New appeals are announced to the staff with `supmod.appeal.notify` (and on [Discord](/features/discord)); connecting staff members are reminded of the waiting appeals.
- `/sm appeals` lists the waiting appeals, oldest first (`/sm appeals all` for every appeal, `/sm appeals <player>` for one player).
- An appeal shows the punishment (reason, staff, date, duration, still in force or not) and the message of the player.
- **Accept**: the punishment is lifted. **Refuse**: it stays. In both cases you can write an answer for the player (or `-` for none).

From the chat: `/sm appeal accept <id> [answer]` or `/sm appeal refuse <id> [answer]`.

Rules that keep it fair:

- only one appeal at a time per punishment, and a new one only `cooldown-hours` (24) after a refusal;
- nobody can decide his own appeal;
- accepting needs the permission to lift that punishment (`supmod.punish.unban` for a ban, `supmod.punish.unmute` for a mute, `supmod.punish.revoke` for a warning);
- every appeal and decision is in the [staff history](/features/staff-tools#staff-history).

## Options (config.yml) {#options-config-yml}

| Option (`appeals.`) | Default | |
|---|---|---|
| `enabled` | `true` | module on / off |
| `allow-ban`, `allow-mute`, `allow-warn` | `true`, `true`, `false` | what can be appealed (kicks never) |
| `cooldown-hours` | `24` | delay before a new appeal after a refusal |
| `min-length`, `max-length` | `10`, `500` | length of the message |
| `remind-staff-on-join` | `true` | remind the waiting appeals to connecting staff |

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.appeal` | `/appeal` (everyone) |
| `supmod.appeal.notify` | receive the new appeals |
| `supmod.appeal.manage` | `/sm appeals`, accept or refuse |
| `supmod.appeal.create` | create an appeal from a code, no delay (with `supmod.appeal.manage`, needed by every `/sm appeal` command) |

A web panel can create appeals too: see [Database and web panel](/reference/database#appeals).
