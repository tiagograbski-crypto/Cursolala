import React, { useState, useEffect } from 'react';

export default function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'aluna', 'lala'
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const [activeTab, setActiveTab] = useState('apostila'); 
  const [bookPage, setBookPage] = useState('capa'); 
  const [passcode, setPasscode] = useState('');

  // NOVA PALETA DA LALA: Pérola, Verde Mate e Marrom/Chocolate
  const colors = {
    background: '#FDFBF7', // Pérola super claro
    panel: '#FFFFFF',
    text: '#4A3B32', // Marrom Escuro / Chocolate (Neutro)
    textMuted: '#8B7E76', // Marrom acinzentado
    accent: '#6B705C', // Verde Mate (Elegante/Botânico)
    border: '#E8E5DF', // Pérola escurecido para bordas
  };

  const handleLogin = (role) => {
    if (!passcode && role !== 'login') return;
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setCurrentView(role);
    }, 1500);
  };

  // -----------------------------------------------------
  // TELA 1: PORTARIA VIP (LOGIN COM SELO GL PRO)
  // -----------------------------------------------------
  if (currentView === 'login') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative transition-colors duration-500" style={{ backgroundColor: colors.background, color: colors.text }}>
        <div className="w-full max-w-md p-10 flex flex-col items-center z-10">
          
          <div className="w-24 h-24 rounded-full mb-6 border border-gray-200 overflow-hidden flex items-center justify-center shadow-lg" style={{ backgroundColor: colors.panel, borderColor: colors.accent }}>
            <span className="text-[10px] text-center px-2 font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Alaíde<br/>Proença</span>
          </div>
          
          <h1 className="font-serif text-3xl mb-1 text-center" style={{ color: colors.text }}>Alaíde Proença</h1>
          <p className="text-xs uppercase tracking-widest mb-10 text-center font-bold" style={{ color: colors.accent }}>Masterclass Colorimetria</p>
          
          {isAuthenticating ? (
            <div className="flex flex-col items-center py-8">
              <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin mb-4" style={{ borderColor: `${colors.accent} transparent ${colors.accent} ${colors.accent}` }}></div>
              <p className="text-xs font-bold uppercase tracking-widest animate-pulse" style={{ color: colors.accent }}>Conectando aos servidores GL PRO...</p>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border" style={{ borderColor: colors.border }}>
                <p className="text-xs font-bold uppercase tracking-widest text-center mb-4" style={{ color: colors.textMuted }}>Acesso Exclusivo</p>
                <input 
                  type="password" 
                  placeholder="Insira sua Chave PIX"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full p-4 rounded-xl outline-none text-center tracking-widest border transition-all focus:border-current mb-4"
                  style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.border }}
                />
                <button 
                  onClick={() => handleLogin('aluna')}
                  className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition shadow-md text-white"
                  style={{ backgroundColor: colors.accent }}
                >
                  Entrar no Curso
                </button>
              </div>
              <button 
                onClick={() => handleLogin('lala')}
                className="w-full py-3 mt-4 text-[10px] font-bold uppercase tracking-widest transition hover:opacity-70"
                style={{ color: colors.textMuted }}
              >
                Acesso da Produtora (Lala)
              </button>
            </div>
          )}
        </div>
        
        {/* SELO WHITE LABEL GL PRO */}
        <div className="absolute bottom-8 flex flex-col items-center opacity-40">
          <DatabaseIcon size={16} className="mb-1" style={{ color: colors.text }} />
          <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: colors.text }}>Tecnologia GL PRO</p>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------
  // TELA 2: PAINEL DA PRODUTORA (LALA) - FOCO EM PIX E ESCALA
  // -----------------------------------------------------
  if (currentView === 'lala') {
    return (
      <div className="min-h-screen flex flex-col pb-20 md:pb-0" style={{ backgroundColor: colors.background, color: colors.text }}>
        
        <header className="p-6 bg-white border-b flex justify-between items-center z-10 sticky top-0" style={{ borderColor: colors.border }}>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full border flex items-center justify-center" style={{ borderColor: colors.accent }}>
                <span className="text-[8px] uppercase font-bold" style={{ color: colors.accent }}>Lala</span>
             </div>
             <div>
                <h1 className="font-serif text-lg leading-none">Meu Negócio</h1>
                <p className="text-[10px] uppercase tracking-widest" style={{ color: colors.accent }}>Gestão de Acessos</p>
             </div>
          </div>
          <button onClick={() => setCurrentView('login')} className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: colors.textMuted }}>
            <LogOutIcon size={14} /> Sair
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bloco 1: Acesso PIX */}
            <div className="col-span-1 md:col-span-2 p-8 rounded-2xl shadow-sm bg-white border" style={{ borderColor: colors.border }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${colors.accent}15` }}>
                  <UnlockIcon size={20} style={{ color: colors.accent }} />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm">Liberação de Acesso (Pós-PIX)</h3>
                  <p className="text-xs" style={{ color: colors.textMuted }}>Gere a chave única para enviar no WhatsApp da aluna.</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <input type="text" placeholder="Nome da Aluna ou Telefone" className="flex-1 p-4 rounded-xl border outline-none text-sm" style={{ backgroundColor: colors.background, borderColor: colors.border }} />
                <button className="py-4 px-8 rounded-xl text-xs font-bold uppercase tracking-widest transition shadow-md text-white whitespace-nowrap" style={{ backgroundColor: colors.text }}>
                  Gerar Chave
                </button>
              </div>
            </div>

            {/* Bloco 2: Up-sell Agência Thiago */}
            <div className="col-span-1 p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between border-0" style={{ backgroundColor: colors.text, color: colors.background }}>
              <div className="absolute -top-4 -right-4 opacity-10">
                <RocketIcon size={120} color={colors.background} />
              </div>
              <div className="relative z-10">
                <h3 className="font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2" style={{ color: colors.accent }}>
                  <RocketIcon size={14} color={colors.accent} />
                  Impulsionar Vendas
                </h3>
                <h4 className="font-serif text-2xl mb-4 leading-tight">Quer lotar suas turmas?</h4>
                <p className="text-xs opacity-80 mb-8 leading-relaxed">Nossa agência de tráfego é parceira integrada. Atraímos as alunas certas para o seu WhatsApp.</p>
              </div>
              <button className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition border-0 relative z-10 flex items-center justify-center gap-2 text-white shadow-lg" style={{ backgroundColor: colors.accent }}>
                Falar com Especialista <ArrowRightIcon size={14} />
              </button>
            </div>

            {/* Bloco 3: Acerto de Infraestrutura GL PRO */}
            <div className="col-span-1 md:col-span-3 p-6 rounded-2xl bg-white border flex flex-col md:flex-row items-center justify-between mt-2" style={{ borderColor: colors.border }}>
              <div className="mb-4 md:mb-0 flex items-center gap-4">
                <div className="p-3 rounded-full" style={{ backgroundColor: colors.background }}>
                  <DatabaseIcon size={20} style={{ color: colors.textMuted }} />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-xs" style={{ color: colors.textMuted }}>Uso da Infraestrutura GL PRO</h3>
                  <p className="text-[10px] font-bold mt-1" style={{ color: colors.text }}>Fechamento Quinzenal (15 chaves geradas)</p>
                </div>
              </div>
              <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-xl border border-gray-100 w-full md:w-auto justify-between md:justify-start">
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Total Recebido (PIX)</p>
                  <p className="text-lg font-bold" style={{ color: colors.accent }}>R$ 14.955,00</p>
                </div>
                <div className="w-px h-10 bg-gray-200 hidden md:block"></div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Acerto GL PRO (20%)</p>
                  <p className="text-lg font-bold" style={{ color: colors.text }}>R$ 2.991,00</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Assinatura no Painel da Produtora */}
        <div className="py-4 text-center">
           <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: colors.textMuted }}>Powered by GL PRO</p>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------
  // TELA 3: PAINEL DA ALUNA (MOBILE FIRST & LUXURY)
  // -----------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0" style={{ backgroundColor: colors.background, color: colors.text }}>
      
      {/* Header Aluna */}
      <header className="px-6 py-4 flex justify-between items-center bg-white border-b z-10 sticky top-0" style={{ borderColor: colors.border }}>
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-100" style={{ border: `1px solid ${colors.accent}` }}>
              <span className="text-[8px] font-bold uppercase" style={{ color: colors.accent }}>Foto</span>
           </div>
           <div>
              <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: colors.accent }}>Módulo VIP</p>
              <h2 className="font-serif text-lg leading-none">A Matemática da Cor</h2>
           </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end mr-4">
            <span className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: colors.textMuted }}>Progresso</span>
            <div className="w-24 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-[35%]" style={{ backgroundColor: colors.accent }}></div>
            </div>
          </div>
          {/* Módulo Certificado (Gatilho Upsell) */}
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest border cursor-not-allowed bg-gray-50 opacity-60" style={{ color: colors.textMuted, borderColor: colors.border }}>
            <LockIcon size={12} /> <span className="hidden sm:inline">Certificado</span>
          </button>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        
        {/* Aba: Apostila Digital (O Leitor) */}
        {activeTab === 'apostila' && (
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
            
            {/* Índice Digital (Atualizado com os dados da Lala) */}
            <div className="w-full md:w-64 shrink-0 flex flex-col gap-4">
              <div className="bg-white p-4 rounded-2xl border" style={{ borderColor: colors.border }}>
                <h3 className="font-bold uppercase tracking-widest text-[10px] mb-4" style={{ color: colors.textMuted }}>Índice do Manual</h3>
                <ul className="flex flex-col gap-1">
                  <li onClick={() => setBookPage('capa')} className={`p-3 rounded-xl text-xs cursor-pointer transition-all ${bookPage === 'capa' ? 'font-bold shadow-sm' : 'hover:bg-gray-50'}`} style={{ backgroundColor: bookPage === 'capa' ? colors.background : 'transparent', color: bookPage === 'capa' ? colors.accent : colors.text }}>P0. Abertura e Glossário</li>
                  <li onClick={() => setBookPage('estrela')} className={`p-3 rounded-xl text-xs cursor-pointer transition-all ${bookPage === 'estrela' ? 'font-bold shadow-sm' : 'hover:bg-gray-50'}`} style={{ backgroundColor: bookPage === 'estrela' ? colors.background : 'transparent', color: bookPage === 'estrela' ? colors.accent : colors.text }}>P1. A Estrela de Oswald</li>
                  <li onClick={() => setBookPage('oxidantes')} className={`p-3 rounded-xl text-xs cursor-pointer transition-all ${bookPage === 'oxidantes' ? 'font-bold shadow-sm' : 'hover:bg-gray-50'}`} style={{ backgroundColor: bookPage === 'oxidantes' ? colors.background : 'transparent', color: bookPage === 'oxidantes' ? colors.accent : colors.text }}>P2. Laboratório de Oxidantes</li>
                </ul>
              </div>

              {/* Banner Presencial */}
              <div className="p-5 rounded-2xl text-center shadow-lg relative overflow-hidden" style={{ backgroundColor: colors.accent }}>
                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-white opacity-80">Domine na Prática</p>
                  <h4 className="font-serif text-lg text-white mb-3 leading-tight">Imersão Presencial</h4>
                  <button className="w-full py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-white shadow-md transition-transform hover:scale-105" style={{ color: colors.accent }}>
                    Garantir Vaga
                  </button>
                </div>
              </div>
            </div>

            {/* O Leitor Digital */}
            <div className="flex-1 bg-white p-8 md:p-12 rounded-3xl shadow-sm relative border" style={{ borderColor: colors.border, minHeight: '600px' }}>
              
              {/* Marca d'água de Licença */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.02] pointer-events-none overflow-hidden">
                <p className="text-6xl font-black uppercase tracking-tighter rotate-[-30deg]">Licença Exclusiva</p>
                <p className="text-2xl font-bold mt-4 rotate-[-30deg]">CPF: 123.456.789-00</p>
              </div>

              <div className="relative z-10 max-w-2xl mx-auto">
                
                {/* PÁGINA P0: CAPA E GLOSSÁRIO */}
                {bookPage === 'capa' && (
                  <div className="animate-fade-in">
                    <div className="text-center mt-4 mb-12 border-b pb-12" style={{ borderColor: colors.border }}>
                      <p className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: colors.accent }}>Colorimetria Avançada</p>
                      <h1 className="font-serif text-4xl md:text-5xl mb-6 leading-tight" style={{ color: colors.text }}>Simplificando a Colorimetria através da Matemática.</h1>
                      <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: colors.textMuted }}>
                        A verdadeira transformação acontece quando o profissional entende a pigmentação química e o diagnóstico exato da matéria-prima, sem ficar preso a marcas específicas.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <h3 className="font-bold uppercase tracking-widest text-xs mb-4" style={{ color: colors.text }}>Glossário Técnico</h3>
                      <ul className="space-y-4 text-sm" style={{ color: colors.textMuted }}>
                        <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: colors.accent }}></div><p><strong style={{ color: colors.text }}>Tricologia & Cosmetologia:</strong> O estudo profundo da estrutura do fio para aplicação exata do tratamento capilar.</p></li>
                        <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: colors.accent }}></div><p><strong style={{ color: colors.text }}>Diretrizes Anvisa:</strong> Normas de biossegurança obrigatórias para garantir a saúde do profissional e do cliente no ambiente do salão.</p></li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* PÁGINA P1: ESTRELA DE OSWALD */}
                {bookPage === 'estrela' && (
                  <div className="animate-fade-in">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="font-serif text-3xl">A Estrela de Oswald</h2>
                      <button className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-colors" style={{ backgroundColor: `${colors.accent}15`, color: colors.accent }}>
                        <PlayIcon size={12} /> Ver Aula
                      </button>
                    </div>
                    
                    <p className="mb-10 text-sm leading-relaxed" style={{ color: colors.textMuted }}>
                      Vou colaborar com o meu cliente desvendando mistérios sobre reflexo e neutralização através do fundo de clareamento adequado. No lavatório, definiremos a importância real de como transformar o cabelo para cada desejo, respeitando o diagnóstico.
                    </p>
                    
                    {/* Gráfico SVG da Estrela */}
                    <div className="flex justify-center mb-12">
                      <div className="relative w-64 h-64 p-4 rounded-full bg-gray-50 border border-gray-100 shadow-inner">
                        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                          <line x1="50" y1="10" x2="50" y2="90" stroke={colors.border} strokeWidth="2" strokeDasharray="2" />
                          <line x1="15" y1="30" x2="85" y2="70" stroke={colors.border} strokeWidth="2" strokeDasharray="2" />
                          <line x1="85" y1="30" x2="15" y2="70" stroke={colors.border} strokeWidth="2" strokeDasharray="2" />
                          
                          <circle cx="50" cy="10" r="7" fill="#EAB308" /> {/* Amarelo */}
                          <circle cx="85" cy="30" r="7" fill="#F97316" /> {/* Laranja */}
                          <circle cx="85" cy="70" r="7" fill="#EF4444" /> {/* Vermelho */}
                          <circle cx="50" cy="90" r="7" fill="#22C55E" /> {/* Verde (Mate) */}
                          <circle cx="15" cy="70" r="7" fill="#3B82F6" /> {/* Azul */}
                          <circle cx="15" cy="30" r="7" fill="#A855F7" /> {/* Violeta */}
                        </svg>
                      </div>
                    </div>
                    
                    <div className="p-5 rounded-xl border-l-4" style={{ backgroundColor: colors.background, borderColor: colors.accent }}>
                      <p className="font-bold text-xs uppercase tracking-widest mb-2" style={{ color: colors.accent }}>Regra de Ouro no Lavatório</p>
                      <p className="text-sm" style={{ color: colors.textMuted }}>A cor que está na extremidade oposta da estrela é a que você utilizará para <strong style={{ color: colors.text }}>neutralizar</strong> o fundo de clareamento indesejado.</p>
                    </div>
                  </div>
                )}

                {/* PÁGINA P2: OXIDANTES (CARDS VISUAIS) */}
                {bookPage === 'oxidantes' && (
                  <div className="animate-fade-in">
                    <h2 className="font-serif text-3xl mb-8">Fórmulas e Oxidantes</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* 10 Vol com Destaque */}
                      <div className="p-6 rounded-2xl relative overflow-hidden shadow-sm" style={{ backgroundColor: colors.text, color: colors.background }}>
                        <div className="absolute top-4 right-4">
                          <span className="text-[8px] font-bold px-2 py-1 rounded uppercase tracking-widest bg-white/20">Segredo da Lala</span>
                        </div>
                        <h3 className="font-serif text-3xl mb-2" style={{ color: colors.accent }}>10 Vol</h3>
                        <p className="font-bold mb-1">Mantém o tom.</p>
                        <p className="text-xs opacity-80 leading-relaxed">Ideal para usar na mistura de <strong className="text-white">matização</strong> no lavatório sem abrir a base natural.</p>
                      </div>
                      
                      <div className="p-6 rounded-2xl border bg-gray-50" style={{ borderColor: colors.border }}>
                        <h3 className="font-serif text-3xl mb-2" style={{ color: colors.textMuted }}>20 Vol</h3>
                        <p className="font-bold mb-1" style={{ color: colors.text }}>Clareia 1 a 2 tons.</p>
                        <p className="text-xs leading-relaxed" style={{ color: colors.textMuted }}>Uso padrão para coloração permanente e cobertura total de brancos normais.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Aba: Ficha de Anamnese */}
        {activeTab === 'anamnese' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl mb-2">Ficha de Diagnóstico</h2>
              <p className="text-xs uppercase tracking-widest" style={{ color: colors.textMuted }}>Avaliação da Matéria-Prima</p>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border space-y-6" style={{ borderColor: colors.border }}>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: colors.textMuted }}>Nome da Cliente</label>
                <input type="text" className="w-full p-4 rounded-xl border outline-none text-sm bg-gray-50 focus:bg-white transition-colors" style={{ borderColor: colors.border }} />
              </div>

              <div className="border-t pt-6" style={{ borderColor: colors.border }}>
                <h3 className="font-bold text-xs uppercase tracking-widest mb-4" style={{ color: colors.text }}>Teste de Elasticidade</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer p-4 border rounded-xl hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border }}>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: colors.accent }}></div>
                      <span className="text-sm font-bold">Fio Elástico/Emborrachado</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase px-2 py-1 bg-red-50 text-red-600 rounded">Não Descolorir</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-4 border rounded-xl hover:bg-gray-50 transition-colors" style={{ borderColor: colors.border }}>
                    <div className="w-4 h-4 rounded-full border-2 bg-current" style={{ color: colors.accent, borderColor: colors.accent }}></div>
                    <span className="text-sm font-bold">Fio Resistente (Aprovado)</span>
                  </label>
                </div>
              </div>

              <button className="w-full py-4 mt-4 rounded-xl text-xs font-bold uppercase tracking-widest text-white shadow-md transition-transform hover:scale-[1.02]" style={{ backgroundColor: colors.accent }}>
                Salvar Diagnóstico
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Menu Inferior (Mobile & Desktop) - Estilo Instagram/App */}
      <nav className="fixed md:sticky bottom-0 w-full bg-white border-t flex justify-around p-2 pb-safe z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]" style={{ borderColor: colors.border }}>
        <NavItem icon={BookOpenIcon} label="Apostila" active={activeTab === 'apostila'} onClick={() => setActiveTab('apostila')} colors={colors} />
        <NavItem icon={FileTextIcon} label="Anamnese" active={activeTab === 'anamnese'} onClick={() => setActiveTab('anamnese')} colors={colors} />
        <NavItem icon={QrCodeIcon} label="QR Code" active={activeTab === 'qrcode'} onClick={() => setActiveTab('qrcode')} colors={colors} />
        <div className="hidden md:flex items-center ml-auto px-4">
          <p className="text-[9px] uppercase font-bold tracking-widest opacity-50">Tecnologia GL PRO</p>
        </div>
      </nav>
      
      <div className="md:hidden text-center py-2 bg-white">
        <p className="text-[8px] uppercase font-bold tracking-widest opacity-40">Tecnologia GL PRO</p>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTES & ÍCONES SVG (SEM DEPENDÊNCIAS)
// ==========================================
const NavItem = ({ icon: Icon, label, active, onClick, colors }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-1 p-2 min-w-[64px] transition-opacity hover:opacity-100"
    style={{ opacity: active ? 1 : 0.4, color: active ? colors.accent : colors.text }}
  >
    <Icon size={22} />
    <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
  </button>
);

const BookOpenIcon = ({ size, color="currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);
const FileTextIcon = ({ size, color="currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
);
const QrCodeIcon = ({ size, color="currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="5" height="5" rx="1"></rect><rect x="16" y="3" width="5" height="5" rx="1"></rect><rect x="3" y="16" width="5" height="5" rx="1"></rect><path d="M21 16h-3a2 2 0 0 0-2 2v3"></path><path d="M21 21v.01"></path><path d="M12 7v3a2 2 0 0 1-2 2H7"></path><path d="M3 12h.01"></path><path d="M12 3h.01"></path><path d="M12 16v.01"></path><path d="M16 12h1"></path><path d="M21 12v.01"></path><path d="M12 21v-1"></path></svg>
);
const PlayIcon = ({ size, color="currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);
const LockIcon = ({ size, color="currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);
const UnlockIcon = ({ size, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
);
const DatabaseIcon = ({ size, className, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
);
const RocketIcon = ({ size, color="currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
);
const ArrowRightIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);
const LogOutIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
);