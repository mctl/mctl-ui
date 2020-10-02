import React from 'react'
import classNames from 'classnames'

type ButtonSize =  'large' | 'small' | 'mini'

type ButtonType =  'primary' | 'default' | 'danger' | 'warn' | 'link'

export interface BaseButtonProps{
    /**
     * class名称
     */
    className?: string;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 按钮大小
     */
    size?: ButtonSize;
    /**
     * 按钮类型
     */
    btnType?: ButtonType;
    /**
     * 子节点
     */
    children: React.ReactNode;
    /**
     * 链接地址
     */
    href?: string;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 - 封装了HTML默认的<code>button</code>标签和<code>a</code>标签
 - 下方的<code>可调节按钮</code>支持在本页面实时修改，其他按钮仅作展示
 - 类型为<code>link</code>时需指定<code>href</code>属性
 */
const Button: React.FC<ButtonProps> = (props) => {
    const { size, btnType,className, disabled, children, href, ...restProps} = props;

    //btn,btn-large,btn-primary...
    const classes = classNames('btn',className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })

    if(btnType === 'link' && href){
        return (
            <a className={classes} href={href} { ...restProps }>{children}</a>
        )
    } else {
        return (
            <button className={classes} disabled={disabled} { ...restProps }>{children}</button>
        )
    }
}

Button.defaultProps = {
    btnType: 'default'
}

export default Button;