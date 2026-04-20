import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createCar } from '../api/carsApi';
import { getApiError } from '../api/http';
import { Alert } from '../components/Alert';
import { CarForm } from '../components/CarForm';

export function CarCreatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(payload) {
    setLoading(true);
    setError('');
    try {
      await createCar(payload);
      navigate('/');
    } catch (exception) {
      setError(getApiError(exception));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="editor-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Nuevo registro</span>
          <h2>Crear auto</h2>
        </div>
        <Link to="/" className="button button-ghost">Volver</Link>
      </div>
      <Alert>{error}</Alert>
      <CarForm loading={loading} submitLabel="Guardar auto" onSubmit={handleSubmit} />
    </section>
  );
}
