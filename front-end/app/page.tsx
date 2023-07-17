"use client"

import React, { useState, useEffect, useRef } from "react";
import { Container, Box, TextField, Button } from "@mui/material";

import ReCAPTCHA from "react-google-recaptcha"
import { verifyCaptcha } from "../serverActions"

import axios from "axios";
import { useForm } from "react-hook-form";

import { CheckPassword } from "./componentes/checkPassword";


export default function Home() {
    const { register, handleSubmit, formState:{errors} } = useForm();

    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState(""); 
    
    const [validInput1, setValidInput1] = useState<boolean>(false);
    const [validInput2, setValidInput2] = useState<boolean>(false);
    const [validPassword, setValidPassword] = useState<boolean>(false);

    const [emailExists, setEmailExists] = useState<boolean>(false);

    const recaptchaRef = useRef<ReCAPTCHA>(null)
    const [isVerified, setIsverified] = useState<boolean>(false)

    async function handleCaptchaSubmission(token: string | null) {
        // Server function to verify captcha
        await verifyCaptcha(token)
        .then(() => setIsverified(true))
        .catch(() => setIsverified(false))
    }

    useEffect(() => {
        setValidPassword(validInput1 && validInput2);
    }, [validInput1, validInput2])
    
    useEffect(() => {
        const verify1 = /^.{8,}$/s;
        const verify2 = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).*$/;
        setValidInput1(verify1.test(password));
        setValidInput2(verify2.test(password));
    }, [password])


    const onSubmit = async (data:any) => {
        if(!isVerified){
            alert("Please complete the CAPTCHA")
            return
        }
        try{
            const newUser = await axios.post("http://localhost:3006/user", data)
            console.log(newUser);
        }catch(err:any){
            if(err.response && err.response.status === 409){
                setEmailExists(true);
            }
            console.error(err.response.status)
        }
            

        
    }
    return (
        <React.Fragment>
            <Box className="w-screen min-h-screen bg-gray-200 flex items-center justify-center">
                <Container maxWidth="sm" className="bg-white h-[700px] rounded-lg flex flex-col items-center">
                    <h1 className="text-4xl text-black my-7" >Register</h1>
                    <form className="w-full h-full flex flex-col  items-center relative" onSubmit={handleSubmit(onSubmit)}>

                        <TextField label="Name" id="name" variant="outlined"  className="mt-5 max-w-[800px] w-[90%]" error={!!errors.name} helperText={!!errors.name ? "Name is Invalid" : ""} {...register("name", {required:true, pattern:/^[A-Za-z]+$/})} />

                        <TextField label="Email" id="email" variant="outlined"  className="mt-5 max-w-[800px] w-[90%]" error={!!errors.email || emailExists} helperText={!!errors.email ? "Invalid Email" : emailExists ? "Email Already Registered" : ""} {...register("email", {required:true, pattern:/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/})} onChange={() => setEmailExists(false)}/>

                        <TextField label="Password" id="password" variant="outlined"  className="mt-5 max-w-[800px] w-[90%]" type="password" error={!validPassword}  helperText={!validPassword ? "Invalid Password" : ""} {...register("password", {required:true})} onChange={(e) => setPassword(e.target.value)}/>


                        <CheckPassword value="Minimum 8 characters" state={validInput1}/>
                        <CheckPassword value="Include letters, numbers, and symbols" state={validInput2}/>

                        
                        <TextField label="Repeat Password" id="passwordRep" variant="outlined"  className="mt-5 max-w-[800px] w-[90%]" type="password" onChange={(e) => setRepPassword(e.target.value)} error={password !== repPassword} helperText={password !== repPassword ? "Passwords don't match" : ""}/>

                        <ReCAPTCHA
                        sitekey="6LekBjAnAAAAAFDeyZ06aAvF8-WdW4ebruo7rNde"
                        ref={recaptchaRef}
                        onChange={handleCaptchaSubmission}
                        className="mt-5 "
                        />

                        <Button type="submit" variant="outlined" className="absolute bottom-10 left-[50%] translate-x-[-50%] w-[100px]">Register</Button>
                    </form>

                </Container>
            </Box>
        </React.Fragment>
    )
}
