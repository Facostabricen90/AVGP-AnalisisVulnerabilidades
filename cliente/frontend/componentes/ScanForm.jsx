// components/ScanForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../styles/globals.css'; // Import your Tailwind CSS stylesheet
import Logo from '../public/2.svg'; // Ajusta la ruta según la ubicación de tu archivo SVG
import Image from 'next/image';

export default function ScanForm() {
  const [url, setUrl] = useState('');
  const [resultados, setResultados] = useState(null);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsScanning(true);
    setScanCompleted(false);
    setShowResults(false);

    try {
      const res = await axios.post('http://localhost:5000/requests', { url });
      setResultados(res.data);
      setError(null);
      setScanCompleted(true);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
      setResultados(null);
    } finally {
      setIsScanning(false);
    }
  };

  const handleToggleResults = () => {
    setShowResults((prevShowResults) => !prevShowResults);
  };

  const handleClickNotReady = (message) => {
    alert(message);
  };

  const handleBackToHome = () => {
    window.location.reload();
  };

  return (
    <div className="bg-black mx-auto px-4 py-8">

<div className="flex items-center space-x-4">
  <div style={{ height: '100px', width: '100px' }}>
    <Image src={Logo} alt="Logo" width={100} height={100} />
  </div>

  <div className='w-1/3'>
    <h1 className="text-3xl text-white font-bold mb-2">Security Scanner</h1>
    <h3 className="text-1xl text-white font-bold mb-8">Ingresa la URL de tu sitio web para escanearlo en busca de vulnerabilidades</h3>
  </div>
</div>

  
  {/* Formulario para ingresar URL y botón de escaneo */}
  <div className="ml-8 bg-gradient-to-bl from-cyan-600 to-slate-800 p-6 rounded-md w-2/3">
  <form onSubmit={handleSubmit} className="flex items-center space-x-4">
  <div className="flex items-center flex-grow">
    <label htmlFor="url" className="mr-4 text-sm font-medium text-white">URL:</label>
    <input
      type="url"
      id="url"
      name="url"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      required
      className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full"
    />
  </div>

  <button type="submit" className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-blue-500 rounded-full group">
  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-40 group-hover:h-40"></span>
  <span className="relative">Scanear</span>
</button>


</form>


    {isScanning && <p className="text-yellow-500 mt-4">Escaneando...</p>}
    {error && <p className="text-red-500 mt-4">{error}</p>}
  </div>

  {/* Botones dentro de tarjetas */}
  {scanCompleted && !isScanning && (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gray-800 p-6 rounded-md flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-500 rounded-full mb-4"></div> {/* Espacio para el logo */}
        <h3 className="text-lg font-medium text-white mb-2">Vulnerabilidades Generales</h3>
        <button
          onClick={handleToggleResults}
          className="rounded-md bg-blue-500 py-2 px-4 text-white font-medium hover:bg-blue-700"
        >
          {showResults ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
      <div className="bg-gray-800 p-6 rounded-md flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-500 rounded-full mb-4"></div> {/* Espacio para el logo */}
        <h3 className="text-lg font-medium text-white mb-2">Seguridad de Contraseñas</h3>
        <button
          onClick={() => handleClickNotReady('El equipo está trabajando en este apartado, por ahora no está listo')}
          className="rounded-md bg-blue-500 py-2 px-4 text-white font-medium hover:bg-blue-700"
        >
          Mostrar
        </button>
      </div>
      <div className="bg-gray-800 p-6 rounded-md flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-500 rounded-full mb-4"></div> {/* Espacio para el logo */}
        <h3 className="text-lg font-medium text-white mb-2">Seguridad de Cuentas Bancarias</h3>
        <button
          onClick={() => handleClickNotReady('El equipo está trabajando en este apartado, por ahora no está listo')}
          className="rounded-md bg-blue-500 py-2 px-4 text-white font-medium hover:bg-blue-700"
        >
          Mostrar
        </button>
      </div>
      <div className="bg-gray-800 p-6 rounded-md flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-500 rounded-full mb-4"></div> {/* Espacio para el logo */}
        <h3 className="text-lg font-medium text-white mb-2">Archivos Sensibles</h3>
        <button
          onClick={() => handleClickNotReady('El equipo está trabajando en este apartado, por ahora no está listo')}
          className="rounded-md bg-blue-500 py-2 px-4 text-white font-medium hover:bg-blue-700"
        >
          Mostrar
        </button>
      </div>
    </div>
  )}

  {/* Resultados del escaneo */}
  {showResults && resultados && (
    <div className="mt-8 bg-white p-6 rounded-md">
      <h2 className="text-xl font-medium mb-4 text-white">Resultados del Escaneo</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 font-medium text-gray-700">Descripción HTTPS:</td>
              <td className="px-4 py-2 text-gray-600">{resultados.descripcion_https}</td>
            </tr>
            <tr className="border-b bg-gray-50">
              <td className="px-4 py-2 font-medium text-gray-700">Código de Acceso:</td>
              <td className="px-4 py-2 text-gray-600">{resultados.cod_acceso}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-medium text-gray-700">Descripción SSL:</td>
              <td className="px-4 py-2 text-gray-600">{resultados.descripcion_SSL}</td>
            </tr>
            <tr className="border-b bg-gray-50">
              <td className="px-4 py-2 font-medium text-gray-700">SQL Injection:</td>
              <td className="px-4 py-2 text-gray-600">{resultados.sql_injection ? 'Vulnerable' : 'No vulnerable'}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-medium text-gray-700">XSS:</td>
              <td className="px-4 py-2 text-gray-600">{resultados.xss ? 'Vulnerable' : 'No vulnerable'}</td>
            </tr>
            <tr className="border-b bg-gray-50">
              <td className="px-4 py-2 font-medium text-gray-700">CSRF:</td>
              <td className="px-4 py-2 text-gray-600">{resultados.csrf ? 'Vulnerable' : 'No vulnerable'}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-medium text-gray-700">Directory Listing:</td>
              <td className="px-4 py-2 text-gray-600">{resultados.directory_listing ? 'Enabled' : 'Disabled'}</td>
            </tr>
            <tr className="border-b bg-gray-50">
              <td className="px-4 py-2 font-medium text-gray-700">Exposed Version Info:</td>
              <td className="px-4 py-2 text-gray-600">{resultados.exposed_version_info ? 'Yes' : 'No'}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-medium text-gray-700">Vulnerable Libraries:</td>
              <td className="px-4 py-2 text-gray-600">{resultados.vulnerable_libraries ? 'Yes' : 'No'}</td>
            </tr>
            <tr className="border-b bg-gray-50">
              <td className="px-4 py-2 font-medium text-gray-700">ID:</td>
              <td className="px-4 py-2 text-gray-600">{resultados.id}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium text-gray-700">Descripción URL:</td>
              <td className="px-4 py-2 text-gray-600">{resultados.descripcion_url}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )}
</div>

  );
}
