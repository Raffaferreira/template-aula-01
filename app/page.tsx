'use client';

import { FaRocket, FaShieldAlt, FaChartLine, FaUsers, FaStar, FaCheckCircle } from 'react-icons/fa';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '76px' }}>
      {/* Hero Section com Vídeo */}
      <section className="hero-section position-relative overflow-hidden">
        <div className="video-background">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-100 h-100 object-fit-cover"
          >
            <source src="https://cdn.coverr.co/videos/coverr-business-team-working-together-8344/1080p.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>
        
        <div className="container position-relative hero-content">
          <div className="row min-vh-100 align-items-center justify-content-center text-center">
            <div className="col-lg-10">
              <h1 className="display-3 fw-bold text-white mb-4 animate-fade-in">
                Multiplique Seu Faturamento. <span className="text-gradient">Resultados Reais.</span>
              </h1>
              <p className="lead text-white mb-5 fs-4 animate-fade-in-delay">
                <strong>15.000+ empresas</strong> já economizaram R$ 487 milhões. 
                Tecnologia que transforma operação em lucro.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap animate-fade-in-delay-2">
                <button type="button" className="btn btn-primary btn-lg px-5 py-3 fw-bold shadow-lg">
                  <FaRocket className="me-2" />
                  Testar Grátis por 14 Dias
                </button>
                <button type="button" className="btn btn-outline-light btn-lg px-5 py-3 fw-bold">
                  Agendar Consultoria
                </button>
              </div>
              <p className="text-white-50 mt-3">
                <FaCheckCircle className="text-success me-2" />
                Sem cartão de crédito • Suporte 24/7 • Resultados em 48h
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Números Comerciais */}
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3 col-6">
              <div className="stat-card p-4">
                <h2 className="display-4 fw-bold text-primary mb-2">15.000+</h2>
                <p className="mb-0 text-uppercase small fw-semibold">Empresas Ativas</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card p-4">
                <h2 className="display-4 fw-bold text-success mb-2">98.7%</h2>
                <p className="mb-0 text-uppercase small fw-semibold">Satisfação Comprovada</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card p-4">
                <h2 className="display-4 fw-bold text-warning mb-2">0.3%</h2>
                <p className="mb-0 text-uppercase small fw-semibold">Taxa de Reclamações</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card p-4">
                <h2 className="display-4 fw-bold text-info mb-2">R$ 487M</h2>
                <p className="mb-0 text-uppercase small fw-semibold">Economizados por Clientes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <div className="row align-items-center">
            <div className="col-12">
              <p className="text-muted mb-3 text-uppercase small fw-semibold">Quem já usa</p>
              <div className="d-flex justify-content-center align-items-center gap-5 flex-wrap opacity-75">
                <div className="fs-3 fw-bold text-secondary">TechCorp</div>
                <div className="fs-3 fw-bold text-secondary">InnovaSoft</div>
                <div className="fs-3 fw-bold text-secondary">DataFlow</div>
                <div className="fs-3 fw-bold text-secondary">CloudSync</div>
                <div className="fs-3 fw-bold text-secondary">SmartBiz</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6 bg-white">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <span className="badge bg-primary mb-3 px-3 py-2">COMO FUNCIONA</span>
              <h2 className="display-5 fw-bold mb-3">
                Três Pilares. <span className="text-primary">Resultados Garantidos.</span>
              </h2>
              <p className="lead text-muted">
                Implementação em 48h. ROI positivo no primeiro mês. Sem burocracia.
              </p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card h-100 p-4 rounded-4 border shadow-sm hover-lift">
                <div className="icon-box bg-primary bg-opacity-10 rounded-3 p-3 d-inline-block mb-3">
                  <FaRocket className="text-primary fs-2" />
                </div>
                <h3 className="h4 fw-bold mb-3">Implementação Rápida</h3>
                <p className="text-muted mb-3">
                  Operacional em 48 horas. Treinamento incluso. Suporte dedicado desde o dia 1.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2"><FaCheckCircle className="text-success me-2" />Onboarding guiado</li>
                  <li className="mb-2"><FaCheckCircle className="text-success me-2" />Suporte dedicado</li>
                  <li className="mb-2"><FaCheckCircle className="text-success me-2" />Treinamento incluso</li>
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card h-100 p-4 rounded-4 border shadow-sm hover-lift">
                <div className="icon-box bg-success bg-opacity-10 rounded-3 p-3 d-inline-block mb-3">
                  <FaShieldAlt className="text-success fs-2" />
                </div>
                <h3 className="h4 fw-bold mb-3">Segurança de Nível Empresarial</h3>
                <p className="text-muted mb-3">
                  Criptografia bancária. Conformidade LGPD. Backup automático a cada 6 horas.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2"><FaCheckCircle className="text-success me-2" />Criptografia 256-bit</li>
                  <li className="mb-2"><FaCheckCircle className="text-success me-2" />Conformidade LGPD</li>
                  <li className="mb-2"><FaCheckCircle className="text-success me-2" />Backup automático</li>
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card h-100 p-4 rounded-4 border shadow-sm hover-lift">
                <div className="icon-box bg-info bg-opacity-10 rounded-3 p-3 d-inline-block mb-3">
                  <FaChartLine className="text-info fs-2" />
                </div>
                <h3 className="h4 fw-bold mb-3">Crescimento Previsível</h3>
                <p className="text-muted mb-3">
                  Dashboard em tempo real. Relatórios automáticos. IA identifica economia de até 37%.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2"><FaCheckCircle className="text-success me-2" />Dashboard inteligente</li>
                  <li className="mb-2"><FaCheckCircle className="text-success me-2" />Relatórios automáticos</li>
                  <li className="mb-2"><FaCheckCircle className="text-success me-2" />Insights com IA</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-6 bg-light">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <span className="badge bg-warning text-dark mb-3 px-3 py-2">DEPOIMENTOS REAIS</span>
              <h2 className="display-5 fw-bold mb-3">
                Quem Usa, <span className="text-warning">Aprova</span>
              </h2>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-warning" />
                    ))}
                  </div>
                  <p className="mb-4 fst-italic">
                    "Em 3 meses economizamos R$ 2.4M em processos operacionais. O ROI foi imediato 
                    e superou todas as expectativas da diretoria."
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                      <strong>MR</strong>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">Mariana Ribeiro</h6>
                      <small className="text-muted">CEO, TechSolutions</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-warning" />
                    ))}
                  </div>
                  <p className="mb-4 fst-italic">
                    "Finalmente uma solução que realmente funciona. Nossa produtividade aumentou 340% 
                    e o time está mais engajado do que nunca."
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="avatar bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                      <strong>CA</strong>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">Carlos Almeida</h6>
                      <small className="text-muted">Diretor, InnovaCorp</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-warning" />
                    ))}
                  </div>
                  <p className="mb-4 fst-italic">
                    "O suporte é excepcional. Cada dúvida respondida em minutos. Não é só uma 
                    ferramenta, é um parceiro estratégico real."
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="avatar bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                      <strong>JS</strong>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">Juliana Santos</h6>
                      <small className="text-muted">COO, DataFlow</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-6 bg-gradient-primary text-white position-relative overflow-hidden">
        <div className="cta-pattern"></div>
        <div className="container position-relative">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-4 fw-bold mb-4">
                Comece Hoje. Veja Resultados em 48 Horas.
              </h2>
              <p className="lead mb-5">
                Teste grátis por 14 dias. Sem cartão de crédito. Sem permanência. 
                Cancele quando quiser.
              </p>
              
              <form className="row g-3 justify-content-center mb-4" onSubmit={(e) => e.preventDefault()}>
                <div className="col-md-5">
                  <label htmlFor="email-input" className="visually-hidden">E-mail profissional</label>
                  <input 
                    id="email-input"
                    type="email" 
                    className="form-control form-control-lg" 
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <button type="submit" className="btn btn-light btn-lg w-100 fw-bold">
                    <FaRocket className="me-2" />
                    Começar Agora
                  </button>
                </div>
              </form>

              <div className="d-flex justify-content-center gap-4 flex-wrap text-white-50 small">
                <div><FaCheckCircle className="text-warning me-2" />Sem permanência</div>
                <div><FaCheckCircle className="text-warning me-2" />Cancele quando quiser</div>
                <div><FaCheckCircle className="text-warning me-2" />Suporte ilimitado</div>
              </div>

              <div className="mt-5 pt-4 border-top border-white border-opacity-25">
                <p className="mb-3 fw-semibold">Fale com especialista agora:</p>
                <a href="tel:+551140028922" className="btn btn-outline-light btn-lg">
                  <FaUsers className="me-2" />
                  (11) 4002-8922
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 bg-white border-top">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <h5 className="fw-bold mb-3 text-primary">Sua Empresa</h5>
              <p className="text-muted">
                Transformando negócios através de tecnologia inteligente e inovação constante.
              </p>
              <div className="d-flex gap-2 mt-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm rounded-circle" style={{width: '40px', height: '40px'}} aria-label="Facebook">f</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm rounded-circle" style={{width: '40px', height: '40px'}} aria-label="LinkedIn">in</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm rounded-circle" style={{width: '40px', height: '40px'}} aria-label="Twitter">tw</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm rounded-circle" style={{width: '40px', height: '40px'}} aria-label="Instagram">ig</a>
              </div>
            </div>
            
            <div className="col-md-2">
              <h6 className="fw-bold mb-3">Produto</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="/recursos" className="text-muted text-decoration-none">Recursos</a></li>
                <li className="mb-2"><a href="/precos" className="text-muted text-decoration-none">Preços</a></li>
                <li className="mb-2"><a href="/integracoes" className="text-muted text-decoration-none">Integrações</a></li>
                <li className="mb-2"><a href="/api" className="text-muted text-decoration-none">API</a></li>
              </ul>
            </div>
            
            <div className="col-md-2">
              <h6 className="fw-bold mb-3">Empresa</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="/sobre" className="text-muted text-decoration-none">Sobre Nós</a></li>
                <li className="mb-2"><a href="/carreiras" className="text-muted text-decoration-none">Carreiras</a></li>
                <li className="mb-2"><a href="/blog" className="text-muted text-decoration-none">Blog</a></li>
                <li className="mb-2"><a href="/contato" className="text-muted text-decoration-none">Contato</a></li>
              </ul>
            </div>
            
            <div className="col-md-2">
              <h6 className="fw-bold mb-3">Suporte</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="/ajuda" className="text-muted text-decoration-none">Central de Ajuda</a></li>
                <li className="mb-2"><a href="/docs" className="text-muted text-decoration-none">Documentação</a></li>
                <li className="mb-2"><a href="/status" className="text-muted text-decoration-none">Status</a></li>
                <li className="mb-2"><a href="/faq" className="text-muted text-decoration-none">FAQ</a></li>
              </ul>
            </div>
            
            <div className="col-md-2">
              <h6 className="fw-bold mb-3">Legal</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="/privacidade" className="text-muted text-decoration-none">Privacidade</a></li>
                <li className="mb-2"><a href="/termos" className="text-muted text-decoration-none">Termos</a></li>
                <li className="mb-2"><a href="/lgpd" className="text-muted text-decoration-none">LGPD</a></li>
                <li className="mb-2"><a href="/cookies" className="text-muted text-decoration-none">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <hr className="my-4" />
          
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0 text-muted small">
                © 2026 Sua Empresa. Todos os direitos reservados.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="mb-0 text-muted small">
                Feito com ❤️ no Brasil
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
