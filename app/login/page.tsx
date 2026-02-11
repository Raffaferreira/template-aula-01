'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaEnvelope, FaLock, FaRocket, FaGoogle, FaGithub } from 'react-icons/fa';
import Navbar from '../components/Navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Implementar lógica de autenticação
    setTimeout(() => {
      console.log('Login:', { email, password });
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="container">
          <div className="row min-vh-100 align-items-center justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="login-card card shadow-lg border-0">
                <div className="card-body p-5">
                  {/* Logo/Header */}
                  <div className="text-center mb-4">
                    <div className="login-icon mb-3">
                      <FaRocket size={48} className="text-primary" />
                    </div>
                    <h2 className="fw-bold mb-2">Bem-vindo de Volta!</h2>
                    <p className="text-muted">Entre para continuar sua jornada</p>
                  </div>

                  {/* Social Login */}
                  <div className="d-grid gap-2 mb-4">
                    <button className="btn btn-outline-dark btn-lg">
                      <FaGoogle className="me-2" />
                      Continuar com Google
                    </button>
                    <button className="btn btn-outline-dark btn-lg">
                      <FaGithub className="me-2" />
                      Continuar com GitHub
                    </button>
                  </div>

                  <div className="divider mb-4">
                    <span className="divider-text">ou entre com email</span>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-semibold">
                        Email
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light border-end-0">
                          <FaEnvelope className="text-muted" />
                        </span>
                        <input
                          type="email"
                          className="form-control border-start-0"
                          id="email"
                          placeholder="seu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label fw-semibold">
                        Senha
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light border-end-0">
                          <FaLock className="text-muted" />
                        </span>
                        <input
                          type="password"
                          className="form-control border-start-0"
                          id="password"
                          placeholder="Digite sua senha"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="remember"
                        />
                        <label className="form-check-label" htmlFor="remember">
                          Lembrar-me
                        </label>
                      </div>
                      <Link href="/forgot-password" className="text-primary text-decoration-none">
                        Esqueceu a senha?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100 mb-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Entrando...
                        </>
                      ) : (
                        'Entrar'
                      )}
                    </button>
                  </form>

                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Não tem uma conta?{' '}
                      <Link href="/signup" className="text-primary fw-semibold text-decoration-none">
                        Cadastre-se grátis
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="text-center mt-4">
                <p className="text-muted small">
                  Ao entrar, você concorda com nossos{' '}
                  <Link href="/terms" className="text-decoration-none">Termos de Uso</Link>
                  {' '}e{' '}
                  <Link href="/privacy" className="text-decoration-none">Política de Privacidade</Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .login-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding-top: 76px;
          }

          .login-card {
            border-radius: 1rem;
            animation: fadeInUp 0.6s ease;
          }

          .login-icon {
            animation: bounce 2s infinite;
          }

          .divider {
            position: relative;
            text-align: center;
            margin: 1.5rem 0;
          }

          .divider::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 1px;
            background: #dee2e6;
          }

          .divider-text {
            background: white;
            padding: 0 1rem;
            position: relative;
            color: #6c757d;
            font-size: 0.875rem;
          }

          .input-group-text {
            border-right: none;
          }

          .form-control:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}</style>
      </div>
    </>
  );
}
