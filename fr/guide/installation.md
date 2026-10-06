# Installation

## Installer {#install}

1. Téléchargez `SupMod-2.3.0.jar` sur [SpigotMC](https://www.spigotmc.org/resources/supmod.108806/).
2. Arrêtez le serveur et placez le fichier dans le dossier `plugins/`.
3. Démarrez le serveur. SupMod crée `plugins/SupMod/` avec ses fichiers et la base de données SQLite.
4. Tapez `/sm version` en jeu (en tant qu'opérateur) ou dans la console : SupMod répond avec sa version.

C'est tout : chaque module fonctionne avec les paramètres par défaut. Lisez les [premiers pas](/fr/guide/first-steps) pour l'adapter à votre serveur.

::: warning N'utilisez pas /reload
`/reload` (ou PlugMan) recharge les plugins Java d'une manière qui en casse beaucoup. Redémarrez plutôt le serveur. Pour appliquer une modification de la configuration de SupMod, utilisez `/sm reload` ou le bouton de rechargement de `/sm settings`.
:::

## Plugins optionnels {#optional-plugins}

SupMod fonctionne seul. Deux plugins ajoutent des fonctionnalités quand ils sont installés :

| Plugin | Ce qu'il ajoute |
|---|---|
| [Vault](https://www.spigotmc.org/resources/vault.34315/) | Les coins de SupMod deviennent l'économie du serveur : les boutiques, les métiers et les autres plugins les utilisent. Désactivez-le avec `coins.vault: false`. |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Les [placeholders de SupMod](/fr/reference/placeholders) (`%supmod_kills%`...) fonctionnent dans les autres plugins, et les placeholders des autres plugins fonctionnent dans le tab, la sidebar, le MOTD et les hologrammes de SupMod. |

## Fichiers créés {#files-created}

```text
plugins/SupMod/
├── config.yml          tous les modules (chacun a un interrupteur "enabled")
├── punishments.yml     modèles de sanction et paramètres des sanctions
├── display.yml         MOTD, tab, sidebar, boss bars, messages de connexion
├── rewards.yml         récompenses de temps de jeu et quotidiennes
├── announcements.yml   annonces automatiques
├── zones.yml           zones (gérées en jeu)
├── holograms.yml       hologrammes (gérés en jeu)
├── emojis.yml          emojis du chat
├── auto_rules.txt      message des règles envoyé à la connexion
├── lang/
│   ├── en_US.yml       messages en anglais
│   └── fr_FR.yml       messages en français
├── security/           listes noires d'IP et de pseudos (blacklisted_ips.txt, blacklisted_names.txt)
└── data/
    ├── database.db     base de données SQLite (quand storage.type = sqlite)
    └── ...             fichiers internes (maintenance, sauvegardes du mode staff...)
```

Vous n'avez pas besoin de modifier ces fichiers à la main : presque tout se change en jeu avec `/sm settings`. Voir [Configuration](/fr/guide/configuration).

## Mettre à jour depuis une ancienne version {#updating-from-an-older-version}

Remplacez le jar et redémarrez. Les nouvelles options, les nouveaux messages et les nouvelles tables de la base de données sont ajoutés automatiquement, et vos valeurs sont conservées. Lisez [Mise à jour](/fr/guide/updating) si vous venez de SupMod 1.x.
