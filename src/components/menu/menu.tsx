import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menu-item'
import { SubMenuItemProps } from './sub-menu'

type MenuMode = 'horizontal' | 'vertical'
type SelectedCallback = (index: string) => void

export interface MenuProps {
    defaultIndex?: string
    mode?: MenuMode
    onSelect?: SelectedCallback
    className?: string
    style?: React.CSSProperties
    defaultOpenSubMenu?: string[]
}

export interface IMenuContext {
    index: string
    onSelect?: SelectedCallback
    mode?: MenuMode
    defaultOpenSubMenu?: string[]
}

export interface IMenuItem {
    Item: MenuItemProps
    SubItem: SubMenuItemProps
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<MenuProps> = (props) => {
    const { defaultIndex, mode, onSelect, className, style, defaultOpenSubMenu, children } = props
    const [currentIndex, setCurrentIndex] = useState(defaultIndex)

    const handleClick = (index: string) => {
        setCurrentIndex(index)
        onSelect && onSelect(index)
    }

    const classes = classNames('ant-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode === 'horizontal',
    })

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, { index: index.toString() })
            } else {
                console.error('Warning: Menu has a child which is not a MenuItem component')
            }
        })
    }

    const context = {
        index: currentIndex ? currentIndex : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenu
    }
    return <ul className={classes} style={style} data-testid='test-menu'>
        <MenuContext.Provider value={context}>
            {renderChildren()}
        </MenuContext.Provider>
    </ul>
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal'
}

export default Menu
