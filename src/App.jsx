import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load pages for better performance
const AuthPage = lazy(() => import('./pages/AuthPage'));
const SuccessPage = lazy(() => import('./pages/SuccessPage'));

/**
 * Loading Spinner Component
 */
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0b0f]">
    <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-800 border-t-[#2b4bee] rounded-full animate-spin"></div>
  </div>
);

/**
 * App Component
 * Main application entry point with routing configuration
 * 
 * Routes:
 * - / : Authentication page (login/signup)
 * - /success : Post-auth success page with confetti
 */
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
