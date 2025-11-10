import React from "react";

interface InfolineProps {
  label: string;
  classes: string;
  txt: any;
}

const InfoLine: React.FC<InfolineProps> = ({ classes, txt, label }) => {
  return (
    <div className={classes}>
      <label className=" min-w-[100px]">{label}:</label>
      <p className="">{txt}</p>
    </div>
  );
};

export default InfoLine;
