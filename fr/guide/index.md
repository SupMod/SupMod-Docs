# Qu'est-ce que SupMod ?

SupMod est un plugin de modération et de gestion de serveur pour **Spigot et Paper**. Il remplace les nombreux plugins dont un serveur a souvent besoin pour son staff (signalements, bans, vanish, mode staff, logs...) et ajoute des outils pour gérer le serveur lui-même (santé, maintenance, MOTD, tab, zones, hologrammes...).

Tout passe par des **menus** : un modérateur a rarement besoin de retenir une commande. La fiche joueur s'ouvre avec `/sm profile <player>` ou depuis les outils du mode staff, et chaque action est à un clic.

## Ce qu'il vous faut {#what-you-need}

| | |
|---|---|
| Serveur | Spigot ou Paper, Minecraft **1.21 à 26.x** |
| Java | **21** ou plus récent |
| Base de données | Rien à installer : SQLite est utilisé par défaut. MySQL / MariaDB est pris en charge pour partager les données entre plusieurs serveurs. |
| Plugins optionnels | [Vault](https://www.spigotmc.org/resources/vault.34315/) (les coins deviennent l'économie du serveur), [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) (les placeholders de SupMod dans d'autres plugins, ceux des autres plugins dans SupMod) |
| Langues | Anglais et français, chaque message est modifiable |

## Ce qu'il fait {#what-it-does}

### Pour le staff {#for-the-staff}

- [Signalements](/fr/features/reports) : `/report` avec un menu de raisons, un commentaire et les derniers messages du joueur comme preuve. Les modérateurs prennent en charge un signalement, pour que deux d'entre eux ne traitent jamais le même.
- [Sanctions](/fr/features/punishments) : avertissement, mute, kick, ban et ban IP, temporaires ou définitifs, silencieux avec `-s`. Les **modèles de sanction** appliquent automatiquement le bon palier : première insulte = avertissement, deuxième = mute de 1 h...
- [Appels](/fr/features/appeals) : l'écran de ban affiche un code ; le joueur fait appel et le staff accepte ou refuse dans un menu.
- [Outils du staff](/fr/features/staff-tools) : mode staff et ses outils, vanish, freeze, chat staff, espion de commandes, changement rapide de mode de jeu.
- [Fiches joueur](/fr/features/player-management) : tout sur un joueur, même hors ligne : temps de jeu, sanctions, signalements, historique du chat, notes et tags, chronologie, IP et doubles comptes, actions rapides et modification de l'inventaire.
- [Tickets](/fr/features/tickets) : les questions `/helpop` arrivent dans une file d'attente, reçoivent une réponse en jeu et sont notées par les joueurs.
- [Chat](/fr/features/chat) : anti-spam, anti-pub, filtre de mots, historique du chat, verrouillage, effacement et mode lent.
- [Alertes](/fr/features/alerts) : doubles comptes et contournement de ban, détection de x-ray.

### Pour le serveur {#for-the-server}

- [Santé et lag](/fr/features/server-health) : TPS, mémoire et graphiques, chunks les plus chargés, nettoyage des objets au sol.
- [Mondes](/fr/features/worlds), [maintenance et redémarrages](/fr/features/maintenance).
- [MOTD, tab, sidebar, boss bars et messages de connexion](/fr/features/display).
- [Zones](/fr/features/zones) avec messages et règles, [hologrammes](/fr/features/holograms) et classements.
- [Annonces](/fr/features/announcements), [logs Discord](/fr/features/discord), [sécurité](/fr/features/security).
- [Plusieurs serveurs](/fr/guide/network) sur une seule base MySQL : bans, mutes, chat staff et alertes sont partagés.

### Pour les joueurs {#for-the-players}

- [Récompenses](/fr/features/rewards) pour le temps de jeu et les connexions quotidiennes, [primes](/fr/features/bounties), [statistiques et classements](/fr/features/statistics), [coins](/fr/features/economy).

## Organisation de la documentation {#how-the-documentation-is-organised}

- **Bien démarrer** : installer le plugin, le configurer et donner les permissions.
- **Fonctionnalités** : une page par fonctionnalité, avec ses commandes, ses permissions et ses options.
- **Référence** : toutes les [commandes](/fr/reference/commands), [permissions](/fr/reference/permissions), [placeholders](/fr/reference/placeholders) et [fichiers de configuration](/fr/reference/config-files). Ces pages sont générées à partir du plugin lui-même.

::: tip Besoin d'aide ?
Posez votre question sur le [serveur Discord](https://discord.gg/WtKt5vG9Yn). Indiquez votre version de SupMod (`/sm version`), le logiciel de votre serveur et l'erreur de la console s'il y en a une.
:::
