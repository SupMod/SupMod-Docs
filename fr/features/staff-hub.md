# Hub du staff

`/sm` sans argument ouvre le **hub du staff** : un tableau de bord avec des compteurs en direct et des raccourcis vers tous les menus du staff. C'est le point de départ de la journée d'un modérateur.

- Le hub s'ouvre pour les joueurs qui peuvent utiliser au moins un de ses boutons (le staff). Les autres joueurs et la console reçoivent l'aide, comme avant.
- `/sm help` affiche toujours l'aide.
- `gui.hub.enabled: false` (dans `/sm settings` › **Général**) rétablit l'ancien comportement : `/sm` affiche l'aide.

## Compteurs {#counters}

La première ligne est actualisée toutes les 2 secondes :

| Compteur | Détails | Clic |
|---|---|---|
| Joueurs | connectés / maximum, pic du jour, nouveaux joueurs, AFK | liste des joueurs |
| Staff connecté | en mode staff, invisibles | |
| Signalements ouverts | | signalements |
| Tickets en attente | | tickets |
| Appels en attente | | appels |
| Alertes (dernière heure) | | historique des alertes |
| TPS | durée d'un tick (MSPT), mémoire | santé du serveur |
| État du serveur | chat verrouillé, mode lent, maintenance, redémarrage prévu | |

Les compteurs des signalements, tickets, appels et alertes viennent de la base de données : ils sont lus en arrière-plan et mis à jour toutes les 30 secondes (une requête par compteur pour tout le staff, jamais sur le thread principal). Avec [plusieurs serveurs](/fr/guide/network) sur MySQL, ils comptent tout le réseau. Un compteur n'apparaît qu'aux membres du staff qui peuvent ouvrir son menu.

## Raccourcis {#shortcuts}

Les lignes suivantes regroupent les menus du staff. Chaque bouton lance la commande `/sm` correspondante : les permissions et les messages sont exactement ceux de la commande. Un bouton est caché quand vous n'avez pas sa permission ou quand son module est désactivé, et un groupe vide n'est pas affiché.

| Groupe | Boutons |
|---|---|
| Modération | [signalements](/fr/features/reports), [tickets](/fr/features/tickets), [appels](/fr/features/appeals), [alertes](/fr/features/alerts), [gestion du chat](/fr/features/chat#chat-control), [modèles de sanctions](/fr/features/punishments#templates), [historique du staff](/fr/features/staff-tools#staff-history) |
| Joueurs | [liste des joueurs](/fr/features/player-management#player-list), [recherche de joueurs](/fr/features/player-management#player-search), [surveillance](/fr/features/player-management#notes-and-tags), [activité](/fr/features/statistics#daily-activity), [statistiques du staff](/fr/features/statistics#staff-statistics), [journal des drops](/fr/features/drop-log), [scan des objets](/fr/features/item-search#scan) |
| Serveur | [santé](/fr/features/server-health), [outils anti-lag](/fr/features/server-health), [mondes](/fr/features/worlds), [maintenance](/fr/features/maintenance), [redémarrage](/fr/features/maintenance), [verrouillage](/fr/features/verification#lockdown), [vérification à la connexion](/fr/features/verification#join-verification) |
| Configuration | [paramètres](/fr/guide/configuration), [annonces](/fr/features/announcements), [sondages](/fr/features/community#polls), [zones](/fr/features/zones), [hologrammes](/fr/features/holograms) |

Le bouton **Aide** en bas affiche l'aide dans le chat.

## Actions rapides {#quick-actions}

Certains boutons agissent directement, avec une confirmation pour les actions importantes :

| Bouton | Clic | Clic droit | Maj + clic |
|---|---|---|---|
| Gestion du chat | verrouiller / déverrouiller le chat | mode lent : tapez les secondes, ou `off` | vider le chat (confirmation) |
| Maintenance | lancer ou arrêter la maintenance (confirmation) | | |
| Redémarrage | redémarrer dans 5 minutes, ou annuler le redémarrage prévu (confirmation) | tapez le délai (`10m`, `now`...) | |
| Verrouillage | lancer le verrouillage jusqu'à ce qu'il soit terminé, ou le terminer (confirmation) | état dans le chat | |
| Vérification à la connexion | tapez le pseudo d'un joueur à vérifier | | |
| Sondages | ouvrir le sondage en cours, ou en créer un (création guidée) | | |
| Scan des objets | analyser les quantités suspectes | | |
| Rechercher un joueur | tapez une partie d'un pseudo | | |

Chaque action demande la permission de sa commande (`supmod.chat.lock`, `.slow`, `.clear`, `supmod.maintenance`, `supmod.restart`, `supmod.lockdown`...), vérifiée de nouveau au clic.

## Permissions {#permissions}

Le hub n'a pas de permission propre : chaque bouton utilise la permission de sa commande. Un membre du staff voit le hub dès qu'il en a une ; avec les groupes, les modérateurs (`supmod.staff`) et les administrateurs (`supmod.admin`) l'ont. Le bouton **Aide** demande `supmod.help`.

Le compteur **Staff connecté** compte les joueurs qui ont `supmod.staff` et ceux qui sont en mode staff.
