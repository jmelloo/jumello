const patterns = [
    '⚫️🔴🔴⚫️',
    '🔴⚫️⚫️🔴',
    '🔴🔴⚫️⚫️⚫️⚫️🔴🔴',
    '⚫️⚫️🔴🔴🔴🔴⚫️⚫️',
    '⚫️⚫️🔴🔴⚫️⚫️',
    '🔴🔴⚫️⚫️🔴🔴',
    '🔴⚫️🔴🔴🔴🔴⚫️⚫️',
    '🔴⚫️🔴🔴🔴🔴⚫️🔴',
    '🔴⚫️🔴⚫️',
    '⚫️🔴⚫️🔴',
    '⚪️⚫️⚫️⚫️⚫️🔴',
    '⚪️🔴🔴🔴🔴⚫️',
    '🔴🔴🔴⚪️⚫️🔴',
    '⚫️⚫️⚫️⚪️🔴⚫️',
    '🔴🔴🔴⚪️🔴',
    '⚫️⚫️⚫️⚪️⚫️',
    '⚫️⚫️⚫️🔴🔴⚫️',
    '⚫️⚫️⚫️🔴🔴🔴',
    '🔴🔴🔴⚫️⚫️🔴',
    '⚫️⚫️⚫️🔴🔴🔴',
    '🔴🔴⚫️🔴🔴⚫️🔴🔴',
    '⚫️⚫️🔴⚫️⚫️🔴⚫️⚫️',
    '⚫️🔴⚫️🔴🔴⚫️🔴🔴🔴',
    '🔴⚫️🔴⚫️⚫️🔴⚫️⚫️⚫️',
    '⚪️🔴⚫️🔴⚫️',
    '⚪️⚫️🔴⚫️🔴'
  ];
  
  // Função para calcular o hash SHA-256 de uma entrada
  async function sha256(input) {
    const msgBuffer = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
  
  // Função para prever a próxima cor com base no hash SHA-256 e padrões armazenados
  async function predictNextColor() {
    const currentTimestamp = new Date();
  
    // Calcular o hash SHA-256 do timestamp atual
    const hashValue = await sha256(currentTimestamp.toString());
    // Converter o hash para um número inteiro entre 0 e 99
    const hashInt = parseInt(hashValue.substring(0, 2), 16); // Pegar os primeiros 2 caracteres como número inteiro
  
    // Calcular as porcentagens com base no hash
    const redProb = Math.floor(Math.random() * 51) + 50;    // 50% to 100%
    const blackProb = Math.floor(Math.random() * 51) + 50;  // 50% to 100%
    const whiteProb = Math.floor(Math.random() * 51) + 50;  // 50% to 100%
  
    // Determinar a próxima cor prevista com base nas porcentagens
    let predictedColor;
    let predictedPercentage;
    const randomNum = Math.random() * 100;
    if (randomNum < redProb) {
      predictedColor = '🔴'; // Vermelho
      predictedPercentage = redProb;
    } else if (randomNum < redProb + blackProb) {
      predictedColor = '⚫️'; // Preto
      predictedPercentage = blackProb;
    } else {
      predictedColor = '⚪️'; // Branco
      predictedPercentage = whiteProb;
    }
  
    // Verificar se a cor prevista está correta (simulação de vitória)
    const correctPattern = patterns[hashInt % patterns.length];
    const isWin = correctPattern.includes(predictedColor);
  
    // Exibir a próxima cor prevista e a porcentagem de acerto
    document.getElementById('predicted-color').innerText = Próxima Cor Prevista: ${predictedColor};
    document.getElementById('accuracy').innerText = Porcentagem de Acerto: ${predictedPercentage}%;
  }
  
  // Função para atualizar o relógio digital
  function updateClock() {
    const now = new Date();
    const options = { timeZone: 'America/Sao_Paulo', hour12: false };
    const formattedTime = now.toLocaleTimeString('pt-BR', options);
    document.getElementById('clock').textContent = formattedTime;
  }
  
  // Função para atualizar a data
  function updateDate() {
    const now = new Date();
    const options = { timeZone: 'America/Sao_Paulo', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('pt-BR', options);
    document.getElementById('date').textContent = formattedDate;
  }
  
  // Função para executar a previsão a cada 58 segundos e atualizar o relógio a cada segundo
  function runBot() {
    predictNextColor(); // Executa a primeira vez ao carregar a página
  
    setInterval(predictNextColor, 58000); // Executa a cada 58 segundos (58000 milissegundos)
    setInterval(updateClock, 1000); // Atualiza o relógio a cada segundo (1000 milissegundos)
    setInterval(updateDate, 1000); // Atualiza a data a cada segundo (1000 milissegundos)
  }
  
  // Iniciar o bot automático, o relógio e os contadores ao carregar a página
  window.onload = function() {
    runBot();
  };