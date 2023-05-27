
import { useDispatch, useSelector } from "react-redux";

import _Minting from "./minting"
import UserNfts from "./userMinted";


function Minting() {

  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, mint, mintoApp, token1 } = wallet;

  // const Balance=async()=>{
  //   const bal=await token1.methods.balanceOf(address).call();
  //   console.log("bal",bal);
  // }



  return (
    <>
      <_Minting />

    </>
  );


}
export default Minting;