'use client';
import ResetPasswordForm from '@/components/reset-password-form';
import React, { Suspense } from 'react';


export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
