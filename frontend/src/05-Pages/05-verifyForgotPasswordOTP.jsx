 import { MdOutlineSecurity } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
 
 
import { toast } from 'react-toastify';
import {  useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { useResendResetPasswordCode, useVerifyOTP } from "../03-features/user/hook/useforgot-password";

export default function VerifyForgotPasswordOTP(){
    const [code, setCode] = useState(["", "", "", "", "", ""]); // We keep the 6 digits in an array.
    const [timer,setTimer]=useState(300)// Example: 5 min = 285 seconds
    const intervalRef=useRef(null);

    const [error,setError]=useState("");

    // const location = useLocation();
    // const {name,email}=location.state || {};// get email from navigation , location.state is temporary — refreshing the page will erase it unless you store it elsewhere (like context, Redux, or localStorage).  , so we use Redux
    const {name,email}=useSelector((state)=>state.user);
      



    const navigate = useNavigate();
    const { mutate } = useVerifyOTP();
    const {mutate:resendCode}=useResendResetPasswordCode();

    const [processing, setProcessing] = useState(false);
    const [processingResendOTP, setProcessingResendOTP] = useState(false);
    



    function startTimer(seconds){
         clearInterval(intervalRef.current); // stop any existing interval
         setTimer(seconds);

        intervalRef.current= setInterval(() => {
        setTimer(prev => {
            if (prev <= 1) {
                clearInterval(intervalRef.current);
                return 0;
            }
            return prev - 1;
        });
    }, 1000);

    }

useEffect(() => {
    startTimer(300)

    return () => clearInterval(intervalRef.current);

 }, []);


    // autofouc on emty box
    useEffect(() => {
        const firstEmpty = document.getElementById("code-0");
        firstEmpty?.focus();
    }, []);


    const min=String(Math.floor(timer/60)).padStart(2,"0"); //.padStart(2,"0") -->This ensures that even if minutes or seconds are less than 10, it shows two digits , if "min=45" it will be 45
    const sec=String(timer%60).padStart(2,"0");

    function handleChange(e,index){
        const value=e.target.value;
        if(/^[0-9]?$/.test(value)){
            const newCode=[...code];
            newCode[index]=value;
            setCode(newCode);

            //value → Checks if you typed something in the current box (i.e., it's not empty).
            if(value && index < 5){
                const nextInput=document.getElementById(`code-${index+1}`);
                if(nextInput){
                    nextInput.focus();
                }
            }
        }
        
    }


    function handleKeyDown(e,index){
        if(e.key==="Backspace"){
            if(code[index]===""){
                if(index >0){
                    const prevInput = document.getElementById(`code-${index - 1}`);
                    if(prevInput){
                        prevInput.focus();
                    }
                }
            }
        }
    }


    function handleSubmit(e){
        
        const codeString=code.join(""); // .join("") joins all array elements into a single string without any separator.
       
         e.preventDefault();

         setProcessing(true);
         mutate({email,code:codeString},{
            onSuccess:()=>{
                toast.success("Email verified!");
                setCode(["", "", "", "", "", ""]);

                 navigate("/auth/reset-Password",{replace:true}); // Redirect to login or dashboard
            },
            onError: (error) => {
            setError(error.response?.data?.message || "Something went wrong")
            
        },
            onSettled:()=>{
                setProcessing(false); // Stop processing after request completes
            }

         })
    }



    function handleResend() {
    if(timer === 0) {
        // Example: call backend API to resend the code

        setProcessingResendOTP(true)
        resendCode({email},{
            onSuccess:(data)=>{
                toast.success(data.message);
                startTimer(300)  // Reset timer to 5 minutes
            },
            onError:(error)=>{
                setError(error.response?.data?.message || "Failed to resend code")
            },
            onSettled:()=>{
                setProcessingResendOTP(false); // Stop processing after request completes
            }

        })
         
    }
}



    return(
        <>
            <section className="flex justify-center mt-15 px-2">
                 <div className="flex flex-col gap-6 w-auto  sm:w-[50%]  lg:w-[45%] xl:w-[30%]  h-auto shadow-lg rounded-lg py-4">
                    <div className="bg-blue-600 h-20 rounded-t-lg flex justify-center items-center text-white text-xl font-bold">
                        Verify OTP
                    </div>


                    <form className="px-2 sm:px-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6 border-l-3 border-blue-600 bg-slate-200 font-normal my-2 p-2 rounded-lg">
                            <h1 className="font-semibold "><MdOutlineSecurity className="inline text-blue-600"/> OTP Verification Method</h1>
                            <p className="text-xs sm:text-sm md:text-md lg:text-lg">We'll send a 6-digit code to your email address for verification:</p>
                             
            
                            <div>
                                    <p className="text-center text-xs sm:text-sm md:text-md lg:text-lg">Enter the 6-digit code sent to your email address:</p>
                                    <div className="flex gap-3 justify-center mt-4">
                                        {
                                            code.map((digit,index)=>(
                                                <input key={index} id={`code-${index}`} type="text" maxLength="1" value={digit}  onChange={(e)=>handleChange(e, index)} onKeyDown={(e)=>{handleKeyDown(e, index)}} className='bg-blue-50  w-8 h-8 lg:w-12 lg:h-12  text-center text-xl border-2 border-gray-300 rounded outline-none focus:outline-none focus:ring-3 focus:ring-gray-300 focus:border-blue-600 transform duration-200 ease-in-out' />
                                            ))
                                        }
                                    </div>
                            </div>
            
                            
                            <div>
                                <p className="text-center text-gray-500 text-xs sm:text-sm md:text-md lg:text-lg">Code expires in: <span className={`text-md ${timer===0?"text-red-600":"text-black"}`}>{min}:{sec}</span></p>
                                <p className="text-center text-xs sm:text-sm md:text-md lg:text-lg">Didn't receive the code?  <button type="button" className={`font-bold text-sm sm:text-sm md:text-md  lg:text-lg cursor-pointer ${timer===0?"text-red-600":"text-black"} disabled:opacity-50  disabled:cursor-not-allowed`} onClick={handleResend} disabled={timer!==0 || processingResendOTP}>{(processingResendOTP)?"Sending OTP..." :"Rsend OTP"}</button></p>
                            </div>

                            


                            {/* show all errror in this box if is there */}
                    {
                        error.length !==0 && <div className="text-red-600 font-medium">{error}</div>
                    }


                            <div>
                                <button type="submit" className="flex justify-center items-center gap-2 bg-gray-600 hover:bg-gray-800 text-center text-white w-full font-bold rounded-lg p-2 cursor-pointer disabled:opacity-50  disabled:cursor-not-allowed" disabled={code.includes("")}>
                                   {(processing)?<><ClipLoader className="" color="white" loading size={22}/> <span>verifying...</span> </>  :"Verify"}
                                </button>
                            </div>
            
                        </div>
                    </form>


                    
                </div>
            </section>
        </>
    )
}