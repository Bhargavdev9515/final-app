
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Web3 from "web3";
import img1 from '../../assets/images/level1.jpg';
import img2 from '../../assets/images/level2.jpg';
import img3 from '../../assets/images/level3.jpg';
import styles from "./minting.module.css";

const web3 = new Web3();



function _Minting() {
  const [price, setPrice] = useState("");
  const [isMinting, setIsMinting] = useState([false, false, false]);
  const [_level, setlevel] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [nftCounts, setNftCounts] = useState({ level1: 0, level2: 0, level3: 0 });
  const [loading, setLoading] = useState(false);
  const [hasNFTs, setHasNFTs] = useState(false);

  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, mint, mintoApp, token1 } = wallet;
  // const [MINTID,SETmintid] =useState()
  const [MINTID, SETmintid] = useState(() =>
    JSON.parse(localStorage.getItem("MINTID")) || []
  );

  const navigate = useNavigate();

  const mintNFT = async (level) => {
    try {
      setIsMinting(prevState => {
        const newState = [...prevState];
        newState[level - 1] = true;
        return newState;
      });
      const isConditionsSatisfied = await conditions(level);
      console.log("isConditionsSatisfied", isConditionsSatisfied);
      if (isConditionsSatisfied) {
        console.log("address", address);
        const _mint = await mint.methods
          .mintTreasuryCollection(level)
          .send({ from: address });
        console.log("mint", _mint);
        showDatas();
        fetchNFTBalances();
      } else {
        toast.error("Try Again");
      }
      setIsMinting(prevState => {
        const newState = [...prevState];
        newState[level - 1] = false;
        return newState;
      });
    } catch (e) {
      toast.error(e.message);
      setIsMinting(prevState => {
        const newState = [...prevState];
        newState[level - 1] = false;
        return newState;
      });
      fetchNFTBalances();

    }
  };

  const conditions = async (level) => {
    try {
      const balance = await token1.methods.balanceOf(address).call();
      const price = await mint.methods.getPrices(level).call();
      const allowance = await token1.methods
        .allowance(address, process.env.REACT_APP_MINTING)
        .call();

      // Check if balance is less than the price
      if (balance < price) {
        toast.error("Insufficient balance");
        return false;
      }
      // Check if price is greater than the allowance
      else if (price > allowance) {
        // Ask for approval
        await token1.methods
          .approve(process.env.REACT_APP_MINTING, "10000000000000000000000")
          .send({ from: address });
      }

      // If neither of the conditions are met, return true
      return true;
    } catch (e) {
      toast.error("Check Balance");
      return false;
    }
  };

  const userHasNFTs = async () => {
    const getIDs = await mint.methods.getAllCollections(address).call();
    console.log(getIDs.length)
    return getIDs.length > 0;
  };

  const showDatas = async () => {
    const getIDs = await mint.methods.getAllCollections(address).call();
    console.log("getIds", getIDs);
    SETmintid(getIDs);
    localStorage.setItem("MINTID", JSON.stringify(getIDs));
  };

  // fetch NFT balances
  const fetchNFTBalances = async () => {
    setLoading(true);
    const allNFTs = await mint.methods.getAllCollections(address).call();

    const counts = { level1: 0, level2: 0, level3: 0 };

    for (const nft of allNFTs) {
      const level = await mint.methods.getLevel(nft).call();
      switch (level) {
        case '1':
          counts.level1++;
          break;
        case '2':
          counts.level2++;
          break;
        case '3':
          counts.level3++;
          break;
        default:
          console.error(`Unexpected NFT level: ${level}`);
      }
    }

    setNftCounts(counts);
    setLoading(false);
  };

  useEffect(() => {
    const checkNFTs = async () => {
      const result = await userHasNFTs();
      setHasNFTs(result);
    };

    if (wallet.connected === true) checkNFTs();
  }, [address, mint]); // <- List of dependencies


  useEffect(() => {
    if (wallet.connected === true) {
      showDatas();
      fetchNFTBalances();
    }
  }, [address, mint]); // <- List of dependencies

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
                  <img src={img} className={styles.nft} />
                </div>
                <div className={styles.back}>
                  <p className={styles.balance}>
                    {loading ? '...' : index === 0 ? nftCounts.level1 :
                      index === 1 ? nftCounts.level2 :
                        index === 2 ? nftCounts.level3 : 0}
                  </p>
                </div>
              </div>
              <div className={styles.nftbuttons}>
                <button
                  className={styles.buy}
                  onClick={() => mintNFT(index + 1)}
                  disabled={isMinting[index]}
                >
                  {isMinting[index] ? "Buying...." : `Buy NFT`}
                </button>
                <button
                  className={hasNFTs ? styles.stake : styles.stakeDisabled}
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
export default _Minting;

