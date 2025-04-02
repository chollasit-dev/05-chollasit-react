import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export function Admin() {
  let [error, setError] = useState(null);
  let [isRemove, setIsRemove] = useState(false);
  let [loading, setLoading] = useState(false);
  let [members, setMembers] = useState([]);
  let [newUser, setNewUser] = useState({
    name: '',
    lastname: '',
    position: '',
  });

  let controller = new AbortController();

  useEffect(function () {
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
      setIsRemove(false);
      setError(null);
    };
  }, []);

  function handleDelete(id) {
    async function removeById() {
      try {
        let response = await axios.delete(
          import.meta.env.VITE_API + 'member/' + id,
          { signal: controller.signal },
        );
        if (response.status !== 200) throw new Error('Failed to delete!');
        if (!response) throw new Error('Failed to delete!');
        alert('Delete success!');
        setIsRemove(true);
      } catch (error) {
        /** @type {AxiosError} err */
        let err = error;
        alert('Error: ' + err.message);
      }
    }

    removeById();
  }

  function handleSubmit() {
    let { name, lastname, position } = newUser;
    if (!name || !lastname || !position)
      return alert('All field must not empty!');

    async function addOne() {
      try {
        let response = await axios.post(
          import.meta.env.VITE_API + 'members',
          newUser,
          { signal: controller.signal },
        );
        if (response.status !== 200) throw new Error('Failed to add user!');
        if (!response) throw new Error('Failed to add user!');
        alert('Add user success!');
      } catch (error) {
        /** @type {AxiosError} err */
        let err = error;
        alert('Error: ' + err.message);
      }
    }

    addOne();
  }

  if (loading) return <p className='text-center'>Loading...</p>;
  if (error) return <p className='text-center'>Error: {error.message}</p>;

  return (
    <>
      <form className='grid grid-flow-col gap-8' onSubmit={handleSubmit}>
        <div className='grid grid-flow-col place-items-center gap-4'>
          <label for='name'>Name</label>
          <input
            className='rounded-md bg-zinc-100 p-2 shadow-inner'
            type='text'
            name='name'
            value={newUser.name}
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, ...{ name: e.target.value } }))
            }
          />
        </div>
        <div className='grid grid-flow-col place-items-center gap-4'>
          <label for='lastname'>Last Name</label>
          <input
            className='rounded-md bg-zinc-100 p-2 shadow-inner'
            type='text'
            name='lastname'
            value={newUser.lastname}
            onChange={(e) =>
              setNewUser((prev) => ({
                ...prev,
                ...{ lastname: e.target.value },
              }))
            }
          />
        </div>
        <div className='grid grid-flow-col place-items-center gap-4'>
          <label for='position'>Position</label>
          <input
            className='rounded-md bg-zinc-100 p-2 shadow-inner'
            type='text'
            name='position'
            value={newUser.position}
            onChange={(e) =>
              setNewUser((prev) => ({
                ...prev,
                ...{ position: e.target.value },
              }))
            }
          />
        </div>
        <button className='rounded-lg bg-blue-600 px-4 py-2 text-white shadow transition hover:-translate-y-1 hover:bg-blue-500 focus-visible:-translate-y-1 focus-visible:bg-blue-500'>
          Save
        </button>
      </form>

      <table className='rounded-lg bg-zinc-100 font-medium shadow [&_td]:p-2 [&_th]:p-2'>
        <caption className='pb-2 text-sm'>
          This table won't show a row which has any single empty value.
        </caption>
        <thead>
          <tr className='*:border-b *:border-b-zinc-300'>
            <th>Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Action</th>
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
                  <td>
                    <button
                      className='rounded-lg bg-red-600 px-4 py-2 text-white shadow transition hover:-translate-y-1 hover:bg-red-500 focus-visible:-translate-y-1 focus-visible:bg-red-500'
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ),
          )}
        </tbody>
      </table>
    </>
  );
}
