---
description: "Data access layer - Supabase queries and database operations"
name: "Repositories_Layer"
applyTo: "src/repository/**/*.ts"
---

# Repository Layer Guidelines

## 🎯 Repository Responsibilities
Repositories handle ALL database interactions via Supabase. They:
- Execute queries with proper error handling
- Respect database constraints and relationships
- Follow transaction order for multi-table inserts
- Return typed responses with success/error states

## 🗄️ Database Architecture

### Supabase Client
- Import: `import { supabase } from './supabase/supabaseClient';`
- Environment: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Schema: 10+ tables (see `supabase/*.sql`)

### Critical Database Constraints
1. **`delivery_drivers.phone`**: UNIQUE (used for conflict detection)
2. **`delivery_addresses.state`**: VARCHAR(2) - **MUST truncate to 2 chars**
3. **`delivery_routes.code`**: UNIQUE route identifier

## 🔧 Implementation Rules

### Transaction Order (Multi-Table Inserts)
**CRITICAL**: Follow this exact order to respect foreign key relationships:
```typescript
1. delivery_drivers (check existing first with SELECT)
2. delivery_routes
3. delivery_addresses (bulk insert)
4. establishment_addresses
5. route_waypoints (bulk)
6. route_geometry
7. delivery_notifications (bulk)
8. route_statistics
9. route_tracking_events (bulk)
10. route_receipts
```

### State Field Truncation
**ALWAYS** truncate state to 2 characters:
```typescript
state: (address.estado || 'SP').substring(0, 2).toUpperCase()
```

### Driver Upsert Pattern
**PROBLEM**: `upsert()` with `ignoreDuplicates: false` overwrites ALL fields.

**SOLUTION**: Manual SELECT before INSERT:
```typescript
const { data: existingDriver } = await supabase
  .from('delivery_drivers')
  .select('*')
  .eq('phone', phone)
  .single();

if (!existingDriver) {
  await supabase.from('delivery_drivers').insert({ name, phone });
}
// Use existingDriver.id or newly inserted id
```

### Response Structure
```typescript
interface RepositoryResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### Error Handling
```typescript
try {
  const { data, error } = await supabase.from('table').insert(values);
  
  if (error) {
    console.error('🗄️ [Repository] Database error:', error);
    return { success: false, error: error.message };
  }
  
  console.log('✅ [Repository] Insert successful');
  return { success: true, data };
} catch (error) {
  console.error('❌ [Repository] Unexpected error:', error);
  return { success: false, error: error.message };
}
```

### Logging Convention
```typescript
console.log('🗄️ [Repository] Inserting driver...');
console.log('✅ [Repository] Query successful');
console.error('❌ [Repository] Database error:', error);
```

## 🚨 Known Issues & Solutions

### Issue #1: State Field Too Long
**Error**: `value too long for type character varying(2)`
**Fix**: Always `.substring(0, 2)` on state field

### Issue #2: Driver Data Overwrite
**Error**: Existing driver name/phone changed unexpectedly
**Fix**: Use manual SELECT + conditional INSERT (see pattern above)

### Issue #3: Foreign Key Violations
**Error**: `violates foreign key constraint`
**Fix**: Follow transaction order (drivers → routes → addresses → etc.)

## 📚 Key Repositories Reference
- `DeliveryRouteRepository.ts` - 10-step delivery route transaction
- `supabaseClient.ts` - Centralized Supabase client configuration

## 🔗 Related Instructions
- Read: `.github/instructions/typescript-services.instructions.md`
- Read: `.github/instructions/typescript-validators.instructions.md`

## 📖 Extended Documentation
- See: `./readers/DATABASE_STRUCTURE.md` for complete database schema
- See: `supabase/rls_policies.sql` for Row Level Security policies
