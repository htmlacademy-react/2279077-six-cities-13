import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { MainPage } from './pages/main/main-page';
import { FavoritesPage } from './pages/favorites-page/favorites-page';
import { LoginPage } from './pages/login/login-page';
import { OfferPage } from './pages/offer/offer-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { AppRoute } from './const';
import { Preferences } from './const';

export const App = (): JSX.Element => (
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
        element={<FavoritesPage />}
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
);
