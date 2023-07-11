const h1Elem = document.querySelector('h1');
const mainElem = document.querySelector('main');
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.contentBoxSize) {
      const contentBoxSize = entry.contentBoxSize[0];
      h1Elem.style.fontSize = `${Math.min(
        10,
        contentBoxSize.inlineSize / 200,
      )}rem`;
    }
  }
});
resizeObserver.observe(mainElem);
