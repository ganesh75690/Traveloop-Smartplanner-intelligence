import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plane, Eye, EyeOff, ArrowLeft, Mail, Phone, Check, X, RefreshCw } from "lucide-react";
import useAuth from "../hooks/useAuth";
import PageTransition from "../components/ui/PageTransition";

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

function Field({ label, type = "text", placeholder, value, onChange, showToggle }) {
  const [show, setShow] = useState(false);
  const inputType = showToggle ? (show ? "text" : "password") : type;

  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-[#F8FAFF] border border-[#E5E9F2] rounded-xl px-4 py-3 text-sm text-[#1A1A2E] placeholder-[#9CA3AF] outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 hover:border-[#C7D4F0] transition-all duration-200 font-medium"
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

const LoginForm = ({ onSwitch }) => {
  const [form, setForm] = useState({ email: "", password: "", captcha: "", role: "user" });
  const [captchaCode, setCaptchaCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Generate random CAPTCHA code
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setForm({ ...form, captcha: "" });
  };

  // Initialize CAPTCHA on component mount
  useState(() => {
    generateCaptcha();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.captcha.toUpperCase() !== captchaCode) {
      setError("Invalid CAPTCHA. Please try again.");
      generateCaptcha();
      return;
    }
    
    setLoading(true);
    setError("");
    const result = await login(form.email, form.password, form.role);
    setLoading(false);
    if (result.success) {
      // Redirect based on role
      if (form.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError(result.message);
      generateCaptcha();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-[#006CE4] hover:text-[#0057B8] font-medium mb-4 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Welcome
      </button>
      <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">Welcome back</h2>
      <p className="text-sm text-[#6B7280] mb-6">Sign in to continue planning your trips</p>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-xl mb-4">
        <p className="text-xs text-[#EF4444] font-medium">{error}</p>
      </div>
      )}

      {/* Role Selection */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-[#374151] mb-2 uppercase tracking-wider">
          Sign in as
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="relative">
            <input
              type="radio"
              name="loginRole"
              value="user"
              checked={form.role === "user"}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="sr-only peer"
            />
            <div className="p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 peer-checked:border-[#006CE4] peer-checked:bg-[#E8F1FD] border-[#E5E9F2] bg-white hover:border-[#C7D4F0]">
              <div className="flex flex-col items-center text-center">
                <div className="w-6 h-6 bg-[#006CE4]/10 rounded-lg flex items-center justify-center mb-1">
                  <svg className="w-3 h-3 text-[#006CE4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-[#1A1A2E]">User</span>
                <span className="text-xs text-[#6B7280]">Traveler</span>
              </div>
            </div>
          </label>
          
          <label className="relative">
            <input
              type="radio"
              name="loginRole"
              value="admin"
              checked={form.role === "admin"}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="sr-only peer"
            />
            <div className="p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 peer-checked:border-[#006CE4] peer-checked:bg-[#E8F1FD] border-[#E5E9F2] bg-white hover:border-[#C7D4F0]">
              <div className="flex flex-col items-center text-center">
                <div className="w-6 h-6 bg-[#006CE4]/10 rounded-lg flex items-center justify-center mb-1">
                  <svg className="w-3 h-3 text-[#006CE4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-[#1A1A2E]">Admin</span>
                <span className="text-xs text-[#6B7280]">Manager</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      <Field label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Field label="Password" placeholder="•••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} showToggle />

      {/* CAPTCHA Verification */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-[#374151] mb-2 uppercase tracking-wider">
          Verify you're human
        </label>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="bg-white px-4 py-2 rounded-lg border border-gray-300 select-none">
                <span className="text-xl font-bold text-gray-800 tracking-widest">
                  {captchaCode}
                </span>
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh CAPTCHA"
              >
                <RefreshCw size={16} />
              </button>
            </div>
            <div className="text-xs text-gray-500">
              Case-insensitive
            </div>
          </div>
          <input
            type="text"
            placeholder="Enter the letters above"
            value={form.captcha}
            onChange={(e) => setForm({ ...form, captcha: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-center text-lg font-medium tracking-widest"
            maxLength={6}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="flex justify-end -mt-2 mb-4">
        <button type="button" className="text-xs text-[#006CE4] hover:text-[#0057B8] font-semibold hover:underline">
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading || !form.captcha}
        className="w-full py-3 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-[#E5E9F2]" />
        <span className="text-xs text-[#9CA3AF] font-medium">or continue with</span>
        <div className="flex-1 h-px bg-[#E5E9F2]" />
      </div>

      <button
        type="button"
        className="w-full py-2.5 border border-[#E5E9F2] bg-white rounded-xl text-sm text-[#374151] font-semibold hover:border-[#C7D4F0] hover:bg-[#F8FAFF] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
      >
        <GoogleIcon /> Continue with Google
      </button>

      <p className="mt-5 text-center text-sm text-[#6B7280]">
        Don't have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-[#006CE4] font-bold hover:underline">
          Sign up free
        </button>
      </p>
    </form>
  );
};

const SignupForm = ({ onSwitch }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    country: "",
    role: "user",
    travelPreferences: []
  });
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSendEmailOtp = async () => {
    setLoading(true);
    setError("");
    // Simulate sending OTP
    setTimeout(() => {
      setLoading(false);
      alert(`Email OTP sent to ${form.email} (Demo: 123456)`);
    }, 1500);
  };

  const handleSendPhoneOtp = async () => {
    setLoading(true);
    setError("");
    // Simulate sending OTP
    setTimeout(() => {
      setLoading(false);
      alert(`SMS OTP sent to ${form.phone} (Demo: 654321)`);
    }, 1500);
  };

  const handleVerifyEmail = async () => {
    setLoading(true);
    setError("");
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      if (emailOtp === "123456") {
        setEmailVerified(true);
        alert("Email verified successfully!");
      } else {
        setError("Invalid email OTP. Try 123456 for demo.");
      }
    }, 1000);
  };

  const handleVerifyPhone = async () => {
    setLoading(true);
    setError("");
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      if (phoneOtp === "654321") {
        setPhoneVerified(true);
        alert("Phone number verified successfully!");
      } else {
        setError("Invalid phone OTP. Try 654321 for demo.");
      }
    }, 1000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!emailVerified || !phoneVerified) {
      setError("Please verify both email and phone number before proceeding.");
      return;
    }
    setLoading(true);
    setError("");
    const result = await register(form);
    setLoading(false);
    if (result.success) {
      // Redirect based on role
      if (form.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-[#006CE4] hover:text-[#0057B8] font-medium mb-4 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Welcome
      </button>
      
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {stepNumber}
            </div>
            {stepNumber < 3 && (
              <div className={`w-16 h-1 mx-2 ${
                step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
              }`}></div>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1">Create account</h2>
      <p className="text-sm text-[#6B7280] mb-6">
        {step === 1 && "Fill in your personal information"}
        {step === 2 && "Verify your email and phone number"}
        {step === 3 && "Complete your profile and preferences"}
      </p>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-xl mb-4">
          <p className="text-xs text-[#EF4444] font-medium">{error}</p>
        </div>
      )}

      {/* Step 1: Personal Information */}
      {step === 1 && (
        <div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="First name" placeholder="Alex" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
            <Field label="Last name" placeholder="Ray" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
          </div>
          <Field label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Field label="Phone" type="tel" placeholder="+1 (555) 123-4567" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Field label="Date of Birth" type="date" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} />
          <Field label="Country" placeholder="United States" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
          
          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#374151] mb-2 uppercase tracking-wider">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="relative">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={form.role === "user"}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="sr-only peer"
                />
                <div className="p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 peer-checked:border-[#006CE4] peer-checked:bg-[#E8F1FD] border-[#E5E9F2] bg-white hover:border-[#C7D4F0]">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 bg-[#006CE4]/10 rounded-lg flex items-center justify-center mb-2">
                      <svg className="w-4 h-4 text-[#006CE4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-[#1A1A2E]">User</span>
                    <span className="text-xs text-[#6B7280] mt-1">Plan trips & explore</span>
                  </div>
                </div>
              </label>
              
              <label className="relative">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={form.role === "admin"}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="sr-only peer"
                />
                <div className="p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 peer-checked:border-[#006CE4] peer-checked:bg-[#E8F1FD] border-[#E5E9F2] bg-white hover:border-[#C7D4F0]">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 bg-[#006CE4]/10 rounded-lg flex items-center justify-center mb-2">
                      <svg className="w-4 h-4 text-[#006CE4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-[#1A1A2E]">Admin</span>
                    <span className="text-xs text-[#6B7280] mt-1">Manage & oversee</span>
                  </div>
                </div>
              </label>
            </div>
          </div>
          
          <Field label="Password" placeholder="Min. 8 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} showToggle />
          <Field label="Confirm Password" placeholder="Confirm your password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} showToggle />
          
          <button
            type="button"
            onClick={() => setStep(2)}
            disabled={!form.firstName || !form.lastName || !form.email || !form.phone || !form.password || form.password !== form.confirmPassword}
            className="w-full py-3 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed mt-4"
          >
            Continue to Verification
          </button>
        </div>
      )}

      {/* Step 2: Email and Phone Verification */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Email Verification */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Email Verification</span>
              </div>
              {emailVerified ? (
                <div className="flex items-center gap-1 text-green-600">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Verified</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSendEmailOtp}
                  disabled={loading || !form.email}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium disabled:opacity-50"
                >
                  Send OTP
                </button>
              )}
            </div>
            
            {!emailVerified && (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={handleVerifyEmail}
                  disabled={loading || emailOtp.length !== 6}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Verify
                </button>
              </div>
            )}
          </div>

          {/* Phone Verification */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                <span className="font-medium">Phone Verification</span>
              </div>
              {phoneVerified ? (
                <div className="flex items-center gap-1 text-green-600">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Verified</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSendPhoneOtp}
                  disabled={loading || !form.phone}
                  className="text-green-600 hover:text-green-700 text-sm font-medium disabled:opacity-50"
                >
                  Send OTP
                </button>
              )}
            </div>
            
            {!phoneVerified && (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={phoneOtp}
                  onChange={(e) => setPhoneOtp(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={handleVerifyPhone}
                  disabled={loading || phoneOtp.length !== 6}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  Verify
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setStep(3)}
            disabled={!emailVerified || !phoneVerified}
            className="w-full py-3 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed mt-4"
          >
            Continue to Preferences
          </button>
        </div>
      )}

      {/* Step 3: Preferences and Terms */}
      {step === 3 && (
        <div>
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#374151] mb-2 uppercase tracking-wider">
              Travel Preferences
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Adventure', 'Beach', 'Cultural', 'Food & Cuisine', 'Nature', 'City Life'].map((preference) => (
                <label key={preference} className="flex items-center space-x-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.travelPreferences.includes(preference)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm({ ...form, travelPreferences: [...form.travelPreferences, preference] });
                      } else {
                        setForm({ ...form, travelPreferences: form.travelPreferences.filter(p => p !== preference) });
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{preference}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-start space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                required
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>
                I agree to <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </span>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex items-start space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>
                I'd like to receive travel tips, special offers, and personalized recommendations via email
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </div>
      )}

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-[#E5E9F2]" />
        <span className="text-xs text-[#9CA3AF] font-medium">or continue with</span>
        <div className="flex-1 h-px bg-[#E5E9F2]" />
      </div>

      <button
        type="button"
        className="w-full py-2.5 border border-[#E5E9F2] bg-white rounded-xl text-sm text-[#374151] font-semibold hover:border-[#C7D4F0] hover:bg-[#F8FAFF] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
      >
        <GoogleIcon /> Continue with Google
      </button>

      <p className="mt-5 text-center text-sm text-[#6B7280]">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-[#006CE4] font-bold hover:underline">
          Sign in
        </button>
      </p>
    </form>
  );
};

export default function AuthPage() {
  const [tab, setTab] = useState("login");

  return (
    <PageTransition>
    <div className="min-h-screen bg-[#EEF2FF] flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#006CE4]/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#003580]/6 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#006CE4]/4 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-6xl min-h-[560px] rounded-3xl overflow-hidden border border-[#E5E9F2] shadow-2xl">
        {/* Left panel */}
        <div
          className="hidden md:flex flex-col justify-between flex-1 p-10 relative overflow-hidden"
          style={{ background: "linear-gradient(145deg, #003580 0%, #005BB5 50%, #006CE4 100%)" }}
        >
          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
            }}
          />
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full" />

          {/* Logo */}
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <Plane size={20} className="text-[#006CE4]" strokeWidth={2.5} />
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">Traveloop</span>
          </div>

          {/* Tagline */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white leading-tight mb-4">
              Plan trips that feel like{" "}
              <span className="text-[#7EC8FF]">adventures</span>
            </h2>
            <p className="text-sm text-white/70 leading-relaxed max-w-[280px]">
              Build multi-city itineraries, track budgets, and share your journey with the world.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-col gap-2.5 relative z-10">
            {[
              { icon: "✈", text: "Multi-city trip planning" },
              { icon: "💰", text: "Budget tracking & insights" },
              { icon: "🗺", text: "Shareable itineraries" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/15">
                <span className="text-base">{f.icon}</span>
                <span className="text-sm text-white/85 font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 bg-white px-12 py-10 flex flex-col justify-center">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-6 md:hidden">
            <div className="w-8 h-8 bg-[#006CE4] rounded-xl flex items-center justify-center">
              <Plane size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[#003580] text-lg font-bold">Traveloop</span>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-[#F3F4F6] rounded-xl p-1 mb-7">
            {["login", "signup"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200
                  ${tab === t
                    ? "bg-white text-[#1A1A2E] shadow-sm"
                    : "text-[#6B7280] hover:text-[#374151]"
                  }`}
              >
                {t === "login" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          {tab === "login"
            ? <LoginForm onSwitch={() => setTab("signup")} />
            : <SignupForm onSwitch={() => setTab("login")} />
          }
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
