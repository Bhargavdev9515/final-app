
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { Row, Col, Image, Stack } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img1 from '../../assets/images/level1.jpg';
import img2 from '../../assets/images/level2.jpg';
import img3 from '../../assets/images/level3.jpg';
import rewards from "./rewards.module.css";

const placeholder = require("../../assets/images/download5.jpg").default

function __Staking() {
  const [logo, setlogo] = useState("");
  const [NftName, setNftName] = useState("");
  const [cardCount, setCardCount] = useState(1);

  const [mintIds, setMintIds] = useState(() =>
    JSON.parse(localStorage.getItem("MINTID")) || []
  );

  const [levels, setLevels] = useState(() =>
    JSON.parse(localStorage.getItem("level")) || []
  );
  const [staked, setStaked] = useState([])
  const wallet = useSelector((state) => state.WalletConnect);

  const { web3, address, mint, mintoApp, token1, staking } = wallet;
  // const [MINTID,SETmintid] =useState()
  const [MINTID, SETmintid] = useState(() =>
    JSON.parse(localStorage.getItem("MINTID")) || []
  );


  useEffect(() => {
    if (wallet.connected) {
      updateMintIdsAndLevels();
      showDatas();
    }
  }, [wallet.connected]);

  const updateMintIdsAndLevels = async () => {
    const ids = await mint.methods.getAllCollections(address).call();
    const levelPromises = ids.map(async (id) => {
      const level = await mint.methods.getLevel(id).call();
      return level;
    });
    const fetchedLevels = await Promise.all(levelPromises);
    setMintIds(ids);
    setLevels(fetchedLevels);
    localStorage.setItem("MINTID", JSON.stringify(ids));
    localStorage.setItem("level", JSON.stringify(fetchedLevels));
  };



  const getUserDetails = async () => {
    const stakeIDs = await staking.methods.getAllStakedUsers(address).call();
    setStaked(stakeIDs);
    for (let i = 0; i < stakeIDs.length; i++) {
      const details = await staking.methods.stakersDetails(address, stakeIDs[i]).call();
      console.log("details", details)
      console.log("details", details.tokenID)
    }
    console.log(stakeIDs)

  }

  const claimRewards = async (id) => {
    const claim = await staking.methods.claimRewards(id).send({ from: address });
    // fetch data and update state once claim operation is done
    updateMintIdsAndLevels();
    showDatas();
  };

  const unstake = async (id) => {
    const _unstake = await staking.methods.unstakeNFTs(id).send({ from: address });
    // fetch data and update state once unstake operation is done
    updateMintIdsAndLevels();
    showDatas();
  };

  const showDatas = async () => {
    const getIDs = await staking.methods.getAllStakedUsers(address).call();
    console.log("getIds", getIDs);
    SETmintid(getIDs);
    localStorage.setItem("MINTID", JSON.stringify(getIDs));
  };

  const Card = ({ id, level }) => {
    const imageMap = {
      1: img1,
      2: img2,
      3: img3,
    };

    const src = imageMap[level] || placeholder;

    return (
      <div key={id} className={`${rewards.card} liveauction_cards metablog_cards h-100`}>
        <Stack gap={2}>
          <div className={rewards.imageContainer}>
            <Image src={src} alt="square" className={rewards.img} />
          </div>
          {/* Here you pass the id to the unstake and claimRewards functions when the buttons are clicked */}
          <button className={rewards.btn1} onClick={() => unstake(id)}>Unstake NFT</button>
          <button className={rewards.btn2} onClick={() => claimRewards(id)}>Claim Rewards</button>
        </Stack >
      </div >
    );
  };


  return (
    <>
      {wallet.connected ? (
        <div className={rewards.container}>
          {MINTID.map((id, index) => <Card key={id} id={id} level={levels[index]} />)}
        </div>)
        : (
          <div />
        )}
    </>
  );



}

export default __Staking;