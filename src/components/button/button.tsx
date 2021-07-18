import React from 'react'
import classNames from 'classnames'

export type ButtonSize = 'sm' | 'lg'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
    size?: ButtonSize
    type?: ButtonType
    className?: string
    disabled?: boolean
    href?: string
}

const Button: React.FC<BaseButtonProps> = (props) => {
    const { size, type, href, disabled, children, ...restProps } = props

    const classes = classNames('btn', {
        [`btn-${size}`]: size,
        [`btn-${type}`]: type,
        'disabled': type === 'link' && disabled
    })

    if (type === 'link' && href) {
        return <a className={classes} href={href} {...restProps}>{children}</a>
    } else {
        return <button disabled={disabled} className={classes} {...restProps}>{children}</button>
    }
}

Button.defaultProps = {
    type: 'default',
    disabled: false
}

export default Button
