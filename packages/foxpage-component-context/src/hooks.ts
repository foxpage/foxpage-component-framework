import { useContext } from 'react';
import { FoxpageContext } from './context';

export const useFoxpageContext = () => {
  return useContext(FoxpageContext);
};
