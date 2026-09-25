const questions = [
    {
      frage: "„Ein jedes Volk hat Recht, sich selbst zu regieren.“ Wer hat dieses Zitat geäußert?",
      antworten: ["Winnetou (1893)", "Waldröschen (1884)", "Old Shatterhand (1890)"],
      richtig: 1,
      erklaerung: "Das Zitat stammt aus Mays Kolportageroman „Das Waldröschen“ von 1884 – lange vor Winnetou zeigt sich hier bereits Mays Sympathie für das Selbstbestimmungsrecht indigener Völker."
    },
    {
      frage: "Wie viele Bände der Winnetou-Reihe von Karl May werden in der Ausstellung gezeigt?",
      antworten: ["2 Bände", "3 Bände", "5 Bände"],
      richtig: 1,
      erklaerung: "In der Ausstellung sind drei Bände der Winnetou-Reihe zu sehen."
    },
    {
      frage: "Wie viel Jahre lebte Karl May in seinem Geburtshaus in Hohenstein-Ernstthal?",
      antworten: ["2 Jahre", "3 Jahre", "5 Jahre"],
      richtig: 1,
      erklaerung: "Der junge Karl May lebte von seiner Geburt 1842 bis 1845 in seinem Geburtshaus."
    },
    {
      frage: "Wer ist Old Shatterhand?",
      antworten: ["Winnetous bester Freund", "Winnetous Bruder", "Ein Gegner Winnetous"],
      richtig: 0,
      erklaerung: "Old Shatterhand ist ein deutscher Abenteurer und Winnetous bester Freund. Gemeinsam erleben sie viele Abenteuer im Wilden Westen."
    },
    {
      frage: "Wie stellte Karl May indigene Menschen in seinen Geschichten häufig dar?",
      antworten: ["Als mutig, naturverbunden und ehrenvoll", "Als einfache und ungebildete Menschen", "Als besonders reich und mächtig"],
      richtig: 0,
      erklaerung: "Karl May stellte seine Figuren oft als mutig, naturverbunden und ehrenvoll dar. Dieses Bild war jedoch stark vereinfacht und entsprach nicht der Vielfalt der echten Kulturen."
    },
    {
      frage: "Wie prägte Karl May das Bild vom „Indianer“ in Deutschland?",
      antworten: ["Durch seine Abenteuerromane und die Figur Winnetou", "Durch wissenschaftliche Studien über indigene Völker", "Durch Reisen und Interviews mit verschiedenen Stämmen"],
      richtig: 0,
      erklaerung: "Durch seine erfolgreichen Bücher wurde Winnetou für viele Menschen zu einem bekannten Bild eines indigenen Menschen. Dieses Bild beeinflusst Vorstellungen bis heute."
    },
    {
      frage: "Was unterscheidet das Bild aus Karl Mays Büchern von der Realität?",
      antworten: ["Mays Geschichten zeigen die Vielfalt aller indigenen Kulturen", "Mays Geschichten zeigen einen kleinen, idealisierten Teil indigener Kulturen", "Mays Geschichten sind historische Dokumente"],
      richtig: 1,
      erklaerung: "Winnetou und andere Figuren sind literarische Erfindungen. Das Bild vom naturverbundenen und ehrenvollen „Indianer“ ist stark idealisiert."
    },
    {
      frage: "Warum ist der Begriff „Indianer“ heute umstritten?",
      antworten: ["Weil es nur einen Stamm gab", "Weil er viele verschiedene indigene Völker unter einem Begriff zusammenfasst", "Weil er nur für Menschen aus Europa verwendet wurde"],
      richtig: 1,
      erklaerung: "In Nordamerika gibt es viele verschiedene indigene Völker mit eigenen Sprachen, Kulturen und Geschichten. Der Begriff „Indianer“ fasst diese große Vielfalt stark zusammen."
    },
    {
      frage: "Nach welchem Vorbild wurden die ausgestellten Mokassins nachgebildet?",
      antworten: ["Nach dem Vorbild der nördlichen Prärieindigenen", "Nach dem Vorbild der europäischen Soldaten", "Nach dem Vorbild der südamerikanischen Ureinwohner"],
      richtig: 0,
      erklaerung: "Die ausgestellten Mokassins wurden nach dem Vorbild der nördlichen Prärieindigenen nachgebildet."
    },
    {
      frage: "Welche Buchstaben sind auf der ausgestellten Silberbüchse zu erkennen?",
      antworten: ["W S", "N S", "O S"],
      richtig: 1,
      erklaerung: "Auf der ausgestellten Silberbüchse sind die Buchstaben „N S“ zu erkennen."
    }
  ];

  let current = 0;
  let score = 0;
  let answered = false;

  const questionText = document.getElementById('question-text');
  const optionsEl = document.getElementById('options');
  const explanationEl = document.getElementById('explanation');
  const explanationLabel = document.getElementById('explanation-label');
  const explanationText = document.getElementById('explanation-text');
  const nextBtn = document.getElementById('next-btn');
  const progressLabel = document.getElementById('progress-label');
  const progressScore = document.getElementById('progress-score');
  const progressFill = document.getElementById('progress-fill');
  const quizArea = document.getElementById('quiz-area');
  const resultArea = document.getElementById('result-area');
  const scoreNumber = document.getElementById('score-number');
  const scoreMessage = document.getElementById('score-message');
  const retryBtn = document.getElementById('retry-btn');

  function renderQuestion() {
    answered = false;
    nextBtn.disabled = true;
    nextBtn.textContent = current === questions.length - 1 ? 'Ergebnis anzeigen' : 'Weiter';
    explanationEl.classList.remove('show');

    const q = questions[current];
    questionText.textContent = q.frage;
    progressLabel.textContent = `Frage ${current + 1} von ${questions.length}`;
    progressScore.textContent = `${score} richtig`;
    progressFill.style.width = `${(current / questions.length) * 100}%`;

    optionsEl.innerHTML = '';
    const letters = ['A', 'B', 'C'];
    q.antworten.forEach((text, i) => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.innerHTML = `<span class="bullet">${letters[i]}</span><span>${text}</span>`;
      btn.addEventListener('click', () => selectAnswer(i));
      optionsEl.appendChild(btn);
    });
  }

  function selectAnswer(i) {
    if (answered) return;
    answered = true;
    const q = questions[current];
    const buttons = optionsEl.querySelectorAll('.option');
    buttons.forEach((b, idx) => {
      b.disabled = true;
      if (idx === q.richtig) b.classList.add('correct');
      else if (idx === i) b.classList.add('wrong');
      else b.classList.add('dim');
    });

    if (i === q.richtig) {
      score++;
      explanationLabel.textContent = 'Richtig.';
    } else {
      explanationLabel.textContent = 'Nicht ganz.';
    }
    explanationText.textContent = q.erklaerung;
    explanationEl.classList.add('show');
    progressScore.textContent = `${score} richtig`;
    nextBtn.disabled = false;
  }

  function nextQuestion() {
    if (!answered) return;
    current++;
    if (current >= questions.length) {
      showResult();
    } else {
      renderQuestion();
    }
  }

  function showResult() {
    quizArea.style.display = 'none';
    resultArea.style.display = 'block';
    scoreNumber.textContent = score;
    let msg;
    if (score >= 9) msg = 'Ausgezeichnet! Ihr habt Mays Fantasie und die historische Wirklichkeit sauber auseinandergehalten.';
    else if (score >= 6) msg = 'Gut gemacht! Die wichtigsten Unterschiede zwischen Mythos und Fakten sitzen bei euch.';
    else if (score >= 3) msg = 'Ein guter Anfang – schaut euch die Tafeln der Ausstellung noch einmal in Ruhe an.';
    else msg = 'Zeit für einen zweiten Rundgang durch die Ausstellung – dort stecken alle Antworten.';
    scoreMessage.textContent = msg;
  }

  function resetQuiz() {
    current = 0;
    score = 0;
    quizArea.style.display = 'block';
    resultArea.style.display = 'none';
    renderQuestion();
  }

  nextBtn.addEventListener('click', nextQuestion);
  retryBtn.addEventListener('click', resetQuiz);

  renderQuestion();
