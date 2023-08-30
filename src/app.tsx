import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainPage from './pages/main/main-page';
import FavoritesPage from './pages/favorites-page/favorites-page';
import LoginPage from './pages/login/login-page';
import OfferPage from './pages/offer/offer-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { PrivateRoute } from './components/private-route/private-route';
import { AppRoute, AuthorizationStatus } from './const';
import { useAppSelector, useAppDispatch } from './components/hooks';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import { fetchOffersAction, fetchFavoritesAction, checkAuthAction } from './store/api-actions';
import { useEffect } from 'react';
import { getAuthorizationStatus } from './store/user-process/user-process.selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffersAction());
  }, [dispatch]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, authorizationStatus]);

  return(
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
              <MainPage />
            }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferPage />}
          />
          <Route
            path={AppRoute.NotFound}
            element={<NotFoundPage />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
