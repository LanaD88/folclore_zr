
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const $ = selector => document.querySelector(selector);
    const $$ = selector => [...document.querySelectorAll(selector)];

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const soundFiles = {
        forest: "sounds/japanese-forest.mp3",
        kitsune: "sounds/japanese-kitsune.mp3",
        oni: "sounds/japanese-oni.mp3",
        tengu: "sounds/japanese-tengu.mp3",
        page: "sounds/page.wav",
        door: "sounds/japanese-door.mp3",
        night: "sounds/japanese-night.mp3"
    };

    const sounds = {};

    Object.entries(soundFiles).forEach(([name, path]) => {
        const audio = new Audio(path);
        audio.preload = "auto";
        audio.volume = name === "forest" ? 0.18 : 0.45;
        sounds[name] = audio;
    });

    sounds.forest.loop = true;

    let soundEnabled = false;

    function playSound(name) {
        if (!soundEnabled || !sounds[name]) return;

        const audio = sounds[name];

        if (name !== "forest") {
            audio.pause();
            audio.currentTime = 0;
        }

        audio.play().catch(() => {});
    }

    function stopSound(name) {
        if (!sounds[name]) return;
        sounds[name].pause();
        sounds[name].currentTime = 0;
    }

    function updateSoundButton() {
        const button = $("#soundToggle");
        if (!button) return;

        button.textContent = soundEnabled
            ? "🔊 Звук включён"
            : "🔇 Звук выключен";

        button.setAttribute("aria-pressed", String(soundEnabled));
    }

    $("#soundToggle")?.addEventListener("click", () => {
        soundEnabled = !soundEnabled;

        if (soundEnabled) {
            playSound("forest");
        } else {
            Object.keys(sounds).forEach(stopSound);
        }

        updateSoundButton();
    });

    updateSoundButton();

    const menuToggle = $("#menuToggle");
    const navLinks = $("#navLinks");

    function closeMenu() {
        navLinks?.classList.remove("open", "active");
        menuToggle?.setAttribute("aria-expanded", "false");
    }

    menuToggle?.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    $$("#navLinks a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
        if (!navLinks || !menuToggle) return;

        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    const navItems = $$("#navLinks a");

    function updateActiveNavigation() {
        const currentPosition = window.scrollY + 160;
        let activeSection = "home";

        $$("main section[id]").forEach(section => {
            if (section.offsetTop <= currentPosition) {
                activeSection = section.id;
            }
        });

        navItems.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${activeSection}`
            );
        });
    }

    window.addEventListener("scroll", updateActiveNavigation, {
        passive: true
    });

    updateActiveNavigation();

    const petalsContainer = $("#fallingPetals");

    if (petalsContainer && !reducedMotion) {
        for (let i = 0; i < 20; i++) {
            const petal = document.createElement("span");

            petal.className = "petal";
            petal.style.left = `${Math.random() * 100}%`;
            petal.style.animationDuration = `${9 + Math.random() * 12}s`;
            petal.style.animationDelay = `${Math.random() * -20}s`;
            petal.style.opacity = String(0.2 + Math.random() * 0.4);
            petal.style.width = `${7 + Math.random() * 9}px`;
            petal.style.height = `${5 + Math.random() * 6}px`;

            petalsContainer.appendChild(petal);
        }
    }

    const overlaySelectors = [
        "#creatureModal",
        "#bookOverlay",
        "#nightOverlay",
        "#secretOverlay",
        "#archiveOverlay",
        "#mapOverlay"
    ];

    let lastFocusedElement = null;

    function getOpenOverlays() {
        return overlaySelectors
            .map(selector => $(selector))
            .filter(element =>
                element &&
                (
                    element.classList.contains("open") ||
                    element.classList.contains("active")
                )
            );
    }

    function openOverlay(selector) {
        const overlay = $(selector);
        if (!overlay) return;

        lastFocusedElement = document.activeElement;

        overlay.classList.add("open");
        document.body.classList.add("modal-open");

        const closeButton = overlay.querySelector(".modal-close");

        requestAnimationFrame(() => {
            closeButton?.focus();
        });
    }

    function hideOverlay(selector) {
        const overlay = $(selector);
        if (!overlay) return;

        overlay.classList.remove("open", "active");

        if (getOpenOverlays().length === 0) {
            document.body.classList.remove("modal-open");
            lastFocusedElement?.focus?.();
        }
    }

    function closeOverlay(selector) {
        if (selector === "#bookOverlay") {
            closeJapaneseBook();
            return;
        }

        hideOverlay(selector);
    }

    const creatures = {
        kitsune: {
            title: "Кицунэ",
            image: "images/kitsune.png",
            sound: "kitsune",
            text: `В японских преданиях Кицунэ — необычная лиса, наделённая сверхъестественными способностями.

Считается, что с возрастом и мудростью её магическая сила возрастает. В некоторых легендах Кицунэ может принимать человеческий облик, создавать иллюзии и менять судьбы людей.

Одни истории рассказывают о добрых лисах, которые помогают людям и проявляют благодарность. Другие предупреждают о хитрых оборотнях, способных обмануть даже самого осторожного путника.

Лисы также занимают особое место в традициях, связанных с божеством Инари, где выступают его посланниками.

Поэтому Кицунэ нельзя назвать только добрым или только злым существом. В японском фольклоре его образ гораздо сложнее.`,
            features: [
                "Способности: превращение и создание иллюзий",
                "Образ: сверхъестественная лиса",
                "Символика: хитрость, мудрость, загадочность"
            ]
        },
        oni: {
            title: "Они",
            image: "images/oni.png",
            sound: "oni",
            text: `Они — одни из самых известных сверхъестественных существ японского фольклора.

Их часто изображают огромными, сильными, с рогами, острыми зубами и тяжёлой железной дубиной. В традиционных изображениях кожа Они может быть красной, синей или другого цвета.

В народных сказках Они нередко выступают опасными противниками героев. Они могут жить в горах, пещерах и на далёких островах.

Но образ Они не всегда одинаков. В некоторых религиозных и культурных традициях подобные грозные существа могут выполнять защитную роль.

На празднике Сэцубун существует обычай символически прогонять Они, бросая жареные соевые бобы.

Так Они стали не только персонажами страшных историй, но и частью японских традиций.`,
            features: [
                "Способности: огромная сила",
                "Образ: рогатое демоническое существо",
                "Символика: опасность и испытание"
            ]
        },
        tengu: {
            title: "Тэнгу",
            image: "images/tengu.png",
            sound: "tengu",
            text: `Тэнгу — загадочные существа японских гор и лесов.

В ранних изображениях Тэнгу часто обладали птичьими чертами. Позднее широко распространился образ существа с красным лицом и необычайно длинным носом.

Тэнгу связывают с горными местностями, сильным ветром, тайными знаниями и боевыми искусствами.

В одних легендах они наказывают высокомерных людей, в других могут обучать избранных воинов необыкновенным навыкам.

Среди известных преданий встречаются рассказы о связи Тэнгу с легендарным воином Минамото-но Ёсицунэ.

Тэнгу напоминает о том, что в японском фольклоре леса и горы считались местами, где человек мог встретиться с неизвестным.`,
            features: [
                "Способности: полёт и необычные боевые навыки",
                "Образ: горный ёкай с птичьими чертами",
                "Символика: гордость, испытания, тайные знания"
            ]
        }
    };

    $$("[data-creature]").forEach(button => {
        button.addEventListener("click", () => {
            const creature = creatures[button.dataset.creature];
            if (!creature) return;

            $("#modalTitle").textContent = creature.title;
            $("#modalImage").src = creature.image;
            $("#modalImage").alt = creature.title;
            $("#modalText").textContent = creature.text;

            const featuresContainer = $("#modalFeatures");
            featuresContainer.replaceChildren();

            creature.features.forEach(feature => {
                const paragraph = document.createElement("p");
                paragraph.textContent = `✦ ${feature}`;
                featuresContainer.appendChild(paragraph);
            });

            openOverlay("#creatureModal");
            playSound(creature.sound);
        });
    });

    $("#closeModal")?.addEventListener("click", () => {
        closeOverlay("#creatureModal");
    });

    const bookElement = $("#flipBook");
    const previousPage = $("#prevPage");
    const nextPage = $("#nextPage");
    const pageCounter = $("#pageCounter");
    const bookOverlay = $("#bookOverlay");

    if (!bookElement) return;

    const chapters = [

        {
            title: "Глава первая. Волшебный персик",
            image: "images/chapter1.png",
            text: `Давным-давно в небольшой японской деревне жили старик и старушка.

Каждое утро старик отправлялся в горы за хворостом, а старушка ходила к реке стирать одежду.

Однажды она увидела огромный персик, плывущий по воде.

Удивлённая старушка принесла его домой.

Когда старики решили разрезать персик, произошло чудо: внутри оказался маленький мальчик.

Они назвали его Момотаро, что означает «Персиковый мальчик», и стали воспитывать как собственного сына.`
        },
        {
            title: "Глава вторая. Необычный мальчик",
            image: "images/chapter2.png",
            text: `Момотаро рос добрым, смелым и необычайно сильным.

Он любил своих приёмных родителей и всегда помогал им по хозяйству.

Однажды до деревни дошли вести о страшных Они, которые причиняли людям беды и уносили сокровища.

Момотаро решил отправиться на далёкий остров, где жили эти существа.

Старики тревожились за него, но понимали, что сын принял важное решение.

Перед дорогой старушка приготовила ему вкусные просяные лепёшки — киби-данго.`
        },
        {
            title: "Глава третья. Верные спутники",
            image: "images/chapter3.png",
            text: `Момотаро отправился в путешествие.

Первым ему встретился пёс, который спросил, куда направляется юноша.

Момотаро рассказал о своём намерении победить Они и поделился с псом лепёшкой.

Вскоре к ним присоединились обезьяна и фазан.

Каждому из новых спутников Момотаро предложил угощение.

Так четверо путешественников стали верными друзьями.

Пёс обладал силой и храбростью, обезьяна была ловкой, а фазан мог наблюдать за происходящим с высоты.

Вместе они продолжили путь к острову Они.`
        },
        {
            title: "Глава четвёртая. Остров Они",
            image: "images/chapter4.png",
            text: `После долгого путешествия Момотаро и его друзья добрались до острова Они.

Перед ними возвышалась огромная крепость с тяжёлыми воротами.

Фазан поднялся в воздух и осмотрел укрепления, обезьяна помогла открыть путь, а пёс смело бросился вперёд.

Момотаро встретился с предводителем Они и потребовал прекратить нападения на людей.

Благодаря отваге и дружбе путешественники одержали победу.

Они пообещали больше не причинять людям вреда и вернуть похищенные сокровища.`
        },
        {
            title: "Глава пятая. Возвращение героя",
            image: "images/chapter5.png",
            text: `Момотаро вместе с верными друзьями вернулся домой.

Старик и старушка были счастливы снова увидеть сына.

Жители деревни радовались его возвращению и благодарили за смелость.

Но Момотаро понимал, что не смог бы добиться успеха без помощи своих спутников.

Он разделил радость победы с псом, обезьяной и фазаном.

С тех пор история Персикового мальчика передавалась из поколения в поколение.

Она напоминает о храбрости, верности, дружбе и силе совместных усилий.`
        }
    ];

    let pageFlip = null;
    let bookOpened = false;
    let bookBusy = false;
    let bookTimer = null;
    let fallbackIndex = 0;

    const styles = document.createElement("style");

    styles.textContent = `
        #flipBook {
            margin: 0 auto;
            position: relative;
        }

        #flipBook.book-is-closed {
            width: 100% !important;
            max-width: 100% !important;
            min-height: 520px;
            display: flex !important;
            justify-content: center;
            align-items: center;
            border: none !important;
            background: transparent !important;
            box-shadow: none !important;
            transform: none !important;
        }

        #flipBook.book-is-closed .forest-book-cover {
            width: min(90%, 390px);
            height: 510px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            padding: 30px;
            box-sizing: border-box;
            background: radial-gradient(circle, #71303c, #260e16 75%);
            border: 12px double #aa8251;
            box-shadow: 12px 16px 35px rgba(0,0,0,.55);
            color: #f0d6a7;
            text-align: center;
            cursor: pointer;
            font-family: Georgia, serif;
        }

        .forest-book-cover strong {
            font-size: clamp(38px, 5vw, 56px);
        }

        .forest-book-cover .cover-decoration {
            font-size: 28px;
        }

        .forest-book-cover .cover-instruction {
            font-size: 12px;
            letter-spacing: 2px;
        }

        #flipBook.book-is-open {
            display: block;
            margin: 0 auto;
        }

        #flipBook .flip-page {
            background: #ead9ba;
            color: #453025;
            box-sizing: border-box;
        }

        #flipBook .flip-page-content {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
        }

        #flipBook .book-cover {
            background: #50202c;
            color: #f0d6a7;
        }

        #flipBook .book-cover .flip-page-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            padding: 25px;
            text-align: center;
            border: 10px double #a78050;
        }

        #flipBook .book-cover h2 {
            font-size: 40px;
            color: #f0d6a7;
        }

        #flipBook .book-cover-symbol {
            font-size: 28px;
        }

        #flipBook .picture-page .flip-page-content {
            padding: 20px;
        }

        #flipBook .picture-content {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
            gap: 12px;
        }

        #flipBook .picture-content img {
            display: block;
            width: 100%;
            height: calc(100% - 40px);
            object-fit: cover;
            object-position: center;
            border: 5px double #946b40;
            box-sizing: border-box;
        }

        #flipBook .picture-content p {
            color: #62442d;
            font-size: 17px;
        }

        #flipBook .text-page .flip-page-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 25px;
            overflow-y: auto;
        }

        #flipBook .book-chapter {
            display: block;
            font-size: 12px;
            color: #97704b;
            letter-spacing: 2px;
            margin-bottom: 12px;
        }

        #flipBook .text-page h3 {
            font-family: Georgia, serif;
            color: #583927;
            font-size: 24px;
            line-height: 1.2;
            margin: 0 0 15px;
        }

        #flipBook .chapter-text {
            white-space: pre-line;
            color: #453025;
            font-size: 16px;
            line-height: 1.55;
            margin: 0;
        }

        #flipBook .page-number {
            display: block;
            text-align: right;
            margin-top: 20px;
            font-size: 12px;
            color: #947452;
        }

        @media (max-width: 650px) {
            #flipBook.book-is-closed {
                min-height: 450px;
            }

            #flipBook.book-is-closed .forest-book-cover {
                height: 420px;
            }

            #flipBook .text-page .flip-page-content {
                padding: 15px;
            }

            #flipBook .text-page h3 {
                font-size: 20px;
            }

            #flipBook .chapter-text {
                font-size: 14px;
                line-height: 1.45;
            }
        }
    `;

    document.head.appendChild(styles);

    function clearBookTimer() {
        if (bookTimer !== null) {
            clearTimeout(bookTimer);
            bookTimer = null;
        }
    }

    function destroyBook() {
        if (pageFlip) {
            try {
                pageFlip.destroy();
            } catch (error) {
                console.warn(error);
            }

            pageFlip = null;
        }
    }

    function updateNavigation() {
        if (!previousPage || !nextPage || !pageCounter) return;

        if (!bookOpened) {
            previousPage.disabled = true;
            nextPage.disabled = true;
            pageCounter.textContent = "Нажмите на обложку";
            return;
        }

        const current = pageFlip
            ? pageFlip.getCurrentPageIndex()
            : fallbackIndex;

        const total = chapters.length * 2 + 2;

        previousPage.disabled = bookBusy || current <= 1;
        nextPage.disabled = bookBusy || current >= total - 1;

        pageCounter.textContent = `${current + 1} / ${total}`;
    }

    function createPage(className, content) {
        const page = document.createElement("div");
        page.className = `flip-page ${className}`;

        const inner = document.createElement("div");
        inner.className = "flip-page-content";

        if (typeof content === "string") {
            inner.innerHTML = content;
        } else {
            inner.appendChild(content);
        }

        page.appendChild(inner);
        return page;
    }

    function createPages() {

        const pages = [];

        const cover = createPage("book-cover", `
            <span class="book-cover-symbol">✦ ⛩ ✦</span>
            <p>日本の昔話</p>
            <h2>Момотаро</h2>
            <p>Легенда о Персиковом мальчике</p>
            <span class="book-cover-symbol">桃太郎</span>
        `);

        cover.dataset.density = "hard";
        pages.push(cover);

        chapters.forEach((chapter, index) => {
            const story = document.createElement("div");
            const label = document.createElement("span");
            label.className = "book-chapter";
            label.textContent = `ГЛАВА ${index + 1}`;
            const heading = document.createElement("h3");
            heading.textContent = chapter.title;
            const paragraph = document.createElement("p");
            paragraph.className = "chapter-text";
            paragraph.textContent = chapter.text;
            const number = document.createElement("span");
            number.className = "page-number";
            number.textContent = index + 1;
            story.append(label, heading, paragraph, number);
            pages.push(createPage("text-page", story));
            const picture = document.createElement("div");
            picture.className = "flip-page-content";
            const image = document.createElement("img");
            image.src = chapter.image;
            image.alt = chapter.title;
            const caption = document.createElement("p");
            caption.textContent = chapter.title;
            picture.append(image, caption);
            const imagePage = document.createElement("div");
            imagePage.className = "flip-page picture-page";
            imagePage.appendChild(picture);
            pages.push(imagePage);
        });

        const back = createPage("book-cover", `
            <span class="book-cover-symbol">✦</span>
            <p>КОНЕЦ СКАЗКИ</p>
            <h2>Легенда живёт</h2>
            <p>За гранью сказаний</p>
            <span class="book-cover-symbol">⛩</span>
        `);

        back.dataset.density = "hard";
        pages.push(back);

        return pages;
    }

    function renderCover() {
        clearBookTimer();
        destroyBook();

        bookOpened = false;
        bookBusy = false;

        bookElement.removeAttribute("style");
        bookElement.className = "ancient-book book-is-closed";

        const button = document.createElement("button");
        button.type = "button";
        button.className = "forest-book-cover";

        button.innerHTML = `
            <span class="cover-decoration">✦ ⛩ ✦</span>
            <span>日本の昔話</span>
            <strong>Момотаро</strong>
            <span>Легенда о Персиковом мальчике</span>
            <span class="cover-decoration">桃太郎</span>
            <span class="cover-instruction">Нажмите, чтобы открыть</span>
        `;

        button.addEventListener("click", openBook);

        bookElement.replaceChildren(button);
        updateNavigation();
    }

    function getDimensions() {
        const parent = bookElement.parentElement;
        const available = Math.max(
            260,
            (parent?.clientWidth || window.innerWidth) - 24
        );

        const narrow = available < 550 || window.innerWidth < 650;

        return {
            width: narrow
                ? Math.min(380, available - 10)
                : Math.min(430, Math.floor((available - 20) / 2)),
            height: narrow ? 490 : 560
        };
    }

    function renderFallback() {
        const pages = createPages();
        const page = pages[fallbackIndex];

        if (!page) return;

        bookElement.replaceChildren(page);

        bookElement.style.cssText = `
            width: min(100%, 430px);
            height: 540px;
            margin: 0 auto;
            background: #ead9ba;
            border: 8px solid #8d6537;
            box-sizing: border-box;
        `;

        page.style.cssText = "width:100%;height:100%;";

        updateNavigation();
    }

    function openBook() {
        if (bookOpened || bookBusy) return;

        clearBookTimer();
        bookBusy = true;

        const button = bookElement.querySelector(".forest-book-cover");

        if (button) {
            button.animate([
                {
                    transform: "perspective(1200px) rotateY(0deg)",
                    opacity: 1
                },
                {
                    transform: "perspective(1200px) rotateY(-85deg)",
                    opacity: 0
                }
            ], {
                duration: 450,
                easing: "ease-in-out",
                fill: "forwards"
            });
        }

        bookTimer = setTimeout(() => {
            bookElement.replaceChildren();
            bookElement.removeAttribute("style");
            bookElement.className = "ancient-book book-is-open";

            const pages = createPages();

            if (typeof St === "undefined" || !St.PageFlip) {
                bookOpened = true;
                bookBusy = false;
                fallbackIndex = 1;
                renderFallback();
                return;
            }

            try {
                const dimensions = getDimensions();

                bookElement.append(...pages);

                pageFlip = new St.PageFlip(bookElement, {
                    width: Math.round(dimensions.width),
                    height: dimensions.height,
                    size: "fixed",
                    drawShadow: true,
                    maxShadowOpacity: 0.5,
                    showCover: true,
                    usePortrait: false,
                    mobileScrollSupport: false,
                    flippingTime: 850,
                    startPage: 0,
                    autoSize: false
                });

                pageFlip.loadFromHTML(pages);

                pageFlip.on("flip", () => {
                    updateNavigation();
                });

                pageFlip.on("changeState", event => {
                    bookBusy = event.data === "flipping";
                    updateNavigation();
                });

                bookOpened = true;
                bookBusy = false;
                bookTimer = setTimeout(() => {
                    if (pageFlip) pageFlip.flipNext();
                    updateNavigation();
                }, 150);
                updateNavigation();
            } catch (error) {
                console.error("Ошибка книги:", error);

                destroyBook();

                bookOpened = true;
                bookBusy = false;
                fallbackIndex = 1;

                renderFallback();
            }
        }, 450);
    }

    function turnPage(direction) {
        if (!bookOpened || bookBusy) return;

        if (pageFlip) {
            if (direction > 0) {
                pageFlip.flipNext();
            } else if (pageFlip.getCurrentPageIndex() > 1) {
                pageFlip.flipPrev();
            }
        } else {
            const next = fallbackIndex + direction;

            if (next < 1 || next > chapters.length * 2 + 1) {
                return;
            }

            fallbackIndex = next;
            renderFallback();
        }
    }

    function closeJapaneseBook() {
        clearBookTimer();

        const finish = () => {
            renderCover();

            hideOverlay("#bookOverlay");
        };

        if (pageFlip && bookOpened) {
            try {
                if (pageFlip.getCurrentPageIndex() > 0) {
                    pageFlip.flip(0);
                    bookTimer = setTimeout(finish, 950);
                    return;
                }
            } catch (error) {
                console.warn(error);
            }
        }

        finish();
    }

    $("#openBook")?.addEventListener("click", () => {
        renderCover();

        openOverlay("#bookOverlay");
    });

    $("#closeBook")?.addEventListener("click", closeJapaneseBook);

    previousPage?.addEventListener("click", () => {
        turnPage(-1);
    });

    nextPage?.addEventListener("click", () => {
        turnPage(1);
    });

    renderCover();

    function turnBookPage(direction) { turnPage(direction); }

    const nightStories = {
        temple: {
            title: "Заброшенный храм",
            text: `В глубине горного леса стоял старый храм. Дорога к нему давно заросла травой, а деревянные ворота покрылись мхом.

Жители ближайшей деревни рассказывали, что каждую полночь в храме загорается одинокий фонарь.

Однажды молодой путник решил узнать, кто приходит туда по ночам.

Он дождался захода солнца и поднялся по каменным ступеням. Вокруг стояла тишина.

Когда луна поднялась над деревьями, внутри храма вспыхнул мягкий золотой свет.

Путник осторожно приблизился к двери и услышал тихий звон колокольчика.

На пороге лежала маленькая деревянная табличка с надписью:

«Пока кто-нибудь помнит это место, его свет не погаснет».

Путник вернулся в деревню и рассказал о своей находке.

На следующее утро жители вместе пришли к храму, очистили дорожку и зажгли новый фонарь.

С тех пор храм больше не считался забытым.

Но иногда по ночам там всё ещё слышался звон колокольчика, хотя ветер совершенно стихал.`
        },
        path: {
            title: "Тропа духов",
            text: `В старинной деревне существовало поверье о тропе, которая появлялась только в туманные ночи.

Она проходила через густой бамбуковый лес и была освещена маленькими красными фонарями.

Однажды девушка по имени Аки потеряла дорогу домой.

Вокруг сгущался туман, и знакомые деревья казались чужими.

Вдруг между стволами возникли огоньки.

Аки пошла за ними и увидела узкую тропу.

По обе стороны дороги стояли каменные фигурки лис.

Чем дальше она шла, тем отчётливее слышала звук далёкого колокольчика.

Наконец впереди появился старый мост.

На мосту сидела белая лиса и смотрела на девушку.

Аки поклонилась ей, и лиса медленно исчезла среди деревьев.

За мостом девушка увидела огни родной деревни.

Когда она обернулась, тропы уже не было.

С тех пор Аки всегда оставляла у лесного святилища маленькое подношение в знак благодарности.`
        },
        well: {
            title: "Колодец духов",
            text: `На окраине старой деревни находился каменный колодец.

 
Вода в нём была чистой, но жители давно перестали ею пользоваться.

Говорили, что по ночам из глубины можно услышать тихий голос.

Однажды странствующий художник остановился возле колодца, чтобы отдохнуть.

Когда наступили сумерки, он услышал, как кто-то произнёс его имя.

Художник оглянулся, но вокруг никого не было.

Голос повторился, на этот раз мягче.

Тогда путник заметил старую деревянную дощечку у основания колодца.

На ней было написано, что когда-то колодец служил всей деревне, но о нём постепенно забыли.

Художник очистил камни от мха и оставил рядом небольшой фонарь.

Ночью голос больше не раздавался.

Утром на поверхности воды отражалось ясное небо.

С тех пор путник верил, что иногда таинственные голоса лишь напоминают людям о том, что не стоит забывать прошлое.`
        }
    };

    $$("[data-night]").forEach(button => {
        button.addEventListener("click", () => {
            const story = nightStories[button.dataset.night];
            if (!story) return;

            $("#nightTitle").textContent = story.title;
            $("#nightText").textContent = story.text;

            openOverlay("#nightOverlay");
            playSound("night");
        });
    });

    $("#closeNight")?.addEventListener("click", () => {
        closeOverlay("#nightOverlay");
        stopSound("night");
    });

    $$(".belief-card").forEach(card => {
        function toggleBelief() {
            const isActive = card.classList.toggle("active");

            card.setAttribute("aria-expanded", String(isActive));

            const more = card.querySelector(".belief-more");

            if (more) {
                more.textContent = isActive
                    ? "Скрыть историю −"
                    : "Раскрыть тайну +";
            }
        }

        card.addEventListener("click", toggleBelief);

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleBelief();
            }
        });
    });

    const secretStories = [
        {
            title: "Фонарь у старого моста",
            text: `Каждую ночь возле старого моста появлялся красный фонарь.

Никто не знал, кто его зажигал.

Однажды путник остановился у моста и увидел маленькую белую лису.

Она посмотрела на него, затем скрылась среди деревьев.

Фонарь погас, но дорога домой вдруг стала совершенно ясной.

С тех пор жители деревни говорили, что у моста живёт добрый дух-хранитель.`
        },
        {
            title: "Шёпот горного ветра",
            text: `Высоко в горах стоял древний храм.

Местные жители верили, что сильный ветер вокруг него связан с Тэнгу.

Один молодой воин пришёл туда, надеясь получить тайные знания.

Он долго ждал, но никто не появился.

Только ветер шептал среди сосен.

Тогда юноша понял, что терпение и уважение важнее желания прославиться.

Когда он покинул храм, ветер неожиданно стих.`
        },
        {
            title: "Три удара колокола",
            text: `В забытой долине находилось маленькое святилище.

Раз в году его колокол звонил три раза без видимой причины.

Старики рассказывали, что так духи напоминают людям о древнем обещании беречь лес.

Однажды жители решили восстановить святилище и очистить родник.

В ту ночь колокол снова прозвучал трижды.

Наутро вода в роднике стала прозрачной, а над долиной поднялся лёгкий туман.`
        },
        {
            title: "Маска без хозяина",
            text: `В старом доме хранилась лисья маска.

Её владелец давно покинул деревню, но никто не решался выбросить необычную вещь.

Однажды ночью маска оказалась возле окна, хотя раньше висела на стене.

На подоконнике лежал свежий цветок сакуры.

Хозяйка дома осторожно вернула маску на место и зажгла фонарь.

С тех пор она каждый год украшала комнату веточкой сакуры, вспоминая старые легенды.`
        }
    ];

    let previousSecret = -1;

    function showSecretStory() {
        let index = Math.floor(Math.random() * secretStories.length);

        if (secretStories.length > 1 && index === previousSecret) {
            index = (index + 1) % secretStories.length;
        }

        previousSecret = index;

        $("#secretTitle").textContent = secretStories[index].title;
        $("#secretText").textContent = secretStories[index].text;
    }

    let doorAnimating = false;

    $("#secretDoor")?.addEventListener("click", () => {
        if (doorAnimating) return;

        doorAnimating = true;

        const door = $("#secretDoor");
        door.classList.add("opening");

        playSound("door");

        setTimeout(() => {
            showSecretStory();
            openOverlay("#secretOverlay");

            door.classList.remove("opening");
            doorAnimating = false;
        }, reducedMotion ? 0 : 1100);
    });

    $("#secretAgain")?.addEventListener("click", () => {
        showSecretStory();
        playSound("page");
    });

    $("#secretClose")?.addEventListener("click", () => {
        closeOverlay("#secretOverlay");
    });

    const archiveItems = {
        scroll: {
            title: "Древний свиток",
            text: `Старинные японские свитки использовали для записи текстов, религиозных историй и художественных произведений.

В нашем вымышленном архиве хранится загадочный свиток с коротким посланием.

Говорят, что прочитать его скрытый смысл может только тот, кто разгадает загадку хранителя.

Попробуйте найти ответ и открыть тайну.`,
            puzzle: true
        },
        mask: {
            title: "Маска Кицунэ",
            text: `Лисьи маски встречаются в японской культуре, в том числе в праздничных и театральных традициях.

Их образы напоминают о Кицунэ — сверхъестественных лисах, которые в легендах могут менять облик.

В некоторых изображениях маски украшают красными линиями, золотыми узорами и характерными лисьими ушами.

В нашем архиве эта маска символизирует границу между обычным миром и миром древних преданий.`,
            puzzle: false
        },
        mirror: {
            title: "Священное зеркало",
            text: `Ята-но Кагами — одно из трёх священных сокровищ японской императорской традиции.

Оно связано с синтоистскими мифами, в том числе с преданием о богине солнца Аматэрасу.

В мифе зеркало играет важную роль в истории о том, как божество было выманено из небесной пещеры.

Предмет, представленный в нашем архиве, — художественный образ древнего японского зеркала, а не изображение подлинной святыни.

Зеркало напоминает о свете, истине и древних преданиях.`,
            puzzle: false
        }
    };

    $$("[data-archive]").forEach(button => {
        button.addEventListener("click", () => {
            const item = archiveItems[button.dataset.archive];
            if (!item) return;

            $("#archiveTitle").textContent = item.title;
            $("#archiveText").textContent = item.text;

            $("#archivePuzzle").hidden = !item.puzzle;
            $("#archiveAnswer").value = "";
            $("#archiveResult").textContent = "";

            openOverlay("#archiveOverlay");
            playSound("page");
        });
    });

    $("#archiveClose")?.addEventListener("click", () => {
        closeOverlay("#archiveOverlay");
    });

    function normalizeAnswer(value) {
        return value
            .toLowerCase()
            .replace(/ё/g, "е")
            .replace(/[.,!?;:]/g, "")
            .trim()
            .replace(/\s+/g, " ");
    }

    function checkArchiveAnswer() {
        const answer = normalizeAnswer($("#archiveAnswer").value);
        const result = $("#archiveResult");

        if (!answer) {
            result.textContent = "Сначала введите ответ.";
            return;
        }

        if (answer === "ветер") {
            result.textContent = "✦ Верно! Тайна свитка раскрыта: мудрость начинается с внимательности.";
            playSound("page");
        } else {
            result.textContent = "Ответ пока неверный. Попробуйте ещё раз.";
        }
    }

    $("#archiveUnlock")?.addEventListener("click", checkArchiveAnswer);

    $("#archiveAnswer")?.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            checkArchiveAnswer();
        }
    });

    function checkMainRiddle() {
        const answer = normalizeAnswer($("#riddleAnswer").value);
        const result = $("#riddleResult");

        if (!answer) {
            result.textContent = "Введите ваш ответ.";
            return;
        }

        if (answer === "ветер") {
            result.textContent = "✦ Правильно! Вы разгадали загадку хранителя.";

            playSound("page");
        } else {
            result.textContent = "Пока неверно. Подумайте о том, что нельзя увидеть, но можно почувствовать.";
        }
    }

    $("#checkRiddle")?.addEventListener("click", checkMainRiddle);

    $("#riddleAnswer")?.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            checkMainRiddle();
        }
    });

    const guardianQuestions = [
        {
            question: "Кто такая Кицунэ?",
            answers: [
                "Горный дракон",
                "Лиса-оборотень",
                "Дух реки",
                "Священная птица"
            ],
            correct: 1,
            explanation: "Кицунэ — сверхъестественная лиса из японских преданий."
        },
        {
            question: "Как обычно изображают Они?",
            answers: [
                "Как маленькую птицу",
                "Как белую лису",
                "Как рогатое сильное существо",
                "Как водяную черепаху"
            ],
            correct: 2,
            explanation: "Они часто изображают рогатыми и очень сильными."
        },
        {
            question: "С чем чаще всего связывают Тэнгу?",
            answers: [
                "С горами и лесами",
                "С морскими глубинами",
                "С пустынями",
                "С подземными озёрами"
            ],
            correct: 0,
            explanation: "Тэнгу — загадочные существа, связанные с горами и лесами."
        },
        {
            question: "Из чего появился Момотаро?",
            answers: [
                "Из цветка сакуры",
                "Из золотого яйца",
                "Из камня",
                "Из огромного персика"
            ],
            correct: 3,
            explanation: "В народной сказке Момотаро появился из персика."
        },
        {
            question: "Что обозначают ворота тории?",
            answers: [
                "Вход на рынок",
                "Переход к священному пространству",
                "Вход в замок",
                "Границу между городами"
            ],
            correct: 1,
            explanation: "Тории обозначают переход к священному пространству синтоистского святилища."
        }
    ];

    let guardianIndex = 0;
    let guardianScore = 0;
    let guardianAnswered = false;

    function showGuardianQuestion() {
        guardianAnswered = false;

        const question = guardianQuestions[guardianIndex];

        $("#guardianProgress").textContent =
            `Вопрос ${guardianIndex + 1} из ${guardianQuestions.length}`;

        $("#guardianProgressFill").style.width =
            `${((guardianIndex + 1) / guardianQuestions.length) * 100}%`;

        $("#guardianQuestion").textContent = question.question;

        const answersContainer = $("#guardianAnswers");
        answersContainer.replaceChildren();

        $("#guardianFeedback").textContent = "";
        $("#guardianNext").hidden = true;

        question.answers.forEach((answer, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.textContent = answer;

            button.addEventListener("click", () => {
                selectGuardianAnswer(index);
            });

            answersContainer.appendChild(button);
        });
    }

    function selectGuardianAnswer(selectedIndex) {
        if (guardianAnswered) return;

        guardianAnswered = true;

        const question = guardianQuestions[guardianIndex];
        const buttons = $$("#guardianAnswers button");

        buttons.forEach((button, index) => {
            button.disabled = true;

            if (index === question.correct) {
                button.classList.add("correct");
            }

            if (index === selectedIndex && index !== question.correct) {
                button.classList.add("wrong");
            }
        });

        if (selectedIndex === question.correct) {
            guardianScore++;
            $("#guardianFeedback").textContent =
                `✦ Верно! ${question.explanation}`;
            playSound("page");
        } else {
            $("#guardianFeedback").textContent =
                `Неверно. ${question.explanation}`;
        }

        $("#guardianNext").hidden = false;
        $("#guardianNext").textContent =
            guardianIndex === guardianQuestions.length - 1
                ? "Завершить испытание"
                : "Следующий вопрос";
    }

    function startGuardianQuiz() {
        guardianIndex = 0;
        guardianScore = 0;
        guardianAnswered = false;

        $("#guardianStart").hidden = true;
        $("#guardianFinish").hidden = true;
        $("#guardianQuiz").hidden = false;

        showGuardianQuestion();
    }

    function finishGuardianQuiz() {
        $("#guardianQuiz").hidden = true;
        $("#guardianFinish").hidden = false;

        let rank = "";
        let title = "";
        let message = "";

        if (guardianScore === 5) {
            rank = "Великий хранитель легенд";
            title = "Вы прошли испытание!";
            message = "Вы прекрасно знаете японский фольклор.";
        } else if (guardianScore >= 3) {
            rank = "Хранитель легенд";
            title = "Испытание завершено!";
            message = "Вы хорошо знакомы с миром японских преданий.";
        } else {
            rank = "Ученик хранителя";
            title = "Ваш путь только начинается";
            message = "Изучите легенды и попробуйте пройти испытание ещё раз.";
        }

        $("#guardianResultTitle").textContent = title;
        $("#guardianResultText").textContent = message;
        $("#guardianScore").textContent =
            `Правильных ответов: ${guardianScore} из ${guardianQuestions.length}`;

        $("#certificateRank").textContent = rank;
        $("#certificateScore").textContent =
            `Результат: ${guardianScore} / ${guardianQuestions.length}`;
    }

    $("#startGuardian")?.addEventListener("click", startGuardianQuiz);

    $("#guardianNext")?.addEventListener("click", () => {
        if (!guardianAnswered) return;

        guardianIndex++;

        if (guardianIndex >= guardianQuestions.length) {
            finishGuardianQuiz();
        } else {
            showGuardianQuestion();
        }
    });

    $("#restartGuardian")?.addEventListener("click", startGuardianQuiz);

    $("#saveCertificate")?.addEventListener("click", async () => {
        const certificate = $("#guardianCertificate");
        const button = $("#saveCertificate");

        if (!certificate) return;

        if (typeof html2canvas === "undefined") {
            alert("Не удалось загрузить инструмент сохранения. Проверьте подключение к интернету.");
            return;
        }

        button.disabled = true;
        button.textContent = "Сохраняем...";

        try {
            const canvas = await html2canvas(certificate, {
                backgroundColor: "#e7d3ae",
                scale: 2,
                useCORS: true
            });

            const link = document.createElement("a");
            link.download = "japanese-guardian-certificate.png";
            link.href = canvas.toDataURL("image/png");

            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error(error);
            alert("Не удалось сохранить свидетельство.");
        } finally {
            button.disabled = false;
            button.textContent = "Сохранить свидетельство";
        }
    });

    const places = {
        hokkaido: {
            title: "Хоккайдо",
            region: "Северная Япония",
            story: `Хоккайдо — северный остров Японии, известный лесами, горами и суровыми зимами.

С этим регионом связано богатое культурное наследие айнов — коренного народа, чьи предания рассказывают о камуях, духовных сущностях и божествах природы.

Важное место в этих историях занимают медведь, сова, огонь и природные силы.

Традиции айнов имеют собственное происхождение и не сводятся к японским легендам о ёкаях.`
        },
        kyoto: {
            title: "Киото",
            region: "Регион Кансай",
            story: `Киото на протяжении многих веков был столицей Японии.

В городе сохранилось множество храмов и святилищ, а его улицы стали местом действия историй о духах и необычных существах.

Одно из знаменитых мест — Фусими Инари Тайся, известное длинными дорожками красных ворот тории.

Святилище посвящено Инари, а лисы считаются посланниками этого божества.`
        },
        tokyo: {
            title: "Токио",
            region: "Регион Канто",
            story: `Современный Токио вырос из старого города Эдо.

С городом связаны многочисленные истории о призраках, загадочных встречах и городских легендах.

Особое место занимают рассказы эпохи Эдо, которые распространялись через театральные постановки, гравюры и устные предания.

Даже среди небоскрёбов здесь можно найти старинные святилища и места, связанные с прошлым.`
        },
        nara: {
            title: "Нара",
            region: "Регион Кансай",
            story: `Нара была одной из древних столиц Японии.

Город известен историческими храмами и оленями, свободно гуляющими по парку.

В традициях святилища Касуга Тайся олени связаны с божественным посланником.

Эти животные стали важным символом города и его культурного наследия.`
        },
        kyushu: {
            title: "Кюсю",
            region: "Юго-западная Япония",
            story: `Кюсю — большой остров на юго-западе Японии.

Здесь находится регион, связанный с мифами о происхождении японских божеств.

Особенно известна местность Такачихо в префектуре Миядзаки.

С ней связывают предания о богине солнца Аматэрасу и небесной пещере, где она скрылась от мира.`
        }
    };

    $$("[data-place]").forEach(button => {
        button.addEventListener("click", () => {
            const place = places[button.dataset.place];
            if (!place) return;

            $("#mapTitle").textContent = place.title;
            $("#mapRegion").textContent = place.region;
            $("#mapStory").textContent = place.story;

            openOverlay("#mapOverlay");
            playSound("page");
        });
    });

    $("#mapClose")?.addEventListener("click", () => {
        closeOverlay("#mapOverlay");
    });

    overlaySelectors.forEach(selector => {
        const overlay = $(selector);
        if (!overlay) return;

        overlay.addEventListener("click", event => {
            if (event.target !== overlay) return;

            if (selector === "#bookOverlay") {
                closeJapaneseBook();
            } else {
                hideOverlay(selector);
            }

            if (selector === "#nightOverlay") {
                stopSound("night");
            }
        });
    });

    document.addEventListener("keydown", event => {
        const openOverlays = getOpenOverlays();

        if (event.key === "Escape") {
            if (openOverlays.length === 0) {
                closeMenu();
                return;
            }

            const overlay = openOverlays[openOverlays.length - 1];

            if (overlay.id === "bookOverlay") {
                closeJapaneseBook();
            } else {
                hideOverlay(`#${overlay.id}`);
            }

            if (overlay.id === "nightOverlay") {
                stopSound("night");
            }

            return;
        }

        const bookOverlay = $("#bookOverlay");

        if (
            bookOverlay &&
            (
                bookOverlay.classList.contains("open") ||
                bookOverlay.classList.contains("active")
            )
        ) {
            const target = event.target;

            if (
                target instanceof HTMLElement &&
                (
                    target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA"
                )
            ) {
                return;
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();
                turnBookPage(1);
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                turnBookPage(-1);
            }
        }
    });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            sounds.forest.pause();
        } else if (soundEnabled) {
            playSound("forest");
        }
    });

    window.addEventListener("pagehide", () => {
        Object.keys(sounds).forEach(stopSound);
    });
});
