import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Image, Stack } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import BigNumber from 'bignumber.js';
import TextField from '@mui/material/TextField';
import "react-toastify/dist/ReactToastify.css";
import img1 from '../../assets/images/level1.jpg';
import img2 from '../../assets/images/level2.jpg';
import img3 from '../../assets/images/level3.jpg';
import Staking from "./staking.module.css";
const placeholder = require("../../assets/images/placeholder.png").default;


const NftCard = ({ id, level, stakeHandler, isStaking }) => {
  const [stakeDays, setStakeDays] = useState("");
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    const value = Number(event.target.value);
    if (value >= 1 && value <= 365) {
      setStakeDays(value);
      setError(false);
    } else if (value > 365) {
      setError(true);
    } else if (value === 0 || event.target.value === "") {
      // Reset the stakeDays when the user clears the input
      setStakeDays("");
      setError(false);
    }
  };

  const handleStakeClick = () => {
    stakeHandler(id, stakeDays);
  };

  const imageMap = {
    1: { src: img1, displayLevel: "Level 1" },
    2: { src: img2, displayLevel: "Level 2" },
    3: { src: img3, displayLevel: "Level 3" },
  };

  const imageDetails = imageMap[level] || { src: placeholder, displayLevel: "N/A" };
  const { src } = imageDetails;

  const stakeDisabled = isStaking || stakeDays === "";

  return (
    <div key={id} className={`${Staking.card} liveauction_cards metablog_cards h-100`}>
      <Stack gap={2}>
        <div className={Staking.imageContainer}>
          <Image src={src} alt="square" className={Staking.img} />
        </div>
        <TextField
          error={error}
          helperText={error ? "Number must be between 1 and 365." : ""}
          type="number"
          value={stakeDays}
          onChange={handleInputChange}
          color="warning"
          label="Staking Days"
          variant="outlined"
          className={Staking.input}
          sx={{
            color: '#ffffff',
            '& .MuiFormLabel-root': {
              color: '#ffffff', // this changes the label color
            },
            '& .MuiFormLabel-root.Mui-focused': {
              color: '#ffffff', // keeps the label color white when focused
            },
            '& label.Mui-focused': {
              color: '#ffffff',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ffffff',
              },
              '&:hover fieldset': {
                borderColor: '#ffffff',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgba(228, 159, 7, 1)', // Warning color
              },
            },
            '& .MuiInputBase-input': {
              color: '#ffffff',
            },
          }}
        />
        <button className={!stakeDisabled ? Staking.btn1 : Staking.disabled} onClick={handleStakeClick} disabled={stakeDisabled}>
          {isStaking ? "Staking..." : "Stake NFT"}
        </button>
      </Stack>
    </div>
  );
};

function StakingPage() {
  const wallet = useSelector((state) => state.WalletConnect);
  const [mintIds, setMintIds] = useState([]);
  const [stakingId, setStakingId] = useState(null);

  const { address, mint, token1, staking } = wallet;

  useEffect(() => {
    if (wallet.connected) {
      fetchAllData();
    }
  }, [wallet.connected]);

  const fetchAllData = async () => {
    const ids = await mint.methods.getAllCollections(address).call();
    console.log("ids",ids)
    const stakedIDs = await staking.methods.getAllStakedTokens(address).call();

    const unStakedIds = ids.filter(id => !stakedIDs.includes(id));

    const levelPromises = unStakedIds.map(async (id) => {
      const level = await mint.methods.getLevel(id).call();
      return { id, level };
    });

    const items = await Promise.all(levelPromises);
    setMintIds(items);
  };

  const handleStake = async (id, days) => {
    setStakingId(id);
    try {
      const minPrice = new BigNumber("10000000000000000000");
      const allowance = new BigNumber(await token1.methods.allowance(address, process.env.REACT_APP_MINTING).call());
      await token1.methods.approve(process.env.REACT_APP_STAKING, "1000000000000000000000000000000").send({ from: address });
      await mint.methods.approve(process.env.REACT_APP_STAKING, id).send({ from: address });
      await staking.methods.stakeTreasure(id, days).send({ from: address });
      toast.success("NFT Staked successfully.");
      fetchAllData(); // Refresh data after staking
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
          mintIds.map((item, index) => (
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

export default StakingPage;
