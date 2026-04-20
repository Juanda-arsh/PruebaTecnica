import { Link } from 'react-router-dom';
import { EditIcon, TrashIcon } from './Icons';

export function CarCard({ car, onDelete }) {
  return (
    <article className="car-card">
      <img className="car-image" src={car.photoUrl || '/car-placeholder.svg'} alt={`${car.brand} ${car.model}`} />
      <div className="car-card-body">
        <div className="car-card-main">
          <div>
            <h2>{car.brand} {car.model}</h2>
            <p>{car.year} · {car.color}</p>
          </div>
          <span className="plate">{car.plate}</span>
        </div>

        <div className="card-actions">
          <Link to={`/cars/${car.id}/edit`} className="button button-secondary button-small">
            <EditIcon />
            Editar
          </Link>
          <button type="button" className="button button-danger button-small" onClick={() => onDelete(car)}>
            <TrashIcon />
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
