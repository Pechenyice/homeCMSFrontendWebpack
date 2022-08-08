import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminMain = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/users');
  }, []);

  return <></>;
};
