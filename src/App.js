import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Explore from './pages/Explore'
import ForgotPassword from './pages/ForgotPassword'
import SignIn from './pages/SignIn'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignUp from './pages/Signup'
import Category from './components/Category';
import Navbar from './components/Navbar'

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
     <Router>
        <Routes> 
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/category/:categoryName' element = {<Category />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/profile' element = {<PrivateRoute />} >
              <Route path='/profile' element={<Profile/>} />
          </Route>
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
        <Navbar />
     </Router>
     <ToastContainer />
    </div>
  );
}

export default App;
