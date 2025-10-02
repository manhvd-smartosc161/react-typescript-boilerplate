import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import appRoutes, { AppRoute } from './appRoutes';
import { LayoutWrapper } from '@src/components/layouts';
import { LoadingAtom } from '@src/components/atoms';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {appRoutes.map((route: AppRoute) => (
          <Route
            path={route.path}
            element={
              <LayoutWrapper layout={route.layout}>
                <Suspense fallback={<LoadingAtom />}>
                  <route.component />
                </Suspense>
              </LayoutWrapper>
            }
            key={route.path}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
