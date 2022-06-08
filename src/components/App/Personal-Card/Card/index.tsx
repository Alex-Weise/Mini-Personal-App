import React, { FC } from "react";
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

    return (
        <div className={styles.card} onClick={() => setItemID(id)}>
          <div className={styles.image}>
            <img src={img[activeStep]} alt={title} className={styles.img} />
            <MobileStepper
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
          <span className={styles.text}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.p}>
          {discr}</p>
          </span>
        </div>
    );
}

export default Card;

// style={{
//   backgroundImage: `url(${img})`,
//   backgroundSize: `contain`,
//   backgroundPosition: `center`,
//   backgroundRepeat: `no-repeat`,
// onClick={() => setItemID(id)}
//  }}