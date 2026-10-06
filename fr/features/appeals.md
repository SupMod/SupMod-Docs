# Appels

Un joueur sanctionné peut demander au staff de revoir sa sanction. Le staff accepte (la sanction est levée) ou refuse, et le joueur est prévenu de la décision, même s'il est hors ligne.

## Le code d'appel {#the-appeal-code}

Un joueur banni ne peut pas se connecter, donc l'écran de ban affiche un **code** :

<p><span class="mc">Code d'appel : 1284-K7QX9P</span></p>

Le code contient le numéro du ban et une signature faite avec une clé secrète du serveur : il est impossible de le deviner ou de l'inventer. Avec ce code, le joueur peut :

- faire appel depuis **un autre compte** ou demander à un ami : `/appeal 1284-K7QX9P I was not cheating, I use...` ;
- l'envoyer au staff sur **Discord** ou sur votre forum : un membre du staff crée l'appel avec `/sm appeal create 1284-K7QX9P <message>`.

Les codes erronés sont limités à 5 par joueur toutes les 10 minutes.

::: tip Afficher le code
Le code est le placeholder `%code%` de `punish.screen.ban` et `punish.screen.tempban` dans les fichiers de langue. Ajoutez-le si vos fichiers ont été créés avant la 2.3 : voir [Langues et messages](/fr/guide/languages#the-ban-screen). Vous pouvez aussi afficher un lien avec `appeal-url` dans `punishments.yml`.
:::

## Mutes et avertissements {#mutes-and-warnings}

Un joueur mute est toujours sur le serveur : il lui suffit de taper

```text
/appeal Je répondais à une question, je ne spammais pas
```

et SupMod retrouve son mute en cours. Les avertissements peuvent faire l'objet d'un appel de la même façon si `allow-warn` est activé.

## Pour le staff {#for-the-staff}

- Les nouveaux appels sont annoncés au staff qui a `supmod.appeal.notify` (et sur [Discord](/fr/features/discord)) ; les membres du staff qui se connectent reçoivent un rappel des appels en attente.
- `/sm appeals` liste les appels en attente, du plus ancien au plus récent (`/sm appeals all` pour tous les appels, `/sm appeals <player>` pour un seul joueur).
- Un appel affiche la sanction (motif, staff, date, durée, encore en cours ou non) et le message du joueur.
- **Accepter** : la sanction est levée. **Refuser** : elle reste. Dans les deux cas, vous pouvez écrire une réponse au joueur (ou `-` pour aucune).

Depuis le chat : `/sm appeal accept <id> [answer]` ou `/sm appeal refuse <id> [answer]`.

Des règles pour rester juste :

- un seul appel à la fois par sanction, et un nouveau seulement `cooldown-hours` (24) après un refus ;
- personne ne peut décider de son propre appel ;
- pour accepter, il faut la permission de lever cette sanction (`supmod.punish.unban` pour un ban, `supmod.punish.unmute` pour un mute, `supmod.punish.revoke` pour un avertissement) ;
- chaque appel et chaque décision figurent dans l'[historique du staff](/fr/features/staff-tools#staff-history).

## Options (config.yml) {#options-config-yml}

| Option (`appeals.`) | Par défaut | |
|---|---|---|
| `enabled` | `true` | module activé / désactivé |
| `allow-ban`, `allow-mute`, `allow-warn` | `true`, `true`, `false` | ce qui peut faire l'objet d'un appel (jamais les kicks) |
| `cooldown-hours` | `24` | délai avant un nouvel appel après un refus |
| `min-length`, `max-length` | `10`, `500` | longueur du message |
| `remind-staff-on-join` | `true` | rappeler les appels en attente au staff qui se connecte |

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.appeal` | `/appeal` (tout le monde) |
| `supmod.appeal.notify` | recevoir les nouveaux appels |
| `supmod.appeal.manage` | `/sm appeals`, accepter ou refuser |
| `supmod.appeal.create` | créer un appel à partir d'un code, sans délai (avec `supmod.appeal.manage`, nécessaire à toutes les commandes `/sm appeal`) |

Un panel web peut aussi créer des appels : voir [Base de données et panel web](/fr/reference/database#appeals).
