# Chat et anti-spam

## Anti-spam {#anti-spam}

L'anti-spam vérifie le chat et les commandes de messages privés (`anti-spam.commands` : `/msg`, `/tell`, `/r`...).

| Règle | Par défaut | Ce qu'elle fait |
|---|---|---|
| Délai minimum | 800 ms | entre deux messages d'un joueur |
| Message répété | 85 % de ressemblance en 30 s | bloque le même message (ou presque le même) |
| Flood | 5 messages en 6 s | bloque les rafales de messages |
| Majuscules | plus de 70 % d'un message de 6 lettres ou plus | `LOWERCASE` (envoyé en minuscules) ou `BLOCK` |
| Caractères répétés | plus de 4 | « aaaaaaa » devient « aaaa » |
| Publicité | IP et adresses de sites web | `BLOCK` ou `CENSOR` ; vos propres adresses vont dans `whitelist` |

Après `violations` (5) messages bloqués en `within-seconds` (60), le modèle `spam` est appliqué automatiquement ([Sanctions](/fr/features/punishments)).

```yaml
anti-spam:
  advertising:
    enabled: true
    block-ips: true
    block-domains: true
    action: BLOCK
    whitelist:
      - "your-server.com"
      - "discord.gg/yourserver"
```

Permissions de contournement (staff par défaut) : `supmod.bypass.spam`, `supmod.bypass.advertising`.

## Filtre de mots {#word-filter}

Le filtre est désactivé par défaut. Ajoutez vos mots dans `chat.filter.words` et choisissez le mode :

| Mode | |
|---|---|
| `LOG` | le message est envoyé ; le staff qui a `supmod.admin.chat.alerts` est alerté et le message est enregistré dans la fiche joueur |
| `CENSOR` | les mots sont remplacés par `***` (et enregistrés) |
| `BLOCK` | le message n'est pas envoyé (et il est enregistré) |

`whole-words: true` ne repère que les mots entiers (*con* ne correspond pas à *construire*). `supmod.bypass.chatfilter` ignore le filtre. Les messages filtrés peuvent être envoyés sur [Discord](/fr/features/discord) (événement `chat-filter`).

## Contrôle du chat {#chat-control}

| Commande | Permission | |
|---|---|---|
| `/sm chat lock` / `unlock` | `supmod.chat.lock` | seuls ceux qui ont `supmod.bypass.chatlock` peuvent parler ; `lock` sur un chat verrouillé le déverrouille |
| `/sm chat clear` | `supmod.chat.clear` | envoie `clear-lines` (150) lignes vides, sauf à `supmod.bypass.chatclear` |
| `/sm chat slow <seconds>` / `off` | `supmod.chat.slow` | un message toutes les X secondes, sauf `supmod.bypass.slowmode` |

## Nouveaux joueurs {#new-players}

`chat.new-player-delay-seconds` (0 = désactivé) arrête les bots de spam : un compte dont la première connexion date de moins de X secondes ne peut pas encore écrire, ni utiliser les commandes de messages privés de `anti-spam.commands`. Le temps restant lui est indiqué. `supmod.chat.bypass-new-delay` (staff) n'est pas concerné. Voir [Vérification et anti-raid](/fr/features/verification#new-player-chat-delay).

## Ignorer un joueur {#ignore}

Les joueurs peuvent cacher les messages d'un autre joueur avec `/ignore <player>` : ses messages du chat, ses @mentions et ses annonces de primes ne leur sont plus montrés. Les membres du staff ne peuvent pas être ignorés. Voir [Ignorer, liste du staff et sondages](/fr/features/community#ignore).

## Historique du chat {#chat-history}

Les 50 derniers messages et commandes de chaque joueur (`chat-history.keep-per-player`) sont conservés pour le staff : fiche joueur › Historique du chat, et comme preuves dans les [signalements](/fr/features/reports). Les commandes avec mot de passe (`/login`, `/register`...) ne sont jamais enregistrées (`chat-history.ignored-commands`).

Permissions : `supmod.chat.history`, `supmod.chat.history.commands`.

## Mentions et emojis {#mentions-and-emojis}

- **Mentions** : écrire `@Steve` met son pseudo en valeur et lui joue un son (`chat.mentions`), sauf si Steve [ignore](/fr/features/community#ignore) l'auteur du message.
- **Emojis** : désactivés par défaut. Avec `chat.emojis.enabled: true`, `:heart:` devient ❤. La liste est dans `emojis.yml` :

```yaml
heart: "❤"
star: "★"
sword: "⚔"
```

::: tip Astuce
Les symboles absents de la police de Minecraft s'affichent comme des carrés : testez un nouveau symbole avant de l'ajouter.
:::

## Annonce {#broadcast}

`/broadcast <message>` (alias `/br`, permission `supmod.broadcast`) envoie un message à tout le serveur avec le préfixe de `broadcast.prefix`. Les couleurs sont prises en charge.
