import { Contract, providers, Signer, BigNumber, utils } from "ethers";
import tokenAbi from "./tokenAbi";
import airdropAbi from "./airdropAbi";

var provider: providers.Web3Provider;

// Token contract
var tokenContract: Contract;
var tokenAddress: string = "0x5036aA408db59397aB17dbd6521eB9d4d00658B5";

// Airdrop contract
var airdropContract: Contract;
var airdropAddress: string = "0xD8415F64d6DCa99a282b6433A29A060230820C86";

export function init(_provider: providers.ExternalProvider): Contract[] {
  provider = new providers.Web3Provider(_provider);

  tokenContract = new Contract(tokenAddress, tokenAbi, provider);
  airdropContract = new Contract(airdropAddress, airdropAbi, provider);
  return [tokenContract, airdropContract];
}

////////////////////////////////////////////////////////////////////////////////
////////////////////            TOKEN CONTRACT            //////////////////////
////////////////////////////////////////////////////////////////////////////////
export async function approve(
  _amount: BigNumber,
  _signer: Signer,
  _numberOfConfirmations: number = 1
) {
  var tx = await tokenContract
    .connect(_signer)
    .approve(airdropAddress, _amount);
  return await tx.wait(_numberOfConfirmations);
}

////////////////////////////////////////////////////////////////////////////////
////////////////////           AIRDROP CONTRACT           //////////////////////
////////////////////////////////////////////////////////////////////////////////
export async function participateInAirdrop(
  _signer: Signer,
  _numberOfConfirmations: number = 1
) {
  var tx = await airdropContract.connect(_signer).participateInAirdrop();
  return await tx.wait(_numberOfConfirmations);
}

export async function quemarMisTokensParaParticipar(
  _signer: Signer,
  _numberOfConfirmations: number = 1
) {
  var tx = await airdropContract
    .connect(_signer)
    .quemarMisTokensParaParticipar();
  return await tx.wait(_numberOfConfirmations);
}

export async function addToWhiteList(
  _signer: Signer,
  _account: string,
  _numberOfConfirmations: number = 1
) {
  var tx = await airdropContract.connect(_signer).addToWhiteList(_account);
  return await tx.wait(_numberOfConfirmations);
}

export async function removeFromWhitelist(
  _signer: Signer,
  _account: string,
  _numberOfConfirmations: number = 1
) {
  var tx = await airdropContract.connect(_signer).removeFromWhitelist(_account);
  return await tx.wait(_numberOfConfirmations);
}

////////////////////////////////////////////////////////////////////////////////
////////////////////          NETWORK CONNECTION           /////////////////////
////////////////////////////////////////////////////////////////////////////////
declare var __rpcUrlAlchemy__: string;
declare var __blockExplorer__: string;
declare var __chainName__: string;
declare var __networkId__: string;

declare let window: {
  ethereum: any;
};

const networkMap = {
  NETWORK_TESTNET: {
    chainId: utils.hexValue(Number(__networkId__)),
    chainName: __chainName__,
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    rpcUrls: [__rpcUrlAlchemy__],
    blockExplorerUrls: [__blockExplorer__],
  },
};

export async function connectToMumbai() {
  if (window.ethereum) {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [networkMap.NETWORK_TESTNET],
    });
  } else {
    console.log("Not Metamask detected");
  }
}
