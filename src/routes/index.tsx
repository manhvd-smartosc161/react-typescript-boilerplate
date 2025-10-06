import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import appRoutes, { AppRoute } from './appRoutes';
import { LayoutWrapper } from '@src/components/layouts';
import { LoadingAtom } from '@src/components/atoms';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {appRoutes.map((route: AppRoute) => {
          const RouteGuard = route.isPrivate ? PrivateRoute : PublicRoute;

          return (
            <Route
              path={route.path}
              element={
                <RouteGuard>
                  <LayoutWrapper layout={route.layout}>
                    <Suspense fallback={<LoadingAtom />}>
                      <route.component />
                    </Suspense>
                  </LayoutWrapper>
                </RouteGuard>
              }
              key={route.path}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
