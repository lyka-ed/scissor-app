import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logo.png";
import bg from "../assets/loginbg.jpg";
import Input from "../components/Input";

export default function Login() {
  return (
    <section className="h-screen w-full grid lg:grid-cols-2">
      <div className="p-[30px] grid place-items-center">
        <div className="lg:w-[536px]">
          <div className="w-[146px] h-[55px]">
            <img
              className="w-full h-full object-contain"
              src={logo}
              alt="Sci.ly"
            />
          </div>
          <div>
            <div className="grid gap-5">
              <button className="flex items-center gap-2 rounded border border-[#D6D6E1] px-4 py-2 w-full justify-center">
                <FcGoogle size={24} />
                <p className="text-lg text-[#878BA9]">
                  Create account With Google
                </p>
              </button>
              <div className="flex items-center gap-5 lg:w-[342px] w-[242px] mx-auto">
                <div className="h-[1px] w-full bg-[#B1B3C8]"></div>
                <p className="text-sm text-[#878BA9]">Or</p>
                <div className="h-[1px] w-full bg-[#B1B3C8]"></div>
              </div>
            </div>
            <div className="mt-5">
              <h2 className="text-[#222222] md:text-[32px] text-[22px] font-bold">
                Log into your account
              </h2>
              <p className="text-[#686C8F] mb-7">
                Welcome Back. Please enter your details to log into your account
              </p>
            </div>
            <div className="grid gap-[20px]">
              <Input
                placeholder="daniellawinchester@example.com"
                name="email"
                label="Email Address"
                type="email"
              />
              <Input
                placeholder="******"
                name="password"
                label="Password"
                type="password"
              />
            </div>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1">
                <input
                  className="outline-none border-none"
                  type="checkbox"
                  name=""
                  id=""
                />
                <p className="text-xs text-[#878BA9]">Remember me</p>
              </div>
              <p className="text-[#1B48DA] text-sm">Forgot password?</p>
            </div>
            <div className="mt-10">
              <button className="h-[48px] px-4 py-2 rounded bg-[#1B48DA] text-white w-full">
                Create Account
              </button>
              <p className="text-center font-medium mt-1">
                <span className="text-[#D6D6E1]">Don't have an account?</span>{" "}
                <span className="text-[#1B48DA]">Create Account</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          background: `url(${bg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="hidden lg:block"
      ></div>
    </section>
  );
}
