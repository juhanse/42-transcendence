import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Test from './pages/Test';

const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/test",
				element: <Test />
			}
		],
	},
]);

export default function App() {
 	return <RouterProvider router={router} />;
}
