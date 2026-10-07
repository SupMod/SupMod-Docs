# Mise à jour

## Depuis n'importe quelle version 2.x {#from-any-2-x-version}

1. Téléchargez le nouveau jar sur [SpigotMC](https://www.spigotmc.org/resources/supmod.108806/).
2. Arrêtez le serveur, remplacez l'ancien jar, démarrez le serveur.

Les nouvelles options, les nouveaux messages et les nouvelles tables de la base de données sont ajoutés automatiquement. Vos valeurs, vos messages et vos listes sont conservés. La console vous indique quand des options ont été ajoutées à `config.yml`.

### De la 2.3 à la 2.4 {#from-2-3-to-2-4}

- Rien à faire. Les nouvelles tables (`sm_drop_watch`, `sm_verified`, `sm_ignores`) et colonnes sont créées au premier démarrage.
- **Journal des drops** : les joueurs de `drop-log.players` (config.yml) sont déplacés dans la base de données en surveillances définitives, et la clé est retirée. Le journal des drops est maintenant activé par défaut pour les nouvelles installations (votre valeur de `drop-log.enabled` est conservée) ; dans le mode `WATCHLIST` par défaut, seuls les joueurs surveillés sont enregistrés. Surveiller des joueurs, `on` / `off` et le mode demandent maintenant `supmod.admin.drops.watch` (incluse dans `supmod.admin`). Voir [Journal des drops](/fr/features/drop-log).
- **Sons des menus** : `gui.click-sound` et `gui.sound-volume` sont déplacés automatiquement dans la nouvelle section `gui.sounds`. Voir [Sons des menus](/fr/guide/configuration#menu-sounds).
- La **vérification à la connexion** est désactivée par défaut : activez-la dans `/sm settings` › **Sécurité** si des bots se connectent à votre serveur. Le **verrouillage automatique** est activé (8 nouveaux comptes en 30 secondes) : si beaucoup de vrais nouveaux joueurs peuvent arriver d'un coup (événement, vidéo), augmentez `security.anti-raid.auto-lockdown.new-accounts` ou mettez-le à 0. Voir [Vérification et anti-raid](/fr/features/verification).
- Les **avertissements** doivent maintenant être confirmés par le joueur (`punishments.warn-acknowledge.enabled`) ; les avertissements donnés avant la mise à jour ne sont jamais demandés. Voir [Avertissements à confirmer](/fr/features/punishments#warning-acknowledgment).
- `/sm` ouvre le [hub du staff](/fr/features/staff-hub) pour le staff (`gui.hub.enabled: false` pour garder l'aide).
- `/staff` n'est plus un alias de `/staffmode` : il affiche le [staff en ligne](/fr/features/community#staff-list). Utilisez `/staffmode` ou `/mod`.
- **Conflits de commandes** : EssentialsX (ou un autre plugin) a peut-être déjà `/ignore`, `/unignore` ou `/staff`. Si c'est l'autre plugin qui répond, utilisez `/supmod:ignore`, `/supmod:unignore`, `/supmod:staff`, ou retirez les commandes de l'un des deux plugins dans le fichier `commands.yml` du serveur.
- Nouvelles permissions données à tous les joueurs : `supmod.ignore`, `supmod.stafflist`, `supmod.poll.vote`. Les nouvelles permissions du staff sont dans `supmod.staff` et `supmod.admin` (voir [Permissions et grades](/fr/guide/permissions)).

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
