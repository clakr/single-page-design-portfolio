function changeTextContent(element: HTMLTitleElement | Element | null) {
  if (!element) return;

  element.textContent = import.meta.env.VITE_PROJECT_NAME;
}

document.addEventListener("DOMContentLoaded", function () {
  const title = document.querySelector("title");
  changeTextContent(title);

  const heading = document.querySelector(".sr-only");
  changeTextContent(heading);

  const slideEl = document.querySelector(".wrapper--slides>img");
  if (!slideEl) return;

  const SLIDE_WIDTH = slideEl.clientWidth;

  let slideIndex = 2;

  const slider = document.querySelector("ul.wrapper--slides");
  if (!slider) return;

  slider.scrollTo({
    left: slideIndex * SLIDE_WIDTH,
    behavior: "instant",
  });

  const nextButton = document.querySelector("li[data-navigation=nextSlide]");
  const prevButton = document.querySelector("li[data-navigation=prevSlide]");
  if (!nextButton || !prevButton) return;

  nextButton.addEventListener("click", () => {
    const slidesCount = slider.childElementCount;

    if (slideIndex !== slidesCount) {
      slideIndex++;
    }

    slider.scrollTo({
      left: slideIndex * SLIDE_WIDTH,
      behavior: "smooth",
    });
  });

  prevButton.addEventListener("click", () => {
    if (slideIndex !== 0) {
      slideIndex--;
    }

    slider.scrollTo({
      left: slideIndex * SLIDE_WIDTH,
      behavior: "smooth",
    });
  });
});
