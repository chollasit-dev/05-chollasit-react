import { Outlet } from 'react-router';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export function App() {
  return (
    <>
      <Header />
      <main className='bg-zinc-50 pt-20'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
