/**
 * Template: Client Component com Bootstrap 5
 * Use este template para criar componentes interativos
 */
'use client';

import { useState } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';

interface ComponentNameProps {
  // Defina as props aqui
  title?: string;
  onSubmit?: (data: any) => void;
}

export default function ComponentName({ 
  title = 'Default Title',
  onSubmit 
}: ComponentNameProps) {
  // Estados locais
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handlers
  const handleClick = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Lógica do componente
      await onSubmit?.({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <h3>{title}</h3>
      </Card.Header>
      <Card.Body>
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        
        <Button 
          variant="primary" 
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? 'Processando...' : 'Enviar'}
        </Button>
      </Card.Body>
    </Card>
  );
}
