import { useState } from "react";
import { safeParse, flatten, set } from "valibot";

import { businessAvatar, signUpLarge, resumeIcon, EyeIcon, EyeOffIcon } from "../assets/signupPage.assets";
import SmoothImage from "../components/ui/SmoothImage";
import { siteLogo as SiteLogo } from "../assets/Nav";
import Navbar from "../components/navbar";
import * as userSchema from "../schemas/auth/userSchema";

export default function Login(){
  const [pswIsVisible, setPswIsVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverRes, setServerRes] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({})
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    stayLoggedIn: false
  });
  
  const isSamePsw = formData.password === formData.confirmPsw;

  const handleFormData = (e) => {
    const { name, dataset, type, checked} = e.currentTarget
    const prop = name || dataset.name;
    const value = e.target.value || dataset.value || ""

    setFormErrors({});
    setServerRes(null);
    setSuccess(false);
    
    setFormData( prev => ({
        ...prev,
        [prop]: type === "checkbox" ? checked : value
    }))
      
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setServerRes(null);
    setIsSubmitting(false);
    setSuccess(false);

    const result = safeParse(userSchema.login, formData);
    if(!result.success){
      const {nested} = flatten(result.issues);
      const errors = Object.fromEntries(
        Object.entries(nested).map(([key, msgs]) => [key, msgs[0]])
      );
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try{
      

      const res = await fetch("https://automated-resume-screener-interview.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formData)
      });
      
      const data = await res.json().catch(()=>({}));

      if(!data.success || !res.ok){
        throw new Error (data.message || "Failed to create account. Please try again.")
      }

      setSuccess(true);
      localStorage.setItem("AuthToken", data.token);
      setFormData({
        email: "",
        password: ""
      })

    }
    catch(err){
      setServerRes(err.message)
    }
    finally{
      setIsSubmitting(false);
    }


  }


  return (
    <div className="flex justify-center align-center">
      <main className="lg:fixed inset-0 pt-14 lg:py-3   w-full h-[100%] flex flex-col justify-center lg:flex-row items-center gap-4 max-h-[920px]">
          
        <article className="hidden lg:inline flex-1 relative flex items-center rounded-2xl overflow-hidden h-full">
          <div className="absolute left-4 top-4 z-20">
              <SiteLogo className="w-[150px] text-slate-100 hover:text-[#F79F56] stroke-current transition-colors" />
          </div>
            
            
          <SmoothImage 
              className="object-cover w-full h-full object-top" 
              wrapperClassName="w-full h-full bg-top"
              src={ signUpLarge } alt="site-logo" loading="lazy"
              alt = "a woman with id tag happy to finally find land dream job"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 via-40% to-black"></div>
            

          <div className="absolute bottom-30 left-1/2 -translate-x-1/2">
              <h2 className="text-[clamp(1rem,2.2vw,15rem)] text-slate-50 whitespace-nowrap tracking-tight">Land the role, not just the <strong>interview</strong></h2>
              <p className="text-slate-400 text-[clamp(0.6rem,1.3vw,15rem)] leading-tight tracking-tight">Optimize your resume for applicant tracking systems and practice real interview scenarios to walk in fully prepared.</p>
          </div>

        </article>

        <div className="w-full fixed top-0 bg-(--dull-bg) lg:hidden z-4">
          <SiteLogo className="mx-auto w-[150px] text-slate-100 hover:text-[#F79F56] stroke-current transition-colors" />
        </div>

        <form onSubmit={handleSubmit} noValidate className={` flex-1  flex flex-col justify-center items-center relative px-2 lg:px-20 py-2 lg:py-8 w-full`}>

        

          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-4 lg:opacity-5 z-1"
            style={{ backgroundImage: `url(${businessAvatar})`}}
          />

          <div className="z-2 relative w-full">
              
            <h1 className="text-3xl lg:text-4xl font-semibold lg:font-bold">Login</h1>

            <p className="text-sm
            mt-4 mb-5 lg:mt-6 lg:mb-6 pl-1 ">Don't have an account?, 
              <a href="" className="border-b-1 text-indigo-600 focus-visible:ring-2 focus-visible:ring-[#302b5f59] focus-visible:outline-none "> SignUp here</a>
            </p>

            <div className="flex-1 my-4 lg:my-10 w-full">

              <input
                type = "email"
                id = "email"
                placeholder="Email"
                name="email"
                value = {formData.email}
                onChange={ handleFormData }
                autoComplete="email"
                className="w-full bg-(--dull-bg2) rounded-lg placeholder:text-neutral-400"
              />
              {formErrors.email && <p className="text-red-600 text-sm -mt-4 mb-1">{formErrors.email}</p>}

              <div className="relative">
                <input
                    type = {pswIsVisible ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value = {formData.password}
                    onChange={ handleFormData }
                    minLength={6}
                    autoComplete="new-password"
                    className="w-full bg-(--dull-bg2) rounded-lg placeholder:text-neutral-400"
                />
                {formErrors.password && <p className="text-red-600 text-sm -mt-4 mb-1">{formErrors.password}</p>}

                <button 
                    className="absolute top-1/2 right-6 -translate-y-[80%] text-neutral-600 focus-visible:ring-2 focus-visible:ring-[#302b5f59] focus-visible:outline-none" 
                    type="button" 
                    tabIndex={0}
                    onClick={() => setPswIsVisible((prev)=> !prev)}
                >
                    {pswIsVisible ? <EyeOffIcon/> : <EyeIcon/>}
                </button>
              </div>
              
              { serverRes && (
                <div className="rounded-lg border border-red-500 bg-red-100 p-3 mt-1 mb-1 text-sm text-red-400">
                  {serverRes} 
                </div>
              )}

              { success && (
                <p className="rounded-lg border border-green-500 bg-green-100 p-3 mt-1 mb-1 text-sm text-green-600">
                  Logged In successfully
                </p>
              )}

              <div className="flex justify-end">
                <a className="border-b-1 text-indigo-600 focus-visible:ring-2 focus-visible:ring-[#302b5f59] focus-visible:outline-none ">Forgot password?</a>
              </div>
                  
              <button type="submit" disabled={isSubmitting} className={`w-full bg-(--accent) py-3 lg:py-4 mt-4 lg:mt-6  text-neutral-100 rounded-lg  ${isSubmitting ? "bg-(--accent-disabled) hover:bg-(--accent-disabled) hover:cursor-default":"hover:bg-(--dull-bg) hover:cursor-pointer"}`}>
                {isSubmitting ? "Logging In..." : "Login"}
              </button>
            </div>
          </div>
        </form>
          

      </main>
    </div>
  )
}
