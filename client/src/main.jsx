import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './main.css';
import Index from './views/Index.jsx';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import Write from './views/Write.jsx';
import { AlertProvider } from './components/alertSection.jsx';
import Post from './views/Post.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/write' element={<Write />} />
            <Route path='/user/:user/post/:post' element={<Post />} />
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </QueryClientProvider>
  </StrictMode>,
)
