import { Link } from 'react-router-dom';
import { CarIcon, PlusIcon } from './Icons';

export function EmptyState() {
  return (
    <section className="empty-state">
      <CarIcon className="empty-icon" />
      <h2>No hay autos registrados</h2>
      <p>Agrega tu primer auto para verlo en el tablero.</p>
      <Link to="/cars/new" className="button button-primary">
        <PlusIcon />
        Nuevo auto
      </Link>
    </section>
  );
}
