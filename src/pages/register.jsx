import { useState } from "react";
import { businessAvatar, signUpLarge, resumeIcon } from "../assets/signupPage.assets";
import { siteLogo as SiteLogo } from "../assets/Nav";
import Navbar from "../components/navbar";

export default function register(){
    const [role, setRole] = useState("applicant");

    const handleSetRole = (e) => setRole(e.target.value);

    return (
        <div className="flex justify-center align-center">
            <main className="fixed inset-0 py-3 px-4  w-full h-[100%] flex space-between gap-20">
                
                <article className="flex-1 relative flex items-center rounded-2xl overflow-hidden">
                    <div className="absolute left-4 top-4 z-20">
                        <SiteLogo className="w-[150px] text-slate-100 hover:text-[#F79F56] stroke-current transition-colors" />
                    </div>
                    
                    <div className="w-full h-full bg-top">
                        <img className="object-cover w-full h-full object-top" src={ signUpLarge } alt="site-logo"/>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 via-40% to-black"></div>
                    </div>

                    <div className="absolute bottom-30 left-1/2 -translate-x-1/2">
                        <h2 className="text-4xl text-slate-50 whitespace-nowrap tracking-tight">Land the role, not just the <strong>interview</strong></h2>
                        <p className="text-slate-400 text-md tracking-tight">Optimize your resume for applicant tracking systems and practice real interview scenarios to walk in fully prepared.</p>
                    </div>

                </article>
                <article className="py-8 flex-1 relative" >

                    <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-4 z-1"
                        style={{ backgroundImage: `url(${businessAvatar})` }}
                    />

                    <div className="z-2 relative">
                        
                        <h1 className="text-4xl font-bold )">Get Started Now</h1>
                        


                        <p className="text-sm
                        mt-4 mb-8">Already have an account?, 
                            <a href="" className="border-b-1 text-indigo-600"> Login here</a>
                        </p>

                        {/* <p>Create a new account to get started with veetKazi right away</p> */}

                        <h2 className="text-(--accent) text-sm mb-2 font-medium pl-4">How are you planning to use veetKazi?</h2>

                        <div className="w-full flex justify-around gap-4">
                            

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
                                <div className="relative flex-1 bg-(--main-bg) z-1 border-1 py-3 px-6 rounded-2xl overflow-hidden border-zinc-200" key={r.type + "-role"}>
                                    
                                    <div className="">
                                        <input
                                        id = {r.type + "-role"}
                                            type ="radio"
                                            value = {r.type}
                                            name = "role"
                                            checked = { role === r.type }
                                            onChange = { handleSetRole }
                                            className = "text-right"
                                        />
                                    
                                        <label htmlFor={r.type + "-role"} className="pl-3"><span className="inline-block capitalize text-right text-lg font-bold mb-[1px]">{r.type}</span>
                                            <p className="text-sm text-neutral-500">{r.desc}</p>
                                        </label>
                                        
                                    </div>
                                    
                                </div>
                            ))}

                        </div>

                        {/* <img src={businessAvatar} className="opacity-10 absolute bottom-0 left-0 z-0"/> */}
                    </div>
                </article>
                

            </main>
        </div>
    )
}