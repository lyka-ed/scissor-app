import bg from "../assets/loginbg.jpg";
import logo from "../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import Input from "../components/Input";

export default function SignUp() {
  return (
    <section className="h-screen w-full grid lg:grid-cols-2 grid-cols-1">
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
            <h2 className="text-[#222222] md:text-[32px] text-[22px] font-bold">
              Create Account
            </h2>
            <p className="text-[#686C8F] mb-7">
              Create a new account to start shortening URLs.
            </p>
            <div className="grid gap-5">
              <button className="flex items-center gap-2 rounded border border-[#D6D6E1] px-4 py-2 w-full justify-center">
                <FcGoogle size={24} />
                <p className="text-lg text-[#878BA9]">
                  Create account With Google
                </p>
              </button>
              <div className="flex items-center gap-5 md:w-[342px] w-[242px] mx-auto">
                <div className="h-[1px] w-full bg-[#B1B3C8]"></div>
                <p className="text-sm text-[#878BA9]">Or</p>
                <div className="h-[1px] w-full bg-[#B1B3C8]"></div>
              </div>
            </div>
            <div className="grid gap-[20px] mt-5">
              <Input
                placeholder="Daniella"
                name="firstname"
                label="First Name"
                type="text"
              />
              <Input
                placeholder="Winchester"
                name="lastname"
                label="Last Name"
                type="text"
              />
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
                <span className="text-[#D6D6E1]">Already have an account?</span>{" "}
                <span className="text-[#1B48DA]">Sign Up</span>
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
