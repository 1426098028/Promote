export const CreatShadowElement = (Ordinary, Isolation, styles) => {
    const ElementAppBox = document.createElement('div');
    ElementAppBox.id = Ordinary
    document.body.appendChild(ElementAppBox);
    const ElementAppBoxShadow = ElementAppBox.attachShadow({ mode: 'open' });
    if (styles) {
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        ElementAppBoxShadow.appendChild(styleElement);
    }
    const ElementAppContainer = document.createElement('div');
    ElementAppBoxShadow.appendChild(ElementAppContainer);
    ElementAppContainer.id = Isolation
    return ElementAppContainer
}
