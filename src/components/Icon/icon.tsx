import React from 'react'
import classNames from 'classnames'
import { library, IconProp } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

library.add(fab, fas)

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'danger' | 'warn' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps{
    /**
     * 图标风格
     */
    theme?: ThemeProps;
    /**
     * 图标
     */
    icon: IconProp;
}

/**
 封装了fortawesome插件，可在这里查看所有支持的图标:https://fontawesome.com/icons?d=gallery&m=free
 <br>以下为部分举例：
 */
const Icon: React.FC<IconProps> = (props) => {
    const { className, theme, ...restProps } = props
    //icon-primary
    const classes = classNames('mctl-icon', className, {
        [`icon-${theme}`]: theme
    })

    return (
        <FontAwesomeIcon className={classes} { ...restProps}></FontAwesomeIcon>
    )
}

export default Icon