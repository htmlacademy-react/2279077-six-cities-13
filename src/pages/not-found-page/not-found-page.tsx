import { Link } from 'react-router-dom';

export const NotFoundPage = (): JSX.Element => (
  <>
    <h1>404 Not Found</h1>
    <Link to="/">На главную</Link>
  </>
);
