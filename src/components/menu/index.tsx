import Menu, { MenuProps } from './menu';
import MenuItem, { MenuItemProps } from './menu-item';
import SubMenu, { SubMenuItemProps } from './sub-menu';

export type MenuComponent = React.FC<MenuProps> & {
    Item: React.FC<MenuItemProps>
    SubItem: React.FC<SubMenuItemProps>
}

const TransMenu = Menu as MenuComponent
TransMenu.Item =  MenuItem
TransMenu.SubItem =  SubMenu

export default TransMenu