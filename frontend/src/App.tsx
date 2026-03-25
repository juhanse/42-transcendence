import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <Home />,
			},
		],
	},
]);

export default function App() {
 	return <RouterProvider router={router} />;
}
