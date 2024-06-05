import {BrowserRouter, Route, Routes} from 'react-router-dom'
import "./App.css";
import Home from './pages/Home';
import MainHeader from './components/Header';
 
import AddCar from './pages/AddCar';
import Login from './components/Login';
import Register from './components/Register';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyCars from './pages/MyCars';
import UpdateCar from './pages/UpdateCar';
import BookNow from './pages/BookNow';
import AllBookings from './pages/GetAllBookings';
import CarOrders from './pages/GetOrders';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './pages/ErrorPage404';

function App() {
  return <>
    <BrowserRouter>
    <MainHeader/> 
    <ToastContainer/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/booknow/:id' element={<ProtectedRoute><BookNow/></ProtectedRoute>}/>
          <Route path='/getallbookings' element={<ProtectedRoute><AllBookings/></ProtectedRoute>}/>
          <Route path='/addcar' element={<ProtectedRoute><AddCar/></ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/mycars' element={<ProtectedRoute><MyCars/></ProtectedRoute>}/>
          <Route path='/updatecar/:id' element={<ProtectedRoute><UpdateCar/></ProtectedRoute>}/>
          <Route path='/getAll-carOrders' element={<ProtectedRoute><CarOrders/></ProtectedRoute>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
    </BrowserRouter>  
  </>;
}

export default App;
