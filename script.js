(function () {
  // get
  const params = new URLSearchParams(window.location.search);
  const getData = params.get("data");

  // ===================== DATA TETAP =====================
  const RAW = {
    ["24m11"]: [
      { name: "Azura Nasya", hbd: "01,02,2006" },
      { name: "Auliya Maharlika", hbd: "26, 05, 2007" },
      { name: "Bulan Febiola", hbd: "27,02,2005" },
      { name: "Dini Nafiza", hbd: "09,06,2006" },
      { name: "Siti Zahra Fazria", hbd: "03,03,2006" },
      { name: "Siti Fauziah Tarigan", hbd: "18,12,2006" },
      { name: "Ihsan Baihaqi", hbd: "04,03,2006" },
      { name: "Hairul Mahesa", hbd: "29,05,2004" },
      { name: "Fauzi Hendrawan", hbd: "30,03,2004" },
      { name: "Anaya Oktavia", hbd: "18,10,2006" },
    ],

    ["saentis"]: [
      { name: "Ihsan Baihaqi", hbd: "01,03,2006" },
      { name: "Fahriza Agustiawan", hbd: "28,08,2008" },
      { name: "Ahmad Faris", hbd: "22,07,2015" },
    ],
  };

  // ===================== CEK DATA =====================
  // Jika data tidak ada, tampilkan pesan error
  if (!RAW[getData]) {
    const container = document.getElementById("cards");
    const spotlightDesc = document.getElementById("spotlightDesc");
    const soonestDesc = document.getElementById("soonestDesc");
    const totalDesc = document.getElementById("totalDesc");

    // Update stats
    spotlightDesc.innerHTML = `<span class="text-slate-500 font-medium">⚠️ Data tidak ditemukan</span>`;
    soonestDesc.innerHTML = `<span class="text-slate-500 font-medium">—</span>`;
    totalDesc.innerHTML = `<span class="text-slate-500 font-medium">0 Teman</span>`;

    // Tampilkan pesan error di container
    container.innerHTML = `
      <div class="col-span-full text-center py-16 bg-white border border-slate-200 rounded-3xl shadow-sm">
        <span class="text-6xl block mb-4">🔍</span>
        <h3 class="text-lg font-bold text-slate-800 mb-2">Data Tidak Ditemukan</h3>
        <p class="text-sm text-slate-400 max-w-sm mx-auto">
          Maaf, data untuk <strong>"${getData}"</strong> tidak tersedia. 
          Silakan periksa kembali parameter URL Anda.
        </p>
        <div class="mt-4 text-xs text-slate-400">
          <i class="fa-regular fa-circle-info"></i> Contoh: <code class="bg-slate-100 px-2 py-1 rounded">?data=24m11</code>
        </div>
      </div>
    `;

    // Sembunyikan search & filter
    document.querySelector(".mb-6.flex").style.display = "none";
    return; // Stop eksekusi
  }

  // ===================== LANJUTKAN KODE =====================
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

  // Utility Methods
  function getZodiac(d, m) {
    for (const z of ZODIAC) {
      if (m < z.end[0] || (m === z.end[0] && d <= z.end[1])) return z;
    }
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

  // Fetch API personality
  async function fetchPersonality(nama, lahir, ultah, zodiak) {
    const url = `https://ihsanbaihaqi.vercel.app/api/sifat?nama=${encodeURIComponent(nama)}&lahir=${encodeURIComponent(lahir)}&ultah=${encodeURIComponent(ultah)}&zodiak=${encodeURIComponent(zodiak)}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("API error");
      const text = await res.text();

      try {
        const json = JSON.parse(text);
        return json;
      } catch (e) {
        console.error("JSON Invalid:", text);
        return null;
      }
    } catch (err) {
      console.warn(err);
      return null;
    }
  }

  // Build data structure
  const nowDate = todayDate();
  document.getElementById("todayLabelText").innerHTML =
    `${DAYS_ID[nowDate.getDay()]}, ${nowDate.getDate()} ${MONTHS_ID[nowDate.getMonth()]} ${nowDate.getFullYear()}`;

  let currentSortMode = "days"; // 'days' or 'alpha'

  let people = RAW[getData]?.map((p) => {
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
  });

  // Spotlight widget filling
  const todayBDays = people.filter((p) => p.isToday);
  const spotlightCard = document.getElementById("spotlightCard");
  const spotlightDesc = document.getElementById("spotlightDesc");

  if (todayBDays.length > 0) {
    spotlightCard.classList.add("ring-2", "ring-brand-gold", "bg-yellow-50/50");
    spotlightDesc.innerHTML = `<span class="text-brand-gold font-extrabold text-sm sm:text-base pulse-breathe"><i class="fa-solid fa-gift mr-1 animate-bounce"></i> ${todayBDays[0].name} (${todayBDays[0].age} Thn) UlTah Hari ini!</span>`;
  } else {
    spotlightDesc.innerHTML = `<span class="text-slate-500 font-medium">Wah, tidak ada yang ulang tahun hari ini.</span>`;
  }

  // Soonest birthday calculation
  const upcomingSorted = [...people].sort((a, b) => a.days - b.days);
  const nextUpcoming = upcomingSorted.filter((p) => !p.isToday)[0];
  if (nextUpcoming) {
    document.getElementById("soonestDesc").innerHTML =
      `<span class="text-brand-rose font-bold text-sm sm:text-base">${nextUpcoming.name} (${nextUpcoming.days} hari lagi)</span>`;
  } else if (todayBDays.length > 0) {
    document.getElementById("soonestDesc").textContent =
      `Semua terdekat dirayakan hari ini!`;
  }

  // Update total
  document.getElementById("totalDesc").innerHTML =
    `<span class="font-bold">${people.length}</span> Teman Terdaftar`;

  const container = document.getElementById("cards");
  let cardTimerMap = {};

  // Render Cards function
  function renderCards(filterQuery = "") {
    container.innerHTML = "";
    cardTimerMap = {};

    let sortedPeople = [...people];

    if (currentSortMode === "days") {
      sortedPeople.sort((a, b) => {
        if (a.days === 0 && b.days !== 0) return -1;
        if (a.days !== 0 && b.days === 0) return 1;
        return a.days - b.days;
      });
    } else if (currentSortMode === "alpha") {
      sortedPeople.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Apply search filtering
    if (filterQuery.trim() !== "") {
      const query = filterQuery.toLowerCase().trim();
      sortedPeople = sortedPeople.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.zodiac.name.toLowerCase().includes(query),
      );
    }

    if (sortedPeople.length === 0) {
      document.getElementById("emptySearchResults").classList.remove("hidden");
      return;
    } else {
      document.getElementById("emptySearchResults").classList.add("hidden");
    }

    sortedPeople.forEach((p, idx) => {
      const card = document.createElement("div");
      card.className = `bg-white border select-none transition-all duration-300 rounded-3xl p-5 flex flex-col justify-between cursor-pointer card-animate relative overflow-hidden shadow-sm hover:translate-y-[-4px] hover:shadow-md active:scale-[0.98] ${
        p.isToday
          ? "border-brand-gold ring-2 ring-brand-gold/70 bg-gradient-to-br from-yellow-50/20 to-amber-50/10"
          : p.days <= 7
            ? "border-brand-rose ring-1 ring-brand-rose/20"
            : "border-slate-200"
      }`;

      card.style.animationDelay = `${idx * 60}ms`;

      const bdateStr = `${p.d} ${MONTHS_ID[p.m - 1]} ${p.y}`;
      const timerId = `timer-${idx}`;

      card.innerHTML = `
              ${
                p.isToday
                  ? `<div class="absolute -right-6 -top-6 w-14 h-14 bg-brand-gold flex items-end justify-center pb-2.5 rotate-45 select-none text-xs"><i class="fa-solid fa-award text-amber-950"></i></div>`
                  : p.days <= 7
                    ? `<div class="absolute -right-6 -top-6 w-14 h-14 bg-brand-rose flex items-end justify-center pb-2.5 rotate-45 select-none text-xs"><i class="fa-solid fa-circle-exclamation text-white"></i></div>`
                    : ""
              }

              <div class="flex items-start justify-between gap-3 mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 border ${
                    p.isToday
                      ? "bg-brand-gold text-slate-900 border-amber-400 text-lg"
                      : p.days <= 7
                        ? "bg-brand-rose/10 text-brand-rose border-brand-rose/20"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                  }">
                    ${p.isToday ? '<i class="fa-solid fa-cake-candles text-slate-900"></i>' : idx + 1}
                  </div>
                  <div>
                    <h3 class="font-extrabold text-base text-slate-800 leading-tight">${p.name}</h3>
                    <span class="text-[11px] font-bold text-slate-400 flex items-center gap-1 mt-0.5">
                      <span class="text-brand-teal">${p.zodiac.sym}</span> ${p.zodiac.name}
                    </span>
                  </div>
                </div>

                <div class="text-right shrink-0">
                  ${
                    p.isToday
                      ? `<span class="bg-brand-gold/20 text-yellow-800 border border-yellow-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider block animate-pulse">Hari Bahagia</span>`
                      : `<span class="text-xs font-extrabold text-slate-400 uppercase tracking-widest block">Hari lagi</span>
                       <span class="font-black text-2xl text-slate-700 leading-none">${p.days}</span>`
                  }
                </div>
              </div>

              <div class="space-y-2 mb-4">
                <div class="flex items-center justify-between text-xs py-1.5 border-b border-dashed border-slate-100">
                  <span class="text-slate-400 font-semibold"><i class="fa-solid fa-calendar text-slate-400 mr-1.5 w-3.5"></i> Tanggal Lahir</span>
                  <span class="text-slate-600 font-bold">${bdateStr}</span>
                </div>
                <div class="flex items-center justify-between text-xs py-1.5 border-b border-dashed border-slate-100">
                  <span class="text-slate-400 font-semibold"><i class="fa-solid fa-hourglass-start text-slate-400 mr-1.5 w-3.5"></i> Usia Saat ini</span>
                  <span class="text-slate-600 font-extrabold">${p.isToday ? `<span class="text-brand-gold font-black">${p.age} Tahun</span>` : `${p.age} Tahun`}</span>
                </div>
                <div class="flex items-center justify-between text-xs py-1.5">
                  <span class="text-slate-400 font-semibold"><i class="fa-solid fa-arrow-up-right-dots text-slate-400 mr-1.5 w-3.5"></i> Ultah Berikutnya</span>
                  <span class="text-slate-600 font-bold text-right">${p.turningAge} tahun (${p.bdayOfWeek})</span>
                </div>
              </div>

              <div>
                <div class="text-[11px] font-semibold text-slate-500 mb-2 font-mono flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5" id="${timerId}">
                </div>

                <div class="relative w-full h-[6px] bg-slate-100 rounded-full overflow-hidden">
                  <div class="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                    p.isToday
                      ? "bg-brand-gold"
                      : p.days <= 7
                        ? "bg-brand-rose"
                        : "bg-brand-primary"
                  }" style="width: ${p.progress}%"></div>
                </div>
              </div>
            `;

      card.addEventListener("click", () => openModal(p));
      container.appendChild(card);
      if (!p.isToday) cardTimerMap[timerId] = p;
    });

    tickCards();
  }

  // Ticking logic for secondary cards
  function tickCards() {
    for (const [id, p] of Object.entries(cardTimerMap)) {
      const el = document.getElementById(id);
      if (!el) continue;
      const sec = secsUntilBirthday(p.d, p.m);
      const { d, h, m, s } = formatSecs(sec);

      if (d >= 2) {
        el.innerHTML = `<span>⏳ Jeda</span><span class="font-bold text-slate-700">${d} hari · ${pad(h)}:${pad(m)}:${pad(s)}</span>`;
      } else if (d === 1) {
        el.innerHTML = `<span>⏰ Jeda</span><span class="font-bold text-brand-rose animate-pulse">Besok · ${pad(h)}j ${pad(m)}m</span>`;
      } else {
        el.innerHTML = `<span>🔥 Jeda</span><span class="font-bold text-brand-rose animate-pulse">${pad(h)}j ${pad(m)}m ${pad(s)}d lagi!</span>`;
      }
    }
  }
  setInterval(tickCards, 1000);

  // Sorting & Searching Logic
  window.sortByDays = function () {
    currentSortMode = "days";
    document
      .getElementById("sortBtnDays")
      .classList.replace("bg-slate-50", "bg-brand-primary");
    document
      .getElementById("sortBtnDays")
      .classList.replace("text-slate-600", "text-white");
    document
      .getElementById("sortBtnDays")
      .classList.replace("border-slate-200", "border-brand-primary");

    document
      .getElementById("sortBtnAlphabet")
      .classList.replace("bg-brand-primary", "bg-slate-50");
    document
      .getElementById("sortBtnAlphabet")
      .classList.replace("text-white", "text-slate-600");
    document
      .getElementById("sortBtnAlphabet")
      .classList.replace("border-brand-primary", "border-slate-200");

    renderCards(document.getElementById("searchInput").value);
  };

  window.sortAlphabetically = function () {
    currentSortMode = "alpha";
    document
      .getElementById("sortBtnAlphabet")
      .classList.replace("bg-slate-50", "bg-brand-primary");
    document
      .getElementById("sortBtnAlphabet")
      .classList.replace("text-slate-600", "text-white");
    document
      .getElementById("sortBtnAlphabet")
      .classList.replace("border-slate-200", "border-brand-primary");

    document
      .getElementById("sortBtnDays")
      .classList.replace("bg-brand-primary", "bg-slate-50");
    document
      .getElementById("sortBtnDays")
      .classList.replace("text-white", "text-slate-600");
    document
      .getElementById("sortBtnDays")
      .classList.replace("border-brand-primary", "border-slate-200");

    renderCards(document.getElementById("searchInput").value);
  };

  // Search Input change triggers rendering
  document.getElementById("searchInput").addEventListener("input", (e) => {
    renderCards(e.target.value);
  });

  // Initialize cards output render
  renderCards();

  // Modal triggers
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
    const personalityDiv = document.getElementById("aiResultArea");

    mAvatar.innerHTML = p.isToday
      ? "<i class='fa-solid fa-candy-cane text-amber-500 animate-bounce'></i>"
      : p.days <= 7
        ? "<i class='fa-solid fa-gift text-brand-rose'></i>"
        : "<i class='fa-solid fa-hourglass-half text-brand-primary'></i>";
    mName.textContent = p.name;

    mHeader.className =
      "px-6 pb-6 pt-5 text-center flex flex-col items-center border-b border-xs " +
      (p.isToday
        ? "bg-amber-50/20 border-amber-100"
        : "bg-slate-50/50 border-slate-100");

    if (p.isToday) {
      mStatus.className =
        "mt-2 text-xs sm:text-sm font-extrabold inline-flex px-3.5 py-1 rounded-full bg-brand-gold/15 text-amber-700 border border-brand-gold/40 animate-pulse";
      mStatus.textContent = "🎉 Sedang Berulang Tahun Hari Ini!";
      document.getElementById("mTimerLabel").textContent =
        "Sedang Merayakan Kebahagiaan 🎂";
    } else {
      mStatus.className =
        "mt-2 text-xs sm:text-sm font-semibold inline-flex px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200/60 text-slate-600";
      mStatus.textContent = `Menunggu ulang tahun berikutnya`;
      document.getElementById("mTimerLabel").textContent =
        "Hitung Mundur Ulang Tahun";
    }

    const birthWeekday = DAYS_ID[new Date(p.y, p.m - 1, p.d).getDay()];
    const bdateStr = `${birthWeekday}, ${p.d} ${MONTHS_ID[p.m - 1]} ${p.y}`;
    const nextYear = p.nb.getFullYear();
    const nextStr = `${p.bdayOfWeek}, ${p.d} ${MONTHS_ID[p.m - 1]} ${nextYear}`;
    const totalDays = Math.round(
      (todayDate() - new Date(p.y, p.m - 1, p.d)) / 86400000,
    );

    mDetails.innerHTML = `
            <div class="flex items-center justify-between px-4 py-3 text-xs sm:text-sm transition-all hover:bg-slate-50">
              <span class="text-slate-400 font-bold"><i class="fa-solid fa-cake-candles mr-2 w-4"></i>Hari Lahir</span>
              <span class="text-slate-800 font-extrabold text-right">${bdateStr}</span>
            </div>
            <div class="flex items-center justify-between px-4 py-3 text-xs sm:text-sm transition-all hover:bg-slate-50">
              <span class="text-slate-400 font-bold"><i class="fa-solid fa-user-clock mr-2 w-4"></i>Usia Sekarang</span>
              <span class="text-brand-primary font-black text-right">${p.age} Tahun</span>
            </div>
            <div class="flex items-center justify-between px-4 py-3 text-xs sm:text-sm transition-all hover:bg-slate-50">
              <span class="text-slate-400 font-bold"><i class="fa-solid fa-arrow-up-right-dots mr-2 w-4"></i>Akan Berumur</span>
              <span class="text-brand-rose font-black text-right">${p.turningAge} Tahun ${p.isToday ? "(Hari ini!)" : ""}</span>
            </div>
            <div class="flex items-center justify-between px-4 py-3 text-xs sm:text-sm transition-all hover:bg-slate-50">
              <span class="text-slate-400 font-bold"><i class="fa-solid fa-arrows-spin mr-2 w-4"></i>Jatuh Hari</span>
              <span class="text-slate-800 font-extrabold text-right">${p.isToday ? "HARI INI" : nextStr}</span>
            </div>
            <div class="flex items-center justify-between px-4 py-3 text-xs sm:text-sm transition-all hover:bg-slate-50">
              <span class="text-slate-400 font-bold"><i class="fa-solid fa-calendar-check mr-2 w-4"></i>Sisa Jarak</span>
              <span class="text-slate-800 font-extrabold text-right">${p.isToday ? "0 Hari" : `${p.days} hari lagi`}</span>
            </div>
            <div class="flex items-center justify-between px-4 py-3 text-xs sm:text-sm transition-all hover:bg-slate-50">
              <span class="text-slate-400 font-bold"><i class="fa-solid fa-star-and-crescent mr-2 w-4"></i>Zodiak</span>
              <span class="text-right">
                <button class="inline-flex items-center gap-1.5 bg-brand-teal/10 hover:bg-brand-teal/20 active:scale-95 text-brand-teal border border-brand-teal/25 px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer" onclick="window.openZodiacModal('${p.zodiac.name}')">
                  <span>${p.zodiac.sym} ${p.zodiac.name}</span> <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                </button>
              </span>
            </div>
            <div class="flex items-center justify-between px-4 py-3 text-xs sm:text-sm transition-all hover:bg-slate-50">
              <span class="text-slate-400 font-bold"><i class="fa-solid fa-heartbeat mr-2 w-4"></i>Telah Hidup</span>
              <span class="text-slate-800 font-extrabold text-right">${totalDays.toLocaleString("id")} Hari</span>
            </div>
          `;

    // Clear previous personality contents
    personalityDiv.innerHTML = "";

    const newBtn = document.getElementById("aiGenerateBtn");
    newBtn.style.opacity = "1";
    newBtn.style.cursor = "pointer";
    newBtn.disabled = false;

    const cleanBtn = newBtn.cloneNode(true);
    newBtn.parentNode.replaceChild(cleanBtn, newBtn);

    cleanBtn.addEventListener("click", () => handleAIPersonalityGeneration(p));

    overlay.classList.remove("pointer-events-none", "opacity-0");
    overlay.classList.add("opacity-100");
    document
      .getElementById("modal")
      .classList.remove("scale-95", "translate-y-4");
    document
      .getElementById("modal")
      .classList.add("scale-100", "translate-y-0");
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

  // AI personality generator dengan semua field baru
  async function handleAIPersonalityGeneration(p) {
    const aiBtn = document.getElementById("aiGenerateBtn");
    const aiResultArea = document.getElementById("aiResultArea");

    aiResultArea.innerHTML = `
            <div class="bg-indigo-50/50 border border-indigo-100 rounded-3xl p-6 text-center animate-pulse">
              <div class="text-brand-primary text-2xl mb-2 flex items-center justify-center gap-1.5">
                <i class="fa-solid fa-spin fa-circle-notch"></i>
              </div>
              <div class="text-sm font-bold text-slate-700 w-full" id="aiStatusLabel">Membaca tatanan perbintangan dan energi aura...</div>
              <div class="flex items-center justify-center gap-1.5 mt-2">
                <span class="w-1.5 h-1.5 rounded-full bg-brand-teal dot-pulse"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-brand-teal dot-pulse-2"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-brand-teal dot-pulse-3"></span>
              </div>
            </div>
          `;

    aiBtn.disabled = true;
    aiBtn.style.opacity = "0.5";
    aiBtn.style.cursor = "not-allowed";

    const loadingSteps = [
      "Menganalisis hubungan zodiak & weton lahir...",
      "Memetakan spektrum warna aura spiritual...",
      "Menghubungkan jaringan intelijen kecerdasan buatan...",
      "Mempersiapkan deskripsi karakter mendalam...",
    ];

    let step = 0;
    const statusInterval = setInterval(() => {
      if (step < loadingSteps.length) {
        const statusLabel = document.getElementById("aiStatusLabel");
        if (statusLabel) statusLabel.textContent = loadingSteps[step];
        step++;
      }
    }, 2000);

    try {
      const birthWeekdayAPI = DAYS_ID[new Date(p.y, p.m - 1, p.d).getDay()];
      const lahirString = `${birthWeekdayAPI}, ${p.d} ${MONTHS_ID[p.m - 1]} ${p.y}`;
      const ultahString = `${p.bdayOfWeek}, ${p.d} ${MONTHS_ID[p.m - 1]} ${p.nb.getFullYear()}`;

      const data = await fetchPersonality(
        p.name,
        lahirString,
        ultahString,
        p.zodiac.name,
      );

      clearInterval(statusInterval);

      if (data && typeof data === "object" && Object.keys(data).length > 0) {
        renderAISequentialResults(data);
      } else {
        aiResultArea.innerHTML = `
                <div class="border border-red-200 bg-red-50 text-red-650 p-4 rounded-2xl flex items-center gap-2">
                  <i class="fa-solid fa-circle-exclamation text-base"></i>
                  <span class="text-xs font-semibold">Gagal menerima data kepribadian dari server. Coba klik lagi sebentar lagi!</span>
                </div>
              `;
      }
    } catch (err) {
      clearInterval(statusInterval);
      aiResultArea.innerHTML = `
              <div class="border border-red-200 bg-red-50 text-red-650 p-4 rounded-2xl text-xs font-semibold">
                ⚠️ Kesalahan koneksi: ${escapeHtml(err.message)}
              </div>
            `;
    } finally {
      aiBtn.disabled = false;
      aiBtn.style.opacity = "1";
      aiBtn.style.cursor = "pointer";
    }
  }

  // SEQUENTIAL REVEAL ANIMATOR dengan semua field baru
  function renderAISequentialResults(personality) {
    const aiResultArea = document.getElementById("aiResultArea");
    aiResultArea.innerHTML = "";

    // Semua section dari endpoint baru
    const sections = [
      // Personality Archetype
      {
        title: "🏆 Personality Archetype",
        content: personality.personality_archetype
          ? `
            <div class="font-bold text-slate-800">${personality.personality_archetype.nama || ""}</div>
            <div class="text-sm text-slate-600 mt-1">${personality.personality_archetype.deskripsi || ""}</div>
          `
          : null,
        icon: "fa-crown",
        accent: "text-purple-600 bg-purple-50 border-purple-100",
      },
      // Aura
      {
        title: "✨ Aura",
        content: personality.aura
          ? `
            <div class="font-bold text-slate-800">${personality.aura.tipe || ""}</div>
            <div class="text-sm text-slate-600 mt-1">${personality.aura.deskripsi || ""}</div>
            ${personality.aura.warna ? `<div class="text-xs text-slate-500 mt-1">🎨 ${personality.aura.warna}</div>` : ""}
          `
          : null,
        icon: "fa-meteor",
        accent: "text-amber-600 bg-amber-50 border-amber-100",
      },
      // Personality Score
      {
        title: "📊 Personality Score",
        content: personality.personality_score
          ? Object.entries(personality.personality_score)
              .map(([key, value]) => {
                const label = key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase());
                const colors = {
                  overthinking: "#f59e0b",
                  bucin: "#ec4899",
                  humor: "#8b5cf6",
                  ambisi: "#ef4444",
                  sensitif: "#f97316",
                  spontan: "#06b6d4",
                  loyal: "#10b981",
                  main_character_energy: "#f43f5e",
                };
                const color = colors[key] || "#6366f1";
                return `
                  <div class="mb-2">
                    <div class="flex justify-between text-xs">
                      <span class="font-medium text-slate-600">${label}</span>
                      <span class="font-bold text-slate-800">${value}%</span>
                    </div>
                    <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div class="h-full rounded-full transition-all" style="width: ${value}%; background: ${color}"></div>
                    </div>
                  </div>
                `;
              })
              .join("")
          : null,
        icon: "fa-chart-simple",
        accent: "text-indigo-600 bg-indigo-50 border-indigo-100",
      },
      // Kepribadian Umum
      {
        title: "Kepribadian Umum",
        points: personality.kepribadian_umum?.points || [],
        vibes: personality.kepribadian_umum?.vibes,
        icon: "fa-brain",
        accent: "text-indigo-600 bg-indigo-50 border-indigo-100",
        isVibeLabel: "🎵 Vibes",
      },
      // First Impression
      {
        title: "👀 First Impression",
        points: [
          ...(personality.first_impression?.yang_orang_lihat || []).map(
            (p) => `👤 Orang lihat: ${p}`,
          ),
          ...(personality.first_impression?.aslinya || []).map(
            (p) => `💖 Aslinya: ${p}`,
          ),
        ],
        icon: "fa-eye",
        accent: "text-blue-600 bg-blue-50 border-blue-100",
      },
      // Green Flags
      {
        title: "✅ Green Flags",
        points: personality.green_flags || [],
        icon: "fa-circle-check",
        accent: "text-emerald-600 bg-emerald-50 border-emerald-100",
      },
      // Red Flags
      {
        title: "⚠️ Red Flags",
        points: personality.red_flags || [],
        icon: "fa-circle-exclamation",
        accent: "text-rose-600 bg-rose-50 border-rose-100",
      },
      // Percintaan
      {
        title: "💕 Percintaan",
        points: personality.percintaan?.points || [],
        vibes: personality.percintaan?.vibes,
        icon: "fa-heart",
        accent: "text-pink-600 bg-pink-50 border-pink-100",
        isVibeLabel: "💞 Aura Asmara",
      },
      // Love Language
      {
        title: "💌 Love Language",
        points: [
          ...(personality.love_language?.cara_menunjukkan || []).map(
            (p) => `💝 ${p}`,
          ),
          ...(personality.love_language?.yang_dibutuhkan || []).map(
            (p) => `🤗 ${p}`,
          ),
        ],
        vibes: personality.love_language?.utama,
        icon: "fa-language",
        accent: "text-rose-600 bg-rose-50 border-rose-100",
        isVibeLabel: "❤️ Utama",
      },
      // Crush Mode
      {
        title: "😍 Crush Mode",
        points: [
          ...(personality.crush_mode?.saat_mulai_suka || []).map(
            (p) => `💫 ${p}`,
          ),
          ...(personality.crush_mode?.cara_mencari_perhatian || []).map(
            (p) => `✨ ${p}`,
          ),
          ...(personality.crush_mode?.tanda_tanda || []).map((p) => `🔮 ${p}`),
        ],
        icon: "fa-face-smile-beam",
        accent: "text-purple-600 bg-purple-50 border-purple-100",
      },
      // Relationship Mode
      {
        title: "💑 Relationship Mode",
        points: [
          ...(personality.relationship_mode
            ? [
                `💪 Saat single: ${personality.relationship_mode.saat_single || ""}`,
                `😊 Saat nyaman: ${personality.relationship_mode.saat_nyaman || ""}`,
                `😤 Saat cemburu: ${personality.relationship_mode.saat_cemburu || ""}`,
                `😢 Saat kecewa: ${personality.relationship_mode.saat_kecewa || ""}`,
              ].filter((p) => !p.endsWith(":"))
            : []),
        ],
        icon: "fa-ring",
        accent: "text-indigo-600 bg-indigo-50 border-indigo-100",
      },
      // Saat Marah dan Kecewa
      {
        title: "😤 Saat Marah & Kecewa",
        points: personality.saat_marah_dan_kecewa || [],
        icon: "fa-face-angry",
        accent: "text-red-600 bg-red-50 border-red-100",
      },
      // Social Battery
      {
        title: "🔋 Social Battery",
        points: [
          ...(personality.social_battery?.kebiasaan || []),
          ...(personality.social_battery?.saat_lelah_sosial || []).map(
            (p) => `🔄 ${p}`,
          ),
        ],
        vibes: personality.social_battery?.tipe,
        icon: "fa-battery-three-quarters",
        accent: "text-cyan-600 bg-cyan-50 border-cyan-100",
        isVibeLabel: "⚡ Tipe Energi",
      },
      // Friendship Personality
      {
        title: "🤝 Friendship Personality",
        points: [
          ...(personality.friendship_personality
            ? [
                `🎯 Tipe: ${personality.friendship_personality.tipe || ""}`,
                ...(personality.friendship_personality.points || []),
              ]
            : []),
        ],
        icon: "fa-user-group",
        accent: "text-emerald-600 bg-emerald-50 border-emerald-100",
      },
      // Chat Personality
      {
        title: "💬 Chat Personality",
        points: [
          ...(personality.chat_personality
            ? [
                `📝 Gaya: ${personality.chat_personality.gaya_chat || ""}`,
                ...(personality.chat_personality.kebiasaan || []).map(
                  (p) => `💭 ${p}`,
                ),
                ...(personality.chat_personality.saat_suka_seseorang || []).map(
                  (p) => `😊 ${p}`,
                ),
                ...(personality.chat_personality.saat_tidak_tertarik || []).map(
                  (p) => `😐 ${p}`,
                ),
              ].filter((p) => !p.endsWith(":"))
            : []),
        ],
        icon: "fa-comment",
        accent: "text-blue-600 bg-blue-50 border-blue-100",
      },
      // Social Media Personality
      {
        title: "📱 Social Media Personality",
        points: [
          ...(personality.social_media_personality
            ? [
                `🎯 Tipe: ${personality.social_media_personality.tipe || ""}`,
                ...(personality.social_media_personality.kebiasaan || []).map(
                  (p) => `📌 ${p}`,
                ),
              ]
            : []),
        ],
        vibes: personality.social_media_personality?.vibes,
        icon: "fa-share-nodes",
        accent: "text-violet-600 bg-violet-50 border-violet-100",
        isVibeLabel: "📱 Vibes",
      },
      // Kebiasaan Random
      {
        title: "🎲 Kebiasaan Random",
        points: personality.kebiasaan_random || [],
        icon: "fa-shuffle",
        accent: "text-fuchsia-600 bg-fuchsia-50 border-fuchsia-100",
      },
      // Anime Character Vibes
      {
        title: "🎬 Anime Character Vibes",
        points: (personality.anime_character_vibes?.karakter || []).map(
          (k, i) => {
            const alasan = personality.anime_character_vibes?.alasan?.[i] || "";
            return `${k} — ${alasan}`;
          },
        ),
        icon: "fa-tv",
        accent: "text-pink-600 bg-pink-50 border-pink-100",
      },
      // Game Character Vibes
      {
        title: "🎮 Game Character Vibes",
        points: (personality.game_character_vibes?.karakter || []).map(
          (k, i) => {
            const alasan = personality.game_character_vibes?.alasan?.[i] || "";
            return `${k} — ${alasan}`;
          },
        ),
        icon: "fa-gamepad",
        accent: "text-orange-600 bg-orange-50 border-orange-100",
      },
      // Idol Vibes
      {
        title: "⭐ Idol Vibes",
        points: (personality.idol_vibes?.karakter || []).map((k, i) => {
          const alasan = personality.idol_vibes?.alasan?.[i] || "";
          return `${k} — ${alasan}`;
        }),
        icon: "fa-star",
        accent: "text-rose-600 bg-rose-50 border-rose-100",
      },
      // Cocok Dengan
      {
        title: "🤝 Cocok Dengan",
        points: personality.cocok_dengan?.zodiak || [],
        alasan: personality.cocok_dengan?.alasan,
        isCompatibility: true,
        icon: "fa-handshake",
        accent: "text-teal-600 bg-teal-50 border-teal-100",
      },
      // Tidak Cocok Dengan
      {
        title: "❌ Tidak Cocok Dengan",
        points: personality.tidak_cocok_dengan?.zodiak || [],
        alasan: personality.tidak_cocok_dengan?.alasan,
        isCompatibility: true,
        icon: "fa-handshake-slash",
        accent: "text-rose-600 bg-rose-50 border-rose-100",
      },
      // Roasting
      {
        title: "🔥 Roasting",
        points: personality.roasting?.points || [],
        icon: "fa-fire",
        accent: "text-yellow-600 bg-yellow-50 border-yellow-100",
      },
      // Hidden Side
      {
        title: "🎭 Hidden Side",
        points: personality.hidden_side || [],
        icon: "fa-mask",
        accent: "text-slate-600 bg-slate-50 border-slate-200",
      },
      // Personality Verdict
      {
        title: "🏅 Personality Verdict",
        content: personality.personality_verdict
          ? `
            <div class="font-bold text-slate-800">${personality.personality_verdict.satu_kalimat || ""}</div>
            ${personality.personality_verdict.quote ? `<div class="text-sm text-brand-teal font-medium italic mt-1">💫 ${personality.personality_verdict.quote}</div>` : ""}
          `
          : null,
        icon: "fa-crown",
        accent: "text-brand-primary bg-indigo-50 border-indigo-100",
      },
    ];

    // Filter section yang valid
    const validSections = sections.filter(
      (sec) =>
        sec.content ||
        sec.points?.length > 0 ||
        (sec.vibes && sec.points?.length > 0),
    );

    // Render section containers
    validSections.forEach((sec, idx) => {
      const sectionEl = document.createElement("div");
      sectionEl.className =
        "bg-white border border-slate-200 p-5 rounded-2xl mb-4 transition-all duration-300 transform translate-y-4 opacity-0 shadow-sm";
      sectionEl.id = `ai-sec-${idx}`;

      sectionEl.innerHTML = `
              <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-3 shrink-0 cursor-pointer group select-none" onclick="window.toggleSectionCollapse(${idx})">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm ${sec.accent}">
                    <i class="fa-solid ${sec.icon}"></i>
                  </div>
                  <h4 class="font-extrabold text-[15px] sm:text-base text-slate-800">${sec.title}</h4>
                </div>
                <div class="text-slate-400 group-hover:text-slate-600 transition-colors w-7 h-7 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100" id="collapse-icon-${idx}">
                  <i class="fa-solid fa-chevron-up text-[10px]"></i>
                </div>
              </div>
              <div class="space-y-2.5" id="ai-points-${idx}"></div>
              <div class="mt-4 pt-3 border-t border-dashed border-slate-100 hidden" id="ai-vibes-${idx}"></div>
            `;

      aiResultArea.appendChild(sectionEl);
    });

    // Fade in sections
    validSections.forEach((sec, idx) => {
      setTimeout(() => {
        const el = document.getElementById(`ai-sec-${idx}`);
        if (el) {
          el.classList.remove("opacity-0", "translate-y-4");
          el.classList.add("opacity-100", "translate-y-0");
        }
      }, idx * 80);
    });

    // Sequential reveal points
    let currentSecIndex = 0;

    function startSequencing() {
      if (currentSecIndex >= validSections.length) return;

      const sec = validSections[currentSecIndex];
      const pointsList = document.getElementById(
        `ai-points-${currentSecIndex}`,
      );
      const vibesBox = document.getElementById(`ai-vibes-${currentSecIndex}`);

      // Handle content (special for archetype, aura, verdict)
      if (sec.content) {
        const div = document.createElement("div");
        div.className =
          "text-xs sm:text-sm text-slate-600 transition-all duration-300 opacity-0 transform translate-x-4";
        div.innerHTML = sec.content;
        pointsList.appendChild(div);
        requestAnimationFrame(() => {
          div.classList.remove("opacity-0", "translate-x-4");
          div.classList.add("opacity-100", "translate-x-0");
        });

        currentSecIndex++;
        setTimeout(startSequencing, 200);
        return;
      }

      let pointIndex = 0;

      function injectNextPoint() {
        if (pointIndex < sec.points.length) {
          const li = document.createElement("li");

          if (sec.isCompatibility) {
            const zodiacName = sec.points[pointIndex];
            const isConflict = sec.accent.includes("rose");
            const iconClass = isConflict
              ? "fa-circle-xmark text-rose-500"
              : "fa-circle-check text-brand-teal";

            li.className =
              "flex flex-col gap-1 w-full text-xs sm:text-sm text-slate-600 transition-all duration-300 opacity-0 transform translate-x-4 border-l-2 pl-3 py-2 bg-slate-50/50 rounded-r-xl " +
              (isConflict ? "border-rose-500/30" : "border-teal-500/30");
            li.innerHTML = `
                    <div class="font-extrabold text-slate-800 flex items-center gap-1.5">
                      <i class="fa-solid ${iconClass} text-xs"></i>
                      <span>${zodiacName}</span>
                    </div>
                    ${sec.alasan && typeof sec.alasan === "string" ? `<div class="text-xs text-slate-500 font-medium leading-relaxed pl-5">${sec.alasan}</div>` : ""}
                  `;
          } else {
            const point = sec.points[pointIndex];
            // Cek apakah point mengandung emoji di awal (untuk format khusus)
            const hasEmoji = /^[🔮✨💫💝🤗💪😊😤😢🎯📝💭😊😐📌🔄]/.test(point);
            const displayText = hasEmoji ? point : `✨ ${point}`;

            li.className =
              "flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 transition-all duration-300 opacity-0 transform translate-x-4";
            li.innerHTML = `
                    <span class="text-brand-teal shrink-0 mt-0.5"><i class="fa-solid fa-sparkles text-[10px]"></i></span>
                    <span class="leading-relaxed font-semibold text-slate-700">${displayText}</span>
                  `;
          }

          pointsList.appendChild(li);

          requestAnimationFrame(() => {
            li.classList.remove("opacity-0", "translate-x-4");
            li.classList.add("opacity-100", "translate-x-0");
          });

          pointIndex++;
          setTimeout(injectNextPoint, 150);
        } else {
          // Show vibes
          if (sec.vibes) {
            vibesBox.className =
              "mt-4 pt-3 border-t border-dashed border-slate-100 text-xs text-brand-teal font-medium flex flex-col gap-2";
            vibesBox.innerHTML = `
                    <span class="bg-teal-50 text-brand-teal px-2 py-0.5 rounded-md font-bold text-[10px] shrink-0 uppercase tracking-wider">${sec.isVibeLabel || "Review"}</span>
                    <span class="italic text-slate-500 font-medium">${sec.vibes}</span>
                  `;
            vibesBox.classList.remove("hidden");
            vibesBox.setAttribute("data-visible", "true");
          }

          currentSecIndex++;
          setTimeout(startSequencing, 150);
        }
      }

      injectNextPoint();
    }

    setTimeout(startSequencing, validSections.length * 80 + 150);
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

  // Section Collapse Toggle
  window.toggleSectionCollapse = (idx) => {
    const pointsList = document.getElementById(`ai-points-${idx}`);
    const vibesBox = document.getElementById(`ai-vibes-${idx}`);
    const iconContainer = document.getElementById(`collapse-icon-${idx}`);

    if (!pointsList) return;

    const isHidden = pointsList.classList.contains("hidden");
    if (isHidden) {
      pointsList.classList.remove("hidden");
      if (vibesBox && vibesBox.getAttribute("data-visible") === "true") {
        vibesBox.classList.remove("hidden");
      }
      if (iconContainer) {
        iconContainer.innerHTML =
          '<i class="fa-solid fa-chevron-up text-[10px]"></i>';
      }
    } else {
      pointsList.classList.add("hidden");
      if (vibesBox) {
        vibesBox.classList.add("hidden");
      }
      if (iconContainer) {
        iconContainer.innerHTML =
          '<i class="fa-solid fa-chevron-down text-[10px]"></i>';
      }
    }
  };

  // Close Modal Handlers
  window.closeModalBg = (e) => {
    if (e.target.id === "modalOverlay") closeModalDirect();
  };

  window.closeModalDirect = () => {
    const overlay = document.getElementById("modalOverlay");
    overlay.classList.add("opacity-0", "pointer-events-none");
    overlay.classList.remove("opacity-100");
    document.getElementById("modal").classList.add("scale-95", "translate-y-4");
    document
      .getElementById("modal")
      .classList.remove("scale-100", "translate-y-0");
    document.body.style.overflow = "";

    if (modalInterval) clearInterval(modalInterval);
    activePerson = null;
  };

  // Zodiac Model Dialogs
  window.openZodiacModal = (name) => {
    const data = ZODIAC_DETAIL[name];
    if (!data) return;
    const zodiacInfo = ZODIAC.find((z) => z.name === name);

    document.getElementById("zAvatar").textContent = zodiacInfo.sym;
    document.getElementById("zName").textContent = name;
    document.getElementById("zElement").textContent = "Elemen " + data.element;

    document.getElementById("zDetails").innerHTML = `
            <div class="flex items-center justify-between px-4 py-3 text-xs sm:text-sm transition-all hover:bg-slate-50 border-b border-slate-100">
              <span class="text-slate-400 font-bold"><i class="fa-solid fa-star-of-david mr-2"></i>Sifat Utama</span>
              <span class="text-slate-800 font-extrabold text-right">${data.sifat}</span>
            </div>
            <div class="flex items-center justify-between px-4 py-3 text-xs sm:text-sm transition-all hover:bg-slate-50 border-b border-slate-100">
              <span class="text-slate-400 font-bold"><i class="fa-solid fa-circle-exclamation mr-2 text-brand-rose"></i>Kelemahan</span>
              <span class="text-brand-rose font-black text-right">${data.kelemahan}</span>
            </div>
            <div class="flex items-center justify-between px-4 py-3 text-xs sm:text-sm transition-all hover:bg-slate-50 border-b border-slate-100">
              <span class="text-slate-400 font-bold"><i class="fa-solid fa-hands-holding-heart mr-2 text-teal-600"></i>Sinergi Cocok</span>
              <span class="text-slate-800 font-extrabold text-right">${data.cocok}</span>
            </div>
            <div class="flex items-center justify-between px-4 py-3 text-xs sm:text-sm transition-all hover:bg-slate-50">
              <div class="text-slate-400 font-bold shrink-0"><i class="fa-solid fa-scroll mr-2"></i>Deskripsi</div>
              <div class="text-slate-600 font-medium text-right text-xs max-w-[200px] leading-relaxed">${data.deskripsi}</div>
            </div>
          `;

    const zOverlay = document.getElementById("zodiacOverlay");
    zOverlay.classList.remove("pointer-events-none", "opacity-0");
    zOverlay.classList.add("opacity-100");
    zOverlay.firstElementChild.classList.remove("scale-95", "translate-y-4");
    zOverlay.firstElementChild.classList.add("scale-100", "translate-y-0");
  };

  window.closeZodiac = () => {
    const zOverlay = document.getElementById("zodiacOverlay");
    zOverlay.classList.add("opacity-0", "pointer-events-none");
    zOverlay.classList.remove("opacity-100");
    zOverlay.firstElementChild.classList.add("scale-95", "translate-y-4");
    zOverlay.firstElementChild.classList.remove("scale-100", "translate-y-0");
  };

  window.closeZodiacBg = (e) => {
    if (e.target.id === "zodiacOverlay") closeZodiac();
  };

  // Esc key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModalDirect();
      closeZodiac();
    }
  });
})();
