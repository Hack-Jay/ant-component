import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { IMenuContext, MenuContext } from './menu';
import { MenuItemProps } from './menu-item';
import Icon from '../icon';
import Transition from '../transition/transition';

export interface SubMenuItemProps {
    title: string;
    index?: string;
    className?: string;
}


const SubMenu: React.FC<SubMenuItemProps> = (props) => {
    const { index, title, className, children } = props
    const context = useContext<IMenuContext>(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenu as Array<string> || []
    const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [isOpen, setIsOppen] = useState(isOpend)

    const classes = classNames('menu-item submenu-item', className, {
        'is-active': index === context.index,
        'is-opened': isOpen,
        'is-vertical': context.mode === 'vertical'
    })

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsOppen(!isOpen)
    }

    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setIsOppen(toggle)
        }, 300)
    }

    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}

    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    } : {}

    const renderChildren = () => {
        const subMenuClass = classNames('ant-submenu', {
            'menu-opened': isOpen
        })

        const childElement = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, { index: `${index}-${i}` })
            } else {
                console.error('Warning: Menu has a child which is not a MenuItem component')
            }
        })
        return <Transition in={isOpen} timeout={200} animation='zoom-in-top'>
            <ul className={subMenuClass}>
                {childElement}
            </ul>
        </Transition>
    }

    return <li className={classes} {...hoverEvents}>
        <div className="submenu-title"  {...clickEvents}>
            {title}
            <Icon icon='angle-down' className='arrow-icon' />
        </div>
        {renderChildren()}
    </li>
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
