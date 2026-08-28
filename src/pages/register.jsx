import { useState } from "react";
import { businessAvatar, signUpLarge, resumeIcon, EyeIcon, EyeOffIcon } from "../assets/signupPage.assets";
import SmoothImage from "../components/ui/SmoothImage";
import { siteLogo as SiteLogo } from "../assets/Nav";
import Navbar from "../components/navbar";

export default function register(){
    const [role, setRole] = useState("applicant");
    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");
    const [confirmPsw, setConfirmPsw] = useState("");
    const [showPsw, setShowPsw] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleHidePsw = (e) =>{

    }

    return (
        <div className="flex justify-center align-center">
            <main className="fixed inset-0 py-3 px-4  w-full h-[100%] flex items-center gap-4  max-h-[920px]">
                
                <article className="flex-1 relative flex items-center rounded-2xl overflow-hidden h-full">
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

                <form className="py-8 flex-1 relative px-20" >

                    <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-4 z-1"
                        style={{ backgroundImage: `url(${businessAvatar})`}}
                    />

                    <div className="z-2 relative">
                        
                        <h1 className="text-4xl font-bold">Get Started Now</h1>

                        <p className="text-sm
                        mt-6 mb-8 pl-4">Already have an account?, 
                            <a href="" className="border-b-1 text-indigo-600 focus-visible:ring-2 focus-visible:ring-[#302b5f59] focus-visible:outline-none "> Login here</a>
                        </p>

                        

                        <div className="w-full flex flex-wrap justify-around gap-x-4">

                            <h2 className="text-(--dull-bg) text-sm mb-2 font-medium pl-4 w-full">How are you planning to use veetKazi?</h2>

                            {[
                                {
                                    type: "applicant",
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
                                    onClick = {()=> setRole(r.type) }
                                    onKeyDown={(e) => {

                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            setRole(r.type);
                                        }
                                    }}
                                >
                                    
                                    <div className="">
                                        <input
                                        id = {r.type + "-role"}
                                            type ="radio"
                                            value = {r.type}
                                            name = "role"
                                            checked = { role === r.type }
                                            onChange = {e => setRole(r.type) }
                                            tabIndex={-1}
                                            className = "text-right pointer-events-none"
                                        />
                                    
                                        <label htmlFor={r.type + "-role"} className="pl-3 pointer-events-none"><span className="inline-block capitalize text-right text-lg font-bold mb-[1px]">{r.type}</span>
                                            <p className="text-sm text-neutral-500">{r.desc}</p>
                                        </label>
                                        
                                    </div>
                                    
                                </div>
                            ))}

                        </div>

                        <div className="my-10 w-full">

                            <input
                                type = "email"
                                id = "email"
                                placeholder="Email"
                                name="email"
                                value = {email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-(--dull-bg2) rounded-lg placeholder:text-neutral-400"
                            />

                            <div className="relative">
                                <input
                                    type = {showPsw ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value = {psw}
                                    onChange={(e) => setPsw(e.target.value)}
                                    className="w-full bg-(--dull-bg2) rounded-lg placeholder:text-neutral-400"
                                />

                                <button 
                                    className="absolute top-4 right-6 text-neutral-600 focus-visible:ring-2 focus-visible:ring-[#302b5f59]
                                    focus-visible:outline-none " 
                                    type="button" 
                                    tabIndex={0}
                                    onClick={() => setShowPsw((prev)=> !prev)}
                                >
                                    {showPsw ? <EyeOffIcon/> : <EyeIcon/>}
                                </button>

                                <input
                                    
                                    type = {showPsw ? "text" : "password"}
                                    id = "password-confirm"
                                    placeholder="Confirm your password"
                                    value = {confirmPsw}
                                    onChange={(e) => setConfirmPsw(e.target.value)}
                                    className="w-full bg-(--dull-bg2) rounded-lg  placeholder:text-neutral-400"
                                />
                                <label className="flex tracking-tight">
                                    <input
                                        
                                        type = "checkbox"
                                        name="agreeTerms"
                                        checked = {agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                        className="mr-4 accent-indigo-800 rounded-lg"
                                    />
                                    I agree to the<a href="#" className="ml-2 underline text-indigo-700"> Terms & Conditions</a>
                                </label>
                                
                                <button type="submit" className="w-full bg-(--accent) py-4 mt-8  text-neutral-100 rounded-lg">Create Account</button>

                            </div>
                        </div>
                    </div>
                </form>
                

            </main>
        </div>
    )
}
