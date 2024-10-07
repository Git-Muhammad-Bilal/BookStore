import React, { useState } from 'react'
import AuthLeftSide from './AuthLeftSide';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm, } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { loginFields } from './AuthFields';
import * as yup from "yup"
import '../styles/Login.css'
import axiosApi from '../axiosApi/AxiosApi';
import { Stack } from '@mui/system';
import { Button } from '@mui/material';


const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required()


export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) })



  const [showPass, setShowPass] = useState({
    password: false,
    confirmPassword: false
  })

  const navigate = useNavigate()


  let token = localStorage.getItem('jwtToken')

  if (token) {
    return <Navigate to={'/BookToBuy/List?page=1'} />
  }


  const submitUser = async (user) => {

    let { data } = await axiosApi.post('getLogedInUser', {
      email: user.email,
      password: user.password.toString()
    })
    if (data?.error) {
      setError('root', {
        message: data.error
      })
    } else {
      navigate(`/BookToBuy/List?page=1`)
    }
  }

  let inpFields = loginFields.map((inp, index) => {

    const { placeholder, name, type, email, password, confirmPassword, autoComplete } = inp
    const hideShowPass = (password && showPass.password) || (confirmPassword && showPass.confirmPassword)

    return <div className={name} key={index}>
      <input
        autoComplete='on'
        style={{ border: errors[name] ? '2px solid red' : '1px solid rgb(199, 199, 199)' }}
        type={hideShowPass ? `text` : type}
        placeholder={placeholder}
        name={name}
        {...register(name)}

      />

      {(password || confirmPassword) &&
        <img
          className='passhide'
          src='./hide.png'
          onClick={() => setShowPass({ ...showPass, [name]: !showPass[name] })}
        />}

      {errors[name] && <p style={{ color: 'red' }} className='required'>{errors[name]?.message} </p>}
    </div>
  })

  return (

    <Stack display={'flex'} flexDirection={'column'}  justifyContent={'center'}>
      <Stack pb={20}  display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} width={'90%'} pl={3}>
        <h3>
          Create your account
        </h3>
        <Link to='/createAccount'>
          <Button variant='contained'>Sign Up</Button>
        </Link>
      </Stack>
      <Stack flex={1} display={'flex'} flexDirection={'column'} alignItems={'center'}  justifyContent={'center'}>
        <div className="heading">
          <h1>
            BooksTobuy!
          </h1>
        </div>
        <form onSubmit={handleSubmit(submitUser)}>
          {inpFields}

          <div className="lgn-btn">
            <button type='submit'>{isSubmitting ? '...loading' : `login`}</button>
          </div>
        </form>
        <div className='error'>
          {errors.root ? <h3 style={{ color: 'red' }}>{errors.root.message}</h3> : null}
        </div>
      </Stack>
    </Stack>

  )
}



// import React from 'react'
// import '../styles/Login.css'

// import AuthLeftSide from './AuthLeftSide';
// import { Link, useNavigate } from 'react-router-dom';


// export default function Login() {

//   let navigate = useNavigate()


//   const navigateToHome = () => {
//     navigate('/BookToBuy/List')
//   }

//   return (

//     <div className='login-cont'>
//       <AuthLeftSide />

//       <div className="or-crt-acnt">

//         <h3>
//           Create your account
//         </h3>
//         <Link to='/createAccount'>
//           <button>Sign Up</button>
//         </Link>
//       </div>
//       <div className="lgn-flds">
//         <div className="heading">
//           <h1>
//             BooksTobuy!
//           </h1>
//         </div>
//         <div>
//           <input text placeholder='Your email' />
//         </div>
//         <div>
//           <input placeholder='Password' />
//         </div>
//         <div className="lgn-btn">
//           <button onClick={navigateToHome}>Login</button>
//         </div>
//       </div>
//     </div>

//   )
// }
