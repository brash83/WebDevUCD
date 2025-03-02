(() => {
    const contentContainer = document.getElementById("content");

    function renderImages(images) {
        let imagesHtml = `<div class="image-container">`;

        images.hits.forEach(image => {
            const tagsLinks = image.tags.split(',').map(tag => {
                const linkQuery = encodeURI(tag.trim());
                const linkText = tag.trim();
                return `<a href="#" onclick="loadImages('${linkQuery}')">${linkText}</a>`;
            }).join('');

            imagesHtml += `
                <div class="image">
                    <a class="venobox" data-gall="gallery" title="${image.tags}" href="${image.largeImageURL}">
                        <img src="${image.webformatURL}" alt="${image.tags}">
                    </a>
                    <div class="image-info">
                        <div class="tags">${tagsLinks}</div>
                        <div class="right">
                            <span class="favorites">${image.favorites}</span>
                            <span class="likes">${image.likes}</span>
                            <span class="comments">${image.comments}</span>
                        </div>
                    </div>
                </div>`;
        });

        imagesHtml += `</div>`;
        contentContainer.innerHTML = imagesHtml;

        // Initialize VenoBox
        new VenoBox({
            numeration: true,
            infinigall: true,
            share: true,
            spinner: 'double-bounce'
        });
    }

    function init() {
        try {
            console.log('dataOption1');
            console.log(dataOption1);
            renderImages(dataOption1);
        } catch (err) {
            console.error(err);
            contentContainer.innerHTML = `<h2>Error</h2><p>No images to display.</p><p>${err}</p>`;
        }
    }

    window.addEventListener("load", () => {
        init();
    });
})();
