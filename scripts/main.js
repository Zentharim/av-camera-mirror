Hooks.on("renderCameraViews", (app, html, data) => {

    const htmlElement = html[0] ?? html; 

    const cameraViews = htmlElement.querySelectorAll('.camera-view, .av-camera-view, .video-container');
    
    cameraViews.forEach(view => {
        if (view.querySelector('.camera-mirror-btn')) return;

        const btn = document.createElement('button');
        btn.className = "camera-mirror-btn";
        btn.title = "Mirror Camera";
        btn.innerHTML = '<i class="fas fa-arrows-alt-h"></i>';
        
        Object.assign(btn.style, {
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: '9999',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            border: '1px solid white',
            borderRadius: '4px',
            cursor: 'pointer',
            padding: '4px 8px'
        });

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const videoEl = view.querySelector('video');
            if (videoEl) {
                const isFlipped = videoEl.style.transform === 'scaleX(-1)';
                videoEl.style.transform = isFlipped ? 'none' : 'scaleX(-1)';
            } else {
                console.warn("AV Camera Mirror | No tag <video> found.");
            }
        });

        view.appendChild(btn);
    });
});
