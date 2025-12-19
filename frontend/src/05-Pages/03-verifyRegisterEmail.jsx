 import { MdOutlineSecurity } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { ClipLoader } from "react-spinners";

import { useVerifyEmail } from "../03-features/user/hook/useVerifyEmail";
import { clearUser } from "../03-features/user/hook/01-useSlice";
import { useResendCode } from "../03-features/user/hook/useResendCode";

export default function VerifyRegisterEmail() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(300);
  const intervalRef = useRef(null);
  const [processing, setProcessing] = useState(false);
  const [processingResendOTP, setProcessingResendOTP] = useState(false);
  const [error, setError] = useState("");

  const { name, email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate } = useVerifyEmail();
  const { mutate: resendCode } = useResendCode();

  function startTimer(seconds) {
    clearInterval(intervalRef.current);
    setTimer(seconds);

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    startTimer(258);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    document.getElementById("code-0")?.focus();
  }, []);

  const min = String(Math.floor(timer / 60)).padStart(2, "0");
  const sec = String(timer % 60).padStart(2, "0");

  function handleChange(e, index) {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const codeString = code.join("");

    setProcessing(true);

    mutate(
      { email, code: codeString },
      {
        onSuccess: () => {
          toast.success("Email verified!");
          setCode(["", "", "", "", "", ""]);

          dispatch(clearUser());
          navigate("/auth/login", { replace: true });
        },
        onError: (error) => {
          setError(error.response?.data?.message || "Something went wrong");
        },
        onSettled: () => setProcessing(false),
      }
    );
  }

  function handleResend() {
    if (timer !== 0) return;

    setProcessingResendOTP(true);

    resendCode(
      { name, email },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          startTimer(300);
        },
        onError: (error) => {
          setError(error.response?.data?.message || "Failed to resend code");
        },
        onSettled: () => setProcessingResendOTP(false),
      }
    );
  }

  return (
    <section className="flex justify-center mt-15 px-2">
      <div className="flex flex-col gap-6 sm:w-[50%] xl:w-[30%] shadow-lg rounded-lg py-4">
        <div className="bg-blue-600 h-20 rounded-t-lg flex justify-center items-center text-white text-xl font-bold">
          Verify Register Email
        </div>

        <form className="px-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 border-l-3 border-blue-600 bg-slate-200 p-4 rounded-lg">
            <h1 className="font-semibold">
              <MdOutlineSecurity className="inline text-blue-600" /> Email
              Verification Method
            </h1>

            <p>Enter the 6-digit code sent to your email:</p>

            <div className="flex gap-3 justify-center mt-4">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="bg-blue-50 w-10 h-10 text-center text-xl border rounded"
                />
              ))}
            </div>

            <p className="text-center">
              Code expires in:{" "}
              <span className={timer === 0 ? "text-red-600" : "text-black"}>
                {min}:{sec}
              </span>
            </p>

            <p className="text-center">
              Didn’t receive the code?{" "}
              <button
                type="button"
                disabled={timer !== 0 || processingResendOTP}
                onClick={handleResend}
                className="font-bold disabled:opacity-50"
              >
                {processingResendOTP ? "Sending..." : "Resend OTP"}
              </button>
            </p>

            {error && <div className="text-red-600">{error}</div>}

            <button
              type="submit"
              className="flex justify-center items-center gap-2 bg-gray-600 text-white p-2 rounded-lg disabled:opacity-50"
              disabled={code.includes("")}
            >
              {processing ? (
                <>
                  <ClipLoader size={22} color="white" /> verifying...
                </>
              ) : (
                "Verify"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
