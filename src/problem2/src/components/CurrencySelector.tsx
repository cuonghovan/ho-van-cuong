import { FC } from 'react';
import { getImageUrl } from '../utils/image-util';
import { Currency } from '../types';

interface CurrencySelectorProps {
  currencies: Currency[];
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (currency: Currency) => void;
  onClose: () => void;
}

const CurrencySelector: FC<CurrencySelectorProps> = ({
  currencies,
  searchTerm,
  onSearchChange,
  onSelect,
  onClose,
}) => (
  <div className="fixed min-h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-xl">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select Currency</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search currency..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={onSearchChange}
            value={searchTerm}
          />
          <svg className="w-5 h-5 absolute right-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div className="max-h-[80vh] overflow-y-auto">
        {currencies.map((currency) => (
          <button
            key={currency.currency}
            type="button"
            onClick={() => onSelect(currency)}
            className="w-full flex items-center px-4 py-3 hover:bg-gray-100 transition-colors"
            aria-label={`Select ${currency.currency}`}
          >
            <img src={getImageUrl(currency.icon)} alt={currency.currency} className="h-8 w-8 mr-3" />
            <span className="font-medium">{currency.currency}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default CurrencySelector;
