# Base de données et panel web

Toutes les données de SupMod se trouvent dans des tables SQL ordinaires (SQLite ou MySQL), préfixées par `sm_`. Elles sont documentées ici pour ceux qui veulent les afficher sur un site web, créer un panel web ou faire des sauvegardes.

::: warning Lisez librement, écrivez avec prudence
Lire les tables est toujours sans risque. Pour modifier des données, préférez les commandes du plugin : SupMod en garde une partie en mémoire (mutes, tags des joueurs en ligne...). Les sections [Événements de synchronisation](#sync-events) et [Appels](#appeals) expliquent les deux façons prises en charge pour qu'un autre programme agisse sur le serveur.
:::

Les dates sont en **millisecondes depuis 1970** (UTC), comme renvoyées par `System.currentTimeMillis()` ou `Date.now()`. Les joueurs sont identifiés par leur UUID avec tirets.

## Joueurs {#players}

| Table | Contenu |
|---|---|
| `sm_players` | une ligne par joueur : `uuid`, `name`, `first_join`, `last_join`, `last_quit`, `playtime` (secondes, AFK exclu), `kills`, `deaths`, `last_ip` |
| `sm_sessions` | chaque connexion : `uuid`, `name`, `ip`, `join_time`, `quit_time` |
| `sm_player_stats` | statistiques Minecraft : `play_ticks`, `distance_cm`, `blocks_mined`, `blocks_placed`, `items_crafted`, `mob_kills`, `player_kills`, `deaths`, `jumps`, `damage_dealt`, `damage_taken`, `fish_caught`, `animals_bred`, `trades`, `enchants`, `afk_seconds`, `updated_at` |
| `sm_player_meta` | tags du staff : `tags` (identifiants séparés par des virgules) |
| `sm_player_notes` | notes du staff : `uuid`, `author_name`, `note`, `created_at` |
| `sm_rewards` | récompenses : paliers récupérés (`claimed`), `streak`, `best_streak`, `last_daily`, `total_daily` |
| `sm_economy` | coins : `balance` |
| `sm_transactions` | historique des coins : `kind`, `amount`, `balance`, `other_name`, `details`, `created_at` |
| `sm_bounties` | primes : `target_name`, `sponsor_name`, `amount`, `status`, `claimer_name` |

## Modération {#moderation}

| Table | Contenu |
|---|---|
| `sm_punishments` | `type` (`WARN`, `MUTE`, `KICK`, `BAN`), `reason`, `template`, `staff_name`, `created_at`, `expires_at` (0 = permanent), `active` (0 = révoquée), `ip_ban`, `revoked_by`, `revoked_at`, `revoke_reason`, `report_id` |
| `sm_reports` | `reporter_name`, `target_name`, `reason`, `comment`, `evidence`, `status` (`OPEN`, `RESOLVED`, `REJECTED`), `claimed_name`, `handler_name`, `handled_at`, `staff_note` |
| `sm_tickets` | `name`, `message`, `server`, `status` (`OPEN`, `CLOSED`), `claimed_name`, `claimed_at`, `closed_by`, `closed_at`, `rating` (1-5) |
| `sm_ticket_messages` | conversation : `ticket_id`, `author_name`, `staff` (1 = réponse du staff), `message`, `seen` |
| `sm_appeals` | `punishment_id`, `name`, `message`, `source` (`GAME`, `STAFF`, `WEB`), `status` (`PENDING`, `ACCEPTED`, `REFUSED`), `handler_name`, `response`, `notified` |
| `sm_chat_history` | derniers messages et commandes : `kind` (`CHAT`, `CMD`), `message` |
| `sm_chat_flags` | messages interceptés par le filtre de mots |
| `sm_alerts` | alertes de doubles comptes et de x-ray : `kind`, `details`, position |
| `sm_staff_log` | chaque action du staff : `staff_name`, `action`, `target_name`, `details` |
| `sm_inventory_log` | modification d'inventaire : `staff_name`, `container`, `action` (`TAKE`, `GIVE`, `DELETE`, `CLEAR`), `item`, `amount` |
| `sm_kills`, `sm_drops` | kills avec les inventaires, drops enregistrés |
| `sm_connection_log` | connexions refusées (liste noire, limitation des connexions) |

## Statistiques pour les graphiques {#statistics-for-graphs}

| Table | Contenu |
|---|---|
| `sm_daily` | une ligne par jour (`day` = `yyyy-MM-dd`) : `uniques`, `new_players`, `peak`, `playtime` (secondes actives), `punishments`, `reports`, `tickets` |
| `sm_daily_players` | quel joueur s'est connecté quel jour (`day`, `uuid`) : rétention |
| `sm_staff_time` | `staff_mode_seconds`, `vanish_seconds` par membre du staff |
| `sm_server_stats` | un relevé toutes les 5 minutes : `tps`, `mspt`, `online`, `memory_used`, `memory_max`, `entities`, `chunks` |

Exemple : les joueurs des 30 derniers jours, pour un graphique.

```sql
SELECT day, uniques, new_players, peak, playtime / 3600 AS hours
FROM sm_daily
ORDER BY day DESC
LIMIT 30;
```

## Événements de synchronisation {#sync-events}

Avec [plusieurs serveurs](/fr/guide/network), les serveurs communiquent via la table `sm_sync_events` :

| Colonne | |
|---|---|
| `id` | automatique |
| `server` | nom de l'émetteur (`network.server-name` ; un panel web peut utiliser `web`) |
| `type` | type de l'événement |
| `payload` | un objet JSON dont les valeurs sont des chaînes |
| `created_at` | date en millisecondes |

| Type | Payload | Effet sur les serveurs |
|---|---|---|
| `PUNISH` | `{"id":"123"}` | lit la sanction 123 de `sm_punishments` et l'applique là où se trouve le joueur (kick, mute...) ; prévient le staff |
| `REVOKE` | `{"uuid":"...","type":"MUTE"}` | un mute (ou un ban) a été levé : le joueur peut de nouveau parler |
| `STAFF_CHAT` | `{"player":"Steve","message":"..."}` | message dans le chat du staff |
| `ALERT` | `{"permission":"supmod.admin.report.receive","text":"...","command":"/supmod report 12"}` | alerte du staff. Seules les permissions d'alerte de SupMod sont acceptées, et seules des commandes en lecture seule peuvent être cliquables |
| `TICKET_ANSWER` | `{"uuid":"..."}` | le joueur a des réponses de ticket non lues |
| `APPEAL_DECIDED` | `{"uuid":"..."}` | le joueur a une décision d'appel à lire |

Les serveurs ne lisent que les événements écrits après leur démarrage ; les événements sont supprimés après `network.retention-hours`. SupMod ajoute `"origin"` (un identifiant du serveur émetteur) à ses propres événements pour les reconnaître ; un événement sans `origin` est ignoré uniquement par le serveur dont le nom se trouve dans la colonne `server`.

**Exemple : ban depuis un panel web**

```sql
INSERT INTO sm_punishments (uuid, name, type, reason, staff_name, created_at, expires_at, active, ip_ban, seen)
VALUES ('069a79f4-44e9-4726-a5be-fca90e38aaf5', 'Notch', 'BAN', 'Cheat', 'WebPanel', 1767225600000, 0, 1, 0, 1);

INSERT INTO sm_sync_events (server, type, payload, created_at)
VALUES ('web', 'PUNISH', '{"id":"42"}', 1767225600000);   -- 42 = id de la sanction créée ci-dessus
```

Le ban est actif sur tous les serveurs à la prochaine connexion ; l'événement `PUNISH` kick le joueur s'il est en ligne. Sans la synchronisation réseau, le ban fonctionne quand même à la prochaine connexion.

## Appels {#appeals}

Un panel web peut créer des appels que le staff traite en jeu (`/sm appeals`) :

```sql
INSERT INTO sm_appeals (punishment_id, uuid, name, message, source, created_at, status, notified)
VALUES (42, '069a79f4-44e9-4726-a5be-fca90e38aaf5', 'Notch', 'I was not cheating...', 'WEB', 1767225600000, 'PENDING', 0);
```

Pour vérifier le code tapé par un joueur sur votre site : le code est `<punishment id>-<signature>`. La signature correspond aux 6 premiers octets de `HMAC-SHA256(key, "<punishment id>")`, chaque octet (0-255) pris modulo 32 dans l'alphabet `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`. La clé est la valeur hexadécimale de `appeal_secret` dans la table `sm_meta` : gardez-la secrète.

Une décision prise par le panel (`status` = `ACCEPTED` ou `REFUSED`, `notified` = 0) est montrée au joueur à sa prochaine connexion ; pour lever la sanction, mettez aussi `active = 0` dans `sm_punishments` et publiez un événement `REVOKE`.
