import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectIndex: string) => void;

export interface MenuProps {
    className?: string,
    mode?: MenuMode,
    defaultIndex?: string,
    activeIndex?: string[],
    style?: React.CSSProperties,
    onSelect?: SelectCallback
}

interface IMenuContext {
    index: string,
    onSelect?: SelectCallback,
    mode?: MenuMode,
    activeIndex?: string[],
}

export const MenuContext = createContext<IMenuContext>({ index: '0' } )

const Menu: React.FC<MenuProps> = (props) => {

    const { className, mode, defaultIndex, activeIndex, style, children, onSelect } = props;

    const [ currentActive, setCurrentActive] = useState(defaultIndex)

    const classes = classNames('mctl-menu',className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })

    const handleClick = (index:string) => {
        setCurrentActive(index)

        if(onSelect) onSelect(index)
    }

    const passContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        activeIndex
    }

    const renderChildren = () => {
        return React.Children.map(children, (item, index) => {

            const child = item as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = child.type

            //限制子节点类型
            if(displayName === 'MenuItem' || 'SubMenu'){
                //添加默认index
                return React.cloneElement(child, { index: index.toString() })
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem compontent.")
            }
            
        })
    }

    return (
        <ul className={classes} style={style} data-testid='test-menu'>
            <MenuContext.Provider value={passContext}>
                { renderChildren() }
            </MenuContext.Provider>
        </ul>
    )

}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    activeIndex: []
}

export default Menu;