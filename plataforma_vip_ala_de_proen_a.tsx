import React, { useState } from 'react';

export default function LalaPlatformApp() {
  const [activeTab, setActiveTab] = useState('apostila'); 
  const [activeModule, setActiveModule] = useState(1);
  const [viewMode, setViewMode] = useState('aluna'); 
  const [activeApostilaPage, setActiveApostilaPage] = useState('oxidantes'); 

  // NOVO: SISTEMA DE CATRACA VIP E PRELOAD
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginStep, setLoginStep] = useState('selecao'); // 'selecao', 'senha_aluna', 'senha_lala', 'loading'
  const [pin, setPin] = useState('');

  // Paleta Luxo Iluminado
  const colors = {
    bgBase: '#FBFBF9', 
    bgPanel: '#FFFFFF', 
    gold: '#C69C6D', 
    goldLight: '#F4EBE1', 
    textMain: '#2B2B2B', 
    textMuted: '#757575', 
    border: '#EAE5D9' 
  };

  const masterclasses = [
    { id: 1, title: 'Fundo de Clareamento sem Mistério', duration: '12 min', isLocked: false },
    { id: 2, title: 'A Nova Estrela de Oswald', duration: '45 min', isLocked: false },
    { id: 3, title: 'Matemática da Cor (A Mistura)', duration: '30 min', isLocked: true },
    { id: 4, title: 'SOS Lavatório (Correções)', duration: '50 min', isLocked: true },
  ];

  // ==========================================
  // TELA DE PORTARIA VIP (LOGIN & PRELOAD)
  // ==========================================
  if (!isAuthenticated) {
    const handleLogin = (e) => {
      e.preventDefault();
      if (pin.length > 0) {
        setLoginStep('loading');
        setTimeout(() => {
          setIsAuthenticated(true);
        }, 1800); // 1.8s de animação de preload para dar peso ao sistema
      }
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden" style={{ backgroundColor: colors.bgBase, color: colors.textMain }}>
        
        {/* Elementos Decorativos de Fundo */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#EAE5D9] to-transparent opacity-50 z-0"></div>
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#F4EBE1] blur-3xl opacity-60 z-0"></div>

        <div className="w-full max-w-md z-10 flex flex-col items-center">
          
          {/* A FOTO DA LALA (ANCORAGEM DE AUTORIDADE) */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 shadow-2xl mb-6 relative" style={{ borderColor: colors.goldLight }}>
             <div className="w-full h-full bg-gradient-to-br from-[#EAE5D9] to-[#C69C6D] flex items-end justify-center">
                <UserIcon size={90} color="#FFF" className="opacity-70" />
             </div>
             {/* Simulação de onde a foto lala.png vai entrar */}
             <div className="absolute inset-0 bg-black/5"></div>
          </div>

          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-wider text-[#2B2B2B]">Alaíde Proença</h1>
            <p className="text-[10px] uppercase tracking-widest mt-2 font-bold" style={{ color: colors.gold }}>Academy • Acesso Restrito</p>
          </div>

          {/* PASSO 1: QUEM ESTÁ ACESSANDO? */}
          {loginStep === 'selecao' && (
            <div className="w-full space-y-4 animate-fade-in-up">
              <button 
                onClick={() => { setViewMode('aluna'); setLoginStep('senha_aluna'); }}
                className="w-full py-4 px-6 bg-white rounded-xl shadow-sm border flex items-center justify-between group hover:border-[#C69C6D] transition-all"
                style={{ borderColor: colors.border }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-500 group-hover:bg-[#F4EBE1] group-hover:text-[#C69C6D] transition-colors">
                    <BookIcon size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#2B2B2B]">Sou Aluna</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Acessar Material</p>
                  </div>
                </div>
                <PlayIcon size={16} color={colors.gold} />
              </button>

              <button 
                onClick={() => { setViewMode('lala'); setLoginStep('senha_lala'); }}
                className="w-full py-4 px-6 bg-[#2B2B2B] rounded-xl shadow-lg border-transparent flex items-center justify-between group hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-gray-300">
                    <KeyIcon size={18} color={colors.gold} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">Meu Negócio (Lala)</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Gestão e Liberação de PIX</p>
                  </div>
                </div>
                <PlayIcon size={16} color={colors.gold} />
              </button>
            </div>
          )}

          {/* PASSO 2: A SENHA (PORTARIA) */}
          {(loginStep === 'senha_aluna' || loginStep === 'senha_lala') && (
            <form onSubmit={handleLogin} className="w-full bg-white p-8 rounded-2xl shadow-xl border animate-fade-in-up" style={{ borderColor: colors.border }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-xl">{loginStep === 'senha_aluna' ? 'Acesso do Aluno' : 'Painel de Gestão'}</h2>
                <button type="button" onClick={() => { setLoginStep('selecao'); setPin(''); }} className="text-[10px] uppercase font-bold text-gray-400 hover:text-gray-800">Voltar</button>
              </div>
              
              <div className="mb-6">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Sua Chave de Acesso</label>
                <input 
                  type="password" 
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Ex: LALA-2026..."
                  className="w-full p-4 text-center tracking-[0.3em] font-mono text-lg border rounded-xl bg-gray-50 outline-none focus:border-[#C69C6D] transition-colors"
                  autoFocus
                />
              </div>
              
              <button 
                type="submit"
                disabled={pin.length === 0}
                className="w-full py-4 rounded-xl text-sm font-bold shadow-md transition-transform hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0"
                style={{ backgroundColor: colors.gold, color: '#FFF' }}
              >
                Autenticar e Entrar
              </button>
            </form>
          )}

          {/* PASSO 3: O PRELOADER LUXUOSO */}
          {loginStep === 'loading' && (
            <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in-up py-10">
              <div className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: colors.goldLight, borderTopColor: colors.gold }}></div>
              <div className="text-center">
                <p className="font-serif text-lg text-[#2B2B2B]">Autenticando credenciais...</p>
                <p className="text-xs mt-1" style={{ color: colors.textMuted }}>Sincronizando banco de dados</p>
              </div>
            </div>
          )}

        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}} />
      </div>
    );
  }

  // ==========================================
  // RENDERIZAÇÃO DO APLICATIVO PRINCIPAL (APÓS LOGIN)
  // ==========================================
  return (
    <div className="min-h-screen font-sans flex flex-col md:flex-row pb-16 md:pb-0 animate-fade-in-up" style={{ backgroundColor: colors.bgBase, color: colors.textMain }}>
      
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden md:flex flex-col w-64 border-r p-6 h-screen sticky top-0" style={{ borderColor: colors.border, backgroundColor: colors.bgPanel }}>
        <div className="text-center mb-10">
          <h1 className="font-serif text-2xl font-bold tracking-wider text-[#2B2B2B]">Alaíde<br/>Proença</h1>
          <p className="text-[10px] uppercase tracking-widest mt-2" style={{ color: colors.gold }}>Academy</p>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <NavItem icon={<PlayIcon size={18} />} label="Fórmulas de Bancada" active={activeTab === 'masterclass' && viewMode === 'aluna'} onClick={() => {setActiveTab('masterclass'); setViewMode('aluna');}} colors={colors} />
          <NavItem icon={<BookIcon size={18} />} label="Apostila Premium" active={activeTab === 'apostila' && viewMode === 'aluna'} onClick={() => {setActiveTab('apostila'); setViewMode('aluna');}} colors={colors} />
          <NavItem icon={<ClipboardIcon size={18} />} label="Ficha de Anamnese" active={activeTab === 'anamnese' && viewMode === 'aluna'} onClick={() => {setActiveTab('anamnese'); setViewMode('aluna');}} colors={colors} />
          <NavItem icon={<QrCodeIcon size={18} />} label="Escanear QR Code" active={activeTab === 'qr' && viewMode === 'aluna'} onClick={() => {setActiveTab('qr'); setViewMode('aluna');}} colors={colors} />
        </nav>

        {/* CONTROLE THIAGO: Alternar entre Aluna e Produtora */}
        <div className="mt-6 p-4 rounded-xl flex flex-col gap-2 border" style={{ backgroundColor: colors.bgBase, borderColor: colors.border }}>
          <p className="text-[10px] uppercase tracking-widest font-bold text-center mb-2" style={{ color: colors.textMuted }}>Modo de Visualização</p>
          <button onClick={() => setViewMode('aluna')} className={`w-full py-2 rounded text-xs font-bold transition-all ${viewMode === 'aluna' ? 'bg-[#2B2B2B] text-white shadow-md' : 'bg-transparent border border-gray-300 text-gray-500'}`}>
            Visão da Aluna
          </button>
          <button onClick={() => setViewMode('lala')} className={`w-full py-2 rounded text-xs font-bold transition-all ${viewMode === 'lala' ? 'bg-[#C69C6D] text-white shadow-md' : 'bg-transparent border border-gray-300 text-gray-500'}`}>
            Meu Negócio (Lala)
          </button>
        </div>
      </aside>

      {/* HEADER MOBILE */}
      <header className="md:hidden flex items-center justify-between p-4 border-b z-10 sticky top-0" style={{ borderColor: colors.border, backgroundColor: colors.bgPanel }}>
        <div>
          <h1 className="font-serif text-xl font-bold text-[#2B2B2B]">Alaíde Proença</h1>
          <p className="text-[9px] uppercase tracking-widest" style={{ color: colors.gold }}>Academy</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setViewMode(viewMode === 'aluna' ? 'lala' : 'aluna')} className="px-3 py-1.5 border rounded-full text-xs font-bold transition-colors" style={{ borderColor: colors.gold, color: colors.gold, backgroundColor: viewMode === 'lala' ? colors.goldLight : 'transparent' }}>
            {viewMode === 'aluna' ? 'Ver Lala' : 'Ver Aluna'}
          </button>
        </div>
      </header>

      {/* MENU INFERIOR MOBILE */}
      {viewMode === 'aluna' && (
        <nav className="md:hidden fixed bottom-0 w-full flex justify-around items-center p-3 border-t z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] pb-safe" style={{ backgroundColor: colors.bgPanel, borderColor: colors.border }}>
          <BottomTab icon={<PlayIcon size={20} />} label="Fórmulas" active={activeTab === 'masterclass'} onClick={() => setActiveTab('masterclass')} colors={colors} />
          <BottomTab icon={<BookIcon size={20} />} label="Apostila" active={activeTab === 'apostila'} onClick={() => setActiveTab('apostila')} colors={colors} />
          <BottomTab icon={<ClipboardIcon size={20} />} label="Ficha" active={activeTab === 'anamnese'} onClick={() => setActiveTab('anamnese')} colors={colors} />
          <BottomTab icon={<QrCodeIcon size={24} />} label="QR" active={activeTab === 'qr'} onClick={() => setActiveTab('qr')} colors={colors} isMain />
        </nav>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full md:h-screen overflow-y-auto custom-scrollbar relative">
        
        {viewMode === 'aluna' ? (
          <div className="flex flex-col pb-8">
            {/* NOVO: BARRA DE PROGRESSO E CERTIFICADO */}
            <div className="bg-white px-6 py-3 border-b flex justify-between items-center shadow-sm z-10" style={{ borderColor: colors.border }}>
               <div className="flex-1 max-w-md">
                 <div className="flex justify-between items-center mb-1">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Seu Progresso</p>
                   <p className="text-xs font-bold" style={{ color: colors.gold }}>35%</p>
                 </div>
                 <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                   <div className="h-full rounded-full transition-all duration-1000" style={{ width: '35%', backgroundColor: colors.gold }}></div>
                 </div>
               </div>
               <button className="flex items-center gap-2 px-3 py-1.5 ml-4 rounded-lg bg-gray-50 border border-gray-200 opacity-60 cursor-not-allowed group relative">
                 <AwardIcon size={16} className="text-gray-400" />
                 <span className="text-[10px] font-bold uppercase hidden sm:block">Certificado</span>
                 <LockIcon size={12} className="text-gray-400 absolute -top-1 -right-1" />
               </button>
            </div>

            {/* HERO BANNER - ALUNA (AGORA COM ESPAÇO PARA IMAGEM) */}
            <div className="px-6 py-8 md:px-12 md:py-12 relative overflow-hidden flex items-center justify-between" style={{ backgroundColor: colors.bgPanel, borderBottom: `1px solid ${colors.border}` }}>
              <div className="relative z-10 max-w-xl">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded mb-3 inline-block" style={{ backgroundColor: colors.goldLight, color: colors.gold }}>
                  Colorimetria Avançada
                </span>
                <h2 className="text-2xl md:text-4xl font-serif mb-3 leading-tight" style={{ color: colors.textMain }}>
                  Mais que um curso, <br/><span style={{ color: colors.gold, fontStyle: 'italic' }}>uma virada de chave.</span>
                </h2>
                <p className="text-sm" style={{ color: colors.textMuted }}>
                  A verdadeira transformação acontece quando você entende o porquê de cada técnica.
                </p>
              </div>
              
              {/* IMAGEM DA LALA (REPRESENTAÇÃO DA lala.png) */}
              <div className="hidden md:block w-48 h-48 lg:w-56 lg:h-56 relative z-10 rounded-full overflow-hidden border-4 shadow-2xl" style={{ borderColor: colors.border }}>
                 {/* Aqui entrará a tag <img src="lala.png" /> real. Por enquanto, um placeholder premium */}
                 <div className="w-full h-full bg-gradient-to-br from-[#EAE5D9] to-[#C69C6D] flex items-end justify-center relative">
                    <UserIcon size={120} color="#FFF" className="opacity-50 absolute -bottom-4" />
                    <div className="absolute inset-0 bg-black/10"></div>
                 </div>
              </div>

              <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#F4EBE1] to-transparent opacity-50 hidden md:block z-0"></div>
            </div>

            <div className="p-4 md:p-10">
              
              {/* MASTERCLASS (FÓRMULAS DE BANCADA) */}
              {activeTab === 'masterclass' && (
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Player de Vídeo */}
                  <div className="flex-1">
                    <div className="w-full bg-[#1A1A1A] rounded-2xl flex items-center justify-center relative overflow-hidden shadow-xl aspect-video group cursor-pointer">
                      <PlayCircleIcon size={64} color={colors.gold} className="relative z-20 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute bottom-4 left-4 z-20">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur text-white text-[10px] font-bold uppercase rounded">Rodando Aula Prática</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h3 className="font-serif text-2xl">{masterclasses.find(m => m.id === activeModule)?.title || 'Aula Selecionada'}</h3>
                      <p className="text-sm mt-2" style={{ color: colors.textMuted }}>Assista com a sua apostila em mãos. Faça anotações diretas na tabela de fundos de clareamento da página 12.</p>
                    </div>

                    {/* UPSELL PRESENCIAL */}
                    <div className="mt-8 p-6 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm" style={{ backgroundColor: colors.goldLight, borderColor: colors.gold }}>
                      <div>
                        <h4 className="font-serif font-bold text-lg text-[#2B2B2B]">Imersão Presencial com Alaíde</h4>
                        <p className="text-xs mt-1 text-[#5A4A35]">Você tem a receita. Agora venha dominar a técnica na bancada do salão.</p>
                      </div>
                      <button className="whitespace-nowrap px-6 py-3 rounded text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-transform hover:-translate-y-1" style={{ backgroundColor: colors.gold }}>
                        Garantir Minha Vaga
                      </button>
                    </div>
                  </div>

                  {/* Lista de Aulas */}
                  <div className="w-full lg:w-80 flex flex-col gap-3">
                    <h3 className="text-[10px] uppercase tracking-widest font-bold mb-2 px-2" style={{ color: colors.textMuted }}>Suas Fórmulas de Bancada</h3>
                    {masterclasses.map(mod => (
                      <button 
                        key={mod.id} onClick={() => !mod.isLocked && setActiveModule(mod.id)}
                        className={`p-4 rounded-xl border text-left transition-all flex items-center gap-4 ${activeModule === mod.id ? 'shadow-md' : 'hover:bg-white'} ${mod.isLocked ? 'opacity-50' : ''}`}
                        style={{ 
                          backgroundColor: activeModule === mod.id ? colors.bgPanel : 'transparent',
                          borderColor: activeModule === mod.id ? colors.gold : colors.border
                        }}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${activeModule === mod.id ? 'text-white shadow-inner' : ''}`} style={{ backgroundColor: activeModule === mod.id ? colors.gold : colors.border, color: activeModule === mod.id ? '#FFF' : colors.textMuted }}>
                            {mod.isLocked ? <LockIcon size={14} /> : (activeModule === mod.id ? <PlayIcon size={14} /> : <CheckCircleIcon size={14} />)}
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${activeModule === mod.id ? 'text-[#2B2B2B]' : colors.textMuted}`}>{mod.title}</p>
                          <p className="text-xs" style={{ color: colors.textMuted }}>{mod.duration}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* APOSTILA DIGITAL (O KINDLE DO SALÃO) */}
              {activeTab === 'apostila' && (
                <div className="w-full flex flex-col lg:flex-row gap-6 h-[75vh] md:h-[80vh]">
                  
                  {/* Menu do Livreto Digital */}
                  <div className="w-full lg:w-64 bg-white border rounded-2xl p-4 shadow-sm flex flex-col gap-2 shrink-0 overflow-y-auto" style={{ borderColor: colors.border }}>
                    <h3 className="font-serif text-lg text-[#2B2B2B] mb-2 px-2">Índice Digital</h3>
                    
                    <button onClick={() => setActiveApostilaPage('capa')} className={`text-left p-3 rounded-xl text-sm transition-all ${activeApostilaPage === 'capa' ? 'bg-[#F4EBE1] font-bold' : 'hover:bg-gray-50'}`} style={{ color: activeApostilaPage === 'capa' ? colors.gold : colors.textMuted }}>
                      00. O Manifesto
                    </button>
                    <button onClick={() => setActiveApostilaPage('estrela')} className={`text-left p-3 rounded-xl text-sm transition-all ${activeApostilaPage === 'estrela' ? 'bg-[#F4EBE1] font-bold' : 'hover:bg-gray-50'}`} style={{ color: activeApostilaPage === 'estrela' ? colors.gold : colors.textMuted }}>
                      01. A Nova Estrela de Oswald
                    </button>
                    <button onClick={() => setActiveApostilaPage('oxidantes')} className={`text-left p-3 rounded-xl text-sm transition-all ${activeApostilaPage === 'oxidantes' ? 'bg-[#F4EBE1] font-bold' : 'hover:bg-gray-50'}`} style={{ color: activeApostilaPage === 'oxidantes' ? colors.gold : colors.textMuted }}>
                      02. Matemática dos Oxidantes
                    </button>

                    <div className="mt-auto pt-4 border-t" style={{ borderColor: colors.border }}>
                       <button className="w-full py-3 rounded text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 text-white transition-transform hover:-translate-y-1 shadow-md" style={{ backgroundColor: '#2B2B2B' }}>
                        <DownloadIcon size={14} /> Baixar para Imprimir
                      </button>
                    </div>
                  </div>

                  {/* Área de Leitura */}
                  <div className="flex-1 bg-white border rounded-2xl shadow-md overflow-y-auto custom-scrollbar relative" style={{ borderColor: colors.border }}>
                    
                    {/* Marca d'água Anti-Pirataria */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] overflow-hidden z-0">
                      <p className="transform -rotate-45 text-4xl font-bold whitespace-nowrap">CPF: 123.456.789-00 • LICENÇA EXCLUSIVA LALA</p>
                    </div>

                    <div className="p-8 md:p-12 relative z-10">
                      
                      {activeApostilaPage === 'capa' && (
                        <div className="text-center h-full flex flex-col items-center justify-center mt-6">
                          
                          {/* FOTO DA LALA NA CAPA DO LIVRO DIGITAL */}
                          <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 shadow-lg" style={{ borderColor: colors.goldLight }}>
                             <div className="w-full h-full bg-gradient-to-br from-[#EAE5D9] to-[#C69C6D] flex items-end justify-center">
                                <UserIcon size={80} color="#FFF" className="opacity-50" />
                             </div>
                          </div>

                          <h2 className="font-serif text-3xl md:text-4xl text-[#2B2B2B] mb-4 leading-tight">
                            A Engenharia <br/>da Cor
                          </h2>
                          <div className="w-16 h-1 mb-6 mx-auto" style={{ backgroundColor: colors.gold }}></div>
                          
                          <div className="max-w-md mx-auto">
                            <p className="text-sm leading-relaxed" style={{ color: colors.textMuted }}>
                              Quando você dominar a Matemática das Cores, nunca mais vai suar frio no lavatório com medo de manchar um loiro ou chumbar um cabelo. Bem-vinda à sua nova realidade de bancada.
                            </p>
                          </div>
                          
                          <p className="mt-8 text-sm font-bold uppercase tracking-widest" style={{ color: colors.gold }}>Por Alaíde Proença</p>
                        </div>
                      )}

                      {activeApostilaPage === 'oxidantes' && (
                        <div>
                          <div className="flex justify-between items-start mb-8">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded mb-3 inline-block" style={{ backgroundColor: colors.border, color: colors.textMuted }}>Capítulo 02</span>
                              <h2 className="font-serif text-3xl text-[#2B2B2B]">Matemática dos Oxidantes</h2>
                            </div>
                            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition hover:bg-gray-50 border" style={{ color: colors.gold, borderColor: colors.goldLight }}>
                              <PlayCircleIcon size={16} /> Ver Aula Prática
                            </button>
                          </div>
                          
                          <p className="text-sm mb-10 leading-relaxed" style={{ color: colors.textMuted }}>
                            O processo de clareamento é obtido através dos oxidantes (H2O2). O grau de clareamento atingido depende exclusivamente da volumagem utilizada. Esqueça o achismo, use a regra de bancada abaixo:
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            {/* Card 10 Volumes (Com a anotação da Lala) */}
                            <div className="p-5 rounded-xl border relative overflow-hidden" style={{ borderColor: colors.gold, backgroundColor: colors.goldLight }}>
                              <h4 className="font-serif text-xl text-[#2B2B2B] mb-1">10 Volumes</h4>
                              <p className="text-sm font-bold text-gray-700 mb-4">Mantém o tom / Fixação</p>
                              
                              <div className="bg-white px-3 py-2 rounded shadow-sm inline-flex items-center gap-2 border" style={{ borderColor: colors.border }}>
                                <SparklesIcon size={14} color={colors.gold} />
                                <span className="text-xs font-bold" style={{ color: colors.gold }}>Segredo da Lala: Usar para Matizar</span>
                              </div>
                            </div>

                            {/* Cards Normais */}
                            <div className="p-5 rounded-xl border bg-gray-50" style={{ borderColor: colors.border }}>
                              <h4 className="font-serif text-xl text-[#2B2B2B] mb-1">20 Volumes</h4>
                              <p className="text-sm text-gray-600">Clareia de 1 a 2 tons.</p>
                              <p className="text-[10px] uppercase text-gray-400 mt-3 font-bold">Ideal para cobertura de brancos</p>
                            </div>

                            <div className="p-5 rounded-xl border bg-gray-50" style={{ borderColor: colors.border }}>
                              <h4 className="font-serif text-xl text-[#2B2B2B] mb-1">30 Volumes</h4>
                              <p className="text-sm text-gray-600">Clareia de 2 a 3 tons.</p>
                            </div>

                            <div className="p-5 rounded-xl border bg-gray-50" style={{ borderColor: colors.border }}>
                              <h4 className="font-serif text-xl text-[#2B2B2B] mb-1">40 Volumes</h4>
                              <p className="text-sm text-gray-600">Clareia de 3 a 4 tons.</p>
                              <p className="text-[10px] uppercase text-red-500 mt-3 font-bold">Atenção: Alto poder de sensibilização</p>
                            </div>

                          </div>
                        </div>
                      )}
                      
                      {activeApostilaPage === 'estrela' && (
                        <div>
                          <div className="flex justify-between items-start mb-8">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded mb-3 inline-block" style={{ backgroundColor: colors.border, color: colors.textMuted }}>Capítulo 01</span>
                              <h2 className="font-serif text-3xl text-[#2B2B2B]">A Nova Estrela de Oswald</h2>
                            </div>
                          </div>
                          
                          <p className="text-sm mb-8 leading-relaxed" style={{ color: colors.textMuted }}>
                            A Estrela de Oswald não é enfeite de parede, ela é a sua bússola. A regra principal que você precisa tatuar na mente é simples: <strong>Cores opostas se neutralizam</strong>. Se o cabelo revelou um fundo indesejado, você olha para a estrela e busca a cor que está exatamente do lado oposto para anular esse reflexo.
                          </p>

                          {/* NOVO: GRÁFICO ROBUSTO DA ESTRELA DE OSWALD */}
                          <div className="bg-[#FBFBF9] border p-8 rounded-2xl mb-8 shadow-sm flex flex-col md:flex-row items-center gap-10 justify-center" style={{ borderColor: colors.border }}>
                             
                             {/* REPRESENTAÇÃO SVG DO CÍRCULO CROMÁTICO/ESTRELA */}
                             <div className="relative w-64 h-64 shrink-0">
                                {/* Linhas de conexão (Neutralização) */}
                                <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100">
                                   <line x1="50" y1="10" x2="50" y2="90" stroke="#EAE5D9" strokeWidth="2" strokeDasharray="4" /> {/* Amarelo -> Violeta */}
                                   <line x1="15" y1="30" x2="85" y2="70" stroke="#EAE5D9" strokeWidth="2" strokeDasharray="4" /> {/* Verde -> Vermelho */}
                                   <line x1="85" y1="30" x2="15" y2="70" stroke="#EAE5D9" strokeWidth="2" strokeDasharray="4" /> {/* Laranja -> Azul */}
                                </svg>

                                {/* Pontas da Estrela */}
                                {/* Topo: Amarelo */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                                   <div className="w-12 h-12 rounded-full bg-[#FFD700] shadow-md border-2 border-white"></div>
                                   <span className="text-[9px] font-bold uppercase mt-1">Amarelo</span>
                                </div>
                                {/* Topo Direita: Laranja */}
                                <div className="absolute top-[20%] right-2 flex flex-col items-center z-10">
                                   <div className="w-12 h-12 rounded-full bg-[#FF8C00] shadow-md border-2 border-white"></div>
                                   <span className="text-[9px] font-bold uppercase mt-1">Laranja</span>
                                </div>
                                {/* Baixo Direita: Vermelho */}
                                <div className="absolute bottom-[20%] right-2 flex flex-col items-center z-10">
                                   <div className="w-12 h-12 rounded-full bg-[#FF0000] shadow-md border-2 border-white"></div>
                                   <span className="text-[9px] font-bold uppercase mt-1">Vermelho</span>
                                </div>
                                {/* Base: Violeta */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                                   <div className="w-12 h-12 rounded-full bg-[#8A2BE2] shadow-md border-2 border-white"></div>
                                   <span className="text-[9px] font-bold uppercase mt-1">Violeta</span>
                                </div>
                                {/* Baixo Esquerda: Azul */}
                                <div className="absolute bottom-[20%] left-2 flex flex-col items-center z-10">
                                   <div className="w-12 h-12 rounded-full bg-[#0000FF] shadow-md border-2 border-white"></div>
                                   <span className="text-[9px] font-bold uppercase mt-1">Azul</span>
                                </div>
                                {/* Topo Esquerda: Verde */}
                                <div className="absolute top-[20%] left-2 flex flex-col items-center z-10">
                                   <div className="w-12 h-12 rounded-full bg-[#008000] shadow-md border-2 border-white"></div>
                                   <span className="text-[9px] font-bold uppercase mt-1">Verde</span>
                                </div>

                                {/* Centro */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#757575] border-4 border-white flex items-center justify-center shadow-inner z-10">
                                   <span className="text-[8px] text-white font-bold">NEUTRO</span>
                                </div>
                             </div>

                             {/* EXPLICAÇÃO TÉCNICA VISUAL */}
                             <div className="flex-1 space-y-4 w-full">
                               <div className="p-3 bg-white border rounded-xl shadow-sm flex items-center gap-3" style={{ borderColor: colors.border }}>
                                  <div className="w-3 h-8 rounded-full bg-gradient-to-b from-[#FF8C00] to-[#0000FF]"></div>
                                  <div>
                                     <p className="text-xs font-bold text-gray-800">Laranja <span className="text-gray-400 font-normal">é anulado por</span> Azul</p>
                                     <p className="text-[10px] text-gray-500">Reflexos .1 ou .8 (Cinza/Mate)</p>
                                  </div>
                               </div>
                               <div className="p-3 bg-white border rounded-xl shadow-sm flex items-center gap-3" style={{ borderColor: colors.border }}>
                                  <div className="w-3 h-8 rounded-full bg-gradient-to-b from-[#FFD700] to-[#8A2BE2]"></div>
                                  <div>
                                     <p className="text-xs font-bold text-gray-800">Amarelo <span className="text-gray-400 font-normal">é anulado por</span> Violeta</p>
                                     <p className="text-[10px] text-gray-500">Reflexos .2 (Irisado/Perolado)</p>
                                  </div>
                               </div>
                               <div className="p-3 bg-white border rounded-xl shadow-sm flex items-center gap-3" style={{ borderColor: colors.border }}>
                                  <div className="w-3 h-8 rounded-full bg-gradient-to-b from-[#FF0000] to-[#008000]"></div>
                                  <div>
                                     <p className="text-xs font-bold text-gray-800">Vermelho <span className="text-gray-400 font-normal">é anulado por</span> Verde</p>
                                     <p className="text-[10px] text-gray-500">Reflexos .7 (Mate Escuro)</p>
                                  </div>
                               </div>
                             </div>
                          </div>

                          <div className="p-5 rounded-xl border relative overflow-hidden" style={{ borderColor: colors.gold, backgroundColor: colors.goldLight }}>
                            <div className="flex gap-3">
                              <SparklesIcon size={24} color={colors.gold} className="shrink-0 mt-1" />
                              <div>
                                <h4 className="font-serif text-lg text-[#2B2B2B] mb-2">Atenção ao Pulo do Gato</h4>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  Muitos profissionais erram ao tentar platinar um fundo que ainda está laranja, jogando cinza (azul) em cima. O resultado? O cabelo fecha o tom e escurece, ou pior, chumba. <strong>Regra de ouro:</strong> Só use violeta quando o fundo estiver 100% amarelo. Se tiver resquício de laranja, o azul tem que entrar na matemática.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              )}

              {/* FICHA DE ANAMNESE DIGITAL */}
              {activeTab === 'anamnese' && (
                <div className="w-full max-w-2xl mx-auto">
                  <h3 className="font-serif text-2xl mb-2">Ficha de Anamnese</h3>
                  <p className="text-sm mb-6" style={{ color: colors.textMuted }}>Avalie o cabelo da sua cliente antes do lavatório. Sem sustos.</p>
                  
                  <div className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col gap-5" style={{ borderColor: colors.border }}>
                    
                    {/* Dados Básicos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4" style={{ borderColor: colors.border }}>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Nome da Cliente</label>
                        <input type="text" className="w-full p-2.5 text-sm border rounded-lg bg-gray-50 outline-none focus:border-[#C69C6D]" placeholder="Digite o nome..." />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Data da Avaliação</label>
                        <input type="date" className="w-full p-2.5 text-sm border rounded-lg bg-gray-50 outline-none focus:border-[#C69C6D]" />
                      </div>
                    </div>

                    {/* Teste Físico do Fio */}
                    <div className="border-b pb-4" style={{ borderColor: colors.border }}>
                      <h4 className="font-serif text-lg mb-3">Teste Estrutural</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Elasticidade (Fio Molhado)</label>
                          <select className="w-full p-2.5 text-sm border rounded-lg bg-gray-50 outline-none">
                            <option>Normal (Vai e volta)</option>
                            <option>Rígido (Falta água/lipídios)</option>
                            <option>Emborrachado (Falta proteína)</option>
                            <option>Quebrando (Alerta Vermelho)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Porosidade</label>
                          <select className="w-full p-2.5 text-sm border rounded-lg bg-gray-50 outline-none">
                            <option>Média (Saudável)</option>
                            <option>Alta (Sugando muito produto)</option>
                            <option>Baixa (Cutículas seladas/difícil)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Diagnóstico de Cor */}
                    <div>
                      <h4 className="font-serif text-lg mb-3">Diagnóstico de Cor</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Fundo Atual</label>
                          <select className="w-full p-2.5 text-sm border rounded-lg bg-gray-50 outline-none">
                            <option>6 - Laranja Vermelho</option>
                            <option>7 - Laranja</option>
                            <option>8 - Amarelo Laranja</option>
                            <option>9 - Amarelo Claro</option>
                            <option>Manchado / Com Barras</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Cor Desejada (Objetivo)</label>
                          <input type="text" className="w-full p-2.5 text-sm border rounded-lg bg-gray-50 outline-none focus:border-[#C69C6D]" placeholder="Ex: Loiro Pérola 9.89" />
                        </div>
                      </div>
                      
                      <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2 mt-2">
                         <input type="checkbox" className="mt-1 shrink-0" />
                         <span className="text-xs text-red-800">Atenção: Cliente possui histórico de incompatibilidade química (Hennê, Relaxamento ou Progressiva). Exigir Teste de Mecha rigoroso.</span>
                      </div>
                    </div>

                    <button className="mt-2 w-full py-3.5 rounded-lg text-sm font-bold shadow-md transition-transform hover:-translate-y-1" style={{ backgroundColor: colors.gold, color: '#FFF' }}>Salvar Diagnóstico na Ficha</button>
                  </div>
                </div>
              )}

              {/* LEITOR QR CODE PARA APOSTILA IMPRESSA */}
              {activeTab === 'qr' && (
                <div className="w-full max-w-md mx-auto text-center pt-8">
                  <h3 className="font-serif text-2xl mb-2">Leitor da Apostila</h3>
                  <p className="text-sm mb-8" style={{ color: colors.textMuted }}>Aponte a câmera para os QR Codes impressos na sua apostila física para destravar as aulas práticas da Lala.</p>
                  <div className="w-full aspect-square border-4 border-dashed rounded-3xl flex flex-col items-center justify-center relative overflow-hidden bg-gray-100" style={{ borderColor: colors.gold }}>
                    <div className="absolute inset-0 bg-black/5 z-0"></div>
                    <ScanIcon size={64} color={colors.gold} className="mb-4 z-10" />
                    <p className="text-sm font-bold z-10 text-gray-700">Câmera Ativada</p>
                    <div className="absolute top-8 left-8 w-8 h-8 border-t-4 border-l-4 border-[#C69C6D]"></div>
                    <div className="absolute top-8 right-8 w-8 h-8 border-t-4 border-r-4 border-[#C69C6D]"></div>
                    <div className="absolute bottom-8 left-8 w-8 h-8 border-b-4 border-l-4 border-[#C69C6D]"></div>
                    <div className="absolute bottom-8 right-8 w-8 h-8 border-b-4 border-r-4 border-[#C69C6D]"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          
          /* ========================================================
             PAINEL DA LALA (BACKSTAGE / GESTÃO PIX)
          ======================================================== */
          <div className="flex-1 p-6 md:p-10 flex flex-col gap-6" style={{ backgroundColor: colors.bgBase }}>
            
            <div className="pb-6 border-b" style={{ borderColor: colors.border }}>
              <h2 className="text-2xl font-serif text-[#2B2B2B]">Meu Negócio</h2>
              <p className="text-sm mt-1" style={{ color: colors.textMuted }}>Gestão de Vendas (Estratégia PIX Direto)</p>
            </div>

            {/* Vitrine e Link */}
            <div className="p-4 bg-white rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm" style={{ borderColor: colors.border }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.goldLight }}>
                  <LinkIcon size={20} color={colors.gold} />
                </div>
                <div>
                  <p className="text-sm font-bold">Link da Vitrine (Colocar na Bio do Insta)</p>
                  <p className="text-xs text-blue-600 underline cursor-pointer">cursos.alaideproenca.com.br</p>
                </div>
              </div>
              <button className="px-4 py-2 border rounded text-xs font-bold transition-colors" style={{ borderColor: colors.border, backgroundColor: colors.bgBase }}>
                Copiar Link
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Gerador de PIX/Chave */}
              <div className="p-6 rounded-2xl text-white shadow-xl relative overflow-hidden flex flex-col justify-between" style={{ backgroundColor: '#2B2B2B' }}>
                <div className="absolute -right-4 -top-4 opacity-10">
                  <QrCodeIcon size={120} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Recebeu um PIX?</p>
                  <h3 className="text-xl font-serif mb-4">Libere o acesso da sua aluna na hora.</h3>
                </div>
                <button className="w-full py-4 rounded-lg font-bold text-sm shadow-lg flex justify-center items-center gap-2 hover:scale-[1.02] transition-transform" style={{ backgroundColor: colors.gold, color: '#FFF' }}>
                  <KeyIcon size={18} /> Gerar Chave de Acesso Única
                </button>
              </div>

              {/* Métricas Simplificadas */}
              <div className="p-6 rounded-2xl bg-white border shadow-sm flex flex-col justify-center" style={{ borderColor: colors.border }}>
                <div className="flex items-center gap-3 mb-2">
                  <UsersIcon size={20} color={colors.textMuted} />
                  <p className="text-xs uppercase tracking-widest font-bold" style={{ color: colors.textMuted }}>Alunas Ativas na Plataforma</p>
                </div>
                <p className="text-4xl font-serif text-[#2B2B2B]">124</p>
                <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.border }}>
                  <p className="text-xs font-bold flex items-center gap-1" style={{ color: '#4CAF50' }}>
                    <TrendingUpIcon size={14} /> +12 novos acessos essa semana
                  </p>
                </div>
              </div>
            </div>

            {/* Histórico de Liberações */}
            <div className="mt-2 bg-white border rounded-xl p-6 shadow-sm" style={{ borderColor: colors.border }}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Últimas Chaves Liberadas</h3>
              <div className="space-y-3">
                {['Maria Fernanda', 'Joana Prado', 'Camila Silva'].map((nome, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b last:border-0 border-gray-100">
                    <div>
                      <p className="text-sm font-bold text-[#2B2B2B]">{nome}</p>
                      <p className="text-xs text-gray-400">Hoje, 14:{30 + idx}</p>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-green-100 text-green-700">Ativa</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #EAE5D9; border-radius: 4px; }
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
        }
      `}} />
    </div>
  );
}

// ----------------------------------------------------------------------
// COMPONENTES SECUNDÁRIOS & ÍCONES (Todos verificados e funcionando)
// ----------------------------------------------------------------------

const NavItem = ({ icon, label, active, onClick, colors }) => (
  <button onClick={onClick} className={`flex items-center gap-3 p-3 rounded-lg text-sm w-full text-left transition-all ${active ? 'bg-white shadow-sm font-bold' : 'hover:bg-gray-100/50'}`} style={{ color: active ? colors.gold : colors.textMuted, border: active ? `1px solid ${colors.border}` : '1px solid transparent' }}>
    {icon} {label}
  </button>
);

const BottomTab = ({ icon, label, active, onClick, colors, isMain }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center gap-1 w-16 transition-all ${isMain ? '-mt-6' : ''}`}>
    <div className={`flex items-center justify-center rounded-full ${isMain ? 'w-14 h-14 shadow-lg text-white' : 'w-8 h-8'} ${active && !isMain ? 'bg-[#F4EBE1]' : ''}`} style={{ backgroundColor: isMain ? colors.gold : 'transparent', color: isMain ? '#FFF' : (active ? colors.gold : colors.textMuted) }}>
      {icon}
    </div>
    <span className={`text-[10px] ${active ? 'font-bold' : ''}`} style={{ color: active ? colors.gold : colors.textMuted }}>{label}</span>
  </button>
);

// Ícones SVG Limpos e Nativos
const PlayIcon = ({ size, color = 'currentColor' }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const BookIcon = ({ size, color = 'currentColor' }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>;
const QrCodeIcon = ({ size, color = 'currentColor' }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect></svg>;
const ClipboardIcon = ({ size, color = 'currentColor' }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>;
const PlayCircleIcon = ({ size, color = 'currentColor', className = '' }) => <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>;
const LockIcon = ({ size, color = 'currentColor' }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const CheckCircleIcon = ({ size, color = 'currentColor' }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const DownloadIcon = ({ size, color = 'currentColor' }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;
const ScanIcon = ({ size, color = 'currentColor', className = '' }) => <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const UserIcon = ({ size, color = 'currentColor', className = '' }) => <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const AwardIcon = ({ size, color = 'currentColor', className = '' }) => <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>;
const LinkIcon = ({ size, color = 'currentColor' }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>;
const KeyIcon = ({ size, color = 'currentColor' }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"></path><path d="m21 2-9.6 9.6"></path><circle cx="7.5" cy="15.5" r="5.5"></circle></svg>;
const UsersIcon = ({ size, color = 'currentColor' }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const TrendingUpIcon = ({ size, color = 'currentColor' }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const SparklesIcon = ({ size, color = 'currentColor' }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>;