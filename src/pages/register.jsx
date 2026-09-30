import { useState } from "react";
import { safeParse, flatten } from "valibot";
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from "lucide-react";


import { businessAvatar, signUpLarge, resumeIcon} from "../assets/signupPage.assets";
import SmoothImage from "../components/ui/SmoothImage";
import { siteLogo as SiteLogo } from "../assets/Nav";
import Navbar from "../components/navbar";
import * as userSchema from "../schemas/auth/userSchema.js";
import VerifyEmail from "../components/verify-email.jsx";
import useApi from "../hooks/useApi.js";


export default function register(){
  const [step, setStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({})

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formData, setFormData] = useState({
    role: "candidate",
    fullname: "",
    email: "",
    password: "",
    confirmPsw: ""
  });
  
  const isSamePsw = formData.password === formData.confirmPsw;

  const { request, loading, error, data, status } = useApi()

  const handleFormData = (e) => {
    const { name, dataset } = e.currentTarget
    const prop = name || dataset.name;
    const value = e.target.value || dataset.value || ""

    setFormErrors({});
    
    setFormData( prev => ({
        ...prev,
        [prop]: value
    }))
      
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const result = safeParse(userSchema.register, { agreeTerms,...formData });
    if(!result.success){
      const {nested} = flatten(result.issues);
      const errors = Object.fromEntries(
        Object.entries(nested).map(([key, msgs]) => [key, msgs[0]])
      );
      setFormErrors(errors);
      return;
    }

    const {confirmPsw, ...userData} = formData;

    const res = await request("/api/register", {
      method: "POST",
      body: JSON.stringify(userData) 
    });
    
    if(res.data.success){
      setStep(2)
    }
    
  }

  return (
    <div className="flex justify-center align-center">
      <main className="lg:fixed inset-0 pt-14 lg:py-3 px-4  w-full h-[100%] flex flex-col lg:flex-row items-center gap-4 max-h-[920px]">
          
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
        
        
        { step === 1 && (
          <form onSubmit={handleSubmit} noValidate className={`py-2 lg:py-8 flex-1 flex flex-col justify-center items-center relative px-2 lg:px-20`}>

          

            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-4 lg:opacity-5 z-1"
              style={{ backgroundImage: `url(${businessAvatar})`}}
            />

            <div className="z-2 relative">
                
              <h1 className="text-3xl lg:text-4xl font-semibold lg:font-bold">Get Started Now</h1>

              <p className="text-sm
              mt-4 mb-5 pl-1 ">Already have an account?, 
                <a href="" className="border-b-1 text-indigo-600 focus-visible:ring-2 focus-visible:ring-[#302b5f59] focus-visible:outline-none "> Login here</a>
              </p>
              <div className="flex flex-col lg:flex-row flex-wrap justify-between lg:justify-around gap-y-3 lg:gap-x-4 ">

                <h2 className="text-(--dull-bg) text-sm mb-0 lg:mb-2 font-medium pl-4 w-full">How are you planning to use vettKazi?</h2>

                {[
                  {
                    type: "candidate",
                    icon: resumeIcon,
                    desc: "Get instant feedback on your resume and practice for your upcoming interviews.",
                  },
                  {
                    type: "recruiter",
                    icon: resumeIcon,
                    desc: "Save time by letting the platform evaluate and sort top candidates for you.",
                  },
                ].map(r => (
                    <div 
                      className="relative flex-1 bg-(--main-bg) z-1 border-2 py-3 px-6 rounded-2xl overflow-hidden border-(--dull-bg2) focus-visible:ring-2 focus-visible:ring-[#302b5f59]
                      focus-visible:outline-none cursor-pointer" 
                      key={r.type + "-role"} 
                      tabIndex={0} 
                      data-name = "role"
                      data-value = {r.type}
                      onClick = { handleFormData }
                      onKeyDown={(e) => {

                          if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleFormData(e);
                          }
                      }}
                    >
                      
                      <input
                        id = {r.type + "-role"}
                        type ="radio"
                        value = {r.type}
                        name = "role"
                        checked = { formData.role === r.type }
                        readOnly
                        tabIndex={-1}
                        className = "text-right pointer-events-none"
                      />
                    
                      <label htmlFor={r.type + "-role"} className="pl-2 lg:pl-3 pointer-events-none"><span className="inline-block capitalize text-right text-base lg:text-lg font-semibold lg:font-bold mb-[1px]">{r.type}</span>
                        <p className="text-sm text-neutral-500">{r.desc}</p>
                      </label>
                        
                    </div>
                ))}

              </div>

              <div className="my-4 w-full">

                <input
                  type = "text"
                  id = "text"
                  placeholder="Full name"
                  name="fullname"
                  value = {formData.fullname}
                  onChange={ handleFormData }
                  autoComplete="fullname"
                  className="w-full bg-(--dull-bg2) rounded-lg placeholder:text-neutral-400"
                />
                {formErrors.fullname && <p className="text-red-600 text-sm -mt-4 mb-1">{formErrors.fullname}</p>}

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
                      type = {isVisible ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password (min 8 char)"
                      value = {formData.password}
                      onChange={handleFormData}
                      minLength={6}
                      autoComplete="new-password"
                      className="w-full bg-(--dull-bg2) rounded-lg placeholder:text-neutral-400"
                  />
                  {formErrors.password && <p className="text-red-600 text-sm -mt-4 mb-1">{formErrors.password}</p>}

                  <button 
                      className="except absolute top-1/2 right-6 -translate-y-[80%] text-neutral-600 focus-visible:ring-2 focus-visible:ring-[#302b5f59] focus-visible:outline-none" 
                      type="button" 
                      tabIndex={0}
                      onClick={() => setIsVisible((prev)=> !prev)}
                  >
                      {isVisible ? <EyeOffIcon/> : <EyeIcon/>}
                  </button>
                </div>

                <input
                    type = {isVisible ? "text" : "password"}
                    placeholder="Confirm your password"
                    name = "confirmPsw"
                    minLength={6}
                    value = {formData.confirmPsw}
                    onChange={ (e) =>{
                        handleFormData(e);
                    }}
                    autoComplete="new-password"
                    className={`w-full bg-(--dull-bg2) rounded-lg  placeholder:text-neutral-400 ${ formData.confirmPsw && !isSamePsw ? "border-4 border-rose-500" : ""}`}
                />
                {formErrors.confirmPsw && <p className="text-red-600 text-sm -mt-4 mb-1">{formErrors.confirmPsw}</p>}

                <label className="mt-2 flex items-center tracking-tight">
                  <input
                      
                      type = "checkbox"
                      name="agreeTerms"
                      checked = {agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mr-4 accent-indigo-800 rounded-lg"
                  />
                  I agree to the
                  <a href="#" className="ml-2 underline text-indigo-700"> Terms & Conditions</a>
                  {formErrors.agreeTerms && <span className="text-red-600 text-sm ml-4">({formErrors.agreeTerms})</span>}
                </label>
                
                { error && (
                  <div className="rounded-lg border border-red-500 bg-red-100 p-3 mt-2 -mb-1 lg:-mb-5 text-sm text-red-400">
                    {error} 
                  </div>
                )}

                {loading ? 
                  <button type="submit" disabled className={`w-full btn-primary py-3 lg:py-4 mt-4 lg:mt-8 text-neutral-100 rounded-lg`}>
                    Sign Up
                  </button> :
                  <button type="submit" className={`w-full btn-primary py-3 lg:py-4 mt-4 lg:mt-8 text-neutral-100 rounded-lg`}>
                    Sign Up
                  </button>
                }
                    
                <button type="submit" disabled={loading} className={`w-full btn-primary py-3 lg:py-4 mt-4 lg:mt-8 text-neutral-100 rounded-lg  ${loading ? "bg-(--accent-disabled)":""}`}>
                  {loading ? "Creating Account..." : "Sign Up"}
                </button>
              </div>
            </div>
          </form>
        )}
          
        {step === 2 && (
          <VerifyEmail 
            email = {data.success ? formData.email : ""} 
            className="flex-1 w-full h-full px-2 lg:px-20 py-8 relative " 
            onBack={()=> setStep(1)}
            onResend={handleSubmit}
            serverError={error}
          />
        )}
      </main>
    </div>
  )
}
