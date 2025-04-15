import React from 'react'
import { createRoot } from 'react-dom/client'
import { lazy } from 'react';
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner"
import App from './App.jsx'

const SignIn = React.lazy(() => import('./auth/signin'));
const SignUp = React.lazy(() => import('./auth/signup'));
const Dashboard = React.lazy(() => import('./notes/dashboard'));
const ProtectedRoute = React.lazy(() => import('./utils/PrivateRoutes'));
const Password = React.lazy(() => import('./auth/password'));


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  }
})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster />
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <React.Suspense fallback={<div className='flexy h-screen'>Loading...</div>}>
          <Routes>
            <Route path="/signin" element={<SignIn />} index />
            <Route path="*" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/password" element={<Password />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<App />} />
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
