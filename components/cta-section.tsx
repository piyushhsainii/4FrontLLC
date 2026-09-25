'use client';

import { ContactFormData, submitInspectionRequest } from '@/lib/actions';
import React, { useState, useTransition } from 'react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function CallToAction() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const [fields, setFields] = useState<ContactFormData>({
    name: '',
    phone: '',
    address: '',
    issue: '',
  });

  const [touched, setTouched] = useState<Record<keyof ContactFormData, boolean>>({
    name: false,
    phone: false,
    address: false,
    issue: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFields((prev) => ({ ...prev, [id]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id } = e.target;
    setTouched((prev) => ({ ...prev, [id]: true }));
  };

  const isFieldInvalid = (key: keyof ContactFormData) =>
    touched[key] && fields[key].trim() === '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Touch all fields to reveal validation errors
    setTouched({ name: true, phone: true, address: true, issue: true });

    if (Object.values(fields).some((v) => v.trim() === '')) return;

    setFormState('submitting');

    startTransition(async () => {
      const result = await submitInspectionRequest(fields);
      if (result.success) {
        setFormState('success');
      } else {
        setFormState('error');
        setErrorMessage(result.error);
      }
    });
  };

  const handleReset = () => {
    setFormState('idle');
    setErrorMessage('');
    setFields({ name: '', phone: '', address: '', issue: '' });
    setTouched({ name: false, phone: false, address: false, issue: false });
  };

  const isSubmitting = formState === 'submitting' || isPending;

  return (
    <section
      id="contact"
      className="relative z-10 bg-primary py-24 md:py-32 overflow-hidden text-primary-foreground"
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-[60px] border-primary-foreground/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border-[60px] border-primary-foreground/10" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10 grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
        {/* Left copy */}
        <div>
          <h2 className="mb-6 text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Get Your Free Roof Inspection Today
          </h2>
          <p className="mb-10 text-lg text-primary-foreground/80 md:text-xl max-w-lg">
            Don&apos;t wait until small issues become expensive problems. Secure
            your property with a professional assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+1 (813) 294-5498"
              className="inline-block rounded-full bg-accent px-8 py-4 text-center text-base font-bold text-accent-foreground shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              Call Now
            </a>
          </div>
        </div>

        {/* Lead Form Card */}
        <div className="rounded-3xl bg-card p-8 md:p-10 shadow-2xl text-card-foreground">

          {/* ── SUCCESS STATE ── */}
          {formState === 'success' ? (
            <div className="flex flex-col items-center text-center py-6 gap-5">
              {/* Animated checkmark */}
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
                <svg
                  className="w-10 h-10 text-green-600"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M14 27L22 35L38 19"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: 30,
                      strokeDashoffset: 0,
                      animation: 'draw-check 0.4s ease-out forwards',
                    }}
                  />
                  <style>{`
                    @keyframes draw-check {
                      from { stroke-dashoffset: 30; }
                      to   { stroke-dashoffset: 0; }
                    }
                  `}</style>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Thanks, <strong>{fields.name.split(' ')[0]}</strong>! We&apos;ll
                  reach out to schedule your free inspection shortly.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="mt-2 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
              >
                Submit another request
              </button>
            </div>

          ) : (
            /* ── FORM STATE (idle / submitting / error) ── */
            <>
              <h3 className="mb-2 text-2xl font-bold">Schedule Free Inspection</h3>
              <p className="mb-8 text-sm text-muted-foreground">
                No obligation. No pressure.
              </p>

              {/* Global error banner */}
              {formState === 'error' && (
                <div className="mb-5 flex items-start gap-3 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={fields.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className={`rounded-lg border px-4 py-3 outline-none bg-background transition-colors
                      focus:border-primary focus:ring-1 focus:ring-primary
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${isFieldInvalid('name') ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-border'}`}
                    placeholder="Jane Doe"
                  />
                  {isFieldInvalid('name') && (
                    <p className="text-xs text-red-500 mt-0.5">Full name is required.</p>
                  )}
                </div>

                {/* Phone + Address */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={fields.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className={`rounded-lg border px-4 py-3 outline-none bg-background transition-colors
                        focus:border-primary focus:ring-1 focus:ring-primary
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${isFieldInvalid('phone') ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-border'}`}
                      placeholder="(555) 000-0000"
                    />
                    {isFieldInvalid('phone') && (
                      <p className="text-xs text-red-500 mt-0.5">Phone is required.</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="address" className="text-sm font-medium">
                      Property Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      value={fields.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className={`rounded-lg border px-4 py-3 outline-none bg-background transition-colors
                        focus:border-primary focus:ring-1 focus:ring-primary
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${isFieldInvalid('address') ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-border'}`}
                      placeholder="123 Main St"
                    />
                    {isFieldInvalid('address') && (
                      <p className="text-xs text-red-500 mt-0.5">Address is required.</p>
                    )}
                  </div>
                </div>

                {/* Issue */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="issue" className="text-sm font-medium">
                    Description of Issue
                  </label>
                  <textarea
                    id="issue"
                    rows={3}
                    value={fields.issue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className={`rounded-lg border px-4 py-3 outline-none bg-background transition-colors resize-none
                      focus:border-primary focus:ring-1 focus:ring-primary
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${isFieldInvalid('issue') ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-border'}`}
                    placeholder="Noticed a leak after the storm..."
                  />
                  {isFieldInvalid('issue') && (
                    <p className="text-xs text-red-500 mt-0.5">Please describe the issue.</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 relative rounded-lg bg-primary px-6 py-4 text-center text-base font-bold text-primary-foreground
                    transition-all hover:bg-primary/90 active:scale-[0.98]
                    disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-primary-foreground"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending Request...
                    </span>
                  ) : (
                    'Request Inspection'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
