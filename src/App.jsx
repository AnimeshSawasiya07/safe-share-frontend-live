import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Feature } from './components/Feature/Feature'
import { Products } from './components/Products/Products'
import { ViewProduct } from './components/Products/ViewProduct'
import { Signin } from './components/Sign/Signin'
import { Signup } from './components/Sign/Signup'
import 'react-toastify/dist/ReactToastify.css';
import { Home } from './components/Home/Home'
import { Cart } from './components/Cart/Cart'
import { Profile } from './components/Profile/Profile'
import { BuyNow1 } from './components/BuyNow/BuyNow1'
import { AboutUs } from './components/AboutUs/AboutUs'
import { OrderConfirmationPage } from './components/BuyNow/OrderConfirmationPage'
import { AddNewListing } from './components/AddNewListing/AddNewListing'
import { PreviewNewListing } from './components/AddNewListing/PreviewNewListing'
import Auth from './components/Auth/auth'
import { ForgotPassword } from './components/ForgotPassword/ForgotPassword'
import ResetPassword from './components/ForgotPassword/ResetPassword'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign-up' element={<Signup/>}/>
        <Route path='/sign-in' element={<Signin/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/user/reset-password/:token' element={<ResetPassword/>}/>
        <Route path='/browse-products' element={<Products/>}/>
        <Route path='/view-Product/:id' element={<ViewProduct/>}/>
        <Route path='/cart' element={<Auth><Cart/></Auth>}/>
        <Route path='/features' element={<Feature/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/profile' element={<Auth><Profile/></Auth>}/>
        <Route path='/buy-now-1' element={<Auth><BuyNow1/></Auth>}/>
        <Route path='/order-confirmed' element={<Auth><OrderConfirmationPage/></Auth>}/>
        <Route path='/add-new-listing' element={<Auth><AddNewListing/></Auth>}/>
        <Route path='/preview-new-listing' element={<Auth><PreviewNewListing/></Auth>}/>

      </Routes>
    </>

  )
}

export default App
