(function initPageStudioCMS() {
  const STORAGE_KEY = "page-studio-site-content-v2";

  const defaults = {
    global: {
      brandKo: "페이지 스튜디오",
      footerText: "정교한 조명과 예술적 퀄리티로 고객님의 이야기를 기록합니다.",
      phone: "010-0000-0000",
      instagram: "@page.studio",
      instagramUrl: "#",
      location: "부산 금정구 부산대 인근",
      hours: "화요일 - 일요일 / 10:00 - 19:00",
      email: "hello@pagestudio.kr"
    },
    home: {
      heroTitle: "당신이라는 이야기에,\n한 장을 더합니다",
      heroLead: "카메라 앞이 어색하셔도 괜찮아요.\n표정, 시선, 포즈까지 하나씩 함께 맞춰 드립니다.",
      fact1: "부산대 인근",
      fact2: "편안한 디렉팅",
      fact3: "정교한 조명",
      directionTitle: "정교한 조명과 미니멀한 구도",
      directionBody: "인물의 표정과 분위기가 자연스럽게 드러나도록 화면을 만들어 드립니다.",
      coreValue: "진정성 있는 기록",
      heroCaption: "당신의 이야기가 한 장면 안에서 또렷하게 드러나도록 돕습니다.",
      aboutTitle: "어색해도 괜찮아요.\n여기서는 자연스럽게 나올 수 있어요.",
      aboutBody1: "카메라 앞에 서는 게 낯선 분들도 많이 오십니다.\n시선, 표정, 손 위치까지 단계별로 차근차근 안내해드리니,\n와 보시면 생각보다 자연스럽게 찍히실 거예요.",
      aboutBody2: "촬영이 끝나면 충분한 여백, 차분한 색감으로 완성된 사진을 받아 보실 수 있어요.\n오래 두고 봐도 질리지 않는, 당신답게 보이는 결과물을 전달해드립니다.",
      service1Title: "개인 프로필",
      service1Body: "취업, 이직, SNS, 퍼스널 브랜딩. 단정하면서도 당신만의 인상이 살아있는 프로필 사진을 만들어 드립니다.",
      service1Meta: "의상 조율 · 시선 가이드 · 목적 맞춤 제안",
      service2Title: "웨딩 · 커플 촬영",
      service2Body: "두 분이 편안하게 있을 수 있는 분위기에서, 그 온도가 사진에 자연스럽게 담기도록 이끌어 드립니다.",
      service2Meta: "표정 디렉팅 · 장면 구성 · 스토리 중심 셀렉",
      service3Title: "증명 · 브랜드 촬영",
      service3Body: "정확한 규격은 물론, 피부 톤과 마무리 품질까지 놓치지 않는 믿을 수 있는 증명 사진.",
      service3Meta: "규격 준수 · 정교한 조명 · 명확한 결과물",
      faq1Q: "사진 찍는 게 많이 어색한데 괜찮을까요?",
      faq1A: "괜찮습니다. 대부분 처음에 그런 걱정을 하고 오시는데, 시선, 표정, 손 위치까지 단계별로 안내드리니 생각보다 편하게 찍히실 거예요.",
      faq2Q: "의상은 어떻게 준비하면 될까요?",
      faq2A: "촬영 목적에 맞는 톤의 의상을 먼저 추천해드려요. 원하시는 분위기나 스타일이 있으시면 미리 알려주시면 함께 맞춰 드립니다.",
      faq3Q: "보정은 어디까지 해주시나요?",
      faq3A: "전체 톤, 피부 표현, 작은 정리 위주로 진행해요. 인상이 달라 보이지 않도록, 자연스럽게 더 나아 보이도록 맞춰 드립니다.",
      heroPhotoA: "",
      heroPhotoB: ""
    },
    services: {
      heroTitle: "촬영 목적에 맞춰 준비와 결과물을 분명하게 설계합니다",
      heroLead: "페이지 스튜디오는 사진의 분위기뿐 아니라 활용 목적까지 함께 고려해 안내드립니다.",
      card1Title: "개인 프로필 촬영",
      card1Body: "취업, 이직, 퍼스널 브랜딩, SNS 운영에 맞는 인상을 정리합니다. 정갈한 시선과 안정적인 구도로 전문성을 강조합니다.",
      card2Title: "웨딩 · 커플 촬영",
      card2Body: "두 분의 교감이 화면 안에서 자연스럽게 보이도록 움직임과 표정의 흐름을 세심하게 디렉팅합니다.",
      card3Title: "증명 · 브랜드 촬영",
      card3Body: "정확한 규격과 또렷한 인상을 우선으로 하면서도 정교한 조명과 피부 톤 정리로 완성도를 높입니다.",
      detail1Title: "개인 프로필",
      detail1Body: "단정함과 개성의 균형이 중요합니다. 의상과 시선, 손 위치를 조율해 과하지 않게 존재감 있는 이미지를 만듭니다.",
      detail2Title: "웨딩 스냅",
      detail2Body: "인물 사이의 거리와 감정 교류가 자연스럽게 드러나도록 촬영 흐름을 부드럽게 이끌어드립니다.",
      detail3Title: "증명 · 여권",
      detail3Body: "규격 준수와 함께 피부 표현, 얼굴 각도, 시선 균형을 정리해 신뢰감 있는 이미지를 완성합니다.",
      photo1: "",
      photo2: "",
      photo3: ""
    },
    portfolio: {
      heroTitle: "페이지 스튜디오의 포트폴리오와 분위기를 한눈에 살펴보세요",
      heroLead: "고객님의 개성과 목적이 화면 안에서 어떻게 정리되는지, 실제 무드에 가까운 장면으로 소개합니다.",
      item1Title: "Profile Portrait",
      item1Body: "단정한 인상과 개성이 함께 보이는 개인 프로필 무드",
      item2Title: "Artist & Branding",
      item2Body: "브랜드 이미지와 자기 표현이 필요한 아티스트 포트레이트",
      item3Title: "Wedding Story",
      item3Body: "관계의 온도와 표정을 중심으로 기록한 웨딩 장면",
      item4Title: "Clean ID Photo",
      item4Body: "규격 안에서도 완성도를 잃지 않는 증명 촬영 예시",
      image1: "",
      image2: "",
      image3: "",
      image4: ""
    },
    price: {
      heroTitle: "합리적인 가격대 안에서 전문적 품질을 분명하게 제안합니다",
      heroLead: "아래 구성은 기본 안내용입니다. 촬영 목적과 인원, 활용 범위에 따라 세부 구성은 상담 후 조정하실 수 있습니다.",
      item1Title: "개인 프로필",
      item1Price: "90,000원부터",
      item2Title: "웨딩 · 커플",
      item2Price: "150,000원부터",
      item3Title: "증명 · 여권",
      item3Price: "30,000원부터"
    },
    inquiry: {
      heroTitle: "촬영 전 궁금한 점을 편하게 남겨주시면 자세히 안내해드립니다",
      heroLead: "상품 선택이 고민되시거나 준비물, 일정, 위치 안내가 필요하실 때 문의 페이지를 이용해 주세요.",
      mapTitle: "PAGE STUDIO",
      mapBody: "부산 금정구 부산대 인근",
      info1Title: "주소",
      info1Body: "부산 금정구 부산대 인근\n상세 주소는 예약 확정 후 안내드립니다.",
      info2Title: "연락처",
      info2Body: "010-0000-0000\n@page.studio",
      info3Title: "운영 시간",
      info3Body: "화요일 - 일요일 / 10:00 - 19:00\n월요일 휴무"
    },
    reservation: {
      heroTitle: "촬영 목적과 희망 일정을 남겨주시면 빠르게 답변드리겠습니다",
      heroLead: "준비물과 유의사항도 함께 안내해드리니 편하게 작성해 주세요.",
      guide1Title: "예약 전 준비",
      guide1Body: "촬영 목적, 사용 채널, 원하시는 분위기, 참고 이미지를 함께 보내주시면 더 정확하게 안내해드립니다.",
      guide2Title: "안내 방식",
      guide2Body: "일정 가능 여부와 촬영 구성, 준비물, 유의사항을 확인 후 순차적으로 답변드립니다.",
      guide3Title: "운영 시간",
      guide3Body: "화요일 - 일요일 / 10:00 - 19:00\n월요일 휴무"
    }
  };

  const fields = [
    { key: "global.phone", label: "대표 전화", type: "text" },
    { key: "global.instagram", label: "인스타그램 텍스트", type: "text" },
    { key: "global.instagramUrl", label: "인스타그램 링크", type: "text" },
    { key: "global.location", label: "주소", type: "textarea" },
    { key: "global.hours", label: "운영 시간", type: "textarea" },
    { key: "global.email", label: "이메일", type: "text" },
    { key: "global.footerText", label: "푸터 설명", type: "textarea" },
    { key: "home.heroTitle", label: "홈 히어로 제목", type: "textarea" },
    { key: "home.heroLead", label: "홈 히어로 설명", type: "textarea" },
    { key: "home.fact1", label: "홈 핵심 키워드 1", type: "text" },
    { key: "home.fact2", label: "홈 핵심 키워드 2", type: "text" },
    { key: "home.fact3", label: "홈 핵심 키워드 3", type: "text" },
    { key: "home.directionTitle", label: "홈 우측 카드 제목", type: "textarea" },
    { key: "home.directionBody", label: "홈 우측 카드 설명", type: "textarea" },
    { key: "home.coreValue", label: "홈 코어 밸류", type: "text" },
    { key: "home.heroCaption", label: "홈 하단 캡션", type: "textarea" },
    { key: "home.aboutTitle", label: "홈 소개 제목", type: "textarea" },
    { key: "home.aboutBody1", label: "홈 소개 본문 1", type: "textarea" },
    { key: "home.aboutBody2", label: "홈 소개 본문 2", type: "textarea" },
    { key: "home.service1Title", label: "홈 상품 1 제목", type: "text" },
    { key: "home.service1Body", label: "홈 상품 1 설명", type: "textarea" },
    { key: "home.service1Meta", label: "홈 상품 1 메타", type: "text" },
    { key: "home.service2Title", label: "홈 상품 2 제목", type: "text" },
    { key: "home.service2Body", label: "홈 상품 2 설명", type: "textarea" },
    { key: "home.service2Meta", label: "홈 상품 2 메타", type: "text" },
    { key: "home.service3Title", label: "홈 상품 3 제목", type: "text" },
    { key: "home.service3Body", label: "홈 상품 3 설명", type: "textarea" },
    { key: "home.service3Meta", label: "홈 상품 3 메타", type: "text" },
    { key: "home.faq1Q", label: "홈 FAQ 1 질문", type: "text" },
    { key: "home.faq1A", label: "홈 FAQ 1 답변", type: "textarea" },
    { key: "home.faq2Q", label: "홈 FAQ 2 질문", type: "text" },
    { key: "home.faq2A", label: "홈 FAQ 2 답변", type: "textarea" },
    { key: "home.faq3Q", label: "홈 FAQ 3 질문", type: "text" },
    { key: "home.faq3A", label: "홈 FAQ 3 답변", type: "textarea" },
    { key: "home.heroPhotoA", label: "홈 메인 사진 URL", type: "text" },
    { key: "home.heroPhotoB", label: "홈 보조 사진 URL", type: "text" },
    { key: "services.heroTitle", label: "촬영안내 상단 제목", type: "textarea" },
    { key: "services.heroLead", label: "촬영안내 상단 설명", type: "textarea" },
    { key: "services.card1Title", label: "촬영안내 카드 1 제목", type: "text" },
    { key: "services.card1Body", label: "촬영안내 카드 1 설명", type: "textarea" },
    { key: "services.card2Title", label: "촬영안내 카드 2 제목", type: "text" },
    { key: "services.card2Body", label: "촬영안내 카드 2 설명", type: "textarea" },
    { key: "services.card3Title", label: "촬영안내 카드 3 제목", type: "text" },
    { key: "services.card3Body", label: "촬영안내 카드 3 설명", type: "textarea" },
    { key: "services.detail1Title", label: "촬영안내 상세 1 제목", type: "text" },
    { key: "services.detail1Body", label: "촬영안내 상세 1 설명", type: "textarea" },
    { key: "services.detail2Title", label: "촬영안내 상세 2 제목", type: "text" },
    { key: "services.detail2Body", label: "촬영안내 상세 2 설명", type: "textarea" },
    { key: "services.detail3Title", label: "촬영안내 상세 3 제목", type: "text" },
    { key: "services.detail3Body", label: "촬영안내 상세 3 설명", type: "textarea" },
    { key: "services.photo1", label: "촬영안내 카드 1 이미지 URL", type: "text" },
    { key: "services.photo2", label: "촬영안내 카드 2 이미지 URL", type: "text" },
    { key: "services.photo3", label: "촬영안내 카드 3 이미지 URL", type: "text" },
    { key: "portfolio.heroTitle", label: "갤러리 상단 제목", type: "textarea" },
    { key: "portfolio.heroLead", label: "갤러리 상단 설명", type: "textarea" },
    { key: "portfolio.item1Title", label: "갤러리 카드 1 제목", type: "text" },
    { key: "portfolio.item1Body", label: "갤러리 카드 1 설명", type: "textarea" },
    { key: "portfolio.item2Title", label: "갤러리 카드 2 제목", type: "text" },
    { key: "portfolio.item2Body", label: "갤러리 카드 2 설명", type: "textarea" },
    { key: "portfolio.item3Title", label: "갤러리 카드 3 제목", type: "text" },
    { key: "portfolio.item3Body", label: "갤러리 카드 3 설명", type: "textarea" },
    { key: "portfolio.item4Title", label: "갤러리 카드 4 제목", type: "text" },
    { key: "portfolio.item4Body", label: "갤러리 카드 4 설명", type: "textarea" },
    { key: "portfolio.image1", label: "갤러리 이미지 1 URL", type: "text" },
    { key: "portfolio.image2", label: "갤러리 이미지 2 URL", type: "text" },
    { key: "portfolio.image3", label: "갤러리 이미지 3 URL", type: "text" },
    { key: "portfolio.image4", label: "갤러리 이미지 4 URL", type: "text" },
    { key: "price.heroTitle", label: "가격안내 상단 제목", type: "textarea" },
    { key: "price.heroLead", label: "가격안내 상단 설명", type: "textarea" },
    { key: "price.item1Title", label: "가격 1 제목", type: "text" },
    { key: "price.item1Price", label: "가격 1 금액", type: "text" },
    { key: "price.item2Title", label: "가격 2 제목", type: "text" },
    { key: "price.item2Price", label: "가격 2 금액", type: "text" },
    { key: "price.item3Title", label: "가격 3 제목", type: "text" },
    { key: "price.item3Price", label: "가격 3 금액", type: "text" },
    { key: "inquiry.heroTitle", label: "문의하기 상단 제목", type: "textarea" },
    { key: "inquiry.heroLead", label: "문의하기 상단 설명", type: "textarea" },
    { key: "inquiry.mapTitle", label: "문의하기 지도 제목", type: "text" },
    { key: "inquiry.mapBody", label: "문의하기 지도 설명", type: "textarea" },
    { key: "inquiry.info1Title", label: "문의 정보 1 제목", type: "text" },
    { key: "inquiry.info1Body", label: "문의 정보 1 설명", type: "textarea" },
    { key: "inquiry.info2Title", label: "문의 정보 2 제목", type: "text" },
    { key: "inquiry.info2Body", label: "문의 정보 2 설명", type: "textarea" },
    { key: "inquiry.info3Title", label: "문의 정보 3 제목", type: "text" },
    { key: "inquiry.info3Body", label: "문의 정보 3 설명", type: "textarea" },
    { key: "reservation.heroTitle", label: "예약하기 상단 제목", type: "textarea" },
    { key: "reservation.heroLead", label: "예약하기 상단 설명", type: "textarea" },
    { key: "reservation.guide1Title", label: "예약 안내 1 제목", type: "text" },
    { key: "reservation.guide1Body", label: "예약 안내 1 설명", type: "textarea" },
    { key: "reservation.guide2Title", label: "예약 안내 2 제목", type: "text" },
    { key: "reservation.guide2Body", label: "예약 안내 2 설명", type: "textarea" },
    { key: "reservation.guide3Title", label: "예약 안내 3 제목", type: "text" },
    { key: "reservation.guide3Body", label: "예약 안내 3 설명", type: "textarea" }
  ];

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function mergeDeep(target, source) {
    Object.keys(source || {}).forEach((key) => {
      const src = source[key];
      if (src && typeof src === "object" && !Array.isArray(src)) {
        if (!target[key] || typeof target[key] !== "object") {
          target[key] = {};
        }
        mergeDeep(target[key], src);
      } else {
        target[key] = src;
      }
    });
    return target;
  }

  function getContent() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return deepClone(defaults);
    }

    try {
      return mergeDeep(deepClone(defaults), JSON.parse(raw));
    } catch (error) {
      return deepClone(defaults);
    }
  }

  function saveContent(content) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }

  function getValue(content, path) {
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : ""), content);
  }

  function setValue(content, path, value) {
    const keys = path.split(".");
    const last = keys.pop();
    const target = keys.reduce((acc, key) => {
      if (!acc[key] || typeof acc[key] !== "object") {
        acc[key] = {};
      }
      return acc[key];
    }, content);
    target[last] = value;
  }

  function nlToBr(value) {
    return String(value || "").replace(/\n/g, "<br>");
  }

  function applyTextBindings(content) {
    document.querySelectorAll("[data-edit]").forEach((node) => {
      const value = getValue(content, node.dataset.edit);
      if (value == null) {
        return;
      }
      if (node.dataset.mode === "html") {
        node.innerHTML = nlToBr(value);
      } else {
        node.textContent = value;
      }
    });

    document.querySelectorAll("[data-link]").forEach((node) => {
      const value = getValue(content, node.dataset.link);
      if (value) {
        node.setAttribute("href", value);
      }
    });

    document.querySelectorAll("[data-phone-link]").forEach((node) => {
      const value = content.global.phone || "";
      node.textContent = value;
      node.setAttribute("href", `tel:${value.replace(/[^0-9]/g, "")}`);
    });
  }

  function applyImageBindings(content) {
    document.querySelectorAll("[data-bg-image]").forEach((node) => {
      const value = getValue(content, node.dataset.bgImage);
      if (value) {
        node.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.08), rgba(255,255,255,0.08)), url("${value}")`;
        node.classList.add("is-image");
      } else {
        node.style.backgroundImage = "";
        node.classList.remove("is-image");
      }
    });
  }

  function ensureAdminLauncher() {
    if (document.body.dataset.adminPage === "true" || document.querySelector(".admin-fab")) {
      return;
    }

    const footer = document.querySelector(".footer-wrap");
    if (!footer) {
      return;
    }

    const link = document.createElement("a");
    link.href = "admin.html";
    link.className = "admin-fab";
    link.setAttribute("aria-label", "관리자 페이지 열기");
    link.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3.2"></circle><path d="M19.4 15a1.7 1.7 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.82-.33 1.7 1.7 0 0 0-1.03 1.54V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.03-1.54 1.7 1.7 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1.03-1.51V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15.06 4.6a1.7 1.7 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15z"></path></svg>';
    footer.appendChild(link);
  }

  function applyAll() {
    const content = getContent();
    applyTextBindings(content);
    applyImageBindings(content);
    ensureAdminLauncher();
  }

  function resetContent() {
    localStorage.removeItem(STORAGE_KEY);
  }

  window.PageStudioCMS = {
    STORAGE_KEY,
    defaults,
    fields,
    getContent,
    saveContent,
    setValue,
    getValue,
    resetContent,
    applyAll
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyAll, { once: true });
  } else {
    applyAll();
  }
})();
