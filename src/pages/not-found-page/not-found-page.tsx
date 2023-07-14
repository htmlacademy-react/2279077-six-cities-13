import { Link } from 'react-router-dom';

export const NotFoundPage = (): JSX.Element => (
  <>
    <h1>404. Page not found</h1>
    <Link to="/">Вернуться на главную</Link>
  </>
);
