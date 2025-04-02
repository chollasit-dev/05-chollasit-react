import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export function Owner() {
  return (
    <>
      <Header />
      <main className='bg-zinc-50 py-16'>
        <section className='mx-auto grid min-h-[calc(100dvh-4rem-5rem)] place-content-center gap-16 py-20'>
          <div className='mx-auto max-w-7xl space-y-8 text-center *:mx-auto'>
            <h1 className='text-wrap text-center text-5xl font-medium'>
              Chin - GenMate D, Final Group Project 3 - 05
            </h1>
            <img src='https://placehold.co/600x400' alt='' />
            <p className='text-semibold'>Short Biography</p>
            <p className='max-w-prose'>
              Hello, I'm Chin! I'm now a learner in JSD9 bootcamp program. I
              don't know whether I like React or not. But now I'm looking for
              learning backend.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
