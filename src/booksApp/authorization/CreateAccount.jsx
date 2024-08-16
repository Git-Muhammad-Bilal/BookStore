import React, { useState } from 'react'
import '../styles/Login.css'
import { Container, Grid, Input } from '@mui/material';
import AuthLeftSide from './AuthLeftSide';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Email, Password } from '@mui/icons-material';
import { useForm, } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { createAccountFields } from './AuthFields';
import axiosApi from '../axiosApi/AxiosApi';
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
        console.log(data, 'data,');

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

        <div className='login-cont'>
            <div className="or-crt-acnt">
                <h3>
                    already have an account
                </h3>
                <Link to='/login'>
                    <button>Sign in</button>
                </Link>
            </div>
            <div className="lgn-flds">
                <div className="heading">
                    <h2>
                        Help your self with the books
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
            </div>
        </div>

    )
}

