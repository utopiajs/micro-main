import { useCallback, useEffect } from 'react';

const useHoverStyle = (
  elClassName: string,
  { backgroundColor, backgroundColorHover }
) => {
  const handleMouseEnter = useCallback((el: HTMLElement) => {
    el.style.background = backgroundColorHover;
  }, []);

  const handleMouseLeave = useCallback((el: HTMLElement) => {
    el.style.background = backgroundColor;
  }, []);

  useEffect(() => {
    const allTargetElementList = [].slice.call(
      document.querySelectorAll(elClassName)
    );
    if (allTargetElementList.length > 0) {
      allTargetElementList.forEach((el: HTMLElement) => {
        el.addEventListener('mouseenter', handleMouseEnter.bind(this, el));
        el.addEventListener('mouseleave', handleMouseLeave.bind(this, el));
      });
    }
    return () => {
      allTargetElementList.forEach((el: HTMLElement) => {
        el.removeEventListener('mouseenter', handleMouseEnter.bind(this, el));
        el.removeEventListener('mouseleave', handleMouseLeave.bind(this, el));
      });
    };
  }, [
    document.querySelectorAll(elClassName),
    backgroundColor,
    backgroundColorHover
  ]);
};

export default useHoverStyle;
