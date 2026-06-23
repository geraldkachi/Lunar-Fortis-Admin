import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Trophy } from "lucide-react";
import { Logo, OTPInput } from "@/components/ui";

function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
      <header className="bg-white border-b border-[#E5E7EB] h-14 flex items-center justify-between px-6">
        <Logo />
        <span className="text-sm text-[#6B7280]">Having an issue? <Link to="#" className="font-bold text-[#0D1B2A]">Support</Link></span>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-modal overflow-hidden">
          <div className="h-1.5 bg-[#0D1B2A]" />
          <div className="p-8">{children}</div>
        </div>
      </div>
      <div className="py-4 px-6 flex justify-between text-sm">
        <span className="text-[#6B7280]">Any trouble? <Link to="#" className="font-bold text-[#0D1B2A]">Contact support</Link></span>
        <div className="flex gap-4 text-[#6B7280]">
          <Link to="#">Privacy</Link><span>|</span><Link to="#">Terms</Link>
        </div>
      </div>
    </div>
  );
}

// ── Signup ────────────────────────────────────────────────────────────────────
export function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setLoading(false);
    setShowVerify(true);
  };

  return (
    <AuthShell>
      <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Create Account</h1>
      <div className="space-y-4">
        <div>
          <label className="lf-label">Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Typing |" className="lf-input" />
        </div>
        <div>
          <label className="lf-label">Label</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"><Lock size={15} /></span>
            <input type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••••" className="lf-input pl-9 pr-10" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
              {show ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-1.5">
            Password must be at least <strong className="text-[#0D1B2A]">8 Characters</strong> and must contain at least a{" "}
            <strong className="text-[#E8392A]">Capital Letter</strong>, a Number and a Special Character
          </p>
        </div>
        <button onClick={handleSignup} disabled={loading} className="btn-primary w-full">{loading ? "Creating..." : "Sign up"}</button>
        <p className="text-center text-sm text-[#6B7280]">Got an account? <Link to="/login" className="font-semibold text-[#0D1B2A]">Sign in</Link></p>
      </div>

      {showVerify && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-modal">
            <div className="bg-[#EEF3F8] rounded-t-2xl p-8 flex items-center justify-center">
              <div className="w-16 h-16 bg-[#0D1B2A] rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">i</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-base font-bold text-[#0D1B2A] text-center mb-2">Verify Email</h3>
              <p className="text-xs text-[#6B7280] text-center mb-5">Kindly check your email address for sign up verification details</p>
              <button onClick={() => { setShowVerify(false); navigate("/login"); }} className="btn-primary w-full">Close</button>
            </div>
          </div>
        </div>
      )}
    </AuthShell>
  );
}

// ── Login ─────────────────────────────────────────────────────────────────────
export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    navigate("/admin");
  };

  return (
    <AuthShell>
      <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Welcome Admin</h1>
      <div className="space-y-4">
        <div>
          <label className="lf-label">Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Typing |" className="lf-input" />
        </div>
        <div>
          <label className="lf-label">Label</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"><Lock size={15} /></span>
            <input type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••••" className="lf-input pl-9 pr-10" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
              {show ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-1.5">
            Password must be at least <strong className="text-[#0D1B2A]">8 Characters</strong> and must contain at least a Capital Letter, a Number and a Special Character
          </p>
        </div>
        <p className="text-sm"><Link to="/forgot-password" className="font-semibold italic text-[#4F7FAF] hover:underline">Forgot password? Reset here</Link></p>
        <button onClick={handle} disabled={loading} className="btn-primary w-full">{loading ? "Logging in..." : "Login"}</button>
        <p className="text-center text-sm text-[#6B7280]">New user? <Link to="/signup" className="font-semibold italic text-[#4F7FAF]">Create account</Link></p>
      </div>
    </AuthShell>
  );
}

// ── Forgot Password ───────────────────────────────────────────────────────────
type FPStep = "email" | "otp" | "change" | "success";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<FPStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [loading, setLoading] = useState(false);

  const next = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    if (step === "email") setStep("otp");
    else if (step === "otp") setStep("change");
    else if (step === "change") setStep("success");
    else navigate("/login");
  };

  return (
    <AuthShell>
      {step === "email" && (
        <>
          <h2 className="text-xl font-bold text-[#0D1B2A] mb-6">Forgot Password</h2>
          <div className="space-y-4">
            <div><label className="lf-label">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E.g johndoe@gmail.com" className="lf-input" /></div>
            <button onClick={next} disabled={loading} className="btn-primary w-full">{loading ? "Sending..." : "Verify Email"}</button>
            <p className="text-center text-sm text-[#6B7280]">Remember password? <Link to="/login" className="font-semibold italic text-[#4F7FAF]">Login</Link></p>
          </div>
        </>
      )}
      {step === "otp" && (
        <>
          <h2 className="text-xl font-bold text-[#0D1B2A] mb-2">Enter OTP</h2>
          <p className="text-xs text-[#6B7280] mb-5">Please provide the 6-digit OTP code send we sent to f****2@gmail.com</p>
          <OTPInput value={otp} onChange={setOtp} />
          <p className="text-xs text-[#6B7280] mt-3 mb-5">Didn't receive code? <button className="text-[#4F7FAF] font-semibold italic">Resend code in (1:17)</button></p>
          <button onClick={next} disabled={loading} className="btn-primary w-full">{loading ? "Verifying..." : "Confirm OTP"}</button>
        </>
      )}
      {step === "change" && (
        <>
          <h2 className="text-xl font-bold text-[#0D1B2A] mb-6">Change Password</h2>
          <div className="space-y-4">
            <div><label className="lf-label">Email Address</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Typing |" className="lf-input" /></div>
            <div>
              <label className="lf-label">New Password</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"><Lock size={15} /></span>
                <input type={showPw ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)} placeholder="••••••••" className="lf-input pl-9 pr-10" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">{showPw ? <EyeOff size={15}/> : <Eye size={15}/>}</button>
              </div>
              <p className="text-xs text-[#9CA3AF] mt-1">8 Characters min · Capital Letter · Number · Special Character</p>
            </div>
            <div>
              <label className="lf-label">Confirm New Password</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]"><Lock size={15}/></span>
                <input type={showCf ? "text" : "password"} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" className="lf-input pl-9 pr-10" />
                <button type="button" onClick={() => setShowCf(!showCf)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">{showCf ? <EyeOff size={15}/> : <Eye size={15}/>}</button>
              </div>
            </div>
            <button onClick={next} disabled={loading} className="btn-primary w-full">{loading ? "Resetting..." : "Reset Password"}</button>
          </div>
        </>
      )}
      {step === "success" && (
        <div className="text-center py-4">
          <Trophy size={72} className="text-[#0D1B2A] mx-auto mb-4" strokeWidth={1.5} />
          <h2 className="text-xl font-bold text-[#0D1B2A] mb-2">Password Changed</h2>
          <p className="text-xs text-[#6B7280] mb-6">Your password reset process for your account has been successfully completed. You can now access your account with your new password.</p>
          <button onClick={next} className="btn-primary w-full">Login</button>
        </div>
      )}
    </AuthShell>
  );
}
