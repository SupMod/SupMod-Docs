# Mondes

`/sm worlds` (permission `supmod.worlds`) liste les mondes du serveur avec leurs statistiques ; `/sm worlds <world>` ouvre l'un d'eux.

## Statistiques {#statistics}

Pour chaque monde : type (overworld, nether, end), joueurs, chunks chargés, entités par type, âge en jours de jeu et en jours réels, taille sur le disque.

## Actions {#actions}

Avec `supmod.worlds.manage` :

| Bouton | |
|---|---|
| Heure | jour, midi, nuit, minuit |
| Météo | dégagée, pluie, orage |
| Difficulté | difficulté suivante |
| PvP | activé / désactivé |
| Spawn | placer le spawn à votre position, ou vous y téléporter |
| Bordure du monde | clic gauche : taille ; clic droit : la centrer sur vous |
| Règles du jeu | le menu des règles du jeu (aussi `/sm gamerule [world]`, permission `supmod.admin.gamerule`) |
| Sauvegarde auto | activée / désactivée ; maj + clic : sauvegarder maintenant |
| Joueurs, entités | listes du monde |
| Décharger | sauvegarde puis décharge le monde (pas le monde principal, pas s'il contient des joueurs) |

## Charger un monde {#load-a-world}

Les dossiers du serveur qui contiennent un monde non chargé apparaissent dans la liste. Avec `supmod.worlds.load` : clic gauche pour le charger comme overworld, clic droit comme nether, maj + clic comme end. Un monde chargé ainsi n'est **pas** rechargé automatiquement après un redémarrage.

::: tip Astuce
Pour un monde qui doit toujours être chargé, continuez à utiliser votre gestionnaire de mondes (Multiverse...) : le chargeur de SupMod sert aux mondes occasionnels (une map d'événement, un ancien monde à vérifier...).
:::
