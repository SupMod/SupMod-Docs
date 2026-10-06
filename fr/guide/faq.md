# FAQ

## Installation {#installation}

### SupMod fonctionne-t-il sur Paper, Purpur, Folia ? {#does-supmod-work-on-paper-purpur-folia}

Spigot, Paper et leurs forks (Purpur...) sont pris en charge, de Minecraft 1.21 à 26.x, avec Java 21 ou plus récent. Folia n'est pas pris en charge : son planificateur est différent et le plugin ne se déclare pas compatible, donc Folia refuse de le charger.

### Ai-je besoin de MySQL ? {#do-i-need-mysql}

Non. SQLite est utilisé par défaut et fonctionne très bien pour un seul serveur. MySQL n'est nécessaire que pour partager les données entre plusieurs serveurs. Voir [Base de données](/fr/guide/storage).

### Est-ce que ça fonctionne avec les joueurs Bedrock (Geyser / Floodgate) ? {#does-it-work-with-bedrock-players-geyser-floodgate}

Oui. Les pseudos Bedrock peuvent contenir des espaces ou des points : SupMod n'insère jamais un tel pseudo dans une commande console (récompenses, zones...), ils ne peuvent donc pas servir à injecter des arguments supplémentaires.

## Commandes et permissions {#commands-and-permissions}

### Une commande de SupMod ouvre la commande d'un autre plugin {#a-command-of-supmod-opens-the-command-of-another-plugin}

Deux plugins utilisent le même nom (`/gm`, `/vanish`, `/ban`...). Écrivez-la avec le nom du plugin : `/supmod:gm 1`, `/supmod:ban Steve 1d`. Pour choisir le plugin utilisé par défaut, définissez la commande dans le fichier `commands.yml` du serveur ([alias Bukkit](https://bukkit.fandom.com/wiki/Commands.yml)) :

```yaml
aliases:
  ban:
    - "supmod:ban $1-"
```

### Les joueurs ne peuvent pas utiliser /report {#players-cannot-use-report}

Vérifiez qu'ils ont `supmod.report` (donnée à tout le monde par défaut, sauf si votre plugin de permissions la retire) et que `report.enabled` vaut `true`.

### Un modérateur ne peut pas sanctionner un opérateur {#a-moderator-cannot-punish-an-operator}

C'est voulu : les opérateurs ont `supmod.punish.exempt`. La console peut quand même les sanctionner.

### Comment donner seulement certains outils à mes helpers ? {#how-do-i-give-only-some-tools-to-my-helpers}

Voir l'exemple LuckPerms de [Permissions et grades](/fr/guide/permissions#luckperms-example).

## Modération {#moderation}

### Comment débannir un joueur hors ligne ? {#how-do-i-unban-a-player-who-is-offline}

`/unban <player> [reason]`, ou ouvrez `/history <player>` et cliquez sur le ban pour le révoquer. Toutes les commandes de sanction sauf `/kick` fonctionnent avec les joueurs hors ligne qui se sont connectés au moins une fois.

### Un joueur banni dit qu'il n'a jamais reçu de code pour faire appel {#a-banned-player-says-he-never-got-a-code-to-appeal}

Le code d'appel est affiché sur l'écran de ban avec `%code%`. Si votre fichier de langue a été créé avant la 2.3, ajoutez la ligne vous-même : voir [Langues et messages](/fr/guide/languages#the-ban-screen).

### Le mode staff a gardé mon inventaire après un crash {#the-staff-mode-took-my-inventory-after-a-crash}

Il est sauvegardé dans `plugins/SupMod/data/staffmode/` quand vous entrez en mode staff, et vous est rendu à votre prochaine connexion, même après un crash.

## Affichage {#display}

### Le tab ou les nametags entrent en conflit avec un autre plugin {#the-tab-or-the-nametags-fight-with-another-plugin}

Désactivez ce que l'autre plugin fait déjà : `tab.enabled: false` dans `display.yml`, ou seulement `tab.sort-by-priority: false` (le tri utilise les équipes du scoreboard, comme les plugins de nametags). Voir [MOTD, tab, sidebar](/fr/features/display).

### La sidebar ne s'affiche pas {#the-sidebar-does-not-show}

Elle est désactivée par défaut : mettez `scoreboard.enabled: true` dans `display.yml`. Elle reste aussi cachée tant qu'un autre plugin affiche son propre scoreboard (`respect-other-plugins`), et dans les mondes de `disabled-worlds`. Les joueurs peuvent la masquer avec `/sidebar`.

### Les hologrammes ont disparu après un redémarrage {#the-holograms-disappeared-after-a-restart}

SupMod les recrée quand leur chunk se charge : ils ne sont jamais enregistrés dans le monde. S'il en manque un, vérifiez que son monde existe toujours et tapez `/sm holograms near` à côté de son emplacement.

## Économie {#economy}

### J'ai déjà un plugin d'économie {#i-already-have-an-economy-plugin}

Mettez `coins.vault: false` pour garder votre économie actuelle dans Vault, ou `coins.enabled: false` pour désactiver complètement les coins. Voir [Coins et Vault](/fr/features/economy).

## Autres questions {#other}

### Où voir ce qu'a fait mon staff ? {#where-can-i-see-what-my-staff-did}

`/sm staffhistory [staff]` liste toutes les actions du staff (sanctions, vanish, freeze, mode de jeu, modification d'inventaire, tickets...). `/sm staffstats` montre l'activité de chaque membre du staff. Les actions peuvent aussi être envoyées sur [Discord](/fr/features/discord).

### Comment remettre un fichier par défaut ? {#how-do-i-reset-a-file-to-the-default}

Renommez-le ou supprimez-le, puis redémarrez : SupMod le recrée avec le contenu par défaut.

### J'ai trouvé un bug ou j'ai une idée {#i-found-a-bug-or-i-have-an-idea}

Dites-le-nous sur le [serveur Discord](https://discord.gg/f7eKwemeMX) en indiquant votre version (`/sm version`) et, pour un bug, l'erreur de la console.
