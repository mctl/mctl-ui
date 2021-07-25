import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { Button } from 'antd';
import ToolBarButton from './toolBarButton';
import type { tagType } from './typing'

interface HeaderProps{
  previewMarkdown: boolean;
  isFullscreen: boolean;
  writeHandler: () => void;
  previewHandler: () => void;
  editHandler: (tag: tagType, prepend: string, append: string) => void;
}

const Header: React.FC<HeaderProps> = forwardRef((props, ref) => {
  const {
    writeHandler,
    previewHandler,
    editHandler,
    previewMarkdown,
    isFullscreen,
  } = props;

  const [fullVisible, setFullVisible] = useState(false)

  const fullRef: any = useRef(null)
  useImperativeHandle(ref, () => fullRef.current);

  const writeMarkdownTab = (e: React.MouseEvent): void => {
    writeHandler();
  };

  const previewMarkdownTab = (e: React.MouseEvent): void => {
    previewHandler();
  };

  const editClick = (tag: tagType, prepend: string, append: string): void => {
    if(tag === 'fullscreen'){
      setFullVisible(false)
    }

    if (previewMarkdown && tag !== 'fullscreen') {
      return;
    }
    editHandler(tag, prepend, append);
  };

  const onVisibleChange = (visible: boolean): void => {
    setFullVisible(visible)
  }

  const mdTable = () => {
    return [
      '\n| header | header |',
      '| ------ | ------ |',
      '| cell | cell |',
      '| cell | cell |',
    ].join('\n');
  };

  return (
    <div className="md-header">
      <ul className="nav-links clearfix">
        <li
          className={previewMarkdown ? 'md-header-tab' : 'md-header-tab active'}
        >
          <Button type="link" onClick={writeMarkdownTab}>编辑</Button>
        </li>
        <li
          className={previewMarkdown ? 'md-header-tab active' : 'md-header-tab'}
        >
          <Button type="link" onClick={previewMarkdownTab}>预览</Button>
        </li>
        <li
          className={
            previewMarkdown
              ? 'md-header-toolbar opacity-gray'
              : 'md-header-toolbar'
          }
        >
          <div className="md-toolbar-box">
            <ToolBarButton
              title='加粗'
              icon="bold"
              onClick={() => editClick('bold', ' **', '**')}
            />
            <ToolBarButton
              title='斜体字'
              icon="italic"
              onClick={() => editClick('italic', ' *', '*')}
            />
            <ToolBarButton
              title='删除线'
              icon="strikethrough"
              onClick={() => editClick('strike', ' ~~', '~~')}
            />
            <ToolBarButton
              title='引用块'
              icon="quote-left"
              onClick={() => editClick('quote', '\n> ', ' ')}
            />
            <ToolBarButton
              title='内嵌代码'
              icon="code"
              onClick={() => editClick('code', '`', '`')}
            />
            <ToolBarButton
              title='代码段'
              icon="file-code"
              onClick={() => editClick('codemode', '\n```\n', '\n```\n')}
            />
            <ToolBarButton
              title='插入链接'
              icon="link"
              onClick={() => editClick('link', '[', '](url)')}
            />
            <ToolBarButton
              title='无序列表'
              icon="list-ul"
              // icon="unordered-list"
              onClick={() => editClick('bulletList', '\n* ', ' ')}
            />
            <ToolBarButton
              title='有序列表'
              icon="list-ol"
              // icon="ordered-list"
              onClick={() => editClick('numberList', '\n1. ', ' ')}
            />
            <ToolBarButton
              title='任务'
              icon="tasks"
              // icon="carryout"
              onClick={() => editClick('task', '* [ ] ', ' ')}
            />
            <ToolBarButton
              title='表格'
              icon="table"
              onClick={() => editClick('table', mdTable(), ' ')}
            />
            <ToolBarButton
              ref={fullRef}
              title={isFullscreen ? '缩小' : '全屏'}
              icon={isFullscreen ? 'compress-alt' : 'expand-alt'}
              // icon={isFullscreen ? 'fullscreen-exit' : 'fullscreen'}
              visible={fullVisible}
              onVisibleChange={onVisibleChange}
              onClick={() => editClick('fullscreen', '', '')}
            />
          </div>
        </li>
      </ul>
    </div>
  );
});

export default React.memo(Header);
