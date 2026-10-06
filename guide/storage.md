# Database

SupMod stores players, reports, punishments, logs and statistics in a database. All the database work is done in the background: the server never waits for it.

## SQLite (default) {#sqlite-default}

Nothing to do: the database is the file `plugins/SupMod/data/database.db`. It is perfect for one server, even a big one.

Make a backup by copying the file while the server is stopped.

## MySQL / MariaDB {#mysql-mariadb}

Use MySQL when several servers must share the same data (bans, mutes, reports...), or if your host gives you a database.

1. Create a database (for example `supmod`) and a user with all the rights on it.
2. In `config.yml`:

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

3. **Restart** the server (the database type is not changed by `/sm reload`).

The tables are created automatically. SupMod uses the MySQL driver included in Spigot and Paper (it works with MariaDB servers too): nothing to install.

::: warning Moving from SQLite to MySQL
SupMod does not copy an existing SQLite database to MySQL. Switch early, or keep SQLite on a server that already has a lot of history.
:::

## What is kept, and for how long {#what-is-kept-and-for-how-long}

Reports, punishments, tickets, appeals, players and statistics are kept forever. Logs are cleaned every day according to `storage.*-retention-days`: see [Data retention](/guide/configuration#data-retention).

The list of the tables is on the [Database and web panel](/reference/database) page.

## If the database is unreachable {#if-the-database-is-unreachable}

At startup, SupMod disables itself with a clear message in the console when it cannot connect (wrong password, MySQL stopped...). Fix the `storage` section and restart.

While the server runs, a ban check that does not answer within 4 seconds lets the player join, then checks again a moment later and kicks him if he is banned: a slow database never blocks the logins.
