import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCar, updateCar } from '../api/carsApi';
import { getApiError } from '../api/http';
import { Alert } from '../components/Alert';
import { CarForm } from '../components/CarForm';

export function CarEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCar, setLoadingCar] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCar() {
      setLoadingCar(true);
      setError('');
      try {
        setCar(await getCar(id));
      } catch (exception) {
        setError(getApiError(exception));
      } finally {
        setLoadingCar(false);
      }
    }

    loadCar();
  }, [id]);

  async function handleSubmit(payload) {
    setLoading(true);
    setError('');
    try {
      await updateCar(id, payload);
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
          <span className="eyebrow">Edición</span>
          <h2>Editar auto</h2>
        </div>
        <Link to="/" className="button button-ghost">Volver</Link>
      </div>
      <Alert>{error}</Alert>
      {loadingCar ? (
        <div className="loading-panel"><span className="loader" /> Cargando auto</div>
      ) : car ? (
        <CarForm initialValues={car} loading={loading} submitLabel="Guardar cambios" onSubmit={handleSubmit} />
      ) : null}
    </section>
  );
}
