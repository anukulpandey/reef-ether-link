import { useEffect, useState } from 'react';
import { getReviveBalance } from 'reef-evm-util-lib';
import { useReefState } from '@/contexts/ReefStateContext';

const REEF_DECIMALS = 18;

export function useReefBalance(address: string | undefined) {
  const { isReefReady } = useReefState();
  const [balance, setBalance] = useState<number>(0);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!address || !isReefReady) return;

    let cancelled = false;

    const fetchBalance = async () => {
      try {
        const weiBalance = await getReviveBalance(address);
        if (!cancelled) {
          setBalance(Number(weiBalance) / 10 ** REEF_DECIMALS);
          setHasFetched(true);
        }
      } catch (err) {
        console.error('Failed to fetch reef balance:', err);
      }
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 15_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [address, isReefReady]);

  const isLoading = !!address && !hasFetched;

  return { balance, isLoading };
}
