# Mise à jour

## Depuis n'importe quelle version 2.x {#from-any-2-x-version}

1. Téléchargez le nouveau jar sur [SpigotMC](https://www.spigotmc.org/resources/supmod.108806/).
2. Arrêtez le serveur, remplacez l'ancien jar, démarrez le serveur.

Les nouvelles options, les nouveaux messages et les nouvelles tables de la base de données sont ajoutés automatiquement. Vos valeurs, vos messages et vos listes sont conservés. La console vous indique quand des options ont été ajoutées à `config.yml`.

### De la 2.2 à la 2.3 {#from-2-2-to-2-3}

- Rien à faire. Les nouveaux modules (tickets, appels, AFK, statistiques) sont activés par défaut ; la synchronisation réseau est désactivée.
- Si vous avez modifié les fichiers de langue, ajoutez `%code%` à `punish.screen.ban` et `punish.screen.tempban` pour afficher le [code d'appel](/fr/features/appeals) sur l'écran de ban.
- Si un autre plugin utilise déjà `/gm`, `/gmc`... (EssentialsX), utilisez `/supmod:gm` ou retirez les commandes de l'un des deux plugins dans le fichier `commands.yml` du serveur.
- Les événements Discord `punishment`, `staff-chat`, `alert` et `bounty` sont maintenant vraiment envoyés quand ils sont activés (ils étaient ignorés avant).

### De la 2.1 à la 2.2 {#from-2-1-to-2-2}

`display.yml`, `zones.yml` et `holograms.yml` sont créés. Le nettoyage des objets au sol et la sidebar restent désactivés tant que vous ne les activez pas.

### De la 2.0 à la 2.1 {#from-2-0-to-2-1}

`punishments.yml`, `rewards.yml` et `announcements.yml` sont créés avec un contenu prêt à l'emploi.

## Depuis la 1.x {#from-1-x}

SupMod 2 est une réécriture complète. La mise à jour est automatique :

- l'ancien `config.yml` est converti dans la nouvelle organisation ; une copie est gardée sous le nom `config-1.x-backup.yml` ;
- les données de la 1.x (joueurs, temps de jeu, kills, signalements, mots du chat, objets jetés, coins) sont importées une seule fois dans les nouvelles tables. Les anciennes tables ne sont pas supprimées.

Ce qui change pour vous :

| SupMod 1.x | SupMod 2 |
|---|---|
| `/supmod menu player` | `/sm players`, `/sm profile <player>` |
| `/supmod menu admin report` | `/sm reports` |
| `/supmod menu drop ...` | `/sm drops ...` |
| `/supmod spec_teleport true` | `/sm spectp on` |
| `/supmod webhook player_join_server on` | `/sm webhook join on` |
| `moderation_chat:` dans config.yml | `chat.filter.words` |
| `emojy.yml` | `emojis.yml` |
| `auto_rule.txt` | `auto_rules.txt` (à renommer vous-même : seules les options `auto_rule` de `config.yml` sont converties) |
| `%supmod_count_kill%`, `%supmod_time_played%`... | `%supmod_kills%`, `%supmod_playtime%`... : voir [Placeholders](/fr/reference/placeholders#from-1-x) |
| permission de signalement `supmod.player` | `supmod.report` (tout le monde) |

::: warning Vérifiez vos placeholders
Les placeholders de la 1.x ont été renommés. Un plugin de scoreboard ou de tab qui utilise encore les anciens noms les affiche en texte brut : mettez-les à jour avec le tableau de la page [Placeholders](/fr/reference/placeholders#from-1-x).
:::
