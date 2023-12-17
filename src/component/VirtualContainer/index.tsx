import { CSSProperties, ReactNode } from "react";
type Props = {
  id?: string;
  className?: string;
  style?: CSSProperties;
  /**
   * 容器在允许子元素自然展开  
   * 这个值的默认值是`'row'`  
   * 如果你在容器的内联样式上应用了flex布局  
   * 那么默认值改为与`flex-direction`的方向相同
   */
  direction?: 'column' | 'row';
  /**  容器内容是否可见 */
  visible?: boolean;
  children?: ReactNode;
}
/**
 * 退化为线段的容器 可以通过元素的间隙与下方内容互动  
 * 建议在此容器上应用flex布局 可以自动设置自然展开方向  
*/
export default function VirtualContainer(props: Props) {
  const containerStyle: CSSProperties = {
    width: 0,
    height: 0,
    overflow: 'visible',
  }
  if (!props.visible) {
    containerStyle.overflow = 'hidden'
  }
  if (props.direction === 'row') {
    containerStyle.width = 'auto';
  } else if (props.direction === 'column') {
    containerStyle.height = 'auto';
  } else if (props.style?.display === 'flex') {
    if (!props.style?.flexDirection || props.style?.flexDirection.search('row') !== -1) {
      containerStyle.width = 'auto';
    } else {
      containerStyle.height = 'auto';
    }
  } else {
    containerStyle.width = 'auto';
  }
  return (
    <div id={props.id} className={props.className} style={{ ...props.style, ...containerStyle }}>
      {props.children}
    </div>
  );
}