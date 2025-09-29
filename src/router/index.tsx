import { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import appRoutes from './appRoutes';

// Loading component for Suspense fallback
const PageLoader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      gap: '16px',
    }}
  >
    <Spin size="large" />
    <div>Loading...</div>
  </div>
);

const AppRouter = () => {
  if (!nprogress.isStarted()) nprogress.start();

  useEffect(() => {
    nprogress.done();
  });

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {appRoutes.map((route) => (
            <Route
              path={route.path}
              element={<route.component />}
              key={route.path}
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
