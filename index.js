/* get token id function */
async function getTokenId() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/list?include_platform=false"
    );
    const result = await response.json();

    if (result) {
      const data = result.filter(
        (datum) =>
          datum.name === "Bitcoin" ||
          datum.name === "Ethereum" ||
          datum.name === "Litecoin" ||
          datum.name === "Dogecoin" ||
          datum.name === "yearn.finance" ||
          datum.name === "Chainlink"
      );

      return data;
    } else {
      throw new Error("Opps! Something went wrong!");
    }
  } catch (error) {
    console.log(error, "Something went wrong!!");
  }
}

/* get token price funtion */
async function getTokenPrice() {
  try {
    const dataId = await getTokenId();
    const id = dataId.map((datum) => datum.id);
    const url = id.join("%2C");
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${url}&vs_currencies=usd&include_24hr_change=true&precision=2`
    );

    if (response) {
      const dataPrice = await response.json();
      return dataPrice;
    }
  } catch (error) {
    console.log(error, "Oopps Something went wrong");
  }
}

/* change currency format helper function */
function usdNumFormat(num) {
  return new Intl.NumberFormat("us-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
}

/* DOM manipulation to show the prices */
async function changePriceDisplay() {
  const btc = document.querySelectorAll(".btc");
  const eth = document.querySelectorAll(".eth");
  const ltc = document.querySelectorAll(".ltc");
  const doge = document.querySelectorAll(".doge");
  const yfi = document.querySelectorAll(".yfi");
  const link = document.querySelectorAll(".link");
  const data = await getTokenPrice();

  /* change the price and 24hr change in percentage */
  /* BTC */
  btc[0].innerText = `BTC ${usdNumFormat(
    data.bitcoin.usd
  )} (${data.bitcoin.usd_24h_change.toFixed(2)}%)`;
  btc[1].innerText = `BTC ${usdNumFormat(
    data.bitcoin.usd
  )} (${data.bitcoin.usd_24h_change.toFixed(2)}%)`;

  /* LTC */
  ltc[0].innerText = `LTC ${usdNumFormat(
    data.litecoin.usd
  )} (${data.litecoin.usd_24h_change.toFixed(2)}%)`;
  ltc[1].innerText = `LTC ${usdNumFormat(
    data.litecoin.usd
  )} (${data.litecoin.usd_24h_change.toFixed(2)}%)`;

  /* ETH */
  eth[0].innerText = `ETH ${usdNumFormat(
    data.ethereum.usd
  )} (${data.ethereum.usd_24h_change.toFixed(2)}%)`;
  eth[1].innerText = `ETH ${usdNumFormat(
    data.ethereum.usd
  )} (${data.ethereum.usd_24h_change.toFixed(2)}%)`;

  /* DOGE */
  doge[0].innerText = `DOGE ${usdNumFormat(
    data.dogecoin.usd
  )} (${data.dogecoin.usd_24h_change.toFixed(2)}%)`;
  doge[1].innerText = `DOGE ${usdNumFormat(
    data.dogecoin.usd
  )} (${data.dogecoin.usd_24h_change.toFixed(2)}%)`;

  /* YFI */
  yfi[0].innerText = `YFI ${usdNumFormat(data["yearn-finance"].usd)} (${data[
    "yearn-finance"
  ].usd_24h_change.toFixed(2)}%)`;
  yfi[1].innerText = `YFI ${usdNumFormat(data["yearn-finance"].usd)} (${data[
    "yearn-finance"
  ].usd_24h_change.toFixed(2)}%)`;

  /* Chainlink */
  link[0].innerText = `LINK ${usdNumFormat(
    data.chainlink.usd
  )} (${data.chainlink.usd_24h_change.toFixed(2)}%)`;
  link[1].innerText = `LINK ${usdNumFormat(
    data.chainlink.usd
  )} (${data.chainlink.usd_24h_change.toFixed(2)}%)`;
}

/* set interval is set to call the function and update the price every 30 seconds because the coingecko will block the fetch request if done excessively */
changePriceDisplay();
setInterval(() => {
  console.log("i called you");
  changePriceDisplay();
}, 30000);
