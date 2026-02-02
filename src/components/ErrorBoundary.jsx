import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          fontFamily: "'Inter', sans-serif",
          background: 'linear-gradient(180deg, #F8FAFC 0%, #F3E8FF 100%)',
          color: '#1e293b'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>⚠️</div>
          <h2 style={{ margin: '0 0 8px', fontSize: '1.5rem' }}>Algo deu errado</h2>
          <p style={{ color: '#64748b', marginBottom: 24, textAlign: 'center' }}>
            Encontramos um problema inesperado. Tente atualizar a página.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: '#7C3AED',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Atualizar página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
