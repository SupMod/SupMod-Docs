# Alertes

Les alertes sont envoyées aux membres du staff qui ont la permission, avec un clic pour agir. Elles sont conservées dans `/sm alerts` (permission `supmod.alerts.view` ; filtres : `/sm alerts xray`, `alt`, `items`), peuvent être envoyées sur [Discord](/fr/features/discord) (événement `alert`) et sont partagées entre [plusieurs serveurs](/fr/guide/network).

## Multi-comptes {#alt-accounts}

| Situation | Alerte | Option (`alerts.alts.`) |
|---|---|---|
| Un joueur se connecte avec l'IP d'un compte banni | <span class="mc">[Multi-compte] Steve utilise l'IP de compte(s) banni(s) : Griefer</span> | `notify-banned-alts` |
| Deux joueurs en ligne partagent la même IP | <span class="mc">[Multi-compte] Steve a la même IP que Alex</span> | `notify-shared-ip` |

Avec `block-banned-alts: true`, les comptes qui partagent l'IP d'un compte banni sont **refusés** à la connexion (contournement de ban). Les IP de `ignored-ips` ne sont jamais vérifiées : ajoutez-y l'IP de votre proxy s'il ne transmet pas les vraies IP, ou celle d'une école.

Permission : `supmod.alerts.alts`. Pour enquêter, utilisez `/sm ip <ip|player>` et la [chronologie](/fr/features/player-management#timeline).

## X-ray {#x-ray}

SupMod compte, pour chaque joueur, les **filons** de minerai qu'il mine par rapport à la pierre autour, sur `window-minutes` (20). Un joueur normal trouve peu de filons pour 100 blocs de pierre ; un joueur qui utilise un x-ray va droit dessus.

```yaml
alerts:
  xray:
    enabled: true
    window-minutes: 20
    cooldown-minutes: 10
    vein-distance: 4
    disabled-worlds: []
    ores:
      diamond:
        blocks: [DIAMOND_ORE, DEEPSLATE_DIAMOND_ORE]
        base: [STONE, DEEPSLATE, TUFF, GRANITE, DIORITE, ANDESITE, CALCITE]
        min-veins: 4
        max-per-100: 2.5
      ancient-debris:
        blocks: [ANCIENT_DEBRIS]
        base: [NETHERRACK, BASALT, BLACKSTONE]
        min-veins: 3
        max-per-100: 1.5
```

<p><span class="mc">[X-ray] Steve : 6 filons de diamond pour 140 blocs en 20 min (4.3/100)</span></p>

Une alerte est envoyée quand un joueur a trouvé au moins `min-veins` filons **et** plus de `max-per-100` filons pour 100 blocs de base. Les minerais plus proches que `vein-distance` font partie du même filon. D'autres minerais peuvent être ajoutés de la même façon.

Permission : `supmod.alerts.xray`. `supmod.bypass.xray` (donnée à personne par défaut) désactive les alertes pour un joueur, par exemple les builders.

::: tip Une alerte est un indice, pas une preuve
Téléportez-vous vers le joueur (clic sur l'alerte), observez-le en [vanish](/fr/features/staff-tools#vanish) et regardez ses blocs minés avec `/sm mcstats <player>` avant de sanctionner.
:::

## Objets suspects {#suspicious-items}

L'analyse automatique de la [recherche d'objets](/fr/features/item-search#automatic-scan) (désactivée par défaut, `item-search.auto-scan.enabled`) signale les joueurs qui possèdent plus que les quantités suspectes de `item-search.thresholds` (32 lingots de netherite, 2 élytres, 8 totems...) : une duplication possible.

<p><span class="mc">[Objets] Steve possède Netherite Ingot x96 (&gt; 32) (clic : fiche)</span></p>

Les alertes vont à `supmod.alerts.items`, dans le filtre **Objets suspects** de `/sm alerts` (`/sm alerts items`), sur Discord (événement `alert`) et sur les autres serveurs du réseau. Le même joueur n'est pas signalé de nouveau pour le même objet pendant `alert-cooldown-minutes` (60) minutes. `supmod.bypass.itemsearch` (donnée à personne par défaut) n'est jamais signalé, par exemple un builder en créatif.

## Autres alertes {#other-alerts}

- **Santé du serveur** : TPS bas ou mémoire presque pleine, pour `supmod.health.alerts`. Voir [Santé et lag](/fr/features/server-health).
- **Joueurs surveillés** : un joueur avec un tag se connecte, pour `supmod.watch.notify`. Voir [Notes et tags](/fr/features/player-management#notes-and-tags).
- **Freeze** : un joueur gelé se déconnecte. Voir [Freeze](/fr/features/staff-tools#freeze).
- **Verrouillage** : un verrouillage commence ou se termine, verrouillages automatiques compris, pour `supmod.lockdown.notify`. Voir [Vérification et anti-raid](/fr/features/verification#automatic-lockdown).
