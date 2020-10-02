import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Button, { ButtonProps } from './Button'

export default {
    title: 'mctl-ui/按钮',
    component: Button,
    argTypes: { onClick: { action: 'clicked' } },
} as Meta;
  
const Template: Story<ButtonProps> = (args) => <>
    <Button {...args} />
    <hr/>
    <Button>普通</Button>
    <Button btnType='primary'>主要</Button>
    <Button btnType='warn'>警告</Button>
    <Button btnType='danger'>危险</Button>
    <Button btnType='link' href='https://baidu.com'>链接</Button>
    <hr/>
    <Button size='large'>大型</Button>
    <Button >默认</Button>
    <Button size='small'>小型</Button>
    <Button size='mini'>迷你</Button>
</>;

export const Buttons_按钮 = Template.bind({});

Buttons_按钮.args = {
    btnType: 'primary',
    size: 'small',
    children: '可调节按钮',
};