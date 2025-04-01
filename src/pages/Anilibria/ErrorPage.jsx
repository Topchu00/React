import { useRouteError } from 'react-router-dom';
import { Button } from 'primereact/button';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <h1>Ошибка!</h1>
      <p>{error.statusText || error.message}</p>
      <Button 
        label="Вернуться на главную" 
        onClick={() => window.location = '/'}
      />
    </div>
  );
};

export default ErrorPage;