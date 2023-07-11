import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
      <Routes>
        <Route path='/' element={
          <PublicRoute>
            <HomePage />
          </PublicRoute>} />
        <Route path='/login' element={
          <PublicRoute>
            <Login />
          </PublicRoute>} />
        <Route path='/register' element={
          <PublicRoute>
            <Register />
          </PublicRoute>} />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
        <Route path='*' element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;
