import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Image, Stack } from "react-bootstrap";
import { Timer } from "easytimer.js";
import { ToastContainer, toast } from "react-toastify";
import img1 from '../../assets/images/level1.jpg';
import img2 from '../../assets/images/level2.jpg';
import img3 from '../../assets/images/level3.jpg';
import rewards from "./rewards.module.css";

const placeholder = require("../../assets/images/download5.jpg").default

function RewardPage() {
  const [stakedIds, setStakedIds] = useState([]);
  const [levels, setLevels] = useState([]);
  const [unlockTimes, setUnlockTimes] = useState([]);
  const [isLocked, setIsLocked] = useState([]);
  const [reward, setReward] = useState([]);

  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, mint, staking } = wallet;

  const timerRefs = useRef([]);

  useEffect(() => {
    if (wallet.connected) {
      updateStakedIdsAndLevels();
    }

    return () => {
      timerRefs.current.forEach(timer => timer.stop());
      timerRefs.current = [];
    }
  }, [wallet.connected]);

  const updateStakedIdsAndLevels = async () => {
    const ids = await staking.methods.getAllStakedTokens(address).call();
    console.log("Ids",ids);
    const levelPromises = ids.map(async (id) => {
      const level = await mint.methods.getLevel(id).call();
      const unlockTime = await staking.methods.unLockTime(id).call();
      const reward = await staking.methods.availableRewards(address,id).call();
      const rewardString = web3.utils.fromWei(reward, "ether");
      const currentTime = Math.floor(Date.now() / 1000);
      const validUnlockTime = unlockTime > currentTime ? unlockTime : currentTime;
      const isLocked = unlockTime > currentTime;
      return { level, validUnlockTime, isLocked, reward: rewardString };
    });

    const data = await Promise.all(levelPromises);

    setStakedIds(ids);
    setLevels(data.map(d => d.level));
    setIsLocked(data.map(d => d.isLocked));
    setUnlockTimes(data.map(d => d.validUnlockTime));
    setReward(data.map(d => d.reward));
  };


  const claimRewards = async (id) => {
    try {
      await staking.methods.claimRewards(id).send({ from: address });
      toast.success("Reward claimed successfully.");
      updateStakedIdsAndLevels();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const unstake = async (id) => {
    try {
      await staking.methods.unstakeNFTs(id).send({ from: address });
      toast.success("Reward claimed successfully.");
      toast.success("NFT Unstaked successfully.");
      updateStakedIdsAndLevels();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const Card = ({ id, level, unlockTime, index }) => {

    const [timeRemaining, setTimeRemaining] = useState("");

    useEffect(() => {
      const timer = new Timer();
      timer.start({ countdown: true, startValues: { seconds: unlockTime - Math.floor(Date.now() / 1000) } });
      timer.addEventListener("secondsUpdated", () => {
        setTimeRemaining(timer.getTimeValues().toString());
      });
      timer.addEventListener("targetAchieved", () => {
        setTimeRemaining("Unlocked");
      });

      timerRefs.current[index] = timer;

      return () => {
        timer.stop();
      };
    }, [unlockTime, index]);

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
          <button
            className={!isLocked[index] ? rewards.btn1 : rewards.disabled}
            onClick={() => unstake(id)}
            disabled={isLocked[index]}>
            {isLocked[index] ? `Unlock In ${timeRemaining}` : "Unstake"}
          </button>


          <button className={rewards.btn2} onClick={() => claimRewards(id)}>{`Claim Rewards - ${Number(reward[index]).toFixed(3)} Treasure`}</button>
        </Stack >
      </div >
    );
  };

  return (
    <>
      {wallet.connected ? (
        <div className={rewards.container}>
          {stakedIds.map((id, index) => <Card key={id} id={id} level={levels[index]} unlockTime={unlockTimes[index]} index={index} />)}
        </div>)
        : (
          <div />
        )}
      <ToastContainer />
    </>
  );
}

export default RewardPage;
