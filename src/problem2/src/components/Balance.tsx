import { FC } from 'react';
import { getImageUrl } from '../utils/image-util';
import { Currency } from '../types';
import CurrencySelector from './CurrencySelector';

interface BalanceProps {
  swapDirection: string;
  readonly?: boolean;
  currency: Currency;
  amount: string;
  showSelector: boolean;
  searchTerm: string;
  availableCurrencies: Currency[]
  onAmountChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectorToggle: () => void;
  onCurrencySelect: (currency: Currency) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Balance: FC<BalanceProps> = ({
  swapDirection,
  readonly = false,
  currency,
  amount,
  showSelector,
  searchTerm,
  availableCurrencies,
  onAmountChange,
  onSelectorToggle,
  onCurrencySelect,
  onSearchChange,
}) => {
  const amountInUSD = amount ? (parseFloat(amount) * currency.price).toFixed(2) : '0';

  return (
    <div className='relative w-full border-solid border border-gray-200 rounded-lg'>
      <header className='mt-4 px-4'>
        <p className="text-sm font-medium text-gray-700">{swapDirection}</p>
      </header>
      <div className="flex items-center justify-between px-4 pt-1">
        <div className="max-w-[40%]">
          <p className="text-sm text-gray-500">Balance:</p>
          <div className="flex items-center">
            <button
              type="button"
              onClick={onSelectorToggle}
              className="inline-flex items-center justify-center pr-4 py-2"
            >
              <img src={getImageUrl(currency.icon)} alt={currency.currency} className="h-6 w-6 mr-2" />
              <span className="font-medium">{currency.currency}</span>
              <svg className="ml-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showSelector && (
              <CurrencySelector
                currencies={availableCurrencies}
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
                onSelect={onCurrencySelect}
                onClose={onSelectorToggle}
              />
            )}
          </div>
        </div>
        <div className="max-w-[60%]">
          <div className="text-right max-w-full overflow-hidden">
            <p className="text-sm text-gray-500">{`≈ $${amountInUSD}`}</p>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={amount}
              onChange={onAmountChange}
              readOnly={readonly}
              placeholder="0"
              className="h-10 text-2xl font-semibold text-gray-700 w-full text-right outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
