import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Web3 from "web3";
import img1 from '../../assets/images/level1.jpg';
import img2 from '../../assets/images/level2.jpg';
import img3 from '../../assets/images/level3.jpg';
import styles from "./minting.module.css";
import BigNumber from 'bignumber.js';
const web3 = new Web3();

function MintingPage() {
  const [isMinting, setIsMinting] = useState([false, false, false]);
  const [nftDetails, setNftDetails] = useState([
    { level: 1, price: 0, supply: 0, minted: 0, remaining: 0 },
    { level: 2, price: 0, supply: 0, minted: 0, remaining: 0 },
    { level: 3, price: 0, supply: 0, minted: 0, remaining: 0 },
  ]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hasNFTs, setHasNFTs] = useState(false);

  const wallet = useSelector((state) => state.WalletConnect);
  const { address, mint, token1 } = wallet;

  const navigate = useNavigate();

  const mintNFT = async (level) => {
    try {
      setIsMinting(prevState => {
        const newState = [...prevState];
        newState[level - 1] = true;
        return newState;
      });

      const balance = new BigNumber(await token1.methods.balanceOf(address).call());
      const price = new BigNumber(await mint.methods.getPrices(level).call());
      const allowance = new BigNumber(await token1.methods
        .allowance(address, process.env.REACT_APP_MINTING)
        .call());

      if (balance.isLessThan(price)) {
        toast.error("Insufficient balance");
      } else if (price.isGreaterThan(allowance)) {
        await token1.methods
          .approve(process.env.REACT_APP_MINTING, "10000000000000000000000")
          .send({ from: address });
        const _mint = await mint.methods
          .mintTreasuryCollection(level)
          .send({ from: address });
        toast.success("NFT Minted Successfully");
      } else {
        const _mint = await mint.methods
          .mintTreasuryCollection(level)
          .send({ from: address });
        toast.success("NFT Minted Successfully");
      }

      setIsMinting(prevState => {
        const newState = [...prevState];
        newState[level - 1] = false;
        return newState;
      });

      fetchNFTDetails();

    } catch (e) {
      toast.error(e.message);
      setIsMinting(prevState => {
        const newState = [...prevState];
        newState[level - 1] = false;
        return newState;
      });
    }
  };


  const fetchNFTDetails = async () => {
    try {
      const detailsPromises = nftDetails.map(async (item) => {
        const level = item.level;
        const price = await mint.methods.getPrices(level).call();
        const priceAsString = price.toString();
        const rPrice = web3.utils.fromWei(priceAsString, "ether");
        const totalSupply = await mint.methods.nftLevelSupply(level).call();
        const totalMinted = await mint.methods.totalMintedNFTs(level).call();
        console.log(totalSupply, totalMinted)
        const remaining = totalSupply - totalMinted;
        return { level, price: rPrice, supply: totalSupply, minted: totalMinted, remaining };
      });

      const details = await Promise.all(detailsPromises);
      setNftDetails(details);
    } catch (e) {
      console.log(e)
    }
  };


  const userHasNFTs = async () => {
    const getIDs = await mint.methods.getAllCollections(address).call();
    console.log(getIDs.length)
    return getIDs.length > 0;
  };

  useEffect(() => {
    const checkNFTs = async () => {
      const result = await userHasNFTs();
      setHasNFTs(result);
    };

    if (wallet.connected === true) {
      fetchNFTDetails();
      checkNFTs();
    }
  }, [address, mint]);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.imgc}>
          {[img1, img2, img3].map((img, index) => (
            <div className={styles.nftc} key={index}>
              <div
                className={`${styles.flipContainer} ${hoverIndex === index ? styles.flip : ""}`}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div className={styles.front}>
                  <img alt="" src={img} className={styles.nft} />
                </div>
                <div className={styles.back}>
                  <p className={styles.balance}>
                    Price: {nftDetails[index].price} Treasure<br />
                    Total: {nftDetails[index].supply} NFT<br />
                    Remaining: {nftDetails[index].remaining} NFT
                    Minted: {nftDetails[index].minted} NFT
                  </p>
                </div>
              </div>
              <div className={styles.nftbuttons}>
                {nftDetails[index].remaining > 0 ? (
                  <button
                    className={styles.buy}
                    onClick={() => mintNFT(index + 1)}
                    disabled={isMinting[index]}
                  >
                    {isMinting[index] ? "Buying...." : `Buy NFT`}
                  </button>
                ) : (
                  <button
                    className={styles.disabled}
                    disabled
                  >
                    Sold Out
                  </button>
                )}
                <button
                  className={hasNFTs ? styles.stake : styles.disabled}
                  onClick={() => { navigate('/staking') }}
                  disabled={!hasNFTs}
                >
                  {hasNFTs ? 'Stake NFT' : 'No NFT'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div >
      <ToastContainer />
    </>
  );
}

export default MintingPage;
