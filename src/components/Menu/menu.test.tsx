import React from 'react'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import Menu,{ MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const defaultProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}

const verticalProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical',
    onSelect: jest.fn(),
    className: 'test'
}

const testMenu = (props: MenuProps) => {
    return (
        <Menu { ...props}>
          <MenuItem>active</MenuItem>
          <MenuItem disabled>disabled</MenuItem>
          <MenuItem>test</MenuItem>
          <SubMenu title='submenu'>
            <MenuItem>二级-1</MenuItem>
            <MenuItem disabled>二级-2</MenuItem>
            <MenuItem>二级-3</MenuItem>
          </SubMenu>
        </Menu>
    )
}

const createStyle = () => {
    const css: string = `
        .mctl-submenu {
            display: none;
        }
        .mctl-submenu.menu-opened {
            display: block;
        }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = css

    return style
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe('test menu and menuItem', () => {

    beforeEach(() => {
        wrapper = render(testMenu(defaultProps))
        wrapper.container.append(createStyle())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })

    it('test default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('mctl-menu test')
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')

    })

    it('test click change active and click callback', () => {
        const thirdItem = wrapper.getByText('test')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(defaultProps.onSelect).toHaveBeenCalledWith('2') //调用的index为2
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(defaultProps.onSelect).not.toHaveBeenCalledWith('1') //调用的index不为1
    })

    it('test vertical mode has class', () => {
        cleanup()
        const wrapper = render(testMenu(verticalProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')

    })

    it('test submenu dropdown in horizontal mode', async () => {
        expect(wrapper.queryByText('二级-1')).not.toBeVisible() //出现在视野中
        const submenuElement = wrapper.getByText('submenu')
        fireEvent.mouseEnter(submenuElement)
        //异步操作
        await waitFor(()=> {
            expect(wrapper.queryByText('二级-1')).toBeVisible()
        })
        const childElement = wrapper.queryByText('二级-1') as HTMLElement
        fireEvent.click(childElement)
        expect(defaultProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(submenuElement)
        await waitFor(()=> {
            expect(wrapper.queryByText('二级-1')).not.toBeVisible()
        })
    })

    it('test submenu dropdown in vertical mode', () => {
        cleanup()
        const wrapper = render(testMenu(verticalProps))
        expect(wrapper.queryByText('二级-1')).toBeVisible()
    })
})