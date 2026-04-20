import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { CarIcon } from '../components/Icons';
import { LoadingButton } from '../components/LoadingButton';
import { getApiError } from '../api/http';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    try {
      await login({
        email: formData.get('email').trim(),
        password: formData.get('password')
      });
      navigate('/');
    } catch (exception) {
      setError(getApiError(exception));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="auth-brand">
          <span className="brand-mark"><CarIcon /></span>
          <span>Mis autos</span>
        </div>
        <h1>Iniciar sesión</h1>
        <Alert>{error}</Alert>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>Contraseña</span>
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <LoadingButton loading={loading} type="submit" className="button button-primary">
            Entrar
          </LoadingButton>
        </form>

        <p className="auth-switch">
          ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
        </p>
      </section>
    </main>
  );
}
