# 📊 CRM SAAS - ANALYSE PROJET & PLAN D'ACTION COMPLET

**Date:** 2025-12-02
**Projet:** CRM Backoffice Frontend
**Branch:** `claude/crm-saas-frontend-roadmap-01SNDLCzKqpc83WuSv2DRru9`
**Backend API:** Symfony 7.2 CRM-API

---

## 🎯 SITUATION ACTUELLE

### ✅ CE QUI EXISTE DÉJÀ (Template SaaS)

Le projet actuel est un **template SaaS Dashboard complet** avec :

#### Infrastructure Technique
- ✅ Next.js 15 + TypeScript
- ✅ 50+ composants UI (Shadcn/ui)
- ✅ Tailwind CSS + Dark Mode
- ✅ React Query + Zustand
- ✅ Authentification NextAuth.js (OAuth GitHub/Google)
- ✅ Base de données Prisma (PostgreSQL) + Mongoose (MongoDB)
- ✅ Internationalisation (EN/FR)
- ✅ Stripe intégré
- ✅ Testing setup (Vitest + Playwright)
- ✅ Git hooks + Linting

#### Pages & Features Existantes
```
✅ /dashboard (home)
✅ /dashboard/users (gestion utilisateurs)
✅ /dashboard/analytics (charts)
✅ /dashboard/settings (profil, sécurité, préférences)
✅ /dashboard/billing (abonnements)
✅ /dashboard/orders (e-commerce)
✅ /dashboard/products (catalogue)
✅ /dashboard/projects (projets)
✅ /dashboard/organizations (tenants)
✅ /login, /register
✅ /pricing, /features, /about
```

#### Composants Réutilisables
- ✅ DataTable avec tri/filtres/pagination
- ✅ Forms avec validation Zod
- ✅ Layout (Sidebar, Navbar, UserMenu)
- ✅ Theme switcher
- ✅ Language switcher
- ✅ Toast notifications
- ✅ Dialogs, Modals, Sheets
- ✅ Avatars, Badges, Cards

---

### ⚠️ LE PROBLÈME : DÉCALAGE FONCTIONNEL

**Le template actuel est un SaaS E-commerce**
**La roadmap demande un CRM**

#### Ce qui manque pour un CRM :
❌ Module Contacts
❌ Module Entreprises/Companies
❌ Module Deals (opportunités commerciales)
❌ Pipeline Kanban (drag & drop)
❌ Module Activités (calls, emails, meetings, tasks)
❌ Calendrier des activités
❌ Timeline d'interactions
❌ Gestion des tags
❌ Import/Export contacts CSV
❌ Propriétés custom
❌ Search global avec Command Palette (⌘K)
❌ Intégration API Symfony backend

#### Ce qui doit être retiré/adapté :
🔄 Module E-commerce (Orders, Products, Cart, Checkout)
🔄 Module Projects (peut rester mais à adapter)
🔄 Module Organizations (à adapter pour multi-tenant CRM)
🔄 Billing (à adapter pour plans CRM)

---

## 🎯 STRATÉGIE DE DÉVELOPPEMENT

### Option A : **ADAPTER LE TEMPLATE** (Recommandé ✅)
**Durée estimée : 6-8 semaines**

#### Avantages :
- ✅ Infrastructure solide déjà en place
- ✅ Auth et layout prêts
- ✅ Composants réutilisables
- ✅ Moins de temps de setup
- ✅ Code moderne et testé

#### Inconvénients :
- ⚠️ Besoin de retirer du code e-commerce
- ⚠️ Besoin d'adapter le schéma de BDD
- ⚠️ Intégration API Symfony à faire

#### Plan d'action :
1. **Phase 1 (Semaine 1)** : Cleanup & Configuration
   - Retirer modules e-commerce
   - Configurer API Symfony
   - Setup environnement

2. **Phase 2 (Semaines 2-3)** : Modules Core CRM
   - Contacts
   - Entreprises
   - Deals

3. **Phase 3 (Semaine 4)** : Pipeline & Activités
   - Kanban board
   - Calendrier
   - Timeline

4. **Phase 4 (Semaines 5-6)** : Features Avancées
   - Import/Export
   - Search global
   - Tags & propriétés custom

5. **Phase 5 (Semaines 7-8)** : Polish & Tests
   - Optimisations
   - Tests E2E
   - Déploiement

---

### Option B : **REPARTIR FROM SCRATCH** (Non recommandé ❌)
**Durée estimée : 12-14 semaines**

Suivre la roadmap originale mais :
- ❌ Refaire tout le setup
- ❌ Recréer tous les composants
- ❌ Reconfigurer auth, i18n, etc.
- ❌ Perte de temps sur des choses déjà faites

**Verdict : Pas optimal, le template existant est trop avancé pour être ignoré**

---

## 📋 TODO COMPLET - OPTION A (RECOMMANDÉE)

### 🔴 PHASE 0 : CLEANUP & SETUP (Semaine 1 - Jours 1-2)

#### Jour 1 : Configuration Environnement
- [ ] **Setup Environnement**
  - [ ] Copier `.env.example` → `.env`
  - [ ] Créer base PostgreSQL : `crm_backoffice`
  - [ ] Créer cluster MongoDB ou utiliser MongoDB Atlas
  - [ ] Générer `NEXTAUTH_SECRET` : `openssl rand -base64 32`
  - [ ] Configurer URL API Symfony dans `.env`
    ```bash
    NEXT_PUBLIC_API_URL="http://localhost:8000/api"
    SYMFONY_API_URL="http://localhost:8000/api"
    ```

- [ ] **Installer Dépendances**
  ```bash
  pnpm install
  pnpm db:generate
  ```

- [ ] **OAuth Setup (Optionnel pour MVP)**
  - [ ] Créer GitHub OAuth App
  - [ ] Créer Google OAuth credentials
  - [ ] Ajouter credentials au `.env`

#### Jour 2 : Cleanup E-commerce
- [ ] **Retirer Modules E-commerce**
  - [ ] Supprimer `/app/[locale]/(dashboard)/orders`
  - [ ] Supprimer `/app/[locale]/(dashboard)/products`
  - [ ] Supprimer `/app/[locale]/(marketing)/shop`
  - [ ] Supprimer `/app/[locale]/(marketing)/cart`
  - [ ] Supprimer `/app/[locale]/(marketing)/checkout`
  - [ ] Supprimer `/app/api/products`
  - [ ] Supprimer `/app/api/orders`
  - [ ] Supprimer `/app/api/cart`
  - [ ] Supprimer `/app/api/checkout`
  - [ ] Supprimer `/app/api/inventory`

- [ ] **Nettoyer Prisma Schema**
  - [ ] Commenter/retirer models : `Product`, `Category`, `Cart`, `CartItem`, `Order`, `OrderItem`, `InventoryMovement`
  - [ ] Garder : `User`, `Account`, `Session`, `Organization`, `Membership`, `Subscription`, `Event`

- [ ] **Nettoyer Navigation**
  - [ ] Éditer `/components/layout/sidebar.tsx`
  - [ ] Retirer liens e-commerce
  - [ ] Préparer structure menu CRM

---

### 🔴 PHASE 1 : INTÉGRATION API SYMFONY (Semaine 1 - Jours 3-5)

#### Jour 3 : API Client & Types
- [ ] **Créer Client API Symfony**
  - [ ] Créer `/lib/api/symfony-client.ts`
    ```typescript
    import axios from 'axios';

    const apiClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercepteur JWT
    apiClient.interceptors.request.use((config) => {
      const token = localStorage.getItem('symfony_jwt_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Intercepteur refresh token
    apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Gérer 401, refresh token, retry
        return Promise.reject(error);
      }
    );

    export default apiClient;
    ```

- [ ] **Créer Types TypeScript pour Entities**
  - [ ] `/types/contact.ts`
    ```typescript
    export interface Contact {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      position?: string;
      company?: Company;
      tags: Tag[];
      createdAt: string;
      updatedAt: string;
    }
    ```
  - [ ] `/types/company.ts`
  - [ ] `/types/deal.ts`
  - [ ] `/types/activity.ts`
  - [ ] `/types/pipeline.ts`
  - [ ] `/types/tag.ts`

#### Jour 4 : Auth Integration Symfony
- [ ] **Adapter Auth pour Symfony API**
  - [ ] Créer `/lib/api/auth.ts`
    ```typescript
    export async function loginSymfony(email: string, password: string) {
      const response = await apiClient.post('/auth/login', { email, password });
      const { token, refresh_token, user } = response.data;

      // Stocker tokens
      localStorage.setItem('symfony_jwt_token', token);
      localStorage.setItem('symfony_refresh_token', refresh_token);

      return user;
    }
    ```
  - [ ] Créer hook `useSymfonyAuth()`
  - [ ] Adapter pages login/register pour appeler Symfony API

- [ ] **Décision Architecture Auth**
  - Option 1 : NextAuth.js + Custom Credentials Provider (appel Symfony)
  - Option 2 : Auth custom avec JWT Symfony uniquement
  - Option 3 : Hybrid (NextAuth pour OAuth, Symfony pour credentials)

#### Jour 5 : Test API Connection
- [ ] **Tester Endpoints Symfony**
  - [ ] `POST /auth/login`
  - [ ] `POST /auth/register`
  - [ ] `GET /auth/me`
  - [ ] `POST /auth/refresh`
  - [ ] Créer page de test `/debug/api-test`

- [ ] **React Query Setup**
  - [ ] Vérifier `/components/providers/query-provider.tsx`
  - [ ] Configuration cache
  - [ ] Configuration refetch

---

### 🔴 PHASE 2 : MODULE CONTACTS (Semaine 2 - Jours 1-5)

#### Jour 1 : Schema Prisma & Routes
- [ ] **Adapter Prisma Schema (si nécessaire)**
  - [ ] Décider : Utiliser Prisma pour cache local OU tout en Symfony ?
  - [ ] Si cache local : créer models `Contact`, `Company` dans Prisma
  - [ ] Sinon : skip, tout passe par API Symfony

- [ ] **Créer Routes Pages**
  - [ ] `/app/[locale]/(dashboard)/contacts/page.tsx` (liste)
  - [ ] `/app/[locale]/(dashboard)/contacts/[id]/page.tsx` (détail)
  - [ ] `/app/[locale]/(dashboard)/contacts/import/page.tsx` (import)

#### Jour 2 : Page Liste Contacts
- [ ] **Composant ContactsTable**
  - [ ] Créer `/components/tables/contacts-table.tsx`
  - [ ] Utiliser composant `DataTable` existant
  - [ ] Colonnes : Avatar, Nom, Email, Téléphone, Entreprise, Tags, Actions
  - [ ] Tri par colonne
  - [ ] Pagination
  - [ ] Loading skeleton

- [ ] **Barre Actions**
  - [ ] Bouton "Nouveau contact"
  - [ ] Search bar
  - [ ] Filtres (entreprise, tags, manager)
  - [ ] Export CSV

#### Jour 3 : Modal Création Contact
- [ ] **Dialog "Nouveau Contact"**
  - [ ] Créer `/components/contacts/contact-dialog.tsx`
  - [ ] Formulaire React Hook Form + Zod
  - [ ] Champs : Prénom*, Nom*, Email*, Téléphone, Entreprise, Poste, Source, Tags, Manager
  - [ ] Upload photo (avatar)
  - [ ] Validation
  - [ ] Gestion erreurs

- [ ] **API Integration**
  - [ ] Hook `useCreateContact()`
  - [ ] Appel `POST /contact/create`
  - [ ] Toast success/error
  - [ ] Invalidate cache React Query

#### Jour 4 : Page Détail Contact
- [ ] **Header Détail**
  - [ ] Avatar grande taille
  - [ ] Nom + titre + entreprise
  - [ ] Tags
  - [ ] Boutons : Éditer, Supprimer

- [ ] **Tabs Navigation**
  - [ ] Utiliser composant `Tabs` shadcn
  - [ ] Tabs : Aperçu, Activités, Deals, Fichiers, Notes

- [ ] **Tab Aperçu**
  - [ ] Card Informations
  - [ ] Card Entreprise liée
  - [ ] Card Statistiques (nb deals, valeur totale)

#### Jour 5 : Hooks & Polish
- [ ] **React Query Hooks**
  - [ ] `useContacts(filters)` - `POST /contact/list`
  - [ ] `useContact(id)` - `GET /contact/show/{id}`
  - [ ] `useCreateContact()` - `POST /contact/create`
  - [ ] `useUpdateContact(id)` - `PUT /contact/edit/{id}`
  - [ ] `useDeleteContact(id)` - `DELETE /contact/delete/{id}`

- [ ] **Tests & Optimisations**
  - [ ] Tester CRUD complet
  - [ ] Optimistic updates
  - [ ] Error handling
  - [ ] Empty states

---

### 🔴 PHASE 3 : MODULE ENTREPRISES (Semaine 2-3 - Jours 1-3)

#### Jour 1 : Page Liste Entreprises
- [ ] **Route & Table**
  - [ ] `/app/[locale]/(dashboard)/companies/page.tsx`
  - [ ] Composant `CompaniesTable`
  - [ ] Colonnes : Logo, Nom, Industrie, Nb Contacts, Nb Deals, Valeur Pipeline
  - [ ] Filtres par industrie, taille

#### Jour 2 : Modal & Détail
- [ ] **Dialog "Nouvelle Entreprise"**
  - [ ] Formulaire : Nom*, Industrie, Site web, Téléphone, Adresse, SIRET, Taille, Logo
  - [ ] Upload logo
  - [ ] Validation

- [ ] **Page Détail**
  - [ ] `/app/[locale]/(dashboard)/companies/[id]/page.tsx`
  - [ ] Header entreprise
  - [ ] Tabs : Aperçu, Contacts, Deals, Activités, Fichiers, Notes

#### Jour 3 : Hooks & API
- [ ] **React Query Hooks**
  - [ ] `useCompanies(filters)` - `POST /company/list`
  - [ ] `useCompany(id)` - `GET /company/show/{id}`
  - [ ] `useCreateCompany()` - `POST /company/create`
  - [ ] `useUpdateCompany(id)` - `PUT /company/edit/{id}`
  - [ ] `useDeleteCompany(id)` - `DELETE /company/delete/{id}`

---

### 🔴 PHASE 4 : MODULE DEALS (Semaine 3 - Jours 4-5 + Semaine 4)

#### Jour 4 : Page Liste & Kanban
- [ ] **Installer react-beautiful-dnd**
  ```bash
  pnpm add @hello-pangea/dnd
  ```

- [ ] **Page Pipeline**
  - [ ] `/app/[locale]/(dashboard)/deals/page.tsx`
  - [ ] Vue Kanban par défaut
  - [ ] Composant `PipelineKanban`
  - [ ] Colonnes = Étapes pipeline (Prospect, Qualification, Proposition, Négociation, Gagné/Perdu)
  - [ ] Cards deals : Nom, Contact/Entreprise, Valeur, Probabilité, Owner, Deadline
  - [ ] Drag & drop entre colonnes

#### Jour 5 : Filtres & Actions
- [ ] **Barre Actions**
  - [ ] Bouton "Nouveau deal"
  - [ ] Select pipeline
  - [ ] Filtres (owner, date, valeur, tags)

- [ ] **Vue Liste Alternative**
  - [ ] Toggle Kanban/Liste
  - [ ] Tableau deals
  - [ ] Tri par valeur, date, étape

#### Semaine 4 Jour 1 : Modal Création Deal
- [ ] **Dialog "Nouveau Deal"**
  - [ ] Champs : Nom*, Contact* (autocomplete), Entreprise (auto), Pipeline*, Étape*, Valeur*, Devise, Probabilité%, Date clôture, Owner, Tags, Description
  - [ ] Validation
  - [ ] API `POST /deal/create`

#### Jour 2 : Page Détail Deal
- [ ] **Page Détail**
  - [ ] `/app/[locale]/(dashboard)/deals/[id]/page.tsx`
  - [ ] Header : Nom, Valeur, Étape, Probabilité (progress bar)
  - [ ] Boutons : Éditer, Marquer gagné ✓, Marquer perdu ✗, Supprimer
  - [ ] Sections : Infos, Progression pipeline (stepper), Participants, Notes, Activités, Fichiers

#### Jour 3 : Hooks & Actions
- [ ] **React Query Hooks**
  - [ ] `useDeals(filters)` - `POST /deal/list`
  - [ ] `useDeal(id)` - `GET /deal/show/{id}`
  - [ ] `useCreateDeal()` - `POST /deal/create`
  - [ ] `useUpdateDeal(id)` - `PUT /deal/edit/{id}`
  - [ ] `useChangeDealStep()` - changer étape
  - [ ] `useWinDeal(id)` - marquer gagné
  - [ ] `useLoseDeal(id)` - marquer perdu
  - [ ] `useDeleteDeal(id)` - `DELETE /deal/delete/{id}`

- [ ] **Animation Gagné**
  - [ ] Confetti animation (library `canvas-confetti`)

---

### 🟠 PHASE 5 : MODULE ACTIVITÉS (Semaine 4-5)

#### Jour 4-5 : Page Liste Activités
- [ ] **Page Liste**
  - [ ] `/app/[locale]/(dashboard)/activities/page.tsx`
  - [ ] Tableau activités
  - [ ] Colonnes : Type (icon), Titre, Contact/Entreprise, Date & heure, Owner, Statut
  - [ ] Filtres : Par type, par statut, par owner, par date

#### Semaine 5 Jour 1-2 : Vue Calendrier
- [ ] **Installer react-big-calendar**
  ```bash
  pnpm add react-big-calendar @types/react-big-calendar
  pnpm add date-fns
  ```

- [ ] **Composant Calendar**
  - [ ] Créer `/components/activities/activity-calendar.tsx`
  - [ ] Calendrier mensuel
  - [ ] Activités sur jours
  - [ ] Click jour → modal liste
  - [ ] Drag & drop pour déplacer (optionnel MVP)

#### Jour 3 : Création & Détail
- [ ] **Dialog "Nouvelle Activité"**
  - [ ] Type* (Appel, Email, Meeting, Tâche, Démo)
  - [ ] Titre*, Date & heure*, Durée
  - [ ] Contact (autocomplete), Entreprise, Deal
  - [ ] Owner, Notes, Statut

- [ ] **Page Détail**
  - [ ] `/app/[locale]/(dashboard)/activities/[id]/page.tsx`

#### Jour 4-5 : Hooks & API
- [ ] **React Query Hooks**
  - [ ] `useActivities(filters)` - `POST /activity/list`
  - [ ] `useActivity(id)` - `GET /activity/show/{id}`
  - [ ] `useCreateActivity()` - `POST /activity/create`
  - [ ] `useUpdateActivity(id)` - `PUT /activity/edit/{id}`
  - [ ] `useCompleteActivity(id)` - marquer fait
  - [ ] `useDeleteActivity(id)` - `DELETE /activity/delete/{id}`

---

### 🟠 PHASE 6 : DASHBOARD & ANALYTICS (Semaine 5-6)

#### Jour 1-2 : Stats Cards
- [ ] **Page Dashboard**
  - [ ] Éditer `/app/[locale]/(dashboard)/page.tsx`
  - [ ] 4 Stats Cards :
    - Total contacts (+ évolution %)
    - Total entreprises (+ évolution %)
    - Deals actifs (+ valeur)
    - Taux conversion (+ tendance)
  - [ ] API endpoints ou calculs côté client
  - [ ] Icons colorés (Lucide)
  - [ ] Loading skeletons

#### Jour 3 : Graphiques
- [ ] **Charts Recharts**
  - [ ] Chart : Deals par mois (bar chart)
  - [ ] Chart : Pipeline (funnel chart)
  - [ ] Chart : Sources contacts (pie chart)
  - [ ] Chart : Activités (line chart)

#### Jour 4 : Widgets
- [ ] **Widget Activités Récentes**
  - [ ] Liste 10 dernières activités
  - [ ] Avatar + nom + action + timestamp relatif
  - [ ] Lien vers détail

- [ ] **Widget Deals à Gagner**
  - [ ] Deals proches deadline
  - [ ] Valeur + probabilité
  - [ ] Actions rapides

- [ ] **Widget Tâches du Jour**
  - [ ] Activités du jour
  - [ ] Checkbox completion

#### Jour 5 : API Integration
- [ ] **Hooks Dashboard**
  - [ ] `useDashboardStats()`
  - [ ] `useRecentActivities()`
  - [ ] `useUpcomingDeals()`
  - [ ] `useTodayTasks()`

---

### 🟠 PHASE 7 : FEATURES TRANSVERSALES (Semaine 6)

#### Jour 1-2 : Command Palette (⌘K)
- [ ] **Search Global**
  - [ ] Installer `cmdk` (déjà installé ✅)
  - [ ] Créer `/components/global/command-palette.tsx`
  - [ ] Trigger : ⌘K / Ctrl+K
  - [ ] Recherche temps réel (debounced)
  - [ ] Résultats groupés : Contacts, Entreprises, Deals, Activités
  - [ ] Navigation clavier
  - [ ] Highlight match
  - [ ] Raccourcis actions : "Nouveau contact", "Nouveau deal"

#### Jour 3 : Tags & Pipelines
- [ ] **Page Tags** (`/settings/tags`)
  - [ ] Liste tags
  - [ ] Créer tag (nom + couleur)
  - [ ] Éditer/Supprimer
  - [ ] API `GET /tag/list`, `POST /tag/create`, `PUT /tag/edit/{id}`, `DELETE /tag/delete/{id}`

- [ ] **Page Pipelines** (`/settings/pipelines`)
  - [ ] Liste pipelines
  - [ ] Créer/Éditer pipeline
  - [ ] Gestion étapes (drag & drop)
  - [ ] Probabilités par étape
  - [ ] Couleurs
  - [ ] API pipelines

#### Jour 4 : Upload Fichiers
- [ ] **Upload Component**
  - [ ] Drag & drop zone
  - [ ] Multiple files
  - [ ] Progress bar
  - [ ] Validation taille/type
  - [ ] Preview images

- [ ] **Liste Fichiers**
  - [ ] Grid ou liste
  - [ ] Thumbnail, Nom, Taille, Date
  - [ ] Download, Delete
  - [ ] API upload fichiers

#### Jour 5 : Notes
- [ ] **Installer TipTap (optionnel)**
  ```bash
  pnpm add @tiptap/react @tiptap/starter-kit
  ```

- [ ] **Éditeur Notes**
  - [ ] Rich text editor basique
  - [ ] Auto-save draft
  - [ ] API notes

---

### 🟢 PHASE 8 : IMPORT/EXPORT (Semaine 7)

#### Jour 1-2 : Import CSV
- [ ] **Page Import** (`/contacts/import`)
  - [ ] Upload CSV/Excel
  - [ ] Drag & drop
  - [ ] Template téléchargeable
  - [ ] Preview + mapping colonnes
  - [ ] Options (ignorer doublons)
  - [ ] Progress bar
  - [ ] Rapport erreurs

#### Jour 2-3 : Validation Import
- [ ] **API Validation**
  - [ ] `POST /import/validation/contact/file` - upload & validation
  - [ ] `POST /import/validation/contact/duplicates` - détection doublons
  - [ ] `POST /import/validation/contact/row` - validation ligne
  - [ ] Import final

#### Jour 3-4 : Export
- [ ] **Bouton Export CSV**
  - [ ] Sur page liste contacts/companies/deals
  - [ ] Génération CSV côté client ou API
  - [ ] Download fichier

---

### 🟢 PHASE 9 : SETTINGS & TEAM (Semaine 7)

#### Jour 5 : Page Settings
- [ ] **Page Profil** (`/profile`)
  - [ ] Adapter page existante `/dashboard/settings`
  - [ ] Section Informations : Avatar, Nom, Email, Téléphone, Poste
  - [ ] Section Mot de Passe : Ancien/Nouveau password
  - [ ] Section Préférences : Langue, Fuseau horaire, Format date

- [ ] **Page Équipe** (`/settings/team`)
  - [ ] DataTable utilisateurs (`POST /user/list`)
  - [ ] Créer utilisateur (`POST /user/create`)
  - [ ] Éditer utilisateur (`PUT /user/edit/{id}`)
  - [ ] Supprimer utilisateur (`DELETE /user/delete/{id}`)
  - [ ] Gestion rôles (ROLE_USER, ROLE_MANAGER, ROLE_ADMIN)

---

### 🟢 PHASE 10 : BILLING & ABONNEMENTS (Semaine 8)

#### Jour 1-2 : Page Plans
- [ ] **Page Plans** (`/pricing`)
  - [ ] Adapter page existante
  - [ ] Appeler API Symfony `GET /api/plans/list`
  - [ ] Cards comparatifs plans
  - [ ] Bouton "Choisir ce plan"

#### Jour 2-3 : Page Abonnement
- [ ] **Page Subscription** (`/settings/subscription`)
  - [ ] Affichage plan actuel (`GET /api/subscription/current`)
  - [ ] Date prochaine facturation, Statut
  - [ ] Changer de plan, Annuler, Réactiver
  - [ ] Section Moyens de Paiement (Stripe Elements)
  - [ ] Historique facturation (`GET /api/subscription/billing-history`)

#### Jour 4 : Usage & Quotas
- [ ] **Section Usage** (`/settings/usage`)
  - [ ] `GET /api/subscription/usage`
  - [ ] Barres de progression par quota
  - [ ] Contacts utilisés / max
  - [ ] Entreprises, Deals
  - [ ] Alerte si proche limite

#### Jour 5 : Hooks Billing
- [ ] `usePlans()`
- [ ] `useCurrentSubscription()`
- [ ] `useSubscribe(planCode)`
- [ ] `useChangePlan(planCode)`
- [ ] `useCancelSubscription()`
- [ ] `usePaymentMethods()`
- [ ] `useBillingHistory()`
- [ ] `useUsage()`

---

### 🟢 PHASE 11 : EMAIL VERIFICATION & ONBOARDING (Semaine 8)

#### Jour 1-2 : Email Verification Flow
- [ ] **Page "Vérifiez votre email"** (`/auth/verify-pending`)
  - [ ] Message d'attente
  - [ ] Bouton "Renvoyer l'email" (`POST /auth/resend-verification`)
  - [ ] Timer 60s

- [ ] **Page Vérification** (`/auth/verify/[token]`)
  - [ ] Appel `POST /auth/verify-email`
  - [ ] Animation succès
  - [ ] Redirection

#### Jour 3 : Onboarding
- [ ] **Wizard Onboarding** (`/onboarding`)
  - [ ] Étape 1 : Compléter profil
  - [ ] Étape 2 : Créer premier pipeline
  - [ ] Étape 3 : Importer contacts (optionnel)
  - [ ] Étape 4 : Inviter équipe (optionnel)
  - [ ] Skip possible

---

### 🟢 PHASE 12 : RESPONSIVE & MOBILE (Semaine 9)

#### Jour 1-2 : Mobile Navigation
- [ ] **Responsive Breakpoints**
  - [ ] Vérifier breakpoints Tailwind
  - [ ] Mobile : < 640px
  - [ ] Tablet : 640px - 1024px
  - [ ] Desktop : > 1024px

- [ ] **Mobile Menu**
  - [ ] Adapter sidebar existante
  - [ ] Burger menu (Sheet)
  - [ ] Swipe gestures

#### Jour 2-3 : Mobile Tables
- [ ] **Vue Cartes au lieu de Tableaux**
  - [ ] Contacts cards mobile
  - [ ] Companies cards mobile
  - [ ] Deals cards mobile
  - [ ] Swipe actions (delete, edit)

#### Jour 3-5 : Tests Mobile
- [ ] Tester toutes pages sur mobile
- [ ] Tester formulaires (inputs adaptés)
- [ ] Date pickers natifs
- [ ] Touch-friendly (boutons min 44px)

---

### 🟢 PHASE 13 : PERFORMANCE & OPTIMISATIONS (Semaine 9)

#### Jour 1-2 : Next.js Optimisations
- [ ] **Images**
  - [ ] Utiliser `next/image` partout
  - [ ] Lazy loading
  - [ ] Placeholders

- [ ] **Code Splitting**
  - [ ] Server Components où possible
  - [ ] Client Components minimal
  - [ ] Dynamic imports

#### Jour 2-3 : React Query Optimisations
- [ ] **Config Cache**
  - [ ] Stale time approprié
  - [ ] Cache time
  - [ ] Prefetching strategic
  - [ ] Optimistic updates

- [ ] **Debouncing**
  - [ ] Search inputs
  - [ ] Filter inputs

#### Jour 3-5 : Loading States & Errors
- [ ] **Skeletons Partout**
  - [ ] Tableau contacts, companies, deals
  - [ ] Cards dashboard
  - [ ] Détail pages

- [ ] **Error Boundaries**
  - [ ] Suspense boundaries
  - [ ] Error boundaries
  - [ ] Empty states
  - [ ] Retry logic

---

### 🟢 PHASE 14 : TESTS & QA (Semaine 10)

#### Jour 1-2 : Tests Unitaires
- [ ] **Vitest Tests**
  - [ ] Tests utils
  - [ ] Tests hooks
  - [ ] Tests components

#### Jour 2-3 : Tests E2E
- [ ] **Playwright Tests**
  - [ ] User flow : Login → Dashboard
  - [ ] User flow : Créer contact
  - [ ] User flow : Créer deal
  - [ ] User flow : Changer étape deal
  - [ ] User flow : Marquer deal gagné

#### Jour 3-5 : QA Manual
- [ ] **Checklist QA**
  - [ ] Toutes fonctionnalités
  - [ ] Tous user flows
  - [ ] Cross-browser (Chrome, Firefox, Safari)
  - [ ] Responsive (mobile, tablet, desktop)
  - [ ] Performance (Lighthouse > 90)
  - [ ] Accessibilité (a11y)

---

### 🟢 PHASE 15 : DÉPLOIEMENT (Semaine 10)

#### Jour 1-2 : Vercel Setup
- [ ] **Vercel Configuration**
  - [ ] Créer compte Vercel
  - [ ] Connecter repo GitHub
  - [ ] Variables d'environnement
  - [ ] Domaine custom
  - [ ] SSL

#### Jour 2-3 : CI/CD
- [ ] **GitHub Actions**
  - [ ] Workflow CI : Linter, Tests, Type check, Build
  - [ ] Workflow Deploy : Preview sur PR, Production sur main

#### Jour 3-4 : Monitoring
- [ ] **Vercel Analytics**
- [ ] **Sentry**
  ```bash
  pnpm add @sentry/nextjs
  ```
- [ ] **Google Analytics** (optionnel)

#### Jour 5 : Documentation & Launch
- [ ] **README.md**
  - [ ] Guide installation
  - [ ] Guide configuration
  - [ ] Architecture
  - [ ] API documentation

- [ ] **🚀 LAUNCH MVP**

---

## 📊 RÉSUMÉ DURÉES

| Phase | Focus | Durée | Total |
|-------|-------|-------|-------|
| **Phase 0** | Cleanup & Setup | 2 jours | 2j |
| **Phase 1** | API Symfony Integration | 3 jours | 5j |
| **Phase 2** | Module Contacts | 5 jours | 10j |
| **Phase 3** | Module Entreprises | 3 jours | 13j |
| **Phase 4** | Module Deals | 5 jours | 18j |
| **Phase 5** | Module Activités | 5 jours | 23j |
| **Phase 6** | Dashboard & Analytics | 5 jours | 28j |
| **Phase 7** | Features Transversales | 5 jours | 33j |
| **Phase 8** | Import/Export | 4 jours | 37j |
| **Phase 9** | Settings & Team | 1 jour | 38j |
| **Phase 10** | Billing & Abonnements | 5 jours | 43j |
| **Phase 11** | Email Verification | 3 jours | 46j |
| **Phase 12** | Responsive Mobile | 5 jours | 51j |
| **Phase 13** | Performance | 5 jours | 56j |
| **Phase 14** | Tests & QA | 5 jours | 61j |
| **Phase 15** | Déploiement | 5 jours | 66j |

**Total : 66 jours = ~13 semaines (3 mois)**

Avec **2 développeurs** : ~7 semaines
Avec **1 développeur senior** : ~10 semaines

---

## 🎯 DÉFINITION OF DONE - MVP

Le MVP est considéré **TERMINÉ** quand :

### Fonctionnel ✅
- [ ] Login/Register fonctionne avec API Symfony
- [ ] Dashboard affiche vraies stats depuis API
- [ ] CRUD Contacts 100% opérationnel
- [ ] CRUD Entreprises 100% opérationnel
- [ ] CRUD Deals avec Kanban drag & drop
- [ ] CRUD Activités avec calendrier
- [ ] Search global (⌘K) fonctionne
- [ ] Import CSV contacts fonctionne
- [ ] Profil utilisateur modifiable
- [ ] Gestion équipe (CRUD users)
- [ ] Billing & abonnements Stripe

### Technique ✅
- [ ] 0 erreurs TypeScript
- [ ] 0 erreurs console
- [ ] Tests E2E critiques passent
- [ ] Mobile 100% responsive
- [ ] Lighthouse score > 90
- [ ] Déployé en production (Vercel)
- [ ] Monitoring actif (Sentry)

### UX ✅
- [ ] Toutes pages ont loading states
- [ ] Toutes pages ont empty states
- [ ] Toutes erreurs sont gérées gracieusement
- [ ] Navigation intuitive
- [ ] Formulaires validés
- [ ] Feedbacks visuels (toasts, animations)

---

## 🤔 QUESTIONS STRATÉGIQUES À DISCUTER

### 1. Architecture Auth
**Question** : Utiliser NextAuth.js OU Auth custom avec JWT Symfony ?

**Option A** : NextAuth.js + Custom Credentials Provider
- ✅ OAuth (GitHub/Google) gratuit
- ✅ Session management intégré
- ❌ Complexité double (NextAuth + Symfony)

**Option B** : Auth custom avec JWT Symfony uniquement
- ✅ Simple, un seul système
- ✅ Contrôle total
- ❌ Pas d'OAuth facile
- ❌ Gérer refresh token manuellement

**Recommandation** : Option B pour MVP (plus simple), ajouter OAuth en v2

---

### 2. Base de Données
**Question** : Utiliser Prisma comme cache local OU tout en API Symfony ?

**Option A** : Prisma cache local
- ✅ Lecture rapide
- ✅ Offline possible
- ❌ Sync complexe
- ❌ Duplication données

**Option B** : Tout en API Symfony
- ✅ Simple, source de vérité unique
- ✅ Pas de sync
- ❌ Dépendance réseau
- ❌ Latence API

**Recommandation** : Option B pour MVP (plus simple)

---

### 3. Modules E-commerce
**Question** : Retirer complètement OU garder pour future marketplace ?

**Option A** : Retirer complètement
- ✅ Code propre CRM
- ❌ Perdre du code si besoin futur

**Option B** : Garder mais désactiver
- ✅ Facile de réactiver
- ❌ Code mort dans projet

**Recommandation** : Option A (retirer), créer branche backup avant

---

### 4. Internationalisation
**Question** : Garder i18n (EN/FR) ou simplifier en mono-langue pour MVP ?

**Option A** : Garder i18n
- ✅ Déjà configuré
- ✅ Pro
- ❌ Maintenance traductions

**Option B** : Simplifier en FR uniquement
- ✅ Plus rapide
- ❌ Refaire si besoin international

**Recommandation** : Option A (garder), c'est déjà fait

---

### 5. Multi-Tenant
**Question** : Supporter multi-tenant (Organizations) dès MVP ?

**Option A** : Oui, multi-tenant
- ✅ Modèle SaaS moderne
- ✅ Déjà dans backend
- ❌ Complexité

**Option B** : Non, mono-tenant pour MVP
- ✅ Simple
- ❌ Refactor si besoin

**Recommandation** : Option A (garder), backend le supporte déjà

---

## 🚀 PROCHAINES ÉTAPES IMMÉDIATES

Pour démarrer **aujourd'hui** :

### Étape 1 : Décisions Stratégiques (30 min)
- [ ] Discuter et trancher les 5 questions ci-dessus
- [ ] Valider l'approche "Adapter le template" vs "From scratch"
- [ ] Confirmer durée cible (6-8 semaines ?)

### Étape 2 : Setup Environnement (1h)
- [ ] Copier `.env.example` → `.env`
- [ ] Configurer URL API Symfony
- [ ] Lancer `pnpm install`
- [ ] Vérifier que le projet démarre (`pnpm dev`)

### Étape 3 : Premier Cleanup (2h)
- [ ] Créer branche backup : `git checkout -b backup-ecommerce`
- [ ] Retourner sur branche de travail
- [ ] Supprimer dossiers e-commerce
- [ ] Nettoyer Prisma schema
- [ ] Commit : "chore: remove e-commerce modules"

### Étape 4 : Premier Test API (2h)
- [ ] Créer `/lib/api/symfony-client.ts`
- [ ] Créer types TypeScript de base
- [ ] Créer page `/debug/api-test`
- [ ] Tester `POST /auth/login`
- [ ] Commit : "feat: add Symfony API client"

---

**Total Jour 1 : 5-6h de travail productif**

Après cela, on pourra attaquer Phase 2 (Module Contacts) avec confiance.

---

## 💬 QUESTIONS ?

Avant de commencer, j'aimerais discuter avec vous de :

1. **Timing** : Quel est votre deadline ? MVP en combien de temps ?
2. **Équipe** : Combien de développeurs ? Niveau d'expérience ?
3. **Backend** : L'API Symfony est-elle prête et testée ?
4. **Priorités** : Quelles features sont **critiques** vs **nice-to-have** ?
5. **Design** : Avez-vous une charte graphique ou on garde le template actuel ?

**Répondez à ces questions et on pourra affiner le plan ensemble ! 🚀**
