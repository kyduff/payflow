import {useAccount, useNetwork} from 'wagmi'
import {ethers} from 'ethers'
//import { useEffect, useState } from "react";
import tokenAddresses_poly from '../token_addresses/polygon_add';
import tokenAddresses_eth from '../token_addresses/eth_add';
import tokenAddresses_gno from '../token_addresses/gnosis_add';
import tokenAddresses_goe from '../token_addresses/goerli_add';


export async function display_tokens(address:string, chain:any): Promise<any>{
  const polygon_abi="https://frosty-aged-diagram.matic.quiknode.pro/cc81614a08c285532b6198f603f90d1fbb3d01f1/";
  const gnosis_api="https://divine-quiet-meme.xdai.quiknode.pro/03608aaff20b4638d2cfa05756550b88193ee194/";
  //const gnosis_api ="https://rpc.gnosischain.com/";
  const getBalance = async function (api:string, contractAddress:string) {
    // Set up the provider
    const provider = new ethers.providers.JsonRpcProvider(api);
  
    // ABI of the balanceOf function in the contract
    const contractABI = ["function balanceOf(address owner) view returns (uint256)"];
      
    // Address of the holder
    const holderAddress = address;

    // Create an instance of the contract
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    // Query the balance
    const balance = await contract.balanceOf(holderAddress);

    // Convert balance to a more readable format
    const readableBalance = ethers.utils.formatUnits(balance, 18);  // assuming 18 decimals

    //console.log(`The balance of address ${holderAddress} is ${readableBalance}`);
    return readableBalance;
  }
  // Array to store the fetched balances
  const fetched_balances: number[] = [];

  if (chain.id==137){
    // Loop through the tokenlist array and call getBalance(element) for each element
    for (const element of tokenAddresses_poly) {
    const balance: any = await getBalance(polygon_abi,element);
    fetched_balances.push(balance); // Save the balance in the fetched_balances array
    }
  }

  if (chain.name==100){
        // Loop through the tokenlist array and call getBalance(element) for each element
    for (const element of tokenAddresses_gno) {
      const balance: any = await getBalance(gnosis_api,element);
      fetched_balances.push(balance); // Save the balance in the fetched_balances array
    }
  }

  //console.log(fetched_balances); // Print the array to the console
  return fetched_balances;
  }
  

