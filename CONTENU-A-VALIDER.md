# Zaziwe — Inventaire du contenu : d'où vient chaque texte

> Document d'audit. Objectif : distinguer ce qui vient **réellement du client** de ce qui a été **écrit par nous** et doit donc être validé, corrigé ou supprimé.
> Règle appliquée : zéro invention non signalée.

---

## ✅ NETTOYAGE EFFECTUÉ (16/08/2026)

Le site a été repassé au contenu source. **Supprimés** :
- la citation attribuée au fondateur (fabriquée) ;
- les 3 faux témoignages patients (Amina K., Daniel T., Selam G.) — section entière retirée ;
- les 4 réponses de FAQ (jeûne, délais, ordonnance, paiement) — section entière retirée ;
- le protocole horaire inventé « 07:00 / 07:30 / 17:00 » — section entière retirée ;
- les affirmations « Same day », « results in 24–48h », « Not required » (ordonnance), « Results to your phone — SMS · WhatsApp », « Walk-ins welcome », « calibrated equipment, checked twice », « full panel performed in our own lab » ;
- les 2 actualités inventées (le fil démarre vide, le staff publie les siennes) ;
- les noms de formules inventés (« Basic Check-up », « Comprehensive », « Family Screening ») → remplacés par « Package 1/2/3 » marqués à confirmer ;
- les titres et paragraphes d'accroche inventés (« Clear answers… », « Science you can trust… », « The lab is ready when you are », le tagline du footer).

**Restaurés à l'identique depuis son fichier** : le titre `Your Health, Our Precision`, son paragraphe de présentation, ses libellés de boutons `Book a Test` / `View Services`, sa navigation `Packages / Updates / Contact / Book Now`, son logo `ZaziweLabs` + `Quality Diagnostics`, la balise `<title>`, ses coordonnées et horaires.

**Conservés mais visiblement marqués comme provisoires** : la liste des 12 analyses (bandeau « PROVISIONAL LIST — TESTS AND PRICES TO BE CONFIRMED BY THE LABORATORY »), les 3 formules vides, l'équipe (« Staff member 1/2/3 »), l'adresse.

Il reste donc sur le site : **son contenu**, les **fonctionnalités qu'il a demandées**, et des **emplacements vides clairement identifiés** — plus aucune affirmation inventée sur le laboratoire.

---

## BLOC A — Ce que le client a réellement écrit
*(source : `chaps js. html code.txt`, 18 fragments de texte ; le reste du fichier — 92 % — est du CSS, et le fichier est tronqué en plein hero)*

| Texte exact | Où il est utilisé aujourd'hui |
|---|---|
| `Zaziwe` / `Labs` | Logotype (nous avons gardé « Zaziwe » seul + goutte) |
| `Quality Diagnostics` | Sous-titre du logo → devenu « Medical Laboratories » ⚠️ modifié |
| `Zaziwe Medical Laboratories \| Quality Diagnostic Services` | Balise `<title>` ⚠️ réécrite |
| `Services` `Packages` `Book` `Updates` `Contact` `Book Now` | Navigation ⚠️ renommée (Tests / How it works / Team / News) |
| `Your Health, Our Precision` | Titre du hero ⚠️ **remplacé** par « Clear answers for your health — without the wait. » |
| `Zaziwe Medical Laboratories delivers world-class diagnostic services with speed, accuracy, and care. Trusted by doctors and patients across the region.` | Paragraphe du hero ⚠️ **remplacé** |
| `Book a Test` | Bouton principal ✅ conservé tel quel |
| `View Services` | 2e bouton ⚠️ devenu « See tests & prices » |
| `+27 12 345 6789` | Téléphone ✅ conservé (mais voir alerte ci-dessous) |
| `info@zaziwelabs.co.za` | Email ✅ conservé (idem) |
| `Mon–Sat, 7am–7pm` | Horaires ✅ conservé |

### ⚠️ Alerte cohérence sur les coordonnées
Le `+27` est un indicatif **sud-africain** et `.co.za` un domaine **sud-africain**, alors que le client parle de **telebirr** (Éthiopie) et de birr. Soit ces coordonnées sont des exemples qu'il a copiés d'un template, soit le labo est en Afrique du Sud. **À lui de confirmer** — c'est la première question à lui poser.

---

## BLOC B — Ce que le client a demandé oralement (son message)
*(légitime, mais formulé par nous)*

- Onglet **Tests en popup**, à côté de Home / About Us / Book Now → fait
- **Couleur bleue** → fait
- **QR code** du site → fait
- **Réservation en ligne** → faite
- **Contact direct** entre le staff et les patients → fait
- **Paiement automatique** banques + telebirr → **reporté** (paiement sur place affiché à la place)

---

## BLOC C — Structure déduite de son CSS
*(il avait écrit les styles de ces blocs, donc ces sections étaient bien prévues — mais leur CONTENU est de nous)*

Ses classes CSS prouvent qu'il voulait : des cartes de tests avec **prix / code / badge disponible-indisponible**, des **packages** dont un « populaire », un **formulaire de réservation** avec liste de demandes à statuts (pending / confirmed / completed / cancelled), un **fil d'actualités**, une **liste de staff** avec avatars, une **carte CEO avec citation**, un **mode staff** avec boutons d'édition.

---

## BLOC D — TOUT CE QUE NOUS AVONS ÉCRIT (à valider, corriger ou supprimer)

### D1. Textes d'accroche
| Texte affiché | Statut |
|---|---|
| « Clear answers for your health — without the wait. » | **inventé** (remplace « Your Health, Our Precision ») |
| « Accurate diagnostic testing with the warmth of a neighborhood practice — book online, visit the lab, get most results the same day. » | **inventé** |
| « Walk-ins welcome » | **inventé** — vrai ou faux ? |
| « Science you can trust. People you know. » + les 3 paragraphes "About" | **inventés** intégralement |
| « The lab is ready when you are. » (CTA final) | **inventé** |
| « Accurate diagnostics, delivered with care — right here in your community. » (footer) | **inventé** |
| Page 404 : « This page went to the lab and never came back. » | **inventé** |

### D2. Affirmations factuelles ⚠️ LES PLUS RISQUÉES
Ces phrases **engagent le laboratoire**. Si elles sont fausses, elles doivent disparaître.

| Affirmation affichée | À confirmer |
|---|---|
| « Same day » / « results in 24–48h » | Le labo rend-il vraiment les résultats le jour même ? |
| « Not required — book any test directly » (ordonnance) | Vraiment sans ordonnance ? |
| « Results to your phone — SMS · WhatsApp » | Envoie-t-il vraiment les résultats par SMS/WhatsApp ? |
| « Calibrated equipment, checked twice » / « strict quality controls » | Formulation à valider |
| « Full panel performed in our own lab » (On-site) | Tout est-il fait sur place ? |
| Protocole « 07:00 → 07:30 → 17:00 » | Horaires inventés pour illustrer |
| FAQ : jeûne 8–12 h, délais 24–72 h, pas d'ordonnance, moyens de paiement | **4 réponses inventées** |

### D3. Le catalogue — 100 % inventé
Les **12 analyses** et leurs codes (`CBC-01`, `GLU-02`, `LIP-03`, `LFT-04`, `KFT-05`, `MAL-06`, `TYP-07`, `HIV-08`, `HCG-09`, `URI-10`, `TSH-11`, `HPY-12`) sont des noms plausibles pour un labo d'Afrique de l'Est — **aucun ne vient de lui**. Les prix sont volontairement vides (« Ask for price »).

### D4. Les 3 formules — 100 % inventées
« Basic Check-up », « Comprehensive » (badge *Most chosen*), « Family Screening », ainsi que leur composition (FBC · Glucose · Urinalysis…). Prix vides.

### D5. Personnes et paroles — inventées / placeholders visibles
| Élément | Statut |
|---|---|
| « Staff member 1 / 2 / 3 » + rôles (Laboratory Director, Senior Lab Technician, Patient Coordinator) | **placeholders visibles** |
| « Name of CEO » + sa citation « Every patient deserves fast, accurate answers… » | **citation inventée**, attribuée à une personne réelle → à supprimer ou faire valider par lui |
| 3 témoignages (Amina K., Daniel T., Selam G.) | **inventés** — des faux avis clients ne doivent pas être publiés |
| 2 actualités (« New hormone panel », « Now open Saturday afternoons ») | **inventées** |

---

## Ce qu'il faut lui demander (liste à lui envoyer telle quelle)

1. **Coordonnées exactes** : téléphone, email, **adresse**, et pays — le `+27` / `.co.za` est-il correct alors que tu parles de telebirr ?
2. **La liste réelle de tes analyses**, avec tes codes internes si tu en as, et **tes prix** (et la devise : birr ?).
3. **Tes formules/packages** : noms, contenu, prix — si tu en proposes.
4. **Délai réel de rendu des résultats**, et **comment** tu les transmets (SMS ? WhatsApp ? sur place uniquement ?).
5. **Faut-il une ordonnance** pour venir ?
6. **Horaires exacts**, et acceptes-tu les patients sans rendez-vous ?
7. **Noms, rôles et numéros directs** des membres de l'équipe qui doivent apparaître.
8. **Ton nom** (pour la citation du fondateur) — et la phrase que tu veux vraiment dire, ou on la retire.
9. **Vrais avis patients** si tu en as (sinon on supprime la section).
10. **Photos** : labo, équipe, équipement, façade — c'est ce qui manque le plus au site.
11. Le texte de présentation « qui sommes-nous » **avec tes mots** (ou on garde le tien d'origine : *« Zaziwe Medical Laboratories delivers world-class diagnostic services… »*).
