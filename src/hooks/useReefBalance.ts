import { useEffect, useState } from 'react';
import { getReviveBalance } from 'reef-evm-util-lib';
import { useReefState } from '@/contexts/ReefStateContext';

const REEF_DECIMALS = 18;

export function useReefBalance(address: string | undefined) {
  const { isReefReady } = useReefState();
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!address || !isReefReady) return;

    let cancelled = false;

    const fetchBalance = async () => {
      setIsLoading(true);
      try {
        const weiBalance = await getReviveBalance(address);
        if (!cancelled) {
          setBalance(Number(weiBalance) / 10 ** REEF_DECIMALS);
        }
      } catch (err) {
        console.error('Failed to fetch reef balance:', err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 15_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [address, isReefReady]);

  return { balance, isLoading };
}
