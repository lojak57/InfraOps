# 🔧 ROUTE STRUCTURE REFACTOR PLAN

## Current Problems Identified

1. **Duplication**: `haul/` and `hauls/` directories
2. **Inconsistent naming**: Some singular, some plural
3. **Unclear hierarchy**: Routes mixed with route groups
4. **Poor organization**: No clear feature separation

## Current Structure Analysis

```
src/routes/
├── +page.svelte                    # Landing page - OK
├── +layout.svelte                  # Root layout - OK
├── (dashboards)/                   # Route group - unclear purpose
│   ├── executive/
│   ├── regional/
│   ├── yard/
│   ├── dispatch/
│   └── driver/
├── modules/                        # ??? - unclear
├── monitoring/                     # SCADA + IoT - OK
├── calibration/                    # Smart AI tuning - OK
├── documents/                      # Compliance - OK
├── fleet/                          # Truck & driver management - OK
├── haul/                          # Single haul view (live monitoring)
├── hauls/                         # Haul history/list - DUPLICATE!
├── master-dispatch/               # Dispatch - POOR NAMING
└── admin/                         # Admin tools - OK
```

## Proposed Clean Structure

```
src/routes/
├── +page.svelte                    # Landing/role selection
├── +layout.svelte                  # Root layout
├── dashboards/                     # Remove parentheses, make clear
│   ├── executive/                  # Executive dashboard
│   ├── regional/                   # Regional manager dashboard
│   ├── site/                       # Site manager (was 'yard')
│   ├── dispatch/                   # Operations control
│   └── driver/                     # Field operator dashboard
├── monitoring/                     # SCADA + IoT real-time data
├── calibration/                    # Smart AI tuning tools
├── fleet/                          # Truck & driver management
├── haul/                          # ALL haul-related functionality
│   ├── +page.svelte               # Haul history/list (from hauls/)
│   ├── live/                      # Live monitoring (from haul/)
│   │   └── +page.svelte
│   └── [id]/                      # Individual haul details
│       └── +page.svelte
├── dispatch/                       # Dispatch operations (consolidate master-dispatch)
├── documents/                      # Compliance & documentation
└── admin/                          # Admin tools
```

## Action Items

### 1. Consolidate Haul Routes
- [x] Keep `haul/` directory
- [x] Move `hauls/+page.svelte` content to `haul/+page.svelte` (list view)
- [x] Move current `haul/+page.svelte` to `haul/live/+page.svelte` (live monitoring)
- [x] Delete `hauls/` directory

### 2. Fix Route Groups
- [x] Remove parentheses from `(dashboards)` → `dashboards`
- [x] Rename `yard` → `site` for clarity

### 3. Consolidate Dispatch
- [x] Rename `master-dispatch` → `dispatch` (move content)

### 4. Clean Up Modules
- [x] Investigate `modules/` directory
- [x] Either integrate into main structure or remove

## Implementation Steps

1. Create new route structure
2. Move files with proper content consolidation
3. Update internal links and imports
4. Test all routes work correctly
5. Remove old directories
6. Update navigation components

## Expected Benefits

- ✅ Single source of truth for hauls
- ✅ Clear feature separation
- ✅ Intuitive navigation hierarchy
- ✅ Easier maintenance
- ✅ Better SEO and URL structure 