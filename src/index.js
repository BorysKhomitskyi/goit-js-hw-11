import fetchImages from "./js/fetchImages";
import createMarkup from "./js/createMarkup";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more ');
const endCollectionText = document.querySelector('.end-collection-text');

searchForm.addEventListener('submit', onSubmitSearch);

let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

function renderCardImg(arr) {
    const markup = arr.map(item => createMarkup(item)).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
}

let currentPage = 1;
let currentHits = 0;
let searchQuery = '';

async function onSubmitSearch(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const searchQuery = form.elements.searchQuery.value.trim();
    currentPage = 1;
    
    if (searchQuery === '') {
        return;
    }

    const response = await fetchImages(searchQuery, currentPage);
    currentHits = response.hits.length;

    if (response.totalHits > 40) {
        loadMoreBtn.classList.remove('is-hidden');
    } else {
        loadMoreBtn.classList.add('is-hidden');
    }

    try {
        if (response.totalHits > 0) {
            Notify.success(`Hooray! We found ${response.totalHits} images.`);
            gallery.innerHTML = '';
            renderCardImg(response.hits);
            lightbox.refresh();
            endCollectionText.classList.add('is-hidden');

            const { height: cardHeight } = document.querySelector('.gallery')
                .firstElementChild.getBoundingClientRect();
            
            window.scrollBy({
                top: cardHeight * 2,
                behavior: 'smooth',
            });
        }

        if (response.totalHits === 0) {
            gallery.innerHTML = '';
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            loadMoreBtn.classList.add('is-hidden');
            endCollectionText.classList.add('is-hidden');
        }
    } catch (error) {
        console.log(error);
    } finally {
        form.reset();
    };
}

loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);

async function onClickLoadMoreBtn() {
  currentPage += 1;
  const response = await fetchImages(searchQuery, currentPage);
  renderCardImg(response.hits);
  lightbox.refresh();
  currentHits += response.hits.length;

  if (currentHits === response.totalHits) {
    loadMoreBtn.classList.add('is-hidden');
    endCollectionText.classList.remove('is-hidden');
  }
}