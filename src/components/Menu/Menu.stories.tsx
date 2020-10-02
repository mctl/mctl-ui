import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Menu from './index'
import { MenuProps } from './Menu'

export default {
    title: 'mctl-ui/菜单',
    component: Menu,
    argTypes: { onClick: { action: 'clicked' } },
} as Meta;

const Template: Story<MenuProps> = (args) => <>
        <Menu { ...args}>
        <Menu.SubMenu title='菜单一'>
            <Menu.Item>菜单1-1</Menu.Item>
            <Menu.Item>菜单1-2</Menu.Item>
            <Menu.Item>菜单1-3</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item disabled>菜单二</Menu.Item>
        <Menu.SubMenu title='菜单三'>
            <Menu.Item>菜单3-1</Menu.Item>
            <Menu.Item>菜单3-2</Menu.Item>
            <Menu.Item>菜单3-3</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item>菜单四</Menu.Item>
        </Menu>
</>

export const horizontalMenu_横向菜单 = Template.bind({})
export const verticalMenu_纵向菜单 = Template.bind({})

verticalMenu_纵向菜单.args = {
    mode: 'vertical',
    defaultIndex: '0-1',
    activeIndex: ['0']
}