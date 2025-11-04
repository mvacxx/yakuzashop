const offers = [
  {
    name: "Pacote Iniciante",
    tag: "Lealdade",
    description: "Ideal para novos recrutas que desejam provar valor ao clã com uma dose de energia SolarBite.",
    price: "3.500 créditos",
    perks: [
      "1x SolarBite clássico",
      "Entrega padrão em até 24h",
      "Mensagem de boas-vindas personalizada"
    ],
  },
  {
    name: "Tributo do Dragão",
    tag: "Favor",
    description: "Pacote favorito dos tenentes. Mais energia, mais respeito, prioridade nas entregas do beco vermelho.",
    price: "R$ 79 ou equivalente",
    perks: [
      "3x SolarBite premium",
      "Entrega acelerada (até 6h)",
      "Suporte direto com um oyabun"
    ],
  },
  {
    name: "Pacto Escarlate",
    tag: "Elite",
    description: "Para quem domina o território. Receba a linha completa SolarBite com brindes colecionáveis exclusivos.",
    price: "0.005 BTC / 0.09 ETH",
    perks: [
      "6x SolarBite edição limitada",
      "Colete patches do clã",
      "Entrega stealth com senha secreta"
    ],
  },
];

const faqs = [
  {
    question: "Quanto tempo leva para receber o SolarBite?",
    answer:
      "Créditos in-game são confirmados em até 2h. PayPal libera após o recibo, enquanto tributos em cripto são verificados manualmente em até 6h.",
  },
  {
    question: "Posso combinar métodos de pagamento?",
    answer:
      "Sim. Envie detalhes no campo de mensagem e o tesoureiro fará contato para dividir o tributo entre créditos, PayPal ou cripto.",
  },
  {
    question: "É possível retirar no esconderijo?",
    answer:
      "Para membros veteranos do clã, disponibilizamos retirada presencial sob agendamento. Informe no pedido e alinhamos o encontro seguro.",
  },
];

const offerContainer = document.querySelector("#offers");
const faqContainer = document.querySelector("#faq-list");
const offerTemplate = document.querySelector("#offer-template");
const faqTemplate = document.querySelector("#faq-template");
const tributeForm = document.querySelector("#tribute-form");
const selectedOfferInput = document.querySelector("#selected-offer");
const paymentMethodInput = document.querySelector("#payment-method");
const statusMessage = document.querySelector(".tribute-form__status");
const paymentCards = document.querySelectorAll(".payment");
const heroScrollButtons = document.querySelectorAll('[data-scroll]');

let selectedOffer = null;
let selectedPayment = null;

const renderOffers = () => {
  offers.forEach((offer) => {
    const fragment = offerTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".offer-card");
    card.querySelector("h3").textContent = offer.name;
    card.querySelector(".offer-card__tag").textContent = offer.tag;
    card.querySelector(".offer-card__description").textContent = offer.description;
    card.querySelector(".offer-card__price").textContent = offer.price;

    const perkList = card.querySelector(".offer-card__perks");
    offer.perks.forEach((perk) => {
      const li = document.createElement("li");
      li.textContent = `✦ ${perk}`;
      perkList.appendChild(li);
    });

    card.querySelector("button").addEventListener("click", () => {
      selectedOffer = offer;
      selectedOfferInput.value = `${offer.name} — ${offer.price}`;
      statusMessage.textContent = "Pacote marcado. Agora escolha como pagar o tributo.";
      document
        .querySelectorAll(".offer-card.is-active")
        .forEach((active) => active.classList.remove("is-active"));
      card.classList.add("is-active");
    });

    offerContainer.appendChild(fragment);
  });
};

const renderFaqs = () => {
  faqs.forEach((faq) => {
    const fragment = faqTemplate.content.cloneNode(true);
    const details = fragment.querySelector("details");
    details.querySelector("summary").textContent = faq.question;
    details.querySelector("p").textContent = faq.answer;
    faqContainer.appendChild(fragment);
  });
};

const resetStatus = () => {
  statusMessage.textContent = "";
  statusMessage.classList.remove("is-success", "is-error");
};

const selectPayment = (card) => {
  paymentCards.forEach((item) => item.classList.remove("is-active"));
  card.classList.add("is-active");
  selectedPayment = card.dataset.method;

  const labels = {
    credits: "Créditos In-Game",
    paypal: "PayPal",
    crypto: "Cripto",
  };
  paymentMethodInput.value = labels[selectedPayment] ?? "";
  statusMessage.textContent = "Método escolhido. Preencha seus dados e envie o tributo.";
};

const setupPayments = () => {
  paymentCards.forEach((card) => {
    card.addEventListener("click", () => selectPayment(card));
    card.addEventListener("keypress", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectPayment(card);
      }
    });
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-pressed", "false");
  });
};

const fakeSubmit = (data) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), 800);
  });

tributeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  resetStatus();

  if (!selectedOffer) {
    statusMessage.textContent = "Escolha um pacote antes de enviar seu tributo.";
    statusMessage.classList.add("is-error");
    return;
  }

  if (!selectedPayment) {
    statusMessage.textContent = "Selecione um método de pagamento para continuar.";
    statusMessage.classList.add("is-error");
    return;
  }

  const formData = new FormData(tributeForm);
  const payload = {
    offer: selectedOffer,
    payment: selectedPayment,
    handle: formData.get("handle"),
    contact: formData.get("contact"),
    note: formData.get("note"),
  };

  statusMessage.textContent = "Enviando para os contadores do clã...";

  try {
    await fakeSubmit(payload);
    statusMessage.textContent =
      "Tributo registrado. Você receberá instruções finais via contato informado.";
    statusMessage.classList.add("is-success");
    tributeForm.reset();
    paymentMethodInput.value = "";
    selectedOfferInput.value = "";
    selectedOffer = null;
    selectedPayment = null;
    document
      .querySelectorAll(".offer-card.is-active")
      .forEach((active) => active.classList.remove("is-active"));
    paymentCards.forEach((card) => card.classList.remove("is-active"));
  } catch (error) {
    console.error(error);
    statusMessage.textContent =
      "Falha na comunicação. Tente novamente ou chame um tenente.";
    statusMessage.classList.add("is-error");
  }
});

heroScrollButtons.forEach((button) => {
  const target = document.querySelector(button.dataset.scroll);
  if (!target) return;
  button.addEventListener("click", () => {
    target.scrollIntoView({ behavior: "smooth" });
  });
});

const year = new Date().getFullYear();
document.querySelector("#year").textContent = year;

renderOffers();
renderFaqs();
setupPayments();
resetStatus();
