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
import 'antd/es/mentions/style/index';
import type { ProMentionsProps, ProMentionsRef, MentionsConfig, tagType } from './typing'
// import type { HttpType } from '../../typing'

const { Option, getMentions } = Mentions;


const ProMentions = forwardRef<ProMentionsRef, ProMentionsProps>((props, ref) => {
  const {
    value,
    defaultValue,
    uploadProps,
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
  const [form, setForm] = useState<FormData | null>(null);

  useEffect(() => {
    if (form) {
      fetch(uploadProps?.url || "/upload", {
        method:"POST",
        body: form,
      }).then(res => res.json()).then(res => {
        editHandler('file', '', `![image](/images/${res?.data})`);
      })
      setForm(null)
    }
  }, [form])

  const [cacheHeight, setCacheHeight] = useState('0')
  const [zetAutoSize, setZetAutoSize] = useState(autoSize)
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

  },[isFullscreen, previewMarkdown, autoSize])

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
  }, [isFullscreen, onChange]);

  const writeHandler = useCallback((): void => {
    setPreviewMarkdown(false);
  }, []);

  const previewHandler = useCallback(() => {
    !isFullscreen && cacheTextareaHeight()
    setPreviewMarkdown(true);

    const marked = require("marked");
    setPreviewHtml({ __html: marked(mdValue)})
  },[isFullscreen, mdValue]);

  //复制图片
  useEffect(() => {
    const mentionTextarea = mentionRef.current?.textarea;

    mentionTextarea?.addEventListener('paste', pasteEventHandle);

    return () => {
      mentionTextarea?.removeEventListener('paste', pasteEventHandle);
    };
  });

  const pasteEventHandle = (e: ClipboardEvent) => {
    // if (uploadProps === undefined) {
    //   afterUploadCkb &&
    //     afterUploadCkb({
    //       result: false,
    //       message: 'uploadProps缺失',
    //     });
    //   return;
    // }

    const file = e.clipboardData?.items[0].getAsFile();
    if (file) {
      let formData = new FormData();
      formData.append('file', file, new Date().getTime() + '_' + file.name);
      if (uploadProps?.otherParams) {
        const sourceParams: any = uploadProps.otherParams;
        Object.keys(sourceParams).map(item => {
          formData.append(item, sourceParams[item]);
          return item;
        });
      }
      setForm(formData);
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
          {
            uploadProps &&
            <UploadFile 
              uploadProps={uploadProps} 
              afterUploadCkb={afterUploadCkb} 
              setForm={setForm}
              editHandler={editHandler} 
            />
          }
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
