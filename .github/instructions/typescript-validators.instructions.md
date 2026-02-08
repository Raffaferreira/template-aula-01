---
description: "Validation layer - Pre-transaction data validation with errors and warnings"
name: "Validators_Layer"
applyTo: "src/validators/**/*.ts"
---

# Validator Layer Guidelines

## 🎯 Validator Responsibilities
Validators ensure data integrity BEFORE database operations. They:
- Check required fields and data formats
- Validate business rules (e.g., GPS coordinates required)
- Return structured errors (block operation) and warnings (alert user)
- Never modify data - only validate

## 📐 Validation Result Structure
```typescript
interface ValidationResult {
  isValid: boolean;
  errors: Array<{ field: string; message: string }>;
  warnings: Array<{ field: string; message: string }>;
}
```

**CRITICAL**: `isValid: false` MUST block database operations.

## 🔧 Implementation Rules

### Validation Methods Pattern
```typescript
class MyValidator {
  // Individual field validators
  static validateField(value: any): ValidationError[] { }
  
  // Aggregate validation
  static validateAll(data: any): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    
    // Validate all fields
    errors.push(...this.validateField(data.field));
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}
```

### Critical Validations

#### GPS Coordinates (MANDATORY)
```typescript
if (!address.lat || !address.lng) {
  errors.push({
    field: 'coordinates',
    message: 'Coordenadas GPS não encontradas (lat/lng)'
  });
}
```

#### State Field (2 characters MAX)
```typescript
if (state && state.length > 2) {
  errors.push({
    field: 'state',
    message: 'Estado deve ter 2 caracteres (ex: SP, RJ)'
  });
}
```

### Logging Convention
```typescript
console.log('🔍 [Validator] Starting validation...');
console.log('✅ [Validator] Validation passed');
console.warn('⚠️ [Validator] Warning:', warning);
console.error('❌ [Validator] Validation failed:', errors);
```

## 🚨 Common Pitfalls
1. **Don't modify data** - Validators only validate, never transform
2. **Errors vs Warnings** - Errors block, warnings alert
3. **Check GPS coordinates** - Always validate lat/lng existence
4. **State truncation** - Validate 2-char limit for Brazilian states
5. **Return early on errors** - Don't continue validation if critical errors found

## 📚 Key Validators Reference
- `DeliveryRouteValidator.ts` - Main delivery route validation
  - `validateDriver()` - Driver data validation
  - `validateAddresses()` - GPS coordinates and address format
  - `validateRouteData()` - Route mode and configuration
  - `validateAll()` - Aggregate validation method

## 🔗 Related Instructions
- Read: `.github/instructions/typescript-services.instructions.md`
- Read: `.github/instructions/typescript-repositories.instructions.md`

## 📖 Extended Documentation
- See: `./readers/VALIDATION_LAYER_GUIDE.md` for complete validation architecture
