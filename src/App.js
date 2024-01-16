import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Explore from './pages/Explore'
import ForgotPassword from './pages/ForgotPassword'
import SignIn from './pages/SignIn'
import Offers from './pages/Offers'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import SignUp from './pages/Signup'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
     <Router>
        <Routes> 
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/profile' element={<SignIn />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
        <Navbar />
     </Router>
    </div>
  );
}

export default App;
