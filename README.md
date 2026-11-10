# Projet-1 : Site d'Inscription

## C'est quoi ce projet ?
C'est un site web qui permet à un utilisateur de s'inscrire avec un nom d'utilisateur et un mot de passe.
Les informations sont enregistrées dans une base de données en ligne Supabase, dans la table `utilisateurs`.
Quand l'utilisateur s'inscrit, il voit le message "Bravo ! Bienvenue !"

## Fonctionnalités réalisées
- **Page d'Inscription :** formulaire avec Nom d'utilisateur + Mot de passe
- **Bouton s'inscrire :** quand on clique, ça envoie les données
- **Connexion à Supabase :** le site est relié à la base de données avec SUPABASE_URL et SUPABASE_KEY
- **Enregistrement dans la table `utilisateurs` :** chaque inscription crée une nouvelle ligne avec `username` et `password`
- **Message de confirmation :** "Envoi..." puis "Bravo ! Bienvenue !" si ça marche, ou "Erreur : ..." si ça ne marche pas
- **Design :** carte blanche, fond dégradé rose / violet, bouton rose

## Fonctionnalités à réaliser / à améliorer
- [ ] Page de Connexion (se connecter avec un compte déjà créé)
- [ ] Vérifier si le nom d'utilisateur existe déjà
- [ ] Cacher le mot de passe (ne pas le voir en clair dans Supabase)
- [ ] Page d'accueil après inscription
- [ ] Corriger l'erreur "Failed to fetch" quand Supabase ne répond pas

## Technologies utilisées
- HTML / CSS pour le design
- JavaScript pour le bouton
- Supabase (Base de données + API)
- GitHub Pages pour mettre le site en ligne

## Comment lancer le projet ?
1. Ouvrir le site GitHub Pages
2. Taper un nom d'utilisateur et un mot de passe
3. Cliquer sur "s'inscrire"
4. Vérifier dans Supabase > Table Editor > utilisateurs

## Membres de l'équipe
- **Nfanga Gaëlle** - Développement Front-End (design + page d'inscription) / Connexion Supabase
- **Emmanuel** - Développement Back-End (base de données Supabase + table `utilisateurs`) / Tests

## Structure du projet
