// ─── Tipos do sistema de blocos ───────────────────────────────────────────

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "image-placeholder"; caption: string; figure: number }
  /** GraphicStage: fundo Glass Chumbo para gráficos técnicos de alto impacto */
  | { type: "graphic-stage"; caption: string; figure: number }
  | { type: "list"; items: string[] }
  | { type: "numbered-list"; items: string[] }
  | { type: "highlight"; title: string; body: string }
  /** ProtocolAlert: quebra cognitiva Glass Chumbo para alertas críticos */
  | { type: "protocol-alert"; title: string; body: string; variant?: "aviso" | "erro" };

export type ApostilaPage = {
  pageNumber: number; // 1 a 33
  title: string;
  hasVideo?: true; // mostra botão "Ver Aula Prática"
  content: ContentBlock[];
};

export type ApostilaChapter = {
  id: "c1" | "c2" | "c3" | "c4";
  chapterNumber: number;
  title: string;
  subtitle: string;
  videoTitle: string;
  videoDuration: string;
  startPage: number;
  endPage: number;
  pages: ApostilaPage[];
};

// ─── Capítulo 1: Tricologia e Estrutura do Fio (Pág 1–8) ─────────────────

const chapter1: ApostilaChapter = {
  id: "c1",
  chapterNumber: 1,
  title: "Tricologia e Estrutura do Fio",
  subtitle: "Tipos de melanina e danos estruturais",
  videoTitle: "A matemática da descoloração",
  videoDuration: "12 min",
  startPage: 1,
  endPage: 8,
  pages: [
    {
      pageNumber: 1,
      title: "Introdução à Tricologia",
      hasVideo: true,
      content: [
        {
          type: "paragraph",
          text: "Tricologia é a ciência que estuda o cabelo: sua estrutura, composição, ciclo de vida e patologias. Para a colorista profissional, é a base que transforma o serviço em ciência.",
        },
        {
          type: "quote",
          text: "Uma especialista que entende a estrutura do fio nunca erra o diagnóstico. A colorimetria começa antes do produto — começa no fio.",
          attribution: "Alaíde Proença",
        },
        {
          type: "highlight",
          title: "Por que estudar tricologia?",
          body: "Porque cada fio conta a história química do que já passou por ele. Ler essa história é o que separa quem aplica de quem cria.",
        },
      ],
    },
    {
      pageNumber: 2,
      title: "A Anatomia do Fio",
      content: [
        {
          type: "paragraph",
          text: "O fio capilar é composto por três camadas concêntricas: cutícula, córtex e medula. Cada camada tem função específica e reage de forma diferente aos agentes químicos.",
        },
        {
          type: "image-placeholder",
          caption: "Figura 01: Anatomia transversal do fio capilar — cutícula, córtex e medula",
          figure: 1,
        },
        {
          type: "paragraph",
          text: "A cutícula é formada por escamas sobrepostas de queratina que controlam a entrada e saída de substâncias. Seu estado determina brilho, maciez e a capacidade de absorção de pigmento.",
        },
      ],
    },
    {
      pageNumber: 3,
      title: "Cutícula, Córtex e Medula",
      content: [
        {
          type: "list",
          items: [
            "Cutícula: proteção externa, brilho e barreira química. Escamas saudáveis ficam fechadas; escamas danificadas, abertas.",
            "Córtex: 90% da massa do fio. É aqui que a cor vive — os melanossomas residem no córtex.",
            "Medula: canal central, presente apenas em fios muito espessos. Não influencia diretamente na coloração.",
          ],
        },
        {
          type: "protocol-alert",
          title: "A abertura da cutícula é o pré-requisito de toda coloração permanente.",
          body: "Sem abertura controlada pelo oxidante, o pigmento não entra no córtex — ele apenas cobre a superfície e sai nas primeiras lavagens.",
          variant: "aviso",
        },
        {
          type: "paragraph",
          text: "A abertura da cutícula é promovida pelo pH alcalino do oxidante. Cada nível de alcalinidade abre mais profundamente, com risco proporcional ao dano estrutural.",
        },
      ],
    },
    {
      pageNumber: 4,
      title: "Tipos de Melanina",
      content: [
        {
          type: "paragraph",
          text: "Todo cabelo natural contém dois tipos de melanina no córtex: eumelanina e feomelaina. A proporção entre elas determina a cor natural do fio — e, mais importante, o fundo que vai aparecer durante a descoloração.",
        },
        {
          type: "image-placeholder",
          caption: "Figura 02: Distribuição de eumelanina e feomelaina no córtex — comparativo por tonalidade natural",
          figure: 2,
        },
        {
          type: "list",
          items: [
            "Eumelanina: pigmento de cor escura (castanho e preto). Mais resistente à descoloração.",
            "Feomelaina: pigmento avermelhado e amarelado. Mais fácil de descolorir, responsável pelos reflexos quentes.",
          ],
        },
      ],
    },
    {
      pageNumber: 5,
      title: "Danos Estruturais",
      content: [
        {
          type: "paragraph",
          text: "O dano capilar não é apenas visual — ele altera a capacidade do fio de absorver, fixar e reter pigmento. Identificar o tipo de dano antes da coloração é parte do diagnóstico obrigatório.",
        },
        {
          type: "numbered-list",
          items: [
            "Dano por calor: escamas abertas, perda de umidade, fio quebradiço. Pigmento entra mas não fixa.",
            "Dano químico: quebra das pontes de dissulfeto. Fio frágil, poroso, com absorção desequilibrada.",
            "Dano mecânico: fricção excessiva, escovação agressiva. Cutícula fragmentada.",
          ],
        },
        {
          type: "quote",
          text: "Fio danificado não é obstáculo — é informação. Ele pede um protocolo diferente, não a mesma técnica com força dobrada.",
        },
      ],
    },
    {
      pageNumber: 6,
      title: "O Teste de Porosidade",
      content: [
        {
          type: "paragraph",
          text: "A porosidade mede a capacidade do fio de absorver e reter água. Fios de alta porosidade absorvem tudo rapidamente — e soltam com a mesma velocidade. Para a coloração, isso significa tempos diferentes e resultados opostos ao planejado.",
        },
        {
          type: "numbered-list",
          items: [
            "Teste do copo: mergulhe um fio limpo em água. Se afundar em menos de 2 minutos, a porosidade é alta.",
            "Teste tátil: deslize os dedos do comprimento à raiz. Se sentir rugosidade, as escamas estão abertas.",
            "Teste de elasticidade: estique um fio molhado. Se quebrar sem elongar, há dano proteico grave.",
          ],
        },
        {
          type: "protocol-alert",
          title: "Fios de alta porosidade absorvem o tom mais intensamente na raiz e desbotam mais rápido nos comprimentos.",
          body: "A fórmula precisa compensar essa diferença: menos pigmento na raiz, mais nos comprimentos ou tonalidade com pH ácido para equilibrar a absorção.",
          variant: "erro",
        },
      ],
    },
    {
      pageNumber: 7,
      title: "Diagnóstico Capilar",
      content: [
        {
          type: "paragraph",
          text: "O diagnóstico é o passo zero de qualquer coloração. Sem ele, qualquer fórmula é um chute — e chute não tem preço de especialista.",
        },
        {
          type: "list",
          items: [
            "Textura: fino, médio ou grosso — define a resistência e a velocidade de absorção.",
            "Porosidade: baixa, média ou alta — define o tempo e a intensidade da fórmula.",
            "Histórico químico: colorações anteriores, processos de alisamento, descoloração acumulada.",
            "Condição geral: hidratação, elasticidade, presença de quebra.",
          ],
        },
        {
          type: "quote",
          text: "Toda cliente que senta na sua cadeira merece 3 minutos de diagnóstico. Esses 3 minutos valem o resultado das próximas 2 horas.",
          attribution: "Alaíde Proença",
        },
      ],
    },
    {
      pageNumber: 8,
      title: "Ficha de Avaliação Pré-Coloração",
      content: [
        {
          type: "paragraph",
          text: "A ficha de avaliação é o contrato técnico entre a colorista e o resultado. Ela documenta o diagnóstico, a expectativa gerenciada e a fórmula escolhida.",
        },
        {
          type: "list",
          items: [
            "Dados do fio: textura, porosidade, espessura, comprimento.",
            "Histórico: última coloração, processos químicos nos últimos 12 meses.",
            "Meta de cor: referência visual + linguagem técnica (nível + reflexo).",
            "Fórmula: tinta + volume + proporção + tempo estimado.",
            "Observações: pontos de resistência, histórico de alergia, preferências.",
          ],
        },
        {
          type: "highlight",
          title: "Prática recomendada",
          body: "Fotografe o antes e o depois. O portfólio técnico é o seu diferencial de precificação.",
        },
      ],
    },
  ],
};

// ─── Capítulo 2: Fundo de Clareamento (Pág 9–16) ─────────────────────────

const chapter2: ApostilaChapter = {
  id: "c2",
  chapterNumber: 2,
  title: "Fundo de Clareamento",
  subtitle: "A matemática da descoloração",
  videoTitle: "Fundo de clareamento na prática",
  videoDuration: "15 min",
  startPage: 9,
  endPage: 16,
  pages: [
    {
      pageNumber: 9,
      title: "O Que é Fundo de Clareamento",
      hasVideo: true,
      content: [
        {
          type: "paragraph",
          text: "Fundo de clareamento é o tom que o cabelo revela durante o processo de descoloração — não é o 'antes', é o 'durante'. É a cor que surge no córtex à medida que a eumelanina é destruída e a feomelaina permanece.",
        },
        {
          type: "protocol-alert",
          title: "Você não escolhe ignorar o fundo de clareamento.",
          body: "Você escolhe trabalhar com ele ou contra ele. Quem trabalha com ele cria o resultado. Quem ignora, explica o resultado para a cliente insatisfeita.",
          variant: "aviso",
        },
        {
          type: "paragraph",
          text: "Cada nível de melanina tem um fundo específico. Saber qual fundo vai aparecer antes de misturar a fórmula é o que diferencia o serviço técnico do serviço impreciso.",
        },
      ],
    },
    {
      pageNumber: 10,
      title: "A Escala de Fundos (1 a 10)",
      content: [
        {
          type: "paragraph",
          text: "A escala de fundos vai do nível 1 (preto) ao nível 10 (loiro claríssimo). Cada nível tem um fundo característico que aparece durante a descoloração.",
        },
        {
          type: "graphic-stage",
          caption: "Figura 03: Tabela completa de fundos de clareamento — níveis 1 a 10 com cores correspondentes",
          figure: 3,
        },
        {
          type: "list",
          items: [
            "Nível 1-2 (preto): fundo quase preto, muito resistente.",
            "Nível 3-4 (castanho escuro): fundo vermelho-avermelhado.",
            "Nível 5 (castanho médio): fundo laranja-avermelhado.",
            "Nível 6 (castanho claro): fundo laranja.",
            "Nível 7 (loiro escuro): fundo amarelo-alaranjado.",
            "Nível 8 (loiro médio): fundo amarelo dourado.",
            "Nível 9-10 (loiro claro): fundo amarelo pálido.",
          ],
        },
      ],
    },
    {
      pageNumber: 11,
      title: "Matemática da Descoloração",
      content: [
        {
          type: "paragraph",
          text: "A descoloração não salta níveis — ela passa por eles. Cada sessão de descoloração sobe entre 2 e 4 tons, dependendo do produto, do oxidante e do estado do fio.",
        },
        {
          type: "protocol-alert",
          title: "Se a cliente tem nível 4 e quer nível 9, são no mínimo 2 sessões — com 2 semanas de recuperação entre elas.",
          body: "Informe antes de começar. Prometer o resultado em uma sessão é a promessa mais cara que uma colorista pode fazer.",
          variant: "erro",
        },
        {
          type: "numbered-list",
          items: [
            "Calcule o nível atual (diagnóstico).",
            "Identifique o fundo que vai aparecer nesse nível.",
            "Determine o nível-alvo e o fundo que precisará ser neutralizado.",
            "Calcule quantas sessões são necessárias.",
          ],
        },
      ],
    },
    {
      pageNumber: 12,
      title: "Pré-Clareamento vs Clareamento Direto",
      content: [
        {
          type: "paragraph",
          text: "Nem toda coloração exige pré-clareamento. A escolha entre os dois métodos depende do grau de abertura necessária e da condição do fio.",
        },
        {
          type: "list",
          items: [
            "Pré-clareamento: descolorir o fio primeiro, sem pigmento. Prepara o fundo para receber a cor com mais precisão. Indicado quando a diferença entre o nível atual e o desejado é maior que 3 tons.",
            "Clareamento direto: tinta + oxidante em uma etapa. Eficiente para mudanças de até 2-3 tons. Resultado menos preciso em tons muito claros.",
          ],
        },
        {
          type: "quote",
          text: "Pré-clarear não é sinal de fraqueza técnica. É respeito pelo resultado que a cliente mereceu.",
        },
      ],
    },
    {
      pageNumber: 13,
      title: "Agentes Descolorantes",
      content: [
        {
          type: "paragraph",
          text: "O pó descolorante age diretamente nos melanossomas do córtex, oxidando e destruindo a melanina. Quanto mais pigmentado o pó, mais suave a ação — e menor o risco de dano.",
        },
        {
          type: "image-placeholder",
          caption: "Figura 04: Comparativo de agentes descolorantes e suas ações no melanossomo capilar",
          figure: 4,
        },
        {
          type: "list",
          items: [
            "Pó branco: força máxima, menos aditivos. Para fios resistentes e saudáveis.",
            "Pó azul: força moderada, com aditivos de cuidado. Para fios normais.",
            "Pó violeta: força controlada, com pigmento neutralizador. Reduz reflexos amarelos durante o processo.",
          ],
        },
      ],
    },
    {
      pageNumber: 14,
      title: "Tempo e Temperatura",
      content: [
        {
          type: "paragraph",
          text: "Temperatura e tempo são as duas variáveis mais subestimadas da descoloração. Calor acelera a reação química — mas também acelera o dano.",
        },
        {
          type: "highlight",
          title: "Regra prática",
          body: "Fios saudáveis e resistentes suportam calor controlado. Fios porosos ou quimicamente comprometidos reagem ao calor com dano severo — a descoloração pode ultrapassar o alvo e destruir a estrutura do fio.",
        },
        {
          type: "numbered-list",
          items: [
            "Verifique o processo a cada 10 minutos.",
            "Jamais deixe o produto além de 50 minutos.",
            "Em fios porosos: use temperatura ambiente, sem touca térmica.",
            "Em fios resistentes: touca pode ser usada nos primeiros 20 minutos para acelerar a abertura.",
          ],
        },
      ],
    },
    {
      pageNumber: 15,
      title: "Erros de Leitura de Fundo",
      content: [
        {
          type: "paragraph",
          text: "Errar a leitura do fundo de clareamento é a causa de 70% dos resultados insatisfatórios em coloração. Os erros mais comuns são previsíveis e evitáveis.",
        },
        {
          type: "numbered-list",
          items: [
            "Ler o fundo sob luz artificial: a lâmpada distorce o amarelo e o laranja. Sempre leia na luz natural.",
            "Aplicar a cor sobre fundo laranja esperando loiro: sem neutralizar o fundo, o resultado será dourado ou bronze — nunca platinado.",
            "Não calcular a diferença entre raiz e comprimento: a raiz tem fundo diferente dos comprimentos pré-coloridos.",
            "Confiar na memória em vez da tabela: sempre cheque a escala antes de misturar.",
          ],
        },
        {
          type: "quote",
          text: "O fundo laranja não é o inimigo. O erro é não tê-lo previsto.",
          attribution: "Alaíde Proença",
        },
      ],
    },
    {
      pageNumber: 16,
      title: "A Tabela de Correspondência de Tons",
      content: [
        {
          type: "paragraph",
          text: "A tabela de correspondência cruza o fundo de clareamento com o tom desejado e indica qual pigmento é necessário para neutralizar ou complementar o resultado.",
        },
        {
          type: "list",
          items: [
            "Fundo 6 (laranja) → tom 7.1 (loiro cinza): precisa de pigmento azul intenso para neutralizar.",
            "Fundo 7 (amarelo-alaranjado) → tom 8.1 (loiro bege-cinza): precisa de violeta-azulado.",
            "Fundo 8 (amarelo) → tom 9.0 (loiro neutro): pouca neutralização, pigmento natural.",
            "Fundo 8 (amarelo) → tom 9.1 (loiro cinza pérola): violeta médio na fórmula.",
          ],
        },
        {
          type: "highlight",
          title: "Princípio central",
          body: "A tabela não substitui o diagnóstico — ela confirma o raciocínio. Use a tabela para checar, não para iniciar.",
        },
      ],
    },
  ],
};

// ─── Capítulo 3: A Estrela de Oswald e Neutralização (Pág 17–24) ─────────

const chapter3: ApostilaChapter = {
  id: "c3",
  chapterNumber: 3,
  title: "A Estrela de Oswald e Neutralização",
  subtitle: "Regras dos opostos e reflexos indesejados",
  videoTitle: "A engenharia dos opostos",
  videoDuration: "18 min",
  startPage: 17,
  endPage: 24,
  pages: [
    {
      pageNumber: 17,
      title: "O Círculo Cromático",
      hasVideo: true,
      content: [
        {
          type: "paragraph",
          text: "O círculo cromático é a gramática visual da neutralização. Newton organizou as cores em espectro; Oswald as organizou para a prática. Na cadeira do salão, o círculo não é decoração — é ferramenta.",
        },
        {
          type: "graphic-stage",
          caption: "Figura 05: Círculo cromático completo com tons primários, secundários e terciários",
          figure: 5,
        },
        {
          type: "paragraph",
          text: "Cada cor no círculo tem uma oposta diametralmente. Misturadas em proporção adequada, elas se cancelam — produzindo um neutro. Esse é o fundamento da neutralização de reflexos indesejados.",
        },
      ],
    },
    {
      pageNumber: 18,
      title: "Cores Primárias, Secundárias e Terciárias",
      content: [
        {
          type: "list",
          items: [
            "Primárias: vermelho, azul e amarelo. Não podem ser obtidas pela mistura de outras cores.",
            "Secundárias: laranja (vermelho + amarelo), verde (azul + amarelo), violeta (vermelho + azul).",
            "Terciárias: as 6 transições entre primárias e secundárias — amarelo-alaranjado, vermelho-alaranjado, vermelho-violeta, azul-violeta, azul-esverdeado, amarelo-esverdeado.",
          ],
        },
        {
          type: "highlight",
          title: "Na prática capilar",
          body: "Os reflexos indesejados que surgem durante a descoloração são sempre as cores quentes do círculo: vermelho, laranja e amarelo. A neutralização usa os opostos: verde, azul e violeta.",
        },
      ],
    },
    {
      pageNumber: 19,
      title: "Reflexos: Por Que Aparecem",
      content: [
        {
          type: "paragraph",
          text: "Os reflexos quentes — vermelho, laranja e amarelo — aparecem durante a descoloração porque a feomelaina é mais resistente à oxidação do que a eumelanina. Ela sobrevive depois que a eumelanina foi destruída.",
        },
        {
          type: "paragraph",
          text: "O aparecimento dos reflexos segue uma ordem previsível: primeiro o vermelho (níveis mais baixos), depois o laranja (níveis médios) e finalmente o amarelo (níveis altos). Essa sequência é sempre a mesma.",
        },
        {
          type: "quote",
          text: "O reflexo não é um erro da descoloração. É a feomelaina fazendo o seu trabalho. Seu papel é decidir o que fazer com ela.",
          attribution: "Alaíde Proença",
        },
      ],
    },
    {
      pageNumber: 20,
      title: "A Tabela de Reflexos e Seus Opostos",
      content: [
        {
          type: "paragraph",
          text: "Para cada reflexo indesejado existe um oposto direto no círculo cromático. Esta tabela é o coração da neutralização.",
        },
        {
          type: "graphic-stage",
          caption: "Figura 06: Tabela de reflexos indesejados e seus opostos na Estrela de Oswald",
          figure: 6,
        },
        {
          type: "list",
          items: [
            "Fundo 4-5 (vermelho-alaranjado) → neutralizar com verde (base verde ou pigmento verde).",
            "Fundo 5-6 (laranja avermelhado) → neutralizar com azul-esverdeado.",
            "Fundo 6 (laranja) → neutralizar com azul.",
            "Fundo 7 (amarelo-alaranjado) → neutralizar com violeta-azulado.",
            "Fundo 8 (amarelo) → neutralizar com violeta.",
            "Fundo 9 (amarelo pálido) → neutralizar com violeta suave (pigmento .1 ou .2).",
          ],
        },
      ],
    },
    {
      pageNumber: 21,
      title: "Neutralização: A Ciência dos Opostos",
      content: [
        {
          type: "paragraph",
          text: "Neutralizar não é 'cobrir o reflexo'. É cancelar a frequência de luz indesejada adicionando a frequência oposta. O resultado de duas cores opostas em proporção adequada é um neutro — bege, cinza ou marrom, dependendo da intensidade.",
        },
        {
          type: "protocol-alert",
          title: "Excesso de neutralizante cinzifica o tom sem aviso.",
          body: "Pouca neutralização: o reflexo persiste. Excesso: o tom fica acinzentado de forma não planejada. A dosagem é proporcional à intensidade do reflexo — não à preferência da cliente.",
          variant: "erro",
        },
        {
          type: "paragraph",
          text: "A regra prática: adicione o neutralizante aos poucos. Comece com 10% do volume total da fórmula e ajuste conforme o resultado da mechinha-teste.",
        },
      ],
    },
    {
      pageNumber: 22,
      title: "Tons Frios vs Tons Quentes",
      content: [
        {
          type: "paragraph",
          text: "A temperatura da cor tem efeito perceptivo direto: tons frios recuam visualmente (parecem mais distantes, mais finos), tons quentes avançam (parecem mais próximos, mais volumosos).",
        },
        {
          type: "list",
          items: [
            "Tom frio: contém azul, violeta ou cinza como base. Leitura: sofisticado, elegante, platinado.",
            "Tom quente: contém vermelho, laranja ou amarelo como base. Leitura: vivo, luminoso, dourado.",
            "Tom neutro: equilibrado entre quente e frio. Leitura: natural, versátil, clássico.",
          ],
        },
        {
          type: "quote",
          text: "A temperatura da cor muda a percepção do rosto antes de mudar o guarda-roupa da cliente. É um serviço de imagem, não apenas de beleza.",
        },
      ],
    },
    {
      pageNumber: 23,
      title: "Dosagem do Neutralizante",
      content: [
        {
          type: "paragraph",
          text: "A dosagem do neutralizante é função da intensidade do reflexo, não da preferência estética. Reflexo forte pede dose maior; reflexo suave pede dose mínima.",
        },
        {
          type: "numbered-list",
          items: [
            "Identifique o reflexo presente no fundo (vermelho, laranja, amarelo).",
            "Escolha o oposto direto na estrela de Oswald.",
            "Comece com 10-15% da dose de neutralizante em relação ao volume da fórmula.",
            "Faça a mechinha-teste por 5 minutos antes de aplicar em todo o cabelo.",
            "Ajuste a dosagem conforme o resultado da mechinha.",
          ],
        },
        {
          type: "protocol-alert",
          title: "Menos é mais quando se trata de correção.",
          body: "Você sempre pode adicionar mais neutralizante; nunca pode tirar o que já foi colocado. Comece com 10% e ajuste pela mechinha-teste.",
          variant: "aviso",
        },
      ],
    },
    {
      pageNumber: 24,
      title: "Casos Práticos de Neutralização",
      content: [
        {
          type: "paragraph",
          text: "A teoria só consolida na prática. Estes casos representam as situações mais comuns no salão.",
        },
        {
          type: "numbered-list",
          items: [
            "Caso A — Loiro amarelado (fundo 8): cliente com cabelo nível 8 com reflexo amarelo. Meta: loiro cinza pérola (9.1). Fórmula: 9.1 + 20 vol + 15% de pigmento violeta na mistura.",
            "Caso B — Castanho com reflexo avermelhado (fundo 4-5): meta é castanho frio (5.1). Fórmula: base fria 5.1 com toque de verde nos comprimentos mais quentes.",
            "Caso C — Cabelo grisalho com fundo amarelado: meta é cobrir o branco sem cinzificar. Fórmula: 7.0 com 5% de pigmento frio para equilibrar sem apagar o natural.",
          ],
        },
        {
          type: "quote",
          text: "Todo caso difícil já foi um caso simples que perdeu o diagnóstico no começo.",
          attribution: "Alaíde Proença",
        },
      ],
    },
  ],
};

// ─── Capítulo 4: Matemática da Fixação (Pág 25–33) ───────────────────────

const chapter4: ApostilaChapter = {
  id: "c4",
  chapterNumber: 4,
  title: "Matemática da Fixação",
  subtitle: "Oxidantes, volumagem e durabilidade extrema",
  videoTitle: "Volumagem como ciência",
  videoDuration: "14 min",
  startPage: 25,
  endPage: 33,
  pages: [
    {
      pageNumber: 25,
      title: "O Papel do Oxidante",
      hasVideo: true,
      content: [
        {
          type: "paragraph",
          text: "O oxidante (peróxido de hidrogênio) tem duas funções simultâneas: abre a cutícula criando o pH alcalino necessário para o pigmento entrar no córtex, e oxida a melanina para clarear o fio em graus variados.",
        },
        {
          type: "image-placeholder",
          caption: "Figura 07: Ação do oxidante nas escamas da cutícula capilar — abertura e penetração do pigmento",
          figure: 7,
        },
        {
          type: "protocol-alert",
          title: "Sem o oxidante na volumagem correta, não há fixação de cor.",
          body: "Há apenas depósito superficial na cutícula — que sai nas primeiras 3 lavagens. A cliente liga reclamando da durabilidade. O erro foi antes da aplicação.",
          variant: "erro",
        },
      ],
    },
    {
      pageNumber: 26,
      title: "Volumes e Suas Funções",
      content: [
        {
          type: "paragraph",
          text: "A escolha da volumagem define o grau de abertura da cutícula e, consequentemente, o grau de clareamento e a profundidade de fixação do pigmento.",
        },
        {
          type: "list",
          items: [
            "10 vol (3%): deposita cor sem clareamento. Para tonalização tom sobre tom, cobertura de grisalhos com pigmento idêntico ao natural.",
            "20 vol (6%): clareamento de 1-2 tons. A volumagem padrão para a maioria das colorações permanentes.",
            "30 vol (9%): clareamento de 2-3 tons. Para fios resistentes que precisam de maior abertura.",
            "40 vol (12%): clareamento de 3-4 tons. Máxima abertura, uso limitado a situações específicas com fios saudáveis.",
          ],
        },
      ],
    },
    {
      pageNumber: 27,
      title: "Química do pH Capilar",
      content: [
        {
          type: "paragraph",
          text: "O fio saudável tem pH entre 4,5 e 5,5 — ligeiramente ácido. Os oxidantes e tintas permanentes são alcalinos (pH 9-11), o que abre a cutícula durante o processo.",
        },
        {
          type: "numbered-list",
          items: [
            "pH ácido (< 7): cutícula fechada, brilho, cor preservada.",
            "pH neutro (7): ponto de equilíbrio, cutícula levemente aberta.",
            "pH alcalino (> 7): cutícula aberta, cor entra no córtex — mas também sai mais rápido sem a selagem correta.",
          ],
        },
        {
          type: "protocol-alert",
          title: "Ignorar a selagem ácida é desperdiçar a coloração inteira.",
          body: "Sem fechar a cutícula pós-coloração, o pigmento migra do córtex a cada lavagem. O resultado dura metade do tempo e a cliente acha que o produto é ruim. O erro é da técnica.",
          variant: "erro",
        },
      ],
    },
    {
      pageNumber: 28,
      title: "Durabilidade da Cor",
      content: [
        {
          type: "paragraph",
          text: "A durabilidade de uma coloração não depende apenas do produto — depende do protocolo completo: diagnóstico, fórmula, aplicação e pós-tratamento.",
        },
        {
          type: "list",
          items: [
            "Pigmentos permanentes: entram no córtex via oxidação e ficam até o fio crescer ou ser quimicamente alterado novamente.",
            "Pigmentos semipermanentes: depositam na cutícula. Duram 6-12 lavagens.",
            "Pigmentos diretos (tons fantasia): cobrem a superfície da cutícula. Duram 4-8 lavagens.",
          ],
        },
        {
          type: "quote",
          text: "A cliente não paga pela coloração. Ela paga pelo resultado que dura. A durabilidade é o seu argumento de retenção.",
          attribution: "Alaíde Proença",
        },
      ],
    },
    {
      pageNumber: 29,
      title: "Proporção Tinta:Oxidante",
      content: [
        {
          type: "paragraph",
          text: "A proporção entre tinta e oxidante afeta diretamente a viscosidade da fórmula, o tempo de ação e a intensidade do resultado.",
        },
        {
          type: "graphic-stage",
          caption: "Figura 08: Tabela de proporções tinta:oxidante por tipo de serviço",
          figure: 8,
        },
        {
          type: "list",
          items: [
            "1:1 (igual): fórmula mais densa, para aplicação em raiz, maior intensidade de cor.",
            "1:1,5 (padrão): equilíbrio entre cobertura e distribuição. O mais usado.",
            "1:2 (mais fluido): para mechas e balayage, facilita a penetração e distribuição uniforme.",
          ],
        },
      ],
    },
    {
      pageNumber: 30,
      title: "Cálculo para Mechas",
      content: [
        {
          type: "paragraph",
          text: "Mechas exigem mais produto do que uma coloração completa por conta da distribuição em papéis e da necessidade de saturação completa de cada mecha.",
        },
        {
          type: "numbered-list",
          items: [
            "Para mechas completas: calcule 30g de descolorante + 60ml de oxidante por mecha espessa.",
            "Para retoque de crescimento: use apenas o equivalente ao comprimento novo (evitar sobreposição em comprimentos já claros).",
            "Para babylights: 15-20g de descolorante + 30-40ml de oxidante por mechas finas.",
          ],
        },
        {
          type: "protocol-alert",
          title: "Aplicar produto demais em mechas já claras cria diferença visível de resultado.",
          body: "A sobreposição em comprimentos pré-clareados gera superprocesamento: fio quebradiço, tom diferente da raiz e cliente insatisfeita. Calcule separadamente e aplique com precisão cirúrgica.",
          variant: "erro",
        },
      ],
    },
    {
      pageNumber: 31,
      title: "Pós-Coloração: Selagem e Manutenção",
      content: [
        {
          type: "paragraph",
          text: "A selagem ácida é a etapa que encerra o protocolo com precisão. Ela fecha a cutícula aberta pelo oxidante, retorna o pH ao nível saudável e cria a blindagem que mantém o pigmento no córtex.",
        },
        {
          type: "list",
          items: [
            "Agentes seladores naturais: ácido cítrico, ácido tartárico, vinagre de maçã diluído.",
            "Produtos técnicos: finalizadores com pH 3-5, máscaras acidificantes.",
            "Tempo de ação: 3-5 minutos são suficientes para fechar a cutícula.",
          ],
        },
        {
          type: "quote",
          text: "Sem selagem, você entregou um produto — não um resultado. O acabamento é parte do serviço.",
        },
      ],
    },
    {
      pageNumber: 32,
      title: "Manutenção em Casa",
      content: [
        {
          type: "paragraph",
          text: "A durabilidade da cor começa no salão e continua em casa. A educação da cliente sobre manutenção é responsabilidade profissional e argumento de retenção.",
        },
        {
          type: "numbered-list",
          items: [
            "Shampoo para cabelo colorido: pH entre 4 e 5. Evitar sulfatos pesados que abrem a cutícula.",
            "Frequência de lavagem: dias alternados nos primeiros 7 dias para estabilizar o pigmento.",
            "Condicionador leave-in com proteção UV: o sol é o maior inimigo de tons frios.",
            "Evitar agua quente: abre a cutícula e remove pigmento a cada lavagem.",
            "Máscara hidratante semanal: repõe a umidade perdida na coloração.",
          ],
        },
        {
          type: "highlight",
          title: "Kit de manutenção personalizado",
          body: "Monte um kit com os produtos certos para o tipo e cor do cabelo da sua cliente. Isso é serviço diferenciado — e receita adicional.",
        },
      ],
    },
    {
      pageNumber: 33,
      title: "Protocolo Completo de Coloração Magistral",
      content: [
        {
          type: "paragraph",
          text: "Este é o protocolo completo de coloração Masterglass — a síntese de tudo o que foi estudado neste acervo. Execute cada etapa com intenção. Resultado não é acidente: é método.",
        },
        {
          type: "numbered-list",
          items: [
            "Diagnóstico completo: porosidade, textura, histórico químico.",
            "Leitura do fundo de clareamento atual e cálculo do alvo.",
            "Escolha do oxidante e proporção tinta:oxidante.",
            "Pré-clareamento se necessário (com tempo controlado e verificação a cada 10 minutos).",
            "Neutralização calculada com base no fundo obtido.",
            "Aplicação sistemática: raiz → comprimentos → pontas.",
            "Verificação de cobertura e uniformidade antes da emulsão.",
            "Emulsão e enxágue completo.",
            "Selagem ácida por 3-5 minutos.",
            "Finalização e documentação (foto do resultado).",
          ],
        },
        {
          type: "graphic-stage",
          caption: "Figura 09: Fluxograma completo do Protocolo Masterglass de Coloração",
          figure: 9,
        },
        {
          type: "quote",
          text: "O protocolo é a sua assinatura. Cada etapa cumprida é a diferença entre um serviço e uma obra.",
          attribution: "Alaíde Proença",
        },
      ],
    },
  ],
};

// ─── Exportações ───────────────────────────────────────────────────────────

export const chapters: ApostilaChapter[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
];

export const allPages: ApostilaPage[] = chapters.flatMap((c) => c.pages);

export const TOTAL_PAGES = 33;

export function getPage(pageNumber: number): ApostilaPage | undefined {
  return allPages.find((p) => p.pageNumber === pageNumber);
}

export function getChapterByPage(pageNumber: number): ApostilaChapter | undefined {
  return chapters.find(
    (c) => pageNumber >= c.startPage && pageNumber <= c.endPage,
  );
}

/** Mapeia a PageId legada (LessonsPanel) para o número da primeira página do capítulo */
export const LESSON_ENTRY_PAGES = {
  abertura: 1,   // Cap. 1: Tricologia
  oswald: 17,    // Cap. 3: Estrela de Oswald
  oxidantes: 25, // Cap. 4: Matemática da Fixação
} as const;
