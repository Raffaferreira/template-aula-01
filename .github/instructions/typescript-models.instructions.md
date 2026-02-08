---
description: "Data models and type definitions - Transform data between UI and database"
name: "Models_and_Types"
applyTo: "src/models/**/*.ts"
---

# Models & Type Definitions Guidelines

## 🎯 Model Responsibilities
Models handle data transformation and type definitions:
- Transform UI data (Portuguese) to database format (English)
- Define TypeScript interfaces for type safety
- Centralize data structure definitions
- Provide conversion utilities

## 🌍 Naming Convention (CRITICAL)

### Portuguese → English Transformation
**UI Layer (Portuguese)** → **Database Layer (English)**

| Frontend (PT) | Backend (EN) | Type |
|---------------|--------------|------|
| `entregador` | `delivery_driver` | Object |
| `enderecos` | `addresses` | Array |
| `modoRota` | `route_mode` | String |
| `coordenadas` | `coordinates` | Object |
| `estabelecimento` | `establishment` | Object |

All transformation happens in model files (e.g., `DeliveryRouteModel.ts`).

## 🔧 Implementation Patterns

### Type Definitions Structure
Create separate `.types.ts` files for complex domains:
```typescript
// delivery-route.types.ts

// Database types (English)
export interface DeliveryDriver {
  id?: string;
  name: string;
  phone: string;
  email?: string;
}

export interface DeliveryAddress {
  street: string;
  number: string;
  city: string;
  state: string; // MUST be 2 characters
  zip_code: string;
  lat: number;   // REQUIRED
  lng: number;   // REQUIRED
}

export interface DeliveryRoute {
  code: string;
  driver_id: string;
  route_mode: 'sequential' | 'random' | 'proximity';
  status: 'pending' | 'in_progress' | 'completed';
}

// UI types (Portuguese)
export interface EntregadorUI {
  nome: string;
  telefone: string;
  email?: string;
}

export interface EnderecoUI {
  rua: string;
  numero: string;
  cidade: string;
  estado: string;
  cep: string;
  lat?: number;
  lng?: number;
}
```

### Model Transformation Functions
```typescript
// DeliveryRouteModel.ts
export class DeliveryRouteModel {
  // Transform UI data to database format
  static generateDeliveryRouteModel(uiData: any): DeliveryRouteDB {
    return {
      // Driver (entregador → delivery_driver)
      delivery_driver: {
        name: uiData.entregador.nome,
        phone: uiData.entregador.telefone,
        email: uiData.entregador.email
      },
      
      // Addresses (enderecos → addresses)
      addresses: uiData.enderecos.map((addr: EnderecoUI) => ({
        street: addr.rua,
        number: addr.numero,
        city: addr.cidade,
        state: (addr.estado || 'SP').substring(0, 2).toUpperCase(), // CRITICAL
        zip_code: addr.cep,
        lat: addr.lat,
        lng: addr.lng
      })),
      
      // Route mode
      route_mode: uiData.modoRota || 'sequential',
      
      // Generate unique route code
      code: this.generateRouteCode()
    };
  }
  
  // Utility functions
  private static generateRouteCode(): string {
    return `ROUTE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
```

## 🚨 Critical Field Validations

### State Field (2 Characters)
```typescript
// ALWAYS truncate to 2 characters
state: (address.estado || 'SP').substring(0, 2).toUpperCase()
```

### GPS Coordinates (Required)
```typescript
// Validate coordinates exist
if (!address.lat || !address.lng) {
  throw new Error('GPS coordinates required (lat/lng)');
}
```

### Phone Normalization
```typescript
// Normalize phone format
phone: phoneNumber.replace(/\D/g, '') // Remove non-digits
```

## 📋 Type Safety Rules

### Use Explicit Types
```typescript
// ✅ Correct - Explicit types
function transformAddress(addr: EnderecoUI): DeliveryAddress {
  return {
    street: addr.rua,
    // ...
  };
}

// ❌ Wrong - Any type
function transformAddress(addr: any): any {
  // No type safety
}
```

### Use Type Guards
```typescript
// Type guard for runtime checks
function isValidAddress(addr: any): addr is DeliveryAddress {
  return (
    typeof addr.street === 'string' &&
    typeof addr.lat === 'number' &&
    typeof addr.lng === 'number' &&
    addr.state.length === 2
  );
}
```

### Use Enums for Fixed Values
```typescript
// Route status enum
export enum RouteStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Route mode enum
export enum RouteMode {
  SEQUENTIAL = 'sequential',
  RANDOM = 'random',
  PROXIMITY = 'proximity'
}
```

## 🔗 Integration Points

### Service Layer
Models are used by services to transform data:
```typescript
// In DeliveryRouteService.ts
const dbModel = DeliveryRouteModel.generateDeliveryRouteModel(uiData);
const result = await DeliveryRouteRepository.insert(dbModel);
```

### Repository Layer
Repositories receive typed models:
```typescript
// In DeliveryRouteRepository.ts
async insert(data: DeliveryRouteDB): Promise<RepositoryResponse<Route>> {
  // Data already in correct format
}
```

## 📚 Key Models Reference
- `delivery-route.types.ts` - 20+ interfaces for delivery system
- `notification.types.ts` - Notification service types
- `DeliveryRouteModel.ts` - Data transformation utilities

## 🔗 Related Instructions
- Read: `.github/instructions/typescript-services.instructions.md`
- Read: `.github/instructions/typescript-repositories.instructions.md`

## 📖 Extended Documentation
- See: `./readers/DELIVERY_ROUTE_IMPLEMENTATION.md` for complete model architecture
