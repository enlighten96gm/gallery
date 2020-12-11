class PhotoGallery {
    constructor() {
        this.API_KEY = '563492ad6f917000010000014682aca871ea4895b579e2ca8f1167f6';
        this.galleryDIv = document.querySelector('.gallery');
        this.searchForm = document.querySelector('.header form');
        this.loadMore = document.querySelector('.load-more');
        this.pageIndex = 1;
        this.logo = document.querySelector('.logo')
        this.searchValueGlobal = '';
        this.eventHandle();
    }
    eventHandle() {
        document.addEventListener('DOMContentLoaded', () => {
            this.getImg(1);
        });
        this.searchForm.addEventListener('submit', (e) => {
            this.pageIndex = 1;
            this.getSearchedImages(e);
        });
        this.loadMore.addEventListener('click', (e) => {
            this.loadMoreImages(e)
        });
        this.logo.addEventListener('click', () => {
            this.pageIndex = 1;
            this.galleryDIv.innerHTML = '';
            this.getImg(this.pageIndex);
        })
    }
    async getImg(index) {
        this.loadMore.setAttribute('data-img', 'curated');
        const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`;
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos)
        console.log(data);
    }
    async fetchImages(baseURL) {
        const response = await fetch(baseURL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: this.API_KEY
            }
        });
        const data = await response.json();
        return data;
    }
    GenerateHTML(photos) {
        photos.forEach((photo) => {
            const item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `
            <a href='${photo.src.original}' taget="_blanck">
                <img src="${photo.src.medium}">
                <h3>${photo.photographer}</h3>
            `;
            this.galleryDIv.appendChild(item)
        })
    }
    async getSearchedImages(e) {
        this.loadMore.setAttribute('data-img', 'search');
        e.preventDefault();
        this.galleryDIv.innerHTML = '';
        const searchValue = e.target.querySelector('input').value;
        this.searchValueGlobal = searchValue;
        const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=12`
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos)
        e.target.reset();
    }
    async getMoreSearchedImages() {
        const baseURL = `https://api.pexels.com/v1/search?query=${this.searchValueGlobal}&page=${index}&per_page=12`
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos)
    }
    loadMoreImages(e) {
        let index = ++this.pageIndex;
        const loadMoreData = e.target.getAttribute('data-img');
        if (loadMoreData === 'curated') {
            this.getImg(index)
        } else {
            this.getMoreSearchedImages(index);
        }
    }
}

const gallery = new PhotoGallery;