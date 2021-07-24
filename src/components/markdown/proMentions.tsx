import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback
} from 'react';
import { Mentions } from 'antd';
import Header from './header';
import UploadFile from './uploadFile';
import './index.less';
import 'antd/es/mentions/style/index';
import type { ProMentionsProps, ProMentionsRef, MentionsConfig, tagType } from './typing'
import type { HttpType } from '../../typing'

const { Option, getMentions } = Mentions;


const ProMentions = forwardRef<ProMentionsRef, ProMentionsProps>((props, ref) => {
  const {
    value,
    defaultValue,
    uploadProps,
    previewProps,
    mentionOptions,
    autoSize,
    children,
    afterUploadCkb,
    onChange,
    afterPreviewCkb,
    ...restProps
  } = props;

  const mentionRef = useRef<ProMentionsRef>();
  const [mdValue, setMdValue] = useState(defaultValue || '');
  const [previewMarkdown, setPreviewMarkdown] = useState(false);
  const [selectionPos, setSelectionPos] = useState({
    start: defaultValue?.length || 0,
    end: defaultValue?.length || 0,
  });


  const [cacheHeight, setCacheHeight] = useState('0')

  const [zetAutoSize, setZetAutoSize] = useState(autoSize)

  // let test = '<p>1231<a href="/uploads/86ccb37322edfb40704e4a9e25cd6b2b/被讨厌的勇气.xmind">被讨厌的勇气.xmind</a>23<br/><del>就是当雷锋精神的浪费</del><br/><img src="/uploads/8076e7628ca29fa7632ce71c1baebf54/被讨厌的勇气.png" alt="image" /><pre><code>//决定是否 i 哦是的肌肤↵function(){↵}↵ceghsifjsldfajei圣诞节六块腹肌奥 if↵</code></pre><br/><strong>123</strong></p>↵<blockquote>↵  <p>123六块腹肌</p>↵</blockquote>↵<ul>↵  <li>123附近丢失</li>↵  <li>上课的风景</li>↵</ul>↵<ol>↵  <li>123</li>↵  <li>234</li>↵</ol>↵<ul>↵  <li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" disabled="disabled"></input>12今日风口浪尖</li>↵  <li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" disabled="disabled"></input>test</li>↵</ul>↵<table>↵  <thead>↵    <tr>↵      <th>header </th>↵      <th>header </th>↵    </tr>↵  </thead>↵  <tbody>↵    <tr>↵      <td>cell </td>↵      <td>cell </td>↵    </tr>↵    <tr>↵      <td>cell </td>↵      <td>cell </td>↵    </tr>↵  </tbody>↵</table>↵<p><a href="https://baidu.com">baidu</a><br/><code>12jflkdsjf</code></p>'

  // const [previewHtml, setPreviewHtml] = useState({__html: test.replaceAll('↵','\n')})

  const [previewHtml, setPreviewHtml] = useState({ __html: '' });

  useEffect(() => {
    mentionRef.current?.focus();
    const textarea = mentionRef.current?.textarea;

    if (textarea) {
      textarea.selectionStart = selectionPos.start;
      textarea.selectionEnd = selectionPos.end;
    }
  }, [selectionPos]);

  //全屏&缩小
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {

    if(isFullscreen) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';

      setZetAutoSize(false)
      setTimeout(() => {
        const textarea = mentionRef.current?.textarea;
        if(textarea) {
          textarea.style.maxHeight = '100%';
          textarea.style.height = '100%';
        }
      })
    }else {
      document.getElementsByTagName('body')[0].style.overflow = 'inherit';
      setZetAutoSize(autoSize)
      const textarea = mentionRef.current?.textarea;
      if(textarea) {
        textarea.style.overflowY = 'auto';
      }
    }

  },[isFullscreen, previewMarkdown])

  //form受控
  useEffect(() => {
    value && setMdValue(value)
  },[value])

  // 扩展Ref
  useImperativeHandle(ref, () => ({
    ...mentionRef.current,
    setMarkdown: (mdValue: string): void => {
      setMdValue(mdValue);
    },
    getMentions: (config?: MentionsConfig): Array<Object> => {
      return getMentions(mdValue, config);
    },
    isFullscreen: (): boolean => {
      return isFullscreen;
    },
    getMarkdown: (): string => {
      return mdValue;
    },
  } as ProMentionsRef), [mdValue, isFullscreen]);


  const onChangeHandle = (value: string): void => {
    setMdValue(value);

    onChange && onChange(value);
  };

  // 缓存当前textarea高度
  const cacheTextareaHeight = () => {
    let textarea = mentionRef.current?.textarea;
    if (textarea && textarea.style.maxHeight !== '100%') {
      setCacheHeight(textarea.style.maxHeight)
    }
  }

  const valueRef = useRef('');

  useEffect(() => {
    valueRef.current = mdValue;
  }, [mdValue])

  // 处理工具栏点击事件
  const editHandler = useCallback((tag: tagType, prepend: string, append: string): void => {
    // console.log('editHandler====')
    if (tag === 'fullscreen') {
      !isFullscreen && cacheTextareaHeight()
      setIsFullscreen(!isFullscreen)
      setTimeout(() => {
        mentionRef.current?.focus();
      })
      return;
    }

    const { startPoint, endPoint } = getAreaPoint();

    const mdValue = valueRef.current;

    let preStr =
      mdValue.substring(0, startPoint) + prepend +
      (startPoint !== endPoint ? mdValue.substring(startPoint, endPoint) : '');

    let newValue =
      preStr + append + mdValue.substring(endPoint, mdValue.length);

    setMdValue(newValue);
    onChange && onChange(newValue);

    if (tag === 'link') {
      setSelectionPos({
        start: preStr.length + append.length - 4,
        end: preStr.length + append.length - 1,
      });
    } else {
      setSelectionPos({
        start: preStr.length,
        end: preStr.length,
      });
    }
  }, [isFullscreen]);

  const writeHandler = useCallback((): void => {
    setPreviewMarkdown(false);
  }, []);

  const previewHandler = useCallback(() => {
    !isFullscreen && cacheTextareaHeight()
    setPreviewMarkdown(true);
    if (previewProps === undefined) {
      afterPreviewCkb &&
        afterPreviewCkb({
          result: false,
          message: 'previewProps缺失',
        });
      return;
    }

    const httpType: HttpType = previewProps.type || 'post';
    const httpUrl: string = previewProps.url || '';

    const previewParams: any = {
      text: valueRef.current,
    };

    if (previewProps.otherParams) {
      const sourceParams: any = previewProps.otherParams;
      Object.keys(sourceParams).map(v => {
        previewParams[v] = sourceParams[v];
        return v;
      });
    }

    // todo
    // Http[httpType](httpUrl, previewParams).then((res: any) => {
    //   afterPreviewCkb && afterPreviewCkb(res);
    //   if (res) {
    //     res.result ? setPreviewHtml({ __html: res.result.replaceAll('↵', '\n') }) : setPreviewHtml({ __html: ''} );
    //   }
    // });
  },[isFullscreen, previewProps]);

  //复制图片
  useEffect(() => {
    const mentionTextarea = mentionRef.current?.textarea;

    mentionTextarea?.addEventListener('paste', pasteEventHandle);

    return () => {
      mentionTextarea?.removeEventListener('paste', pasteEventHandle);
    };
  });

  const pasteEventHandle = (e: ClipboardEvent) => {
    if (uploadProps === undefined) {
      afterUploadCkb &&
        afterUploadCkb({
          result: false,
          message: 'uploadProps缺失',
        });
      return;
    }

    const file = e.clipboardData?.items[0].getAsFile();
    if (file) {
      console.log('获取到剪切板文件：', file.name);
      let formData = new FormData();
      formData.append('file', file, file.name);
      if (uploadProps?.otherParams) {
        const sourceParams: any = uploadProps.otherParams;
        Object.keys(sourceParams).map(item => {
          formData.append(item, sourceParams[item]);
          return item;
        });
      }

      const httpType: HttpType = uploadProps.type || 'post';
      const httpUrl: string = uploadProps.url || '';

      //todo
      // Http[httpType](httpUrl, formData).then((res: any) => {
      //   afterUploadCkb && afterUploadCkb(res);
      //   if (res && res.markdown && !uploadProps.noAutoInsert) {
      //     editHandler('file', '', res.markdown);
      //   }
      // });
    } else {
      afterUploadCkb && afterUploadCkb(file);
    }
  };

  //获取光标位置
  const getAreaPoint = (): {startPoint: number, endPoint: number} => {
    const textarea = mentionRef.current?.textarea;
    const startPoint = textarea?.selectionStart || 0;
    const endPoint = textarea?.selectionEnd || 0;

    return { startPoint, endPoint };
  };

  return (
    <div className={isFullscreen ? "zet-md-box-fullscreen zet-md-box" : "zet-md-box"}>
      <Header
        editHandler={editHandler}
        writeHandler={writeHandler}
        previewMarkdown={previewMarkdown}
        previewHandler={previewHandler}
        isFullscreen={isFullscreen}
      />
      {previewMarkdown ? (
        <div className="previewBox" style={{overflowY: 'auto', maxHeight: isFullscreen? '100%' : cacheHeight}}>
          <div dangerouslySetInnerHTML={previewHtml}></div>
        </div>
      ) : (
        <>
          <Mentions
            ref={mentionRef}
            {...restProps}
            autoSize={zetAutoSize}
            onChange={onChangeHandle}
            style={{height: isFullscreen ? 'calc(100% - 85px)' : 'auto', minHeight: isFullscreen? '100%' : 155}}
            value={mdValue}
            readOnly={previewMarkdown}
          >
            {mentionOptions
              ? mentionOptions.length > 0 &&
                mentionOptions.map(item => {
                  return (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  );
                })
              : children}
          </Mentions>
          <UploadFile uploadProps={uploadProps} afterUploadCkb={afterUploadCkb} editHandler={editHandler} />
        </>
      )}
    </div>
  );
});

ProMentions.defaultProps = {
  autoSize: { minRows: 6, maxRows: 10 },
  placeholder: 'You can use @ to ref user here',
};

export default ProMentions;
