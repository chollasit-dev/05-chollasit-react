import { Link, Outlet } from 'react-router';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export function App() {
  return (
    <>
      <Header />
      <main className='bg-zinc-50 py-16'>
        <section className='mx-auto grid min-h-[calc(100dvh-4rem-5rem)] place-content-center gap-16 py-20'>
          <div className='mx-auto max-w-7xl space-y-8'>
            <h1 className='text-wrap text-center text-5xl font-medium'>
              Generation Thailand React Assessment
            </h1>
            <div className='mx-auto grid grid-flow-col place-content-center gap-4'>
              <Link
                className='rounded bg-white px-8 py-4 text-xl font-semibold text-sky-900 shadow-md transition hover:-translate-y-1 hover:bg-sky-50 focus-visible:-translate-y-1 focus-visible:bg-sky-50'
                to={{ pathname: 'user' }}
              >
                User Home Section
              </Link>
              <Link
                className='rounded bg-white px-8 py-4 text-xl font-semibold text-sky-900 shadow-md transition hover:-translate-y-1 hover:bg-sky-50 focus-visible:-translate-y-1 focus-visible:bg-sky-50'
                to={{ pathname: 'admin' }}
              >
                Admin Home Section
              </Link>
            </div>
          </div>
          <Outlet />
        </section>
      </main>
      <Footer />
    </>
  );
}
