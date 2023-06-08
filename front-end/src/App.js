import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {
  Error,
  Register,
  Landing,
  Profile,
  ProtectedRoute,
} from './pages'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Landing />
    ),
  },
  {
    path: "/register",
    element: (
      <Register />
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: (<Error />)
  },
]);

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<Landing />} />
    //     <Route path='/register' element={<Register />} />
    //     <Route path='*' element={<Error />} />
    //   </Routes>
    // </BrowserRouter>
    <RouterProvider router={router} />
  );
}

export default App;
