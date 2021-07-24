import type { MentionProps } from 'antd/lib/mentions';
import type { HttpType } from '../../typing';

export type UploadEnum = {
  url: string,
  type: HttpType,
  otherParams?: object,
  noAutoInsert?: boolean,
  headers?: any,
  multiple?: boolean,
}

export type PreviewEnum = {
  url: string,
  type: HttpType,
  otherParams?: object,
}
export interface MentionsConfig {
  prefix?: string | string[];
  split?: string;
}

export type tagType = | 'bold' | 'italic' | 'quote' | 'code' | 'link' | 'bulletList' | 'numberList' | 'task' | 'table' | 'file' | 'strike' | 'codemode' | 'fullscreen';
export interface ProMentionsProps extends MentionProps {
  /**
   * 提及列表
   */
  mentionOptions?: Array<string>;
  /**
   * 上传接口参数
   */
  uploadProps: UploadEnum;
  /**
   * 文件上传回调方法
   */
  afterUploadCkb?: (v: any) => void;
  /**
   * 输入框变更
   */
  onChange?: (v: string) => void;
  /**
   * 预览回调方法
   */
  afterPreviewCkb?: (v: any) => void;
  ref?: any;
}

export interface ProMentionsRef {
  textarea?: HTMLTextAreaElement;
  startMeasure(measureText: string, measurePrefix: string, measureLocation: number): void;
  stopMeasure(callback?: () => void): void;
  focus(): void;
  blur(): void;

  setMarkdown: (mdValue: string) => void;
  getMarkdown: () => string;
  getMentions: (config?: MentionsConfig) => Array<Object>;
  isFullscreen: () => boolean;
  etMarkdown: () => string;
}
