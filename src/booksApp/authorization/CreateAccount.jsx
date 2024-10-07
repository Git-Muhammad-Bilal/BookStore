import React, { useState } from 'react'
import '../styles/Login.css'
import { Button, Container, Grid, Input } from '@mui/material';
import AuthLeftSide from './AuthLeftSide';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Email, Password } from '@mui/icons-material';
import { useForm, } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { createAccountFields } from './AuthFields';
import axiosApi from '../axiosApi/AxiosApi';
import { Stack } from '@mui/system';
const schema = yup
    .object({
        name: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required()
    })


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

    const submitUser = async (data) => {

        let d = await axiosApi.post('createUser', {
            ...data,
        })
        if (d?.error) {
            setError('root', {
                message: d.error
            })
        } else {
            navigate('/BookToBuy/List?page=1')
        }

    }

    let inpFields = createAccountFields.map((inp, index) => {

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

        <Stack display={'flex'} flexDirection={'column'} justifyContent={'center'}>
            <Stack pb={10} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} width={'90%'} pl={3}>
                <h3>
                    already have an account
                </h3>
                <Link to='/login'>
                    <Button variant='contained'>Sign in</Button>
                </Link>
            </Stack>
            <Stack flex={1} display={'flex'}  flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                <div className="heading">
                    <h2>
                        Help yourself with the books
                        <br />
                        you found noewhere else!
                    </h2>
                </div>
                <form onSubmit={handleSubmit(submitUser)}>
                    {inpFields}

                    <div className="lgn-btn">
                        <button type='submit'>{isSubmitting ? '...loading' : `SignUp`}</button>
                    </div>
                </form>
                <div className='error'>
                    {errors.root ? <h3 style={{ color: 'red' }}>{errors.root.message}</h3> : null}
                </div>
            </Stack>
        </Stack>

    )
}

