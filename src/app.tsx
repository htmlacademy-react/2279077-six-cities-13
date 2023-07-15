import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MainPage } from './pages/main/main-page';
import { FavoritesPage } from './pages/favorites-page/favorites-page';
import { LoginPage } from './pages/login/login-page';
import { OfferPage } from './pages/offer/offer-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { PrivateRoute } from './components/private-route/private-route';
import { AppRoute, AuthorizationStatus } from './const';
import { Preferences } from './const';

export const App = (): JSX.Element => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage placesCount={Preferences.PlacesCount} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <FavoritesPage/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage />}>
          <Route path=':id' element={<OfferPage />}/>
        </Route>
        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);
