
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Loginauth from './Auth/Loginauth';
import Search from './components/spacific/Search';
import { SocketProvider } from './socket';
import Homelayout from './components/Layout/Homelayout';


// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Chart = lazy(() => import('./pages/Chart'));
const Group = lazy(() => import('./pages/Group'));
const Signup = lazy(() => import('./pages/Signup'));
const Notfound = lazy(() => import('./pages/Notfound'));

function App() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<SocketProvider>
            <Loginauth />
          </SocketProvider>}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chart />} />
            <Route path="/groups" element={<Group />} />
            <Route path="/search" element={<Search />} />
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Suspense>
  );
}

export default App;
