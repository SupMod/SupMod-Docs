# Hologrammes

Des textes flottants faits avec les text displays de Minecraft : pas d'armor stand, pas de hitbox, rien qui fasse laguer. Ils peuvent afficher des placeholders et des **classements** (meilleur temps de jeu, kills, coins, série quotidienne). Permission : `supmod.holograms.admin`.

## Créer un hologramme {#create-a-hologram}

```text
/sm holograms create welcome &d&lWELCOME
```

L'hologramme apparaît 2 blocs au-dessus de vous ; ajustez-le avec `/sm holograms edit <id>`. Dans `/sm holograms`, le bouton « Nouvel hologramme » crée un hologramme de texte (clic gauche) ou un classement (clic droit).

| Commande | |
|---|---|
| `/sm holograms` | liste des hologrammes (clic : modifier, maj + clic : se téléporter) |
| `/sm holograms create <id> [text]` | nouvel hologramme |
| `/sm holograms edit <id>` | éditeur |
| `/sm holograms movehere <id>` | le déplacer à votre position |
| `/sm holograms addline <id> <text>` | ajouter une ligne |
| `/sm holograms near` | l'hologramme le plus proche |
| `/sm holograms delete <id>` | supprimer |

## L'éditeur {#the-editor}

La position s'ajuste **en direct** pendant que vous la regardez :

| Bouton | |
|---|---|
| Flèches X, Y, Z | déplacer du pas actuel ; maj : 5 pas |
| Pas | de 0,05 à 1 bloc (gauche : plus grand, droite : plus petit) |
| Déplacer ici | gauche : 2 blocs au-dessus de vous ; droite : à hauteur de vos yeux ; maj : tourné aussi dans votre direction |
| Rotation, échelle | gauche +, droite − |
| Orientation | `CENTER` (toujours face au joueur), `VERTICAL`, `HORIZONTAL`, `FIXED` (utilise la rotation) |
| Fond | par défaut, aucun, ou une couleur personnalisée `#AARRGGBB` |
| Ombre, visible à travers les blocs | interrupteurs |
| Lignes | éditeur de liste : couleurs et placeholders |
| Largeur de ligne, alignement | `LEFT`, `CENTER`, `RIGHT` |
| Actualisation | toutes les X secondes, pour les placeholders (0 = jamais) |
| Classement | aucun, playtime, kills, coins ou streak ; maj : taille du top |
| Distance d'affichage | |

## Classements {#leaderboards}

Un hologramme de classement affiche un titre et les meilleurs joueurs d'un classement des [statistiques](/fr/features/statistics) à la place de ses lignes, actualisé en même temps que les classements (`stats.refresh-minutes`). Le titre et le format des lignes se trouvent dans le fichier de langue (`holograms.leaderboard-*`).

## Exemple {#example}

```yaml
holograms:
  welcome:
    world: world
    x: 0.5
    y: 70.0
    z: 0.5
    lines:
      - "&d&lWELCOME"
      - "&7%online% players online"
    scale: 1.0
    billboard: CENTER
    background: default
    shadow: true
    update-seconds: 5
  top-kills:
    world: world
    x: 10.5
    y: 70.0
    z: 0.5
    leaderboard: kills
    leaderboard-size: 10
```

::: info Placeholders dans les hologrammes
Un hologramme est le même pour tous les joueurs : utilisez des placeholders globaux (`%online%`, `%tps%`, `%date%`, `%staff_online%`...). Les placeholders liés au joueur qui le regarde (`%player%`, `%coins%`) n'y fonctionnent pas.
:::

Les hologrammes ne sont pas enregistrés dans le monde : SupMod les crée quand leur chunk se charge et les supprime quand le serveur s'arrête. Si vous désinstallez SupMod, rien ne reste derrière.
