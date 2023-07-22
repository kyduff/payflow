// import { providers, TypedDataField } from 'ethers'
// import {EIP712TypedData} from '@1inch/fusion-sdk/limit-order'
// import {BlockchainProviderConnector} from '@1inch/fusion-sdk/connector/blockchain/blockchain-provider.connector'
// import Web3 from 'web3'

// // interface ExtendedWeb3 extends Web3 {
// //     signTypedDataV4(walletAddress: string, typedData: string): Promise<string>
// // }

// export class Web3ProviderConnector implements BlockchainProviderConnector {
//     constructor(protected readonly web3Provider: providers.JsonRpcSigner) {}

//     signTypedData(
//         typedData: EIP712TypedData
//     ): Promise<string> {
//         // const extendedWeb3: ExtendedWeb3 = this.web3Provider.extend({
//         //     methods: [
//         //         {
//         //             name: 'signTypedDataV4',
//         //             call: 'eth_signTypedData_v4',
//         //             params: 2
//         //         }
//         //     ]
//         // })

//         return this.web3Provider._signTypedData(
//             typedData.domain,
//             JSON.stringify(typedData.types) as unknown as Record<string, TypedDataField[]>,
//             JSON.stringify(typedData.message) as unknown as Record<string, TypedDataField[]>,
//         )
//     }

//     ethCall(contractAddress: string, callData: string): Promise<string> {
//         return this.web3Provider.call({
//             to: contractAddress,
//             data: callData
//         })
//     }
// }


// // interface ExtendedWeb3 extends Web3 {
// //     signTypedDataV4(walletAddress: string, typedData: string): Promise<string>
// // }

// // export class Web3ProviderConnector implements BlockchainProviderConnector {
// //     constructor(protected readonly web3Provider: Web3) {}

// //     signTypedData(
// //         walletAddress: string,
// //         typedData: EIP712TypedData
// //     ): Promise<string> {
// //         const extendedWeb3: ExtendedWeb3 = this.web3Provider.extend({
// //             methods: [
// //                 {
// //                     name: 'signTypedDataV4',
// //                     call: 'eth_signTypedData_v4',
// //                     params: 2
// //                 }
// //             ]
// //         })

// //         return extendedWeb3.signTypedDataV4(
// //             walletAddress,
// //             JSON.stringify(typedData)
// //         )
// //     }

// //     ethCall(contractAddress: string, callData: string): Promise<string> {
// //         return this.web3Provider.eth.call({
// //             to: contractAddress,
// //             data: callData
// //         })
// //     }
// // }