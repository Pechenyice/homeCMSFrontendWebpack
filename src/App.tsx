import './App.css';
import { Preloader } from 'components';
import { useAuth } from 'hooks';
import { lazy, Suspense } from 'react';
// import AdministratorApp from 'apps/AdministratorApp';
// import ClientApp from 'apps/ClientApp';

const ClientApp = lazy(() => import('apps/ClientApp'));
const AdministratorApp = lazy(() => import('apps/AdministratorApp'));

function App() {
  const { isAdmin } = useAuth();

  return (
    <>
      <Suspense fallback={<Preloader />}>
        {isAdmin ? <AdministratorApp /> : <ClientApp />}
      </Suspense>
    </>
  );
}

export default App;
