import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

export type ButtonSize = 'sm' | 'lg'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
export interface BaseButtonProps {
    /**
     * How large should the button be?
     */
    size?: ButtonSize
    /**
     * Is this the button type
     */
    btnType?: ButtonType
    /**
     * the classname of button
     */
    className?: string
    /**
     * the button is disabled
     */
    disabled?: boolean
    /**
     * the button link when type is link
     */
    href?: string
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from 'vikingship'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
    const { className, size, btnType, href, disabled, children, ...restProps } = props

    const classes = classNames('btn', className, {
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
