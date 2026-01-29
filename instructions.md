# Project Guide: Frontend Implementation (React PWA)

**Role:** Senior Frontend Developer specializing in Mobile-First PWAs  
**Goal:** Build a "Duolingo-style" habit tracker with gamification  
**Stack:** React (Vite), TypeScript, Tailwind CSS, Framer Motion, React Query, Vite PWA Plugin

---

## Phase 1: Project Initialization & Configuration

**Objective:** Set up the development environment and design system foundation.

### 1.1 Project Scaffolding
- [x] Create Vite project: `npm create vite@latest habit-hero -- --template react`
- [x] Navigate to project: `cd habit-hero`
- [x] Install core dependencies:
  ```bash
  npm install framer-motion clsx tailwind-merge @tanstack/react-query lucide-react canvas-confetti
  ```
- [x] Install dev dependencies:
  ```bash
  npm install -D vite-plugin-pwa tailwindcss postcss autoprefixer
  ```
- [x] Initialize Tailwind: `npx tailwindcss init -p`
- [x] Convert to TypeScript:
  ```bash
  npm install -D typescript @types/react @types/react-dom @types/node
  ```
- [x] Create TypeScript config files (tsconfig.json, tsconfig.app.json, tsconfig.node.json)
- [x] Convert files to TypeScript (.tsx → .tsx, .js → .ts)
- [x] Create `src/vite-env.d.ts` for asset type declarations

### 1.2 Tailwind Configuration
- [x] Install `@tailwindcss/postcss` plugin for Tailwind v4:
  ```bash
  npm install -D @tailwindcss/postcss
  ```
- [x] Update `postcss.config.js`:
  ```js
  export default {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  }
  ```
- [x] Configure theme in `src/index.css` using Tailwind v4's `@theme` directive:
  ```css
  @import "tailwindcss";

  @theme {
    --color-brand-green: #58cc02;
    --color-brand-green-dark: #46a302;
    --color-brand-green-light: #89e219;
    --color-brand-gray: #e5e5e5;
    --color-brand-gray-dark: #afafaf;
    --color-brand-gray-light: #f7f7f7;
    --color-brand-orange: #ff9600;
    --color-brand-orange-dark: #ea8200;
    --color-brand-red: #ff4b4b;
    --color-brand-red-dark: #ea2b2b;
    --color-brand-blue: #1cb0f6;
    --color-brand-text: #4b4b4b;
    --color-brand-text-light: #777777;

    --font-family-sans: 'Nunito', system-ui, sans-serif;

    --shadow-tactile: 0 4px 0 0 currentColor;
    --shadow-tactile-sm: 0 2px 0 0 currentColor;

    --animate-bounce-in: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    --animate-shake: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
  }

  @keyframes bounceIn {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes shake {
    10%, 90% { transform: translateX(-1px); }
    20%, 80% { transform: translateX(2px); }
    30%, 50%, 70% { transform: translateX(-4px); }
    40%, 60% { transform: translateX(4px); }
  }
  ```

> [!NOTE]
> Tailwind CSS v4 uses CSS-based configuration with the `@theme` directive instead of JavaScript config files. Custom colors use kebab-case (e.g., `bg-brand-gray-light` instead of `bg-brand-grayLight`).

### 1.3 Google Fonts Setup
- [x] Add Nunito font to `index.html`:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
  ```

### 1.4 Base Styles
- [x] Update `src/index.css` with Tailwind directives and base styles:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    body {
      @apply bg-brand-grayLight text-brand-text font-sans;
    }
  }
  ```

---

## Phase 2: Core "Tactile" UI Components

**Objective:** Build reusable, animated components with a 3D tactile feel.

### 2.1 TactileButton Component
- [x] Create `src/components/ui/TactileButton.tsx`
- [x] Implement 3D button with shadow that "sinks" on press
- [x] Add variants: `primary` (green), `secondary` (gray), `danger` (red), `success` (blue)
- [x] Props: `variant`, `onClick`, `children`, `disabled`, `className`, `size` (sm, md, lg)
- [x] Use Framer Motion: `whileTap={{ y: 4 }}` and shadow adjustment
- [x] Add sound effect hook (optional): `useSound()` for tactile feedback

**Implementation Notes:**
- Use absolute positioning for shadow layer
- Transition shadow height from 4px to 0px on tap
- Add `active:` state for non-JS fallback

### 2.2 HabitNode Component
- [x] Create `src/components/habit/HabitNode.tsx` (Converted to .tsx)
- [x] Fixed size: `w-20 h-20` (80px) circular button
- [x] Implement three states:
  - [x] **Completed:** Green background, checkmark icon (Lucide `Check`)
  - [x] **Pending:** Gray background, habit icon or `Circle` icon
  - [x] **Locked:** Reduced opacity (50%), `Lock` icon
- [x] Add hover effect: scale(1.05)
- [x] Add tap animation: scale(0.95)
- [x] Props: `habit`, `onClick`, `isLocked`, `isCompleted`

### 2.3 ProgressRing Component
- [x] Create `src/components/ui/ProgressRing.tsx`
- [x] SVG-based circular progress indicator
- [x] Props: `progress` (0-100), `size`, `strokeWidth`, `color`
- [x] Animate stroke-dashoffset with Framer Motion
- [x] Use for streak display and monthly progress

### 2.4 StreakFlame Component
- [x] Create `src/components/ui/StreakFlame.tsx`
- [x] Display flame icon (`Flame` from Lucide) with streak count
- [x] Animate flame with pulse effect when streak increases
- [x] Props: `streakCount`, `isActive`

---

## Phase 3: Layout & Navigation

**Objective:** Create the mobile-first layout structure and navigation.

### 3.1 MobileLayout Component
- [x] Create `src/layouts/MobileLayout.tsx`
- [x] Container: `max-w-md mx-auto min-h-screen bg-white relative`
- [x] Implement fixed top bar:
  - [x] Left: App logo/title
  - [x] Center: Monthly progress ring
  - [x] Right: Streak flame
- [x] Implement fixed bottom navigation:
  - [x] Home icon (`Home`)
  - [x] Leaderboard icon (`Trophy`)
  - [x] Profile icon (`User`)
- [x] Add safe area padding for mobile devices
- [x] Main content area with `pb-20 pt-16` for fixed nav spacing

### 3.2 Dashboard Page - "The Path"
- [x] Create `src/pages/Dashboard.tsx`
- [x] Vertical flex column layout
- [x] Map through habits array
- [x] Render `HabitNode` for each habit
- [x] Implement zig-zag pattern:
  - Even items: `ml-auto mr-10`
  - Odd items: `mr-auto ml-10`
- [x] Add connecting path SVG between nodes (optional)
- [x] Use Framer Motion `staggerChildren` for sequential entrance animation
- [x] Add scroll animations (fade in on scroll)

### 3.3 Additional Pages (Placeholders)
- [x] Create `src/pages/Leaderboard.tsx` (placeholder)
- [x] Create `src/pages/Profile.tsx` (placeholder)
- [x] Create `src/pages/HabitDetail.tsx` (for editing habits)

---

## Phase 4: Modals & Interactions

**Objective:** Build interactive modals for habit logging and feedback.

### 4.1 LogHabitModal Component
- [x] Create `src/components/modals/LogHabitModal.tsx`
- [x] Slide-up animation from bottom (Framer Motion)
- [x] Display habit details
- [x] Add "Complete" button with confetti effect
- [x] Add "Skip" option
- [x] Add notes input (optional)
- [x] Close on backdrop click or ESC key

### 4.2 Confetti Effect
- [x] Create `src/hooks/useConfetti.ts`
- [x] Use `canvas-confetti` library
- [x] Trigger on habit completion
- [x] Customize colors to match brand palette

### 4.3 Toast Notifications
- [x] Create `src/components/ui/Toast.tsx`
- [x] Success, error, and info variants
- [x] Auto-dismiss after 3 seconds
- [x] Slide in from top
- [x] Use context for global toast management

---

## Phase 5: State Management & Data Layer

**Objective:** Set up React Query for data fetching and state management.

### 5.1 React Query Setup
- [x] Create `src/lib/queryClient.ts`
- [x] Configure QueryClient with default options:
  ```js
  {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 30, // 30 minutes
        refetchOnWindowFocus: false,
      },
    },
  }
  ```
- [x] Wrap `App.tsx` in `QueryClientProvider`

### 5.2 Mock API Layer
- [x] Create `src/api/habits.ts` with mock functions:
  - [x] `fetchHabits()` - Returns array of habit objects
  - [x] `fetchHabitById(id)` - Returns single habit
  - [x] `logHabit(id, date)` - Marks habit as complete
  - [x] `updateHabit(id, data)` - Updates habit details
  - [x] `deleteHabit(id)` - Removes habit
- [x] Mock data structure:
  ```js
  {
    id: 1,
    title: 'Drink Water',
    icon: 'droplet',
    color: '#1CB0F6',
    frequency: 'daily',
    status: 'pending', // 'pending' | 'completed' | 'locked'
    streak: 5,
    completedDates: ['2026-01-27', '2026-01-26'],
  }
  ```

### 5.3 Custom Hooks
- [x] Create `src/hooks/useHabits.ts` - Fetch all habits
- [x] Create `src/hooks/useLogHabit.ts` - Mutation for logging habits
- [x] Create `src/hooks/useStreakData.ts` - Calculate streak information
- [x] Create `src/hooks/useMonthlyProgress.ts` - Calculate monthly completion rate

### 5.4 Local Storage Persistence
- [x] Create `src/utils/storage.ts` helper
- [x] Implement `saveToLocalStorage()` and `loadFromLocalStorage()`
- [x] Sync React Query cache with localStorage
- [x] Handle data migration for schema changes

---

## Phase 6: PWA Configuration

**Objective:** Transform the app into a Progressive Web App with offline support.

### 6.1 Vite PWA Plugin Configuration
- [x] Update `vite.config.js`:
  ```js
  import { VitePWA } from 'vite-plugin-pwa'

  export default defineConfig({
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'Habit Hero - Daily Habit Tracker',
          short_name: 'Habit Hero',
          description: 'Track your daily habits with gamification',
          theme_color: '#58CC02',
          background_color: '#FFFFFF',
          display: 'standalone',
          orientation: 'portrait',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                }
              }
            }
          ]
        }
      })
    ]
  })
  ```

### 6.2 PWA Assets
- [x] Generate app icons (192x192, 512x512) using a tool like [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator)
- [x] Add icons to `public/` folder
- [x] Create `public/favicon.ico`
- [x] Create `public/apple-touch-icon.png`

### 6.3 Service Worker
- [x] Service worker auto-generated by Vite PWA plugin
- [x] Test offline functionality
- [x] Add update notification when new version available

---

## Phase 7: Push Notifications (Optional)

**Objective:** Implement push notifications for habit reminders.

### 7.1 Push Notification Hook
- [x] Create `src/hooks/useNotifications.ts`
- [x] Implement `requestPermission()` function
- [x] Implement `sendNotification()` function
- [x] Handle permission states (granted, denied, default)
- [x] Add VAPID keys configuration (will need backend)

### 7.2 UI Integration
- [x] Add "Enable Reminders" button to Profile settings
- [x] Show permission status (Enabled/Disabled)
- [x] Add "Test Notification" button for debugging

### 7.3 Scheduled Reminders (Local)
- [x] Implement simple reminder logic (e.g., check last login)
- [x] Trigger notification if user hasn't logged habit by 8 PM

---

## Phase 8: Animations & Polish

**Objective:** Add delightful micro-interactions and animations.

### 8.1 Page Transitions
- [x] Install `framer-motion` AnimatePresence
- [x] Add page transition animations
- [x] Implement slide transitions for modal

### 8.2 Habit Completion Animation
- [x] Confetti explosion on habit completion
- [x] Success sound effect (optional)
- [x] Haptic feedback on mobile (Vibration API)
- [x] Streak milestone celebrations (special confetti at 7, 30, 100 days)

### 8.3 Loading States
- [x] Create `src/components/ui/Skeleton.tsx` for loading states
- [x] Add shimmer effect
- [x] Use in Dashboard while habits are loading

### 8.4 Empty States
- [x] Create `src/components/ui/EmptyState.tsx`
- [x] Design for "No habits yet" state
- [x] Add illustration or icon
- [x] CTA button to create first habit

---

## Phase 9: Backend Integration

**Objective:** Replace mock data with real API calls.

### 9.1 API Client Setup
- [ ] Create `src/lib/apiClient.ts` using `fetch`
- [ ] Configure base URL from environment variables
- [ ] Add request/response interceptors
- [ ] Handle authentication tokens (if applicable)

### 9.2 Environment Configuration
- [ ] Create `.env.local` file
- [ ] Add `VITE_API_BASE_URL` variable
- [ ] Add `VITE_VAPID_PUBLIC_KEY` for push notifications
- [ ] Document required environment variables in README

### 9.3 Update API Functions
- [ ] Update `src/api/habits.js` to use real endpoints
- [ ] Replace mock data with actual API calls
- [ ] Handle error responses
- [ ] Add retry logic for failed requests

### 9.4 Authentication (if required)
- [ ] Implement login/signup flow
- [ ] Store JWT tokens securely
- [ ] Add token refresh logic
- [ ] Protect routes that require authentication

---

## Phase 10: Testing & Quality Assurance

**Objective:** Ensure app reliability and performance.

### 10.1 Unit Testing Setup
- [ ] Install Vitest: `npm install -D vitest @testing-library/react @testing-library/jest-dom`
- [ ] Configure `vitest.config.ts`
- [ ] Write tests for utility functions
- [ ] Write tests for custom hooks

### 10.2 Component Testing
- [ ] Test `TactileButton` component
- [ ] Test `HabitNode` component
- [ ] Test `ProgressRing` component
- [ ] Aim for >80% coverage on critical components

### 10.3 E2E Testing (Optional)
- [ ] Install Playwright: `npm install -D @playwright/test`
- [ ] Write E2E test for habit completion flow
- [ ] Write E2E test for navigation

### 10.4 Performance Optimization
- [ ] Run Lighthouse audit
- [ ] Optimize bundle size (code splitting)
- [ ] Lazy load routes with `React.lazy()`
- [ ] Optimize images (use WebP format)
- [ ] Add performance monitoring (Web Vitals)

### 10.5 Accessibility Audit
- [ ] Test keyboard navigation
- [ ] Add ARIA labels to interactive elements
- [ ] Ensure color contrast meets WCAG AA standards
- [ ] Test with screen reader (NVDA/JAWS/VoiceOver)

---

## Phase 11: Deployment

**Objective:** Deploy the application to production.

### 11.1 Build Configuration
- [ ] Test production build: `npm run build`
- [ ] Verify build output in `dist/` folder
- [ ] Test production build locally: `npm run preview`

### 11.2 Hosting Setup
- [ ] Choose hosting platform (Vercel, Netlify, Cloudflare Pages)
- [ ] Connect GitHub repository
- [ ] Configure build settings
- [ ] Set environment variables in hosting platform

### 11.3 Domain & SSL
- [ ] Configure custom domain (optional)
- [ ] Ensure HTTPS is enabled
- [ ] Test PWA installation on mobile device

### 11.4 Monitoring
- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Set up analytics (Google Analytics, Plausible)
- [ ] Monitor Core Web Vitals

---

## Additional Features (Future Enhancements)

### Gamification
- [ ] Add XP/points system
- [ ] Implement achievement badges
- [ ] Create leaderboard with friends
- [ ] Add habit difficulty levels

### Social Features
- [ ] Share streak on social media
- [ ] Add friends and compare progress
- [ ] Create habit challenges
- [ ] Community habit templates

### Advanced Habit Tracking
- [ ] Custom habit frequencies (weekly, specific days)
- [ ] Habit categories and tags
- [ ] Habit statistics and insights
- [ ] Data export (CSV, JSON)

### Customization
- [ ] Theme customization (colors, icons)
- [ ] Dark mode support
- [ ] Custom habit icons
- [ ] Personalized motivational quotes

---

## Copilot Prompt Examples

Use these prompts to accelerate development:

### Components
```
"Create the TactileButton component using Framer Motion. It should have a 3D effect with a shadow that disappears when pressed. Support primary, secondary, and danger variants using the brand colors from tailwind.config.js."
```

```
"Build the HabitNode component as a circular button (80px). It should show three states: completed (green with checkmark), pending (gray with icon), and locked (50% opacity with lock icon). Add hover and tap animations."
```

### Layout
```
"Create the Dashboard page with a vertical path layout. Map through habits and render HabitNode components in a zig-zag pattern (alternating left/right margins). Add staggered entrance animations using Framer Motion."
```

```
"Build the MobileLayout component with a fixed top bar (showing streak and monthly progress) and a fixed bottom navigation bar (Home, Leaderboard, Profile icons). The main content should scroll between them."
```

### Hooks & Logic
```
"Write the usePushNotifications hook. It should request permission, subscribe the user using the Push API, and send the subscription object to the backend. Handle errors gracefully."
```

```
"Create a useConfetti hook that triggers canvas-confetti with brand colors when a habit is completed. Add special effects for streak milestones (7, 30, 100 days)."
```

### Animations
```
"Add a confetti explosion animation when a user completes a habit. Use canvas-confetti with green and orange colors from the brand palette. Also trigger haptic feedback on mobile devices."
```

---

## Resources & References

### Design Inspiration
- [Duolingo Mobile App](https://www.duolingo.com/)
- [Habitica](https://habitica.com/)
- [Streaks App](https://streaksapp.com/)

### Documentation
- [Vite Documentation](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Query](https://tanstack.com/query/latest)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [Web Push Notifications](https://web.dev/push-notifications-overview/)

### Tools
- [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator)
- [Lucide Icons](https://lucide.dev/)
- [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)