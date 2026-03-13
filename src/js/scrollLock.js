import * as scrollLock from "scroll-lock";

const activeLocks = new Set();

const {
  disablePageScroll,
  enablePageScroll,
  clearQueueScrollLocks,
  clearScrollLocks,
} = scrollLock;

export function lock(scrollableEl) {
  if (!scrollableEl || activeLocks.has(scrollableEl) || !disablePageScroll)
    return;

  disablePageScroll(scrollableEl);
  activeLocks.add(scrollableEl);
}

export function unlock(scrollableEl) {
  if (scrollableEl && activeLocks.has(scrollableEl) && enablePageScroll) {
    enablePageScroll(scrollableEl);
    activeLocks.delete(scrollableEl);
  }

  if (activeLocks.size > 0) return;

  clearQueueScrollLocks?.();
  clearScrollLocks?.();
}
