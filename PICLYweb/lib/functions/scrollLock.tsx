import { useCallback } from 'react';

export function useBodyScrollLock() {
  let scrollYPosition = 0;
  let scrollXPosition = 0;
  const lockScroll = useCallback(() => {
    // for IOS safari
    scrollYPosition = window.scrollY;
    scrollXPosition = window.scrollX;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYPosition}px`;
    document.body.style.left = `-${scrollXPosition}px`;
    document.body.style.width = '100%';
    document.body.style.height = '100%';
  
  }, []);

  const openScroll = useCallback(() => {
    // for IOS safari
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('left');
    document.body.style.removeProperty('width');
    document.body.style.removeProperty('height');
    window.scrollTo(0, scrollYPosition);
  }, []);

  return { lockScroll, openScroll };
}