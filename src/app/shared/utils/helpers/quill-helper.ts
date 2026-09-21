export const formatQuillStyle = (html:string):string => {
  const parser = new DOMParser();
  const document = parser.parseFromString(html, 'text/html');

  document.querySelectorAll('[style]').forEach(element => {
    const htmlElement = element as HTMLElement;

    htmlElement.style.removeProperty('background-color');
    htmlElement.style.removeProperty('color');

    if (!htmlElement.getAttribute('style')?.trim()) {
      htmlElement.removeAttribute('style');
    }
  });

  return document.body.innerHTML;
}
