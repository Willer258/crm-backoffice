# 📬 PRD — Unified Inbox (WhatsApp + Email)

**Version:** 1.0  
**Date:** 2026-02-18  
**Auteur:** Mira (IA CRM)  
**Statut:** Approuvé — Implémentation en cours  
**Branch:** `feature/crm-messaging`

---

## 🎯 Vision & Objectif

Intégrer une **Unified Inbox** dans le CRM permettant à l'équipe commerciale de gérer WhatsApp Business et Emails depuis une seule interface, directement rattachée aux contacts et deals existants.

**Problème résolu :** Aujourd'hui, l'équipe jongle entre WhatsApp, Gmail et le CRM. Résultat : perte d'historique, pas de traçabilité, risque de doublons et de réponses manquées.

**Solution :** Une seule interface dans le CRM pour lire, envoyer et archiver tous les messages, avec attribution automatique aux contacts.

---

## 🏆 Épic : Unified Inbox

**Énoncé :** En tant qu'utilisateur CRM, je veux gérer mes conversations WhatsApp et Email dans une interface unifiée, afin de ne jamais perdre le fil d'une relation client.

**Critères d'acceptation épic :**
- [ ] Afficher les conversations WhatsApp et Email dans une seule liste
- [ ] Envoyer des messages WhatsApp depuis le CRM
- [ ] Envoyer des emails depuis le CRM
- [ ] Recevoir les réponses en temps réel (ou quasi-temps réel)
- [ ] Lier chaque conversation à un contact CRM
- [ ] Historique complet par contact

---

## 📋 User Stories

### 🟢 Canal WhatsApp

#### US-W1 : Voir les conversations WhatsApp entrantes
**En tant que** commercial,  
**Je veux** voir les messages WhatsApp reçus dans le CRM,  
**Afin de** ne pas manquer les demandes clients.

**Acceptance Criteria :**
- Les messages WhatsApp entrants apparaissent dans la liste Unified Inbox
- Chaque message est associé à un contact (si le numéro existe dans le CRM)
- Un badge indique le nombre de messages non lus
- Les messages sont triés par date (plus récent en premier)

**Estimation :** 3 points

---

#### US-W2 : Envoyer un message WhatsApp à un contact
**En tant que** commercial,  
**Je veux** envoyer un message WhatsApp depuis la fiche contact,  
**Afin de** contacter mes clients sans quitter le CRM.

**Acceptance Criteria :**
- Bouton "Envoyer WhatsApp" sur la fiche contact (si numéro de téléphone disponible)
- Zone de saisie de message avec envoi via Evolution API
- Confirmation visuelle d'envoi (statut: envoyé, délivré, lu)
- Message ajouté à l'historique de la conversation

**Estimation :** 5 points

---

#### US-W3 : Répondre à une conversation WhatsApp
**En tant que** commercial,  
**Je veux** répondre directement dans le fil de conversation WhatsApp,  
**Afin de** maintenir le contexte de l'échange.

**Acceptance Criteria :**
- Panneau de conversation style "chat" avec bulles de messages
- Zone de saisie en bas du panneau
- Envoi avec Enter ou bouton
- Mise à jour en temps quasi-réel (polling toutes les 10s)

**Estimation :** 3 points

---

#### US-W4 : Recevoir un webhook WhatsApp (Evolution API)
**En tant que** système CRM,  
**Je veux** recevoir les webhooks Evolution API,  
**Afin de** stocker les messages entrants automatiquement.

**Acceptance Criteria :**
- Endpoint `POST /api/webhooks/whatsapp` disponible
- Validation de la signature du webhook
- Création automatique d'un Message en base
- Association au contact si numéro connu
- Log des erreurs si contact inconnu

**Estimation :** 5 points

---

### 🔵 Canal Email

#### US-E1 : Voir les emails entrants
**En tant que** commercial,  
**Je veux** voir les emails reçus dans le CRM,  
**Afin de** centraliser toutes les communications.

**Acceptance Criteria :**
- Les emails apparaissent dans l'Unified Inbox avec canal "Email"
- Objet, expéditeur, date visible dans la liste
- Corps de l'email lisible dans le panneau de conversation
- Pièces jointes indiquées (avec lien de téléchargement)

**Estimation :** 3 points

---

#### US-E2 : Envoyer un email à un contact
**En tant que** commercial,  
**Je veux** envoyer un email depuis le CRM,  
**Afin d'** avoir un historique complet sans changer d'application.

**Acceptance Criteria :**
- Bouton "Envoyer Email" depuis la fiche contact
- Formulaire de composition : Destinataire, Objet, Corps (rich text basique)
- Envoi via SMTP configuré
- Email ajouté à l'historique de la conversation
- Gestion des erreurs SMTP avec message utilisateur

**Estimation :** 5 points

---

#### US-E3 : Voir l'historique complet par contact
**En tant que** commercial,  
**Je veux** voir tous les messages (WhatsApp + Email) d'un contact,  
**Afin de** comprendre l'historique complet de la relation.

**Acceptance Criteria :**
- Onglet "Messages" sur la fiche contact
- Affichage chronologique de tous les messages (WhatsApp + Email)
- Filtre par canal
- Lien vers la conversation complète

**Estimation :** 2 points

---

### 🟠 Unified Inbox

#### US-U1 : Unified Inbox — Vue principale
**En tant que** commercial,  
**Je veux** une page dédiée à tous mes messages,  
**Afin de** gérer toutes les conversations depuis un seul endroit.

**Acceptance Criteria :**
- Page `/dashboard/messages` accessible depuis le menu
- Sidebar gauche : filtres par canal (Tous, WhatsApp, Email)
- Liste centrale : conversations triées par date
- Panneau droit : conversation active
- Badge non-lu dans le menu principal

**Estimation :** 8 points

---

#### US-U2 : Filtres et recherche
**En tant que** commercial,  
**Je veux** filtrer les messages par canal, statut et contact,  
**Afin de** trouver rapidement une conversation.

**Acceptance Criteria :**
- Filtre par canal (WhatsApp / Email / Tous)
- Filtre par statut (Non lu / Lu / Archivé)
- Barre de recherche sur le nom du contact ou l'objet
- Résultats mis à jour en temps réel

**Estimation :** 3 points

---

## 🏗️ Architecture Technique

### Vue d'ensemble

```
┌─────────────────────────────────────────────────────────┐
│                  CRM Backoffice (Next.js)                │
│  /dashboard/messages                                      │
│  ┌──────────┐ ┌──────────────┐ ┌────────────────────┐   │
│  │ Channel  │ │ MessageList  │ │ MessageThread      │   │
│  │ Filter   │ │              │ │ (panneau convos)   │   │
│  └──────────┘ └──────────────┘ └────────────────────┘   │
└─────────────────────────┬───────────────────────────────┘
                          │ API REST (JWT)
┌─────────────────────────▼───────────────────────────────┐
│                  CRM API (Symfony 7.2)                   │
│  MessageController  |  WebhookController                  │
│  WhatsAppService    |  EmailService                       │
│  Message entity     |  MessageThread entity               │
└──────┬──────────────────────────────────────┬────────────┘
       │                                      │
┌──────▼──────┐                    ┌──────────▼──────────┐
│ Evolution   │                    │  SMTP Server        │
│ API         │                    │  (Gmail/Mailgun)    │
│ localhost:  │                    │                     │
│ 8080        │                    │                     │
└─────────────┘                    └─────────────────────┘
       ▲
       │ Webhooks entrants
┌──────┴──────┐
│ WhatsApp    │
│ Business    │
└─────────────┘
```

### Modèle de données

#### Entité `Message`
```
id          : int (PK)
workspace   : Workspace (FK)
thread      : MessageThread (FK)
contact     : Contact (FK, nullable — contact inconnu)
channel     : enum(whatsapp, email)
direction   : enum(in, out)
from_address: string (numéro WA ou email expéditeur)
to_address  : string (numéro WA ou email destinataire)
subject     : string nullable (Email uniquement)
content     : text
status      : enum(pending, sent, delivered, read, failed)
metadata    : json (message_id WA, email headers, etc.)
read_at     : datetime nullable
sent_at     : datetime nullable
created_at  : datetime
updated_at  : datetime
```

#### Entité `MessageThread`
```
id          : int (PK)
workspace   : Workspace (FK)
contact     : Contact (FK, nullable)
channel     : enum(whatsapp, email)
subject     : string nullable
last_message_at : datetime
unread_count: int (calculé)
status      : enum(open, archived)
created_at  : datetime
updated_at  : datetime
```

---

## 🔌 Endpoints API Symfony à créer

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/messages` | Liste messages avec filtres |
| POST | `/api/messages/send` | Envoyer WhatsApp ou Email |
| GET | `/api/messages/threads` | Fils de discussion |
| GET | `/api/messages/threads/{id}` | Messages d'un fil |
| POST | `/api/messages/threads/{id}/read` | Marquer comme lu |
| POST | `/api/webhooks/whatsapp` | Webhook Evolution API |
| POST | `/api/webhooks/email` | Webhook email entrant |

### Services Symfony à créer
- `WhatsAppService` : Wrapper Evolution API (localhost:8080)
- `EmailService` : Wrapper Symfony Mailer (SMTP)

---

## 🎨 Composants React à créer

### Page principale
- `app/dashboard/messages/page.tsx` — Layout Unified Inbox

### Composants
- `components/messaging/ChannelFilter.tsx` — Sidebar filtres canal
- `components/messaging/MessageList.tsx` — Liste des conversations
- `components/messaging/MessageThread.tsx` — Panneau de conversation
- `components/messaging/ComposeMessage.tsx` — Zone de saisie / formulaire
- `components/messaging/MessageBubble.tsx` — Bulle de message individuelle

### Hooks React Query
- `useMessageThreads(filters)` — Liste des fils
- `useMessageThread(id)` — Messages d'un fil
- `useSendMessage()` — Envoyer un message
- `useMarkThreadRead(id)` — Marquer comme lu

---

## 🔄 Flux d'intégration

### WhatsApp (Evolution API)
1. Message reçu → Evolution API → webhook `POST /api/webhooks/whatsapp`
2. API Symfony parse le payload → crée `Message` (direction: in)
3. Cherche le contact par numéro → associe si trouvé
4. Crée ou met à jour le `MessageThread`
5. Frontend poll toutes les 10s → affiche nouveau message

### Email (SMTP/IMAP)
1. Envoi : `POST /api/messages/send` (channel: email) → `EmailService` → Symfony Mailer
2. Réception : via webhook ou IMAP poll → crée `Message` (direction: in)
3. Association contact par email
4. Mise à jour thread

---

## 📊 Définition de Terminé (DoD)

- [ ] Entités `Message` et `MessageThread` en base (migration Doctrine)
- [ ] `MessageController` avec tous les endpoints fonctionnels
- [ ] `WhatsAppService` envoie correctement via Evolution API
- [ ] `EmailService` envoie correctement via Symfony Mailer
- [ ] Webhook WhatsApp reçoit et stocke les messages entrants
- [ ] Page `/dashboard/messages` affiche l'Unified Inbox
- [ ] Envoi WhatsApp fonctionne depuis l'interface
- [ ] Envoi Email fonctionne depuis l'interface
- [ ] `php bin/phpunit` passe
- [ ] `npm run build` passe
- [ ] Documentation dans `MESSAGING-IMPLEMENTATION.md`

---

## 🚀 Plan d'implémentation

| Phase | Contenu | Durée estimée |
|-------|---------|---------------|
| Backend — Entités | Message + MessageThread + Migrations | 2h |
| Backend — Services | WhatsAppService + EmailService | 3h |
| Backend — Controllers | MessageController + WebhookController | 3h |
| Frontend — Routing | Page messages + layout | 1h |
| Frontend — Composants | ChannelFilter + MessageList + Thread | 4h |
| Frontend — Compose | ComposeMessage + envoi | 2h |
| Tests & Polish | Build, lint, tests unitaires | 2h |

**Total estimé : ~17h de développement**

---

*Ce PRD a été rédigé par Mira en approche BMAD (Breakthrough Method for Agile Development) le 2026-02-18.*
