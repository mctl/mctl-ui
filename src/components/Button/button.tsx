import React from 'react'
import classNames from 'classnames'

type ButtonSize =  'large' | 'small' | 'mini'

type ButtonType =  'primary' | 'default' | 'danger' | 'warn' | 'link'

interface BaseButtonProps{
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

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
    btnType: 'default',
    disabled: false
}

export default Button;