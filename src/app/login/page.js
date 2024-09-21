'use client';

import { DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  const { isAuthenticated, user } = useDynamicContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated || user) {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
        <DynamicWidget />
      </div>
    </div>
  );
}