export default function createMarkup({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) {
    return `<div class="photo-card">
        <a class="gallery-item" href="${largeImageURL}">
          <img
            class="gallery__image"
            src="${webformatURL}"
            alt="${tags}"
            loading="lazy"
        /></a>
        <div class="info">
          <div class="info__box">
            <p class="info-item">
              <b class="material-symbols-outlined">thumb_up</b>
            </p>
            <p class="info-counter">${likes}</p>
          </div>
          <div class="info__box">
            <p class="info-item">
              <b class="material-symbols-outlined">visibility</b>
            </p>
            <p class="info-counter">${views}</p>
          </div>
          <div class="info__box">
            <p class="info-item">
              <b class="material-symbols-outlined">forum</b>
            </p>
            <p class="info-counter">${comments}</p>
          </div>
          <div class="info__box">
            <p class="info-item">
              <b class="material-symbols-outlined">download</b>
            </p>
            <p class="info-counter">${downloads}</p>
          </div>
        </div>
      </div>`;
};