import React, { useCallback, useEffect } from 'react';

function useHoverStyle(
  selector: string,
  cssPropertiescss: React.CSSProperties,
  hoverCssProperties: React.CSSProperties
) {
  const handleMouseEnter = useCallback(
    (el: HTMLElement) => {
      Object.keys(hoverCssProperties).forEach((key) => {
        el.style[key] = hoverCssProperties[key];
      });
    },
    [hoverCssProperties]
  );

  const handleMouseLeave = useCallback(
    (el: HTMLElement) => {
      Object.keys(hoverCssProperties).forEach((key) => {
        el.style[key] = cssPropertiescss[key] || '';
      });
    },
    [cssPropertiescss, hoverCssProperties]
  );

  useEffect(() => {
    const allTargetElementList = [].slice.call(
      document.querySelectorAll(selector)
    );
    if (allTargetElementList.length > 0) {
      allTargetElementList.forEach((el: HTMLElement) => {
        el.addEventListener('mouseenter', handleMouseEnter.bind(null, el));
        el.addEventListener('mouseleave', handleMouseLeave.bind(null, el));
      });
    }
    return () => {
      allTargetElementList.forEach((el: HTMLElement) => {
        el.removeEventListener('mouseenter', handleMouseEnter.bind(null, el));
        el.removeEventListener('mouseleave', handleMouseLeave.bind(null, el));
      });
    };
  }, [handleMouseEnter, handleMouseLeave, selector]);
}

export default useHoverStyle;
