---
description: "React components - Reusable UI elements with Bootstrap 5 and i18n"
name: "React_Components"
applyTo: "src/components/**/*.{tsx,jsx}"
---

# React Components Guidelines

## 🎯 Component Responsibilities
Components are reusable UI elements that:
- Display data and handle user interactions
- Use i18n text constants (NO hardcoded text)
- Follow Bootstrap 5 styling conventions
- Implement responsive design patterns

## 🎨 UI Framework Rules

### Bootstrap 5 (PRIMARY Framework)
**ALWAYS use Bootstrap 5** for dashboard components:
```jsx
// ✅ Correct - Bootstrap classes
<div className="card mb-4">
  <div className="card-body">
    <button className="btn btn-primary">Action</button>
  </div>
</div>

// ❌ Wrong - Tailwind classes
<div className="bg-white rounded-lg shadow p-4">
  <button className="bg-blue-500 text-white px-4 py-2">Action</button>
</div>
```

Common Bootstrap classes: `form-select`, `card`, `badge`, `table`, `btn-primary-600`, `d-flex`, `mb-4`, `col-md-6`

### Tailwind CSS (SECONDARY - Exceptions Only)
Use Tailwind ONLY for:
- Repository example components (`src/repository/supabase/ExampleComponent.tsx`)
- Specific utility components where Bootstrap is insufficient

**NEVER mix Bootstrap and Tailwind in same component.**

## 📱 Responsive Design (MANDATORY)

### Bootstrap Responsive Grid
```jsx
// ✅ Mobile-first responsive columns
<div className="row">
  <div className="col-12 col-md-6 col-lg-4">
    {/* Stacks on mobile, 2 cols on tablet, 3 cols on desktop */}
  </div>
</div>
```

### Responsive Utilities
```jsx
// Show/hide by breakpoint
<div className="d-none d-md-block">Desktop only</div>
<div className="d-block d-md-none">Mobile only</div>

// Responsive spacing
<div className="p-2 p-md-3 p-lg-4">Responsive padding</div>

// Responsive tables
<div className="table-responsive">
  <table className="table">...</table>
</div>
```

### Breakpoints Reference
- `xs`: <576px (mobile)
- `sm`: ≥576px (large mobile)
- `md`: ≥768px (tablet)
- `lg`: ≥992px (desktop)
- `xl`: ≥1200px (large desktop)

## 🌍 Internationalization (CRITICAL)

### Text Constants Usage
**NEVER hardcode text in JSX/TSX files.** Always use i18n constants:

```tsx
// ❌ Wrong - Hardcoded text
<button>Salvar</button>
<p>Erro ao processar</p>

// ✅ Correct - i18n constants
import { BUTTON_TEXTS } from '@/constants/i18n/buttons';
import { ERROR_MESSAGES } from '@/constants/i18n/errors';

<button>{BUTTON_TEXTS.save}</button>
<p>{ERROR_MESSAGES.processingError}</p>
```

### i18n Constants Location
- `src/constants/i18n/**/*.js` - New i18n structure
- `src/constants/texts/**/*.js` - Legacy text constants
- See: `src/constants/texts/README.md` for migration guide

### Supported Languages
- `pt-BR` (Portuguese - Primary)
- `en-US` (English)
- `es-ES` (Spanish)

## 🔧 Component Patterns

### Functional Components with Hooks
```tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  const [state, setState] = React.useState<string>('');
  
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        {/* Component content */}
      </div>
    </div>
  );
};
```

### Toast Notifications
```tsx
import toast from 'react-hot-toast';

// Error notification
toast.error('❌ Error message', { 
  duration: 4000, 
  position: 'top-center' 
});

// Success notification
toast.success('✅ Operation successful');

// Warning notification
toast('⚠️ Warning message', { icon: '⚠️' });
```

## 🚨 Common Pitfalls
1. **Don't hardcode text** - Always use i18n constants
2. **Don't mix frameworks** - Bootstrap 5 for dashboard, Tailwind for exceptions
3. **Don't use fixed widths** - Always use responsive grid system
4. **Don't forget mobile** - Test on mobile breakpoints
5. **Don't inline styles** - Use Bootstrap classes (avoid `paddingRight`, etc.)

## 📚 Key Components Reference
- `DeliveryRouteWizard.jsx` - Multi-step delivery creation wizard
- `MapboxAutocomplete.jsx` - Geocoding with Mapbox API
- `NominatimAutocomplete.jsx` - Geocoding with OpenStreetMap

## 🔗 Related Instructions
- Read: `.github/instructions/react-pages.instructions.md`
- Read: `.github/instructions/general-coding.instructions.md`

## 📖 Extended Documentation
- See: `./readers/MENU_I18N_GUIDE.md` for i18n implementation details
- See: `./readers/AUTOCOMPLETE_GUIDE.md` for geocoding components
