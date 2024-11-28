$(document).ready(function () {
  const words = [
    { english: "dog", translation: "собака", emoji: "🐕" },
    { english: "cat", translation: "кішка", emoji: "🐈" },
    { english: "monkey", translation: "мавпа", emoji: "🐒" },
    { english: "cow", translation: "корова", emoji: "🐄" },
    { english: "hedgehog", translation: "їжак", emoji: "🦔" },
    { english: "rabbit", translation: "кролик", emoji: "🐇" },
    { english: "sheep", translation: "вівця", emoji: "🐑" },
    { english: "koala", translation: "коала", emoji: "🐨" },
    { english: "tiger", translation: "тигр", emoji: "🐅" },
    { english: "horse", translation: "кінь", emoji: "🐎" },
  ];

  // Перемішування карток
  const shuffledWords = words.sort(() => Math.random() - 0.5);

  let currentIndex = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let answered = false; // Відстеження, чи відповідь вже була дана

  function updateCard() {
    const word = shuffledWords[currentIndex];
    $("#word").text(word.english);
    $("#emoji").text("");
    $("#correct-translation").text("");
    $("#step").text(`${currentIndex + 1}/${shuffledWords.length}`);
    $("#translation").val("");
    $(".card").removeClass("flipped");
    answered = false; // Скидаємо статус відповіді
  }

  function flipCard() {
    const word = shuffledWords[currentIndex];
    $(".card").toggleClass("flipped");
    if ($(".card").hasClass("flipped")) {
      $("#emoji").text(word.emoji);
      $("#correct-translation").text(word.translation);
    }
  }

  $("#check").click(function () {
    if (answered) {
      alert("Ви вже відповіли на цю картку. Перейдіть до наступної.");
      return;
    }

    const userInput = $("#translation").val().trim().toLowerCase();
    const currentWord = shuffledWords[currentIndex];

    if (userInput === currentWord.translation.toLowerCase()) {
      correctCount++;
      $("#correct-count").text(correctCount);
      alert("Правильно!");
    } else {
      wrongCount++;
      $("#wrong-count").text(wrongCount);
      alert(`Неправильно! Правильна відповідь: ${currentWord.translation}`);
    }

    answered = true; // Встановлюємо, що відповідь вже дана
    flipCard();
  });

  $("#prev").click(function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateCard();
    }
  });

  $("#next").click(function () {
    if (currentIndex < shuffledWords.length - 1) {
      currentIndex++;
      updateCard();
    } else {
      $("#modal").show();
      const knowledgeLevel =
        correctCount / shuffledWords.length > 0.8
          ? "Високий"
          : correctCount / shuffledWords.length > 0.5
          ? "Середній"
          : "Початковий";
      $("#knowledge-level").text(`Ваш рівень: ${knowledgeLevel}`);
    }
  });

  $("#close-modal").click(function () {
    $("#modal").hide();
  });

  updateCard();
});



