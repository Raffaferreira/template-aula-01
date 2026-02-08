---
description: "Business logic layer - Services orchestrate validators and repositories"
name: "Services_Layer"
applyTo: "src/services/**/*.ts"
---

# Service Layer Guidelines

## 🎯 Service Responsibilities
Services orchestrate business logic by coordinating validators and repositories. They handle:
- Business rules and workflows
- Error handling and user feedback (toast notifications)
- Data transformation between UI and database layers
- Transaction coordination

## 📐 Architecture Pattern
```
Service → Validator → Repository → Database
```

**CRITICAL**: Always validate BEFORE calling repository:
```typescript
const validationResult = await Validator.validateAll(data);
if (!validationResult.isValid) {
  toast.error('❌ Validation failed');
  return { success: false, errors: validationResult.errors };
}
```

## 🔧 Implementation Rules

### Dependency Injection
- Use **TSyringe** for dependency injection
- Make services testable with mocked dependencies
- Example: `@injectable()` decorator

### Error Handling
```typescript
try {
  // Business logic
} catch (error) {
  console.error('❌ [Service] Error:', error);
  toast.error('❌ Operation failed');
  return { success: false, error: error.message };
}
```

### Logging Convention
```typescript
console.log('💾 [Service] Starting operation...');
console.log('✅ [Service] Success!');
console.error('❌ [Service] Error:', error);
console.warn('⚠️ [Service] Warning:', warning);
```

### Return Types
Always return structured responses:
```typescript
interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  warnings?: string[];
}
```

## 🚨 Common Pitfalls
1. **Don't skip validation** - Always call validator before repository
2. **Toast every error** - Users need visual feedback
3. **Log with emojis** - Makes console filtering easier
4. **Type everything** - No `any` types allowed
5. **Handle all errors** - Use try/catch for all async operations

## 📚 Key Services Reference
- `DeliveryRouteService.ts` - Main delivery workflow orchestration
- `NotificationService.ts` - Twilio SMS notifications
- `NotificationServiceSMSDev.ts` - SMSDev SMS integration
- `NotificationServiceMetaWhatsApp.ts` - Meta WhatsApp Business API (WABA) integration
- `NotificationServiceWhatsApp.ts` - Twilio WhatsApp notifications

## 🔗 Related Instructions
- Read: `.github/instructions/typescript-validators.instructions.md`
- Read: `.github/instructions/typescript-repositories.instructions.md`
