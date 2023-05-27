import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Token from "../contract/Treasure.json"
import Mint from "../contract/Minting.json"
import Staking from "../contract/Staking.json"

const currentchainid = process.env.REACT_APP_CHAIN_ID

console.log("currentchainid", currentchainid)
const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

export const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

export const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const getProviderOptions = () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        //infuraId: process.env.REACT_APP_INFURA_ID
        rpc: {
          14441: "https://api.testnetloop.com/"
        }
      }
    }
  }
  return providerOptions;
}

export const connectWallet = (walletname) => {
  return async (dispatch) => {
    dispatch(connectRequest());
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: getProviderOptions() // required
      });

      var provider = "";
      if (walletname === "coinbasewallet") {
        //connect - coinbasewallet
        provider = await web3Modal.connectTo("coinbasewallet");
      } else if (walletname === "walletconnect") {
        //connect - walletconnect
        provider = await web3Modal.connectTo("walletconnect");
      } else if (walletname === "metamask") {
        const web3Modal = new Web3Modal({
          cacheProvider: true,
          providerOptions: getProviderOptions().walletconnect, // required
        });
        //connect - metamask
        provider = await web3Modal.connect();
      }


      await subscribeProvider(provider);

      const web3 = new Web3(provider);

      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];

      const mint = new web3.eth.Contract(
        Mint,
        process.env.REACT_APP_MINTING
      );
      const token1 = new web3.eth.Contract(
        Token,
        process.env.REACT_APP_TOKEN
      );

      const staking = new web3.eth.Contract(
        Staking,
        process.env.REACT_APP_STAKING
      );

      console.log(process.env.REACT_APP_STAKING)
      console.log(staking)


      if (window.ethereum && window.ethereum.networkVersion !== currentchainid) {
        await addNetwork(currentchainid);
      }

      dispatch(
        connectSuccess({
          address,
          web3,
          provider,
          mint,
          token1,
          staking,
          connected: true,
          web3Modal,
        })
      );
    } catch (e) {
      dispatch(connectFailed(e));
    }
  }
}

const subscribeProvider = async (provider) => {
  if (!provider.on) {
    return;
  }

  provider.on("connect", async (id) => {
    console.log(id);
  });

}

export async function addNetwork(id) {
  let networkData;
  switch (parseInt(id)) {
    //LoopNetwork
    case 14441:
      networkData = [
        {
          chainId: "0x3869",
          chainName: "Loop Test Network",
          rpcUrls: ["https://api.testnetloop.com/"],
          nativeCurrency: {
            name: "Loop",
            symbol: "LOOP",
            decimals: 18,
          },
          blockExplorerUrls: ["https://explorer.testnetloop.com/"],
        },
      ];

      break;
    default:
      break;
  }
  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: networkData,
  });
}




