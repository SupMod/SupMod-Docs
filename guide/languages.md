# Languages and messages

Every message, menu title and item description of SupMod is in a language file. Two languages are included: **English** (`en_US`) and **French** (`fr_FR`).

## Choose the language {#choose-the-language}

In game: `/sm settings` › **General** › **Language**. Or in `config.yml`:

```yaml
language: fr_FR
```

then `/sm reload`.

## Edit a message {#edit-a-message}

1. Open `plugins/SupMod/lang/en_US.yml` (or `fr_FR.yml`).
2. Find the message (search for a word of the text).
3. Change the text, keep the `%placeholders%`, save, then `/sm reload`.

```yaml
report:
  sent: "&aThank you! Your report about &f%player% &a(%reason%) was sent to the staff."
```

- Colours: `&a`, `&l`... and hex colours `&#RRGGBB`.
- An **empty message** (`""`) is not sent at all: useful to remove a message you don't want.
- `prefix` at the top of the file is added before most messages.

::: tip New messages are added for you
When SupMod is updated, the new messages are added to your language file automatically; the messages you edited are kept. A message you never changed but that was improved in a new version keeps its old text: delete the line and restart to get the new one.
:::

## Create a language {#create-a-language}

1. Copy `en_US.yml` to a new file, for example `lang/es_ES.yml`.
2. Translate the texts (keep the keys and the `%placeholders%`).
3. Set `language: es_ES` and `/sm reload`.

A message missing from your file is taken from the English file included in the plugin, so a partial translation still works.

::: info Share your translation
A complete translation can be included in the next version of SupMod: send it on the [Discord server](https://discord.gg/f7eKwemeMX).
:::

## The ban screen {#the-ban-screen}

The text shown to banned players is in `punish.screen.ban` (permanent) and `punish.screen.tempban`. Since 2.3 it can show the **appeal code** with `%code%`:

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

If your language file was created before 2.3, add the `%code%` line yourself. See [Appeals](/features/appeals).
