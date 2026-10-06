# Langues et messages

Chaque message, titre de menu et description d'objet de SupMod se trouve dans un fichier de langue. Deux langues sont incluses : l'**anglais** (`en_US`) et le **français** (`fr_FR`).

## Choisir la langue {#choose-the-language}

En jeu : `/sm settings` › **Général** › **Langue**. Ou dans `config.yml` :

```yaml
language: fr_FR
```

puis `/sm reload`.

## Modifier un message {#edit-a-message}

1. Ouvrez `plugins/SupMod/lang/en_US.yml` (ou `fr_FR.yml`).
2. Trouvez le message (cherchez un mot du texte).
3. Modifiez le texte en gardant les `%placeholders%`, enregistrez, puis tapez `/sm reload`.

```yaml
report:
  sent: "&aThank you! Your report about &f%player% &a(%reason%) was sent to the staff."
```

- Couleurs : `&a`, `&l`... et couleurs hexadécimales `&#RRGGBB`.
- Un **message vide** (`""`) n'est pas envoyé du tout : pratique pour supprimer un message dont vous ne voulez pas.
- `prefix`, en haut du fichier, est ajouté devant la plupart des messages.

::: tip Les nouveaux messages sont ajoutés pour vous
Quand SupMod est mis à jour, les nouveaux messages sont ajoutés automatiquement à votre fichier de langue ; les messages que vous avez modifiés sont conservés. Un message que vous n'avez jamais changé, mais qui a été amélioré dans une nouvelle version, garde son ancien texte : supprimez la ligne et redémarrez pour obtenir le nouveau.
:::

## Créer une langue {#create-a-language}

1. Copiez `en_US.yml` dans un nouveau fichier, par exemple `lang/es_ES.yml`.
2. Traduisez les textes (gardez les clés et les `%placeholders%`).
3. Mettez `language: es_ES` et tapez `/sm reload`.

Un message absent de votre fichier est pris dans le fichier anglais inclus dans le plugin : une traduction partielle fonctionne donc quand même.

::: info Partagez votre traduction
Une traduction complète peut être incluse dans la prochaine version de SupMod : envoyez-la sur le [serveur Discord](https://discord.gg/f7eKwemeMX).
:::

## L'écran de ban {#the-ban-screen}

Le texte affiché aux joueurs bannis se trouve dans `punish.screen.ban` (définitif) et `punish.screen.tempban`. Depuis la 2.3, il peut afficher le **code d'appel** avec `%code%` :

```yaml
punish:
  screen:
    ban:
      - "&c&lYou are banned from this server"
      - ""
      - "&7Reason: &f%reason%"
      - "&7By: &f%staff%"
      - "&7Duration: &fpermanent"
      - ""
      - "&7Appeal code: &e%code%"
      - "&8Ban #%id%  %appeal%"
```

Si votre fichier de langue a été créé avant la 2.3, ajoutez vous-même la ligne `%code%`. Voir [Appels](/fr/features/appeals).
