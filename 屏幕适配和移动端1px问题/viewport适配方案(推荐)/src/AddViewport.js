(function flexible(window, document) {
    var docElwidth = screen.width
    var design = 375
    function setmeta() {
        document?.querySelector('[name="viewport"]')?.remove()   // 删除已经有的  meta name="viewport"   
        // <meta name="viewport" content="width={设计稿宽度}, initial-scale={屏幕逻辑像素宽度/设计稿宽度}, maximum-scale={屏幕逻辑像素宽度/设计稿宽度}, minimum-scale={屏幕逻辑像素宽度/设计稿宽度}, user-scalable=no"></meta>
        var scale = docElwidth / design
        console.log(scale, docElwidth, design)
        var viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        viewportMeta.content = `width=${design}, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no`;
        document.head.appendChild(viewportMeta);
    }
    setmeta()
    window.addEventListener('resize', setmeta)
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setmeta()
        }
    })
}(window, document))
