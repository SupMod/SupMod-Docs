# Placeholders

## PlaceholderAPI {#placeholderapi}

Avec [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installé, ces placeholders fonctionnent dans tous les plugins (tab, scoreboard, chat, hologrammes...). Rien à télécharger : SupMod les enregistre lui-même.

### Joueur {#player}

| Placeholder | Exemple | |
|---|---|---|
| `%supmod_playtime%` | `3d 4h` | temps de jeu (sans le temps AFK) |
| `%supmod_playtime_hours%` | `76` | temps de jeu en heures |
| `%supmod_playtime_seconds%` | `273600` | temps de jeu en secondes |
| `%supmod_kills%` | `42` | joueurs tués |
| `%supmod_deaths%` | `17` | morts |
| `%supmod_kdr%` | `2.47` | kills / morts |
| `%supmod_first_join%` | `12/03/2025 18:40` | première connexion |
| `%supmod_last_join%` | `05/10/2026 21:02` | dernière connexion |
| `%supmod_reports%` | `3` | signalements reçus |
| `%supmod_reports_open%` | `1` | signalements ouverts reçus |
| `%supmod_chat_flags%` | `0` | messages interceptés par le filtre de mots |

### Économie et récompenses {#economy-and-rewards}

| Placeholder | Exemple | |
|---|---|---|
| `%supmod_coins%` | `$1250` | solde avec le symbole |
| `%supmod_coins_number%` | `1250` | solde sans le symbole |
| `%supmod_coins_raw%` | `1250.0` | valeur brute |
| `%supmod_bounty%` | `$500` | prime sur le joueur |
| `%supmod_bounty_raw%` | `500.0` | valeur brute |
| `%supmod_streak%` | `6` | série quotidienne actuelle |
| `%supmod_best_streak%` | `21` | meilleure série quotidienne |

### État {#state}

| Placeholder | Valeurs | |
|---|---|---|
| `%supmod_afk%` | `true` / `false` | AFK |
| `%supmod_afk_tag%` | `[AFK] ` ou rien | à placer devant un pseudo (texte dans le fichier de langue : `afk.tag`) |
| `%supmod_muted%` | `true` / `false` | mute |
| `%supmod_vanished%` | `true` / `false` | en vanish |
| `%supmod_frozen%` | `true` / `false` | gelé |
| `%supmod_staffmode%` | `true` / `false` | en mode staff |
| `%supmod_chat_locked%` | `true` / `false` | chat verrouillé |
| `%supmod_online_visible%` | `25` | joueurs en ligne, staff en vanish non compté |

### Classements {#leaderboards}

Classements : `playtime`, `kills`, `coins`, `streak`.

| Placeholder | Exemple | |
|---|---|---|
| `%supmod_rank_<board>%` | `%supmod_rank_kills%` → `4` | rang du joueur (`-` s'il n'est pas dans le top) |
| `%supmod_top_<board>_<n>_name%` | `%supmod_top_kills_1_name%` → `Steve` | pseudo du n-ième joueur |
| `%supmod_top_<board>_<n>_value%` | `%supmod_top_kills_1_value%` → `128` | sa valeur, mise en forme |

Les tops vont jusqu'à `stats.size` (10) et sont actualisés toutes les `stats.refresh-minutes` (5) minutes.

::: tip Rapide
Chaque placeholder est lu en mémoire : un scoreboard actualisé à chaque tick n'interroge jamais la base de données.
:::

## Placeholders des affichages de SupMod {#placeholders-of-supmod-s-own-displays}

Dans `display.yml` (MOTD, tab, barre latérale, barres de boss, messages de connexion) et dans les hologrammes, SupMod a ses propres placeholders courts, même sans PlaceholderAPI :

| Placeholder | |
|---|---|
| `%player%` | pseudo du joueur |
| `%online%`, `%max%` | joueurs en ligne (staff en vanish non compté), maximum |
| `%staff_online%` | membres du staff visibles en ligne |
| `%ping%` | ping du joueur |
| `%tps%` | TPS de la dernière minute |
| `%world%` | monde du joueur |
| `%time%`, `%date%` | heure et date (fuseau horaire de `timezone`) |
| `%coins%`, `%playtime%`, `%kills%`, `%deaths%`, `%streak%`, `%bounty%` | valeurs du joueur |
| `%afk%` | `[AFK] ` ou rien |
| `%maintenance%` | `ON` ou `OFF` |

Avec PlaceholderAPI installé, tous les placeholders PlaceholderAPI y fonctionnent aussi. Le MOTD n'accepte que `%online%` et `%max%` ; les hologrammes, uniquement les placeholders identiques pour tous les joueurs.

## Depuis la 1.x {#from-1-x}

Les placeholders de SupMod 1.x ont été renommés dans la 2.0 :

| SupMod 1.x | SupMod 2 |
|---|---|
| `%supmod_count_kill%` | `%supmod_kills%` |
| `%supmod_count_death%` | `%supmod_deaths%` |
| `%supmod_time_played%` | `%supmod_playtime%` |
| `%supmod_count_report%` | `%supmod_reports%` |
| `%supmod_count_active_report%` | `%supmod_reports_open%` |
| `%supmod_count_bad_words%` | `%supmod_chat_flags%` |
| `%supmod_first_connexion%` | `%supmod_first_join%` |
| `%supmod_last_connexion%` | `%supmod_last_join%` |
| `%supmod_coins%` | `%supmod_coins%` (inchangé) |
