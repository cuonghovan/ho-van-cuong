import { useState, useEffect } from 'react';
import { Currency } from './types';
import Balance from './components/Balance';
import LoadingOverlay from './components/LoadingOverlay';
import SwitchButton from './components/SwitchButton';
import Rate from './components/Rate';
import originalPriceData from './mocks/price.json';

function App() {
  const [inputAmount, setInputAmount] = useState<string>('');
  const [outputAmount, setOutputAmount] = useState<string>('');
  const [inputCurrency, setInputCurrency] = useState<Currency>(originalPriceData[0]);
  const [outputCurrency, setOutputCurrency] = useState<Currency>(originalPriceData[1]);
  const [showInputSelector, setShowInputSelector] = useState(false);
  const [showOutputSelector, setShowOutputSelector] = useState(false);
  const [currencySearchTerm, setCurrencySearchTerm] = useState<string>('');
  const [isSwitching, setIsSwitching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [priceData, setPriceData] = useState<Currency[]>(originalPriceData);

  const handleCurrencyAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) return;
    // Remove leading zeros unless it's just "0"
    const cleanedValue = value.replace(/^0+(?=\d)/, '');
    setInputAmount(cleanedValue);
    setIsSwitching(false);
  };

  const resetCurrencySelector = () => {
    setCurrencySearchTerm('');
    setPriceData(originalPriceData);
  };

  const handleToggleCurrencySelector = (isInput: boolean) => {
    if (isInput) {
      setShowInputSelector(!showInputSelector);
    } else {
      setShowOutputSelector(!showOutputSelector);
    }
    resetCurrencySelector();
  };

  const handleSearchCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrencySearchTerm(value);
    const filteredCurrencies = originalPriceData.filter((currency: Currency) =>
      currency.currency.toLowerCase().includes(value.toLowerCase())
    );
    setPriceData(filteredCurrencies);
  };

  const handleCurrencySelection = (currency: Currency, isInput: boolean) => {
    if (isInput) {
      if (currency.currency === outputCurrency.currency) {
        handleSwitchBalance();
      } else {
        setInputCurrency(currency);
        setIsSwitching(false);
      }
      setShowInputSelector(false);
    } else {
      if (currency.currency === inputCurrency.currency) {
        handleSwitchBalance();
      } else {
        setOutputCurrency(currency);
        setIsSwitching(false);
      }
      setShowOutputSelector(false);
    }
    resetCurrencySelector();
  };

  const handleSwitchBalance = () => {
    setInputCurrency(outputCurrency);
    setOutputCurrency(inputCurrency);
    setInputAmount(outputAmount);
    setOutputAmount(inputAmount);
    setIsSwitching(true);
  };

  useEffect(() => {
    if (isSwitching) return;
    setIsLoading(true);
    // simulate loading
    const calculationTimer = setTimeout(() => {
      const inputValue = parseFloat(inputAmount) || 0;
      const exchangeRate = inputCurrency.price / outputCurrency.price;
      setOutputAmount((inputValue * exchangeRate).toFixed(6));
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(calculationTimer);
  }, [inputCurrency, outputCurrency, inputAmount, isSwitching]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12">
      <div className="relative max-w-md w-full mx-auto px-6 py-6 bg-white border-solid border border-gray-200 rounded-lg">
        <div className="flex flex-col justify-center items-center max-w-md space-y-6">
          <Balance
            swapDirection="From"
            currency={inputCurrency}
            amount={inputAmount}
            showSelector={showInputSelector}
            searchTerm={currencySearchTerm}
            availableCurrencies={priceData}
            onAmountChange={handleCurrencyAmountInputChange}
            onSelectorToggle={() => handleToggleCurrencySelector(true)}
            onCurrencySelect={(currency) => handleCurrencySelection(currency, true)}
            onSearchChange={handleSearchCurrency}
          />
          <SwitchButton onClick={handleSwitchBalance} />
          <Balance
            swapDirection="To"
            readonly={true}
            currency={outputCurrency}
            amount={outputAmount}
            showSelector={showOutputSelector}
            searchTerm={currencySearchTerm}
            availableCurrencies={priceData}
            onSelectorToggle={() => handleToggleCurrencySelector(false)}
            onCurrencySelect={(currency) => handleCurrencySelection(currency, false)}
            onSearchChange={handleSearchCurrency}
          />
          <Rate inputCurrency={inputCurrency} outputCurrency={outputCurrency} />
        </div>
        {isLoading && <LoadingOverlay />}
      </div>
    </div>
  );
}

export default App;
