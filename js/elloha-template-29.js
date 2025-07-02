$(document).ready(function () {
    // ****** Variables globales pour les sélecteurs
    const $navbarToggler = $('.navbar-toggler');
    const $description = $('.description');
    const $weatherTrad = $('.weather-trad');

    // ****** Menu actif/inactif
    function initMenu() {
        $navbarToggler.on('click', function () {
            $('.navbar-toggler .btn-menu').toggleClass('d-none');
            $('.mobile-nav').toggleClass('d-none');
        });
    }

    // Pour transtion fluide vers les links
    function smoothTransition() {
        document.querySelectorAll('.header-global a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href && href.includes('#')) {
                    const targetId = href.split('#')[1];
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // ****** Texte présentation page Home
    function initDescriptionToggle() {
        if ($description.length) {
            const $seeMore2 = $('#seeMore2');
            const $seeLess2 = $('#seeLess2');

            // Vérifie hauteur description
            if ($description[0].scrollHeight <= $description.height()) {
                $seeMore2.hide();
                $seeLess2.hide();
            } else {
                $seeMore2.show();
                $seeLess2.hide();
            }

            // Voir plus
            $seeMore2.on('click', function (e) {
                e.preventDefault();
                $description.css('height', 'auto').addClass('expanded');
                $seeMore2.hide();
                $seeLess2.show();
            });

            // Voir moins
            $seeLess2.on('click', function (e) {
                e.preventDefault();
                $description.css('height', '').removeClass('expanded');
                $seeMore2.show();
                $seeLess2.hide();
            });
        }
    }

    // ****** Gestion des options SCEA
    function initSceaToggle() {
        const $optionsScea = $('.options-scea');
        const totalOptions = $optionsScea.length;

        // Afficher les 10 premiers éléments et cacher les autres
        $optionsScea.hide().slice(0, 12).show();

        // Si toutes les options sont déjà visibles, cacher le bouton "Voir plus"
        const visibleOptions = $optionsScea.filter(':visible').length;
        if (visibleOptions === totalOptions) {
            $('#seeMore1').hide();
        } else {
            $('#seeMore1').show();
        }

        $('#seeMore1').on('click', function (e) {
            e.preventDefault();

            $($optionsScea).slideDown();

            // Gestion des boutons
            $('#seeMore1').hide();
            $('#seeLess1').show();
        });

        $('#seeLess1').on('click', function (e) {
            e.preventDefault();

            $($optionsScea).not(":lt(12)").slideUp();

            // Gestion des boutons
            $('#seeMore1').show();
            $('#seeLess1').hide();
        });
    }

    // ****** Traduction météo
    function initWeatherTranslation() {
        const weatherTranslations = {
            'clear-day': 'Clair',
            'Cloudy': 'Nuageux',
            'fog': 'Brouillard',
            'partly-cloudy-day': 'Mi-couvert',
            'rain': 'Pluie',
            'sleet': 'Verglas',
            'snow': 'Neige',
            'wind': 'Vent',
        };

        $weatherTrad.each(function () {
            const $this = $(this);
            const weatherTrad = $this.attr('data') || 'Undefined';
            const translation = weatherTranslations[weatherTrad] || 'Non defini';
            $this.text(translation);
        });
    }

    // ****** Gestion des images météo
    function initWeatherImg() {
        // Parcourez chaque élément contenant une icône météo
        $('.weather-item').each(function () {
            const $weatherItem = $(this);

            // Trouver le data-icone dans les balises associées
            const weatherIcon = $weatherItem.find('.weather-trad').data('weather-icon') ||
                $weatherItem.find('canvas').attr('data') ||
                'clear-day'; // Icône par défaut

            // Récupérer l'élément de fond `.meteo-img`
            const $meteoImg = $weatherItem.find('.meteo-img');

            // Construire l'URL de l'image
            const baseUrl = $meteoImg.data('url') || 'https://static.elloha.com/webgen/img/weather/';
            const iconPath = `${baseUrl}${weatherIcon}.jpeg`;

            // Appliquer l'image de fond
            $meteoImg.css({
                'background-image': `url(${iconPath})`,
                'background-size': 'cover',
                'background-position': 'center',
            });
        });
    }

    // Prix chèques cadeaux
    function clickOnVoucherPrice() {
        // Clics sur les liens des prix chèques cadeaux
        $('.all-prices-vouchers a').on('click', function (event) {
            event.preventDefault();

            var targetId = $(this).attr('id');

            // Trouver l'élément correspondant dans le slider
            var targetElement = $(targetId);
            if (targetElement.length) {
                var index = $('.vouchers-slider').find('.owl-item').filter(function () {
                    return $(this).find(targetId).length > 0;
                }).index();

                // Si un index valide est trouvé, déplacer le slider
                if (index !== -1) {
                    $('.vouchers-slider').trigger('to.owl.carousel', [index, 600]);
                } else {
                    console.error("Impossible de trouver l'index dans Owl Carousel pour :", targetId);
                }
            } else {
                console.error("Cible non trouvée pour :", targetId);
            }
        });

        // Détecter le changement dans Owl Carousel pour le .active
        $('.vouchers-slider').on('changed.owl.carousel', function (event) {
            var currentIndex = event.item.index;

            // Sélectionner l'élément actif dans le slider
            var activeSlide = $(event.target).find('.owl-item').eq(currentIndex).find('.giftcard-index');

            if (activeSlide.length) {
                var activeId = activeSlide.attr('id');
                console.log("Élément actif dans le slider :", activeId);

                $('.all-prices-vouchers a').removeClass('active');

                $('.all-prices-vouchers a[href="#' + activeId + '"]').addClass('active');

            }
        });
    }

    // ****** Initialisation des modules
    initMenu();
    smoothTransition();
    initDescriptionToggle();
    initSceaToggle();
    initWeatherTranslation();
    initWeatherImg();
    clickOnVoucherPrice();
});

$(document).ready(function () {
    $('.slider-gallery').owlCarousel({
        loop: true,
        rewind: false,
        autoplay: true,
        autoplayHoverPause: true,
        responsiveClass: true,
        dots: false,
        nav: true,
        items: 1,
        navText: [
            "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12' fill='none'><path d='M0.877455 3.99867L4.74788 0.281231C4.84085 0.192118 4.95147 0.121388 5.07334 0.0731191C5.19522 0.0248507 5.32593 0 5.45796 0C5.58998 0 5.72071 0.0248507 5.84258 0.0731191C5.96445 0.121388 6.07507 0.192118 6.16804 0.281231C6.35431 0.459366 6.45886 0.700335 6.45886 0.95151C6.45886 1.20269 6.35431 1.44365 6.16804 1.62179L2.60765 5.03499H22.9999C23.2651 5.03499 23.5195 5.13516 23.7071 5.31346C23.8946 5.49176 24 5.73358 24 5.98574C24 6.23789 23.8946 6.47972 23.7071 6.65802C23.5195 6.83632 23.2651 6.93649 22.9999 6.93649H2.54764L6.16804 10.3687C6.26178 10.4571 6.33618 10.5622 6.38695 10.6781C6.43773 10.794 6.46387 10.9182 6.46387 11.0437C6.46387 11.1692 6.43773 11.2935 6.38695 11.4094C6.33618 11.5252 6.26178 11.6304 6.16804 11.7188C6.07507 11.8079 5.96445 11.8786 5.84258 11.9269C5.72071 11.9752 5.58998 12 5.45796 12C5.32593 12 5.19522 11.9752 5.07334 11.9269C4.95147 11.8786 4.84085 11.8079 4.74788 11.7188L0.877455 8.02985C0.315592 7.49505 0 6.77011 0 6.01426C0 5.25841 0.315592 4.53347 0.877455 3.99867Z' fill='var(--color-text-white)' /></svg >",
            "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12' fill='none'><path d='M23.1225 3.99867L19.2521 0.281231C19.1591 0.192118 19.0485 0.121388 18.9267 0.0731191C18.8048 0.0248507 18.6741 0 18.542 0C18.41 0 18.2793 0.0248507 18.1574 0.0731191C18.0355 0.121388 17.9249 0.192118 17.832 0.281231C17.6457 0.459366 17.5411 0.700335 17.5411 0.95151C17.5411 1.20269 17.6457 1.44365 17.832 1.62179L21.3924 5.03499H1.00011C0.734864 5.03499 0.480482 5.13516 0.292925 5.31346C0.105368 5.49176 0 5.73358 0 5.98574C0 6.23789 0.105368 6.47972 0.292925 6.65802C0.480482 6.83632 0.734864 6.93649 1.00011 6.93649H21.4524L17.832 10.3687C17.7382 10.4571 17.6638 10.5622 17.613 10.6781C17.5623 10.794 17.5361 10.9182 17.5361 11.0437C17.5361 11.1692 17.5623 11.2935 17.613 11.4094C17.6638 11.5252 17.7382 11.6304 17.832 11.7188C17.9249 11.8079 18.0355 11.8786 18.1574 11.9269C18.2793 11.9752 18.41 12 18.542 12C18.6741 12 18.8048 11.9752 18.9267 11.9269C19.0485 11.8786 19.1591 11.8079 19.2521 11.7188L23.1225 8.02985C23.6844 7.49505 24 6.77011 24 6.01426C24 5.25841 23.6844 4.53347 23.1225 3.99867Z' fill='var(--color-text-white)' /></svg >"
        ],
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-options').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: [
            "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12' fill='none'><path d='M0.877455 3.99867L4.74788 0.281231C4.84085 0.192118 4.95147 0.121388 5.07334 0.0731191C5.19522 0.0248507 5.32593 0 5.45796 0C5.58998 0 5.72071 0.0248507 5.84258 0.0731191C5.96445 0.121388 6.07507 0.192118 6.16804 0.281231C6.35431 0.459366 6.45886 0.700335 6.45886 0.95151C6.45886 1.20269 6.35431 1.44365 6.16804 1.62179L2.60765 5.03499H22.9999C23.2651 5.03499 23.5195 5.13516 23.7071 5.31346C23.8946 5.49176 24 5.73358 24 5.98574C24 6.23789 23.8946 6.47972 23.7071 6.65802C23.5195 6.83632 23.2651 6.93649 22.9999 6.93649H2.54764L6.16804 10.3687C6.26178 10.4571 6.33618 10.5622 6.38695 10.6781C6.43773 10.794 6.46387 10.9182 6.46387 11.0437C6.46387 11.1692 6.43773 11.2935 6.38695 11.4094C6.33618 11.5252 6.26178 11.6304 6.16804 11.7188C6.07507 11.8079 5.96445 11.8786 5.84258 11.9269C5.72071 11.9752 5.58998 12 5.45796 12C5.32593 12 5.19522 11.9752 5.07334 11.9269C4.95147 11.8786 4.84085 11.8079 4.74788 11.7188L0.877455 8.02985C0.315592 7.49505 0 6.77011 0 6.01426C0 5.25841 0.315592 4.53347 0.877455 3.99867Z' fill='var(--color-text-white)' /></svg >",
            "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12' fill='none'><path d='M23.1225 3.99867L19.2521 0.281231C19.1591 0.192118 19.0485 0.121388 18.9267 0.0731191C18.8048 0.0248507 18.6741 0 18.542 0C18.41 0 18.2793 0.0248507 18.1574 0.0731191C18.0355 0.121388 17.9249 0.192118 17.832 0.281231C17.6457 0.459366 17.5411 0.700335 17.5411 0.95151C17.5411 1.20269 17.6457 1.44365 17.832 1.62179L21.3924 5.03499H1.00011C0.734864 5.03499 0.480482 5.13516 0.292925 5.31346C0.105368 5.49176 0 5.73358 0 5.98574C0 6.23789 0.105368 6.47972 0.292925 6.65802C0.480482 6.83632 0.734864 6.93649 1.00011 6.93649H21.4524L17.832 10.3687C17.7382 10.4571 17.6638 10.5622 17.613 10.6781C17.5623 10.794 17.5361 10.9182 17.5361 11.0437C17.5361 11.1692 17.5623 11.2935 17.613 11.4094C17.6638 11.5252 17.7382 11.6304 17.832 11.7188C17.9249 11.8079 18.0355 11.8786 18.1574 11.9269C18.2793 11.9752 18.41 12 18.542 12C18.6741 12 18.8048 11.9752 18.9267 11.9269C19.0485 11.8786 19.1591 11.8079 19.2521 11.7188L23.1225 8.02985C23.6844 7.49505 24 6.77011 24 6.01426C24 5.25841 23.6844 4.53347 23.1225 3.99867Z' fill='var(--color-text-white)' /></svg >"
        ],
        margin: 8,
        dots: false,
        nav: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
            },
            768: {
                items: 3,
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                items: 4,
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-special-offers').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: [
            "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12' fill='none'><path d='M0.877455 3.99867L4.74788 0.281231C4.84085 0.192118 4.95147 0.121388 5.07334 0.0731191C5.19522 0.0248507 5.32593 0 5.45796 0C5.58998 0 5.72071 0.0248507 5.84258 0.0731191C5.96445 0.121388 6.07507 0.192118 6.16804 0.281231C6.35431 0.459366 6.45886 0.700335 6.45886 0.95151C6.45886 1.20269 6.35431 1.44365 6.16804 1.62179L2.60765 5.03499H22.9999C23.2651 5.03499 23.5195 5.13516 23.7071 5.31346C23.8946 5.49176 24 5.73358 24 5.98574C24 6.23789 23.8946 6.47972 23.7071 6.65802C23.5195 6.83632 23.2651 6.93649 22.9999 6.93649H2.54764L6.16804 10.3687C6.26178 10.4571 6.33618 10.5622 6.38695 10.6781C6.43773 10.794 6.46387 10.9182 6.46387 11.0437C6.46387 11.1692 6.43773 11.2935 6.38695 11.4094C6.33618 11.5252 6.26178 11.6304 6.16804 11.7188C6.07507 11.8079 5.96445 11.8786 5.84258 11.9269C5.72071 11.9752 5.58998 12 5.45796 12C5.32593 12 5.19522 11.9752 5.07334 11.9269C4.95147 11.8786 4.84085 11.8079 4.74788 11.7188L0.877455 8.02985C0.315592 7.49505 0 6.77011 0 6.01426C0 5.25841 0.315592 4.53347 0.877455 3.99867Z' fill='var(--color-text-white)' /></svg >",
            "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12' fill='none'><path d='M23.1225 3.99867L19.2521 0.281231C19.1591 0.192118 19.0485 0.121388 18.9267 0.0731191C18.8048 0.0248507 18.6741 0 18.542 0C18.41 0 18.2793 0.0248507 18.1574 0.0731191C18.0355 0.121388 17.9249 0.192118 17.832 0.281231C17.6457 0.459366 17.5411 0.700335 17.5411 0.95151C17.5411 1.20269 17.6457 1.44365 17.832 1.62179L21.3924 5.03499H1.00011C0.734864 5.03499 0.480482 5.13516 0.292925 5.31346C0.105368 5.49176 0 5.73358 0 5.98574C0 6.23789 0.105368 6.47972 0.292925 6.65802C0.480482 6.83632 0.734864 6.93649 1.00011 6.93649H21.4524L17.832 10.3687C17.7382 10.4571 17.6638 10.5622 17.613 10.6781C17.5623 10.794 17.5361 10.9182 17.5361 11.0437C17.5361 11.1692 17.5623 11.2935 17.613 11.4094C17.6638 11.5252 17.7382 11.6304 17.832 11.7188C17.9249 11.8079 18.0355 11.8786 18.1574 11.9269C18.2793 11.9752 18.41 12 18.542 12C18.6741 12 18.8048 11.9752 18.9267 11.9269C19.0485 11.8786 19.1591 11.8079 19.2521 11.7188L23.1225 8.02985C23.6844 7.49505 24 6.77011 24 6.01426C24 5.25841 23.6844 4.53347 23.1225 3.99867Z' fill='var(--color-text-white)' /></svg >"
        ],
        margin: 8,
        dots: false,
        nav: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
            },
            768: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                items: 2,
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-giftcards').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: [
            "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12' fill='none'><path d='M0.877455 3.99867L4.74788 0.281231C4.84085 0.192118 4.95147 0.121388 5.07334 0.0731191C5.19522 0.0248507 5.32593 0 5.45796 0C5.58998 0 5.72071 0.0248507 5.84258 0.0731191C5.96445 0.121388 6.07507 0.192118 6.16804 0.281231C6.35431 0.459366 6.45886 0.700335 6.45886 0.95151C6.45886 1.20269 6.35431 1.44365 6.16804 1.62179L2.60765 5.03499H22.9999C23.2651 5.03499 23.5195 5.13516 23.7071 5.31346C23.8946 5.49176 24 5.73358 24 5.98574C24 6.23789 23.8946 6.47972 23.7071 6.65802C23.5195 6.83632 23.2651 6.93649 22.9999 6.93649H2.54764L6.16804 10.3687C6.26178 10.4571 6.33618 10.5622 6.38695 10.6781C6.43773 10.794 6.46387 10.9182 6.46387 11.0437C6.46387 11.1692 6.43773 11.2935 6.38695 11.4094C6.33618 11.5252 6.26178 11.6304 6.16804 11.7188C6.07507 11.8079 5.96445 11.8786 5.84258 11.9269C5.72071 11.9752 5.58998 12 5.45796 12C5.32593 12 5.19522 11.9752 5.07334 11.9269C4.95147 11.8786 4.84085 11.8079 4.74788 11.7188L0.877455 8.02985C0.315592 7.49505 0 6.77011 0 6.01426C0 5.25841 0.315592 4.53347 0.877455 3.99867Z' fill='var(--color-text-white)' /></svg >",
            "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12' fill='none'><path d='M23.1225 3.99867L19.2521 0.281231C19.1591 0.192118 19.0485 0.121388 18.9267 0.0731191C18.8048 0.0248507 18.6741 0 18.542 0C18.41 0 18.2793 0.0248507 18.1574 0.0731191C18.0355 0.121388 17.9249 0.192118 17.832 0.281231C17.6457 0.459366 17.5411 0.700335 17.5411 0.95151C17.5411 1.20269 17.6457 1.44365 17.832 1.62179L21.3924 5.03499H1.00011C0.734864 5.03499 0.480482 5.13516 0.292925 5.31346C0.105368 5.49176 0 5.73358 0 5.98574C0 6.23789 0.105368 6.47972 0.292925 6.65802C0.480482 6.83632 0.734864 6.93649 1.00011 6.93649H21.4524L17.832 10.3687C17.7382 10.4571 17.6638 10.5622 17.613 10.6781C17.5623 10.794 17.5361 10.9182 17.5361 11.0437C17.5361 11.1692 17.5623 11.2935 17.613 11.4094C17.6638 11.5252 17.7382 11.6304 17.832 11.7188C17.9249 11.8079 18.0355 11.8786 18.1574 11.9269C18.2793 11.9752 18.41 12 18.542 12C18.6741 12 18.8048 11.9752 18.9267 11.9269C19.0485 11.8786 19.1591 11.8079 19.2521 11.7188L23.1225 8.02985C23.6844 7.49505 24 6.77011 24 6.01426C24 5.25841 23.6844 4.53347 23.1225 3.99867Z' fill='var(--color-text-white)' /></svg >"
        ],
        margin: 8,
        dots: false,
        nav: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
            },
            768: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
            },
            1024: {
                items: 3,
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                items: 3,
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    // ****** Slider Météo
    $('.slider-meteo').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        items: 1,
        navText: [
            "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12' fill='none'><path d='M0.877455 3.99867L4.74788 0.281231C4.84085 0.192118 4.95147 0.121388 5.07334 0.0731191C5.19522 0.0248507 5.32593 0 5.45796 0C5.58998 0 5.72071 0.0248507 5.84258 0.0731191C5.96445 0.121388 6.07507 0.192118 6.16804 0.281231C6.35431 0.459366 6.45886 0.700335 6.45886 0.95151C6.45886 1.20269 6.35431 1.44365 6.16804 1.62179L2.60765 5.03499H22.9999C23.2651 5.03499 23.5195 5.13516 23.7071 5.31346C23.8946 5.49176 24 5.73358 24 5.98574C24 6.23789 23.8946 6.47972 23.7071 6.65802C23.5195 6.83632 23.2651 6.93649 22.9999 6.93649H2.54764L6.16804 10.3687C6.26178 10.4571 6.33618 10.5622 6.38695 10.6781C6.43773 10.794 6.46387 10.9182 6.46387 11.0437C6.46387 11.1692 6.43773 11.2935 6.38695 11.4094C6.33618 11.5252 6.26178 11.6304 6.16804 11.7188C6.07507 11.8079 5.96445 11.8786 5.84258 11.9269C5.72071 11.9752 5.58998 12 5.45796 12C5.32593 12 5.19522 11.9752 5.07334 11.9269C4.95147 11.8786 4.84085 11.8079 4.74788 11.7188L0.877455 8.02985C0.315592 7.49505 0 6.77011 0 6.01426C0 5.25841 0.315592 4.53347 0.877455 3.99867Z' fill='var(--color-text-white)' /></svg >",
            "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='12' viewBox='0 0 24 12' fill='none'><path d='M23.1225 3.99867L19.2521 0.281231C19.1591 0.192118 19.0485 0.121388 18.9267 0.0731191C18.8048 0.0248507 18.6741 0 18.542 0C18.41 0 18.2793 0.0248507 18.1574 0.0731191C18.0355 0.121388 17.9249 0.192118 17.832 0.281231C17.6457 0.459366 17.5411 0.700335 17.5411 0.95151C17.5411 1.20269 17.6457 1.44365 17.832 1.62179L21.3924 5.03499H1.00011C0.734864 5.03499 0.480482 5.13516 0.292925 5.31346C0.105368 5.49176 0 5.73358 0 5.98574C0 6.23789 0.105368 6.47972 0.292925 6.65802C0.480482 6.83632 0.734864 6.93649 1.00011 6.93649H21.4524L17.832 10.3687C17.7382 10.4571 17.6638 10.5622 17.613 10.6781C17.5623 10.794 17.5361 10.9182 17.5361 11.0437C17.5361 11.1692 17.5623 11.2935 17.613 11.4094C17.6638 11.5252 17.7382 11.6304 17.832 11.7188C17.9249 11.8079 18.0355 11.8786 18.1574 11.9269C18.2793 11.9752 18.41 12 18.542 12C18.6741 12 18.8048 11.9752 18.9267 11.9269C19.0485 11.8786 19.1591 11.8079 19.2521 11.7188L23.1225 8.02985C23.6844 7.49505 24 6.77011 24 6.01426C24 5.25841 23.6844 4.53347 23.1225 3.99867Z' fill='var(--color-text-white)' /></svg >"
        ],
        responsiveClass: true,
        dots: false,
        nav: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.vouchers-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        items: 1,
        autoHeight: true,
        responsiveClass: true,
        dots: false,
        nav: false,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1024: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
});