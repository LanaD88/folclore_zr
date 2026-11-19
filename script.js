const creatures = {
    zheztyrnak: {
        title: "Жезтырнақ",
        image: "images/zheztyrnak.jpeg",
        text: "Жезтырнақ — загадочный персонаж казахских народных преданий. Согласно распространённым описаниям, она может принимать облик красивой молодой женщины. Путник не сразу понимает, с кем встретился. Её отличительная черта — длинные металлические когти, которые она старается скрывать.",
        features: "Металлические когти, женский облик, скрытность и опасность для одиноких путников."
    },

    zhalmauyz: {
        title: "Жалмауыз кемпір",
        image: "images/zhalmauyz.jpeg",
        text: "Жалмауыз кемпір — могущественная и опасная старуха из казахских волшебных сказок. В некоторых вариантах преданий она обладает несколькими головами и необычайной силой. Герои сказок сталкиваются с ней во время своих испытаний и должны проявить смелость и находчивость.",
        features: "Образ старухи, сверхъестественная сила, прожорливость. В отдельных сказочных вариантах — семь голов."
    },

    albasty: {
        title: "Албасты",
        image: "images/albasty.jpeg",
        text: "Албасты — таинственный женский дух, известный в поверьях казахов и других тюркских народов. Его образ связан с древними страхами и представлениями о невидимых силах. В некоторых преданиях Албасты описывается как женщина с длинными растрёпанными волосами.",
        features: "Длинные волосы, необычный женский облик, связь с древними поверьями о духах."
    }
};

const modal = document.getElementById("creatureModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalImage = document.getElementById("modalImage");
const modalFeatures = document.getElementById("modalFeatures");
const closeModal = document.getElementById("closeModal");

if (modal) {
    document.querySelectorAll("[data-creature]").forEach(button => {
        button.addEventListener("click", () => {
            const creature = creatures[button.dataset.creature];

            if (!creature) return;

            modalTitle.textContent = creature.title;
            modalText.textContent = creature.text;
            modalFeatures.textContent = creature.features;
            modalImage.src = creature.image;
            modalImage.alt = creature.title;

            modal.classList.add("open");
            document.body.style.overflow = "hidden";
        });
    });

    function hideModal() {
        modal.classList.remove("open");
        document.body.style.overflow = "";
    }

    closeModal.addEventListener("click", hideModal);

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            hideModal();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && modal.classList.contains("open")) {
            hideModal();
        }
    });
}

const bookPages = [
    {
        chapter: "ГЛАВА I",
        title: "Необыкновенный герой",
        image: "images/chapter1.jpeg",
        text: "В давние времена жил человек по имени Ерназар. У него было восемь сыновей, а затем родился младший — Ер Төстік. Мальчик рос необычайно быстро и вскоре стал сильным и отважным юношей."
    },
    {
        chapter: "ГЛАВА II",
        title: "Дорога в неизвестность",
        image: "images/chapter2.jpeg",
        text: "Ер Төстік отправился в далёкое путешествие. В пути ему предстояло встретить удивительных существ, преодолеть опасности и доказать свою смелость."
    },
    {
        chapter: "ГЛАВА III",
        title: "Верный конь",
        image: "images/chapter3.jpeg",
        text: "Особую роль в судьбе героя сыграл его волшебный конь Шалқұйрық. Он обладал необыкновенными способностями, предупреждал хозяина об опасности и помогал ему в трудные минуты."
    },
    {
        chapter: "ГЛАВА IV",
        title: "Подземный мир",
        image: "images/chapter4.jpeg",
        text: "Во время своих странствий Ер Төстік оказался в подземном мире. Там его ждали новые испытания, загадочные обитатели и встречи с теми, кто мог стать его помощниками."
    },
    {
        chapter: "ГЛАВА V",
        title: "Возвращение",
        image: "images/chapter5.jpeg",
        text: "Благодаря мужеству, находчивости и помощи верных спутников Ер Төстік преодолел испытания и смог вернуться домой. Его история напоминает о силе дружбы, верности и смелости."
    }
];

const bookOverlay = document.getElementById("bookOverlay");
const openBook = document.getElementById("openBook");
const closeBook = document.getElementById("closeBook");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const flipBook = document.getElementById("flipBook");
const pageCounter = document.getElementById("pageCounter");

if (
    bookOverlay &&
    openBook &&
    closeBook &&
    prevPage &&
    nextPage &&
    flipBook &&
    pageCounter &&
    typeof St !== "undefined"
) {
    const pagesHTML = bookPages.map((page, index) => `
        <div class="flip-page">
            <div class="flip-page-content">
                <p class="book-chapter">${page.chapter}</p>
                <h3>${page.title}</h3>
                <p>${page.text}</p>
                <span class="page-number">${index + 1}</span>
            </div>
        </div>

        <div class="flip-page">
            <div class="flip-page-content picture-content">
                <img src="${page.image}" alt="${page.title}">
                <p>${page.title}</p>
            </div>
        </div>
    `).join("");

    flipBook.innerHTML = `
        <div class="flip-page book-cover" data-density="hard">
            <div class="flip-page-content">
                <p>АРХИВ НАРОДНЫХ ПРЕДАНИЙ</p>
                <h2>Ер Төстік</h2>
                <p>Легенды Великой степи</p>
            </div>
        </div>

        ${pagesHTML}

        <div class="flip-page book-cover" data-density="hard">
            <div class="flip-page-content">
                <h2>Конец сказания</h2>
                <p>✧ За гранью сказаний ✧</p>
            </div>
        </div>
    `;

    const pageFlip = new St.PageFlip(flipBook, {
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

    pageFlip.loadFromHTML(
        flipBook.querySelectorAll(".flip-page")
    );

    function updateBookCounter() {
        const current = pageFlip.getCurrentPageIndex() + 1;
        const total = pageFlip.getPageCount();

        pageCounter.textContent = `${current} / ${total}`;

        prevPage.disabled = current <= 1;
        nextPage.disabled = current >= total;
    }

    function centerClosedBook() {
        const current = pageFlip.getCurrentPageIndex();
        const total = pageFlip.getPageCount();
        const isClosed = current === 0 || current === total - 1;

        const wrapper = flipBook.querySelector(".stf__wrapper");
        const block = flipBook.querySelector(".stf__block");

        if (!wrapper || !block) return;

        const bookWidth = wrapper.getBoundingClientRect().width;
        const pageWidth = block.getBoundingClientRect().width / 2;

        if (isClosed && bookWidth > pageWidth) {
            const offset = (bookWidth - pageWidth) / 2;

            flipBook.style.transform =
                current === 0
                    ? `translateX(-${offset}px)`
                    : `translateX(${offset}px)`;
        } else {
            flipBook.style.transform = "translateX(0)";
        }
    }

    function updateBookLayout() {
        updateBookCounter();

        requestAnimationFrame(() => {
            centerClosedBook();
        });
    }

    pageFlip.on("flip", updateBookLayout);

    openBook.addEventListener("click", () => {
        bookOverlay.classList.add("open");
        document.body.style.overflow = "hidden";

        requestAnimationFrame(() => {
            pageFlip.update();
            updateBookLayout();
        });
    });

    function hideBook() {
        bookOverlay.classList.remove("open");
        document.body.style.overflow = "";
    }

    closeBook.addEventListener("click", hideBook);

    prevPage.addEventListener("click", () => {
        pageFlip.flipPrev();
    });

    nextPage.addEventListener("click", () => {
        pageFlip.flipNext();
    });

    bookOverlay.addEventListener("click", event => {
        if (event.target === bookOverlay) {
            hideBook();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && bookOverlay.classList.contains("open")) {
            hideBook();
        }

        if (!bookOverlay.classList.contains("open")) return;

        if (event.key === "ArrowRight") {
            pageFlip.flipNext();
        }

        if (event.key === "ArrowLeft") {
            pageFlip.flipPrev();
        }
    });

    window.addEventListener("resize", () => {
        if (!bookOverlay.classList.contains("open")) return;

        pageFlip.update();
        updateBookLayout();
    });

    updateBookCounter();
}

const nightStories = {
    voice: {
        title: "Голос в степи",
        text: `Глубокой ночью один путник возвращался домой через бескрайнюю степь.

Вокруг не было ни одного огня. Лишь ветер шевелил сухую траву.

Вдруг за спиной он услышал знакомый голос, зовущий его по имени.

Путник обернулся, но никого не увидел.

Он продолжил путь. Голос прозвучал снова — теперь совсем близко.

Тогда путник ускорил шаг и больше не оглядывался.

На рассвете он достиг аула. Но ещё долго ему казалось, что кто-то зовёт его из темноты.`
    },

    yurt: {
        title: "Забытая юрта",
        text: `Однажды путник заметил среди ночной степи одинокую юрту.

Изнутри пробивался тёплый свет, хотя вокруг не было ни людей, ни скота.

Он приблизился и услышал тихий разговор.

Но стоило ему отодвинуть полог, как голоса оборвались.

Внутри никого не оказалось. Очаг был холодным, а на полу лежал толстый слой пыли.

Путник поспешил уйти.

Оглянувшись с ближайшего холма, он увидел, что юрта исчезла.`
    },

    shadow: {
        title: "Тень у колодца",
        text: `На окраине старого аула стоял заброшенный колодец.

Жители редко подходили к нему после заката.

Однажды юноша заметил возле колодца неподвижную фигуру.

Она стояла спиной к дороге и словно смотрела в глубину.

Юноша окликнул незнакомца, но ответа не последовало.

Ветер усилился, и фигура медленно исчезла в ночном тумане.

Утром возле колодца не нашли никаких следов.

С тех пор юноша обходил это место стороной.`
    }
};

const nightOverlay = document.getElementById("nightOverlay");
const nightTitle = document.getElementById("nightTitle");
const nightText = document.getElementById("nightText");
const closeNight = document.getElementById("closeNight");

if (nightOverlay && nightTitle && nightText && closeNight) {
    document.querySelectorAll("[data-night]").forEach(button => {
        button.addEventListener("click", () => {
            const story = nightStories[button.dataset.night];

            if (!story) return;

            nightTitle.textContent = story.title;
            nightText.textContent = story.text;

            nightOverlay.classList.add("open");
            document.body.style.overflow = "hidden";
        });
    });

    function hideNight() {
        nightOverlay.classList.remove("open");
        document.body.style.overflow = "";
    }

    closeNight.addEventListener("click", hideNight);

    nightOverlay.addEventListener("click", event => {
        if (event.target === nightOverlay) {
            hideNight();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && nightOverlay.classList.contains("open")) {
            hideNight();
        }
    });
}
document.querySelectorAll(".belief-card").forEach(card => {
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-expanded", "false");

    function toggleBelief() {
        const isActive = card.classList.toggle("active");
        card.setAttribute("aria-expanded", String(isActive));
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
        title: "Последний путник",
        text: `Говорят, однажды в степи исчез путник.

Каждую ночь возле старой дороги появлялся одинокий силуэт.

Люди пытались приблизиться к нему, но он исчезал в тумане.

Однажды старик сказал, что этот путник ищет дорогу домой.

С тех пор жители аула оставляли возле дороги фонарь.

И однажды силуэт больше не появился.`
    },
    {
        title: "Шёпот ветра",
        text: `Среди высоких холмов находилось место, где ветер никогда не стихал.

Пастухи рассказывали, что иногда в его шуме слышались слова.

Однажды молодой пастух решил остаться там на ночь.

Он услышал тихий голос, произнёсший его имя.

Но вокруг не было никого.

На рассвете он покинул холмы и больше туда не возвращался.`
    },
    {
        title: "Огонь среди холмов",
        text: `Ночью путешественники заметили далёкий огонёк.

Он мерцал среди холмов, словно кто-то разжёг костёр.

Путники направились к нему, но огонь становился всё дальше.

Один из них остановился и предложил дождаться рассвета.

Утром они увидели впереди глубокий овраг.

А таинственного огня больше не было.`
    },
    {
        title: "Забытое имя",
        text: `В старом ауле рассказывали о странном голосе.

Он появлялся только в самые тихие ночи.

Голос повторял одно и то же имя.

Никто из жителей не знал, кому оно принадлежало.

Однажды в заброшенном доме нашли старую деревянную табличку.

На ней было написано именно это имя.

После той ночи голос больше не слышали.`
    }
];

const secretDoor = document.getElementById("secretDoor");
const secretOverlay = document.getElementById("secretOverlay");
const secretTitle = document.getElementById("secretTitle");
const secretText = document.getElementById("secretText");
const secretClose = document.getElementById("secretClose");
const secretAgain = document.getElementById("secretAgain");

let secretTimer = null;
let lastSecretIndex = -1;

function showSecretStory() {
    let index = Math.floor(Math.random() * secretStories.length);

    if (secretStories.length > 1) {
        while (index === lastSecretIndex) {
            index = Math.floor(Math.random() * secretStories.length);
        }
    }

    lastSecretIndex = index;
    secretTitle.textContent = secretStories[index].title;
    secretText.textContent = secretStories[index].text;
}

if (secretDoor && secretOverlay && secretTitle && secretText && secretClose && secretAgain) {
    secretDoor.addEventListener("click", () => {
        if (secretDoor.classList.contains("opening")) return;

        secretDoor.classList.add("opening");

        secretTimer = setTimeout(() => {
            showSecretStory();
            secretOverlay.classList.add("open");
            document.body.style.overflow = "hidden";
        }, 1300);
    });

    function closeSecretStory() {
        clearTimeout(secretTimer);
        secretOverlay.classList.remove("open");
        secretDoor.classList.remove("opening");
        document.body.style.overflow = "";
    }

    secretClose.addEventListener("click", closeSecretStory);

    secretOverlay.addEventListener("click", event => {
        if (event.target === secretOverlay) {
            closeSecretStory();
        }
    });

    secretAgain.addEventListener("click", showSecretStory);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && secretOverlay.classList.contains("open")) {
            closeSecretStory();
        }
    });
}

const sounds = {
    wind: new Audio("sounds/wind.wav"),
    door: new Audio("sounds/door.wav"),
    page: new Audio("sounds/page.wav"),
    mystery: new Audio("sounds/mystery.wav")
};

sounds.wind.loop = true;
sounds.wind.volume = 0.15;
sounds.door.volume = 0.35;
sounds.page.volume = 0.25;
sounds.mystery.volume = 0.3;

function playSound(name) {
    const sound = sounds[name];
    if (!sound) return;

    sound.currentTime = 0;
    sound.play().catch(() => {});
}

const soundToggle = document.getElementById("soundToggle");
let soundEnabled = false;

if (soundToggle) {
    soundToggle.addEventListener("click", () => {
        soundEnabled = !soundEnabled;

        if (soundEnabled) {
            soundToggle.textContent = "🔊 Звук включён";
            sounds.wind.play().catch(() => {});
        } else {
            soundToggle.textContent = "🔇 Звук выключен";
            Object.values(sounds).forEach(sound => {
                sound.pause();
                sound.currentTime = 0;
            });
        }
    });
}

function playEffect(name) {
    if (!soundEnabled) return;
    playSound(name);
}
const secretDoorSound = document.getElementById("secretDoor");

if (secretDoorSound) {
    secretDoorSound.addEventListener("click", () => {
        if (!secretDoorSound.classList.contains("opening")) return;
        playEffect("door");
    });
}

const prevPageSound = document.getElementById("prevPage");
const nextPageSound = document.getElementById("nextPage");

if (prevPageSound) {
    prevPageSound.addEventListener("click", () => {
        playEffect("page");
    });
}

if (nextPageSound) {
    nextPageSound.addEventListener("click", () => {
        playEffect("page");
    });
}

const secretAgainSound = document.getElementById("secretAgain");

if (secretAgainSound) {
    secretAgainSound.addEventListener("click", () => {
        playEffect("mystery");
    });
}
const archiveStories = {
    scroll: {
        title: "Забытый свиток",
        text: `В старом сундуке нашли свиток.

На пожелтевшей бумаге была изображена дорога,
которой не существовало ни на одной карте.

Говорили, что она появляется лишь в туманные ночи.

Однажды путник решил найти её.

На рассвете он вернулся, но больше никогда
не рассказывал о том, что увидел.`
    },

    keeper: {
        title: "Последний хранитель",
        text: `В глубине степи стояла древняя библиотека.

Её двери открывались только тем,
кто действительно искал забытые знания.

Последний хранитель записывал истории путников.

Однажды он исчез.

Но каждую ночь в библиотеке продолжал
гореть одинокий огонь.`
    },

    locked: {
        title: "Запечатанная легенда",
        text: `В древней книге было написано:

«Не все двери открываются ключом.
Иногда достаточно вспомнить своё имя».

Под последней строкой обнаружилась подпись.

Но чернила исчезли, прежде чем её успели прочесть.`
    }
};

const archiveOverlay = document.getElementById("archiveOverlay");
const archiveTitle = document.getElementById("archiveTitle");
const archiveText = document.getElementById("archiveText");
const archiveClose = document.getElementById("archiveClose");
const archivePuzzle = document.getElementById("archivePuzzle");
const archiveAnswer = document.getElementById("archiveAnswer");
const archiveUnlock = document.getElementById("archiveUnlock");
const archiveResult = document.getElementById("archiveResult");

if (archiveOverlay) {
    document.querySelectorAll("[data-archive]").forEach(button => {
        button.addEventListener("click", () => {
            const type = button.dataset.archive;

            archiveOverlay.classList.add("open");
            document.body.style.overflow = "hidden";

            archiveTitle.textContent = archiveStories[type].title;
            archiveText.textContent =
                type === "locked" ? "" : archiveStories[type].text;

            archivePuzzle.hidden = type !== "locked";
            archiveAnswer.value = "";
            archiveResult.textContent = "";
        });
    });

    archiveUnlock.addEventListener("click", () => {
        const answer = archiveAnswer.value.trim().toLowerCase();

        if (answer === "имя" || answer === "моё имя" ||
            answer === "мое имя") {
            archivePuzzle.hidden = true;
            archiveText.textContent = archiveStories.locked.text;

            if (typeof playEffect === "function") {
                playEffect("mystery");
            }
        } else {
            archiveResult.textContent =
                "Печать не поддаётся. Попробуйте ещё раз...";
        }
    });

    function closeArchive() {
        archiveOverlay.classList.remove("open");
        document.body.style.overflow = "";
    }

    archiveClose.addEventListener("click", closeArchive);

    archiveOverlay.addEventListener("click", event => {
        if (event.target === archiveOverlay) closeArchive();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" &&
            archiveOverlay.classList.contains("open")) {
            closeArchive();
        }

        if (event.key === "Enter" &&
            archiveOverlay.classList.contains("open") &&
            !archivePuzzle.hidden) {
            archiveUnlock.click();
        }
    });
}
const guardianQuestions = [
    {
        question: "Чем известна Жезтырнақ?",
        answers: [
            "Золотыми крыльями",
            "Металлическими когтями",
            "Волшебным посохом",
            "Серебряным голосом"
        ],
        correct: 1
    },
    {
        question: "Как зовут волшебного коня Ер Төстік?",
        answers: [
            "Тайбурыл",
            "Құлагер",
            "Шалқұйрық",
            "Ақбозат"
        ],
        correct: 2
    },
    {
        question: "Кто такая Жалмауыз кемпір?",
        answers: [
            "Мудрая птица",
            "Степной дух ветра",
            "Волшебная старуха",
            "Хранительница озера"
        ],
        correct: 2
    },
    {
        question: "С чем связано поверье о пороге?",
        answers: [
            "С уважением к жилищу",
            "С предсказанием погоды",
            "С поиском сокровищ",
            "С путешествиями"
        ],
        correct: 0
    },
    {
        question: "Куда попал Ер Төстік во время странствий?",
        answers: [
            "На далёкую планету",
            "В подземный мир",
            "На морское дно",
            "В ледяной дворец"
        ],
        correct: 1
    }
];

const guardianStart = document.getElementById("guardianStart");
const guardianQuiz = document.getElementById("guardianQuiz");
const guardianFinish = document.getElementById("guardianFinish");

const startGuardian = document.getElementById("startGuardian");
const guardianProgress = document.getElementById("guardianProgress");
const guardianQuestion = document.getElementById("guardianQuestion");
const guardianAnswers = document.getElementById("guardianAnswers");
const guardianFeedback = document.getElementById("guardianFeedback");
const guardianNext = document.getElementById("guardianNext");

const guardianResultTitle = document.getElementById("guardianResultTitle");
const guardianResultText = document.getElementById("guardianResultText");
const guardianScore = document.getElementById("guardianScore");
const certificateRank = document.getElementById("certificateRank");
const certificateScore = document.getElementById("certificateScore");
const saveCertificate = document.getElementById("saveCertificate");
const restartGuardian = document.getElementById("restartGuardian");

if (guardianStart && guardianQuiz && guardianFinish) {
    let questionIndex = 0;
    let score = 0;

    function showGuardianQuestion() {
        const current = guardianQuestions[questionIndex];

        guardianProgress.textContent =
            `ВОПРОС ${questionIndex + 1} ИЗ ${guardianQuestions.length}`;

        guardianQuestion.textContent = current.question;
        guardianAnswers.innerHTML = "";
        guardianFeedback.textContent = "";
        guardianNext.hidden = true;

        current.answers.forEach((answer, index) => {
            const button = document.createElement("button");

            button.className = "guardian-answer";
            button.textContent = answer;

            button.addEventListener("click", () => {
                const buttons =
                    guardianAnswers.querySelectorAll("button");

                buttons.forEach(btn => btn.disabled = true);

                if (index === current.correct) {
                    score++;
                    button.classList.add("correct");
                    guardianFeedback.textContent =
                        "✦ Верно! Хранитель одобряет ваш ответ.";

                    if (typeof playEffect === "function") {
                        playEffect("mystery");
                    }
                } else {
                    button.classList.add("wrong");
                    buttons[current.correct].classList.add("correct");

                    guardianFeedback.textContent =
                        "Неверно. Правильный ответ подсвечен.";
                }

                guardianNext.hidden = false;
            });

            guardianAnswers.appendChild(button);
        });
    }

    function beginGuardian() {
        questionIndex = 0;
        score = 0;

        guardianStart.hidden = true;
        guardianFinish.hidden = true;
        guardianQuiz.hidden = false;

        showGuardianQuestion();
    }

    function finishGuardian() {
        guardianQuiz.hidden = true;
        guardianFinish.hidden = false;

        guardianScore.textContent =
            `Ваш результат: ${score} из ${guardianQuestions.length}`;

        if (score === 5) {
            guardianResultTitle.textContent =
                "✦ Хранитель древних преданий ✦";

            guardianResultText.textContent =
                "Вы прошли все испытания. Тайны Великой степи открыты вам!";
        } else if (score >= 3) {
            guardianResultTitle.textContent =
                "✧ Ученик хранителя ✧";

            guardianResultText.textContent =
                "Вы знаете многое, но впереди ещё немало загадок.";
        } else {
            guardianResultTitle.textContent =
                "☾ Странник Великой степи ☾";

            guardianResultText.textContent =
                "Ваш путь только начинается. Изучайте предания и возвращайтесь!";
        }

    certificateRank.textContent = guardianResultTitle.textContent;

certificateScore.textContent =
    `Правильных ответов: ${score} из ${guardianQuestions.length}`;
}

    startGuardian.addEventListener("click", beginGuardian);
    restartGuardian.addEventListener("click", beginGuardian);

    guardianNext.addEventListener("click", () => {
        questionIndex++;

        if (questionIndex < guardianQuestions.length) {
            showGuardianQuestion();
        } else {
            finishGuardian();
        }
    });
}
if (saveCertificate) {
    saveCertificate.addEventListener("click", async () => {
        const certificate =
            document.getElementById("guardianCertificate");

        if (!certificate) return;

        if (typeof html2canvas === "undefined") {
            alert("Не удалось загрузить библиотеку сохранения.");
            return;
        }

        try {
            const canvas = await html2canvas(certificate, {
                backgroundColor: "#17120f",
                scale: 2
            });

            const link = document.createElement("a");

            link.download = "nagrada-hranitelya.png";
            link.href = canvas.toDataURL("image/png");

            link.click();
        } catch (error) {
            console.error("Ошибка сохранения:", error);
            alert("Не удалось сохранить награду.");
        }
    });
}
const mapStories = {
    burabay: {
        title: "Бурабай — Тайна озера",
        text: `Среди сосновых лесов и скал Бурабая
скрывается озеро, окутанное туманом.

В одной из историй рассказывается о путнике,
который услышал ночью голос среди деревьев.

Он пошёл на зов и увидел отражение горы
в неподвижной воде.

Но когда поднял голову, гора исчезла
за густым туманом.`
    },

    bayanaul: {
        title: "Баянауыл — Шёпот скал",
        text: `Говорят, в горах Баянаула иногда
слышится странное эхо.

Однажды путник произнёс своё имя,
и скалы повторили его трижды.

Последний голос прозвучал совсем рядом,
хотя вокруг никого не было.`
    },

    altynemel: {
        title: "Алтынемель — Поющий бархан",
        text: `В Алтынемеле находится знаменитый
Поющий бархан.

Когда песок приходит в движение,
он может издавать необычный гул.

В нашей истории путник решил,
что это древняя степь пытается
рассказать ему забытую тайну.`
    },

    tamgaly: {
        title: "Тамгалы — Знаки прошлого",
        text: `На древних камнях Тамгалы
сохранились изображения прошлого.

Однажды путешественник заметил,
что при свете заходящего солнца
один из рисунков напоминает дверь.

Он приблизился, но солнечный луч исчез,
и камень снова стал обычным.`
    },

    ulytau: {
        title: "Улытау — Память гор",
        text: `Горы Улытау хранят память
о многих поколениях.

По вымышленному преданию,
один странник нашёл среди камней
старую тропу.

Каждую ночь тропа меняла направление,
словно сама выбирала, кого пропустить.`
    },

    aral: {
        title: "Арал — Голос исчезнувшей воды",
        text: `Когда-то здесь простирались
огромные водные пространства.

В нашей мистической истории
путешественник услышал ночью шум волн.

Но перед ним лежала лишь
безмолвная песчаная равнина.`
    }
};

const mapModal = document.getElementById("mapOverlay");
const mapTitle = document.getElementById("mapTitle");
const mapText = document.getElementById("mapStory");
const mapClose = document.getElementById("mapClose");

if (mapModal && mapTitle && mapText && mapClose) {

    document.querySelectorAll("[data-place]").forEach(button => {
        button.addEventListener("click", () => {
            const place = button.dataset.place;
            const story = mapStories[place];

            if (!story) return;

            mapTitle.textContent = story.title;
            mapText.textContent = story.text;

            mapModal.classList.add("open");
            document.body.style.overflow = "hidden";

            if (typeof playEffect === "function") {
                playEffect("mystery");
            }
        });
    });

    function closeMap() {
        mapModal.classList.remove("open");
        document.body.style.overflow = "";
    }

    mapClose.addEventListener("click", closeMap);

    mapModal.addEventListener("click", event => {
        if (event.target === mapModal) {
            closeMap();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" &&
            mapModal.classList.contains("open")) {
            closeMap();
        }
    });
}