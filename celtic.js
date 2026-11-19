
"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const $ = selector => document.querySelector(selector);
    const $$ = selector => [...document.querySelectorAll(selector)];

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const menuToggle = $("#menuToggle");
    const navigation = $("#mainNavigation");

    function closeMenu() {
        navigation?.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
    }

    menuToggle?.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    $$("#mainNavigation a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
        if (
            navigation &&
            menuToggle &&
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    const sounds = {
        forest: $("#forestAudio"),
        page: $("#pageAudio"),
        portal: $("#portalAudio"),
        magic: $("#magicAudio"),
        night: $("#nightAudio"),
        success: $("#successAudio")
    };

    let soundEnabled = false;

    if (sounds.forest) {
        sounds.forest.volume = 0.22;
    }

    if (sounds.night) {
        sounds.night.volume = 0.35;
    }

    function playSound(name) {
        if (!soundEnabled) return;

        const audio = sounds[name];

        if (!audio) return;

        if (name !== "forest" && name !== "night") {
            audio.currentTime = 0;
        }

        audio.play().catch(() => {});
    }

    function stopSound(name) {
        const audio = sounds[name];

        if (!audio) return;

        audio.pause();
        audio.currentTime = 0;
    }

    function updateSoundButton() {
        const button = $("#soundToggle");

        if (!button) return;

        button.textContent = soundEnabled ? "🔊" : "🔇";

        button.setAttribute(
            "aria-pressed",
            String(soundEnabled)
        );

        button.setAttribute(
            "aria-label",
            soundEnabled
                ? "Выключить звуки"
                : "Включить звуки"
        );
    }

    $("#soundToggle")?.addEventListener("click", () => {
        soundEnabled = !soundEnabled;

        updateSoundButton();

        if (soundEnabled) {
            playSound("forest");
        } else {
            Object.keys(sounds).forEach(stopSound);
        }
    });

    updateSoundButton();

    const overlaySelectors = [
        "#creatureOverlay",
        "#bookOverlay",
        "#nightOverlay",
        "#portalOverlay",
        "#artifactOverlay",
        "#mapOverlay"
    ];

    let previousFocus = null;

    function getOpenOverlays() {
        return overlaySelectors
            .map(selector => $(selector))
            .filter(overlay => overlay && !overlay.hidden);
    }

    function openOverlay(selector) {
        const overlay = $(selector);

        if (!overlay) return;

        previousFocus = document.activeElement;

        overlay.hidden = false;

        document.body.classList.add("modal-open");

        const closeButton = overlay.querySelector(
            ".modal-close"
        );

        closeButton?.focus();
    }

    function hideOverlay(selector) {
        const overlay = $(selector);

        if (!overlay) return;

        overlay.hidden = true;

        if (getOpenOverlays().length === 0) {
            document.body.classList.remove("modal-open");
        }

        if (previousFocus instanceof HTMLElement) {
            previousFocus.focus();
        }
    }

    const creatures = {
        banshee: {
            title: "Банши",
            image: "images/banshee.png",
            text: `Банши — загадочный женский дух из ирландского фольклора.

В старинных преданиях её называют вестницей судьбы. Считалось, что её плач предвещает смерть человека из определённого рода.

Банши могла появляться в разных обликах: молодой женщины, пожилой старухи или таинственной фигуры с длинными волосами.

Её голос описывали как печальный и пронзительный. Иногда люди слышали его возле старинных домов, рек и лесных троп.

В ирландских легендах банши не обязательно причиняет вред. Чаще она выступает как сверхъестественная предвестница.

Её образ напоминает о древней связи между миром людей, семейной памятью и потусторонними силами.`
        },

        leprechaun: {
            title: "Лепрекон",
            image: "images/leprechaun.png",
            text: `Лепрекон — маленькое сверхъестественное существо из ирландского фольклора.

В народных рассказах его часто изображают одиноким сапожником, который мастерит или чинит обувь.

Лепреконы славятся хитростью и любовью к розыгрышам.

Согласно некоторым историям, они владеют спрятанными сокровищами и способны обмануть человека, который пытается их поймать.

Встреча с лепреконом могла обещать богатство, но только тому, кто сумеет перехитрить самого хитреца.

Образ лепрекона со временем стал одним из самых узнаваемых символов ирландского фольклора.`
        },

        kelpie: {
            title: "Келпи",
            image: "images/kelpie.png",
            text: `Келпи — водяной дух из шотландских преданий.

Чаще всего он принимает облик прекрасного коня, который появляется возле рек и озёр.

Путники могли увидеть его стоящим у воды, совершенно спокойным и безобидным на первый взгляд.

Однако в легендах келпи считается опасным существом, способным заманивать людей в воду.

Иногда ему приписывают способность принимать человеческий облик.

Истории о келпи напоминают о том, что тихая поверхность озера может скрывать неизвестные силы.

В шотландском фольклоре этот дух стал символом загадочной и непредсказуемой природы водоёмов.`
        }
    };

    $$("[data-creature]").forEach(button => {
        button.addEventListener("click", () => {
            const creature = creatures[button.dataset.creature];

            if (!creature) return;

            $("#creatureTitle").textContent = creature.title;
            $("#creatureText").textContent = creature.text;

            const image = $("#creatureImage");

            image.src = creature.image;
            image.alt = creature.title;

            openOverlay("#creatureOverlay");
            playSound("magic");
        });
    });

    $("#closeCreature")?.addEventListener("click", () => {
        hideOverlay("#creatureOverlay");
    });

    const chapters = [
        {
            title: "Глава первая. Дети короля Лира",
            image: "images/chapter1.png",
            text: `Давным-давно, когда древние холмы Ирландии ещё хранили голоса богов, жил могущественный король по имени Лир.

У него было четверо детей: дочь Фионнуала и три сына — Аод, Фиахра и Конн.

Они были радостью своего отца и жили среди зелёных долин, высоких деревьев и прозрачных озёр.

После смерти их матери Лир долго скорбел. Чтобы в доме снова появилась забота, он женился на женщине по имени Аойфе.

Сначала Аойфе относилась к детям ласково. Но со временем её сердце охватила ревность.

Она видела, как сильно Лир любит своих детей, и всё больше завидовала этой любви.

Никто не подозревал, что вскоре счастливая жизнь королевской семьи будет разрушена древним колдовством.`
        },

        {
            title: "Глава вторая. Проклятие Аойфе",
            image: "images/celticchapter2.png",
            text: `Однажды Аойфе предложила детям отправиться к прекрасному озеру Дерравараг.

Фионнуала и её братья радостно согласились. Они любили путешествия и не ожидали опасности.

Когда дети подошли к воде, Аойфе произнесла страшное заклинание.

В одно мгновение их человеческие тела исчезли, а на поверхности озера появились четыре белых лебедя.

Дети сохранили человеческий разум и способность говорить, но уже не могли вернуться домой.

Аойфе объявила, что проклятие продлится девятьсот лет.

Триста лет им предстояло провести на озере Дерравараг, ещё триста — в проливе Мойл, а последние триста — у берегов Инишглоры.

Фионнуала собрала братьев под своими крыльями и пообещала никогда их не оставлять.`
        },

        {
            title: "Глава третья. Озеро слёз",
            image: "images/celticchapter3.png",
            text: `На озере Дерравараг сменялись времена года.

Летом солнечный свет согревал белые крылья, а зимой холодный ветер проносился над тёмной водой.

Четыре лебедя плавали вместе, вспоминая свой дом и любимого отца.

Их песни были настолько прекрасны и печальны, что люди останавливались на берегу, чтобы послушать.

Король Лир узнал о случившемся и пришёл к озеру.

Он услышал голоса своих детей, но не мог разрушить заклятие.

С тех пор Лир часто возвращался к воде, чтобы поговорить с ними.

Прошли долгие годы. Королевства менялись, люди старели, а четыре лебедя продолжали ждать конца первой части проклятия.

И вот однажды настало время покинуть знакомое озеро.`
        },

        {
            title: "Глава четвёртая. Море испытаний",
            image: "images/celticchapter4.png",
            text: `Лебеди отправились к проливу Мойл, где холодные морские волны встречались с сильными ветрами.

Здесь их ожидали самые тяжёлые испытания.

Бурные ночи разлучали братьев и сестру, а ледяная вода не давала найти покой.

Фионнуала старалась защищать младших братьев, укрывая их своими крыльями.

Иногда море становилось спокойным, и они снова пели песни о потерянном доме.

Но чаще вокруг слышался только шум ветра.

Когда миновали следующие триста лет, лебеди отправились к берегам Инишглоры.

Там они провели последние столетия своего долгого ожидания.

Мир людей изменился до неузнаваемости, а память о древнем королевстве постепенно превратилась в легенду.`
        },

        {
            title: "Глава пятая. Последняя песня",
            image: "images/celticchapter5.png",
            text: `Наконец девятьсот лет подошли к концу.

Четыре лебедя услышали звон христианского колокола, который возвестил о наступлении новой эпохи.

Согласно одному из распространённых вариантов легенды, они встретили святого человека по имени Мохуа.

Древнее заклятие разрушилось, и дети Лира вновь приняли человеческий облик.

Но прошедшие столетия не исчезли бесследно.

Перед людьми стояли уже не юные дети, а глубокие старики.

Фионнуала и её братья поняли, что их отец, родной дом и знакомый мир давно остались в прошлом.

Они встретили последние мгновения вместе, сохранив любовь друг к другу до самого конца.

Так завершилась печальная история детей Лира — легенда о верности, семье и надежде, пережившей века.`
        }
    ];

    const bookElement = $("#flipBook");

    let pageFlip = null;
    let bookPages = [];
    let bookReady = false;
    let bookOpening = false;
    let bookClosing = false;

    function createBookPages() {
        if (!bookElement) return [];

        bookElement.innerHTML = "";

        const pages = [];

        function addPage(className, content, isCover = false) {
            const page = document.createElement("div");

            page.className = `book-page ${className}`;

            if (isCover) {
                page.dataset.density = "hard";
            }

            page.innerHTML = content;

            bookElement.appendChild(page);
            pages.push(page);
        }

        addPage(
            "book-page-cover",
            `
                <span style="font-size:55px;color:#c8a66b;">☘</span>
                <p>КЕЛЬТСКИЕ ЛЕГЕНДЫ</p>
                <h2>Дети Лира</h2>
                <p>ДРЕВНЯЯ ИРЛАНДИЯ</p>
            `,
            true
        );

        chapters.forEach((chapter, index) => {

            addPage(
                "book-page-text",
                `
                    <h3>${chapter.title}</h3>
                    <p>${chapter.text}</p>
                `
            );

            addPage(
                "book-page-image",
                `
                    <img
                        src="${chapter.image}"
                        alt="Иллюстрация к главе ${index + 1}"
                        draggable="false"
                    >
                `
            );
        });

        addPage(
            "book-page-cover",
            `
                <span style="font-size:55px;color:#c8a66b;">✦</span>
                <h2>Конец легенды</h2>
                <p>ДЕТИ ЛИРА</p>
                <p>ЗЕМЛЯ ПРЕДАНИЙ</p>
            `,
            true
        );

        return pages;
    }

    function updatePageCounter() {
        if (!pageFlip) return;

        const current = pageFlip.getCurrentPageIndex();
        const total = pageFlip.getPageCount();

        const counter = $("#pageCounter");

        if (current === 0) {
            counter.textContent = "Обложка";
        } else if (current >= total - 1) {
            counter.textContent = "Конец книги";
        } else {
            const chapterNumber = Math.min(
                Math.ceil(current / 2),
                chapters.length
            );

            counter.textContent =
                `Глава ${chapterNumber} из ${chapters.length}`;
        }

        const prev = $("#prevPage");
        const next = $("#nextPage");

        if (prev) {
            prev.disabled = current === 0;
        }

        if (next) {
            next.disabled = current >= total - 1;
        }
    }

    function calculateBookSize() {
        const stage = $(".book-stage");

        const availableWidth = Math.max(
            240,
            (stage?.clientWidth || window.innerWidth - 50) - 10
        );

        const availableHeight = Math.max(
            260,
            window.innerHeight - 190
        );

        const width = Math.min(
            430,
            Math.floor(availableWidth / 2),
            Math.floor(availableHeight * 0.75)
        );

        return {
            width: Math.max(120, width),
            height: Math.round(Math.max(120, width) * 1.32)
        };
    }

    function initializeBook() {
        if (!bookElement) return false;

        if (!window.St || !window.St.PageFlip) {
            console.error(
                "Библиотека PageFlip не загрузилась."
            );

            return false;
        }

        if (pageFlip) {
            return true;
        }

        const size = calculateBookSize();

        bookPages = createBookPages();

        pageFlip = new St.PageFlip(bookElement, {
            width: size.width,
            height: size.height,
            size: "fixed",
            minWidth: 120,
            maxWidth: 430,
            minHeight: 160,
            maxHeight: 570,
            drawShadow: true,
            flippingTime: reducedMotion ? 250 : 900,
            usePortrait: false,
            startPage: 0,
            autoSize: false,
            maxShadowOpacity: 0.5,
            showCover: true,
            mobileScrollSupport: false,
            clickEventForward: true,
            useMouseEvents: true
        });

        pageFlip.loadFromHTML(bookPages);

        pageFlip.on("flip", () => {
            updatePageCounter();
            playSound("page");
        });

        pageFlip.on("changeState", event => {
            if (event.data === "read") {
                bookOpening = false;
            }
        });

        bookReady = true;

        updatePageCounter();

        return true;
    }

    function openCelticBook() {
        if (bookClosing) return;

        openOverlay("#bookOverlay");

        const initialized = initializeBook();

        if (!initialized) {
            hideOverlay("#bookOverlay");

            alert(
                "Не удалось загрузить книгу. Проверьте подключение библиотеки PageFlip."
            );

            return;
        }

        if (bookOpening) return;

        bookOpening = true;

        const current = pageFlip.getCurrentPageIndex();

        if (current !== 0) {
            pageFlip.turnToPage(0);
        }

        updatePageCounter();

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (
                    pageFlip &&
                    !$("#bookOverlay").hidden
                ) {
                    pageFlip.flipNext();
                }
            });
        });

        window.setTimeout(() => {
            bookOpening = false;
        }, reducedMotion ? 400 : 1100);
    }

    function closeCelticBook() {
        if (!pageFlip) {
            hideOverlay("#bookOverlay");
            return;
        }

        if (bookClosing) return;

        bookClosing = true;

        const current = pageFlip.getCurrentPageIndex();

        if (current <= 1) {
            pageFlip.flipPrev();
        } else {
            pageFlip.turnToPage(0);
        }

        window.setTimeout(() => {
            hideOverlay("#bookOverlay");

            bookClosing = false;
            bookOpening = false;

            updatePageCounter();
        }, reducedMotion ? 300 : 950);
    }

    function turnBookPage(direction) {
        if (!pageFlip || bookClosing) return;

        if (direction > 0) {
            pageFlip.flipNext();
        } else {
            pageFlip.flipPrev();
        }
    }

    $("#openBook")?.addEventListener(
        "click",
        openCelticBook
    );

    $("#closeBook")?.addEventListener(
        "click",
        closeCelticBook
    );

    $("#prevPage")?.addEventListener("click", () => {
        turnBookPage(-1);
    });

    $("#nextPage")?.addEventListener("click", () => {
        turnBookPage(1);
    });

    const nightStories = {
        village: {
            title: "Деревня, исчезнувшая в тумане",
            text: `Однажды поздним вечером молодой путник возвращался домой через холмы Ирландии.

Над дорогой медленно поднимался густой туман.

Вдали он увидел огни небольшой деревни, которой раньше никогда не замечал.

Уставший путник решил остановиться там на ночь.

На улицах не было ни одного человека, хотя в окнах домов горел тёплый свет.

Из-за закрытых дверей доносились разговоры, смех и тихая музыка.

Путник постучал в один из домов.

Музыка мгновенно оборвалась.

Дверь медленно открылась, но за ней никого не оказалось.

На столе стояли чашки с горячим чаем, а возле камина лежала раскрытая книга.

Путник услышал за спиной чей-то шёпот:

«Ты пришёл слишком поздно».

Он выбежал на улицу и бросился к дороге.

Туман становился всё гуще, а дома словно растворялись в нём.

Когда взошло солнце, путник обнаружил себя посреди пустого поля.

От деревни не осталось ни единого следа.

Лишь на земле лежала старая монета с неизвестным символом.

Говорят, что деревня появляется раз в сто лет и открывает двери только тем, кто заблудился между мирами.`
        },

        castle: {
            title: "Последний гость замка",
            text: `Во время сильной грозы девушка по имени Эйлин заблудилась среди шотландских холмов.

Вдалеке она заметила старинный замок.

Его окна светились, а тяжёлые ворота были открыты.

На пороге девушку встретил пожилой хозяин в тёмном плаще.

Он пригласил её переждать бурю у камина.

В большом зале стоял длинный стол, накрытый к ужину.

Эйлин заметила, что на стенах висят портреты людей в одежде прошлых столетий.

Один из портретов изображал самого хозяина.

Под картиной была дата, которой исполнилось уже триста лет.

Девушка посмотрела на старинные часы.

Их стрелки не двигались.

Хозяин тихо произнёс:

«В этом доме время давно остановилось».

Эйлин поднялась из-за стола и направилась к выходу.

Когда она обернулась, зал оказался пустым.

Свечи погасли, а мебель покрылась пылью.

Она выбежала наружу и увидела, что замок превратился в развалины.

На рассвете местные жители рассказали ей, что последние обитатели замка исчезли много веков назад.

С тех пор в грозовые ночи путники иногда замечают свет в его разрушенных окнах.`
        },

        fairies: {
            title: "Круг фей",
            text: `В старинной ирландской деревне рассказывали, что нельзя входить в круги, оставленные феями.

Но однажды девушка по имени Мэйв услышала в лесу прекрасную музыку.

Звуки доносились из небольшой поляны, окружённой древними деревьями.

Посреди поляны росли грибы, образуя идеальный круг.

Внутри мерцали крошечные огоньки.

Мэйв сделала шаг вперёд.

В тот же миг лес наполнился музыкой, а вокруг появились сияющие силуэты.

Девушка танцевала и смеялась, забыв о времени.

Ей казалось, что прошло всего несколько минут.

Когда музыка стихла, огни исчезли.

Мэйв вышла из круга и направилась домой.

Но знакомая дорога изменилась.

На месте старых деревьев выросли новые, а деревня выглядела совсем иначе.

Никто не узнавал девушку.

Лишь пожилая женщина вспомнила историю о Мэйв, пропавшей много десятилетий назад.

Так девушка узнала, что в мире фей время течёт иначе.

С тех пор жители деревни обходили загадочную поляну стороной.`
        }
    };

    $$("[data-night]").forEach(button => {
        button.addEventListener("click", () => {
            const story = nightStories[button.dataset.night];

            if (!story) return;

            $("#nightTitle").textContent = story.title;
            $("#nightText").textContent = story.text;

            openOverlay("#nightOverlay");

            stopSound("forest");
            playSound("night");
        });
    });

    function closeNightStory() {
        hideOverlay("#nightOverlay");
        stopSound("night");

        if (soundEnabled) {
            playSound("forest");
        }
    }

    $("#closeNight")?.addEventListener(
        "click",
        closeNightStory
    );

    const portalStories = [
        {
            title: "Голос из холмов",
            text: `Среди зелёных холмов Ирландии существовало место, где по ночам можно было услышать тихое пение.

Местные жители считали, что под холмами скрываются жилища сидов — загадочных обитателей потустороннего мира.

Однажды пастух услышал своё имя.

Голос доносился из-под земли.

Перед ним открылся узкий проход, освещённый золотым светом.

Пастух сделал шаг, но вспомнил предупреждение старейшин: не следует бездумно принимать приглашение из другого мира.

Он отступил.

Проход исчез, а песня оборвалась.

Наутро на месте входа росли только белые цветы.

С тех пор пастух никогда не приближался к холму после заката.`
        },

        {
            title: "Договор с феями",
            text: `Молодой мастер однажды нашёл в лесу маленькую серебряную чашу.

Когда он поднял её, перед ним появилась таинственная женщина в зелёном плаще.

Она предложила исполнить одно желание в обмен на возвращение чаши.

Мастер попросил, чтобы его семья никогда не знала голода.

Женщина согласилась, но предупредила, что подарок нельзя использовать ради жадности.

Вернувшись домой, мастер обнаружил, что его кладовая всегда наполнена хлебом.

Он делился едой с соседями и жил счастливо.

Но когда богатый купец попытался купить волшебный дар, чаша исчезла.

Мастер понял, что истинная ценность подарка заключалась не в богатстве, а в щедрости.`
        },

        {
            title: "Забытый друид",
            text: `В глубине древнего леса стоял круг камней.

Никто не помнил, кто его построил.

Однажды юноша заметил, что на одном из камней появились светящиеся символы.

Когда он прикоснулся к ним, перед ним возник образ старого друида.

Друид рассказал, что когда-то люди умели слушать ветер, понимать лес и беречь священные источники.

Но со временем они забыли эти знания.

Юноша спросил, как вернуть утраченную мудрость.

Друид ответил:

«Начни с уважения к земле, по которой ходишь».

После этих слов видение исчезло.

Символы погасли, но юноша навсегда запомнил услышанное.`
        },

        {
            title: "Врата Самайна",
            text: `В ночь Самайна жители деревни собирались у большого костра.

Считалось, что в это время граница между мирами становится тоньше.

Один молодой странник заметил среди деревьев старинные каменные ворота.

Обычно они были разрушены, но этой ночью стояли целыми.

За ними мерцал серебряный свет.

Странник услышал знакомую мелодию, которую когда-то пела его бабушка.

Он подошёл ближе и увидел силуэт женщины возле далёкого огня.

Она подняла руку, словно приветствуя его.

Но когда странник сделал шаг назад, ворота начали растворяться в тумане.

На рассвете он нашёл только старые камни.

С тех пор он каждый год вспоминал ту ночь и зажигал свечу в память о своей семье.`
        }
    ];

    let lastPortalIndex = -1;
    let portalBusy = false;

    function choosePortalStory() {
        if (portalStories.length === 0) return;

        let index;

        do {
            index = Math.floor(
                Math.random() * portalStories.length
            );
        } while (
            portalStories.length > 1 &&
            index === lastPortalIndex
        );

        lastPortalIndex = index;

        const story = portalStories[index];

        $("#portalTitle").textContent = story.title;
        $("#portalText").textContent = story.text;

        openOverlay("#portalOverlay");
        playSound("magic");
    }

    $("#secretDoor")?.addEventListener("click", () => {
        if (portalBusy) return;

        portalBusy = true;

        const door = $("#secretDoor");

        door.classList.add("opening");

        playSound("portal");

        window.setTimeout(() => {
            choosePortalStory();

            door.classList.remove("opening");
            portalBusy = false;
        }, reducedMotion ? 100 : 1200);
    });

    $("#portalAgain")?.addEventListener(
        "click",
        choosePortalStory
    );

    $("#closePortal")?.addEventListener("click", () => {
        hideOverlay("#portalOverlay");
    });

    const artifacts = {
        cauldron: {
            title: "Котёл Дагды",
            image: "images/cauldron.png",
            text: `Котёл Дагды — один из четырёх легендарных сокровищ Туата Де Дананн в ирландской мифологии.

Дагда считался могущественным божеством, связанным с изобилием, мудростью и плодородием.

Согласно преданиям, его волшебный котёл обладал удивительным свойством: никто не уходил от него голодным.

Он символизировал достаток и способность обеспечивать пищей множество людей.

В некоторых рассказах котёл связывают с представлениями о гостеприимстве и щедрости.

Этот предмет стал одним из самых известных символов волшебных сокровищ древней Ирландии.`
        },

        stone: {
            title: "Камень Фаль",
            image: "images/stone.png",
            text: `Камень Фаль, или Лиа Фаль, — легендарный камень из ирландской мифологии.

Его связывают с холмом Тара, который был важным местом древней королевской власти.

Согласно преданию, камень подавал особый знак, когда на него вступал законный король Ирландии.

В некоторых вариантах истории говорится, что он издавал громкий крик.

Камень Фаль символизировал законность власти и связь правителя с древними традициями.

Сегодня на холме Тара находится стоячий камень, который традиционно отождествляют с Лиа Фаль.`
        },

        spear: {
            title: "Копьё Луга",
            image: "images/spear.png",
            text: `Копьё Луга — одно из четырёх сокровищ Туата Де Дананн.

Луг — выдающийся герой и божество ирландской мифологии, известный множеством умений.

Его копьё считалось необыкновенно могущественным оружием.

В легендарной традиции оно символизировало воинское мастерство и победу.

Луг играет важную роль в мифах о противостоянии Туата Де Дананн и фоморов.

Истории о его копье сохранили образ древнего героя, обладавшего исключительной силой и знаниями.`
        }
    };

    $$("[data-artifact]").forEach(button => {
        button.addEventListener("click", () => {
            const artifact = artifacts[button.dataset.artifact];

            if (!artifact) return;

            $("#artifactTitle").textContent = artifact.title;
            $("#artifactText").textContent = artifact.text;

            const image = $("#artifactImage");

            image.src = artifact.image;
            image.alt = artifact.title;

            openOverlay("#artifactOverlay");
            playSound("magic");
        });
    });

    $("#closeArtifact")?.addEventListener("click", () => {
        hideOverlay("#artifactOverlay");
    });

    const druidQuestions = [
        {
            question: "Кем были друиды в древних кельтских обществах?",
            answers: [
                "Морскими путешественниками",
                "Жрецами, учителями и хранителями традиций",
                "Строителями замков",
                "Королевскими кузнецами"
            ],
            correct: 1,
            explanation: "Друиды выполняли религиозные, образовательные и другие общественные функции."
        },

        {
            question: "Во что превратили детей короля Лира?",
            answers: [
                "В белых лебедей",
                "В волков",
                "В оленей",
                "В воронов"
            ],
            correct: 0,
            explanation: "Согласно ирландской легенде, четверо детей Лира были превращены в лебедей."
        },

        {
            question: "Как называется волшебная страна вечной молодости?",
            answers: [
                "Авалон",
                "Тир на Ног",
                "Олимп",
                "Асгард"
            ],
            correct: 1,
            explanation: "Тир на Ног — потусторонняя страна вечной молодости в ирландских преданиях."
        },

        {
            question: "Какой артефакт принадлежал Дагде?",
            answers: [
                "Золотая корона",
                "Волшебный котёл",
                "Серебряное зеркало",
                "Магический ключ"
            ],
            correct: 1,
            explanation: "Котёл Дагды — одно из четырёх сокровищ Туата Де Дананн."
        },

        {
            question: "Что, согласно легенде, делал камень Фаль?",
            answers: [
                "Управлял погодой",
                "Открывал тайный портал",
                "Подавал знак при появлении законного короля",
                "Превращал людей в животных"
            ],
            correct: 2,
            explanation: "Лиа Фаль связывали с признанием законного правителя Ирландии."
        }
    ];

    let druidIndex = 0;
    let druidScore = 0;
    let druidAnswered = false;

    function showDruidQuestion() {
        druidAnswered = false;

        const question = druidQuestions[druidIndex];

        $("#druidProgress").textContent =
            `Вопрос ${druidIndex + 1} из ${druidQuestions.length}`;

        $("#druidScore").textContent =
            `${druidScore} баллов`;

        $("#druidProgressFill").style.width =
            `${((druidIndex + 1) / druidQuestions.length) * 100}%`;

        $("#druidQuestion").textContent = question.question;

        const answersContainer = $("#druidAnswers");

        answersContainer.replaceChildren();

        $("#druidFeedback").textContent = "";
        $("#druidNext").hidden = true;

        question.answers.forEach((answer, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.textContent = answer;

            button.addEventListener("click", () => {
                selectDruidAnswer(index);
            });

            answersContainer.appendChild(button);
        });
    }

    function selectDruidAnswer(selectedIndex) {
        if (druidAnswered) return;

        druidAnswered = true;

        const question = druidQuestions[druidIndex];
        const buttons = $$("#druidAnswers button");

        buttons.forEach((button, index) => {
            button.disabled = true;

            if (index === question.correct) {
                button.classList.add("correct");
            }

            if (
                index === selectedIndex &&
                index !== question.correct
            ) {
                button.classList.add("wrong");
            }
        });

        if (selectedIndex === question.correct) {
            druidScore++;

            $("#druidFeedback").textContent =
                `✦ Верно! ${question.explanation}`;

            playSound("success");
        } else {
            $("#druidFeedback").textContent =
                `Неверно. ${question.explanation}`;
        }

        $("#druidScore").textContent =
            `${druidScore} баллов`;

        $("#druidNext").hidden = false;

        $("#druidNext").textContent =
            druidIndex === druidQuestions.length - 1
                ? "Завершить испытание"
                : "Следующий вопрос";
    }

    function startDruidQuiz() {
        druidIndex = 0;
        druidScore = 0;
        druidAnswered = false;

        $("#druidStart").hidden = true;
        $("#druidFinish").hidden = true;
        $("#druidQuiz").hidden = false;

        showDruidQuestion();
    }

    function finishDruidQuiz() {
        $("#druidQuiz").hidden = true;
        $("#druidFinish").hidden = false;

        let rank;
        let title;
        let message;

        if (druidScore === 5) {
            rank = "Великий друид";
            title = "Вы прошли испытание!";
            message = "Вы прекрасно знаете кельтские предания.";
        } else if (druidScore >= 3) {
            rank = "Хранитель древних знаний";
            title = "Испытание завершено!";
            message = "Вы хорошо знакомы с миром кельтских легенд.";
        } else {
            rank = "Ученик друида";
            title = "Ваш путь только начинается";
            message = "Изучите легенды и попробуйте ещё раз.";
        }

        $("#druidResultTitle").textContent = title;
        $("#druidResultText").textContent = message;

        $("#druidFinalScore").textContent =
            `Правильных ответов: ${druidScore} из ${druidQuestions.length}`;

        $("#certificateRank").textContent = rank;

        $("#certificateScore").textContent =
            `Результат: ${druidScore} / ${druidQuestions.length}`;

        playSound("magic");
    }

    $("#startDruid")?.addEventListener(
        "click",
        startDruidQuiz
    );

    $("#druidNext")?.addEventListener("click", () => {
        if (!druidAnswered) return;

        druidIndex++;

        if (druidIndex >= druidQuestions.length) {
            finishDruidQuiz();
        } else {
            showDruidQuestion();
        }
    });

    $("#restartDruid")?.addEventListener(
        "click",
        startDruidQuiz
    );

    $("#saveCertificate")?.addEventListener(
        "click",
        async () => {
            const certificate = $("#druidCertificate");
            const button = $("#saveCertificate");

            if (!certificate) return;

            if (typeof html2canvas === "undefined") {
                alert(
                    "Не удалось загрузить инструмент сохранения. Проверьте интернет."
                );
                return;
            }

            button.disabled = true;
            button.textContent = "Сохраняем...";

            try {
                const canvas = await html2canvas(
                    certificate,
                    {
                        backgroundColor: "#e7d3ae",
                        scale: 2,
                        useCORS: true
                    }
                );

                const link = document.createElement("a");

                link.download =
                    "celtic-druid-certificate.png";

                link.href = canvas.toDataURL("image/png");

                document.body.appendChild(link);
                link.click();
                link.remove();

            } catch (error) {
                console.error(error);

                alert(
                    "Не удалось сохранить свидетельство."
                );
            } finally {
                button.disabled = false;
                button.textContent =
                    "Сохранить свидетельство";
            }
        }
    );

    const places = {
        tara: {
            title: "Холм Тара",
            region: "Графство Мит, Ирландия",
            story: `Холм Тара — одно из самых известных исторических и легендарных мест Ирландии.

В древней традиции его связывают с верховными королями острова.

Здесь находится стоячий камень, который традиционно называют Лиа Фаль.

Согласно легенде, камень подавал знак при появлении законного короля.

Тара занимает важное место в ирландской мифологии и истории.`
        },

        giants: {
            title: "Тропа великанов",
            region: "Графство Антрим, Северная Ирландия",
            story: `Тропа великанов — знаменитое побережье с необычными базальтовыми колоннами.

Согласно народному преданию, ирландский великан Финн Маккул построил каменную дорогу через море.

Он хотел добраться до Шотландии, где жил другой великан.

История объясняет необычную форму каменного побережья через приключения легендарных героев.

В действительности колонны образовались в результате древней вулканической активности.`
        },

        ness: {
            title: "Озеро Лох-Несс",
            region: "Шотландское нагорье",
            story: `Лох-Несс — глубокое озеро в Шотландии, известное рассказами о загадочном существе по имени Несси.

Современная легенда получила широкую известность в XX веке.

Однако рассказы о необычных водяных существах встречались в шотландской традиции и раньше.

Сегодня Лох-Несс остаётся одним из самых известных мистических мест Шотландии.

Научных доказательств существования Несси нет.`
        },

        llyn: {
            title: "Ллин-и-Ван-Вах",
            region: "Кармартеншир, Уэльс",
            story: `Ллин-и-Ван-Вах — озеро в Уэльсе, связанное с легендой о Деве озера.

По преданию, молодой пастух встретил прекрасную девушку, появившуюся из воды.

Они поженились, но их союз был связан с необычным условием.

Когда условие оказалось нарушено, девушка вернулась в озеро.

В легенде также рассказывается о её потомках, которым приписывали знания врачевания.

Эта история стала одной из известных валлийских народных легенд.`
        },

        newgrange: {
            title: "Ньюгрейндж",
            region: "Графство Мит, Ирландия",
            story: `Ньюгрейндж — древний памятник, построенный задолго до появления средневековых ирландских легенд.

Он знаменит тем, что во время зимнего солнцестояния солнечный свет проникает внутрь сооружения.

В ирландской мифологической традиции это место связывают с миром сидов.

Также с ним ассоциируют божество Дагду и его сына Энгуса.

Ньюгрейндж соединяет древнюю историю Ирландии с её богатым мифологическим наследием.`
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

    $("#closeMap")?.addEventListener("click", () => {
        hideOverlay("#mapOverlay");
    });

    overlaySelectors.forEach(selector => {
        const overlay = $(selector);

        if (!overlay) return;

        overlay.addEventListener("click", event => {
            if (event.target !== overlay) return;

            if (selector === "#bookOverlay") {
                closeCelticBook();
            } else if (selector === "#nightOverlay") {
                closeNightStory();
            } else {
                hideOverlay(selector);
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

            const overlay =
                openOverlays[openOverlays.length - 1];

            if (overlay.id === "bookOverlay") {
                closeCelticBook();
            } else if (overlay.id === "nightOverlay") {
                closeNightStory();
            } else {
                hideOverlay(`#${overlay.id}`);
            }

            return;
        }

        const bookOverlay = $("#bookOverlay");

        if (
            bookOverlay &&
            !bookOverlay.hidden &&
            pageFlip
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
            sounds.forest?.pause();
            sounds.night?.pause();
        } else if (soundEnabled) {
            if (!$("#nightOverlay")?.hidden) {
                playSound("night");
            } else {
                playSound("forest");
            }
        }
    });

    window.addEventListener("pagehide", () => {
        Object.keys(sounds).forEach(stopSound);
    });

});
