import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export const NotFoundPage = (): JSX.Element => (
  <>
    <h1>404. Page not found</h1>
    <Link to={AppRoute.Root}>Вернуться на главную</Link>
  </>
);
