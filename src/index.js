import fetchImages from "./js/fetchImages";
import createMarkup from "./js/createMarkup";

import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more ');

searchForm.addEventListener('submit', onSubmitSearch);

let currentPage = 1;
let currentHits = 0;
let searchQuery = '';

async function onSubmitSearch(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const searchQuery = form.elements.searchQuery.value.trim();
    

}

// fetchImages('cat');
// createMarkup("cat");