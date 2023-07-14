import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Helmet } from 'react-helmet-async';

export const NotFoundPage = (): JSX.Element => (
  <>
    <Helmet>
      <title>Страница не найдена</title>
    </Helmet>
    <h1>404. Page not found</h1>
    <Link to={AppRoute.Root}>Вернуться на главную</Link>
  </>
);
