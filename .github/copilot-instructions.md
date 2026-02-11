# GitHub Copilot Instructions - Futuro Entrega Landing


## Base Directory - Check for Any Reference
- Root directory of the repository: `G:\OneDrive\Documentos\GitHub\futuro-entrega-landing\src\`
- Root directory of the repository: `G:\OneDrive\Documentos\GitHub\futuro-entrega-landing\`


## Language Response
- Always answer in Portuguese (Brazil) (PT-BR)

##  Project Overview

React 18 + TypeScript with NextJS delivery route management system with Supabase backend, Mapbox integration, Bootstrap 5 UI, and multi-language support (pt-BR/en/es) to support websocket access, webhook and api access.


##  Database Project
- Supabase backend with PostgreSQL database, Row Level Security (RLS), and RESTful API access. Check MCP Supabase Server for configuration details.


## NextJS Documentation 
- NextJS official docs: https://nextjs.org/docs
- React official docs: https://reactjs.org/docs/getting-started.html
- TypeScript official docs: https://www.typescriptlang.org/docs/
- Supabase official docs: https://supabase.com/docs
- Mapbox official docs: https://docs.mapbox.com/
- Bootstrap 5 official docs: https://getbootstrap.com/docs/5.0/getting
- Tailwind CSS official docs: https://tailwindcss.com/docs
- React Bootstrap official docs: https://react-bootstrap.github.io/getting-started/introduction/


##  Critical Documentation (READ FIRST)

**Note**: All documentation, guide, examples and finished with extension *.md files in `readers/` follow chronological naming (`{number} - {NAME}.md`) where number 1 = oldest, 49 = newest. This provides visual history of documentation evolution. In doubt, check directory listing order for chronology `ls -v readers/` or `dir /o:n readers\` on Windows or see `.github/instructions/documentation.instructions.md`

##  Architecture Overview

**Layered Architecture:** Service  Validator  Repository  Database

```
UI Component (React)

Service Layer (.ts)           Business logic, error handling, toast notifications

Validator Layer (.ts)         Pre-transaction validation (errors block, warnings alert)

Repository Layer (.ts)        Supabase queries, data access

Supabase Database            PostgreSQL with RLS policies (10+ tables)
```

**Key Pattern**: ALWAYS validate before persisting. Service calls `Validator.validateAll(data)` and blocks on errors.

##  Contextual Instructions (Auto-Applied)

The following instruction files are **automatically loaded** based on which file you''re editing:

| File Pattern | Instruction File | Purpose |
|-------------|------------------|---------|
| `src/services/**/*.ts` | `typescript-services.instructions.md` | Business logic, DI, error handling |
| `src/validators/**/*.ts` | `typescript-validators.instructions.md` | Pre-transaction validation rules |
| `src/repository/**/*.ts` | `typescript-repositories.instructions.md` | Database queries, Supabase patterns |
| `src/models/**/*.ts` | `typescript-models.instructions.md` | Type definitions, data transformation |
| `src/components/**/*.{tsx,jsx}` | `react-components.instructions.md` | Reusable UI, Bootstrap 5, i18n |
| `src/pages/**/*.{tsx,jsx}` | `react-pages.instructions.md` | Full pages, auth, routing |
| `docs/**/*.md`, `readers/**/*.md` | `documentation.instructions.md` | Documentation writing standards, file naming |
| `**` (all files) | `general-coding.instructions.md` | Universal coding standards |
| `src/**/*.{ts,tsx,js,jsx}` | `watermark.instructions.md` | File header watermark |

**How it works**: GitHub Copilot automatically applies instructions based on the `applyTo` glob pattern in the YAML front matter.

---

##  Core Development Principles

### 1. File Extensions (STRICTLY ENFORCED)
- **`.ts`** - Services, validators, repositories, models, utils (TypeScript only)
- **`.tsx/.jsx`** - React components with visual elements
- **NEVER use `.js`** for new files - Migrate existing `.js` to `.ts` when editing

### 2. Internationalization (i18n) - MANDATORY
- **NEVER hardcode text** - Always use constants from `src/constants/i18n/` or `src/constants/texts/`
- **Languages**: `pt-BR` (primary), `en-US`, `es-ES`
- **Guides**: `src/constants/texts/README.md`, `./readers/MENU_I18N_GUIDE.md`

### 3. Dependency Injection
- **Use TSyringe** for services, validators, repositories
- **Pattern**: `@injectable()` decorator for testability
- **Reference**: [TSyringe GitHub](https://github.com/microsoft/tsyringe)

### 4. UI Framework Rules
- **Bootstrap 5** (PRIMARY) - Dashboard pages and components
- **Tailwind CSS** (SECONDARY) - Specific utility components only
- **NEVER mix both** in same component
- **Responsive Design MANDATORY** - Test all breakpoints: xs (<576px), sm (576px), md (768px), lg (992px), xl (1200px)
- **Logic into UI**: Don't add logic into componentes UI files

### 5. Data Naming Convention
- **UI Layer**: Portuguese (`entregador`, `enderecos`, `modoRota`)
- **Database Layer**: English (`delivery_driver`, `addresses`, `route_mode`)
- **Transformation**: Happens in `src/models/` (e.g., `DeliveryRouteModel.ts`)

---

##  Critical Database Constraints

1. **`delivery_addresses.state`**: VARCHAR(2) - **ALWAYS truncate**: `state.substring(0, 2).toUpperCase()`
2. **GPS Coordinates**: `lat` and `lng` are **REQUIRED** - Validate before save
3. **`delivery_drivers.phone`**: UNIQUE - Use manual SELECT before INSERT to avoid overwrites
4. **Transaction Order**: Follow 10-step sequence in `DeliveryRouteRepository.ts` (drivers  routes  addresses  ...)

---

##  Development Workflow

### Commands
```bash
npm run dev          # Vite dev server on :3001
npm run build        # Production build (obfuscated)
npm run build:dev    # Development build (no obfuscation)
npm run lint         # ESLint check
```

### Environment Variables (.env)
```ini
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
VITE_MAPBOX_TOKEN=pk.eyJxxx...  # 100k free geocoding requests/month
VITE_ENCRYPTION_KEY=xxx         # For crypto-js
```

### Hot Reload Issues
Restart `npm run dev` if validation/TypeScript changes don''t reflect (Vite caching).

---

##  Mapbox Integration

### Geocoding Priority (1  2  3)
1. **ViaCEP** - Brazilian postal codes (free, no key)
2. **Nominatim** - OpenStreetMap (free, 1 req/sec)
3. **Mapbox** - Most accurate (100k free/month, requires token)

### Route Modes
- `sequential` - Deliver in order added
- `random` - Shuffle delivery order
- `proximity` - Optimize by distance (requires `startingAddress`)

**Key Component**: `src/components_dashboard/child/DeliveryRouteWizard.jsx`

---

##  Logging Convention

Use emoji-prefixed logs for easy console filtering:

```javascript
console.log('' [Service] Operation...'');      // Service layer
console.log('' [Validator] Validating...'');   // Validator layer
console.log('' [Repository] Inserting...'');   // Repository layer
console.log('' [Layer] Success!'');            // Success
console.error('' [Layer] Error:'', error);     // Errors
console.warn('' [Layer] Warning:'', warning);  // Warnings
```

---

##  Security & Authentication

- **Row Level Security**: `supabase/rls_policies.sql`
- **Auth Context**: `src/contexts/AuthContext.jsx`
- **RBAC**: `PERMISSIONS` and `ROLES` in `src/constants/roles.ts`
- **Component Guards**: `<CanView permission="delivery.create">`
- **Guides**: `./readers/AUTHENTICATION_SYSTEM.md`, `./readers/AUTHORIZATION_GUIDE.md`

---

##  Integration Points

- **SMS (Twilio)**: `src/services/NotificationService.ts`
- **WhatsApp (Twilio)**: `src/services/NotificationServiceWhatsApp.ts`
- **SMS (SMSDev)**: `src/services/NotificationServiceSMSDev.ts`
- **WebSocket**: Live tracking (`websocket-server.js`)
- **Mapbox GL**: Interactive maps (`mapbox-gl` library)
- **Supabase Realtime**: Database subscriptions

---

##  TypeScript Migration Progress

###  Completed (11 files)
**Core Delivery System:**
- `DeliveryRouteModel.ts`, `DeliveryRouteRepository.ts`, `DeliveryRouteService.ts`, `DeliveryRouteValidator.ts`

**Type Definitions:**
- `delivery-route.types.ts`, `notification.types.ts`

**Notification Services:**
- `NotificationServiceSMSDev.ts`, `NotificationServiceMetaWhatsApp.ts`, `DeliveryNotificationService.ts`

**Utilities:**
- `dashboardRoutes.ts`, `generateRoutePDF.ts`

###  Pending (34 files)
**Priority**: `roles.js`, `usePermissions.js`, `useTranslation.js`, `useLanguage.js`, `navlinkMigration.js`
**i18n Constants**: 26 files in `src/constants/i18n/` and `src/constants/texts/`

###  Migration Guidelines
1. Create types in `./models/` for complex interfaces
2. Use `import type` for type-only imports
3. Add return type annotations to all functions
4. Use TypeScript enums for fixed values
5. Test with `get_errors` tool after conversion

## Markdown Generation
1. Don't forget to update the "Last Updated" date at the bottom of this file after changes
2. Add these markdown files in directory `../readers` for future auto-application based on file patterns
3. Don't create markdown files in the root workspace directory

###  Code Completion Checklist (MANDATORY)
After ANY code change:
1. Run `get_errors` on modified files
2. Fix ALL TypeScript errors (imports, types, runtime issues)
3. Verify no red squiggly lines in IDE
4. Confirm all function signatures have return types
5. Run `get_errors` again to confirm clean state

**NEVER** consider a task complete until ALL compilation errors are resolved.

---

**Last Updated**: November 19, 2025
**Project Status**:  Validation layer implemented, TypeScript migration in progress (11/45 files)
