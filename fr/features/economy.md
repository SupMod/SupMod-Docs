# Coins et Vault

SupMod a sa propre monnaie, les **coins**, utilisés par les [récompenses](/fr/features/rewards) et les [primes](/fr/features/bounties). Avec [Vault](https://www.spigotmc.org/resources/vault.34315/), les coins deviennent l'économie de tout le serveur : les shops, les jobs et les autres plugins les utilisent.

## Commandes {#commands}

| Commande | Permission | |
|---|---|---|
| `/coins` | `supmod.coins` | votre solde |
| `/coins balance <player>` | `supmod.coins.player` | solde d'un joueur |
| `/coins pay <player> <amount>` | `supmod.coins.pay` | payer un joueur |
| `/coins top` | `supmod.coins.top` | joueurs les plus riches |
| `/coins history` | `supmod.coins.history` | vos transactions |
| `/coins history <player>` | `supmod.coins.history.others` | transactions d'un joueur |
| `/coins give\|take\|set <player> <amount>` | `supmod.coins.admin` | administration |

Les cinq premières sont données à tout le monde par défaut.

## Historique des transactions {#transaction-history}

Chaque mouvement est enregistré : paiements, récompenses, primes, administration, et (avec `history.log-vault: true`) ce que les autres plugins font via Vault. Les administrateurs le voient dans la fiche joueur (`supmod.coins.history.others`). Conservé `storage.transactions-retention-days` (180) jours.

## Options {#options}

```yaml
coins:
  enabled: true
  vault: true               # enregistrer les coins comme économie Vault
  start-balance: 1000
  allow-negative: false
  decimals: 0               # 0 = nombres entiers uniquement
  symbol: "$"
  symbol-position: before   # before ou after le montant
  name-singular: "coin"
  name-plural: "coins"
  history:
    enabled: true
    log-vault: true
```

::: tip Vous avez déjà un plugin d'économie
Mettez `vault: false` pour garder votre économie dans Vault (les récompenses et les primes de SupMod utilisent toujours les coins), ou `enabled: false` pour désactiver les coins.
:::

## Placeholders {#placeholders}

`%supmod_coins%` (avec le symbole), `%supmod_coins_number%` (sans le symbole), `%supmod_coins_raw%` (nombre brut), et `%coins%` dans le tab et la barre latérale de SupMod.
