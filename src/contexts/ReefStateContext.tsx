import { createContext, useContext, useEffect, useState } from 'react';
import { initReefState, NETWORK_CONFIGS, NetworkType } from 'reef-evm-util-lib';

type ReefStateContextValue = {
  isReefReady: boolean;
};

const ReefStateContext = createContext<ReefStateContextValue>({ isReefReady: false });

export const ReefStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReefReady, setIsReefReady] = useState(false);

  useEffect(() => {
    initReefState(NETWORK_CONFIGS[NetworkType.ReefLocalhost])
      .then(() => setIsReefReady(true))
      .catch((err) => console.error('Failed to initialize reef state:', err));
  }, []);

  return (
    <ReefStateContext.Provider value={{ isReefReady }}>
      {children}
    </ReefStateContext.Provider>
  );
};

export const useReefState = () => useContext(ReefStateContext);
