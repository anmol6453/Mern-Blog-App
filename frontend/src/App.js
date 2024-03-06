import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Blogs from './pages/Blogs';
import UserBlog from './pages/UserBlog';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
import {Toaster} from 'react-hot-toast'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

function App() {
  return (
    
    <Router>
       <Header/>
       <Toaster/>
       <Routes>
        <Route path='/' element={<Blogs/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/my-blogs' element={<UserBlog/>}/>
        <Route path='/blog-details/:id' element={<BlogDetails/>}/>
        <Route path='/create-blog' element={<CreateBlog/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
       </Routes>
    </Router>
    
  );
}

export default App;
