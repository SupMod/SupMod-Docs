# Sécurité

## Liste noire {#blacklist}

Refusez une adresse IP ou un pseudo avant même que le joueur se connecte :

| Commande | |
|---|---|
| `/sm blacklist ban ip <ip>` | une IP (`192.168.0.15`), ou toutes les IP qui commencent pareil avec `*` (`192.168.0.*`) |
| `/sm blacklist ban username <name>` | un pseudo |
| `/sm blacklist unban ip\|username <value>` | retirer une entrée |
| `/sm blacklist list` | la liste noire |
| `/sm blacklist reload` | recharger les fichiers |

Les joueurs en ligne qui correspondent à une nouvelle entrée sont kick immédiatement. Les listes se trouvent dans `plugins/SupMod/security/blacklisted_ips.txt` et `blacklisted_names.txt` (une entrée par ligne, puis `/sm blacklist reload`). Dans `blacklisted_names.txt`, une ligne peut aussi être une expression régulière, par exemple `^Admin.*` ou `.*hack.*`.

Permissions : `supmod.blacklist.admin` (tout), ou `supmod.blacklist.ban`, `.unban`, `.list`, `.reload`.

## Limitation des connexions {#connection-throttle}

Les bots et les tentatives de crash se connectent de nombreuses fois depuis la même IP. La limitation bloque temporairement une IP après trop de connexions :

```yaml
security:
  enabled: true
  connection-throttle:
    enabled: true
    max-connections: 5
    per-seconds: 10
    block-minutes: 10
    whitelist:
      - "127.0.0.1"
```

Si votre serveur est derrière un proxy qui ne transmet pas les vraies IP, tous les joueurs ont l'IP du proxy : ajoutez-la à la whitelist (ou mieux, activez l'IP forwarding sur le proxy).

## Vérification et anti-raid {#anti-raid}

La vérification à la connexion (anti-bot), le verrouillage anti-raid, le nombre maximum de comptes par IP et le délai de chat des nouveaux joueurs ont leur propre page : [Vérification et anti-raid](/fr/features/verification).

## Journal des drops {#drop-log}

Le journal des drops (joueurs surveillés, durées, modes, surveillance automatique) a sa propre page depuis la 2.4 : [Journal des drops](/fr/features/drop-log). Pour retrouver des objets dupliqués, voir aussi la [recherche d'objets](/fr/features/item-search).

## Ce que SupMod protège de lui-même {#what-supmod-protects-by-itself}

- Mots de passe : `/login`, `/register`... ne sont jamais montrés au command spy ni enregistrés dans l'historique du chat.
- Les commandes console définies dans la configuration (récompenses, zones, kit de première connexion, redémarrages) ne peuvent être modifiées qu'avec `supmod.admin.commands`, et les pseudos des joueurs sont vérifiés avant d'être insérés dans une commande.
- Les messages des joueurs ne peuvent pas injecter de couleurs ni de mise en forme dans les messages du plugin, les menus ou Discord.
- Les membres du staff ne peuvent pas sanctionner les opérateurs (`supmod.punish.exempt`) ni agir sur les joueurs protégés (`supmod.player.exempt`).
- La modification d'inventaire ne peut pas dupliquer d'items, et chaque item déplacé est enregistré.
- La [recherche d'objets](/fr/features/item-search) lit les conteneurs avec des limites (profondeur, nombre d'objets, temps par tick) : un shulker piégé ne peut pas bloquer le serveur.
