"use client";

import React from "react";
import { Container, Box, TextField, Button } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";



export default function Home() {
    const { register, handleSubmit, formState:{errors} } = useForm();
    




    interface User{
        email:string;
        password:string;
    }

    const onSubmit = async (data:any) => {
        try{
            const isUserRegistered = await axios.post("http://localhost:3000/user/login", data);
            console.log(isUserRegistered);

        }catch(err){
            console.error(err);
        }
    }

    return (
        <React.Fragment>
            <Box className="w-screen h-screen bg-gray-200 flex items-center justify-center">
                <Container maxWidth="sm" className="bg-white h-[400px] rounded-lg flex flex-col items-center">
                    <h1 className="text-4xl text-black my-7" >Login</h1>
                    <form className="w-full h-full flex flex-col  items-center relative" onSubmit={handleSubmit(onSubmit)}>
                        <TextField label="Email" id="email" variant="outlined"  className="mb-5 w-[500px]" error={!!errors.email} {...register("email", {required:true, pattern:/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/})}/>
                        <TextField label="Password" id="password" variant="outlined"  className="mb-5 w-[500px]" type="password" error={!!errors.password} {...register("password", {required:true})}/>
                        <Button type="submit" variant="outlined" className="absolute bottom-10 left-[50%] translate-x-[-50%] w-[100px]">Login</Button>
                    </form>

                </Container>
            </Box>
        </React.Fragment>
    )
}
