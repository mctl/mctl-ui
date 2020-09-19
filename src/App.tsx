import React from 'react';
import Button, {ButtonSize,ButtonType } from './components/Button/button'

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

      </header>
    </div>
  );
}

export default App;
