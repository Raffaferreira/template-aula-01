/**
 * Error Boundary
 * Captura e exibe erros de forma amigável ao usuário
 * 
 * @page
 */

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('❌ [Error Boundary]', error);
  }, [error]);

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <FaExclamationTriangle className="text-danger mb-4" size={64} />
        <h2 className="display-4 text-danger mb-4">Algo deu errado!</h2>
        <p className="lead mb-4 text-muted">
          Desculpe, ocorreu um erro inesperado. Nossa equipe foi notificada.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="text-start bg-light p-3 rounded mb-4 small text-danger">
            {error.message}
          </pre>
        )}
        <div className="d-flex gap-3 justify-content-center">
          <button 
            onClick={reset} 
            className="btn btn-primary btn-lg px-4"
          >
            Tentar Novamente
          </button>
          <Link href="/" className="btn btn-outline-secondary btn-lg px-4">
            <FaHome className="me-2" />
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}
