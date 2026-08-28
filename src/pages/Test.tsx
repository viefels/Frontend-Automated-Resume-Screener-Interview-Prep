import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function SignupPage() {
  const [role, setRole] = useState<'applicant' | 'recruiter'>('applicant');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ role, ...formData, agreed });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Left Side Banner */}
        <div className="relative overflow-hidden rounded-3xl min-h-[520px] md:min-h-[640px] bg-gradient-to-b from-gray-700 via-gray-900 to-black text-white p-8 flex flex-col justify-between shadow-lg">
          {/* Background image overlay if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

          {/* Logo */}
          <div className="relative z-20 flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">
              vett<span className="text-blue-400">Kazi</span>
            </span>
          </div>

          {/* Copy text */}
          <div className="relative z-20 space-y-3 max-w-sm">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white">
              Land the role, not just the{' '}
              <span className="underline decoration-blue-500 underline-offset-4 font-extrabold">
                interview
              </span>
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Optimize your resume for applicant tracking systems and practice real interview scenarios to walk in fully prepared.
            </p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="flex flex-col justify-center px-2 sm:px-6 py-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-950 tracking-tight">Get Started Now</h1>
            <p className="text-sm text-gray-500 mt-1.5">
              Already have an account?{' '}
              <a href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline">
                Login here
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How are you planning to use veetKazi?
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Applicant Card */}
                <div
                  onClick={() => setRole('applicant')}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                    role === 'applicant'
                      ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/20'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input
                      type="radio"
                      name="role"
                      checked={role === 'applicant'}
                      onChange={() => setRole('applicant')}
                      className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <div>
                      <span className="block font-semibold text-gray-900 text-sm">Applicant</span>
                      <span className="block text-xs text-gray-500 leading-normal mt-1">
                        Get instant feedback on your resume and practice for your upcoming interviews.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recruiter Card */}
                <div
                  onClick={() => setRole('recruiter')}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                    role === 'recruiter'
                      ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/20'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input
                      type="radio"
                      name="role"
                      checked={role === 'recruiter'}
                      onChange={() => setRole('recruiter')}
                      className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <div>
                      <span className="block font-semibold text-gray-900 text-sm">Recruiter</span>
                      <span className="block text-xs text-gray-500 leading-normal mt-1">
                        Save time by letting the platform evaluate and sort top candidates for you.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full rounded-xl bg-gray-100 border border-transparent px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full rounded-xl bg-gray-100 border border-transparent px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full rounded-xl bg-gray-100 border border-transparent px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all pr-11"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center gap-2 pt-1">
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="terms" className="text-xs sm:text-sm text-gray-700">
                I agree to the{' '}
                <a href="/terms" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
                  Terms & Conditions
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!agreed}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-sm hover:shadow transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Account
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}