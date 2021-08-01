import React, {
  FC,
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
} from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../icon";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /** set disabled of Input */
  disabled?: boolean;
  /** set size of Input */
  size?: "lg" | "sm";
  /** set icon of Input */
  icon?: IconProp;
  /** set prepend of Input */
  prepend?: string | ReactElement;
  /** set append of Input */
  append?: string | ReactElement;
  /** when input value change function */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'vikingship'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: FC<InputProps> = (props) => {
  const { style, disabled, size, icon, prepend, append, ...restProps } = props;
  const classes = classNames("ant-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
  });

  // fix when control value undefined to string
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }

  return (
    <div className={classes} style={style}>
      {prepend && <div className="ant-input-group-prepend">{prepend}</div>}

      {icon && <Icon icon={icon} />}
      <input className="ant-input-inner" disabled={disabled} {...restProps} />
      {append && <div className="ant-input-group-append">{append}</div>}
    </div>
  );
};

export default Input;
