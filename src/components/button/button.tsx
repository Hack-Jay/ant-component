import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

export const tuple = <T extends string[]>(...args: T) => args;
export type ButtonSize = 'sm' | 'lg'
// export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
const ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link', 'text');
export type ButtonType = typeof ButtonTypes[number];
interface BaseButtonProps {
    size?: ButtonSize
    btnType?: ButtonType
    className?: string
    disabled?: boolean
    href?: string
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
    const { size, btnType, href, disabled, children, ...restProps } = props

    const classes = classNames('btn', {
        [`btn-${size}`]: size,
        [`btn-${btnType}`]: btnType,
        'disabled': btnType === 'link' && disabled
    })

    if (btnType === 'link' && href) {
        return <a className={classes} href={href} {...restProps}>{children}</a>
    } else {
        return <button disabled={disabled} className={classes} {...restProps}>{children}</button>
    }
}

Button.defaultProps = {
    btnType: 'default',
    disabled: false
}

export default Button
