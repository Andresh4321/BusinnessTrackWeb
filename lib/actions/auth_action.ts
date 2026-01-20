//server side processing for auth actions"
"use server";
import { success } from "zod";
import { register, login } from "../api/auth"
import { setAuthToken, setUserData } from "../cookie";

export const handleRegister=async(FormData:any)=>{
    try{
        //how to get data from component
        const result=await register(FormData);

        //how to send back to component
        if(result.success){
            return {
                success:true,
                message:"Login successful",
                data:result.data
            };
        }
        return{
            success:false,message:result.message || "Login failed"
        }
    } catch(err:Error|any){
        return{
            success:false,
            message:err.message || "Login failed"
        }
    }
}

export const handleLogin=async(formData:any) =>{
    try{
    //how to get data from component
    const result=await login (formData);
    //how to sendback to component
    if(result.success){
        await setAuthToken(result.data);
        await setUserData(result.data)
        
         return {
                success:true,
                message:"Login successful",
                data:result.data
            };
        }
        return{
            success:false,message:result.message || "Login failed"
        }
    } catch(err:Error|any){
        return{
            success:false,
            message:err.message || "Login failed"
        }
    }
}