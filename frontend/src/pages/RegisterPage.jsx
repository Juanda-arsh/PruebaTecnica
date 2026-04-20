import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { CarIcon } from '../components/Icons';
import { LoadingButton } from '../components/LoadingButton';
import { getApiError } from '../api/http';
import { useAuth } from '../hooks/useAuth';

export function RegisterPage() {
  const navigate = useNavigate();
  const { isAuthenticated, register } = useAuth();
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
      await register({
        name: formData.get('name').trim(),
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
        <h1>Registro</h1>
        <Alert>{error}</Alert>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            <span>Nombre</span>
            <input name="name" autoComplete="name" maxLength="120" required />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" maxLength="180" required />
          </label>
          <label>
            <span>Contraseña</span>
            <input name="password" type="password" autoComplete="new-password" minLength="8" maxLength="72" required />
          </label>
          <LoadingButton loading={loading} type="submit" className="button button-primary">
            Crear cuenta
          </LoadingButton>
        </form>

        <p className="auth-switch">
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </section>
    </main>
  );
}
