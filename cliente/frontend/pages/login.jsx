import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/globals.css'; // Import your Tailwind CSS stylesheet
import Logo from '../public/2.svg'; // Ajusta la ruta según la ubicación de tu archivo SVG
import Image from 'next/image';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Fake authentication
    if (username === 'admin' && password === 'admin') {
      // Store user details in localStorage
      localStorage.setItem('user', JSON.stringify({ username }));
      // Redirect to dashboard
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="bg-gradient-to-bl from-cyan-700 to-slate-800 min-h-screen bg-no-repeat bg-cover bg-center flex justify-center">
      <div className="bg-gradient-to-bl from-cyan-700 to-slate-800 min-h-screen bg-cover bg-center flex justify-left w-2/3">
        <div className="flex items-center mr-8 px h-300 px w-500px ml-20 px mr-40">
          <div style={{ height: '300px', width: '300px' }}>
            <Image src={Logo} alt="Logo" width={300} height={100} />
          </div>
          <div className="flex flex-col w-2/3">
            <h1 className="text-4xl font-bold text-white" style={{ marginLeft: '10px', marginBottom: '10px' }}>
              AVG Análisis de Vulnerabilidades 
            </h1>
            <h1 className="text-1xl font-bold text-white" style={{ marginLeft: '10px', marginBottom: '10px' }}>
              Prueba Ahora nuestro sistema para encontrar posibles vulnerabilidades a tu sistema
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-#000000a6 min-h-screen w-1/3 flex justify-center items-center">
        <div>
          <form onSubmit={handleLogin}>
            <div>
              <span className="text-sm text-white">Bienvenido</span>
              <h1 className="text-white text-2xl font-bold">Ingresa tus datos</h1>
            </div>
            <div className="mt-5">
              <label className="text-white block text-md mb-2" htmlFor="username">
                Usuario
              </label>
              <input
                className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                required
              />
            </div>
            <div className="my-3">
              <label className="text-white block text-md mb-2" htmlFor="password">Contraseña</label>
              <input
                className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
              />
            </div>
            <div className="flex justify-between">
              <div>
                <input className="cursor-pointer" type="checkbox" name="rememberme" />
                <span className="text-white text-sm">Recuerdame</span>
              </div>
            
              <span className="text-sm text-white hover:underline cursor-pointer ml-2">¿Olvidaste tu Contraseña?</span>
            </div>
            <div>
              <button className="mt-4 mb-3 w-full bg-blue-500 hover:bg-blue-400 text-white py-2 rounded-md transition duration-100">Ingresar</button>
              <div className="flex space-x-2 justify-center items-center bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition duration-100">
                <img className="h-5 cursor-pointer" src="https://i.imgur.com/arC60SB.png" alt="Google sign-in" />
                <button type="button">Continuar con Google</button>
              </div>
            </div>
          </form>
          <p className="text-white mt-8">¿No tienes una Cuenta? <span className="cursor-pointer text-sm text-WHITE-600">Resgistrate</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
