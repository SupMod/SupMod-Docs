# Changelog

Les nouveautés de chaque version de SupMod. Téléchargez la dernière version sur [SpigotMC](https://www.spigotmc.org/resources/supmod.108806/) ; pour mettre à jour, lisez [Mettre à jour](/fr/guide/updating).

## 2.4.0 — Vérification, interactions et journal des drops {#v2-4-0}

### Ajouté
- **Journal des drops géré en jeu** :
  - liste des joueurs surveillés en base de données, avec **durée** (`7d`, `12h`, `perm`…), **raison**, auteur et date ; les surveillances expirées sont retirées automatiquement ;
  - `/sm drops` ouvre un menu : joueurs surveillés (raison, ajouté par, expiration, en ligne ou non), bouton pour surveiller un joueur, activation, mode, journal complet, paramètres ;
  - `/sm drops add <joueur> [durée] [raison]`, `remove`, `list`, `log [joueur]`, `on|off`, `mode <watchlist|all>`, avec complétion, y compris pour les joueurs hors ligne ;
  - fiche joueur : l'entonnoir indique si le joueur est surveillé et jusqu'à quand ; clic droit pour le surveiller ou arrêter ;
  - `/sm players` : mention « Drops surveillés » et touche **Q** pour surveiller un joueur ;
  - modes `WATCHLIST` (joueurs surveillés, par défaut) et `ALL` (tout le monde, pour les petits serveurs) ;
  - surveillance automatique des joueurs ayant un tag du staff (`watch`, `cheat`) et, en option, des nouveaux joueurs pendant leurs premières minutes ;
  - journal filtrable (tous, pas ramassés, ramassés par un autre) ; clic pour se téléporter sur le lieu du drop, clic droit pour la fiche de celui qui l'a ramassé ;
  - ajouts et retraits écrits dans l'historique du staff et synchronisés entre les serveurs d'un réseau.
- **Hub du staff** : `/sm` sans argument ouvre un tableau de bord :
  - compteurs en direct : joueurs, staff connecté, signalements, tickets, appels, alertes de la dernière heure, TPS et mémoire, état du serveur ;
  - raccourcis groupés (Modération, Joueurs, Serveur, Configuration) vers tous les menus du staff, selon les permissions ;
  - actions rapides : verrouiller / ralentir / vider le chat, maintenance, redémarrage, verrouillage anti-raid, sondages ;
  - `/sm help` affiche toujours l'aide ; `gui.hub.enabled: false` rétablit l'ancien comportement.
- **Liste des joueurs** (`/sm players`) : filtres (staff, nouveaux joueurs, muets, gelés, tagués, AFK), tri (pseudo, durée de session, ping, monde), ping, durée de session et badges dans la description.
- **Recherche de joueurs** (`/sm search <texte>` ou bouton de la liste) : par une partie du pseudo, parmi tous les joueurs connus, connectés ou non.
- **Vérification à la connexion (anti-bot)**, désactivée par défaut :
  - le nouveau compte doit cliquer sur l'objet demandé parmi 9 objets mélangés ;
  - en attendant, il ne peut ni bouger, ni écrire, ni utiliser de commandes, ni interagir ; expulsion après le délai ou trop d'erreurs ;
  - réussite mémorisée (partagée entre les serveurs d'un réseau) ; les joueurs ayant déjà du temps de jeu ne sont pas concernés ;
  - `/sm verify <joueur>` et `/sm verify reset <joueur>`.
- **Verrouillage anti-raid** :
  - `/sm lockdown on [durée] [raison]`, `off`, état ;
  - pendant un verrouillage, les comptes qui ne se sont jamais connectés (ou pas encore vérifiés) sont refusés ;
  - verrouillage automatique quand trop de nouveaux comptes arrivent (8 en 30 s → 10 minutes par défaut), alerte au staff et événement Discord `lockdown` ;
  - état conservé au redémarrage et partagé entre les serveurs.
- **Comptes maximum par IP** (`security.max-accounts-per-ip`, désactivé par défaut).
- **Délai de chat des nouveaux joueurs** (`chat.new-player-delay-seconds`, désactivé par défaut), aussi appliqué aux messages privés.
- **Ignorer un joueur** (`/ignore <joueur>`, `/ignore add`, `/ignore list`, `/unignore`) : ses messages du chat, ses @mentions et ses annonces de primes ne sont plus reçus ; le staff ne peut pas être ignoré.
- **Staff en ligne** (`/staff`) : membres du staff visibles avec leur rôle et leur statut (disponible, mode staff, AFK), bouton « Demander de l'aide ».
- **Sondages** (`/poll`) : `/poll create [durée] <question> | <réponse> | ...` ou création guidée, réponses cliquables, menu de vote avec résultats en direct, barre de boss, rappel à mi-parcours, résultats en pourcentages.
- **Avertissements à confirmer** : le joueur averti voit un menu (raison, staff, date, nombre d'avertissements, prochaine étape du modèle) et doit cliquer sur « J'ai compris » ; avertissements hors ligne montrés à la connexion ; date de confirmation visible dans l'historique ; option pour prévenir le staff.
- **Recherche d'objets (anti-dupe)** :
  - `/sm itemsearch <objet> [quantité]` : qui possède un objet parmi les joueurs en ligne (inventaire, coffre de l'Ender, shulkers, sacs) ;
  - `/sm itemsearch scan` : joueurs au-dessus des quantités suspectes configurées ;
  - analyse automatique optionnelle avec alertes « Objets suspects » (`/sm alerts items`, Discord, réseau).
- **Sons des menus** : clic, ouverture et refus, réglables.
- Nouvelle catégorie **Communauté** dans `/sm settings` ; toutes les nouvelles options sont modifiables en jeu.

### Modifié
- Le journal des drops est **activé par défaut** (sans risque : en mode `WATCHLIST`, rien n'est enregistré tant que personne n'est surveillé). Les serveurs existants gardent leur valeur.
- `drop-log.players` (UUID dans config.yml) est migré automatiquement vers la base de données au démarrage.
- Journal des drops plus léger : écritures groupées toutes les 3 secondes, limite de drops par joueur et par minute (le surplus est résumé), objets sans valeur ignorés, nombre de joueurs surveillés limité.
- `supmod.admin.drops` permet de voir le journal ; gérer la surveillance demande `supmod.admin.drops.watch`.
- `/staff` n'est plus un alias de `/staffmode` (`/mod` reste un alias) ; si la liste du staff est désactivée, `/staff` redevient le mode staff.
- `gui.click-sound` et `gui.sound-volume` sont remplacés par la section `gui.sounds` (valeurs reprises automatiquement).
- Le menu de freeze attend la fin de la vérification de connexion au lieu de la remplacer.

### Corrigé
- Une durée avec trop de chiffres (`99999999999999999999d`) provoquait une erreur au lieu d'être refusée.

### Sécurité
- Vérification : téléportations, portails, véhicules, flèches et complétion des commandes bloqués pendant la vérification ; délai maximum garanti même si la base de données ne répond pas.
- Verrouillage : en cas d'erreur de la base de données pendant un verrouillage, le nouveau compte est refusé ; un compte expulsé une fois n'est pas considéré comme connu.
- Les joueurs en vérification ou bloqués par un avertissement ne déclenchent plus l'anti-spam.
- Recherche d'objets bornée (profondeur et nombre d'objets lus dans les conteneurs, temps par tick) : un shulker piégé ne peut pas bloquer le serveur.
- Sondages : codes couleur supprimés jusqu'au bout sans la permission `supmod.poll.color`.
- Limite d'IP : les connexions locales (`127.0.0.1`, proxy sur la même machine) ne sont jamais limitées.

## 2.3.0 — Gestion des joueurs {#v2-3-0}

### Ajouté
- **Mode de jeu rapide** :
  - `/gm 0-3 [joueur]`, `/gmc`, `/gms`, `/gma`, `/gmsp` ; `/gm` seul ouvre un menu ;
  - une permission par mode (`supmod.gamemode.creative`…) et `supmod.gamemode.others` ;
  - bouton dans la fiche joueur et nouvel outil du mode staff ;
  - chaque changement est écrit dans l'historique du staff.
- **Actions rapides** dans la fiche joueur : soigner, nourrir, mode de jeu, se téléporter à lui, le téléporter ici, geler, vider l'inventaire (avec confirmation).
- **Inventaire et ender chest modifiables** (`supmod.admin.inventory.edit`) :
  - clic : prendre la pile ; clic droit : la moitié ; Q / Ctrl+Q : supprimer ; clic dans son propre inventaire : donner ;
  - chaque clic est une opération faite par le serveur : aucune duplication possible, même si le joueur utilise son inventaire en même temps ;
  - chaque objet pris, donné, supprimé ou vidé est journalisé (`sm_inventory_log`, `/sm invlog`).
- **Notes et tags du staff** :
  - notes (`/sm notes`, `/sm note`) et tags configurables (« à surveiller », « suspect cheat », « VIP ») ;
  - liste de surveillance (`/sm watchlist`) ;
  - alerte au staff quand un joueur surveillé se connecte.
- **Chronologie d'un joueur** (`/sm timeline`) : sessions, sanctions, signalements faits et reçus, notes, tickets et appels dans une seule vue, avec les pseudos et IP utilisés. `/sm ip <ip>` liste tous les comptes d'une IP.
- **Détection AFK** et `/afk` :
  - AFK après X minutes sans activité (rotation de la tête, marche, chat, commandes, interactions) ;
  - le temps AFK est retiré du temps de jeu et des récompenses de temps de jeu ;
  - kick optionnel après X minutes, ou quand le serveur est plein ;
  - placeholders `%supmod_afk%` et `%supmod_afk_tag%`.
- **Tickets** (`/ticket`, `/helpop`) :
  - file d'attente pour le staff avec prise en charge, comme les signalements ;
  - réponses en jeu, remises à la prochaine connexion si le joueur est absent ;
  - le joueur note l'aide de 1 à 5 étoiles.
- **Appels** :
  - l'écran de ban affiche un code d'appel signé, impossible à deviner ;
  - `/appeal <code> <message>`, ou `/appeal <message>` pour un mute ;
  - le staff accepte (la sanction est levée) ou refuse dans `/sm appeals` ; le joueur est prévenu, même hors ligne ;
  - tout est journalisé ; un futur panel web peut créer des appels (`source = WEB`).
- **Statistiques** :
  - copie des statistiques Minecraft (distance, blocs minés et posés, kills, morts…) à la déconnexion et toutes les 10 minutes, étalée sur les ticks ;
  - agrégats quotidiens (`sm_daily`) : joueurs uniques, nouveaux joueurs, pic, temps de jeu actif, sanctions, signalements, tickets, avec graphiques (`/sm activity`) ;
  - statistiques du staff (`/sm staffstats`) : sanctions, signalements traités et temps de réponse moyen, tickets et note moyenne, appels, temps en mode staff et en vanish ;
  - rétention : jours de connexion, ancienneté, nouveaux joueurs revenus après 7 et 30 jours, retours après une absence.
- **Synchronisation multi-serveur** par la base MySQL partagée :
  - bans, mutes, kicks, avertissements, chat staff et alertes du staff propagés entre les serveurs ;
  - aucun port, plugin ni service externe ; `/sm network` affiche l'état ;
  - format des événements documenté pour un futur panel web.
- **Paramètres en jeu** : nouvelles catégories Joueurs, Tickets et appels, Statistiques et Réseau.
- **Discord** : événements `ticket` et `appeal`.

### Modifié
- Le menu des paramètres passe à 6 lignes.
- Les messages d'écran de ban (`punish.screen.ban` et `tempban`) affichent le code d'appel (`%code%`).
- Nouveaux index sur les sanctions, les signalements, les joueurs et les sessions, ajoutés automatiquement.

### Corrigé
- La catégorie Sécurité n'apparaissait pas dans `/sm settings`.
- Les événements Discord `punishment`, `staff-chat`, `alert` et `bounty` n'étaient jamais envoyés.
- Spigot 26.x : le menu des règles de jeu et le réglage du PvP par monde ne fonctionnaient pas (anciennes méthodes retirées par Spigot). Ils passent maintenant par l'API des règles de jeu disponible sur la version du serveur.

### Sécurité
- L'inventaire du mode staff ne peut ni recevoir ni donner d'objets lors de l'édition d'un inventaire (les objets seraient perdus).
- `supmod.player.exempt` protège le staff contre les actions des autres membres du staff (les opérateurs gardent la main).
- Codes d'appel limités à 5 erreurs par 10 minutes ; personne ne peut traiter son propre appel, et accepter un appel demande la permission de lever la sanction.
- Les alertes reçues des autres serveurs sont limitées aux permissions d'alerte du staff et à des commandes en lecture seule.
- Les menus de statistiques lourdes partagent leurs résultats en cache : ils ne peuvent pas surcharger la base de données.

## 2.2.0 — Gestion du serveur {#v2-2-0}

### Ajouté
- **Santé du serveur** (`/sm health`) : TPS sur 1, 5 et 15 min, mesurés par SupMod (fonctionne aussi sur Spigot), MSPT sur Paper, mémoire, joueurs, entités, chunks, durée de fonctionnement.
  - Graphiques sur 24 h, bilan des 7 derniers jours, menu actualisé toutes les 2 s.
  - Alertes au staff et sur Discord quand le TPS est bas ou la mémoire presque pleine.
  - Historique conservé dans la table `sm_server_stats`.
- **Outils anti-lag** (`/sm lag`) :
  - chunks les plus chargés, avec la téléportation en un clic ;
  - nettoyage des objets au sol avec compte à rebours (désactivé par défaut) ;
  - limite de mobs par chunk (désactivée par défaut).
- **Gestion des mondes** (`/sm worlds`) :
  - statistiques : joueurs, chunks, entités par type, jours en jeu et jours réels, taille sur le disque ;
  - actions : heure, météo, difficulté, PvP, spawn, bordure, sauvegarde automatique, règles du jeu ;
  - chargement d'un dossier de monde existant, déchargement d'un monde.
- **Mode maintenance** (`/sm maintenance`) : compte à rebours, expulsion des joueurs, liste blanche, MOTD dédié. Le staff avec `supmod.maintenance.bypass` peut toujours se connecter.
- **Redémarrages planifiés** :
  - à heures et jours fixes, ou avec `/sm restart 10m` ;
  - compte à rebours dans le chat, en titre et en barre de boss ;
  - commandes lancées avant l'arrêt.
- **MOTD** : rotation, couleurs hexadécimales, MOTD de maintenance, maximum affiché personnalisable, staff invisible exclu du compteur.
- **Tab** : en-tête et pied de page animés, format des noms par permission, tri par grade (optionnel), placeholders (ping, TPS, staff en ligne…).
- **Barre latérale** optionnelle, sans scintillement. `/sidebar` pour la masquer. Elle ne remplace jamais le tableau des scores d'un autre plugin.
- **Barres de boss** : annonces en rotation et `/sm bossbar`.
- **Messages de connexion** :
  - format par permission ;
  - première connexion avec le numéro du joueur ;
  - titres de bienvenue ;
  - kit de première connexion.
- **Zones** (`/sm zones`) :
  - baguette de sélection ;
  - à l'entrée et à la sortie : messages, titres, barre d'action, sons, commandes ;
  - règles : PvP interdit, vol interdit, permission d'entrée ;
  - bords réglables en direct, avec aperçu en particules.
- **Hologrammes** (`/sm holograms`) : entités `TextDisplay`, sans armor stand.
  - Éditeur de position en direct, au pas de 0,05 à 1 bloc.
  - Rotation, taille, fond, ombre, placeholders.
- **Classements en hologramme** : top kills, temps de jeu, richesse et série quotidienne.
- **Paramètres en jeu** : 7 nouvelles catégories (serveur, MOTD et tab, barre latérale, connexion, mondes, zones, hologrammes) et le fichier `display.yml`.

### Sécurité
- Nouvelle permission **`supmod.admin.commands`**, non incluse dans `supmod.admin`. Elle est nécessaire pour modifier toute commande console lancée par SupMod : récompenses, zones, kit de bienvenue, redémarrage.
- Chaque menu revérifie sa permission à l'ouverture et à chaque clic, y compris les menus de confirmation et d'édition de listes.
- Les noms de joueurs insérés dans des commandes console sont vérifiés, ce qui protège contre l'injection via des pseudos Bedrock.
- Seuls des dossiers de mondes existants peuvent être chargés, avec un nom vérifié : pas de chemin `../`.
- **Zones** :
  - un joueur ne peut jamais y être piégé ;
  - les commandes d'entrée et de sortie fonctionnent par paires, avec un anti-spam ;
  - la permission d'entrée est aussi vérifiée pour les téléportations, les portails, les véhicules et la réapparition.
- **Maintenance** : la vérification se fait à la connexion, une fois les permissions chargées. Le joueur refusé n'entre jamais dans le monde.

### Modifié
- Les menus peuvent se rafraîchir automatiquement, et un menu de confirmation hérite de la permission du menu qui l'a ouvert.
- Les modifications des zones et des hologrammes sont enregistrées toutes les 5 s, pour éviter une écriture à chaque clic.

---

## 2.1.0 — Suite de modération complète {#v2-1-0}

### Ajouté
#### Modération
- **Sanctions** : `/warn`, `/mute`, `/kick`, `/ban`, `/ipban`, `/unmute`, `/unban`. Elles peuvent être temporaires (`30m`, `2h`, `7d`, `1mo`, `1y`, ou combinées comme `1d12h`) ou définitives (`perm`), et silencieuses avec `-s`.
  - Un écran de ban personnalisable, avec un lien d'appel.
  - Le ban est vérifié à la connexion puis revérifié après l'arrivée du joueur.
  - Le mute bloque aussi les messages privés.
- **Modèles de sanction** (`punishments.yml`) : des échelles comme « Insulte : 1er = avertissement, 2e = mute 1 h, 3e = ban 1 j ».
  - Six modèles sont fournis.
  - Une permission peut être exigée par modèle.
  - Ils se créent et se modifient en jeu avec `/sm templates`.
- **Menu de sanction** : il est ouvert depuis la fiche joueur, un signalement, la liste des joueurs ou l'outil du mode staff.
  - Il affiche la prochaine étape de chaque modèle.
  - Il propose des sanctions rapides avec une durée et une raison tapées dans le chat.
  - Il gère le mode silencieux et demande une confirmation.
- **Historique des sanctions** : `/history <joueur>`, avec annulation en un clic et une raison.
- **Mode staff** : `/staffmode`. L'inventaire est sauvegardé (et restauré même après un crash), avec vanish, vol, invulnérabilité et 8 outils :
  - TP aléatoire ;
  - freeze ;
  - fiche ;
  - inventaire ;
  - sanction ;
  - joueurs ;
  - vanish ;
  - quitter.
- **Vanish** : `/vanish`. Le joueur est caché des joueurs, de l'auto-complétion et des menus. Les messages de connexion et de déconnexion sont masqués, et le vanish est conservé à la reconnexion.
- **Freeze** : `/freeze`. Le joueur gelé ne peut plus bouger, construire, combattre, utiliser de commandes ou de véhicules.
  - Il voit un menu qu'il ne peut pas fermer, avec un bouton « appeler le staff ».
  - S'il se déconnecte, une sanction automatique est appliquée.
- **Chat staff** : `/sc` (bascule ou message) et le préfixe `#`. **Espion de commandes** : `/commandspy`.
- **Historique du chat et des commandes** : les 50 dernières lignes par joueur. Elles sont jointes automatiquement aux signalements comme preuves, lisibles sous forme de livre.
- **Anti-spam** :
  - délai minimum, flood, messages répétés (similarité), majuscules et caractères répétés ;
  - publicité (IP et domaines, avec liste blanche) ;
  - sanction automatique ;
  - `/sm chat lock|unlock|clear|slow <s>`.
- **Alertes multi-comptes** : même IP qu'un compte banni ou qu'un joueur connecté, avec un blocage optionnel des comptes de bannis.
- **Alertes x-ray** : ratio anormal de filons de diamant ou de débris antiques. Les alertes sont cliquables (TP), avec un historique dans `/sm alerts`.
- **Signalements** :
  - commentaire libre ;
  - prise en charge (« pris en charge par X », avec une expiration) ;
  - note staff, clôture avec une note ;
  - sanction directe, et clôture automatique après une sanction ;
  - menu d'actions avec `/sm report <id>`.
- **Historique des actions du staff** : `/sm staffhistory [staff]`.

#### Joueurs
- **Récompenses** (`rewards.yml`) :
  - paliers de temps de jeu (1 h, 10 h, 50 h, 100 h) ;
  - bonus quotidien avec une série (cycle de 7 jours) ;
  - coins et/ou commandes ;
  - `/rewards` et `/daily` ;
  - gestion en jeu.
- **Primes** : `/bounty <joueur> <montant>`, versées au tueur.
  - Une taxe, un délai entre deux primes et une expiration avec remboursement.
  - Elles sont ignorées entre comptes de même IP.
  - Elles s'activent avec `/bounty on|off`.
- **Statistiques** : `/stats [joueur]` et des classements mis en cache (temps de jeu, kills, richesse, série). Elles s'activent avec `/stats on|off`.
- **Annonces automatiques** (`announcements.yml`) : en rotation, avec des liens, commandes et textes au survol cliquables. Elles se gèrent avec `/sm announce`.
- **Historique des coins** : `/coins history [joueur]`, qui inclut les paiements, les récompenses, les primes, le staff et Vault.

#### Administration
- **`/sm settings`** : plus de 160 paramètres modifiables en jeu dans `config.yml`, `punishments.yml`, `rewards.yml` et `announcements.yml`.
  - Interrupteurs, nombres, textes, listes, choix et matériaux.
  - Valeur par défaut avec un clic droit.
  - Enregistrement et rechargement immédiats.
- **Permissions détaillées** pour chaque action, avec les groupes `supmod.staff`, `supmod.admin` et `supmod.*`.
- **Placeholders** : `bounty`, `streak`, `best_streak`, `muted`, `vanished`, `frozen`, `staffmode`, `chat_locked`, `online_visible`, `rank_<classement>` et `top_<classement>_<n>_<name|value>`.
- **Discord** : de nouveaux événements `punishment`, `staff-chat`, `alert` et `bounty`.

### Modifié
- **Menus** :
  - bordure avec des coins colorés (`gui.accent-material`) ;
  - son au clic (`gui.click-sound`) ;
  - confirmations ;
  - éditeur de listes.
- **Fiche joueur** :
  - statut ban et mute ;
  - boutons sanction, historique, chat, transactions, alertes, freeze et stats.
- **Liste des joueurs** :
  - tags vanish, freeze, mute et mode staff ;
  - clic droit pour la TP, shift-clic pour sanctionner.
- **Liste des signalements** : le clic ouvre le menu d'actions, et le shift-clic la fiche du joueur.
- **Tâches de rétention** pour les nouvelles tables : chat, actions du staff, alertes et transactions.

### Corrigé
- Bannir ou expulser un joueur gelé ne déclenche plus la sanction « déconnexion pendant un freeze ».
- La récompense quotidienne ne peut plus être versée deux fois : reconnexion rapide, plusieurs serveurs MySQL.
- Les joueurs vanish et gelés ne restent plus bloqués quand le module est désactivé, ni après une reconnexion.
- Les joueurs vanish n'apparaissent plus dans l'auto-complétion, `/report` ni le menu des primes.

---

## 2.0.0 — Refonte complète {#v2-0-0}

### Compatibilité
- Spigot et Paper, de **1.21** à **26.x** (Java 21 minimum ; Java 25 pour les serveurs 26.x).
- Le plugin est construit avec Maven (`mvn package`). Le fichier `.iml` et le dossier `out/` ne servent plus.
- Le jar n'utilise que l'API Spigot (rien de propre à Paper), et a été vérifié contre l'API 26.x actuelle.

### Migration depuis 1.x (automatique)
- **`config.yml`** est converti au nouveau format, et l'ancien est sauvegardé dans `config-1.x-backup.yml`.
  - Les mots interdits passent en mode `LOG`, comme en 1.x.
  - `emojy.yml` devient `emojis.yml`.
- **Données** : joueurs, temps de jeu, kills et morts, signalements, insultes, logs de kills et de drops, coins (`coins.yml`).
  - Elles sont importées une seule fois, au premier démarrage.
  - Les anciennes tables ne sont pas supprimées.
- **Permissions** : les anciens noms sont conservés, mais certaines ont changé de rôle.
  - `/report` utilise maintenant **`supmod.report`**, donnée à tout le monde par défaut. Avant, il fallait `supmod.player`, qui ouvrait aussi le menu staff.
  - `supmod.player` reste la permission du menu des joueurs, réservée au staff.
  - Le menu des signalements demande `supmod.admin.report.manage`, et non plus `supmod.admin`.
  - Nouveau groupe **`supmod.staff`** (modérateurs). `supmod.admin` regroupe tout.

### Bugs corrigés
#### Plantages
- **Joueurs hors ligne** : les menus plantaient (ClassCastException, NullPointerException).
- **`/report` sur un joueur hors ligne** : le report était enregistré, puis le plugin plantait avant de prévenir le staff.
- **Menu des gamerules** : il plantait dès qu'il y avait plus de 36 règles (toutes les versions récentes). Toutes les règles sont maintenant gérées, avec pages et choix du monde.
- **Placeholders** : `%supmod_...%` plantaient pour les joueurs hors ligne.

#### Sécurité et permissions
- **Menus** : on pouvait y déposer des objets (perdus à la fermeture). Tous les clics et glissements sont désormais bloqués.
- **`/report`** : la permission donnait accès aux inventaires des joueurs et à la téléportation vers eux.
- **Discord** : un joueur pouvait déclencher une mention `@everyone` via le relais du chat.
- **Anti-spam de connexion** : il ne bloquait pas les bots, mais bannissait à vie l'IP d'un vrai joueur. Le blocage est maintenant temporaire, par IP, avec une liste blanche.
- **`report.notify-target`** : le joueur signalé apprenait qui l'avait signalé. Ce n'est plus le cas.

#### Erreurs de comportement
- Les tâches « quotidiennes » s'exécutaient toutes les heures.
- Le webhook de kill inversait le tueur et la victime.
- Le log de ramassage enregistrait celui qui avait jeté l'objet au lieu de celui qui l'avait ramassé.
- Le son de mention était joué à l'expéditeur au lieu du joueur mentionné.
- `/broadcast` vérifiait une permission inexistante.
- Les messages de `/sm spec_teleport` étaient inversés.
- `/coins remove` affichait un mauvais solde.
- `/coins give` pouvait dépasser la limite des entiers.
- La page des menus était partagée entre tous les modérateurs.
- Les objets surveillés par le journal des drops ne s'empilaient plus.
- Les messages des joueurs déjà mutés partaient quand même sur Discord.

### Performances
- Toutes les requêtes SQL passent par un thread dédié : le serveur n'attend jamais la base de données.
- Les statistiques et les coins des joueurs connectés sont gardés en mémoire. Les placeholders et le tableau des scores ne coûtent donc rien.
- Les appels HTTP (Discord, vérification de mise à jour) sont asynchrones et ont des délais d'attente. worldtimeapi.org n'est plus utilisé.
- Des index ont été ajoutés en base, et les vieux logs sont purgés automatiquement (`storage.log-retention-days`).

### Nouveautés
- **MySQL/MariaDB** en option, pour partager les données entre plusieurs serveurs.
- **Vault** : les coins deviennent l'économie du serveur, utilisable par les shops et les autres plugins. S'ajoutent `/coins top`, `/coins pay` vers un joueur hors ligne, et les décimales en option.
- **Signalements** : délai entre deux signalements, pas de doublon, notification cliquable pour le staff, rappel des signalements ouverts à la connexion, statut traité ou rejeté, et message au joueur quand son signalement est traité.
- **Fiche joueur complète, même hors ligne** :
  - IP et comptes partageant la même IP ;
  - coffre de l'Ender ;
  - inventaire du tueur et de la victime au moment du kill ;
  - drops du joueur.
- **Outils de modération** : `/sm tp` en mode spectateur, puis `/sm return` pour revenir à sa position et à son mode de jeu.
- **Filtre du chat** :
  - trois modes : LOG, CENSOR (`****`) ou BLOCK ;
  - mots entiers ;
  - détection des variantes (`b4dw0rd`, accents) ;
  - alertes au staff et sur Discord.
- **Statistiques** : `/playtime` et `/playtime top`.
- **Langues** : les nouveaux messages sont ajoutés automatiquement aux fichiers de langue, et les couleurs hexadécimales `&#RRGGBB` sont acceptées. Les textes écrits par les joueurs ne peuvent plus injecter de couleurs.
- **Tâches planifiées** : elles suivent l'heure réelle et le fuseau configuré, et peuvent être limitées à certains jours.
- **Console** : la plupart des commandes `/sm` y fonctionnent.
