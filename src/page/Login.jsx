import { FormControlLabel, styled, Switch } from '@mui/material';
import React, { useState } from 'react'
import { PiWaveformFill } from 'react-icons/pi'
import { useTheme } from '../contexts/themeContext';
import { motion } from 'framer-motion'

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 64,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        top: 2,

        margin: 1,
        padding: 0,
        transform: 'translateX(5px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(29px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#aab4be',
                ...theme.applyStyles('dark', {
                    backgroundColor: '#8796A5',
                }),
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#001e3c',
        width: 28,
        height: 28,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
        ...theme.applyStyles('dark', {
            backgroundColor: '#003892',
        }),
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        borderRadius: 20 / 2,
        ...theme.applyStyles('dark', {
            backgroundColor: '#8796A5',
        }),
    },
}));

const Login = () => {
    const [darkMode, setDarkMode] = useState(true);
    const { toggleTheme } = useTheme();


    const handleChange = (event) => {
        setDarkMode(event.target.checked);
        toggleTheme();
    };
    const [isSignupActive, setIsSignupActive] = useState(true);

    return (
        <div className='w-full min-h-[100dvh] overflow-hidden flex flex-col md:flex-row  md:flex-nowrap gap-x-2'>

            <div className=' mx-auto md:w-1/2 h-[30dvh]  md:min-h-[100dvh]  flex flex-row md:flex-col items-center justify-center'>

                <PiWaveformFill className='text-[75px] md:text-[200px] text-[var(--primary)]' />
                <motion.span
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className='text-2xl md:text-4xl text-[var(--primary)] '>
                    Meet Assist
                </motion.span>

            </div>

            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}

                className=' mx-auto md:w-1/2  min-h-full'>
                {isSignupActive ?
                    <div className='flex flex-col items-center justify-center h-full'>
                        <span className='text-4xl text-[var(--primary)] '>Login</span>
                        <div className='flex flex-col gap-3 mt-5'>
                            <input type="email" placeholder='Email' className='text-black border border-[var(--header-border)] rounded-md p-2 w-[300px] focus:outline-none focus:border-[var(--primary)]' />
                            <input type="password" placeholder='Password' className='text-black border border-[var(--header-border)] rounded-md p-2 w-[300px] focus:outline-none focus:border-[var(--primary)]' />
                            <button className='bg-[var(--primary)] text-white rounded-md p-2 w-[300px] active:scale-95'>Login</button>
                            <p className=' text-[var(--text-color)] font-[500] text-sm rounded-md p-2 w-[300px]'>Don't have an account ? <span className='text-[var(--primary)] hover:underline cursor-pointer' onClick={() => { setIsSignupActive(!isSignupActive) }}>Sign up</span></p>
                        </div>
                    </div>
                    :
                    <div className='flex flex-col items-center justify-center h-full'>
                        <span className='text-4xl text-[var(--primary)] '>Sign Up</span>
                        <div className='flex flex-col gap-3 mt-5'>
                            <input type="text" placeholder='Fullname' className='text-black border border-[var(--header-border)] rounded-md p-2 w-[300px] focus:outline-none focus:border-[var(--primary)]' />
                            <input type="email" placeholder='Email' className='text-black border border-[var(--header-border)] rounded-md p-2 w-[300px] focus:outline-none focus:border-[var(--primary)]' />
                            <input type="password" placeholder='Password' className='text-black border border-[var(--header-border)] rounded-md p-2 w-[300px] focus:outline-none focus:border-[var(--primary)]' />
                            <button className='bg-[var(--primary)] text-white rounded-md p-2 w-[300px] active:scale-95'>Signup</button>
                            <p className=' text-[var(--text-color)] font-[500] text-sm rounded-md p-2 w-[300px]'>Already have an account ? <span className='text-[var(--primary)] hover:underline cursor-pointer' onClick={() => { setIsSignupActive(!isSignupActive) }}>Login</span></p>
                        </div>
                    </div>
                }
            </motion.div>

            <FormControlLabel className='absolute -right-4 top-0' checked={darkMode} onChange={handleChange} control={<MaterialUISwitch defaultChecked />} />


        </div>
    )
}

export default Login
