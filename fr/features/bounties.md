# Primes

Les joueurs mettent des coins sur la tête d'un autre joueur : celui qui le tue empoche la prime. Nécessite les [coins](/fr/features/economy).

```text
/bounty Steve 500
/bounty list
```

- Plusieurs joueurs peuvent ajouter à la même prime ; le tueur empoche le total.
- Le montant est retiré quand la prime est posée. Une taxe (`tax-percent`) est gardée par le serveur.
- Une prime non réclamée après `expire-days` (14) jours est remboursée aux commanditaires.
- Les primes sont annoncées à tout le monde quand elles sont posées et réclamées (`broadcast-place`, `broadcast-claim`), et sur [Discord](/fr/features/discord) si l'événement `bounty` est activé.

## Anti-abus {#anti-abuse}

| Option | Par défaut | |
|---|---|---|
| `ignore-same-ip` | `true` | pas de récompense quand le tueur et la cible ont la même IP (farm de doubles comptes) |
| `sponsor-can-claim` | `false` | un commanditaire ne peut pas réclamer la prime qu'il a payée |
| `cooldown-seconds` | `60` | délai entre deux primes d'un même joueur |
| `min-amount`, `max-amount` | `100`, `0` | limites (0 = pas de maximum) |

`supmod.bounty.exempt` (donnée à personne par défaut) protège un joueur des primes (vérifié quand il est en ligne).

## Administration {#administration}

`/bounty remove <player>` rembourse et supprime les primes sur un joueur ; `/bounty on` / `off` active ou désactive le module (permission `supmod.bounty.admin`).

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.bounty` | poser des primes (tout le monde) |
| `supmod.bounty.list` | voir les primes (tout le monde) |
| `supmod.bounty.bypass-cooldown` | aucun délai |
| `supmod.bounty.admin` | supprimer des primes, activer ou désactiver le module |
| `supmod.bounty.exempt` | ne peut pas être ciblé |

`%supmod_bounty%` affiche la prime sur un joueur (pour le tab ou le nametag).
