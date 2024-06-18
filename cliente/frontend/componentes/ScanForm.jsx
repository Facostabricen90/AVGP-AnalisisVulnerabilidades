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
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordResult, setPasswordResult] = useState(null);
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

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/password-check', { password });
      setPasswordResult(res.data);
    } catch (err) {
      setPasswordResult(err.response ? err.response.data.error : 'An error occurred');
    }
  };

  const handleShowPasswordSection = () => {
    setShowPasswordSection((prev) => !prev);
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

      {scanCompleted && !isScanning && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-6 rounded-md flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-full mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Vulnerabilidades Generales</h3>
            <button
              onClick={handleToggleResults}
              className="rounded-md bg-blue-500 py-2 px-4 text-white font-medium hover:bg-blue-700"
            >
              {showResults ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-md flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-full mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Seguridad de Contraseñas</h3>
            <button
              onClick={handleShowPasswordSection}
              className="rounded-md bg-blue-500 py-2 px-4 text-white font-medium hover:bg-blue-700"
            >
              {showPasswordSection ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-md flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-full mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Seguridad de Cuentas Bancarias</h3>
            <button
              onClick={() => handleClickNotReady('El equipo está trabajando en este apartado, por ahora no está listo')}
              className="rounded-md bg-blue-500 py-2 px-4 text-white font-medium hover:bg-blue-700"
            >
              Mostrar
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-md flex flex-col items-center">
  <div className="w-20 h-20 bg-white rounded-full mb-4 flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-10 h-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  </div>
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

      {showPasswordSection && (
        <div className="mt-8 bg-gray-800 p-6 rounded-md">
          <h2 className="text-xl font-medium text-white mb-4">Verificación de Seguridad de Contraseñas</h2>
          <form onSubmit={handlePasswordSubmit} className="flex items-center space-x-4">
            <label htmlFor="password" className="text-white">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <button type="submit" className="rounded-md bg-blue-500 py-2 px-4 text-white font-medium hover:bg-blue-700">
              Enviar
            </button>
          </form>
          {passwordResult && (
            <div className="mt-4 bg-white p-4 rounded-md">
              <p className="text-gray-700">Resultado: {passwordResult}</p>
            </div>
          )}
        </div>
      )}

      {showResults && resultados && (
        <div className="mt-8 bg-gray-800 p-6 rounded-md">
  <h2 className="text-xl font-medium mb-4 text-white">Resultados del Escaneo</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-gray-700 border border-gray-600 rounded-md">
      <tbody>
        <tr className="border-b border-gray-600">
          <td className="px-4 py-2 font-medium text-gray-300">Descripción HTTPS:</td>
          <td className="px-4 py-2 text-gray-400">{resultados.descripcion_https}</td>
        </tr>
        <tr className="border-b border-gray-600 bg-gray-800">
          <td className="px-4 py-2 font-medium text-gray-300">Código de Acceso:</td>
          <td className="px-4 py-2 text-gray-400">{resultados.cod_acceso}</td>
        </tr>
        <tr className="border-b border-gray-600">
          <td className="px-4 py-2 font-medium text-gray-300">Descripción SSL:</td>
          <td className="px-4 py-2 text-gray-400">{resultados.descripcion_SSL}</td>
        </tr>
        <tr className="border-b border-gray-600 bg-gray-800">
          <td className="px-4 py-2 font-medium text-gray-300">SQL Injection:</td>
          <td className="px-4 py-2 text-gray-400">{resultados.sql_injection ? 'Vulnerable' : 'No vulnerable'}</td>
        </tr>
        <tr className="border-b border-gray-600">
          <td className="px-4 py-2 font-medium text-gray-300">XSS:</td>
          <td className="px-4 py-2 text-gray-400">{resultados.xss ? 'Vulnerable' : 'No vulnerable'}</td>
        </tr>
        <tr className="border-b border-gray-600 bg-gray-800">
          <td className="px-4 py-2 font-medium text-gray-300">CSRF:</td>
          <td className="px-4 py-2 text-gray-400">{resultados.csrf ? 'Vulnerable' : 'No vulnerable'}</td>
        </tr>
        <tr className="border-b border-gray-600">
          <td className="px-4 py-2 font-medium text-gray-300">Directory Listing:</td>
          <td className="px-4 py-2 text-gray-400">{resultados.directory_listing ? 'Enabled' : 'Disabled'}</td>
        </tr>
        <tr className="border-b border-gray-600 bg-gray-800">
          <td className="px-4 py-2 font-medium text-gray-300">Exposed Version Info:</td>
          <td className="px-4 py-2 text-gray-400">{resultados.exposed_version_info ? 'Yes' : 'No'}</td>
        </tr>
        <tr className="border-b border-gray-600">
          <td className="px-4 py-2 font-medium text-gray-300">Vulnerable Libraries:</td>
          <td className="px-4 py-2 text-gray-400">{resultados.vulnerable_libraries ? 'Yes' : 'No'}</td>
        </tr>
        <tr className="border-b border-gray-600 bg-gray-800">
          <td className="px-4 py-2 font-medium text-gray-300">ID:</td>
          <td className="px-4 py-2 text-gray-400">{resultados.id}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 font-medium text-gray-300">Descripción URL:</td>
          <td className="px-4 py-2 text-gray-400">{resultados.descripcion_url}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

      )}
    </div>
  );
}
