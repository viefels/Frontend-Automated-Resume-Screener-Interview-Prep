import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Otp from "./ui/otp";

export default function VerifyEmail({email, className, onBack, onSubmit, serverError}){
    const [otpTimer, setOtpTimer] = useState(10);

    useEffect(()=>{
        if(otpTimer <= 0){
            return;
        }
        const timer = setInterval(() => {
            setOtpTimer((prev) => prev - 1)
        }, 1000);
        return()=> clearInterval(timer);
    },[otpTimer]);
    


    return(
        <div className={className}>
            <button className="except flex items-center gap-2" onClick={onBack}>
                <ChevronLeft className="text-neutral-500" size={16} />
                <span className="text-neutral-500">Go back and edit</span>
            </button>

            <h1 className="mt-6 text-4xl text-(--dull-bg) lg:font-medium">Check your email</h1>

            <p className="font-light mt-4 text-2xl lg:text-2xl lg:font-normal tracking-wide">We sent a link and code to {email || "example@mail.com"}. Click the link to verify automatically, or enter the 6-digit code below.</p>

            <Otp className="flex relative my-6 justify-center w-full h-15 gap-2 lg:gap-6"/>

            { serverError?.success && <p className="text-center text-xl text-red-600">{serverError.message}</p>}
            
            <button type="submit" className="w-full bg-(--accent) text-neutral-100 text-xl rounded-lg py-3 mt-4 cursor-pointer">Continue</button>

            <p className="text-neutral-400 text-sm text-center mt-2">Be sure to check your spam folder.</p>

            <p className="text-center text-sm text-neutral-500 mt-1">
                Didn't get it? 
                {otpTimer ? <i className="text-indigo-800"> Retry in {otpTimer + " secs"}</i> : <a href="#" className="border-b-1 text-indigo-800 focus-visible:ring-2 focus-visible:ring-[#302b5f59] focus-visible:outline-none cursor-pointer" onClick={(e) =>{
                    onSubmit(e)
                    setOtpTimer(10);
                }}> Resend</a>}
            </p>

            <div className="flex justify-center items-center my-1"><div className="w-30 h-[1px] bg-zinc-200 mr-6"></div>OR<div className="w-30 h-[1px] ml-6 bg-zinc-200"></div></div>

            <p className="text-neutral-500 text-center text-sm tracking-widest">Need help? <a href="#"className="border-b-1 text-indigo-800 focus-visible:ring-2 focus-visible:ring-[#302b5f59] focus-visible:outline-none cursor-pointer">Contact support</a></p>
            
        </div>
        
    )
}