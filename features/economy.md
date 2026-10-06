# Coins and Vault

SupMod has its own currency, the **coins**, used by the [rewards](/features/rewards) and the [bounties](/features/bounties). With [Vault](https://www.spigotmc.org/resources/vault.34315/), the coins become the economy of the whole server: shops, jobs and other plugins use them.

## Commands {#commands}

| Command | Permission | |
|---|---|---|
| `/coins` | `supmod.coins` | your balance |
| `/coins balance <player>` | `supmod.coins.player` | balance of a player |
| `/coins pay <player> <amount>` | `supmod.coins.pay` | pay a player |
| `/coins top` | `supmod.coins.top` | richest players |
| `/coins history` | `supmod.coins.history` | your transactions |
| `/coins history <player>` | `supmod.coins.history.others` | transactions of a player |
| `/coins give\|take\|set <player> <amount>` | `supmod.coins.admin` | administration |

The first five are given to everyone by default.

## Transaction history {#transaction-history}

Every movement is saved: payments, rewards, bounties, administration, and (with `history.log-vault: true`) what other plugins do through Vault. Administrators see it in the player file (`supmod.coins.history.others`). Kept `storage.transactions-retention-days` (180) days.

## Options {#options}

```yaml
coins:
  enabled: true
  vault: true               # register the coins as the Vault economy
  start-balance: 1000
  allow-negative: false
  decimals: 0               # 0 = whole numbers only
  symbol: "$"
  symbol-position: before   # before or after the amount
  name-singular: "coin"
  name-plural: "coins"
  history:
    enabled: true
    log-vault: true
```

::: tip You already have an economy plugin
Set `vault: false` to keep your economy in Vault (SupMod's rewards and bounties still use the coins), or `enabled: false` to disable the coins.
:::

## Placeholders {#placeholders}

`%supmod_coins%` (with the symbol), `%supmod_coins_number%` (without the symbol), `%supmod_coins_raw%` (raw number), and `%coins%` in the SupMod tab and sidebar.
