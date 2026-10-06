# Zones

Une zone est un volume dans un monde, avec des messages quand les joueurs y entrent ou en sortent, et des règles facultatives : pas de PvP, pas de vol, entrée réservée à une permission. Tout se fait en jeu avec `/sm zones` (permission `supmod.zones.admin`).

## Créer une zone {#create-a-zone}

1. `/sm zones wand` vous donne la baguette de sélection.
2. Clic gauche sur un bloc pour le premier coin, clic droit pour le coin opposé (ou `/sm zones pos1` et `/sm zones pos2` à votre position).
3. `/sm zones create spawn` crée la zone `spawn` à partir de votre sélection et affiche ses bordures avec des particules. Ouvrez son éditeur avec `/sm zones edit spawn`.

La zone va du coin le plus bas au coin le plus haut, les deux inclus.

## L'éditeur {#the-editor}

`/sm zones edit <id>` (ou un clic dans `/sm zones`) :

| Bouton | |
|---|---|
| Ouest, est, bas, haut, nord, sud | agrandir (clic gauche) ou réduire (clic droit) un côté, de 1 bloc ou de 5 avec maj ; les bordures s'affichent en direct avec des particules |
| Afficher les bordures | des particules pendant 10 secondes, visibles par vous seul (aussi `/sm zones show <id>`) |
| À l'entrée, à la sortie | message dans le chat, titre et sous-titre, barre d'action, son et commandes console |
| Pas de PvP, pas de vol | règles à l'intérieur de la zone |
| Permission d'entrée | les joueurs qui ne l'ont pas ne peuvent pas entrer (ils sont repoussés) |
| Priorité | quand des zones se chevauchent, la priorité la plus haute l'emporte pour les messages |
| Redéfinir avec la baguette | utilise votre sélection actuelle |
| Téléporter, supprimer | |

`/sm zones here` liste les zones à votre position.

## Exemple {#example}

```yaml
zones:
  spawn:
    world: world
    min: [-50, 60, -50]
    max: [50, 120, 50]
    priority: 0
    enter:
      title: "&d&lSPAWN"
      subtitle: "&7Safe zone"
      sound: "block.note_block.pling"
    leave:
      action-bar: "&7You left the spawn"
    flags:
      deny-pvp: true
      deny-fly: false
      entry-permission: ""
```

## Bon à savoir {#good-to-know}

- Les actions d'entrée et de sortie s'exécutent une fois par entrée : faire des allers-retours sur la bordure ne spamme pas le joueur (protection de 2 secondes), et une reconnexion à l'intérieur d'une zone n'exécute rien.
- Les règles s'appliquent aussi à la téléportation, aux portails, à la réapparition et aux véhicules : un joueur ne peut pas entrer dans une zone réservée avec une ender pearl ou un bateau.
- `supmod.zones.bypass` ignore la permission d'entrée et la règle « pas de vol » (les administrateurs par défaut).
- Les commandes utilisent `%player%` et `%zone%`. Les modifier en jeu demande `supmod.admin.commands`.
- Les zones sont enregistrées dans `zones.yml`.
