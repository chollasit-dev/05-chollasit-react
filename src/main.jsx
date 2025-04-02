import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { App } from './App';
import { Admin, Index, Owner, Users } from './pages';
import './style.css';

let router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: Index,
      },
      {
        path: 'user',
        Component: Users,
      },
      {
        path: 'admin',
        Component: Admin,
      },
    ],
  },
  {
    path: 'owner',
    Component: Owner,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);
