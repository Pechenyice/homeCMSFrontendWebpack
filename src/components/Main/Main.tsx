import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/profile');
  }, []);

  return <></>;
};
