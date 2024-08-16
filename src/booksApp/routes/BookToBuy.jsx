import { lazy, useState } from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
const AuthLayOut = lazy(() => import('../routes/AuthLayOut'));
const Login = lazy(() => import('../authorization/Login'));
const CreateAccount = lazy(() => import('../authorization/CreateAccount'));
const LayOut = lazy(() => import('../routes/LayOut'));
const Book = lazy(() => import('../home/bookList/Book'));
const BooksList = lazy(() => import('../home/bookList/BooksList'));
const FavoriteBooks = lazy(() => import('../home/favoritoes/FavoriteBooks'));
const PurhcasesHistory = lazy(() => import('../home/PurhcasesHistory'));


export default function BookToBuy() {
  const [serVal, setSerVal] = useState()

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayOut />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='login' element={<Login />} />
          <Route path='createAccount' element={<CreateAccount />} />
        </Route>

        <Route path='/BookToBuy' element={[<LayOut setSerVal={setSerVal} />]}>
          <Route path='List' element={<BooksList serchVal={serVal} />} />
          <Route path='Book/:id' element={<Book />} />
          <Route path='favorite' element={<FavoriteBooks />} />
          <Route path='purchases' element={<PurhcasesHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
