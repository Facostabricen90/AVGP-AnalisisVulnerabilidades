// pages/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ScanForm from '../componentes/ScanForm';
import '../styles/globals.css';
import Logo from '../public/2.svg';
import Image from 'next/image';


const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      router.push('/login');
    } else {
      setUser(userData);
    }
  }, [router]);

  if (!user) {
    return null; // Muestra un loader o mensaje de carga
  }

  return (
    <div className="bg-black text-white">
    {/* Hero Section */}
    <div className="hero-section bg-gradient-to-b from-cyan-600 to-slate-800 py-20 px-8 text-center">
      <div className="container mx-auto">
        <Image src={Logo} alt="Logo" width={150} height={150} className="mx-auto mb-6" />
        <h1 className="text-5xl font-bold mb-4">Bienvenido a Security Scanner</h1>
        <p className="text-xl mb-6">Protege tu sitio web con nuestra avanzada tecnología de escaneo de vulnerabilidades.</p>
        <a href="#scan" className="inline-block bg-blue-500 text-white font-medium py-3 px-6 rounded-full hover:bg-blue-700">
          Comienza Ahora
        </a>
      </div>
    </div>

    {/* About Section */}
    <div className="about-section py-20 px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-4">¿Quiénes Somos?</h2>
          <p className="text-lg mb-4">
            En Security Scanner, estamos dedicados a ofrecer las mejores soluciones de seguridad para tu sitio web. Nuestro equipo de expertos trabaja incansablemente para identificar y mitigar posibles amenazas antes de que afecten a tu negocio.
          </p>
          <p className="text-lg">
            Con nuestras herramientas avanzadas, puedes estar seguro de que tu sitio está protegido contra las últimas vulnerabilidades y ataques cibernéticos.
          </p>
        </div>
        <div className="flex justify-center">
          <Image src={Logo} alt="Logo" width={300} height={300} />
        </div>
      </div>
    </div>

    {/* Services Section */}
    <div className="services-section bg-gradient-to-b from-slate-800 to-black py-20 px-8">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="service-card p-6 rounded-md bg-gray-800">
            <h3 className="text-2xl font-bold mb-4">Escaneo de Vulnerabilidades</h3>
            <p className="text-lg">
              Realizamos un análisis exhaustivo de tu sitio web para identificar cualquier vulnerabilidad y ofrecerte un reporte detallado.
            </p>
          </div>
          <div className="service-card p-6 rounded-md bg-gray-800">
            <h3 className="text-2xl font-bold mb-4">Seguridad de Contraseñas</h3>
            <p className="text-lg">
              Verificamos la fortaleza de las contraseñas utilizadas en tu sistema para garantizar que cumplan con los estándares de seguridad.
            </p>
          </div>
          <div className="service-card p-6 rounded-md bg-gray-800">
            <h3 className="text-2xl font-bold mb-4">Protección de Datos</h3>
            <p className="text-lg">
              Implementamos medidas de protección para tus datos sensibles, asegurando que estén seguros frente a accesos no autorizados.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Scan Form Section */}
    <div id="scan" className="scan-form-section py-20 px-8">
      <div className="container mx-auto">
        <ScanForm />
      </div>
    </div>

    {/* Footer */}
    <div className="footer bg-gray-900 py-6 text-center">
      <div className="container mx-auto">
        <p>&copy; 2024 Security Scanner. Todos los derechos reservados.</p>
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
