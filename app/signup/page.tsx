'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaRocket, FaGoogle, FaGithub, FaCheckCircle } from 'react-icons/fa';
import Navbar from '../components/Navbar';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (!agreed) {
      alert('Você precisa aceitar os termos de uso');
      return;
    }

    setLoading(true);

    // TODO: Implementar lógica de cadastro
    setTimeout(() => {
      console.log('Signup:', formData);
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <div className="container">
          <div className="row min-vh-100 align-items-center justify-content-center py-5">
            <div className="col-lg-10">
              <div className="row g-0 signup-card card shadow-lg border-0 overflow-hidden">
                {/* Left Side - Benefits */}
                <div className="col-lg-5 benefits-side d-none d-lg-flex flex-column justify-content-center p-5">
                  <div className="text-white">
                    <FaRocket size={48} className="mb-4" />
                    <h3 className="fw-bold mb-4">Junte-se a 15.000+ Empresas</h3>
                    <div className="benefits-list">
                      <div className="benefit-item mb-3">
                        <FaCheckCircle className="me-3 text-success" size={24} />
                        <div>
                          <h5 className="mb-1">Teste Grátis por 14 Dias</h5>
                          <p className="small mb-0 opacity-75">Sem cartão de crédito necessário</p>
                        </div>
                      </div>
                      <div className="benefit-item mb-3">
                        <FaCheckCircle className="me-3 text-success" size={24} />
                        <div>
                          <h5 className="mb-1">Suporte 24/7</h5>
                          <p className="small mb-0 opacity-75">Time especializado sempre disponível</p>
                        </div>
                      </div>
                      <div className="benefit-item mb-3">
                        <FaCheckCircle className="me-3 text-success" size={24} />
                        <div>
                          <h5 className="mb-1">Implementação em 48h</h5>
                          <p className="small mb-0 opacity-75">Configure e comece rapidamente</p>
                        </div>
                      </div>
                      <div className="benefit-item mb-3">
                        <FaCheckCircle className="me-3 text-success" size={24} />
                        <div>
                          <h5 className="mb-1">98.7% de Satisfação</h5>
                          <p className="small mb-0 opacity-75">Avaliação média dos clientes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="col-lg-7">
                  <div className="p-5">
                    {/* Header */}
                    <div className="text-center mb-4">
                      <h2 className="fw-bold mb-2">Crie Sua Conta</h2>
                      <p className="text-muted">Comece sua jornada de crescimento hoje</p>
                    </div>

                    {/* Social Signup */}
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
                      <span className="divider-text">ou cadastre-se com email</span>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-semibold">
                          Nome Completo
                        </label>
                        <div className="input-group input-group-lg">
                          <span className="input-group-text bg-light border-end-0">
                            <FaUser className="text-muted" />
                          </span>
                          <input
                            type="text"
                            className="form-control border-start-0"
                            id="name"
                            name="name"
                            placeholder="João Silva"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

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
                            name="email"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
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
                              name="password"
                              placeholder="Mínimo 8 caracteres"
                              value={formData.password}
                              onChange={handleChange}
                              minLength={8}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6 mb-3">
                          <label htmlFor="confirmPassword" className="form-label fw-semibold">
                            Confirmar Senha
                          </label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light border-end-0">
                              <FaLock className="text-muted" />
                            </span>
                            <input
                              type="password"
                              className="form-control border-start-0"
                              id="confirmPassword"
                              name="confirmPassword"
                              placeholder="Repita a senha"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-check mb-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="terms"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          required
                        />
                        <label className="form-check-label" htmlFor="terms">
                          Concordo com os{' '}
                          <Link href="/terms" className="text-primary text-decoration-none">
                            Termos de Uso
                          </Link>
                          {' '}e{' '}
                          <Link href="/privacy" className="text-primary text-decoration-none">
                            Política de Privacidade
                          </Link>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100 mb-3"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Criando conta...
                          </>
                        ) : (
                          'Criar Conta Grátis'
                        )}
                      </button>
                    </form>

                    <div className="text-center">
                      <p className="text-muted mb-0">
                        Já tem uma conta?{' '}
                        <Link href="/login" className="text-primary fw-semibold text-decoration-none">
                          Faça login
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .signup-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding-top: 76px;
          }

          .signup-card {
            border-radius: 1rem;
            animation: fadeInUp 0.6s ease;
          }

          .benefits-side {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }

          .benefit-item {
            display: flex;
            align-items-start;
            animation: slideInLeft 0.6s ease backwards;
          }

          .benefit-item:nth-child(2) {
            animation-delay: 0.1s;
          }

          .benefit-item:nth-child(3) {
            animation-delay: 0.2s;
          }

          .benefit-item:nth-child(4) {
            animation-delay: 0.3s;
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

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </div>
    </>
  );
}
