# Configuration

## En jeu : /sm settings {#in-game-sm-settings}

`/sm settings` (permission `supmod.admin.settings`) ouvre le menu de configuration. Chaque catégorie regroupe les options d'un module :

| Catégorie | Ce que vous y changez |
|---|---|
| Modules | activer ou désactiver chaque module |
| Général | langue, fuseau horaire, format de date, couleurs et son des menus, conservation des données |
| Signalements, Sanctions | options des signalements, paramètres des sanctions et raisons par défaut |
| Chat, Anti-spam | mentions, emojis, filtre de mots, historique du chat, règles anti-spam |
| Staff, Alertes | mode staff, vanish, freeze, chat staff, espion de commandes, alertes de doubles comptes et de x-ray |
| Économie, Statistiques | coins, primes, /stats |
| Serveur, Mondes | alertes de santé, outils anti-lag, redémarrages, paramètres des mondes |
| MOTD et tab, Sidebar, Connexion | les interrupteurs et options principales de `display.yml` (les lignes du MOTD, les cadres du tab, les formats de nom, les messages des barres de boss et les formats des messages de connexion se modifient dans le fichier) |
| Zones, Hologrammes, Annonces, Récompenses, Modèles | ouvrent leur propre éditeur |
| Discord, Sécurité | webhook, événements, limitation des connexions |
| Joueurs | mode de jeu, modification de l'inventaire, alertes de surveillance, AFK |
| Tickets et appels | options des tickets et des appels |
| Statistiques | copie des statistiques Minecraft, statistiques quotidiennes |
| Réseau | synchronisation entre les serveurs |

Cliquez sur une option pour la changer : les interrupteurs basculent immédiatement, les nombres et les textes se tapent dans le chat, les listes ouvrent un éditeur de liste. La modification est enregistrée dans le fichier et appliquée tout de suite.

::: info Les commandes console demandent une permission spéciale
Les options qui exécutent des commandes console (commandes de récompense, kit de première connexion, commandes de zone, commandes avant un redémarrage) demandent `supmod.admin.commands`, qui ne fait **pas** partie de `supmod.admin`. Une commande console donne le contrôle total du serveur : ne la donnez qu'à des personnes en qui vous avez une confiance totale.
:::

## Dans les fichiers {#in-the-files}

Tous les fichiers se trouvent dans `plugins/SupMod/`. Après avoir modifié un fichier, tapez `/sm reload` (ou cliquez sur **Recharger** dans `/sm settings`).

- [`config.yml`](/fr/reference/config-files#config-yml) : tous les modules.
- [`punishments.yml`](/fr/reference/config-files#punishments-yml) : modèles de sanction et paramètres des sanctions.
- [`display.yml`](/fr/reference/config-files#display-yml) : MOTD, tab, sidebar, boss bars, messages de connexion.
- [`rewards.yml`](/fr/reference/config-files#rewards-yml), [`announcements.yml`](/fr/reference/config-files#announcements-yml), [`zones.yml`](/fr/reference/config-files#zones-yml), [`holograms.yml`](/fr/reference/config-files#holograms-yml), [`emojis.yml`](/fr/reference/config-files#emojis-yml).

La page [Fichiers de configuration](/fr/reference/config-files) montre chaque fichier par défaut avec ses commentaires.

::: tip Vos valeurs ne sont jamais écrasées
Quand SupMod est mis à jour, les nouvelles options sont ajoutées à vos fichiers avec leur valeur par défaut ; les options que vous avez modifiées sont conservées. Les listes que vous gérez vous-même (raisons de signalement, mots filtrés, zones...) ne sont jamais remplies à nouveau avec les entrées par défaut.
:::

## Couleurs, durées et placeholders {#colours-durations-and-placeholders}

| | |
|---|---|
| Couleurs | `&a`, `&l`... et couleurs hexadécimales `&#RRGGBB` |
| Durées | `30s`, `10m`, `2h`, `7d`, `2w`, `1mo`, `1y`, combinables (`1d12h`), `perm` pour définitif |
| Fuseau horaire | `timezone` dans config.yml (`Europe/Paris`...) : les dates, les tâches planifiées, les redémarrages et les récompenses quotidiennes l'utilisent |
| Placeholders | voir [Placeholders](/fr/reference/placeholders) |

## Conservation des données {#data-retention}

Les logs sont nettoyés une fois par jour. Dans `config.yml` › `storage` :

| Option | Par défaut | Ce qui est supprimé après X jours |
|---|---|---|
| `log-retention-days` | 90 | filtre du chat, kills, objets jetés, connexions et sessions (donc aussi l'historique des pseudos et des IP) |
| `chat-history-retention-days` | 30 | historique du chat et des commandes |
| `staff-log-retention-days` | 180 | actions du staff, journal des modifications d'inventaire, alertes |
| `transactions-retention-days` | 180 | `/coins history` |

`0` conserve tout. Les signalements, les sanctions, les tickets, les appels et les statistiques des joueurs ne sont jamais supprimés.
