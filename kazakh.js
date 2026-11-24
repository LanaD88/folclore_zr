
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const $ = selector => document.querySelector(selector);
    const $$ = selector => [...document.querySelectorAll(selector)];

    document.body.classList.remove("modal-open");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

    const overlaySelectors = [
        "#creatureModal",
        "#bookOverlay",
        "#nightOverlay",
        "#secretOverlay",
        "#archiveOverlay",
        "#mapOverlay"
    ];

    let lastFocusedElement = null;

    function openOverlay(selector) {
        const overlay = $(selector);
        if (!overlay) return;

        lastFocusedElement = document.activeElement;

        overlay.classList.add("active");
        document.body.classList.add("modal-open");

        const closeButton = overlay.querySelector(
            ".modal-close, .book-close, .night-close, .secret-close, .archive-close, .map-close"
        );

        closeButton?.focus();
    }

    function closeOverlay(selector) {
        const overlay = $(selector);
        if (!overlay) return;

        overlay.classList.remove("active");

        if (!$$(
            ".creature-modal.active, .book-overlay.active, .night-overlay.active, .secret-overlay.active, .archive-overlay.active, .map-overlay.active"
        ).length) {
            document.body.classList.remove("modal-open");
        }

        lastFocusedElement?.focus?.();
    }

    const soundButton = $("#soundToggle");

    let soundEnabled = false;
    let audioContext = null;
    let windSource = null;
    let windGain = null;
    let windFilter = null;

    function getAudioContext() {
        if (!audioContext) {
            const AudioContextClass =
                window.AudioContext || window.webkitAudioContext;

            if (!AudioContextClass) return null;

            audioContext = new AudioContextClass();
        }

        return audioContext;
    }

    function playTone(frequency = 440, duration = 0.4, type = "sine", volume = 0.05) {
        if (!soundEnabled) return;

        const context = getAudioContext();
        if (!context) return;

        const oscillator = context.createOscillator();
        const gain = context.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, context.currentTime);

        gain.gain.setValueAtTime(0.0001, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            Math.max(volume, 0.0002),
            context.currentTime + 0.03
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            context.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(context.destination);

        oscillator.start();
        oscillator.stop(context.currentTime + duration + 0.02);
    }

    function playMagic() {
        if (!soundEnabled) return;

        playTone(392, 0.65, "sine", 0.035);

        setTimeout(() => {
            playTone(523.25, 0.8, "sine", 0.03);
        }, 140);

        setTimeout(() => {
            playTone(659.25, 1.1, "sine", 0.025);
        }, 300);
    }

    function playPageSound() {
        if (!soundEnabled) return;

        playTone(190, 0.12, "triangle", 0.012);
        playTone(260, 0.16, "sine", 0.01);
    }

    function playSuccess() {
        if (!soundEnabled) return;

        [392, 493.88, 587.33, 783.99].forEach(
            (frequency, index) => {
                setTimeout(() => {
                    playTone(frequency, 0.6, "sine", 0.035);
                }, index * 130);
            }
        );
    }

    function startWind() {
        if (!soundEnabled || windSource) return;

        const context = getAudioContext();
        if (!context) return;

        const duration = 3;
        const buffer = context.createBuffer(
            1,
            context.sampleRate * duration,
            context.sampleRate
        );

        const data = buffer.getChannelData(0);

        for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.3;
        }

        windSource = context.createBufferSource();
        windSource.buffer = buffer;
        windSource.loop = true;

        windFilter = context.createBiquadFilter();
        windFilter.type = "lowpass";
        windFilter.frequency.value = 300;

        windGain = context.createGain();
        windGain.gain.value = 0.025;

        windSource.connect(windFilter);
        windFilter.connect(windGain);
        windGain.connect(context.destination);

        windSource.start();
    }

    function stopWind() {
        if (windSource) {
            try {
                windSource.stop();
            } catch (error) {}

            windSource.disconnect();
            windSource = null;
        }

        windFilter?.disconnect();
        windGain?.disconnect();

        windFilter = null;
        windGain = null;
    }

    function updateSoundButton() {
        if (!soundButton) return;

        soundButton.textContent = soundEnabled
            ? "🔊 Звук включён"
            : "🔇 Звук выключен";

        soundButton.setAttribute(
            "aria-pressed",
            String(soundEnabled)
        );
    }

    soundButton?.addEventListener("click", async () => {
        soundEnabled = !soundEnabled;

        if (soundEnabled) {
            const context = getAudioContext();

            if (context?.state === "suspended") {
                await context.resume();
            }

            startWind();
            playMagic();
        } else {
            stopWind();
        }

        updateSoundButton();
    });

    updateSoundButton();

    const creatures = {
        zheztyrnak: {
            title: "Жезтырнақ",
            image: "images/zheztyrnak.jpeg",
            text: `Жезтырнақ — загадочный персонаж казахских народных преданий.

Её название переводится как «медный коготь» или «медные ногти».

В легендах она может выглядеть как красивая женщина, но скрывает свою необычную природу.

Жезтырнақ часто появляется в рассказах о ночных встречах в степи и опасностях, которые могут ожидать одинокого путника.

Сюжеты о ней передавались устно, поэтому в разных вариантах преданий её образ и поведение отличаются.`,
            features: `Металлические когти, загадочный женский облик, появление вдали от поселений.`
        },

        zhalmauyz: {
            title: "Жалмауыз кемпір",
            image: "images/zhalmauyz.jpeg",
            text: `Жалмауыз кемпір — известный персонаж казахских волшебных сказок.

Её обычно представляют в облике опасной старухи, которая обладает необыкновенной силой и колдовскими способностями.

В сказках она нередко становится противницей главного героя.

Герой должен проявить смелость, находчивость и мудрость, чтобы преодолеть её испытания.

Этот образ занимает важное место в традиционных историях о борьбе добра со злом.`,
            features: `Колдовство, необычайная сила, хитрость, испытания сказочных героев.`
        },

        albasty: {
            title: "Албасты",
            image: "images/albasty.jpeg",
            text: `Албасты — сверхъестественный персонаж, известный в казахских и других тюркских народных поверьях.

Его образ связан со старинными представлениями о невидимых силах и необходимости защищать семью.

В различных традициях Албасты описывают по-разному.

С этим существом связывали некоторые необъяснимые для людей прошлого события.

Сегодня такие рассказы изучают как часть культурного наследия и народной мифологии.`,
            features: `Изменчивый облик, связь с народными поверьями и представлениями о защите семьи.`
        }
    };

    $$("[data-creature]").forEach(button => {
        button.addEventListener("click", () => {
            const creature = creatures[button.dataset.creature];
            if (!creature) return;

            $("#modalTitle").textContent = creature.title;
            $("#modalText").textContent = creature.text;
            $("#modalFeatures").textContent = creature.features;

            const image = $("#modalImage");
            image.src = creature.image;
            image.alt = creature.title;

            openOverlay("#creatureModal");
            playMagic();
        });
    });

    $("#closeModal")?.addEventListener("click", () => {
        closeOverlay("#creatureModal");
    });

    const chapters = [
        {
            title: "Глава первая. Рождение Ер Төстіка",
            image: "images/chapter1.jpeg",
            text: `Давным-давно в бескрайней степи жил человек по имени Ерназар.

У него было восемь сыновей, но однажды они отправились в далёкие края и долго не возвращались.

Ерназар и его жена тяжело переживали разлуку.

Спустя время у них родился ещё один сын, которого назвали Ер Төстік.
Мальчик рос необыкновенно быстро и с ранних лет отличался силой и смелостью.

Когда он узнал о пропавших братьях, то решил отправиться на их поиски.

Его ожидало путешествие, полное загадок, встреч и испытаний.`
        },

        {
            title: "Глава вторая. Дорога приключений",
            image: "images/chapter2.jpeg",
            text: `Ер Төстік отправился в дальний путь, чтобы найти своих братьев.

На дороге ему встречались необычные люди и волшебные существа.

Некоторые из них обладали удивительными способностями.

Один мог слышать звуки на огромном расстоянии, другой отличался невероятной быстротой.

Герой понимал, что сила не всегда является главным преимуществом.

Верные друзья, мудрость и смелость помогали ему преодолевать препятствия.

Каждая новая встреча приближала его к разгадке судьбы братьев.`
        },

        {
            title: "Глава третья. Подземный мир",
            image: "images/chapter3.jpeg",
            text: `Во время странствий Ер Төстік оказался в загадочном подземном мире.

Здесь всё отличалось от привычной степи.

Герой столкнулся с опасностями, необычными существами и сложными испытаниями.

Но даже в самых трудных обстоятельствах он не терял надежды.

Важную роль в его приключениях играл верный конь Шалқұйрық.

Его помощь и преданность позволяли герою продолжать путь.

Ер Төстік понимал, что выбраться из подземного мира можно только благодаря смелости и находчивости.`
        },

        {
            title: "Глава четвёртая. Испытание героя",
            image: "images/chapter4.jpeg",
            text: `На пути Ер Төстіка появлялись всё новые препятствия.

Ему приходилось принимать трудные решения и помогать тем, кто оказался в беде.

Герой встречал друзей, готовых поддержать его в решающий момент.

Каждое испытание проверяло не только его силу, но и характер.

Он учился доверять товарищам и ценить верность.

Постепенно Ер Төстік приближался к возвращению домой.

Но впереди его ждало последнее испытание.`
        },

        {
            title: "Глава пятая. Возвращение домой",
            image: "images/chapter5.jpeg",
            text: `После долгих странствий Ер Төстік сумел преодолеть все препятствия.

Он вернулся из подземного мира и вновь увидел родную степь.

Герой понял, насколько важны семья, дружба и верность.

Его путешествие стало примером мужества и настойчивости.

История Ер Төстіка передавалась от поколения к поколению.

В ней сохранились древние представления народа о добре, смелости и взаимопомощи.

Так завершилось великое путешествие героя, чьё имя навсегда осталось в казахских сказаниях.`
        }
    ];

    let pageFlip = null;

    function createBookPages() {
        const book = $("#flipBook");
        if (!book) return [];

        book.innerHTML = "";
        const pages = [];

        function addPage(className, content, hard = false) {
            const page = document.createElement("div");
            page.className = `book-page ${className}`;
            if (hard) page.dataset.density = "hard";
            page.innerHTML = content;
            book.appendChild(page);
            pages.push(page);
        }

        addPage("book-page-cover", `
            <span style="font-size:55px;color:#e7c68a">❖</span>
            <p>ЛЕГЕНДЫ ВЕЛИКОЙ СТЕПИ</p>
            <h2>Ер Төстік</h2>
            <p>КНИГА ДРЕВНИХ СКАЗАНИЙ</p>
        `, true);

        chapters.forEach((chapter, index) => {
            const textPage = document.createElement("div");
            const title = document.createElement("h3");
            title.textContent = chapter.title;
            const story = document.createElement("p");
            story.textContent = chapter.text;
            textPage.append(title, story);

            const page = document.createElement("div");
            page.className = "book-page book-page-text";
            page.append(textPage);
            book.appendChild(page);
            pages.push(page);

            const imagePage = document.createElement("div");
            imagePage.className = "book-page book-page-image";
            const image = document.createElement("img");
            image.src = chapter.image;
            image.alt = chapter.title;
            image.draggable = false;
            imagePage.append(image);
            book.appendChild(imagePage);
            pages.push(imagePage);
        });

        addPage("book-page-cover", `
            <span style="font-size:55px;color:#e7c68a">✦</span>
            <h2>Конец сказания</h2>
            <p>ЕР ТӨСТІК</p>
            <p>ЛЕГЕНДЫ ВЕЛИКОЙ СТЕПИ</p>
        `, true);

        return pages;
    }

    function initializeBook() {
        if (pageFlip) return true;

        if (!window.St?.PageFlip) {
            console.error("Библиотека PageFlip не загружена.");
            return false;
        }

        const book = $("#flipBook");
        if (!book) return false;

        const pages = createBookPages();

        pageFlip = new St.PageFlip(book, {
            width: 400,
            height: 520,
            size: "stretch",
            minWidth: 250,
            maxWidth: 400,
            minHeight: 325,
            maxHeight: 520,
            showCover: true,
            drawShadow: true,
            flippingTime: reducedMotion ? 250 : 900,
            usePortrait: true,
            mobileScrollSupport: false,
            autoSize: true,
            maxShadowOpacity: 0.5,
            startPage: 0
        });

        pageFlip.loadFromHTML(pages);

        pageFlip.on("flip", () => {
            updateBookButtons();
            playPageSound();
        });

        updateBookButtons();
        return true;
    }

    function updateBookButtons() {
        if (!pageFlip) return;

        const index = pageFlip.getCurrentPageIndex();
        const total = pageFlip.getPageCount();
        const prev = $("#prevPage");
        const next = $("#nextPage");
        const counter = $("#pageCounter");

        if (prev) prev.disabled = index === 0;
        if (next) next.disabled = index >= total - 1;
        if (counter) counter.textContent = `${index + 1} / ${total}`;
    }

    $("#openBook")?.addEventListener("click", () => {
        openOverlay("#bookOverlay");

        requestAnimationFrame(() => {
            if (!initializeBook()) {
                closeOverlay("#bookOverlay");
                alert("Не удалось открыть книгу. Проверьте подключение PageFlip.");
                return;
            }

            pageFlip.update();
            pageFlip.turnToPage(0);
            updateBookButtons();
        });
    });

    $("#closeBook")?.addEventListener("click", () => {
        closeOverlay("#bookOverlay");
    });

    $("#prevPage")?.addEventListener("click", () => {
        pageFlip?.flipPrev();
    });

    $("#nextPage")?.addEventListener("click", () => {
        pageFlip?.flipNext();
    });

    window.addEventListener("resize", () => {
        if ($("#bookOverlay")?.classList.contains("active") && pageFlip) {
            pageFlip.update();
            updateBookButtons();
        }
    });

    const nightStories = {
        voice: {
            title: "Голос в степи",
            text: `Однажды путник возвращался домой через бескрайнюю степь.

Солнце давно скрылось, а над землёй поднялся холодный ветер.

Внезапно он услышал голос, который звал его по имени.

Путник остановился.

Вокруг не было ни души.

Голос прозвучал снова, теперь совсем рядом.

Он вспомнил слова старейшин: не отвечай на незнакомый зов посреди ночной степи.

Путник продолжил идти, не оборачиваясь.

Вскоре впереди появились огни родного аула.

Когда он добрался домой, голос исчез.

Но ещё долго путнику казалось, что кто-то тихо зовёт его из темноты.

Это художественная история, вдохновлённая атмосферой степных преданий.`
        },

        yurt: {
            title: "Забытая юрта",
            text: `Однажды ночью молодой всадник увидел вдалеке одинокую юрту.

Вокруг неё не было ни скота, ни людей.

Однако изнутри доносился тихий разговор.

Всадник подошёл ближе и осторожно приподнял полог.

Внутри горел огонь, стояла посуда, но никого не было.

Вдруг за его спиной послышались шаги.

Он обернулся и увидел лишь пустую степь.

Когда всадник снова посмотрел на юрту, она исчезла.

На её месте лежали только сухие травы.

Вернувшись домой, он рассказал об этом старейшинам.

Те ответили, что в степи иногда встречаются места, где прошлое словно оживает.

Это вымышленное предание.`
        },

        shadow: {
            title: "Тень у колодца",
            text: `На окраине старого аула стоял глубокий колодец.

Днём жители спокойно набирали из него воду.

Но ночью к колодцу старались не приближаться.

Однажды девушка увидела возле него неподвижную тень.

Ей показалось, что кто-то ждёт у края.

Она позвала незнакомца, но никто не ответил.

Тень медленно исчезла в темноте.

Наутро девушка рассказала о случившемся бабушке.

Та объяснила, что ночью обычные предметы могут казаться необычными и пугающими.

Однако история о таинственной тени ещё долго передавалась среди жителей аула.

Это художественная легенда.`
        }
    };

    $$("[data-night]").forEach(button => {
        button.addEventListener("click", () => {
            const story = nightStories[button.dataset.night];
            if (!story) return;

            $("#nightTitle").textContent = story.title;
            $("#nightText").textContent = story.text;

            openOverlay("#nightOverlay");
            playMagic();
        });
    });

    $("#closeNight")?.addEventListener("click", () => {
        closeOverlay("#nightOverlay");
    });

    $$(".belief-card").forEach(card => {
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-expanded", "false");

        function toggleBelief() {
            const active = card.classList.toggle("active");

            card.setAttribute(
                "aria-expanded",
                String(active)
            );

            playPageSound();
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
            title: "Зов древней степи",
            text: `В одну из безлунных ночей молодой путник услышал мелодию домбры.

Она доносилась из-за далёких холмов.

Следуя за звуком, он увидел старую юрту, освещённую мягким светом.

У входа сидел пожилой музыкант.

Он играл кюй, который путник никогда раньше не слышал.

Когда мелодия закончилась, музыкант сказал:

«Пока люди помнят песни предков, степь не потеряет свой голос».

На рассвете юрта исчезла.

Но путник запомнил мелодию и передал её своим детям.`
        },

        {
            title: "Хранитель кургана",
            text: `Среди холмов стоял древний курган.

Местные жители относились к нему с уважением и не тревожили его.

Однажды молодой человек заметил возле кургана необычный свет.

Подойдя ближе, он увидел фигуру в старинной одежде.

Незнакомец спросил:

«Что ты ищешь здесь?»

Юноша ответил, что хочет узнать историю своего народа.

Фигура указала на далёкую степь.

«Слушай рассказы старших, изучай прошлое и береги землю».

После этих слов свет погас.

Юноша вернулся домой и начал записывать истории своих родственников.`
        },

        {
            title: "Последний огонь аула",
            text: `Много лет назад в степи существовал небольшой аул.

Однажды его жители решили переселиться в другое место.

Но один старый хранитель остался, чтобы сохранить память о родном доме.

Каждую ночь он зажигал светильник возле своей юрты.

Проходящие путники видели этот огонь издалека.

Однажды свет исчез.

Наутро люди нашли пустую стоянку.

С тех пор в некоторых рассказах говорится, что в тихие ночи среди степи можно увидеть одинокий огонёк.

Он напоминает о людях, когда-то живших на этой земле.`
        },

        {
            title: "Тайна лунного озера",
            text: `На краю степи находилось небольшое озеро.

Старики рассказывали, что в полнолуние его поверхность становится похожей на зеркало.

Однажды девушка пришла туда и увидела отражение старинного аула.

Она обернулась, но позади была только пустая степь.

В отражении люди готовили еду, разговаривали и играли на домбре.

Девушка долго смотрела на воду.

Когда облако закрыло луну, видение исчезло.

Она вернулась домой и рассказала об увиденном.

Бабушка сказала ей:

«Иногда память о прошлом живёт в историях, которые мы рассказываем».

С тех пор девушка стала собирать легенды своего края.`
        }
    ];

    let lastSecretIndex = -1;
    let doorBusy = false;

    function showRandomSecret() {
        let index;

        do {
            index = Math.floor(
                Math.random() * secretStories.length
            );
        } while (
            secretStories.length > 1 &&
            index === lastSecretIndex
        );

        lastSecretIndex = index;

        $("#secretTitle").textContent = secretStories[index].title;
        $("#secretText").textContent = secretStories[index].text;

        openOverlay("#secretOverlay");
        playMagic();
    }

    $("#secretDoor")?.addEventListener("click", async () => {
        if (doorBusy) return;

        doorBusy = true;

        const door = $("#secretDoor");
        door.classList.add("opening");

        playTone(110, 1.3, "sawtooth", 0.025);

        await wait(reducedMotion ? 150 : 2100);

        showRandomSecret();

        await wait(300);

        door.classList.remove("opening");
        doorBusy = false;
    });

    $("#secretAgain")?.addEventListener("click", showRandomSecret);

    $("#secretClose")?.addEventListener("click", () => {
        closeOverlay("#secretOverlay");
        $("#secretDoor")?.classList.remove("opening");
    });

    const archiveStories = {
        scroll: {
            title: "Забытый свиток",
            text: `Среди старых вещей одного путешественника нашли свиток.

На нём были записаны слова неизвестного сказителя.

Он рассказывал о степи, где люди всегда помогали заблудившимся путникам.

Однажды сильная буря скрыла все дороги.

Жители аула зажгли огни и вышли навстречу странникам.

Благодаря их доброте путешественники нашли безопасный путь.

Последняя строка свитка гласила:

«Истинное богатство народа — в его памяти, мудрости и гостеприимстве».

Это художественная история.`
        },

        keeper: {
            title: "Последний хранитель",
            text: `В старинной библиотеке хранились рукописи с легендами Великой степи.

Много лет за ними ухаживал пожилой хранитель.

Он знал каждую историю и мог часами рассказывать о древних героях.

Однажды к нему пришла девушка, желавшая узнать прошлое своей семьи.

Хранитель передал ей старую книгу.

«Каждое поколение должно сохранить хотя бы одну историю», — сказал он.

Девушка начала читать, записывать и пересказывать легенды.

Так древние сказания обрели новых слушателей.`
        }
    };

    function showArchiveStory(title, text) {
        $("#archiveTitle").textContent = title;
        $("#archiveText").textContent = text;
        $("#archivePuzzle").hidden = true;

        openOverlay("#archiveOverlay");
        playPageSound();
    }

    $$("[data-archive]").forEach(button => {
        button.addEventListener("click", () => {
            const type = button.dataset.archive;

            if (type === "locked") {
                $("#archiveTitle").textContent = "Запечатанная книга";
                $("#archiveText").textContent =
                    "Чтобы открыть древнюю книгу, разгадайте загадку.";

                $("#archivePuzzle").hidden = false;
                $("#archiveAnswer").value = "";
                $("#archiveResult").textContent = "";

                openOverlay("#archiveOverlay");
                playMagic();
                return;
            }

            const story = archiveStories[type];
            if (!story) return;

            showArchiveStory(story.title, story.text);
        });
    });

    $("#archiveUnlock")?.addEventListener("click", () => {
        const answer = $("#archiveAnswer").value
            .trim()
            .toLowerCase()
            .replace(/[.!?]/g, "");

        const correctAnswers = [
            "имя",
            "мое имя",
            "моё имя",
            "есім",
            "атың",
            "атым"
        ];

        if (correctAnswers.includes(answer)) {
            $("#archiveResult").textContent =
                "✦ Печать разрушена. Книга открыта!";

            $("#archiveText").textContent = `На страницах древней книги была записана история о молодом сказителе.

Он путешествовал по аулам и собирал забытые предания.

Каждый человек делился с ним одной историей.

Постепенно сказитель понял, что память народа хранится не в одном месте, а в сердцах многих людей.

Вернувшись домой, он собрал все рассказы в большую книгу.

Так появилось собрание историй, которое передавалось следующим поколениям.`;

            $("#archivePuzzle").hidden = true;
            playSuccess();
        } else {
            $("#archiveResult").textContent =
                "Ответ неверный. Попробуйте ещё раз.";
        }
    });

    $("#archiveAnswer")?.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            $("#archiveUnlock").click();
        }
    });

    $("#archiveClose")?.addEventListener("click", () => {
        closeOverlay("#archiveOverlay");
    });

    const guardianQuestions = [
        {
            question: "Кто является главным героем сказки «Ер Төстік»?",
            answers: [
                "Алпамыс",
                "Ер Төстік",
                "Қобыланды",
                "Қорқыт"
            ],
            correct: 1,
            explanation: "Ер Төстік — главный герой одноимённой казахской волшебной сказки."
        },

        {
            question: "Какое существо известно металлическими когтями?",
            answers: [
                "Албасты",
                "Жезтырнақ",
                "Самұрық",
                "Жалмауыз кемпір"
            ],
            correct: 1,
            explanation: "Название Жезтырнақ связано с металлическими когтями."
        },

        {
            question: "Как зовут верного коня Ер Төстіка?",
            answers: [
                "Тайбурыл",
                "Құлагер",
                "Шалқұйрық",
                "Байшұбар"
            ],
            correct: 2,
            explanation: "Шалқұйрық — волшебный конь Ер Төстіка."
        },

        {
            question: "Что традиционно символизирует домашний очаг?",
            answers: [
                "Только богатство",
                "Тепло и благополучие семьи",
                "Дорогу",
                "Военную победу"
            ],
            correct: 1,
            explanation: "Домашний очаг связан с теплом, жизнью и семейным благополучием."
        },

        {
            question: "Что помогает героям народных сказок преодолевать испытания?",
            answers: [
                "Только богатство",
                "Только сила",
                "Смелость, мудрость и помощь друзей",
                "Случайность"
            ],
            correct: 2,
            explanation: "Казахские сказки часто подчёркивают смелость, находчивость и верность."
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

        $("#guardianQuestion").textContent = question.question;
        $("#guardianFeedback").textContent = "";
        $("#guardianNext").hidden = true;

        const container = $("#guardianAnswers");
        container.replaceChildren();

        question.answers.forEach((answer, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.textContent = answer;

            button.addEventListener("click", () => {
                selectGuardianAnswer(index);
            });

            container.appendChild(button);
        });
    }

    function selectGuardianAnswer(index) {
        if (guardianAnswered) return;

        guardianAnswered = true;

        const question = guardianQuestions[guardianIndex];

        $$("#guardianAnswers button").forEach((button, i) => {
            button.disabled = true;

            if (i === question.correct) {
                button.classList.add("correct");
            }

            if (i === index && i !== question.correct) {
                button.classList.add("wrong");
            }
        });

        if (index === question.correct) {
            guardianScore++;

            $("#guardianFeedback").textContent =
                `✦ Правильно! ${question.explanation}`;

            playSuccess();
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

        let rank;
        let message;

        if (guardianScore === 5) {
            rank = "Великий хранитель";
            message = "Вы прекрасно знаете легенды Великой степи!";
        } else if (guardianScore >= 3) {
            rank = "Хранитель преданий";
            message = "Вы хорошо знакомы с народными сказаниями!";
        } else {
            rank = "Ученик хранителя";
            message = "Ваш путь к древним знаниям только начинается.";
        }

        $("#guardianResultTitle").textContent =
            "Испытание завершено";

        $("#guardianResultText").textContent = message;

        $("#guardianScore").textContent =
            `Правильных ответов: ${guardianScore} из ${guardianQuestions.length}`;

        $("#certificateRank").textContent = rank;

        $("#certificateScore").textContent =
            `Результат: ${guardianScore} / ${guardianQuestions.length}`;

        playMagic();
    }

    $("#startGuardian")?.addEventListener(
        "click",
        startGuardianQuiz
    );

    $("#guardianNext")?.addEventListener("click", () => {
        if (!guardianAnswered) return;

        guardianIndex++;

        if (guardianIndex >= guardianQuestions.length) {
            finishGuardianQuiz();
        } else {
            showGuardianQuestion();
        }
    });

    $("#restartGuardian")?.addEventListener(
        "click",
        startGuardianQuiz
    );

    $("#saveCertificate")?.addEventListener("click", async () => {
        if (typeof html2canvas === "undefined") {
            alert("Библиотека сохранения не загрузилась.");
            return;
        }

        const button = $("#saveCertificate");
        const certificate = $("#guardianCertificate");

        button.disabled = true;
        button.textContent = "Сохранение...";

        try {
            const canvas = await html2canvas(certificate, {
                backgroundColor: "#e7d3ae",
                scale: 2,
                useCORS: true
            });

            const link = document.createElement("a");

            link.href = canvas.toDataURL("image/png");
            link.download = "steppe-guardian-certificate.png";

            document.body.appendChild(link);
            link.click();
            link.remove();

        } catch (error) {
            console.error(error);
            alert("Не удалось сохранить награду.");
        } finally {
            button.disabled = false;
            button.textContent = "↓ Сохранить награду";
        }
    });

    const places = {
        burabay: {
            title: "Бурабай",
            region: "Акмолинская область",
            story: `Бурабай известен живописными озёрами, скалами и сосновыми лесами.

С этими местами связано множество народных легенд.

Особенно известны рассказы о скале Жұмбақтас и горе Оқжетпес.

В легендах природные образования становятся свидетелями человеческих судеб, любви и смелости.

Бурабай остаётся одним из самых известных мест Казахстана, где природа тесно переплетается с преданиями.`
        },

        bayanaul: {
            title: "Баянауыл",
            region: "Павлодарская область",
            story: `Баянауыл славится необычными скалами, озёрами и красивыми горными пейзажами.

Многие природные объекты имеют собственные названия и связанные с ними истории.

Озеро Жасыбай и окружающие горы занимают особое место в местных преданиях.

Это место напоминает о том, как природа вдохновляла народных рассказчиков.`
        },

        altynemel: {
            title: "Алтынемель",
            region: "Жетысуская область",
            story: `Национальный парк Алтынемель известен своими необычными природными ландшафтами.

Одна из главных достопримечательностей — Поющий бархан.

При определённых условиях песок может издавать низкий гул.

В прошлом необычные звуки могли вызывать у путешественников удивление и становиться основой различных рассказов.

Сегодня это явление объясняется физическими свойствами движущегося песка.`
        },

        tamgaly: {
            title: "Тамгалы",
            region: "Алматинская область",
            story: `Тамгалы — знаменитое место с древними наскальными изображениями.

На камнях сохранились петроглифы, созданные людьми в разные исторические эпохи.

Особое внимание привлекают изображения солнцеголовых фигур.

Они позволяют исследователям изучать древние представления и культуру населения региона.

Тамгалы является важным памятником археологического наследия Казахстана.`
        },

        ulytau: {
            title: "Улытау",
            region: "Область Ұлытау",
            story: `Улытау занимает важное место в истории Казахстана.

С этим регионом связаны предания о правителях, героях и древних событиях.

Здесь находятся исторические памятники и места памяти.

В народных рассказах горы Улытау нередко предстают свидетелями значимых событий прошлого.

Это место символизирует связь поколений и историческую память.`
        },

        aral: {
            title: "Арал",
            region: "Кызылординская область",
            story: `Аральское море занимает особое место в истории Центральной Азии.

Вокруг него существовали рассказы о рыбаках, далёких берегах и необычных явлениях природы.

Сегодня история Арала прежде всего связана с серьёзными экологическими изменениями.

Его судьба напоминает о важности бережного отношения к природе.

Для нашего сайта это место становится символом памяти о прошлом и ответственности за будущее.`
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
            playPageSound();
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
                $("#closeBook")?.click();
            } else {
                closeOverlay(selector);
            }
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            const activeOverlay = overlaySelectors
                .map(selector => $(selector))
                .reverse()
                .find(overlay => overlay?.classList.contains("active"));

            if (!activeOverlay) return;

            if (activeOverlay.id === "bookOverlay") {
                $("#closeBook")?.click();
            } else {
                closeOverlay(`#${activeOverlay.id}`);
            }
        }

        if ($("#bookOverlay")?.classList.contains("active") && pageFlip) {
            if (event.key === "ArrowRight") {
                event.preventDefault();
                pageFlip.flipNext();
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                pageFlip.flipPrev();
            }
        }
    });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopWind();
        } else if (soundEnabled) {
            startWind();
        }
    });

    window.addEventListener("pagehide", stopWind);

    const topButton = $(".floating-top");

    function updateTopButton() {
        if (!topButton) return;

        topButton.style.opacity =
            window.scrollY > 350 ? "1" : "0";

        topButton.style.pointerEvents =
            window.scrollY > 350 ? "auto" : "none";
    }

    window.addEventListener("scroll", updateTopButton, {
        passive: true
    });

    updateTopButton();
});
