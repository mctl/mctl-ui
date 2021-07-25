import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import MarkDown from './index'
import { ProMentionsProps } from './typing'

export default {
    title: 'mctl-ui/MarkDown',
    component: MarkDown,
} as Meta;

const Template: Story<ProMentionsProps> = (args) => <>
    <MarkDown {...args} />
    
</>;

export const MarkDown_文档 = Template.bind({});

MarkDown_文档.args = {
  mentionOptions: ['张三', '李四'],
  uploadProps: {
    url: '/api/uploads',
    type: 'post',
    otherParams: {
      projectId: 'projectId',
    },
  },
  placeholder: '输入@可以使用提及功能，提及项支持自定义组件'
};

