import "./_authorModal.css";

function changeTextOrSource(
  element: HTMLElement | HTMLAnchorElement | null,
  text: string
) {
  if (!element) return;

  if (element instanceof HTMLAnchorElement) {
    element.setAttribute("href", text);
    return;
  }

  if (element instanceof HTMLElement) {
    element.textContent = text;
    return;
  }
}

function changeProjectInformation() {
  const projectName = document.querySelector<HTMLElement>(".project__name");
  const projectLink =
    document.querySelector<HTMLAnchorElement>(".project__link");
  const projectRepository = document.querySelector<HTMLAnchorElement>(
    ".project__repository"
  );

  const { VITE_PROJECT_NAME, VITE_PROJECT_LINK, VITE_PROJECT_REPOSITORY } =
    import.meta.env;

  changeTextOrSource(projectName, VITE_PROJECT_NAME);
  changeTextOrSource(projectLink, VITE_PROJECT_LINK);
  changeTextOrSource(projectRepository, VITE_PROJECT_REPOSITORY);
}

function keyDownListener(
  this: HTMLDivElement,
  { metaKey, key }: KeyboardEvent
) {
  if ((metaKey && key === "k") || key === "/") {
    this.style.display = "block";

    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
  }

  if (key === "Escape") {
    this.style.display = "none";

    document.body.style.height = "unset";
    document.body.style.overflow = "unset";
  }
}

(function () {
  const isMac = window.navigator.platform === "MacIntel";

  const markup = `
    <button type='button' id="keyboardBtn">
      Project Information
      ${
        isMac
          ? `<kbd>⌘</kbd>
            <kbd>K</kbd>`
          : `<kbd>/</kbd>`
      }
    </button>

    <div class=modal id="projectInfoModal">
      <div class="modal__overlay"></div>
      <div class="modal__content">
        <div class="modal__header">
          <h2 class="modal__title">Project Information</h2>
          <button type="button" class="modal__close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              />
            </svg>
          </button>
        </div>
        <div class="modal__body">
          <dl class="modal__list">
            <dd>Name:</dd>
            <dt class="project__name"></dt>
            <dd>Link:</dd>
            <dt>
              <a
                href="https://www.frontendmentor.io/challenges/qr-code-component-iux_sIO_H/hub"
                target="_blank"
                class="project__link"
              >
                Frontend Mentor Challenge
              </a>
            </dt>
            <dd>Repository:</dd>
            <dt>
              <a
                href="https://www.github.com/clakr/qr-code-component"
                target="_blank"
                class="project__repository"
              >
                GitHub
              </a>
            </dt>
          </dl>
          <div class="modal__icons">
            <a
              href="https://github.com/clakr"
              target="_blank"
              title="Clark's GitHub Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                <path
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                />
              </svg>
            </a>
            <a
              href="https://www.frontendmentor.io/profile/clakr"
              target="_blank"
              title="Clark's Frontend Mentor Profile"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Frontend Mentor</title>
                <path
                  d="M12.1706 1.2719a.732.732 0 00-.7186.732v13.914a.732.732 0 00.732.732.732.732 0 00.7318-.732V2.004a.732.732 0 00-.7452-.732zm11.0741 4.1685a.7339.7339 0 00-.2764.063L16.686 8.307a.7329.7329 0 000 1.3361l6.2823 2.8134a.7378.7378 0 00.2993.0648.732.732 0 00.2973-1.401l-4.786-2.1443 4.786-2.1366a.7339.7339 0 00.3698-.9664.7339.7339 0 00-.69-.4327zm-22.499 5.032a.7316.7316 0 00-.7223.9149c1.736 6.677 7.7748 11.341 14.6822 11.341a.732.732 0 000-1.464 13.7055 13.7055 0 01-13.266-10.2449.7316.7316 0 00-.6939-.547z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", markup);

  const modal = document.querySelector<HTMLDivElement>(".modal");
  if (!modal) return;

  changeProjectInformation();

  document
    .querySelector<HTMLButtonElement>(".modal__close")
    ?.addEventListener("click", () => {
      modal.style.display = "none";

      document.body.style.height = "unset";
      document.body.style.overflow = "unset";
    });

  document
    .querySelector<HTMLButtonElement>(".modal__overlay")
    ?.addEventListener("click", () => {
      modal.style.display = "none";

      document.body.style.height = "unset";
      document.body.style.overflow = "unset";
    });

  const html = document.querySelector("html");
  if (!html) return;

  const btnKeyboard = document.querySelector<HTMLButtonElement>("#keyboardBtn");
  if (!btnKeyboard) return;

  btnKeyboard.addEventListener("click", function () {
    modal.style.display = "block";

    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
  });

  window.addEventListener("load", function () {
    btnKeyboard.style.backgroundColor =
      window.getComputedStyle(html).backgroundColor;
  });
  document.addEventListener("keydown", keyDownListener.bind(modal));
})();
