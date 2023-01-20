/**
 * POLYFILLS
 */

// Request Animation Frame polyfill
(function () {
  let lastTime = 0;
  let vendors: any[] = ["ms", "moz", "webkit", "o"];
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
    window.requestAnimationFrame = window[
      (vendors[x] + "RequestAnimationFrame") as any
    ] as any;
    window.cancelAnimationFrame = (window[
      (vendors[x] + "CancelAnimationFrame") as any
    ] || window[(vendors[x] + "CancelRequestAnimationFrame") as any]) as any;
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback: any, element: any) {
      let currTime = new Date().getTime();
      let timeToCall = Math.max(0, 16 - (currTime - lastTime));
      let id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    } as any;

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
})();

// CustomEvents polyfill
(function () {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event: any, params: any) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    let evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent as any;
})();

// MouseEvents polyfill
(function (window) {
  try {
    new CustomEvent("test");
    return false; // No need to polyfill
  } catch (e) {
    // Need to polyfill - fall through
  }

  // Polyfills DOM4 CustomEvent
  function MouseEvent(eventType: any, params: any) {
    params = params || { bubbles: false, cancelable: false };
    let mouseEvent = document.createEvent("MouseEvent");
    mouseEvent.initMouseEvent(
      eventType,
      params.bubbles,
      params.cancelable,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );

    return mouseEvent;
  }

  MouseEvent.prototype = Event.prototype;

  window.MouseEvent = MouseEvent as any;
})(window);
