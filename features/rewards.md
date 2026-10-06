# Rewards

Two kinds of rewards keep players coming back: **play time milestones** (10 hours, 50 hours...) and a **daily reward** with a streak. Players see them with `/rewards` (and `/daily` for the daily reward). Everything is in `rewards.yml` and can be edited in game with `/rewards admin` (permission `supmod.rewards.admin`).

## Play time milestones {#play-time-milestones}

```yaml
playtime:
  enabled: true
  auto-claim: true          # false: the player is told to open /rewards and click
  milestones:
    10h:
      time: 10h
      name: "&e10 hours of play"
      icon: IRON_INGOT
      coins: 500
      commands: []
      broadcast: true
    50h:
      time: 50h
      name: "&650 hours of play"
      icon: GOLD_INGOT
      coins: 2500
      commands:
        - "give %player% diamond 3"
      broadcast: true
```

Each milestone gives coins and / or console commands (`%player%` = the name), once per player. The play time does not count the [AFK](/features/afk) time, so an AFK farm earns nothing.

## Daily reward {#daily-reward}

```yaml
daily:
  enabled: true
  auto-claim: false         # true: given at the first connection of the day
  loop: true                # after the last day, start again at day 1
  days:
    1:
      coins: 50
    2:
      coins: 75
    # ...
    7:
      coins: 500
      icon: NETHER_STAR
      commands:
        - "give %player% diamond 1"
```

Claiming the daily reward on consecutive days increases the **streak** (with `auto-claim: false`, the player must claim it each day with `/daily` or `/rewards`: connecting is not enough); missing one day starts again at day 1. The day changes at midnight in the time zone of `timezone`. A reward is given once per day, even with [several servers](/guide/network) on one database.

The streak is shown with `%supmod_streak%` and has its own [leaderboard](/features/statistics#leaderboards).

## In game {#in-game}

- `/rewards` shows the milestones (reached, claimed, remaining time) and the days of the streak; click to claim.
- `/rewards admin`: add, edit or delete milestones and days (coins, icon, commands, broadcast).
- `/rewards reload`: reload `rewards.yml`.

::: info Console commands
Editing the commands of a reward in game needs `supmod.admin.commands`. Names that could add arguments to a command (Bedrock names with spaces...) are refused.
:::

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.rewards` | `/rewards`, `/daily` and receive the rewards (everyone) |
| `supmod.rewards.admin` | edit the rewards |
