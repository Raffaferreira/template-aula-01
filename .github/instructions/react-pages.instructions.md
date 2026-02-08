---
description: "React pages - Full-page components with routing and authentication"
name: "React_Pages"
applyTo: "src/app/**/*.{tsx,jsx},src/components/**/*.{tsx,jsx}"
---

# React Pages Guidelines

## 🎯 Page Responsibilities
Pages are full-screen route components that:
- Orchestrate multiple child components
- Handle authentication and permissions
- Manage page-level state and data fetching
- Implement responsive layouts for all screen sizes
- Always add id property into html root elements for testing and tracking. To best guide you in this, see examples below.
## 🏗️ Page Structure
```jsx
// ✅ Page root with unique id for testing
<div id="delivery-route-page" className="container-fluid">
  <div className="row">
    <div className="col-12 col-lg-10 mx-auto">
      {/* Page content */}
    </div>
  </div>
</div>
``` 
### **Dashboard Pages**
```jsx
// ✅ Dashboard page with sidebar + content area
<div id="dashboard-page" className="d-flex">
  {/* Sidebar - collapses on mobile */}
  <aside className="sidebar d-none d-lg-block">
    <DashboardMenu />
  </aside>
  
  {/* Main content - full width on mobile */}
  <main className="flex-grow-1 p-3 p-md-4">
    {/* Page content */}
  </main>
</div>
```

## 🔒 Authentication & Authorization

### Route Protection
```tsx
import { CanView } from '@/components/CanView';
import { PERMISSIONS } from '@/constants/roles';

// Protect entire page
export const MyPage = () => (
  <CanView permission={PERMISSIONS.DELIVERY.CREATE}>
    <div className="container">
      {/* Page content */}
    </div>
  </CanView>
);

// Protect specific sections
<CanView permission={PERMISSIONS.ADMIN.VIEW}>
  <AdminPanel />
</CanView>
```

### Authentication Context
```tsx
import { useAuth } from '@/contexts/AuthContext';

const MyPage = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Page content
};
```

## 📱 Responsive Layout (MANDATORY)

### Container Structure
```jsx
// ✅ Responsive page container
<div className="container-fluid">
  <div className="row">
    <div className="col-12 col-lg-10 mx-auto">
      {/* Page content adapts to screen size */}
    </div>
  </div>
</div>
```

### Dashboard Layout
```jsx
// Dashboard pages use sidebar + content area
<div className="d-flex">
  {/* Sidebar - collapses on mobile */}
  <aside className="sidebar d-none d-lg-block">
    <DashboardMenu />
  </aside>
  
  {/* Main content - full width on mobile */}
  <main className="flex-grow-1 p-3 p-md-4">
    {/* Page content */}
  </main>
</div>
```

## 🗺️ Mapbox Integration

### Map Components
```tsx
import mapboxgl from 'mapbox-gl';

// Initialize map with token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-46.6333, -23.5505], // São Paulo
  zoom: 12
});
```

### Geocoding Sources (Priority)
1. **ViaCEP** - Brazilian postal codes (free, no key)
2. **Nominatim** - OpenStreetMap (free, 1 req/sec)
3. **Mapbox** - Most accurate (100k free/month)

## 🎨 UI Framework (Bootstrap 5)

### Page-Level Components
```jsx
// Cards for sections
<div className="card mb-4">
  <div className="card-header">
    <h5 className="card-title mb-0">Section Title</h5>
  </div>
  <div className="card-body">
    {/* Section content */}
  </div>
</div>

// Tables with responsive wrapper
<div className="table-responsive">
  <table className="table table-striped table-hover">
    <thead>
      <tr>
        <th>Column 1</th>
        <th className="d-none d-md-table-cell">Column 2</th>
      </tr>
    </thead>
    <tbody>
      {/* Table rows */}
    </tbody>
  </table>
</div>
```

## 🌍 Internationalization

### Page Text Constants
```tsx
import { PAGE_TITLES } from '@/constants/i18n/pages';
import { NAVIGATION } from '@/constants/i18n/navigation';

// Page title
<h1>{PAGE_TITLES.dashboard}</h1>

// Navigation items
<nav>
  <Link to="/routes">{NAVIGATION.routes}</Link>
</nav>
```

## 🔧 Data Fetching Patterns

### Service Integration
```tsx
import { DeliveryRouteService } from '@/services/DeliveryRouteService';

const MyPage = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await DeliveryRouteService.getAllRoutes();
        if (result.success) {
          setRoutes(result.data);
        } else {
          toast.error('❌ Failed to load data');
        }
      } catch (error) {
        console.error('❌ [Page] Error:', error);
        toast.error('❌ Unexpected error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) return <LoadingSpinner />;
  
  return (
    <div className="container">
      {/* Page content */}
    </div>
  );
};
```

## 🚨 Common Pitfalls
1. **Don't skip authentication checks** - Always protect sensitive pages
2. **Don't forget mobile layout** - Test all breakpoints
3. **Don't hardcode permissions** - Use `PERMISSIONS` constants
4. **Don't block UI on load** - Show loading states
5. **Don't forget error handling** - Always catch and display errors
6. **Don't add logic into UI** - Don't add logic into componentes UI files

## 📚 Key Pages Reference
- `src/pages_dashboard/HeatMapPage.jsx` - Interactive delivery heat map
- `src/pages_dashboard/DeliveryRoutePage.jsx` - Route creation and management
- `src/pages/LoginPage.tsx` - Authentication page

## 🔗 Related Instructions
- Read: `.github/instructions/react-components.instructions.md`
- Read: `.github/instructions/typescript-services.instructions.md`

## 📖 Extended Documentation
- See: `./readers/AUTHENTICATION_SYSTEM.md` for auth implementation
- See: `./readers/AUTHORIZATION_GUIDE.md` for permission system
- See: `./readers/MAPBOX_TOKEN_GUIDE.md` for Mapbox setup
- See: `./readers/DASHBOARD_ROUTES.md` for routing configuration
