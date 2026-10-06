# Tickets

Players ask the staff for help with `/ticket` or `/helpop`. Questions wait in a queue, a staff member takes one in charge and answers in game, and the player rates the help when it is closed.

## For the players {#for-the-players}

| Command | |
|---|---|
| `/ticket <message>` or `/helpop <message>` | ask a question |
| `/ticket reply <message>` | add a message to your ticket |
| `/ticket view` | your ticket and the answers |
| `/ticket close` | close your ticket |

The answers of the staff appear in the chat with a link to reply. If the player is offline, they are shown at his next connection. When the ticket is closed, he is asked to **rate the help** by clicking from 1 to 5 stars.

By default a player has one open ticket at a time (`max-open-per-player`) and waits 60 seconds between two tickets. A frozen player can still use `/helpop`.

## For the staff {#for-the-staff}

New tickets are announced to the staff with `supmod.ticket.notify` (click to open), and to [Discord](/features/discord) if you want. Connecting staff members are reminded of the open tickets.

`/ticket list` (or `/ticket` alone, or `/sm tickets`) opens the queue, oldest first, with filters: open, free, mine, closed, all. Colours: green = yours, orange = taken by somebody else, white = free.

A ticket shows the conversation and these buttons:

| Button | |
|---|---|
| Take the ticket | the other staff members see that you handle it; free again after `claim-expire-minutes` (30) without action |
| Answer | type the answer in the chat; answering a free ticket takes it for you |
| Close | the player is asked to rate the help |
| Teleport, player file | |

From the chat: `/ticket claim <id>`, `/ticket answer <id> <message>`, `/ticket done <id>`.

`supmod.ticket.override` allows taking over or closing a ticket handled by somebody else.

The ratings and the average answer time of each staff member are in the [staff statistics](/features/statistics#staff-statistics). With [several servers](/guide/network), tickets are shared: the server of the player is shown, and an answer reaches him wherever he is.

## Options (config.yml) {#options-config-yml}

| Option (`tickets.`) | Default | |
|---|---|---|
| `enabled` | `true` | module on / off |
| `cooldown-seconds` | `60` | delay between two tickets (`supmod.ticket.bypass.cooldown` ignores it) |
| `max-open-per-player` | `1` | open tickets per player |
| `min-length`, `max-length` | `5`, `200` | length of a message |
| `claim-expire-minutes` | `30` | a taken ticket is free again after X minutes (0 = never) |
| `rating` | `true` | the player rates the help |
| `remind-staff-on-join` | `true` | remind the open tickets to connecting staff |

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.ticket` | create, answer, close and rate tickets (everyone) |
| `supmod.ticket.notify` | receive the new tickets |
| `supmod.ticket.manage` | the queue, take, answer and close |
| `supmod.ticket.override` | take or close a ticket handled by somebody else |
| `supmod.ticket.bypass.cooldown` | no delay between two tickets |
