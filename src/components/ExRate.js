const ExRate = ({exRate, mainCurrency, secondaryCurrency}) => {
    return (
      <div className="exchange-rate">
        <h2 className="excrateheader">Exchange Rate:</h2>
         <h1>{exRate}</h1> 
         <p>{mainCurrency} to {secondaryCurrency} </p>
      </div>
    );
  }
  
  export default ExRate;