

'use client';


import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [url, setUrl] = useState('');
  const [resultados, setResultados] = useState(null);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/requests', { url });
      setResultados(res.data);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
      setResultados(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-8">Vulnerabilidades</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex items-center">
          <label htmlFor="url" className="mr-4 text-sm font-medium">URL:</label>
          <input
            type="url"
            id="url"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button type="submit" className="rounded-md bg-blue-500 py-1.5 px-0.5 text-white font-medium hover:bg-blue-700" style={{ width: '80px' }} disabled={loading}>
          {loading ? 'Scanning...' : 'Scan'}
        </button>
      </form>
      {resultados && (
        <div className="mt-8 border border-gray-300 rounded-md px-4 py-4 dark:bg-gray-700">
          <h2 className="text-xl font-medium mb-4">Resultados del Escaneo</h2>
          <table className="table-auto w-full">
            <tbody>
              <tr>
                <td className="font-medium">Descripción HTTPS:</td>
                <td>{resultados.descripcion_https}</td>
              </tr>
              <tr>
                <td className="font-medium">Código de Acceso:</td>
                <td>{resultados.cod_acceso}</td>
              </tr>
              <tr>
                <td className="font-medium">Descripción SSL:</td>
                <td>{resultados.descripcion_SSL}</td>
              </tr>
              <tr>
                <td className="font-medium">SQL Injection:</td>
                <td>{resultados.sql_injection ? 'Vulnerable' : 'No vulnerable'}</td>
              </tr>
              <tr>
                <td className="font-medium">XSS:</td>
                <td>{resultados.xss ? 'Vulnerable' : 'No vulnerable'}</td>
              </tr>
              <tr>
                <td className="font-medium">CSRF:</td>
                <td>{resultados.csrf ? 'Vulnerable' : 'No vulnerable'}</td>
              </tr>
              <tr>
                <td className="font-medium">Directory Listing:</td>
                <td>{resultados.directory_listing ? 'Enabled' : 'Disabled'}</td>
              </tr>
              <tr>
                <td className="font-medium">Exposed Version Info:</td>
                <td>{resultados.exposed_version_info ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td className="font-medium">Vulnerable Libraries:</td>
                <td>{resultados.vulnerable_libraries ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={() => {
              setUrl('');
              setResultados(null);
              setError(null);
            }}
            className="rounded-md bg-blue-500 py-2 px-4 text-white font-medium hover:bg-blue-700 mt-4"
          >
            Go Back
          </button>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
