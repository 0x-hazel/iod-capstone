import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './main.css';
import Index from './views/Index.jsx';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import Write from './views/Write.jsx';
import { AlertProvider } from './hooks/alerts.jsx';
import Post from './views/Post.jsx';
import { SessionProvider } from './hooks/session.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <SessionProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path='/write' element={<Write />} />
              <Route path='/user/:user/post/:post' element={<Post />} />
            </Routes>
          </BrowserRouter>
        </SessionProvider>
      </AlertProvider>
    </QueryClientProvider>
  </StrictMode>,
)
