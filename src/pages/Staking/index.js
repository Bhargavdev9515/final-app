import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useDispatch, useSelector } from "react-redux";
import _Staking from "./staking";
import __Staking from "./rewards";
import styles from "./styles.module.css";

function Staking() {
  const wallet = useSelector((state) => state.WalletConnect);
  const { web3, address, mint, mintoApp, token1 } = wallet;

  return (
    <div className={styles.accordionContainer}>
      <Accordion defaultExpanded className={styles.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={styles.accordionSummary}
        >
          <Typography className={styles.accordionTitle}>Available NFTs</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.accordionDetails}>
          <_Staking />
        </AccordionDetails>
      </Accordion>
      <Accordion className={styles.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={styles.accordionSummary}
        >
          <Typography className={styles.accordionTitle}>Staked NFTs</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.accordionDetails}>
          <__Staking />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Staking;
