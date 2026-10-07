# Vérification et anti-raid

Quatre protections contre les attaques de bots et les raids de nouveaux comptes :

| Protection | Par défaut | |
|---|---|---|
| [Vérification à la connexion](#join-verification) | désactivée | un nouveau compte doit cliquer sur le bon objet dans un menu avant de jouer |
| [Verrouillage](#lockdown) | manuel, et automatique pendant un raid | les nouveaux comptes sont refusés tant qu'il dure |
| [Comptes par IP](#accounts-per-ip) | désactivé | nombre maximum de joueurs connectés avec la même IP |
| [Délai de chat des nouveaux joueurs](#new-player-chat-delay) | désactivé | un nouveau compte doit attendre avant d'écrire |

Pour la liste noire d'IP et de pseudos et la limitation des connexions, voir [Sécurité](/fr/features/security).

## Vérification à la connexion {#join-verification}

Un bot qui se connecte pour spammer ne sait pas cliquer dans un menu. Avec la vérification, un nouveau compte voit un menu de **9 objets mélangés** et doit cliquer sur celui qui est demandé (« Clique : Diamant ») :

- un mauvais clic affiche une nouvelle énigme ; après `max-attempts` (3) mauvais clics, le joueur est expulsé ;
- s'il ne répond pas dans les `timeout-seconds` (90) secondes, il est expulsé ;
- fermer le menu le rouvre ;
- une fois réussie, la vérification est mémorisée et n'est plus jamais demandée.

Un joueur expulsé peut se reconnecter et réessayer. Les expulsions sont écrites dans le journal des connexions (`VERIFICATION_FAILED`, `VERIFICATION_TIMEOUT`, voir [Base de données](/fr/reference/database#moderation)).

Tant qu'il ne l'a pas réussie, le joueur peut regarder autour de lui mais **ne peut pas** : s'éloigner, écrire, utiliser de commandes (sauf `allowed-commands`), interagir, casser ou poser des blocs, ramasser ou jeter des objets, utiliser son inventaire, se téléporter, prendre un portail ou un véhicule, frapper ou être blessé. Toutes ces restrictions s'appliquent toujours ensemble.

### Qui est concerné {#who-is-asked}

- Avec `only-new-players: true` (par défaut), seulement les comptes qui ne l'ont jamais réussie. Avec `false`, tous les joueurs à chaque connexion.
- Les joueurs qui ont déjà `trust-playtime-minutes` (30) minutes de temps de jeu sont de confiance : vous pouvez activer la vérification sur un serveur existant sans déranger vos joueurs.
- Les membres du staff (`supmod.verification.bypass`), les joueurs invisibles et en mode staff ne sont jamais concernés.
- Avec `remember: true` (par défaut), les comptes vérifiés sont enregistrés dans la base de données (`sm_verified`) et partagés par les serveurs d'un [réseau](/fr/guide/network). Avec `false`, ils ne sont mémorisés que jusqu'au redémarrage du serveur.

Si vous utilisez un plugin de connexion (AuthMe...), ajoutez ses commandes à `allowed-commands` (`login`, `register`), sinon les joueurs ne peuvent pas se connecter avant la vérification.

### Pour le staff {#verification-staff}

| Commande | |
|---|---|
| `/sm verify` | état de la vérification et nombre de joueurs en cours de vérification |
| `/sm verify <player>` | marquer un joueur comme vérifié ; s'il est en cours de vérification, il est libéré tout de suite |
| `/sm verify reset <player>` | oublier sa vérification : elle lui est redemandée à sa prochaine connexion |

Le bouton **Vérification à la connexion** du [hub du staff](/fr/features/staff-hub) demande un pseudo et valide le joueur. Les deux actions sont écrites dans l'historique du staff (`VERIFY`, `VERIFY_RESET`).

::: tip Un joueur gelé
La vérification passe en premier : un joueur [gelé](/fr/features/staff-tools#freeze) qui doit se vérifier voit le menu de freeze dès qu'il l'a réussie.
:::

::: warning Un anti-bot simple
L'énigme arrête les bots qui se connectent pour spammer. Un bot écrit pour votre serveur pourrait lire les objets du menu : combinez la vérification avec le [verrouillage](#lockdown).
:::

### Options (config.yml) {#verification-options}

| Option (`verification.`) | Par défaut | |
|---|---|---|
| `enabled` | `false` | vérification à la connexion activée / désactivée |
| `only-new-players` | `true` | `true` : seulement les comptes qui ne l'ont jamais réussie ; `false` : à chaque connexion |
| `remember` | `true` | mémoriser les comptes vérifiés dans la base de données (`false` : jusqu'au redémarrage) |
| `trust-playtime-minutes` | `30` | les comptes qui ont ce temps de jeu ne sont jamais concernés (0 = désactivé) |
| `timeout-seconds` | `90` | expulsé si ce n'est pas fait à temps (15-600) |
| `max-attempts` | `3` | mauvais clics avant l'expulsion (1-10) |
| `allowed-commands` | vide | commandes autorisées avant la vérification (plugin de connexion) |

## Verrouillage {#lockdown}

Pendant un raid, le verrouillage ferme le serveur aux nouveaux comptes. Les joueurs qui ont déjà joué ne sont pas concernés.

| Commande | |
|---|---|
| `/sm lockdown` | état : depuis quand, fin, par qui, raison, connexions refusées |
| `/sm lockdown on [duration] [reason]` | lancer le verrouillage ; sans durée, jusqu'à `/sm lockdown off` (30 jours maximum) ; relancé, il change la durée et la raison |
| `/sm lockdown off` | terminer le verrouillage |

```text
/sm lockdown on 30m attaque de bots
/sm lockdown off
```

Le bouton **Verrouillage** du [hub du staff](/fr/features/staff-hub) le lance ou le termine (avec confirmation) ; le clic droit affiche l'état.

### Qui est refusé {#who-is-refused}

Pendant un verrouillage, ces comptes sont refusés à la connexion avec un message qui donne la raison et la fin :

- les comptes qui n'ont jamais vraiment joué (moins d'une minute de temps de jeu) ;
- les comptes dont la première connexion a eu lieu pendant le verrouillage ;
- quand la [vérification à la connexion](#join-verification) est activée, les comptes qui ne l'ont pas encore réussie (et ne sont pas de confiance grâce à leur temps de jeu).

`supmod.lockdown.bypass` (staff) peut toujours se connecter. Si la base de données ne répond pas pendant un verrouillage, le nouveau compte est refusé. Chaque connexion refusée est comptée et écrite dans le journal des connexions (`LOCKDOWN`).

### Verrouillage automatique {#automatic-lockdown}

Quand `new-accounts` (8) nouveaux comptes arrivent en `seconds` (30) secondes, SupMod lance de lui-même un verrouillage de `minutes` (10) minutes. Le staff qui a `supmod.lockdown.notify` est prévenu quand un verrouillage commence et se termine, et l'événement [Discord](/fr/features/discord) `lockdown` est envoyé. `auto-lockdown.new-accounts: 0` désactive le verrouillage automatique.

Le verrouillage est conservé après un redémarrage (`plugins/SupMod/data/lockdown.yml`). Avec [plusieurs serveurs](/fr/guide/network), il est partagé par tous les serveurs (`network-sync`) ; chaque serveur compte ses propres nouveaux comptes pour le verrouillage automatique.

`security.anti-raid.enabled: false` désactive complètement le verrouillage : un verrouillage en cours se termine, `/sm lockdown on` est refusé et il n'y a pas de verrouillage automatique.

### Options (config.yml) {#lockdown-options}

| Option (`security.anti-raid.`) | Par défaut | |
|---|---|---|
| `enabled` | `true` | verrouillage disponible (`false` = aucun verrouillage) |
| `auto-lockdown.new-accounts` | `8` | nouveaux comptes qui déclenchent le verrouillage automatique (0 = pas de verrouillage automatique) |
| `auto-lockdown.seconds` | `30` | ...en ce temps |
| `auto-lockdown.minutes` | `10` | durée du verrouillage automatique |
| `network-sync` | `true` | partager le verrouillage avec les autres serveurs du réseau |

## Comptes par IP {#accounts-per-ip}

`security.max-accounts-per-ip` (0 = sans limite) est le nombre maximum de joueurs connectés avec la même IP. Au-delà, la connexion est refusée (« Trop de comptes ») et écrite dans le journal des connexions (`IP_LIMIT`).

Jamais limités : les connexions locales (`127.0.0.1`), les IP de `security.connection-throttle.whitelist` et les joueurs qui ont `supmod.security.bypass-ip-limit` (staff).

::: warning Derrière un proxy
Sans IP forwarding, tous les joueurs ont l'IP du proxy, et ils sont refusés dès que la limite est atteinte. Activez l'IP forwarding du proxy (la console vous prévient une fois), ou laissez la limite à 0.
:::

## Délai de chat des nouveaux joueurs {#new-player-chat-delay}

`chat.new-player-delay-seconds` (0 = désactivé) : un compte dont la première connexion date de moins de X secondes ne peut pas encore écrire, ni utiliser les commandes de messages privés de `anti-spam.commands` (`/msg`, `/tell`, `/r`...). Le temps restant lui est indiqué. Les bots qui se connectent et écrivent aussitôt sont arrêtés.

`supmod.chat.bypass-new-delay` (staff) peut écrire tout de suite.

## Réglages en jeu {#settings-in-game}

Toutes les options se modifient dans `/sm settings` : **Sécurité** (vérification, verrouillage, comptes par IP), **Chat** (délai des nouveaux joueurs), **Discord** (événement `lockdown`) et **Modules** (interrupteurs).

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.verification.bypass` | jamais soumis à la vérification (staff) |
| `supmod.verification.manage` | `/sm verify` (staff) |
| `supmod.lockdown` | `/sm lockdown` (staff) |
| `supmod.lockdown.bypass` | peut se connecter pendant un verrouillage, même avec un nouveau compte (staff) |
| `supmod.lockdown.notify` | prévenu quand un verrouillage commence ou se termine (staff) |
| `supmod.security.bypass-ip-limit` | non limité par `max-accounts-per-ip` (staff) |
| `supmod.chat.bypass-new-delay` | non concerné par le délai de chat des nouveaux joueurs (staff) |
