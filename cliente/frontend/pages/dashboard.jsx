// pages/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ScanForm from '../componentes/ScanForm';

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
    <div className='bg-black'>

      <ScanForm />
    </div>
  );
};

export default Dashboard;
