import {useAccount, useNetwork} from 'wagmi'
import ethers from 'ethers'
//import { useEffect, useState } from "react";
import tokenAddresses_poly from '../token_addresses/polygon_add';

   
  export async function display_tokens() {
    const { address, connector, isConnected } = useAccount()
    const { chain, chains } = useNetwork()
    const ethers = require("ethers");
    //if (chain.name=="Polygon"){
      console.log(tokenAddresses_poly);
      const contracts=tokenAddresses_poly;
      //const [api_json, setIsLoading] = useState()
      
      const provider = new ethers.providers.JsonRpcProvider("https://divine-quiet-meme.xdai.quiknode.pro/03608aaff20b4638d2cfa05756550b88193ee194/");
      const heads = await provider.send("qn_getWalletTokenBalance", [{
        wallet: address},
      ]);
      console.log(heads);
    
      if (isConnected) {
        return (
          heads
        )
      //}

    }
  }