import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { CarIcon, LogoutIcon, PlusIcon } from './Icons';

export function AppShell({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-mark"><CarIcon /></span>
          <span>Mis autos</span>
        </Link>

        <nav className="topbar-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Autos
          </NavLink>
          <NavLink to="/cars/new" className="button button-primary button-small">
            <PlusIcon />
            Nuevo
          </NavLink>
          <button type="button" className="icon-button" onClick={handleLogout} title="Cerrar sesión" aria-label="Cerrar sesión">
            <LogoutIcon />
          </button>
        </nav>
      </header>

      <main className="main-layout">
        <div className="user-strip">
          <div>
            <span className="eyebrow">Cuenta activa</span>
            <h1>{user?.name || 'Usuario'}</h1>
          </div>
          <span className="user-email">{user?.email}</span>
        </div>
        {children}
      </main>
    </div>
  );
}
