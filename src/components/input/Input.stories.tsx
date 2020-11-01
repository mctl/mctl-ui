import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Input, { InputProps } from './Input'

export default {
    title: 'mctl-ui/Input',
    component: Input,
} as Meta;
  
const Template: Story<InputProps> = (args) => <div style={{width: '40%'}}>
    <Input {...args} />
    <hr/>
    <Input prepend='https://' append='.com'></Input>
    <Input disabled></Input>
    <Input icon='coffee'></Input>
    <Input size='lg'></Input>
    <Input size='sm'></Input>
</div>;

export const Input_输入框 = Template.bind({});

Input_输入框.args = {
    size: 'sm',
    icon: 'user',
    placeholder: '可在controls中调整属性'
};