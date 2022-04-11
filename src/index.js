import 'normalize.css'
import './styles/main.scss'

import Swiper, { Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

var swiper = new Swiper(".portfolioSwiper", {
    pagination: {
      el: ".swiper-pagination",
    },
    modules: [Pagination]
  });