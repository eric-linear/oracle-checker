import {Client} from "@bandprotocol/bandchain.js"
import { ethers, ContractFactory, providers, Wallet, Contract } from "ethers";

import StdReferenceBasicAbi from "./abis/StdReferenceBasic.json";

// BandChain REST Endpoint
const endpoint = 'https://api-gm-lb.bandchain.org';
const client = new Client(endpoint);

async function exampleGetReferenceData() {
  //const rate = await client.getReferenceData(['VET/USD']);
  //return rate;
    const provider: providers.Provider = ethers.getDefaultProvider("https://bsc-dataseed1.binance.org/")
    const bandImpl: Contract = new Contract(
        "0xF5d5f2fcF50FF26b97Eb0BaAFBc14734aeDFbA27",
        StdReferenceBasicAbi,
        provider
      );
    const data = await bandImpl.getReferenceData("VET","USD")
    const buf = Buffer.from(data.lastUpdatedBase._hex, 'hex');
    //console.log(ethers.BigNumber.from(data.lastUpdatedBase._hex).toNumber())
    const dateTime = new Date(ethers.BigNumber.from(data.lastUpdatedBase._hex).toNumber() * 1000)
    return dateTime.toString()
}

(async () => {
  while(true){
    console.log(await exampleGetReferenceData());
    await new Promise((r) => setTimeout(r, 30_000));
  }
})();
