import {FusionSDK, PrivateKeyProviderConnector } from "@1inch/fusion-sdk";
import {PresetEnum} from "@1inch/fusion-sdk/api";
import Web3 from "web3";
import {getQuote} from "./get-rate";
import {createOrder, getAddressFromPrivateKey} from "./create-order";
import {ERC20_ABI} from "./abi/erc20";
import {ordersByMaker} from "./get-orders";
import {key} from "../numbers";

const EURe = '0xcB444e90D8198415266c6a2724b7900fb12FC56E';
const OneInchRouter = '0x1111111254EEB25477B68fb85Ed929f73A960582';

export async function sellToEURe(chain: number, fromAddress: string, fromToken: string, amount: string, walletAddress: string, preset: PresetEnum) {
    //@ts-ignore
    const web3 = new Web3(window.ethereum)

    const blockchainProvider = new PrivateKeyProviderConnector(
        key,
        //@ts-ignore
        web3,
    )

    const sdk = new FusionSDK({
        url: 'https://fusion.1inch.io',
        network: chain,
        blockchainProvider
    })
    
    const tokenContract = new web3.eth.Contract(ERC20_ABI, fromToken);
    //@ts-ignore
    const approvalData = tokenContract.methods.approve(OneInchRouter, amount).encodeABI();
    await web3.eth.sendTransaction({
        from: fromAddress,
        data: approvalData,
        to: fromToken,
    })

    const quote = await getQuote(sdk, fromToken, EURe, amount)

    const info = await createOrder(sdk,
        fromToken,
        EURe,
        amount,
        fromAddress,
        PresetEnum.fast);
    console.log("info:: ", JSON.stringify(info))

    // we have tx finality once this promise resolves
    const orders = await ordersByMaker(sdk, fromAddress)
}
