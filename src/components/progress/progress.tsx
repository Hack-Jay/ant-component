import React from "react";
import { ThemeProps } from "../icon/icon";

interface ProgressProps {
  precents: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeProps;
}

const Progress: React.FC<ProgressProps> = (props) => {
  const { precents, strokeHeight, showText, styles, theme } = props;
  return (
    <div className="ant-progress-bar" style={styles}>
      <div
        className="ant-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`ant-progress-bar-inner color-${theme}`}
          style={{ width: `${precents}%` }}
        >
          {showText && <span className="inner-text">{`${precents}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: 'primary'
}

export default Progress;
