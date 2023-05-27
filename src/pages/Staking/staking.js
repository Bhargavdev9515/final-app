import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Image, Stack } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img1 from '../../assets/images/level1.jpg';
import img2 from '../../assets/images/level2.jpg';
import img3 from '../../assets/images/level3.jpg';
import StakeModal from './StakeModal';
import Staking from "./staking.module.css";
const placeholder = require("../../assets/images/placeholder.png").default;


const NftCard = ({ id, level, stakeHandler, isStaking }) => {
  const imageMap = {
    1: { src: img1, displayLevel: "Level 1" },
    2: { src: img2, displayLevel: "Level 2" },
    3: { src: img3, displayLevel: "Level 3" },
  };

  const imageDetails = imageMap[level] || { src: placeholder, displayLevel: "N/A" };
  const { src, displayLevel } = imageDetails;

  return (
    <div key={id} className={`${Staking.card} liveauction_cards metablog_cards h-100`}>
      <Stack gap={2}>
        <div className={Staking.imageContainer}>
          <Image src={src} alt="square" className={Staking.img} />
        </div>
        <button className={Staking.btn1} onClick={() => stakeHandler(id)} disabled={isStaking}>
          {isStaking ? "Staking..." : "Stake NFT"}
        </button>
      </Stack>
    </div>
  );
};

function _Staking() {
  const wallet = useSelector((state) => state.WalletConnect);
  const [mintIds, setMintIds] = useState(() =>
    JSON.parse(localStorage.getItem("MINTID")) || []
  );
  const [levels, setLevels] = useState(() =>
    JSON.parse(localStorage.getItem("level")) || []
  );
  const [stakedIds, setStakedIDs] = useState(() =>
    JSON.parse(localStorage.getItem("stakedID")) || []
  );
  const [stakingId, setStakingId] = useState(null);

  const { address, mint, token1, staking } = wallet;

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
      return { id, level };
    });

    const items = await Promise.all(levelPromises);
    localStorage.setItem("MINTID", JSON.stringify(items));
    setMintIds(items);
  };


  const showDatas = async () => {
    const stakedIDs = await staking.methods.getAllStakedUsers(address).call();
    setStakedIDs(stakedIDs);
    localStorage.setItem("stakedID", JSON.stringify(stakedIDs));
  };

  const handleStake = async (id) => {
    setStakingId(id);
    try {
      await token1.methods.approve(process.env.REACT_APP_STAKING, "1000000000000000000000000000000").send({ from: address });
      await mint.methods.approve(process.env.REACT_APP_STAKING, id).send({ from: address });
      await staking.methods.stakeTreasure(id, 5).send({ from: address });
    } catch (error) {
      toast.error("Error in stake operation.");
    } finally {
      setStakingId(null);
    }
  };

  return (
    <>
      <div className={Staking.container}>
        {wallet.connected ? (
          mintIds
            .filter(item => !stakedIds.includes(item.id))
            .map((item, index) => (
              <NftCard key={index} id={item.id} level={item.level} stakeHandler={handleStake} isStaking={stakingId === item.id} />
            ))
        ) : (
          <div />
        )}
      </div>
      <ToastContainer />
    </>
  );
}


export default _Staking;
