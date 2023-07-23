"use client";

import React, { useState, useRef } from "react";
import { Container, Box, TextField, Button } from "@mui/material";
import axios from "axios";
import { set, useForm } from "react-hook-form";

import ReCAPTCHA from "react-google-recaptcha"
import { verifyCaptcha } from "../../serverActions"

export default function Home() {
    const { register, handleSubmit, formState:{errors} } = useForm();
    
    const [ invalid, setInvalid ] = useState<boolean>(false)
    const [ error, setError ] = useState<boolean>(false)


    interface User{
        email:string;
        password:string;
    }


    const recaptchaRef = useRef<ReCAPTCHA>(null)
    const [isVerified, setIsverified] = useState<boolean>(false)

    async function handleCaptchaSubmission(token: string | null) {
        // Server function to verify captcha
        await verifyCaptcha(token)
        .then(() => setIsverified(true))
        .catch(() => setIsverified(false))
    }


    const onSubmit = async (data:any) => {
        setInvalid(false);
        try{
            const isUserRegistered = await axios.post("http://localhost:3002/user/login", data);
            if(isUserRegistered.data === false){
                setError(false);
                setInvalid(true);
            }else{
                console.log("logged with sucess")
            }

        }catch(err){
            console.error(err);
            setInvalid(false);
            setError(true);
        }
    }

    return (
        <React.Fragment>
            <Box className="w-screen h-screen bg-gray-200 flex items-center justify-center">
                <Container maxWidth="sm" className="bg-white h-[500px] rounded-lg flex flex-col items-center">
                    <h1 className="text-4xl text-black my-7" >Login</h1>
                    <form className="w-full h-full flex flex-col  items-center relative" onSubmit={handleSubmit(onSubmit)}>
                        <TextField label="Email" id="email" variant="outlined"  className="mb-5 w-[500px]" error={!!errors.email} {...register("email", {required:true, pattern:/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/})}/>
                        <TextField label="Password" id="password" variant="outlined"  className="mb-5 w-[500px]" type="password" error={!!errors.password} {...register("password", {required:true})}/>


                        {invalid && <div className="bg-red-200 text-red-400 py-3 px-20 rounded-lg">Invalid Email or password</div>}
                        {error && <div className="bg-red-200 text-red-400 py-3 px-20 rounded-lg">An error has occured.Try again later.</div>}

                        <ReCAPTCHA
                        sitekey="6LekBjAnAAAAAFDeyZ06aAvF8-WdW4ebruo7rNde"
                        ref={recaptchaRef}
                        onChange={handleCaptchaSubmission}
                        className="mt-5 "
                        />
                        <Button type="submit" variant="outlined" className="absolute bottom-10 left-[50%] translate-x-[-50%] w-[100px]">Login</Button>
                    </form>

                </Container>
            </Box>
        </React.Fragment>
    )
}
