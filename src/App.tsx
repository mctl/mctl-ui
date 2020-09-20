import React from 'react';
import Button, {ButtonSize,ButtonType } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button className='123' btnType={ButtonType.Danger}>按钮轮廓</Button>
        <Button btnType={ButtonType.Default}>按钮</Button>
        <Button btnType={ButtonType.Primary}>按钮</Button>
        <Button btnType={ButtonType.Warn}>按钮</Button>
        <Button btnType={ButtonType.Link}>按钮</Button>
        <br/>

        <Button size={ButtonSize.Large} btnType={ButtonType.Danger}>按钮</Button>
        <Button btnType={ButtonType.Default}>按钮</Button>
        <Button size={ButtonSize.Small} btnType={ButtonType.Primary}>按钮</Button>
        <Button size={ButtonSize.Mini} btnType={ButtonType.Warn}>按钮</Button>
        <br/>
        <Button btnType={ButtonType.Danger} disabled>按钮</Button>
        <Button btnType={ButtonType.Link} href="https://baidu.com">按钮</Button>
        <Button btnType={ButtonType.Link} href="https://baidu.com" disabled>按钮</Button>

        <Menu>
          <MenuItem>123</MenuItem>
          <MenuItem disabled>qwe</MenuItem>
          <SubMenu title='下拉列表'>
            <MenuItem>二级-1</MenuItem>
            <MenuItem disabled>二级-2</MenuItem>
            <MenuItem>二级-3</MenuItem>
          </SubMenu>
          <MenuItem>zxc</MenuItem>
        </Menu>
        <Menu mode='vertical' activeIndex={['2']}>
          <MenuItem>123</MenuItem>
          <MenuItem disabled>qwe</MenuItem>
          <SubMenu title='下拉列表'>
            <MenuItem>二级-1</MenuItem>
            <MenuItem disabled>二级-2</MenuItem>
            <MenuItem>二级-3</MenuItem>
          </SubMenu>
          <MenuItem>zxc</MenuItem>
        </Menu>

      </header>
    </div>
  );
}

export default App;
