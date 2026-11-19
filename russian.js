
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const $ = selector => document.querySelector(selector);
    const $$ = selector => [...document.querySelectorAll(selector)];

    const creatures = {
        leshy: {
            title: "Леший",
            image: "images/russian-leshy.jpeg",
            text: `Леший — дух-хозяин леса, который не имеет постоянного облика и способен менять внешность.

По народным поверьям, он подражал человеческим голосам, сбивал путников с дороги и мог внезапно исчезнуть среди деревьев.

Иногда его представляли огромным существом, похожим на дерево, а иногда — обычным человеком.

Встреча с Лешим напоминала людям о том, что к лесу следует относиться с уважением.`,
            features: [
                "Владения: лес и чаща",
                "Облик: изменчивый",
                "Способности: подражание голосам и запутывание дорог"
            ]
        },
        vodyanoy: {
            title: "Водяной",
            image: "images/russian-vodyanoy.jpeg",
            text: `Водяной — дух-хозяин рек, озёр и болот.

Его часто представляли стариком с рыбьими чертами, покрытым тиной и водорослями.

В старинных рассказах он мог появляться возле глубоких водоёмов, пугать рыбаков и заманивать людей к воде.

Предания о Водяном отражали осторожное отношение людей к опасным глубинам.`,
            features: [
                "Владения: реки, озёра и болота",
                "Облик: старик с чертами водного существа",
                "Приметы: всплески, круги на воде, голоса у берега"
            ]
        },
        domovoy: {
            title: "Домовой",
            image: "images/russian-domovoy.jpeg",
            text: `Домовой — дух-покровитель дома.

В народных поверьях его представляли небольшим косматым стариком, который живёт возле печи или в укромном уголке жилища.

Считалось, что Домовой заботится о доме, охраняет семейный покой и может предупреждать хозяев об опасности.

Но если в доме постоянно ссорились, он мог шуметь по ночам и тревожить жильцов.`,
            features: [
                "Владения: дом и хозяйство",
                "Облик: маленький косматый старик",
                "Приметы: шаги, скрип половиц, шорох за печью"
            ]
        }
    };

    const chapters = [
        {
            title: "Глава 1. Дорога в забытый лес",
            image: "images/russian-chapter1.jpeg",
            text: `Егор отправился в соседнюю деревню до захода солнца. Старики предупреждали его не сворачивать с главной дороги, но он не придал их словам значения.

Когда небо потемнело, знакомая тропа исчезла. Вокруг стояли высокие деревья, которых он раньше никогда не видел.

Егор поднял фонарь. Вдалеке послышались шаги.

— Кто здесь? — спросил он.

Никто не ответил.

Но через мгновение из лесной темноты кто-то тихо произнёс его имя.`
        },
        {
            title: "Глава 2. Тот, кто зовёт по имени",
            image: "images/russian-chapter2.jpeg",
            text: `Егор пошёл на голос, надеясь встретить человека.

Внезапно деревья зашевелились, хотя ветра не было. Из темноты выступила огромная фигура, покрытая корой, мхом и сухими ветвями.

Перед ним стоял Леший — хозяин леса.

— Зачем пришёл в мои владения? — раздался низкий голос.

— Я ищу дорогу домой, — ответил Егор.

Леший долго смотрел на путника.

— Не всякий, кто входит в этот лес, способен найти выход. Ищи озеро, но не верь каждому голосу.

После этих слов существо исчезло среди деревьев.`
        },
        {
            title: "Глава 3. Тайна чёрного озера",
            image: "images/russian-chapter3.jpeg",
            text: `В полночь Егор добрался до озера. Его поверхность была совершенно неподвижной.

Вдруг из глубины донёсся голос:

— Егор, подойди ближе.

Путник остановился. Голос был похож на голос его старого друга.

Из воды медленно поднялась фигура с длинными мокрыми волосами и зеленоватой кожей.

Это был Водяной.

— Я знаю короткий путь домой, — произнёс он. — Сделай лишь один шаг ко мне.

Егор вспомнил предупреждение Лешего и отступил.

Водяной замолчал. Вода покрылась кругами, а за спиной путника появилась узкая тропа.`
        },
        {
            title: "Глава 4. Незваный гость",
            image: "images/russian-chapter4.jpeg",
            text: `Тропа привела Егора к старой деревянной избе.

Дверь была приоткрыта. Внутри горел слабый огонь, хотя вокруг не было ни одного человека.

Егор вошёл и услышал тихий скрип половиц.

— Кто здесь? — прошептал он.

Из-за печи показался маленький косматый старик с внимательными глазами.

Это был Домовой.

— Не каждый гость приходит сюда случайно, — сказал он.

Домовой указал на старый деревянный ключ возле очага.

— До рассвета ты должен вспомнить, зачем отправился в дорогу. Только тогда лес отпустит тебя.`
        },
        {
            title: "Глава 5. Последний рассвет",
            image: "images/russian-chapter5.jpeg",
            text: `Егор взял ключ и вышел из избы.

Впервые за всю ночь он увидел между деревьями свет. Лес больше не казался бесконечным.

Он вспомнил родную деревню, свой дом и людей, которые ждали его возвращения.

С первыми лучами солнца перед ним открылась знакомая долина.

Егор обернулся. Ни избы, ни таинственной тропы уже не было.

Только на земле лежала маленькая ветка, покрытая мхом.

Он вернулся домой, но с тех пор никогда не смеялся над древними преданиями.

А иногда по ночам ему казалось, что за окном кто-то тихо произносит его имя.`
        }
    ];

    const nightStories = {
        path: {
            title: "Тропа, которой не было",
            text: `Поздним вечером лесник возвращался домой по знакомой дороге.

Вдруг он услышал голос брата, который звал его из-за деревьев.

Лесник свернул на зов, но вскоре понял, что не узнаёт ни одного дерева.

Голос повторял его имя, то приближаясь, то отдаляясь.

Тогда он остановился и дождался рассвета.

Утром оказалось, что всю ночь он кружил вокруг одной старой сосны.

С тех пор в деревне говорили: не каждый голос в лесу принадлежит человеку.`
        },
        light: {
            title: "Голос из чёрной воды",
            text: `Один рыбак задержался у озера до глубокой ночи.

Когда он собирал снасти, из темноты раздался знакомый голос.

— Подойди, помоги мне, — просил кто-то с воды.

Рыбак поднял фонарь, но не увидел ни лодки, ни человека.

Только круги расходились по совершенно тихой поверхности.

Он отступил от берега и поспешил домой.

А утром старики сказали, что у этого озера давно рассказывают истории о Водяном.`
        },
        village: {
            title: "Шаги за печью",
            text: `В старой избе молодая хозяйка каждую ночь слышала тихие шаги.

Половицы поскрипывали, будто кто-то обходил дом и проверял двери.

Однажды она оставила у печи блюдце молока и произнесла слова приветствия невидимому хозяину.

На следующую ночь в доме стало тихо.

Только кот долго смотрел в угол возле печи.

Соседи говорили, что так Домовой напоминал о своём присутствии.`
        }
    };

    const secrets = [
        {
            title: "Шёпот у старой сосны",
            text: `Говорили, что в самом сердце леса растёт сосна, которая помнит все дороги.

Если путник приходит с добрыми намерениями, ветер среди её ветвей будто подсказывает путь.

Но тому, кто смеётся над лесом, каждая тропа кажется одинаковой.`
        },
        {
            title: "Три стука в ночи",
            text: `По одному из поверий, три тихих стука в старом доме могли быть знаком Домового.

Люди старались не пугаться, а прислушиваться к тому, что происходит вокруг.`
        },
        {
            title: "Отражение без звука",
            text: `Старики рассказывали о лесном озере, где в безветренную ночь отражались не только деревья, но и чужие воспоминания.

Никто не знал, откуда взялась эта история, но у воды всегда говорили тише.`
        }
    ];

    const archives = {
        mirror: {
            title: "Старинное зеркало",
            text: `С зеркалами связывали многочисленные приметы и гадательные обычаи.

Их поверхность казалась загадочной, ведь отражение повторяло привычный мир, но не позволяло прикоснуться к нему.

Это пример народных представлений, а не доказательство сверхъестественных свойств.`
        },
        chest: {
            title: "Сундук с оберегами",
            text: `В сундуках хранили памятные вещи, вышитые полотенца и предметы, которым в разных местностях приписывали защитное значение.

Узоры и семейные реликвии напоминали о предках и домашних традициях.`
        },
        key: {
            title: "Ключ от тайны",
            text: `На крышке старинного сундука вырезана загадка.

Разгадайте её, чтобы прочитать спрятанную запись.`
        }
    };

    const places = {
        leshy: {
            title: "Леший",
            region: "Глухая чаща",
            story: "В старом лесу путники слышали чужие голоса и теряли знакомые тропы. По поверьям, так мог шалить Леший."
        },
        domovoy: {
            title: "Домовой",
            region: "Изба у опушки",
            story: "В тёплой избе за печью будто кто-то тихо ходит по ночам. Старики называли невидимого хранителя Домовым."
        },
        vodyanoy: {
            title: "Водяной",
            region: "Чёрное озеро",
            story: "У заросшего озера люди рассказывали о хозяине глубин, который появляется в тумане и зовёт прохожих."
        },
        oak: {
            title: "Древний дуб",
            region: "Сердце леса",
            story: "Согласно нашей вымышленной легенде, под ветвями древнего дуба можно услышать шёпот давно забытых дорог."
        },
        ruins: {
            title: "Забытые руины",
            region: "Каменные арки",
            story: "Старинные арки скрылись среди деревьев. Никто не помнит, кто их построил и куда вела дорога."
        },
        door: {
            title: "Тайная дверь",
            region: "Лесные ворота",
            story: "За резной дверью среди деревьев прячутся предания, которые не рассказывают при дневном свете."
        },
        beliefs: {
            title: "Запретные поверья",
            region: "Тёмная пещера",
            story: "В пещере хранятся рассказы о запретах и приметах, которыми когда-то объясняли неизвестное."
        }
    };

    const questions = [
        {
            question: "Кого считали хозяином леса?",
            answers: ["Домового", "Лешего", "Водяного", "Кузнеца"],
            correct: 1,
            explanation: "Лешего считали хозяином леса."
        },
        {
            question: "Где обитал Водяной?",
            answers: ["В печи", "В поле", "В реках и озёрах", "На чердаке"],
            correct: 2,
            explanation: "Водяного связывали с водоёмами."
        },
        {
            question: "Кого считали покровителем дома?",
            answers: ["Лешего", "Домового", "Водяного", "Лесника"],
            correct: 1,
            explanation: "Домового представляли хранителем жилища."
        },
        {
            question: "Какую способность приписывали Лешему?",
            answers: ["Управление огнём", "Изменение облика", "Создание молний", "Превращение воды в лёд"],
            correct: 1,
            explanation: "По поверьям, Леший мог менять внешность."
        },
        {
            question: "Где, по поверьям, мог прятаться Домовой?",
            answers: ["За печью", "На дне озера", "В лесном болоте", "На вершине горы"],
            correct: 0,
            explanation: "Домового часто связывали с печью и домашними укромными местами."
        }
    ];

    const overlays = [
        "#creatureModal",
        "#bookOverlay",
        "#nightOverlay",
        "#secretOverlay",
        "#archiveOverlay",
        "#mapOverlay"
    ];

    const soundFiles = {
        forest: "sounds/russian-forest.mp3",
        leshy: "sounds/russian-leshy.mp3",
        vodyanoy: "sounds/russian-vodyanoy.mp3",
        domovoy: "sounds/russian-domovoy.mp3",
        page: "sounds/page.wav",
        door: "sounds/door.wav",
        night: "sounds/russian-night.mp3",
        click: "sounds/russian-click.mp3"
    };

    const audio = {};
    let soundEnabled = false;

    Object.entries(soundFiles).forEach(([name, path]) => {
        audio[name] = new Audio(path);
        audio[name].preload = "none";
        audio[name].volume = name === "forest" ? 0.15 : 0.35;
    });

    audio.forest.loop = true;

    function playSound(name) {
        if (!soundEnabled || !audio[name]) return;

        audio[name].pause();
        audio[name].currentTime = 0;
        audio[name].play().catch(() => {});
    }

    $("#soundToggle")?.addEventListener("click", () => {
        soundEnabled = !soundEnabled;

        $("#soundToggle").textContent = soundEnabled
            ? "🔊 Звук включён"
            : "🔇 Звук выключен";

        if (soundEnabled) {
            audio.forest.play().catch(() => {});
        } else {
            Object.values(audio).forEach(a => {
                a.pause();
                a.currentTime = 0;
            });
        }
    });

    function openOverlay(selector) {
        $(selector)?.classList.add("open", "active");
        document.body.classList.add("modal-open");
    }

    function closeOverlay(selector) {
        $(selector)?.classList.remove("open", "active");

        if (!overlays.some(s => $(s)?.classList.contains("open"))) {
            document.body.classList.remove("modal-open");
        }
    }

    const closeButtons = {
        "#closeModal": "#creatureModal",
        "#closeBook": "#bookOverlay",
        "#closeNight": "#nightOverlay",
        "#secretClose": "#secretOverlay",
        "#archiveClose": "#archiveOverlay",
        "#mapClose": "#mapOverlay"
    };

    Object.entries(closeButtons).forEach(([button, overlay]) => {
        $(button)?.addEventListener("click", () => closeOverlay(overlay));
    });

    overlays.forEach(selector => {
        $(selector)?.addEventListener("click", event => {
            if (event.target === event.currentTarget) {
                closeOverlay(selector);
            }
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            overlays.forEach(closeOverlay);
        }
    });

    $$("[data-creature]").forEach(button => {
        button.addEventListener("click", () => {
            const creature = creatures[button.dataset.creature];
            if (!creature) return;

            $("#modalTitle").textContent = creature.title;
            $("#modalText").textContent = creature.text;
            $("#modalImage").src = creature.image;
            $("#modalImage").alt = creature.title;

            const features = $("#modalFeatures");
            features.replaceChildren();

            creature.features.forEach(value => {
                const p = document.createElement("p");
                p.textContent = value;
                features.append(p);
            });

            playSound(button.dataset.creature);
            openOverlay("#creatureModal");
        });
    });

    const bookElement = $("#flipBook");
    const bookOverlay = $("#bookOverlay");
    const previousPage = $("#prevPage");
    const nextPage = $("#nextPage");
    const pageCounter = $("#pageCounter");
    let pageFlip = null;

    function updateBookNavigation() {
        if (!pageFlip) return;
        const current = pageFlip.getCurrentPageIndex();
        const total = pageFlip.getPageCount();
        pageCounter.textContent = `${current + 1} / ${total}`;
        previousPage.disabled = current === 0;
        nextPage.disabled = current >= total - 1;
    }

    function centerClosedBook() {
        if (!pageFlip || !bookElement) return;
        const current = pageFlip.getCurrentPageIndex();
        const total = pageFlip.getPageCount();
        const wrapper = bookElement.querySelector(".stf__wrapper");
        const block = bookElement.querySelector(".stf__block");
        if (!wrapper || !block) return;
        const wrapperWidth = wrapper.getBoundingClientRect().width;
        const pageWidth = block.getBoundingClientRect().width / 2;

        if ((current === 0 || current === total - 1) && wrapperWidth > pageWidth) {
            const offset = (wrapperWidth - pageWidth) / 2;
            bookElement.style.transform = current === 0
                ? `translateX(-${offset}px)`
                : `translateX(${offset}px)`;
        } else {
            bookElement.style.transform = "translateX(0)";
        }
    }

    function updateBookLayout() {
        updateBookNavigation();
        requestAnimationFrame(centerClosedBook);
    }

    function initializeForestBook() {
        if (!bookElement || pageFlip) return;

        if (typeof St === "undefined" || !St.PageFlip) {
            bookElement.textContent = "Не удалось загрузить библиотеку перелистывания. Проверьте подключение к интернету.";
            return;
        }

        const pages = chapters.map((chapter, index) => `
            <div class="flip-page">
                <div class="flip-page-content forest-text-page">
                    <p class="book-chapter">ГЛАВА ${index + 1}</p>
                    <h3>${chapter.title}</h3>
                    <p class="forest-chapter-story"></p>
                    <span class="page-number">${index * 2 + 2}</span>
                </div>
            </div>

            <div class="flip-page">
                <div class="flip-page-content picture-content">
                    <img src="${chapter.image}" alt="${chapter.title}">
                    <p>${chapter.title}</p>
                    <span class="page-number">${index * 2 + 3}</span>
                </div>
            </div>
        `).join("");

        bookElement.innerHTML = `
            <div class="flip-page book-cover" data-density="hard">
                <div class="flip-page-content">
                    <p>АРХИВ НАРОДНЫХ ПРЕДАНИЙ</p>
                    <h2>Шёпот древнего леса</h2>
                    <p>Книга забытых преданий</p>
                </div>
            </div>

            ${pages}

            <div class="flip-page book-cover" data-density="hard">
                <div class="flip-page-content">
                    <h2>Конец сказания</h2>
                    <p>✧ За гранью сказаний ✧</p>
                </div>
            </div>
        `;

        bookElement.querySelectorAll(".forest-chapter-story").forEach((paragraph, index) => {
            paragraph.textContent = chapters[index].text;
        });

        pageFlip = new St.PageFlip(bookElement, {
            width: 400,
            height: 520,
            size: "stretch",
            minWidth: 250,
            maxWidth: 400,
            minHeight: 325,
            maxHeight: 520,
            showCover: true,
            drawShadow: true,
            flippingTime: 900,
            usePortrait: true,
            mobileScrollSupport: false,
            autoSize: true
        });

        pageFlip.loadFromHTML(bookElement.querySelectorAll(".flip-page"));

        pageFlip.on("flip", () => {
            updateBookLayout();
            playSound("page");
        });

        updateBookLayout();
    }

    $("#openBook")?.addEventListener("click", () => {
        openOverlay("#bookOverlay");

        requestAnimationFrame(() => {
            initializeForestBook();

            if (pageFlip) {
                pageFlip.update();
                updateBookLayout();
            }
        });
    });

    previousPage?.addEventListener("click", () => pageFlip?.flipPrev());
    nextPage?.addEventListener("click", () => pageFlip?.flipNext());

    document.addEventListener("keydown", event => {
        if (!bookOverlay?.classList.contains("open") || !pageFlip) return;

        if (event.key === "ArrowRight") pageFlip.flipNext();
        if (event.key === "ArrowLeft") pageFlip.flipPrev();
    });

    window.addEventListener("resize", () => {
        if (!bookOverlay?.classList.contains("open") || !pageFlip) return;

        pageFlip.update();
        updateBookLayout();
    });

    $$("[data-night]").forEach(button => {
        button.addEventListener("click", () => {
            const story = nightStories[button.dataset.night];
            if (!story) return;

            $("#nightTitle").textContent = story.title;
            $("#nightText").textContent = story.text;

            playSound("night");
            openOverlay("#nightOverlay");
        });
    });

    $$(".belief-card").forEach(card => {
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-expanded", "false");

        const toggle = () => {
            card.classList.toggle("active");

            card.setAttribute(
                "aria-expanded",
                String(card.classList.contains("active"))
            );

            playSound("click");
        };

        card.addEventListener("click", toggle);

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggle();
            }
        });
    });

    let secretIndex = -1;

    function nextSecret() {
        secretIndex = (secretIndex + 1) % secrets.length;

        $("#secretTitle").textContent = secrets[secretIndex].title;
        $("#secretText").textContent = secrets[secretIndex].text;

        playSound("door");
    }

    $("#secretDoor")?.addEventListener("click", () => {
        const door = $("#secretDoor");

        door.classList.add("opening");
        nextSecret();

        setTimeout(() => {
            openOverlay("#secretOverlay");
            door.classList.remove("opening");
        }, 1200);
    });

    $("#secretAgain")?.addEventListener("click", nextSecret);

    $$("[data-archive]").forEach(button => {
        button.addEventListener("click", () => {
            const item = archives[button.dataset.archive];
            if (!item) return;

            $("#archiveTitle").textContent = item.title;
            $("#archiveText").textContent = item.text;

            $("#archivePuzzle").hidden = button.dataset.archive !== "key";
            $("#archiveAnswer").value = "";
            $("#archiveResult").textContent = "";

            playSound("click");
            openOverlay("#archiveOverlay");
        });
    });

    function checkArchive() {
        const answer = $("#archiveAnswer")
            .value
            .trim()
            .toLowerCase()
            .replace(/ё/g, "е");

        $("#archiveResult").textContent = !answer
            ? "Введите ответ на загадку."
            : ["ветер", "ветерок"].includes(answer)
                ? "Верно! Тайная запись открыта: «Не всякая дорога видна глазам. Иногда путь подсказывает шёпот деревьев»."
                : "Попробуйте ещё раз. Подсказка: его слышно, но не видно.";

        if (["ветер", "ветерок"].includes(answer)) {
            playSound("page");
        }
    }

    $("#archiveUnlock")?.addEventListener("click", checkArchive);

    $("#archiveAnswer")?.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            checkArchive();
        }
    });

    let questionIndex = 0;
    let score = 0;
    let selected = null;

    function renderQuestion() {
        const question = questions[questionIndex];
        selected = null;

        $("#guardianProgress").textContent =
            `Вопрос ${questionIndex + 1} из ${questions.length}`;

        $("#guardianQuestion").textContent = question.question;
        $("#guardianFeedback").textContent = "";
        $("#guardianNext").hidden = true;

        const answers = $("#guardianAnswers");
        answers.replaceChildren();

        question.answers.forEach((value, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.textContent = value;

            button.addEventListener("click", () => {
                if (selected !== null) return;

                selected = index;

                const correct = index === question.correct;

                if (correct) {
                    score++;
                }

                [...answers.children].forEach((answer, i) => {
                    answer.disabled = true;

                    if (i === question.correct) {
                        answer.classList.add("correct");
                    } else if (i === index) {
                        answer.classList.add("wrong");
                    }
                });

                $("#guardianFeedback").textContent =
                    `${correct ? "Верно!" : "Не совсем."} ${question.explanation}`;

                $("#guardianNext").textContent =
                    questionIndex === questions.length - 1
                        ? "Узнать результат"
                        : "Следующий вопрос";

                $("#guardianNext").hidden = false;

                playSound("click");
            });

            answers.append(button);
        });
    }

    function finishQuiz() {
        $("#guardianQuiz").hidden = true;
        $("#guardianFinish").hidden = false;

        const rank = score === 5
            ? "Хранитель преданий"
            : score >= 3
                ? "Знаток древних поверий"
                : "Исследователь тайн";

        $("#guardianResultTitle").textContent = "Испытание завершено";

        $("#guardianResultText").textContent = score === 5
            ? "Вы отлично знаете мир древних поверий!"
            : "Спасибо за участие в испытании!";

        $("#guardianScore").textContent =
            `Правильных ответов: ${score} из ${questions.length}`;

        $("#certificateRank").textContent = rank;

        $("#certificateScore").textContent =
            `${score} из ${questions.length} правильных ответов`;
    }

    function startQuiz() {
        questionIndex = 0;
        score = 0;

        $("#guardianStart").hidden = true;
        $("#guardianFinish").hidden = true;
        $("#guardianQuiz").hidden = false;

        renderQuestion();
    }

    $("#startGuardian")?.addEventListener("click", startQuiz);
    $("#restartGuardian")?.addEventListener("click", startQuiz);

    $("#guardianNext")?.addEventListener("click", () => {
        if (selected === null) return;

        questionIndex++;

        if (questionIndex >= questions.length) {
            finishQuiz();
        } else {
            renderQuestion();
        }
    });

    $("#saveCertificate")?.addEventListener("click", async () => {
        if (typeof html2canvas !== "function") {
            alert("Не удалось загрузить библиотеку сохранения.");
            return;
        }

        try {
            const canvas = await html2canvas(
                $("#guardianCertificate"),
                {
                    backgroundColor: "#e7d6b4",
                    scale: 2
                }
            );

            const link = document.createElement("a");

            link.download = "hranitel-predaniy.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        } catch {
            alert("Не удалось сохранить свидетельство.");
        }
    });

    $$("[data-place]").forEach(button => {
        button.addEventListener("click", () => {
            const place = places[button.dataset.place];
            if (!place) return;

            $("#mapTitle").textContent = place.title;
            $("#mapRegion").textContent = place.region;
            $("#mapStory").textContent = place.story;

            playSound("click");
            openOverlay("#mapOverlay");
        });
    });
});
