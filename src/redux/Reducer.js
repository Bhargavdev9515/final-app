import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const getProviderOptions = () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        //infuraId: process.env.REACT_APP_INFURA_ID
        rpc: {
          137: "https://polygon-rpc.com/",
          80001: "https://rpc-mumbai.maticvigil.com/"
        }
      }
    }
  }

  return providerOptions;
}

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions: getProviderOptions() // required
});


const initialState = {
  loading: false,
  address: "",
  connected: false,
  web3: null,
  mint: null,
  provider: null,
  token: null,
  token1: null,
  staking: null,
  errorMsg: null,
  reward: null,
  web3Modal
}

const walletConnectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        address: action.payload.address,
        token: action.payload.token,
        token1: action.payload.token1,
        mint: action.payload.mint,
        staking: action.payload.staking,
        reward: action.payload.reward,
        web3: action.payload.web3,
        provider: action.payload.provider,
        connected: action.payload.connected
      };
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    case "UPDATE_ADDRESS":
      return {
        ...state,
        address: action.payload.address,
      };
    default:
      return state;
  }
};

export default walletConnectReducer;
