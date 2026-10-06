# Base de données

SupMod enregistre les joueurs, les signalements, les sanctions, les logs et les statistiques dans une base de données. Tout le travail sur la base de données se fait en arrière-plan : le serveur ne l'attend jamais.

## SQLite (par défaut) {#sqlite-default}

Rien à faire : la base de données est le fichier `plugins/SupMod/data/database.db`. Elle est parfaite pour un seul serveur, même un gros.

Pour faire une sauvegarde, copiez le fichier pendant que le serveur est arrêté.

## MySQL / MariaDB {#mysql-mariadb}

Utilisez MySQL quand plusieurs serveurs doivent partager les mêmes données (bans, mutes, signalements...), ou si votre hébergeur vous fournit une base de données.

1. Créez une base de données (par exemple `supmod`) et un utilisateur qui a tous les droits dessus.
2. Dans `config.yml` :

```yaml
storage:
  type: mysql
  mysql:
    host: localhost
    port: 3306
    database: supmod
    username: supmod
    password: "your password"
    parameters: "useSSL=false&characterEncoding=utf8&serverTimezone=UTC"
```

3. **Redémarrez** le serveur (le type de base de données n'est pas changé par `/sm reload`).

Les tables sont créées automatiquement. SupMod utilise le pilote MySQL inclus dans Spigot et Paper (il fonctionne aussi avec les serveurs MariaDB) : rien à installer.

::: warning Passer de SQLite à MySQL
SupMod ne copie pas une base SQLite existante vers MySQL. Faites le changement tôt, ou gardez SQLite sur un serveur qui a déjà beaucoup d'historique.
:::

## Ce qui est conservé, et combien de temps {#what-is-kept-and-for-how-long}

Les signalements, les sanctions, les tickets, les appels, les joueurs et les statistiques sont conservés pour toujours. Les logs sont nettoyés chaque jour selon `storage.*-retention-days` : voir [Conservation des données](/fr/guide/configuration#data-retention).

La liste des tables se trouve sur la page [Base de données et panel web](/fr/reference/database).

## Si la base de données est injoignable {#if-the-database-is-unreachable}

Au démarrage, SupMod se désactive avec un message clair dans la console quand il ne peut pas se connecter (mauvais mot de passe, MySQL arrêté...). Corrigez la section `storage` et redémarrez.

Pendant que le serveur tourne, si la vérification d'un ban ne répond pas dans les 4 secondes, le joueur peut se connecter ; la vérification est refaite un peu plus tard et le joueur est kické s'il est banni : une base de données lente ne bloque jamais les connexions.
