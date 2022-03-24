import { useState } from "react";
import ExRate from "./ExRate";
import axios from "axios";

const Converter = () => {
  const currencySelection = ["BTC", "ETH", "USD", "XRP", "LTC", "ADA"];
  const [mainCurrency, setMainCurrency] = useState("BTC");
  const [secondaryCurrency, setSecondaryCurrency] = useState("BTC");
  const [amount, setAmount] = useState(1);
  const [exRate, setExRate] = useState(0);
  const [mainCurrencyExchanged, setMainCurrencyExchanged] = useState('BTC')
  const [secondaryCurrencyExchanged, setSecondaryCurrencyExchanged] = useState('BTC')
  const [result, setResult] = useState(0);

  const convert = () => {
    var options = {
      method: "GET",
      url: "https://alpha-vantage.p.rapidapi.com/query",
      params: {
        from_currency: mainCurrency,
        function: "CURRENCY_EXCHANGE_RATE",
        to_currency: secondaryCurrency,
      },
      headers: {
        "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        );
        setExRate(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        );
        setResult(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] *
            2
        );
        setMainCurrencyExchanged(mainCurrency)
        setSecondaryCurrencyExchanged(secondaryCurrency)
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  console.log(exRate);
  return (
    <div className="converter">
      <div className="input-data">
        <h2>Converter</h2>
        <table>
          <tbody>
            <tr>
              <td> 1:</td>
              <td>
                <input
                  type="number"
                  name="amount-1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </td>
              <td>
                <select
                  value={mainCurrency}
                  name="option-1"
                  className="currency-options-1"
                  onChange={(e) => setMainCurrency(e.target.value)}
                >
                  {currencySelection.map((currency) => (
                    <option id="options">{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td> 2:</td>
              <td>
                <input
                  type="number"
                  name="amount-2"
                  value={result}
                  disabled={true}
                />
              </td>
              <td>
                <select
                  value={secondaryCurrency}
                  name="option-1"
                  className="currency-options-2"
                  onChange={(e) => setSecondaryCurrency(e.target.value)}
                >
                  {currencySelection.map((currency) => (
                    <option id="options">{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button id="convert-btn" onClick={convert}>
          convert
        </button>
      </div>

      <ExRate 
        exRate={exRate}
        mainCurrency={mainCurrencyExchanged}
        secondaryCurrency={secondaryCurrencyExchanged}
      />
    </div>
  );
};

export default Converter;
