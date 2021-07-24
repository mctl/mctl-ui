import { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';
import ProMentions from './proMentions';
import { Mentions } from 'antd';
import type { OptionProps } from 'rc-mentions/lib/Option';
import type { ProMentionsProps, ProMentionsRef } from './typing'

const { Option, getMentions } = Mentions;

interface MentionsConfig {
  prefix?: string | string[];
  split?: string;
}

interface MentionsEntity {
  prefix: string;
  value: string;
}

export type MarkdownComponent = ForwardRefExoticComponent<PropsWithoutRef<ProMentionsProps> & RefAttributes<ProMentionsRef>> & {
  Option: React.FC<OptionProps>;
  getMentions: (val: string, config?: MentionsConfig) => MentionsEntity[];
};

const MarkDown = ProMentions as MarkdownComponent;

MarkDown.Option = Option;
MarkDown.getMentions = getMentions;

export default MarkDown;
