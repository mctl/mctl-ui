import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './Button'

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: 'danger',
    size: 'large',
    className: 'test'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

//分类
describe('test button compontent', () => {
    it('test default button', () => {
        const wrapper = render(<Button { ...defaultProps }>button</Button>)
        const element = wrapper.getByText('button') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element.disabled).toBeFalsy()
        expect(element).toHaveClass('btn btn-default')
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })

    it('test different props', () => {
        const wrapper = render(<Button { ...testProps }>button</Button>)
        const element = wrapper.getByText('button') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn test btn-danger btn-large')       
    })

    it('test link button and href is provided', () => {
        const wrapper = render(<Button btnType='link' href='www.baidu.com'>button</Button>)
        const element = wrapper.getByText('button')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')   
    })

    it('test desabled button', () => {
        const wrapper = render(<Button { ...disabledProps }>button</Button>)
        const element = wrapper.getByText('button') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element.disabled).toBeTruthy()
        expect(element).toHaveClass('btn btn-default')
        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})