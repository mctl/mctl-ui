import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right';

type TransitionProps =  CSSTransitionProps & {
    animition?: AnimationName,
    wrapper?: boolean
}

const Transition: React.FC<TransitionProps> = (props) => {
    const { children, classNames, animition,wrapper, ...restProps} = props

    return (
        <CSSTransition classNames={ classNames? classNames : animition} {...restProps}>
            { wrapper? <div>children</div>: children }
        </CSSTransition>
    )
}

Transition.defaultProps = {
    unmountOnExit: true,
    appear: true
}

export default Transition

