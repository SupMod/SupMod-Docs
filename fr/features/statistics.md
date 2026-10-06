# Statistiques

## /stats et classements {#leaderboards}

`/stats [player]` affiche les statistiques d'un joueur : temps de jeu, kills, morts, K/D, coins, série quotidienne et son rang dans chaque classement. `/stats top [board]` affiche un classement.

| Classement | |
|---|---|
| `playtime` | temps de jeu (sans le temps AFK) |
| `kills` | joueurs tués |
| `coins` | joueurs les plus riches |
| `streak` | série de connexions quotidiennes |

Les classements sont calculés en arrière-plan toutes les `refresh-minutes` (5) minutes et affichés depuis la mémoire. Ils sont aussi disponibles en [placeholders](/fr/reference/placeholders) (`%supmod_top_kills_1_name%`...) et en [hologrammes](/fr/features/holograms#leaderboards).

```yaml
stats:
  enabled: true
  allow-others: true        # /stats <player>
  refresh-minutes: 5
  size: 10
  leaderboards:
    playtime: true
    kills: true
    coins: true
    streak: true
```

`/stats on` / `off` / `refresh` avec `supmod.stats.admin`.

## Statistiques Minecraft {#minecraft-statistics}

SupMod copie les statistiques de Minecraft (celles de l'écran des statistiques du jeu) dans sa base de données, à chaque déconnexion et toutes les `interval-minutes` (10) minutes. La copie est répartie sur les ticks, un joueur par tick : elle ne fait donc jamais laguer le serveur.

Copiées : temps de jeu, distance (marche, sprint, nage, vol, monture...), blocs minés, blocs posés, items fabriqués, mobs tués, joueurs tués, morts, sauts, dégâts infligés et reçus, poissons pêchés, animaux reproduits, échanges avec les villageois, items enchantés, et le temps AFK.

Le staff les voit avec `/sm mcstats <player>` ou dans la [fiche joueur](/fr/features/player-management). Elles se trouvent dans la table `sm_player_stats` pour votre site web ou votre panel web.

```yaml
statistics:
  vanilla:
    enabled: true
    interval-minutes: 10
    detailed: true          # blocs minés / posés et fabrications : une somme sur chaque matériau
```

## Activité quotidienne {#daily-activity}

Une ligne par jour dans la table `sm_daily` : joueurs uniques, nouveaux joueurs, pic, temps de jeu actif (AFK exclu), sanctions, signalements et tickets. `/sm activity` (permission `supmod.activity`) affiche les 28 derniers jours avec de petits graphiques :

- pour chaque jour : joueurs uniques, nouveaux joueurs, pic, temps de jeu, sanctions, signalements, tickets ;
- la tendance des joueurs uniques, du pic et du temps de jeu sur la période.

### Rétention {#retention}

Le même menu montre à quel point les joueurs restent :

| | |
|---|---|
| Joueurs actifs | joueurs connectés ces 7 et 30 derniers jours, joueurs connus |
| Jours de connexion | nombre moyen de jours où un joueur s'est connecté ces 30 derniers jours |
| Retour des nouveaux joueurs | la part des nouveaux joueurs revenus au moins 7 jours (et 30 jours) après leur première connexion |
| Retours | joueurs revenus cette semaine après 7 jours ou plus (et 30 jours ou plus) d'absence |

Pour un joueur, sa fiche affiche son **ancienneté** et son nombre de **jours de connexion**.

```yaml
statistics:
  daily:
    enabled: true
    players-retention-days: 400   # durée de conservation des joueurs de chaque jour (rétention)
```

## Statistiques du staff {#staff-statistics}

`/sm staffstats` affiche votre propre activité ; avec `supmod.staffstats.others`, le classement du staff et `/sm staffstats <staff>` pour un membre. Période : 7 jours, 30 jours, 365 jours ou depuis le début.

| | |
|---|---|
| Sanctions | avertissements, mutes, kicks, bans donnés |
| Signalements | signalements traités et temps de réponse moyen |
| Tickets | tickets traités, temps moyen avant d'en prendre un, note moyenne donnée par les joueurs |
| Appels | appels tranchés |
| Temps | temps en mode staff et en vanish |

Les résultats sont mis en cache une minute ou deux : les menus peuvent être ouverts souvent sans charger la base de données.
