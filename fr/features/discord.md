# Discord

SupMod envoie des logs dans des salons Discord avec des **webhooks** : aucun bot à installer. Chaque événement peut utiliser son propre salon et sa propre couleur.

## Mise en place {#set-it-up}

1. Dans Discord : paramètres du salon › **Intégrations** › **Webhooks** › Nouveau webhook › copier l'URL.
2. En jeu : `/sm settings` › **Discord** › **Webhook URL**, collez l'URL (ou `discord.webhook-url` dans `config.yml`).
3. `/sm webhook on`, puis `/sm webhook test` pour vérifier. Le test est envoyé comme un événement `report`, vers son URL : gardez cet événement activé pour tester.

::: warning Gardez l'URL privée
N'importe qui avec l'URL du webhook peut écrire dans votre salon. Ne partagez pas `config.yml` ni une capture d'écran de ce fichier.
:::

## Événements {#events}

| Événement | Par défaut | Envoyé quand |
|---|---|---|
| `report` | activé | un joueur est signalé |
| `punishment` | activé | un joueur reçoit un avertissement, un mute, un kick ou un ban |
| `appeal` | activé | un joueur fait appel d'une sanction |
| `alert` | activé | double compte, x-ray, [objets suspects](/fr/features/item-search#automatic-scan), TPS bas, maintenance |
| `lockdown` | activé | un [verrouillage anti-raid](/fr/features/verification#lockdown) commence (lancé par le staff ou automatique) ou se termine |
| `chat-filter` | activé | un message contient un mot filtré |
| `ticket` | désactivé | un ticket est créé |
| `staff-chat` | désactivé | un message est écrit dans le chat du staff |
| `bounty` | désactivé | une prime est posée ou réclamée |
| `chat` | désactivé | chaque message du chat |
| `join`, `quit` | désactivé | un joueur se connecte ou se déconnecte |
| `kill` | désactivé | un joueur tue un autre joueur |

Depuis le jeu : `/sm webhook <event> on` / `off` (permission `supmod.admin.webhook`).

```yaml
discord:
  enabled: true
  webhook-url: "https://discord.com/api/webhooks/..."
  events:
    report:
      enabled: true
      color: "#FF8800"      # "#RRGGBB" ou RANDOM
      url: ""               # un autre webhook pour cet événement ("" = celui par défaut)
    punishment:
      enabled: true
      color: "#C0392B"
      url: "https://discord.com/api/webhooks/...another channel..."
```

## Bon à savoir {#good-to-know}

- Les messages sont envoyés en arrière-plan, dans l'ordre, et les limites de débit de Discord sont respectées : le serveur n'attend jamais Discord.
- Ce que les joueurs écrivent est échappé : un joueur ne peut pas mettre en forme le message ni mentionner `@everyone`.
- Les textes des messages se trouvent dans les fichiers de langue (`discord.*`).
