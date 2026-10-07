# Premiers pas

SupMod fonctionne dès son installation. Cette liste de vérification l'adapte à votre serveur en un quart d'heure environ. Chaque étape renvoie vers la page qui l'explique en détail.

## 1. Choisir la langue {#_1-choose-the-language}

Ouvrez `/sm settings` › **Général** › **Langue** et choisissez `fr_FR` ou `en_US`. Les messages, les menus et les alertes du staff changent immédiatement.

Vous pouvez aussi mettre `language: fr_FR` dans `config.yml` et taper `/sm reload`.

## 2. Donner les permissions à votre staff {#_2-give-the-permissions-to-your-staff}

Les opérateurs ont toutes les permissions. Pour vos grades, deux groupes de permissions font l'essentiel du travail :

| Groupe | Pour | Contient |
|---|---|---|
| `supmod.staff` | modérateurs | fiches joueur, signalements, avertissement / mute / kick, mode staff, vanish, freeze, chat staff, tickets... |
| `supmod.admin` | administrateurs | tout `supmod.staff`, plus les bans, les paramètres, les modèles de sanction, les outils du serveur... |

Avec LuckPerms :

```text
/lp group moderator permission set supmod.staff true
/lp group admin permission set supmod.admin true
```

Détails et réglages plus fins : [Permissions et grades](/fr/guide/permissions).

## 3. Vérifier les modèles de sanction {#_3-check-the-punishment-templates}

Les modèles sont des échelles de sanctions : *insulte : 1re fois = avertissement, 2e fois = mute de 1 h, 3e fois = mute de 1 jour...* Six modèles sont prêts (insulte, spam, publicité, grief, triche, déconnexion pendant un freeze). Ouvrez `/sm templates` pour adapter les durées à votre règlement. Voir [Sanctions](/fr/features/punishments).

## 4. Adapter les raisons de signalement {#_4-adapt-the-report-reasons}

Le menu de `/report` affiche les raisons de `config.yml` › `report.reasons` (triche, duplication, comportement, grief). Chaque raison peut proposer un modèle de sanction au staff. Voir [Signalements](/fr/features/reports).

## 5. Régler ce que voient les joueurs {#_5-set-up-what-players-see}

- **MOTD et tab** : modifiez `display.yml` (nom du serveur, couleurs, liens). La sidebar est désactivée par défaut. Voir [MOTD, tab, sidebar](/fr/features/display).
- **Règles à la connexion** : modifiez `auto_rules.txt`.
- **Annonces** : modifiez `announcements.yml` ou utilisez `/sm announce`. Voir [Annonces et règles](/fr/features/announcements).

## 6. Optionnel : logs Discord {#_6-optional-discord-logs}

Créez un webhook dans un salon privé de votre Discord (paramètres du salon › Intégrations › Webhooks), collez son URL dans `/sm settings` › **Discord** › **URL du webhook** (ou `discord.webhook-url` dans `config.yml`), puis tapez `/sm webhook on`. Les signalements, les sanctions, les appels et les alertes sont envoyés par défaut. Voir [Discord](/fr/features/discord).

## 7. Optionnel : protection contre les bots et les raids {#_7-optional-protection-against-bots-and-raids}

Le verrouillage automatique est activé : si beaucoup de nouveaux comptes arrivent d'un coup, ils sont refusés pendant 10 minutes. Si votre serveur est visé par des bots, activez aussi la vérification à la connexion (`/sm settings` › **Sécurité**). Voir [Vérification et anti-raid](/fr/features/verification).

## 8. Optionnel : MySQL et plusieurs serveurs {#_8-optional-mysql-and-several-servers}

SQLite est parfait pour un seul serveur. Pour partager les bans, les mutes et le chat staff entre plusieurs serveurs, utilisez MySQL. Voir [Base de données](/fr/guide/storage) et [Plusieurs serveurs](/fr/guide/network).

## Essayez {#try-it}

- `/sm` ouvre le [hub du staff](/fr/features/staff-hub) : compteurs en direct (joueurs, signalements, tickets, TPS...) et un raccourci vers chaque menu du staff.
- `/staffmode` place les outils du staff dans votre barre d'action. Faites un clic droit sur un joueur avec le livre pour ouvrir sa fiche.
- `/report <player>` depuis un autre compte, puis `/sm reports` pour traiter le signalement.
- `/sm health` pour voir comment se porte votre serveur.

::: tip Commandes les plus utilisées par le staff
`/sm` · `/sm profile <player>` · `/punish <player>` · `/history <player>` · `/sm reports` · `/staffmode` · `/vanish` · `/freeze <player>` · `/sc <message>` · `/ticket list`
:::
