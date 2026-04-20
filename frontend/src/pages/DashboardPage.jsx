import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteCar, getCars } from '../api/carsApi';
import { getApiError } from '../api/http';
import { Alert } from '../components/Alert';
import { CarCard } from '../components/CarCard';
import { EmptyState } from '../components/EmptyState';
import { PlusIcon, SearchIcon } from '../components/Icons';

const emptyFilters = {
  plate: '',
  model: '',
  brand: '',
  color: '',
  year: ''
};

export function DashboardPage() {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState(emptyFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCars(emptyFilters);
  }, []);

  async function loadCars(nextFilters) {
    setLoading(true);
    setError('');
    try {
      const data = await getCars({
        ...nextFilters,
        year: nextFilters.year ? Number(nextFilters.year) : ''
      });
      setCars(data);
    } catch (exception) {
      setError(getApiError(exception));
    } finally {
      setLoading(false);
    }
  }

  function handleFilterChange(event) {
    const { name, value } = event.target;
    setFilters((current) => ({
      ...current,
      [name]: name === 'year' ? value.replace(/\D/g, '').slice(0, 4) : value
    }));
  }

  function handleSearch(event) {
    event.preventDefault();
    loadCars(filters);
  }

  function handleClear() {
    setFilters(emptyFilters);
    loadCars(emptyFilters);
  }

  async function handleDelete(car) {
    const confirmed = window.confirm(`Eliminar el auto ${car.brand} ${car.model} con placa ${car.plate}?`);
    if (!confirmed) {
      return;
    }

    setError('');
    try {
      await deleteCar(car.id);
      setCars((current) => current.filter((item) => item.id !== car.id));
    } catch (exception) {
      setError(getApiError(exception));
    }
  }

  return (
    <section className="dashboard">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Inventario personal</span>
          <h2>Autos registrados</h2>
        </div>
        <Link to="/cars/new" className="button button-primary">
          <PlusIcon />
          Nuevo auto
        </Link>
      </div>

      <form className="filter-bar" onSubmit={handleSearch}>
        <label>
          <span>Placa</span>
          <input name="plate" value={filters.plate} onChange={handleFilterChange} />
        </label>
        <label>
          <span>Modelo</span>
          <input name="model" value={filters.model} onChange={handleFilterChange} />
        </label>
        <label>
          <span>Marca</span>
          <input name="brand" value={filters.brand} onChange={handleFilterChange} />
        </label>
        <label>
          <span>Color</span>
          <input name="color" value={filters.color} onChange={handleFilterChange} />
        </label>
        <label>
          <span>A&ntilde;o</span>
          <input
            name="year"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength="4"
            value={filters.year}
            onChange={handleFilterChange}
          />
        </label>
        <div className="filter-actions">
          <button type="submit" className="button button-secondary">
            <SearchIcon />
            Buscar
          </button>
          <button type="button" className="button button-ghost" onClick={handleClear}>
            Limpiar
          </button>
        </div>
      </form>

      <Alert>{error}</Alert>

      {loading ? (
        <div className="loading-panel"><span className="loader" /> Cargando autos</div>
      ) : cars.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="cars-grid">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </section>
  );
}
