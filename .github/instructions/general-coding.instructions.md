---
applyTo: "**"
---
# Project general coding standards

1. Use OOOP principles where applicable, SOLID, DRY and any best practice you know of softwate development
2. Don't mix models, logics, rules, contexts, instructions, validations into a single file, please follow strictly rule 1.
3. Always separate concerns, layers, domains and contexts.
4. Always write code thinking about future maintenance, scalability and performance.
5. Always check ./github/instructions/copywriting.instructions.md for copywriting standards and best practices with text content management to be used in the project.
6. Avoid change lines of code out of scope unless of course you are fixing something or adding a new feature, always try to keep the diff as small as possible.



## (IMPORTANT) - Read Always When Creating, Implementing, Developing Something New
## Importantes Additional Files to Context
1. Read `./react-components.instructions.md` for React specific coding standards and best practices.
2. Read `./react-pages.instructions.md` for page structure and routing guidelines.
3. Read `./typescript-models.instructions.md` for TypeScript model definitions and usage.
4. Read `./typescript-repositories.instructions.md` for data access layer standards.
5. Read `./typescript-services.instructions.md` for service layer implementation details.
6. Read `./typescript-validators.instructions.md` for validation logic and patterns.
7. Read `./watermark.instructions.md` for watermarking guidelines and implementation.
8. Read `./documentation.instructions.md` for documentation standards and practices.


## Naming Conventions
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (_)
- Use ALL_CAPS for constants

## Error Handling
- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Always log errors with contextual information

## Critical First Read
- `NOTAS_DESENVOLVIMENTO.md` contains essential context, known issues, and architectural decisions. But, please if you are going to contribute to the project, read it first! 

## Dependency Injection Development (TSyringe)
- ⚠️ **MANDATORY**: This project USES TSyringe for dependency injection
- ✅ **ALWAYS import**: `import { injectable, inject, container } from 'tsyringe';`
- ✅ **ALWAYS use** `@injectable()` decorator on services, validators, and repositories
- ✅ **ALWAYS use** `@inject(ClassName)` for constructor parameters
- ✅ **ALWAYS register** dependencies before using: `container.register(Class, { useClass: Class })`
- ✅ **ALWAYS resolve** in components: `const service = container.resolve(ServiceClass);`
- ✅ **Example**:
  ```typescript
  // ✅ CORRECT - Service with DI
  import { injectable, inject } from 'tsyringe';
  
  @injectable()
  export class UserService {
    constructor(
      @inject(UserValidator) private validator: UserValidator,
      @inject(UserRepository) private repository: UserRepository
    ) {}
  }
  
  // ✅ CORRECT - Component usage
  import { container } from 'tsyringe';
  
  // Register dependencies
  container.register(UserValidator, { useClass: UserValidator });
  container.register(UserRepository, { useClass: UserRepository });
  container.register(UserService, { useClass: UserService });
  
  const MyComponent = () => {
    const userService = container.resolve(UserService);
    // ... use service
  }
  ```
- ⚠️ **IMPORTANT**: `reflect-metadata` must be imported at the top of `main.tsx`
- 📚 **Reference**: [TSyringe GitHub](https://github.com/microsoft/tsyringe)

## Internalization i8n Development
- All text constants are in `src/constants/texts/SUMMARY.md` and should be expanded to support multiple languages, in preferences use (pt-br, en-us, es-es). 
- Use a structure that allows easy addition of new languages and lazy loading. And also read the `src/constants/texts/README.md` for more details and examples.

## Components Structure Text 
- Use i8n text constants from `src/constants/texts/` for all user-facing text in components, following the established patterns. Don't hardcode any text directly in JSX or TSX files. Always use the text constants!

## ⚠️ CRITICAL: Pre-Commit Validation Checklist
Before declaring any implementation as "complete" or "functional", you MUST:

1. **Verify package.json dependencies**
   - Run: `grep -n "package_name" package.json` to check if library exists
   - If missing, DO NOT use that library - find alternative or native implementation

2. **Check compilation errors**
   - ALWAYS run `get_errors` tool on ALL modified files before confirming completion
   - Fix ALL errors and warnings before declaring success
   - Do NOT rely on TypeScript LSP alone - Next.js may have runtime import errors

3. **Verify imports exist**
   - Check that all imported modules/libraries are actually installed
   - Verify file paths are correct and files exist
   - Confirm external libraries are in package.json dependencies

4. **Test in development server**
   - If possible, ask user to run `npm run dev` to verify no runtime errors
   - Watch for Vite import resolution errors
   - Check browser console for errors

5. **Document assumptions**
   - If you assume a library is available, explicitly state it
   - Ask user to confirm library availability before implementation
   - Suggest `npm install` commands for missing dependencies

## 🚫 NEVER Do This (False Negative Prevention)
- ❌ Say "0 errors found" without running `get_errors` tool on ALL affected files
- ❌ Import libraries without checking package.json first
- ❌ Use decorators (@injectable, @component) without verifying framework support
- ❌ Assume TypeScript features work without checking tsconfig.json
- ❌ Declare "ready for production" without compilation validation
- ❌ Ignore Vite/Webpack import resolution differences from TypeScript

## ✅ ALWAYS Do This (Quality Assurance)
- ✅ Run `get_errors` on every file you create or modify
- ✅ Search package.json before importing any external library
- ✅ Ask user about project setup if unclear (DI container? Testing framework?)
- ✅ Check terminal/build logs for hidden errors or console warnings
- ✅ Check runtime behavior in dev server when possible and report any issues 
- ✅ Validate imports/exports resolve correctly in both TypeScript and runtime bundler
- ✅ Validate TypeScript config (tsconfig.json) supports used features
- ✅ Validate runtime behavior in dev server when possible
- ✅ Provide fallback native implementations when libraries are missing
- ✅ Re-run `get_errors` after fixes to confirm resolution
- ✅ Be honest about limitations: "I cannot verify X without Y"