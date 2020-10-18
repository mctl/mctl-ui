import React, { ChangeEvent, forwardRef, InputHTMLAttributes, ReactElement } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../icon/Icon'

type InputSize = 'lg' | 'sm'
//omit：忽略某个属性，解决冲突
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * input框大小
     */
    size?: InputSize;
    /**
     * 右侧图标
     */
    icon?: IconProp;
    /**
     * 前缀
     */
    prepend?: string | ReactElement;
    /**
     * 后缀
     */
    append?: string | ReactElement;
    onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 input输入框，支持HTMLInput所有属性
 */
const Input = forwardRef<HTMLInputElement,InputProps>((props,ref) => {
    const {
        disabled,
        size,
        icon,
        prepend,
        append,
        style,
        ...restProps
      } = props

      const cnames = classNames('mctl-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
      })

      //规避undefined到有意义值的报错
      const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
          return ''
        }
        return value
      }

      if('value' in props) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
      }

    return (
    <div className={cnames} style={style}>
      {prepend && <div className="mctl-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input
        ref={ref}
        className="mctl-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="mctl-input-group-append">{append}</div>}
    </div>
    )
})

export default Input