import React from 'react';
import Button from './components/button/button';
import Menu, { MenuProps } from './components/menu/menu';
import MenuItem from './components/menu/menu-item';
import SubMenu from './components/menu/sub-menu';

const testProps: MenuProps = {
    // mode: 'vertical',
    defaultIndex: '0',
    onSelect: (index) => { console.log(index) },
    className: 'test',
    defaultOpenSubMenu: ['3']
}
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <h4>Menu</h4>
                    <Menu {...testProps}>
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
                </div>
                <div>
                    <h4>Button</h4>
                    <Button className='custome' onClick={e => { e.preventDefault(); alert(123) }}>Hello</Button>
                    <Button size="sm" btnType='primary'>Hello</Button>
                    <Button size="lg" btnType='primary' disabled>Hello</Button>
                    <Button btnType="link" href="http://baidu.com" target="_blank">baidu link</Button>
                    <Button btnType="link" href="http://baidu.com" disabled>baidu link disabled</Button>
                </div>
            </header>
        </div>
    );
}

export default App;
