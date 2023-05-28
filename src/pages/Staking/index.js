import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StakingPage from "./staking";
import RewardPage from "./rewards";
import styles from "./styles.module.css";

function Staking() {

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
          <StakingPage />
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
          <RewardPage />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Staking;
