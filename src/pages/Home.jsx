import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1>Bienvenido al Sistema de Gestión de Equipos Biomédicos</h1>
      <Link to="/login" className="btn btn-primary mt-3">
        Iniciar Sesión
      </Link>
    </div>
  );
};

export default Home;
