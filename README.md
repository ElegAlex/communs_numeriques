# communs_numeriques
blog communs numériques

# Blog Personnel sur les Communs Numériques

![Capture d'écran du blog](images/screenshot-blog.png) <!-- Optionnel: Ajoutez une capture d'écran attrayante -->

## Introduction

Bienvenue sur le dépôt du code source de mon blog personnel dédié à l'exploration des **communs numériques**. Ce site a été conçu pour partager analyses, réflexions et retours d'expérience sur les enjeux du numérique partagé, s'adressant principalement aux chercheurs, décideurs publics et à toute personne curieuse de ces thématiques.

Ce projet est codé manuellement en **HTML, CSS et JavaScript natifs**, sans frameworks ni CMS, afin de garantir une performance optimale, une maîtrise totale du code et une esthétique minimaliste et moderne. L'accent est mis sur une expérience utilisateur soignée, une lisibilité maximale et une accessibilité rigoureuse.

Le contenu principal du blog s'articule autour de mon mémoire de recherche : « **Les facteurs d'institutionnalisation des communs numériques dans l'administration** ».

**URL du site en production :** [https://votre-domaine.com](https://votre-domaine.com) <!-- Mettez votre URL réelle -->

## Table des Matières

- [Philosophie du Design](#philosophie-du-design)
- [Fonctionnalités Clés](#fonctionnalités-clés)
- [Structure du Projet](#structure-du-projet)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation et Développement Local](#installation-et-développement-local)
  - [Prérequis](#prérequis)
  - [Lancement](#lancement)
- [Déploiement](#déploiement)
- [Personnalisation](#personnalisation)
  - [Design System](#design-system)
  - [Ajout de Contenu](#ajout-de-contenu)
- [Contribution](#contribution) <!-- Si pertinent -->
- [Licence](#licence)
- [Contact](#contact)

## Philosophie du Design

Le design de ce blog repose sur les principes suivants :

*   **Minimalisme Élégant :** Une interface épurée, centrée sur le contenu, avec un usage stratégique des espaces blancs pour une meilleure lisibilité et concentration.
*   **Ergonomie Intuitive :** Une navigation claire et une architecture de l'information simple pour un accès facile aux contenus.
*   **Performance :** Optimisation pour un chargement rapide des pages, grâce à un code léger et des ressources optimisées.
*   **Responsive Design :** Expérience utilisateur fluide et cohérente sur tous les appareils (ordinateurs, tablettes, mobiles).
*   **Accessibilité (a11y) :** Respect des standards WCAG pour garantir l'accès au contenu pour tous, y compris les personnes en situation de handicap.
*   **Animations Subtiles :** Intégration d'animations fluides et de micro-interactions pour enrichir l'expérience sans distraire.

## Fonctionnalités Clés

*   **Page d'accueil type "vitrine"** avec défilement continu présentant les sections clés du blog.
*   **Design System minimaliste** basé sur des variables CSS pour une cohérence globale.
*   **Animations d'apparition au scroll** utilisant `IntersectionObserver` pour le dynamisme.
*   **Menu de navigation fixe** avec surlignage du lien actif et menu hamburger responsive.
*   **Cartes d'articles** avec effets de survol pour la présentation des contenus.
*   **Page dédiée au mémoire de recherche** formatée comme un article long format avec table des matières interne.
*   **Code sémantique HTML5** pour une meilleure structure et SEO.
*   **Optimisation pour les performances** (lazy loading des images, code minifié en production - *si applicable*).
*   **Respect des préférences utilisateur** pour la réduction des animations (`prefers-reduced-motion`).

## Structure du Projet

L'arborescence du projet est organisée comme suit :

```
.
├── index.html              # Page d'accueil principale
├── style.css               # Feuille de style globale
├── script.js               # Script JavaScript principal
│
├── articles/               # Contient les pages des articles et du mémoire
│   ├── index.html          # (Optionnel) Page listant tous les articles
│   ├── memoire-institutionnalisation-communs-numeriques.html # Page du mémoire
│   └── autre-article.html  # Exemple de page d'article
│
├── images/                 # Ressources graphiques (logos, illustrations, favicons)
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── screenshot-blog.png # (Optionnel) Capture d'écran pour le README
│   └── ...                 # Autres images
│
├── memoire/                # (Optionnel) Dossier pour le fichier PDF du mémoire si distinct
│   └── votre-fichier-memoire.pdf
│
├── mentions-legales.html   # Page des mentions légales
├── politique-confidentialite.html # Page de la politique de confidentialité
└── README.md               # Ce fichier
```

## Technologies Utilisées

*   **HTML5:** Pour la structure sémantique du contenu.
*   **CSS3:** Pour la mise en page et le style, avec utilisation de :
    *   Variables CSS (Custom Properties)
    *   Flexbox et Grid Layout
    *   Media Queries pour le responsive design
    *   Transitions et Animations CSS
*   **JavaScript (ES6+):** Pour l'interactivité et les améliorations dynamiques :
    *   Manipulation du DOM natif
    *   `IntersectionObserver` API pour les animations au scroll
    *   Gestion du menu hamburger
    *   Aucune dépendance externe (pas de jQuery ou de frameworks JS lourds).
*   **Polices de caractères :** [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts (ou auto-hébergée si applicable).
*   **Icônes SVG :** Intégrées directement dans le HTML (provenant de bibliothèques comme Feather Icons, Tabler Icons, etc.).

## Installation et Développement Local

Ce projet étant un site statique, il ne nécessite pas de processus de build complexe pour le développement de base.

### Prérequis

*   Un navigateur web moderne (Chrome, Firefox, Safari, Edge).
*   Un éditeur de code (VS Code, Sublime Text, Atom, etc.).
*   (Optionnel) Une extension de serveur local pour votre éditeur (ex: Live Server pour VS Code) pour faciliter le rechargement à chaud.

### Lancement

1.  **Clonez le dépôt (si hébergé sur Git) ou téléchargez les fichiers :**
    ```bash
    git clone https://github.com/votre-utilisateur/votre-repo.git # Adaptez l'URL
    cd votre-repo
    ```
2.  **Ouvrez `index.html` directement dans votre navigateur.**
    *   Alternativement, si vous utilisez une extension comme "Live Server" dans VS Code, faites un clic droit sur `index.html` et choisissez "Open with Live Server".

Les modifications apportées aux fichiers HTML, CSS ou JS seront visibles en rafraîchissant la page dans le navigateur (ou automatiquement avec Live Server).

## Déploiement

Ce site statique peut être déployé sur une multitude de plateformes :

*   **GitHub Pages:** Gratuit et simple pour les projets hébergés sur GitHub.
*   **Netlify:** Offre un déploiement continu, des formulaires, des fonctions serverless, etc.
*   **Vercel:** Similaire à Netlify, très performant pour les sites statiques et les applications front-end.
*   **Firebase Hosting:** Solution de Google.
*   **Serveur web classique (Apache, Nginx):** Copiez simplement les fichiers sur votre serveur.

Aucune configuration serveur spécifique n'est requise, hormis la capacité de servir des fichiers statiques.

## Personnalisation

### Design System

Les principaux éléments du design system sont définis comme des variables CSS dans `style.css` (section `:root`). Vous pouvez facilement modifier :

*   **Couleurs :** `--color-text`, `--color-accent`, `--color-background`, etc.
*   **Typographie :** `--font-primary`, et les tailles de police dans les sections dédiées.
*   **Espacements :** `--spacing-unit`, `--container-width`.

### Ajout de Contenu

*   **Nouveaux Articles :**
    1.  Créez un nouveau fichier HTML dans le dossier `articles/` (ex: `nouvel-article.html`).
    2.  Reprenez la structure de base d'un article existant (ou du fichier `articles/memoire-institutionnalisation-communs-numeriques.html` pour la structure long format).
    3.  Adaptez les liens relatifs vers `style.css`, `script.js` et les images (`../style.css`, etc.).
    4.  Rédigez votre contenu en utilisant les balises HTML sémantiques.
    5.  Ajoutez une carte pour ce nouvel article dans `index.html` (section `#articles`) et sur la page `articles/index.html` si vous en avez une.
*   **Images :** Placez vos images optimisées dans le dossier `images/` et référencez-les avec des chemins relatifs. Pensez à l'attribut `alt` pour l'accessibilité.
*   **Icônes :** Pour de nouvelles icônes, trouvez des SVG optimisés et intégrez-les directement dans le HTML ou via une balise `<img>` si c'est plus simple pour vous.

## Contribution

Ce projet est personnel, mais les retours et suggestions sont toujours les bienvenus. Si vous trouvez des bugs ou avez des idées d'amélioration, n'hésitez pas à ouvrir une "Issue" sur le dépôt GitHub (si applicable).

<!-- Si vous souhaitez accepter des contributions de code :
Pour contribuer :
1. Forkez le projet.
2. Créez une nouvelle branche (`git checkout -b feature/amelioration-X`).
3. Faites vos modifications.
4. Commitez vos changements (`git commit -m 'Ajout de l'amélioration X'`).
5. Pushez vers la branche (`git push origin feature/amelioration-X`).
6. Ouvrez une Pull Request.
-->

## Licence

Le code source de ce site est distribué sous la licence [MIT](./LICENSE.txt) (ou une autre licence de votre choix, à créer).

Le contenu textuel et les images (sauf mention contraire) sont publiés sous la licence [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/deed.fr).

## Contact

*   **BERGE ALEXANDRE**
*   **Email :** [contact@alexandre-berge.fr](mailto:contact@alexandre-berge.fr)
*   **LinkedIn :** https://www.linkedin.com/in/bergealexandre/
*   **Twitter / Mastodon :** [@votreHandle](https://twitter.com/votreHandle) <!-- Adaptez -->

---

_Ce README a été mis à jour pour la dernière fois le [Date Actuelle]._
