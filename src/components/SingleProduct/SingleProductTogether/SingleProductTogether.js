import React, { useRef } from 'react'
import gsap from 'gsap'
import  { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/navigation'

import './SingleProductTogether.scss'

import sprite from '../../../icons/sprite.svg'

import together1 from '../../../images/together-1.png'
import together2 from '../../../images/together-2.png'

const SingleProductTogether = () => {
  const currentSlide = useRef(null)
  const totalSlidesCount = useRef(null)
  
  return (
    <section className="single-product-together">
      <div className="container">
        <div className="single-product-together__wrapper">
          <div className="single-product-together__top">
            <div className="single-product-together__title title title--dark">Вместе покупают</div>
            <div className="single-product-together__controls slider-controls">
              <div className="single-product-together__counter slider-counter">
                <span className="single-product-together__current slider-counter__current" ref={currentSlide}>1</span>
                <span className="single-product-together__separator slider-counter__separator">/</span>
                <span className="single-product-together__total slider-counter__total" ref={totalSlidesCount}>5</span>
              </div>
              <div className="single-product-together__pagination slider-pagination" />
              <div className="single-product-together__nav slider-nav">
                <div className="single-product-together__btn single-product-together__prev slider-nav__btn slider-nav__btn-prev">
                  <svg>
                    <use href={`${sprite}#slider-arrow-prev`} />
                  </svg>
                </div>
                <div className="single-product-together__btn single-product-together__next slider-nav__btn slider-nav__btn-next">
                  <svg>
                    <use href={`${sprite}#slider-arrow-next`} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Swiper
            className="single-product-together__slider single-product-together-slider"
            modules={[Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            speed={600}
            navigation={{
              prevEl: '.single-product-together__prev',
              nextEl: '.single-product-together__next',
            }}
            pagination={{
              clickable: true,
              el: '.single-product-together__pagination',
              bulletClass: '.single-product-together__pagination-item slider-pagination__item',
              bulletActiveClass: 'active',
              renderBullet: (index, className) => {
                return (`
                  <div class="${className}"></div>
                `)
              }
            }}
            onAfterInit={swiper => {
              setTimeout(() => {
                totalSlidesCount.current.textContent = swiper.slides.length
              }, 0)
            }}
            onSlideChange={swiper => {
              gsap.to(currentSlide.current, .2, { force3D: true, opacity: 0, ease: 'Power2.easeOut', onComplete: () => {
                  gsap.to(currentSlide.current, .1, { force3D: true })

                  currentSlide.current.innerHTML = swiper.realIndex + 1
                }});
              gsap.to(currentSlide.current, .2, { force3D: true, opacity: 1, ease: 'Power2.easeOut', delay: .3 })
            }}
          >
            {
              new Array(4).fill('').map((_, index) => {
                return (
                  <SwiperSlide className="single-product-together-slider__item" key={index}>
                    <div className="single-product-together-slider__item-inner">
                      <div className="single-product-together-slider__item-product">
                        <div className="single-product-together-slider__item-height">
                          <div className="single-product-together-slider__item-preview">
                            <img src={together1} width={150} height={115} alt=""/>
                          </div>
                          <div className="single-product-together-slider__item-desc">Вставка для столовых приборов пластик белый 553 x 498 x 50 мм для ящика 600 мм</div>
                          <div className="single-product-together-slider__item-price">
                            <div className="single-product-together-slider__item-price-new">41 780 грн</div>
                          </div>
                        </div>
                      </div>
                      <div className="single-product-together-slider__item-product">
                        <div className="single-product-together-slider__item-height">
                          <div className="single-product-together-slider__item-preview">
                            <img src={together2} width={150} height={115} alt=""/>
                          </div>
                          <div className="single-product-together-slider__item-desc">Вставка для столовых приборов пластик белый 553 x 498 x 50 мм для ящика 600 мм</div>
                          <div className="single-product-together-slider__item-price">
                            <div className="single-product-together-slider__item-price-old">15 333 грн</div>
                            <div className="single-product-together-slider__item-price-new">41 780 грн</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="single-product-together-slider__item-bot">
                      <div className="single-product-together-slider__item-number">
                        Код комплека: <span>995362</span>
                      </div>
                      <div className="single-product-together-slider__item-total">41 780 грн</div>
                      <div className="single-product-together-slider__item-btn-wrapper">
                        <button className="single-product-together-slider__item-btn btn">
                          <span className="single-product-together-slider__item-btn-icon btn__icon">
                            <svg><use href={`${sprite}#cart`} /></svg>
                          </span>
                          <span className="single-product-together-slider__item-btn-text btn__text">Купить комплект</span>
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default SingleProductTogether