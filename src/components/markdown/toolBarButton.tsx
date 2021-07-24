import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from 'react';
import { Tooltip } from 'antd';
import Icon, { ThemeProps } from '../icon/Icon'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface ToolBarButtonProps {
  ref?: any;
  title: string;
  icon: IconProp;
  onClick?: () => void;
  /**
   * 用于手动控制浮层显隐
   */
  visible?: boolean;
  /**
   * 显示隐藏的回调
   */
  onVisibleChange?: (visible: boolean) => void;
}

const ToolBarButton: React.FC<ToolBarButtonProps> = forwardRef((props, ref) => {
  const { icon, title, onClick, ...restProps } = props;

  const [theme, setTheme] = useState<ThemeProps>('secondary');

  const tooltipRef: any = useRef(null);
  useImperativeHandle(ref, () => tooltipRef.current);

  return (
    <div
      className="toolbar-button"
      onMouseOver={() => {
        setTheme('primary');
      }}
      onMouseLeave={() => {
        setTheme('secondary');
      }}
      onClick={onClick}
    >
      <Tooltip {...restProps} placement="bottom" title={title} ref={tooltipRef}>
        <Icon icon={icon} theme={theme} />
      </Tooltip>
    </div>
  );
});

export default ToolBarButton;
