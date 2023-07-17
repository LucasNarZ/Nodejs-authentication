"use client"

import React from "react";
import { Container, Box, TextField, Button } from "@mui/material";


import axios from "axios";
import { useForm } from "react-hook-form";

export default function Home() {
    const { register, handleSubmit, formState:{errors} } = useForm();

    const onSubmit = async (data:any) => {
        try{
            const newUser = await axios.post("http://localhost:3000/user", data)
            console.log(newUser);
        }catch(err){
            console.error(err);
        }
        
    }

    return (
        <React.Fragment>
            <Box className="w-screen h-screen bg-gray-200 flex items-center justify-center">
                <Container maxWidth="sm" className="bg-white h-[500px] rounded-lg flex flex-col items-center">
                    <h1 className="text-4xl text-black my-7" >Register</h1>
                    <form className="w-full h-full flex flex-col  items-center relative" onSubmit={handleSubmit(onSubmit)}>
                        <TextField label="Name" id="name" variant="outlined"  className="mb-5 max-w-[500px] w-[90%]" error={!!errors.name} {...register("name", {required:true, pattern:/^[A-Za-z]+$/})}/>
                        <TextField label="Email" id="email" variant="outlined"  className="mb-5 w-[500px]" error={!!errors.email} {...register("email", {required:true, pattern:/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/})}/>
                        <TextField label="Password" id="password" variant="outlined"  className="mb-5 w-[500px]" type="password" error={!!errors.password} {...register("password", {required:true})}/>
                        <TextField label="Repeat Password" id="passwordRep" variant="outlined"  className="mb-5 w-[500px]" type="password" />
                        <Button type="submit" variant="outlined" className="absolute bottom-10 left-[50%] translate-x-[-50%] w-[100px]">Register</Button>
                    </form>

                </Container>
            </Box>
        </React.Fragment>
    )
}
