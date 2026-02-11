'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaRocket, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-lg">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center fw-bold fs-4">
          <FaRocket className="me-2 text-primary" />
          <span className="text-gradient">EmpresaPro</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Menu */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-2">
            <li className="nav-item">
              <Link href="/#features" className="nav-link" onClick={() => setIsOpen(false)}>
                Recursos
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/#pricing" className="nav-link" onClick={() => setIsOpen(false)}>
                Preços
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/#testimonials" className="nav-link" onClick={() => setIsOpen(false)}>
                Depoimentos
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/#faq" className="nav-link" onClick={() => setIsOpen(false)}>
                FAQ
              </Link>
            </li>
            <li className="nav-item ms-lg-3">
              <Link 
                href="/login" 
                className="btn btn-outline-light px-4"
                onClick={() => setIsOpen(false)}
              >
                Entrar
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/signup" 
                className="btn btn-primary px-4"
                onClick={() => setIsOpen(false)}
              >
                Começar Grátis
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .text-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .navbar {
          backdrop-filter: blur(10px);
          background-color: rgba(33, 37, 41, 0.95) !important;
        }

        .nav-link {
          font-weight: 500;
          transition: color 0.3s ease;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 80%;
        }

        .nav-link:hover {
          color: #667eea !important;
        }

        @media (max-width: 991px) {
          .navbar-collapse {
            background-color: rgba(33, 37, 41, 0.98);
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
          }

          .nav-item {
            margin: 0.5rem 0;
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>
    </nav>
  );
}
