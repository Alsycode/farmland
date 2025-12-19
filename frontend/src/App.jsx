// path: src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import PropertyDetail from './pages/PropertyDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';

import ExploreMap from './pages/ExploreMap';
import NotFound from './pages/NotFound';
import TermsAndConditions from './pages/TermsAndConditions';
import About from "./pages/About";
/**
 * Public routing per SRS 4.1
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route path="/about" element={<About />} />
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="explore" element={<ExploreMap />} />
        <Route path="properties/:id" element={<PropertyDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="blogs" element={<BlogList />} />
        <Route path="blogs/:id" element={<BlogDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Route>
    </Routes>
  );
}
