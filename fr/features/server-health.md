# Santé et lag

## Santé du serveur {#server-health}

`/sm health` (alias `/sm tps`, `/sm perf`, permission `supmod.health`) ouvre un tableau de bord actualisé toutes les 2 secondes :

| | |
|---|---|
| TPS | 1, 5 et 15 minutes, mesuré par SupMod (fonctionne aussi sur Spigot ; 20 = parfait) |
| MSPT | temps moyen d'un tick (Paper et ses forks) |
| Mémoire | utilisée / maximum |
| Joueurs, entités, chunks, mondes | avec le pic du jour |
| Graphiques | TPS, joueurs et mémoire sur les dernières 24 h (une barre par heure) |
| 7 derniers jours | pic de joueurs et TPS moyen par jour |

Depuis la console, `/sm health` affiche une ligne avec les mêmes valeurs.

### Alertes {#alerts}

Le staff qui a `supmod.health.alerts` est alerté (ainsi que [Discord](/fr/features/discord) si l'événement `alert` est activé) quand :

- le TPS reste sous `alert-tps` (15) pendant 2 minutes ;
- la mémoire utilisée atteint `alert-memory-percent` (90 %).

`alert-cooldown-minutes` (10) évite les alertes à répétition. Un relevé est enregistré toutes les 5 minutes et conservé `history-days` (30) jours.

## Outils anti-lag {#lag-tools}

`/sm lag` (permission `supmod.lag`) affiche les **chunks les plus chargés** : nombre d'entités, de mobs vivants, d'items, et le type d'entité le plus fréquent. Cliquez sur un chunk pour vous y téléporter et voir ce qui s'y passe (une ferme à mobs, des items qui s'accumulent...).

### Nettoyage des items au sol {#ground-items-cleanup}

Désactivé par défaut. Quand il est activé, toutes les `interval-minutes` (15) minutes, les items au sol sont supprimés après un compte à rebours dans le chat :

```yaml
lag:
  ground-items:
    enabled: false
    interval-minutes: 15
    warnings: [60, 30, 10, 5, 3, 2, 1]
    remove-xp-orbs: true
    remove-arrows: true        # uniquement les flèches plantées dans les blocs, que les joueurs ne peuvent pas ramasser
    keep-named-items: true     # les items renommés avec une enclume sont conservés
    min-age-seconds: 10        # les items lâchés il y a moins de 10 s sont conservés
    disabled-worlds: []
```

::: warning Attention
Le nettoyage supprime aussi les items lâchés à la mort si le joueur ne revient pas à temps. Gardez un intervalle long, ou désactivez-le dans vos mondes survie avec `disabled-worlds`.
:::

Nettoyage manuel (permission `supmod.lag.clear`) : `/sm lag clear` (maintenant) ou `/sm lag clear 30` (dans 30 secondes), `/sm lag cancel` pour annuler.

### Limite de mobs par chunk {#mob-limit-per-chunk}

Désactivée par défaut. Avec `entity-limit.enabled: true`, les nouveaux mobs sont refusés dans un chunk qui a déjà `per-chunk` (60) entités vivantes, pour les raisons d'apparition de `reasons` (naturelle, spawners, reproduction, œufs). Les joueurs et les mobs existants ne sont jamais supprimés.

## Permissions {#permissions}

| Permission | |
|---|---|
| `supmod.health` | `/sm health` (staff) |
| `supmod.health.alerts` | recevoir les alertes de TPS et de mémoire |
| `supmod.lag` | `/sm lag` |
| `supmod.lag.clear` | nettoyer les items au sol |
