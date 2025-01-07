import { useMemo } from 'react';
import { Currency } from '../types';

interface RateProps {
  inputCurrency: Currency;
  outputCurrency: Currency;
}

const Rate = ({ inputCurrency, outputCurrency }: RateProps) => {
  const rate = useMemo(() => {
    return (inputCurrency.price / outputCurrency.price).toFixed(6);
  }, [inputCurrency, outputCurrency]);

  return (
    <section className="mt-4 w-full flex justify-between items-center">
      <div className="flex items-center">
        <p className="text-sm text-gray-500">Rate</p>
      </div>
      <div className="flex items-center">
        <p className="text-sm font-medium text-gray-700">{`1 ${inputCurrency.currency} = ${rate} ${outputCurrency.currency}`}</p>
      </div>
    </section>
  );
};

export default Rate;
