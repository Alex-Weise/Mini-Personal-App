import React, { FC, SyntheticEvent } from "react";
import styles from "./styles.module.scss";
import { MobileStepper } from "@mui/material";
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

type TCard = {
  title: string,
  img: string[],
  discr: string,
  setItemID: Function,
  id:number,
}

const Card:FC<TCard> = ({title, img, discr, setItemID, id}) =>  {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = img.length;

  const handleNext = (event:SyntheticEvent) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // event.stopPropagation()
  };

  const handleBack = (event:SyntheticEvent) => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // event.stopPropagation()
  };

    return (
        <div className={styles.card}>
          <h3 className={styles.title} onClick={() => setItemID(id)}>{title}</h3>
          <div className={styles.image}>
            <img src={img[activeStep]} alt={title} className={styles.img} />
            <MobileStepper
              sx={{ 
                background: "transparent",
                margin: "0 auto",
                width: "90%",
              }}
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                  <KeyboardArrowRight />
                </Button>}
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                   <KeyboardArrowLeft />
                </Button>} 
              />
          </div>
        </div>
    );
}

export default Card;