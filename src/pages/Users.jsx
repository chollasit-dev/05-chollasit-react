import axios from 'axios';
import { useEffect, useState } from 'react';

export function Users() {
  let [members, setMembers] = useState([]);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);

  useEffect(function () {
    let controller = new AbortController();

    async function findAll(url) {
      try {
        let data = await axios.get(url, { signal: controller.signal });
        if (data.status !== 200) throw new Error('Fetch failed!');
        if (!data) throw new Error('Fetch failed!');
        setMembers(data.data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }

    setLoading(true);
    findAll(import.meta.env.VITE_API + 'members');
    setLoading(false);

    return function () {
      controller.abort();
      setError(null);
    };
  }, []);

  if (loading) return <p className='text-center'>Loading...</p>;
  if (error) return <p className='text-center'>Error: {error.message}</p>;

  return (
    <table className='rounded-lg bg-zinc-100 font-medium shadow [&_td]:p-2 [&_th]:p-2'>
      <caption className='pb-2 text-sm'>
        This table won't show a row which has any single empty value.
      </caption>
      <thead>
        <tr className='*:border-b *:border-b-zinc-300'>
          <th>Name</th>
          <th>Last Name</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        {members.map(
          ({ id, name, lastname, position }, i) =>
            name &&
            lastname &&
            position && (
              <tr
                key={id}
                className={`text-center font-normal ${i % 2 === 0 ? 'bg-zinc-200/40' : ''}`}
              >
                <td>{name}</td>
                <td className='border-x border-x-zinc-300'>{lastname}</td>
                <td>{position}</td>
              </tr>
            ),
        )}
      </tbody>
    </table>
  );
}
