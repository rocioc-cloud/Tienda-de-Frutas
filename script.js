document.getElementById('year').textContent = new Date().getFullYear();

const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotPanel = document.getElementById('chatbot-panel');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');

const botAnswers = {
  ubicacion: 'Nos ubicamos en Av. Lima 1203, Barranca 15169, Perú.',
  contacto: 'Puedes comunicarte con Frutas Orfa a los números 982 553 666 y 936 696 049. Ambos reciben consultas y pedidos por WhatsApp.',
  productos: 'Tenemos Manzana Caña, Manzana Israel, Manzana Agua, plátanos Bellaco e Isla, palta fresca, mandarina y melocotón. El stock puede variar según la temporada.',
  pedido: 'Para realizar un pedido escríbenos por WhatsApp al 982 553 666 o al 936 696 049. Atendemos ventas por kilo y por caja.',
  saludo: '¡Hola! Puedo ayudarte con nuestra ubicación, teléfonos, productos disponibles o pedidos.',
  desconocido: 'Puedo responder preguntas sobre ubicación, números de contacto, productos y pedidos. También puedes escribirnos al 982 553 666.'
};

function addChatMessage(text, type) {
  const message = document.createElement('div');
  message.className = `chat-message ${type}`;
  message.textContent = text;
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotAnswer(question) {
  const normalized = question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (/donde|ubicacion|direccion|queda|llegar/.test(normalized)) return botAnswers.ubicacion;
  if (/contacto|telefono|numero|celular|llamar/.test(normalized)) return botAnswers.contacto;
  if (/producto|fruta|tienen|venden|catalogo|stock/.test(normalized)) return botAnswers.productos;
  if (/pedido|comprar|whatsapp|caja|kilo/.test(normalized)) return botAnswers.pedido;
  if (/hola|buenos|buenas/.test(normalized)) return botAnswers.saludo;
  return botAnswers.desconocido;
}

function askBot(question, answer) {
  addChatMessage(question, 'user');
  window.setTimeout(() => addChatMessage(answer || getBotAnswer(question), 'bot'), 250);
}

function openChatbot() {
  chatbotPanel.hidden = false;
  chatbotToggle.setAttribute('aria-expanded', 'true');
  chatbotInput.focus();
}

function closeChatbot() {
  chatbotPanel.hidden = true;
  chatbotToggle.setAttribute('aria-expanded', 'false');
  chatbotToggle.focus();
}

chatbotToggle.addEventListener('click', () => chatbotPanel.hidden ? openChatbot() : closeChatbot());
chatbotClose.addEventListener('click', closeChatbot);

document.querySelectorAll('[data-question]').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.question;
    askBot(button.textContent, botAnswers[key]);
  });
});

chatbotForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const question = chatbotInput.value.trim();
  if (!question) return;
  askBot(question);
  chatbotInput.value = '';
});
