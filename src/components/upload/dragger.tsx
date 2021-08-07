import React, { DragEvent, FC, useState } from "react";
import classNames from "classnames";

export interface DraggerProps {
  onFile: (file: FileList) => void;
}

const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [isDragger, setIsDragger] = useState(false);

  const classes = classNames("ant-uploader-dragger", {
    "is-dragover": isDragger,
  });

  const handleDrag = (e: DragEvent<HTMLElement>, isDragger: boolean) => {
    e.preventDefault();
    setIsDragger(isDragger);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragger(false);
    onFile(e.dataTransfer.files);
  };

  return (
    <div
      className={classes}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;
