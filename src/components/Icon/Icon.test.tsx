import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Icon, { IconProps } from './Icon'

const defaultProps: IconProps = {
    icon: 'coffee',
    className: 'default'
}

const iconProps: IconProps = {
    theme: 'danger',
    icon: 'coffee',
    size: '2x',
    className: 'test'
}

const testIcon = (props: IconProps) => {
    return (
        <Icon { ...iconProps }></Icon>
    )
}

let wrapper: RenderResult;

describe('test Icon compontent', () => {
    it('test default icon', () => {
        wrapper = render(testIcon(defaultProps))
        const iconElement = wrapper.getByRole('img',{
            hidden: true
        })
        expect(iconElement).toHaveClass('mctl-icon')
    })
    it('test themeIcon compontent', () => {
        wrapper = render(testIcon(iconProps))
        const iconElement = wrapper.getByRole('img',{
            hidden: true
        })
        expect(iconElement).toHaveClass('mctl-icon icon-danger fa-2x')
    })
})