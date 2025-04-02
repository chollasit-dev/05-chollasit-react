import { Link } from 'react-router';

export function Header() {
  return (
    <header className='fixed mb-20 w-dvw bg-sky-200 shadow'>
      <div className='mx-auto flex h-20 max-w-7xl items-center justify-center gap-4'>
        <Link
          className='text-xl font-semibold text-sky-800 transition hover:text-sky-600 focus-visible:text-sky-600'
          to={{ pathname: '/' }}
        >
          Home
        </Link>
        <Link
          className='text-xl font-semibold text-sky-800 transition hover:text-sky-600 focus-visible:text-sky-600'
          to={{ pathname: '/user' }}
        >
          Owner
        </Link>
      </div>
    </header>
  );
}
