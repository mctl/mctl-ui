import React, { FunctionComponentElement, useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {

    const { index, title, className, children } = props
    const context = useContext(MenuContext)
    const activeIndex = context.activeIndex as Array<string>

    //默认展开项
    const isOpen = (index && context.mode === 'vertical') ? activeIndex.includes(index) : false

    const [ openStatus, setStatus ] = useState(isOpen)

    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': openStatus,
        'is-vertical': context.mode === 'vertical'
    })

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setStatus(!openStatus)
    }
    let timer: any
    const handeMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setStatus(toggle)
        },300)
    }

    //两种模式分别设定click和hover事件
    const clickEvent = context.mode === 'vertical' ? { onClick:(e: React.MouseEvent) => handleClick(e) } : {}
    const hoverEvent = context.mode === 'vertical' ? {} : { 
        onMouseEnter : (e: React.MouseEvent) =>  handeMouse(e ,true) ,
        onMouseLeave : (e: React.MouseEvent) =>  handeMouse(e ,false) ,
    }

    const renderChildren = () => {
        const classes = classNames('mctl-submenu', {
            'menu-opened': openStatus
        })
        const childrenConponent = React.Children.map(children, (item, i) => {
            const child = item as FunctionComponentElement<MenuItemProps>
            if(child.type.displayName === 'MenuItem'){
                return React.cloneElement(child, { index: `${index}-${i}` })
            }else {
                console.error("Warning: SubMenu has a child which is not a MenuItem compontent.")
            }
        })

        return (
            <Transition 
                in={ openStatus } 
                timeout={300}
                animition='zoom-in-top'
            >
                <ul className={classes}>
                    { childrenConponent }
                </ul>
            </Transition>
        )
    }
    return (
        <li key={ index } className={ classes } { ...hoverEvent}>
            <div className="submenu-item" {...clickEvent}> 
                { title }
                <Icon icon='angle-down' className='arrow-icon'></Icon>
            </div>
            { renderChildren() }
        </li>
    )

}

SubMenu.displayName = 'SubMenu';

export default SubMenu