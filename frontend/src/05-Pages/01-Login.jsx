 import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
 
import { toast } from "react-toastify";
import { loginSchema } from "../06-ZodValidation/loginSchema";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useQueryClient } from "@tanstack/react-query";
 
import { useLogin } from "../03-features/user/hook/useLogin";
 

export default function Login() {
    const [formdata, setformData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);

    const { mutate } = useLogin();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setformData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Zod validation
        const parsed = loginSchema.safeParse(formdata);
        if (!parsed.success) {
            setError(parsed.error.issues[0].message);
            return;
        }

        setProcessing(true);
        setError(""); // Clear previous errors

        mutate(formdata, {

            onSuccess: async (data) => {
             
                toast.success(data.message);
                setformData({
                    email: "",
                    password: "",
                });

                try {

                await queryClient.invalidateQueries({ queryKey: ["userDetails"] });  // React Query marks the cache as invalid, so the next access will trigger a refetch from the server.
                navigate('/', { replace: true });
                } catch (err) {
                    console.error("Failed to invalidate queries:", err);
                    navigate('/dashboard', { replace: true });
                }
            },
            onError: (err) => {
                setError(err.response?.data?.message || "Something went wrong");
            },
            onSettled: () => {
                setProcessing(false); // Stop processing after request completes
            }
        });
    }

    return (
        <section className="flex justify-center mt-15 px-2">
            <div className="flex flex-col gap-6 w-auto sm:w-[50%] lg:w-[45%] xl:w-[30%] h-auto shadow-xl rounded-2xl py-4 font-normal">
                <div className="bg-blue-600 h-20 rounded-t-2xl flex justify-center items-center text-white text-xl font-bold">
                    Login or Sign Up
                </div>

                <form className="flex flex-col gap-6 font-medium px-2 sm:px-6" onSubmit={handleSubmit}>
                    <div className="relative w-full">
                        <label htmlFor='email' className="font-semibold">Email :</label>
                        <input
                            type='text'
                            id='email'
                            className='bg-blue-50 w-full p-2 border-2 border-gray-300 rounded outline-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-blue-600 transform duration-200 ease-in-out'
                            name='email'
                            value={formdata.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                            required
                        />
                        <MdEmail className="inline absolute right-3 top-1/2 text-gray-400 text-2xl"/>
                    </div>

                    <div className="relative w-full">
                        <label htmlFor='password' className="font-semibold">Password :</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id='password'
                            className='bg-blue-50 w-full p-2 border-2 border-gray-300 rounded outline-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-blue-600 transform duration-200 ease-in-out'
                            name='password'
                            value={formdata.password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                            required
                        />
                        <button 
                            type="button" 
                            className="cursor-pointer" 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <FaRegEye className="inline absolute right-3 top-1/2 text-gray-400 text-2xl"/>
                            ) : (
                                <FaEyeSlash className="inline absolute right-3 top-1/2 text-gray-400 text-2xl"/>
                            )}
                        </button>                     
                    </div>
                    
                     <div className="-mt-6 w-full flex justify-end">
                        <Link 
                        to="/auth/forgot-password" 
                        className="hover:text-blue-600 font-semibold text-lg"
                    >
                        Forgot Password ?
                    </Link>
                     </div>

                    {error && (
                        <div className="text-red-600 font-medium">{error}</div>
                    )}

                    <div>
                        <button 
                            type="submit" 
                            className="flex justify-center items-center gap-2 text-sm sm:text-sm md:text-md lg:text-lg bg-gray-600 hover:bg-gray-800 text-white w-full font-bold rounded-lg p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
                            disabled={formdata.email.length === 0 || formdata.password.length === 0 || processing}
                        >
                            {processing ? (
                                <>
                                    <ClipLoader color="white" loading size={22}/> 
                                    <span>Logging in...</span>
                                </>
                            ) : "Login"}
                        </button>

                    
                    </div>

                    <h1 className="text-center text-gray-500 text-xs sm:text-sm md:text-md lg:text-lg font-normal">
                        New user?{" "}
                        <Link to="/auth/register">
                            <span className="text-blue-700 text-sm sm:text-sm md:text-md lg:text-lg font-bold hover:underline hover:decoration-2 decoration-blue-700">
                                Sign Up
                            </span>
                        </Link>
                    </h1>
                </form>
            </div>
        </section>
    );
}