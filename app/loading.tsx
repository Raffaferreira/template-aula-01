/**
 * Loading State
 * Componente de carregamento exibido durante transições de página
 * 
 * @page
 */

export default function Loading() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="text-muted">Carregando...</p>
      </div>
    </div>
  );
}
