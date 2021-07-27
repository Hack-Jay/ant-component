import React from 'react';
import { render, fireEvent, RenderResult, cleanup, waitFor } from '@testing-library/react'
import Menu, { MenuProps } from './menu';
import MenuItem from './menu-item';
import SubMenu from './sub-menu';

const testProps: MenuProps = {
    onSelect: jest.fn(),
    className: 'test'
}

const testVerProps: MenuProps = {
    mode: 'vertical'
}

const renderMenu = (props: MenuProps) => {
    return <Menu {...props}>
        <MenuItem>
            active
        </MenuItem>
        <MenuItem disabled >
            disabled
        </MenuItem>
        <MenuItem >
            xyz
        </MenuItem>
        <SubMenu title="dropdown">
            <MenuItem>
                drop1
            </MenuItem>
        </SubMenu>
        <SubMenu title="opened">
            <MenuItem>
                opened1
            </MenuItem>
        </SubMenu>
    </Menu>
}

const createStyleFile = () => {
    const cssFile: string = `
      .ant-submenu {
        display: none;
      }
      .ant-submenu.menu-opened {
        display:block;
      }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement

describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        wrapper = render(renderMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })

    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('ant-menu test')
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })

    it('click item should change active and call the right callback', () => {
        const thirdElement = wrapper.getByText('xyz')
        fireEvent.click(thirdElement)
        expect(thirdElement).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })

    it('should render the vertical mode when mode is set to vertical', () => {
        cleanup()
        const wrapper = render(renderMenu(testVerProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })

    it('should show dropdown items when hover on subMenu', async () => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
        const dropElement = wrapper.getByText('dropdown')
        fireEvent.mouseEnter(dropElement)
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropElement)
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible()
        })
    })
})