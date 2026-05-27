(function () {
  // ===================== DATA TETAP =====================
  const RAW = [
    { name: "Azura Nasya", hbd: "01,02,2006" },
    { name: "Auliya Maharlika", hbd: "26, 05, 2007" },
    { name: "Bulan Febiola", hbd: "27,02,2005" },
    { name: "Siti Zahra", hbd: "03,03,2006" },
    { name: "Ihsan Baihaqi", hbd: "04,03,2006" },
    { name: "Hairul Mahesa", hbd: "29,05,2004" },
    { name: "Fauzi Hendrawan", hbd: "30,03,2004" },
    { name: "Anaya Oktavia", hbd: "18,10,2006" },
  ];

  const DAYS_ID = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const MONTHS_ID = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const ZODIAC = [
    { name: "Capricorn", sym: "♑", end: [1, 19] },
    { name: "Aquarius", sym: "♒", end: [2, 18] },
    { name: "Pisces", sym: "♓", end: [3, 20] },
    { name: "Aries", sym: "♈", end: [4, 19] },
    { name: "Taurus", sym: "♉", end: [5, 20] },
    { name: "Gemini", sym: "♊", end: [6, 20] },
    { name: "Cancer", sym: "♋", end: [7, 22] },
    { name: "Leo", sym: "♌", end: [8, 22] },
    { name: "Virgo", sym: "♍", end: [9, 22] },
    { name: "Libra", sym: "♎", end: [10, 22] },
    { name: "Scorpio", sym: "♏", end: [11, 21] },
    { name: "Sagittarius", sym: "♐", end: [12, 21] },
  ];

  const ZODIAC_DETAIL = {
    Capricorn: {
      element: "Tanah",
      sifat: "Disiplin, ambisius, realistis",
      kelemahan: "Kaku, terlalu serius",
      cocok: "Taurus, Virgo, Scorpio",
      deskripsi: "Capricorn pekerja keras, fokus pada tujuan.",
    },
    Aquarius: {
      element: "Udara",
      sifat: "Inovatif, unik, mandiri",
      kelemahan: "Dingin, sulit ditebak",
      cocok: "Gemini, Libra, Sagittarius",
      deskripsi: "Aquarius pemikir bebas.",
    },
    Pisces: {
      element: "Air",
      sifat: "Empatik, imajinatif, lembut",
      kelemahan: "Terlalu sensitif",
      cocok: "Cancer, Scorpio",
      deskripsi: "Pisces sangat perasa.",
    },
    Aries: {
      element: "Api",
      sifat: "Berani, energik",
      kelemahan: "Impulsif",
      cocok: "Leo, Sagittarius",
      deskripsi: "Aries pemimpin alami.",
    },
    Taurus: {
      element: "Tanah",
      sifat: "Setia, sabar",
      kelemahan: "Keras kepala",
      cocok: "Virgo, Capricorn",
      deskripsi: "Taurus mencintai kenyamanan.",
    },
    Gemini: {
      element: "Udara",
      sifat: "Cerdas, komunikatif",
      kelemahan: "Mudah bosan",
      cocok: "Libra, Aquarius",
      deskripsi: "Gemini penuh ide.",
    },
    Cancer: {
      element: "Air",
      sifat: "Peduli, protektif",
      kelemahan: "Moody",
      cocok: "Pisces, Scorpio",
      deskripsi: "Cancer penuh kasih sayang.",
    },
    Leo: {
      element: "Api",
      sifat: "Karismatik, percaya diri",
      kelemahan: "Egois",
      cocok: "Aries, Sagittarius",
      deskripsi: "Leo suka pusat perhatian.",
    },
    Virgo: {
      element: "Tanah",
      sifat: "Perfeksionis, teliti",
      kelemahan: "Terlalu kritis",
      cocok: "Taurus, Capricorn",
      deskripsi: "Virgo sangat analitis.",
    },
    Libra: {
      element: "Udara",
      sifat: "Adil, romantis",
      kelemahan: "Sulit mengambil keputusan",
      cocok: "Gemini, Aquarius",
      deskripsi: "Libra menyukai keseimbangan.",
    },
    Scorpio: {
      element: "Air",
      sifat: "Misterius, intens",
      kelemahan: "Cemburuan",
      cocok: "Cancer, Pisces",
      deskripsi: "Scorpio penuh gairah.",
    },
    Sagittarius: {
      element: "Api",
      sifat: "Optimis, petualang",
      kelemahan: "Tidak sabar",
      cocok: "Aries, Leo",
      deskripsi: "Sagittarius mencintai kebebasan.",
    },
  };

  function getZodiac(d, m) {
    for (const z of ZODIAC)
      if (m < z.end[0] || (m === z.end[0] && d <= z.end[1])) return z;
    return ZODIAC[0];
  }
  function todayDate() {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }
  function nextBirthday(d, m) {
    const now = todayDate();
    let next = new Date(now.getFullYear(), m - 1, d);
    if (next < now) next = new Date(now.getFullYear() + 1, m - 1, d);
    return next;
  }
  function daysUntil(d, m) {
    return Math.round((nextBirthday(d, m) - todayDate()) / 86400000);
  }
  function calcAge(bY, bM, bD) {
    const now = todayDate();
    let age = now.getFullYear() - bY;
    if (new Date(now.getFullYear(), bM - 1, bD) > now) age--;
    return age;
  }
  function secsUntilBirthday(d, m) {
    const now = new Date();
    const nb = nextBirthday(d, m);
    return Math.max(
      0,
      Math.floor(
        (new Date(nb.getFullYear(), nb.getMonth(), nb.getDate(), 0, 0, 0) -
          now) /
          1000,
      ),
    );
  }
  function formatSecs(sec) {
    return {
      d: Math.floor(sec / 86400),
      h: Math.floor((sec % 86400) / 3600),
      m: Math.floor((sec % 3600) / 60),
      s: sec % 60,
    };
  }
  function pad(n) {
    return String(n).padStart(2, "0");
  }

  // API call
  async function fetchPersonality(nama, lahir, ultah, zodiak) {
    const url = `https://ihsanbaihaqi.vercel.app/api/sifat?nama=${encodeURIComponent(nama)}&lahir=${encodeURIComponent(lahir)}&ultah=${encodeURIComponent(ultah)}&zodiak=${encodeURIComponent(zodiak)}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("API error");
      const json = await res.json();
      return json;
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  // Build data
  const nowDate = todayDate();
  document.getElementById("todayLabel").innerHTML =
    `Hari ini: ${DAYS_ID[nowDate.getDay()]}, ${nowDate.getDate()} ${MONTHS_ID[nowDate.getMonth()]} ${nowDate.getFullYear()}`;

  const people = RAW.map((p) => {
    let [d, m, y] = p.hbd.split(",").map(Number);
    if (isNaN(d)) {
      const parts = p.hbd.split(/[ ,]+/);
      d = parseInt(parts[0]);
      m = parseInt(parts[1]);
      y = parseInt(parts[2]);
    }
    const days = daysUntil(d, m);
    const age = calcAge(y, m, d);
    const nb = nextBirthday(d, m);
    const isToday = days === 0;
    const turningAge = isToday ? age : age + 1;
    const progress = Math.min(
      100,
      Math.max(0, Math.round(((365 - days) / 365) * 100)),
    );
    const zodiac = getZodiac(d, m);
    return {
      name: p.name,
      d,
      m,
      y,
      days,
      age,
      turningAge,
      bdayOfWeek: DAYS_ID[nb.getDay()],
      isToday,
      progress,
      nb,
      zodiac,
    };
  }).sort((a, b) => {
    if (a.days === 0 && b.days !== 0) return -1;
    if (a.days !== 0 && b.days === 0) return 1;
    return a.days - b.days;
  });

  const container = document.getElementById("cards");
  const cardTimerMap = {};

  people.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = `card${p.isToday ? " today" : p.days <= 7 ? " soon" : ""}`;
    const bdateStr = `${p.d} ${MONTHS_ID[p.m - 1]} ${p.y}`;
    const timerId = `timer-${idx}`;
    card.innerHTML = `
      <div class="rank">${p.isToday ? "🎂" : idx + 1}</div>
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="meta"><span>📅 ${bdateStr}</span><span class="highlight">🎂 ${p.isToday ? p.age : p.turningAge} tahun${p.isToday ? "" : " nanti"}</span></div>
        <div class="pill-day">Ulang tahun hari ${p.bdayOfWeek}${p.isToday ? " ini" : ""}</div>
        ${p.isToday ? '<div class="confetti-row">🎊🥳🎁🎈🎊</div>' : ""}
        <div class="live-timer" id="${timerId}"></div>
        <div class="progress-wrap"><div class="progress-bar" style="width:${p.progress}%"></div></div>
      </div>
      <div class="countdown">${p.isToday ? '<div class="days-num">🎉</div><div class="days-label">Hari ini!</div>' : `<div class="days-num">${p.days}</div><div class="days-label">hari lagi</div>`}</div>
    `;
    card.addEventListener("click", () => openModal(p));
    container.appendChild(card);
    if (!p.isToday) cardTimerMap[timerId] = p;
  });

  function tickCards() {
    for (const [id, p] of Object.entries(cardTimerMap)) {
      const el = document.getElementById(id);
      if (!el) continue;
      const sec = secsUntilBirthday(p.d, p.m);
      const { d, h, m, s } = formatSecs(sec);
      if (d >= 2)
        el.textContent = `⏳ ${d} hari ${pad(h)}:${pad(m)}:${pad(s)} lagi`;
      else if (d === 1)
        el.textContent = `⏳ 1 hari ${pad(h)} jam ${pad(m)} menit lagi`;
      else
        el.textContent = `⏳ ${pad(h)} jam ${pad(m)} menit ${pad(s)} detik lagi`;
    }
  }
  setInterval(tickCards, 1000);

  // MODAL dengan tombol AI
  let modalInterval = null;
  let activePerson = null;

  async function openModal(p) {
    activePerson = p;
    const overlay = document.getElementById("modalOverlay");
    const mHeader = document.getElementById("mHeader");
    const mName = document.getElementById("mName");
    const mStatus = document.getElementById("mStatus");
    const mAvatar = document.getElementById("mAvatar");
    const mDetails = document.getElementById("mDetails");
    const personalityDiv = document.getElementById("personalityContainer");

    mAvatar.textContent = p.isToday ? "🎉" : p.days <= 7 ? "🎁" : "⏳";
    mName.textContent = p.name;
    mHeader.className = "modal-header" + (p.isToday ? " is-today" : "");
    if (p.isToday) {
      mStatus.className = "modal-status celebrating";
      mStatus.textContent = "🎉 Selamat Ulang Tahun!";
      document.getElementById("mTimerLabel").textContent =
        "Sedang Merayakan 🎂";
    } else {
      mStatus.className = "modal-status";
      mStatus.textContent = "Menunggu ulang tahun berikutnya";
      document.getElementById("mTimerLabel").textContent = "Hitung Mundur";
    }

    const birthWeekday = DAYS_ID[new Date(p.y, p.m - 1, p.d).getDay()];
    const bdateStr = `${birthWeekday}, ${p.d} ${MONTHS_ID[p.m - 1]} ${p.y}`;
    const nextYear = p.nb.getFullYear();
    const nextStr = `${p.bdayOfWeek}, ${p.d} ${MONTHS_ID[p.m - 1]} ${nextYear}`;
    const totalDays = Math.round(
      (todayDate() - new Date(p.y, p.m - 1, p.d)) / 86400000,
    );

    mDetails.innerHTML = `
      <div class="detail-row"><span class="detail-label">📅 Lahir</span><span class="detail-value">${bdateStr}</span></div>
      <div class="detail-row"><span class="detail-label">👤 Umur</span><span class="detail-value cyan">${p.age} tahun</span></div>
      <div class="detail-row"><span class="detail-label">🎂 Akan berumur</span><span class="detail-value accent">${p.turningAge} tahun${p.isToday ? " (hari ini!)" : ""}</span></div>
      <div class="detail-row"><span class="detail-label">📆 Ultah jatuh</span><span class="detail-value rose">${p.isToday ? "HARI INI" : nextStr}</span></div>
      <div class="detail-row"><span class="detail-label">⏳ Hari lagi</span><span class="detail-value">${p.isToday ? "—" : p.days}</span></div>
      <div class="detail-row"><span class="detail-label">✨ Zodiak</span><span class="detail-value"><span class="zodiac-badge" onclick="window.openZodiacModal('${p.zodiac.name}')">${p.zodiac.sym} ${p.zodiac.name}</span></span></div>
      <div class="detail-row"><span class="detail-label">🗓️ Hidup ±</span><span class="detail-value">${totalDays.toLocaleString("id")} hari</span></div>
    `;

    // Tampilkan tombol AI (kosong belum ada hasil)
    personalityDiv.innerHTML = `
      <button id="aiGenerateBtn" style="
        width: 100%;
        background: linear-gradient(135deg, #2b9c9c, #1f6e6e);
        border: none;
        border-radius: 40px;
        padding: 0.8rem 1rem;
        color: white;
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      ">
        ✨ Hasilkan dengan AI ✨
      </button>
      <div id="aiResultArea" style="margin-top: 1rem;"></div>
    `;

    // Pasang event listener untuk tombol AI
    const aiBtn = document.getElementById("aiGenerateBtn");
    const aiResultArea = document.getElementById("aiResultArea");

    // Hapus event listener lama (pakai clone biar fresh)
    const newBtn = aiBtn.cloneNode(true);
    aiBtn.parentNode.replaceChild(newBtn, aiBtn);

    newBtn.addEventListener("click", async () => {
      // Loading state
      aiResultArea.innerHTML = `
        <div style="text-align: center; padding: 1rem; background: #f0f7fa; border-radius: 20px;">
          ⏳ AI sedang membaca aura dan kepribadian... ⏳
        </div>
      `;
      newBtn.disabled = true;
      newBtn.style.opacity = "0.6";
      newBtn.style.cursor = "wait";

      // Siapkan parameter untuk API
      const birthWeekdayAPI = DAYS_ID[new Date(p.y, p.m - 1, p.d).getDay()];
      const lahirString = `${birthWeekdayAPI}, ${p.d} ${MONTHS_ID[p.m - 1]} ${p.y}`;
      const ultahString = `${p.bdayOfWeek}, ${p.d} ${MONTHS_ID[p.m - 1]} ${p.isToday ? p.nb.getFullYear() : p.nb.getFullYear()}`;

      try {
        const personality = await fetchPersonality(
          p.name,
          lahirString,
          ultahString,
          p.zodiac.name,
        );

        if (personality && typeof personality === "object") {
          const renderList = (arr) =>
            (arr || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
          aiResultArea.innerHTML = `
            <div class="personality-section">
              <div class="personality-title">🧠 Kepribadian Umum</div>
              <ul class="personality-points">${renderList(personality.kepribadian_umum?.points)}</ul>
              <div class="vibes-text">🎵 ${escapeHtml(personality.kepribadian_umum?.vibes || "—")}</div>
            </div>
            <div class="personality-section">
              <div class="personality-title">❤️ Percintaan</div>
              <ul class="personality-points">${renderList(personality.percintaan?.points)}</ul>
              <div class="vibes-text">💞 ${escapeHtml(personality.percintaan?.vibes || "—")}</div>
            </div>
            <div class="personality-section"><div class="personality-title">⭐ Sisi Positif</div><ul class="personality-points">${renderList(personality.sisi_positif)}</ul></div>
            <div class="personality-section"><div class="personality-title">⚠️ Sisi Negatif</div><ul class="personality-points">${renderList(personality.sisi_negatif)}</ul></div>
            <div class="personality-section"><div class="personality-title">🌱 Kelemahan</div><ul class="personality-points">${renderList(personality.kelemahan)}</ul></div>
            <div class="personality-section"><div class="personality-title">👥 Saat Dekat dengan Orang</div><ul class="personality-points">${renderList(personality.saat_dekat_dengan_orang)}</ul></div>
            <div class="personality-section"><div class="personality-title">😤 Saat Marah & Kecewa</div><ul class="personality-points">${renderList(personality.saat_marah_dan_kecewa)}</ul></div>
            <div class="personality-section"><div class="personality-title">🔮 Fakta Unik</div><ul class="personality-points">${renderList(personality.fakta_unik?.points)}</ul><div class="vibes-text">👀 ${escapeHtml(personality.fakta_unik?.first_impression || "")}</div></div>
            <div class="personality-section"><div class="personality-title">💞 Cocok dengan Zodiak</div><ul class="personality-points">${renderList(personality.cocok_dengan?.zodiak)}</ul><div class="vibes-text">💬 ${escapeHtml((personality.cocok_dengan?.alasan || []).join(" · "))}</div></div>
            <div class="personality-section"><div class="personality-title">💔 Tidak Cocok dengan</div><ul class="personality-points">${renderList(personality.tidak_cocok_dengan?.zodiak)}</ul><div class="vibes-text">⚡ ${escapeHtml((personality.tidak_cocok_dengan?.alasan || []).join(" · "))}</div></div>
          `;
        } else {
          aiResultArea.innerHTML = `<div class="personality-section"><div class="vibes-text">❌ Gagal memuat data dari API. Coba lagi nanti.</div></div>`;
        }
      } catch (err) {
        aiResultArea.innerHTML = `<div class="personality-section"><div class="vibes-text">⚠️ Error: ${escapeHtml(err.message)}</div></div>`;
      } finally {
        newBtn.disabled = false;
        newBtn.style.opacity = "1";
        newBtn.style.cursor = "pointer";
      }
    });

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";

    function tickModal() {
      if (!activePerson) return;
      if (activePerson.isToday) {
        document.getElementById("tDays").textContent = "00";
        document.getElementById("tHours").textContent = "00";
        document.getElementById("tMins").textContent = "00";
        document.getElementById("tSecs").textContent = "00";
        return;
      }
      const { d, h, m, s } = formatSecs(
        secsUntilBirthday(activePerson.d, activePerson.m),
      );
      document.getElementById("tDays").textContent = pad(d);
      document.getElementById("tHours").textContent = pad(h);
      document.getElementById("tMins").textContent = pad(m);
      document.getElementById("tSecs").textContent = pad(s);
    }

    if (modalInterval) clearInterval(modalInterval);
    tickModal();
    modalInterval = setInterval(tickModal, 1000);
  }

  // Helper escape HTML
  function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>]/g, function (m) {
      if (m === "&") return "&amp;";
      if (m === "<") return "&lt;";
      if (m === ">") return "&gt;";
      return m;
    });
  }

  window.closeModalBg = (e) => {
    if (e.target.id === "modalOverlay") closeModalDirect();
  };
  window.closeModalDirect = () => {
    document.getElementById("modalOverlay").classList.remove("open");
    document.body.style.overflow = "";
    if (modalInterval) clearInterval(modalInterval);
    activePerson = null;
  };

  window.openZodiacModal = (name) => {
    const data = ZODIAC_DETAIL[name];
    if (!data) return;
    const zodiacInfo = ZODIAC.find((z) => z.name === name);
    document.getElementById("zAvatar").textContent = zodiacInfo.sym;
    document.getElementById("zName").textContent = name;
    document.getElementById("zElement").textContent = "Elemen " + data.element;
    document.getElementById("zDetails").innerHTML = `
      <div class="detail-row"><span class="detail-label">🌟 Sifat</span><span class="detail-value">${data.sifat}</span></div>
      <div class="detail-row"><span class="detail-label">⚠️ Kelemahan</span><span class="detail-value rose">${data.kelemahan}</span></div>
      <div class="detail-row"><span class="detail-label">💕 Cocok</span><span class="detail-value">${data.cocok}</span></div>
      <div class="detail-row"><span class="detail-label">📖 Deskripsi</span><span class="detail-value">${data.deskripsi}</span></div>
    `;
    document.getElementById("zodiacOverlay").classList.add("open");
  };

  window.closeZodiac = () =>
    document.getElementById("zodiacOverlay").classList.remove("open");
  window.closeZodiacBg = (e) => {
    if (e.target.id === "zodiacOverlay") closeZodiac();
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModalDirect();
      window.closeZodiac();
    }
  });
})();
