import React from 'react';
import Button from './components/button/Button'
import Menu from './components/menu/Menu'
import MenuItem from './components/menu/MenuItem'
import SubMenu from './components/menu/SubMenu'
import Icon from './components/icon/Icon'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button className='123' btnType='danger'>按钮轮廓</Button>
        <Button btnType='default'>按钮</Button>
        <Button btnType='primary'>按钮</Button>
        <Button btnType='warn'>按钮</Button>
        <Button btnType='link'>按钮</Button>
        <br/>

        <Button size='large' btnType='danger'>按钮</Button>
        <Button btnType='default'>按钮</Button>
        <Button size='small' btnType='primary'>按钮</Button>
        <Button size='mini' btnType='warn'>按钮</Button>
        <br/>
        <Button btnType='danger' disabled>按钮</Button>
        <Button btnType='link' href="https://baidu.com">按钮</Button>
        <Button btnType='link' href="https://baidu.com" disabled>按钮</Button>

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

        <br/>

        <Icon icon='coffee'></Icon>
        <Icon icon='coffee' size='2x' theme='danger'></Icon>

      </header>
    </div>
  );
}

export default App;
