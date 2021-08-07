import React from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

interface IconProps extends FontAwesomeIconProps {
    theme?: string;
}

const Icon: React.FC<IconProps> = (props) => {
    const { theme, className, ...restProps } = props
    const classes = classNames('ant-icon', className, {
        [`icon-${theme}`]: theme
    })
    return <FontAwesomeIcon className={classes} {...restProps} />
}

export default Icon
