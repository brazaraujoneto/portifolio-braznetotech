import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

/**
 * Design Philosophy: Modern Tech Portfolio
 * - Dark theme with ruby-red accents for premium tech feel
 * - Smooth scroll reveal animations for engagement
 * - Canvas particle background for visual depth
 * - Responsive grid layouts with asymmetric spacing
 */

export default function Home() {
  const [filterActive, setFilterActive] = useState('all');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle animation
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(224, 17, 95, 0.3)';

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Copy email to clipboard
  const handleCopyEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    const email = 'brazaraujoneto12@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const button = e.currentTarget;
      const originalHTML = button.innerHTML;
      button.innerHTML = '<i class="fa-solid fa-check text-green-500"></i><span class="font-bold">Copiado!</span>';
      setTimeout(() => {
        button.innerHTML = originalHTML;
      }, 2000);
    });
  };

  const projects = [
    {
      id: 1,
      title: 'GLPI – Implantação e Estruturação de Service Desk',
      description: 'Implantação e administração do GLPI em duas empresas distintas, incluindo atualização e manutenção contínua no ambiente atual. Estruturei o sistema desde a instalação até a organização completa dos fluxos de atendimento e inventário de ativos de TI.',
      category: 'infra',
      image: '/img/glpi_proj.png', 
      tags: ['GLPI', 'Linux (Ubuntu/Debian)', 'Apache ', 'MySQL / MariaDB', 'SSH', 'Backup via terminal'],
    },
    {
      id: 2,git@github.com:brazaraujoneto/portifolio-braznetotech.git
      title: 'Portifolio de Projetos Pessoais',
      description: 'API escalável de e-commerce com processamento de pagamentos e controle de estoque real-time.',
      category: 'dev',
      image: '/img/protifoliodev_proj.png',
      tags: ['HTML', 'CSS', 'JavaScript', 'React.JS', 'Tailwind CSS', 'Git', 'Vite'],
    },
      {
      id: 3,
      title: 'Liketreen',
      description: 'API escalável de e-commerce com processamento de pagamentos e controle de estoque real-time.',
      category: 'dev',
      image: '/img/linketreen_proj.png',
      tags: ['HTML', 'CSS', 'JavaScript', 'React.JS', 'Tailwind CSS', 'Git', 'Vite'],
    },
    {
      id: 4,
      title: 'Upload de Arquivos Local para Google Cloud Storage',
      description: 'Este projeto contém um script Python que faz o upload de arquivos de um diretório local para um **Google Cloud Storage Bucket**. O script percorre recursivamente todos os arquivos e subpastas de um diretório local e os envia para o bucket no Google Cloud, preservando a estrutura de pastas.',
      category: 'auto',
      image: '/img/updatefile_proj.png',
      tags: ['Python', 'GCP', 'GCS', 'Google Cloud Storage'],
    },
  ];

  const filteredProjects = filterActive === 'all' 
    ? projects 
    : projects.filter(p => p.category === filterActive);

  return (
    <div className="scroll-smooth min-h-screen bg-custom-black text-white font-sans selection:bg-ruby-red selection:text-white">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
        style={{
          background: 'radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 100%)',
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-custom-black/80 backdrop-blur-md border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter">
            <span className="text-ruby-red">Braz</span> Neto <span className="text-ruby-red">Tech</span>
          </div>
          <ul className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
            <li><a href="#home" className="hover:text-ruby-red transition-colors">Home</a></li>
            <li><a href="#experiencias" className="hover:text-ruby-red transition-colors">Experiências</a></li>
            <li><a href="#projetos" className="hover:text-ruby-red transition-colors">Projetos</a></li>
            <li><a href="#contato" className="hover:text-ruby-red transition-colors">Contato</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-20" id="home">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <h1 className="text-ruby-red font-mono mb-4 text-lg">Olá, eu sou</h1>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                Braz Neto.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ruby-red to-bright-red">
                  Dev Web, Infra Cloud, data analysis.
                </span>
              </h1>
              <p className="text-gray-400 text-lg mb-8 max-w-lg">
                Profissional de T.I desde 2017, com base sólida em Cloud, bancos de dados e automação em Python. Hoje construindo aplicações Web com Vue.js, Tailwind e back-end em Python. Unindo performance, dados e experiência digital de ponta a ponta.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#projetos" className="bg-ruby-red hover:bg-bright-red px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105">
                  Ver Projetos
                </a>
                <a href="#contato" className="border border-white/20 hover:border-ruby-red px-8 py-4 rounded-full font-bold transition-all">
                  Fale Comigo
                </a>
              </div>
            </div>
            <div className="relative reveal flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 border-4 border-ruby-red translate-x-4 translate-y-4 rounded-xl -z-10"></div>
                <img
                  alt="Braz Neto"
                  className="w-full h-full object-cover rounded-xl shadow-2xl"
                  src="./public/img/braz.jpeg"
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 animate-bounce text-ruby-red">
            <i className="fa-solid fa-chevron-down text-2xl"></i>
          </div>
        </section>

        {/* Experiências Section */}
        <section className="py-24 bg-light-grey/30" id="experiencias">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center reveal">
              Trajetória <span className="text-ruby-red">Profissional</span>
            </h2>
            <div className="relative border-l-2 border-ruby-red/30 ml-4 md:ml-0 md:flex md:border-l-0 md:border-t-2 md:pt-8 md:space-x-8">
              {[
                { period: '03/2025 - Presente', title: 'Analista de Suporte e Sustentação', company: 'Innyx Tecnologia - Manutenção de ambientes cloud (AWS e GCP). Criação de automações Python para backup e APIs. Desenvolvimento de dashboards Looker e consultas SQL para monitorar chamados e desempenho. Implementação completa do GLPI com fluxos personalizados. Projeto de FinOps Dashboard para controle de custos cloud. Administração de acessos (GitLab, Jira, Google Workspace, AD DS).' },
                { period: '02/2022 - 02/2025', title: 'Analista de Desenvolvimento de Sistemas', company: 'Marjom (Fabrica de Colchões) - Desenvolvimento de BI’s e relatórios SQL. Criação de rotinas de backup e automações para o ERP. Implementação e gestão de GLPI corporativo. Administração da infraestrutura física e lógica de rede.' },
                { period: '02/2021 - 05/2021', title: 'Assistente de TI', company: 'Fennix Brasil Distribuidora - - Suporte ao usuario em Matriz e Filial - Instalação e suporte ao usuario no sistema WINTHOR ToTvs. - Rotina de verificação de servidores e DVRs. - Infra com cabo de rede, cripagem, teste de cabo e localização. - Verificação e suporte ao e-mail. (Brasil Web host) - Controle de tonners e manutenção de impressoras. - Contrele de lincenças de Windows e Microsoft Office.' },
                { period: '01/2017 - 2020', title: 'Tecnico de TI', company: 'Casa Das Correias - Administração em contas de E-mail. - Gerenciamento de ramais e VOIP, sistema 3CX. - Gerenciamento de contas no AD. - Gerenciamento servidor Antivirus (KASPERSKY). - Gerenciamento de GPO. - Configuração e instalação de impressoras. - Instalação e Manutenção em Impressoras Zebra. - Atendimento via Help Desk e Telefônico. - Acesso Remoto VNC Viewer, Team Viewer e Anydesk. - Instalação e Suporte nos sistemas operacionais. - Infraestrutura física de redes. - Administração e Gerenciamento de redes: TCP/IP, Redes LAN, WAN e VPN. - Servidores Windows e Linux, serviços: AD, DNS, DHCP, WSUS. - Configuração de Firewalls. - Manutenção em: Computadores, Notebooks, tablets, Terminais de Consulta. - Suporte Técnico aos usuários em hardware e software. - Formatação e instalação de drivers.' },
              ].map((exp, idx) => (
                <div key={idx} className="mb-12 md:mb-0 relative md:w-1/4 reveal">
                  <div className={`absolute -left-[9px] md:left-0 md:-top-[41px] w-4 h-4 bg-ruby-red rounded-full ${idx === 0 ? 'shadow-[0_0_15px_rgba(224,17,95,0.8)]' : ''}`}></div>
                  <span className="text-ruby-red font-mono text-sm block mb-2">{exp.period}</span>
                  <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                  <p className="text-gray-400 text-sm">{exp.company}</p>
                </div>
              ))}
            </div>

            {/* Tech Stack Scroll */}
            <div className="mt-24 overflow-hidden relative">
              <style>{`
                @keyframes scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .tech-track {
                  animation: scroll 40s linear infinite;
                }
                .tech-track:hover {
                  animation-play-state: paused;
                }
              `}</style>
              <div className="tech-track flex items-center space-x-12">
                {[
                  { icon: 'fa-brands fa-react', name: 'React.JS', color: 'text-blue-400' },
                  { icon: 'fa-brands fa-node-js', name: 'Node.JS', color: 'text-green-500' },
                  { icon: 'fa-brands fa-aws', name: 'AWS', color: 'text-orange-400' },
                  { icon: 'fa-brands fa-python', name: 'Python', color: 'text-blue-500' },
                  { icon: 'fa-brands fa-docker', name: 'Docker', color: 'text-blue-600' },
                  { icon: 'fa-brands fa-js', name: 'JavaScript', color: 'text-yellow-400' },
                  { icon: 'fa-brands fa-git-alt', name: 'Git', color: 'text-orange-600' },
                  { icon: 'fa-solid fa-database', name: 'PostgreSQL', color: 'text-gray-300' },
                  { icon: 'fa-brands fa-react', name: 'React.JS', color: 'text-blue-400' },
                  { icon: 'fa-brands fa-node-js', name: 'Node.JS', color: 'text-green-500' },
                  { icon: 'fa-brands fa-aws', name: 'AWS', color: 'text-orange-400' },
                  { icon: 'fa-brands fa-python', name: 'Python', color: 'text-blue-500' },
                ].map((tech, idx) => (
                  <div key={idx} className="flex-shrink-0 flex items-center gap-2 grayscale hover:grayscale-0 transition-all cursor-default">
                    <i className={`${tech.icon} text-4xl ${tech.color}`}></i>
                    <span className="font-bold">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projetos Section */}
        <section className="py-24 px-6" id="projetos">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Meus <span className="text-ruby-red">Projetos</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {['all', 'infra', 'dev', 'auto'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setFilterActive(filter)}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                      filterActive === filter
                        ? 'bg-ruby-red text-white'
                        : 'border border-white/20 hover:border-ruby-red'
                    }`}
                  >
                    {filter === 'all' ? 'Todos' : filter === 'infra' ? 'Infraestrutura' : filter === 'dev' ? 'Desenvolvimento' : 'Automações'}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-light-grey rounded-2xl overflow-hidden reveal group">
                  <div className="relative overflow-hidden h-48">
                    <img
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      src={project.image}
                    />
                    <div className="absolute inset-0 bg-ruby-red/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] bg-dark-grey px-2 py-1 rounded text-ruby-red font-bold uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contato Section */}
        <section className="py-24 px-6 bg-light-grey/20" id="contato">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center reveal">
              Vamos <span className="text-ruby-red">Conversar?</span>
            </h2>
            <div className="bg-light-grey p-8 rounded-3xl shadow-2xl reveal">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Nome</label>
                    <input
                      type="text"
                      placeholder="Seu nome completo"
                      className="w-full bg-dark-grey border border-white/10 rounded-xl focus:ring-2 focus:ring-ruby-red focus:border-ruby-red text-white px-4 py-3 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">N° Contato</label>
                    <input
                      type="tel"
                      placeholder="(00) 00000-0000"
                      className="w-full bg-dark-grey border border-white/10 rounded-xl focus:ring-2 focus:ring-ruby-red focus:border-ruby-red text-white px-4 py-3 outline-none transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">E-mail</label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full bg-dark-grey border border-white/10 rounded-xl focus:ring-2 focus:ring-ruby-red focus:border-ruby-red text-white px-4 py-3 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Mensagem</label>
                  <textarea
                    placeholder="Como posso te ajudar?"
                    rows={4}
                    className="w-full bg-dark-grey border border-white/10 rounded-xl focus:ring-2 focus:ring-ruby-red focus:border-ruby-red text-white px-4 py-3 outline-none transition"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-ruby-red hover:bg-bright-red text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-ruby-red/20"
                >
                  Enviar Mensagem
                </button>
              </form>
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
                <a
                  href="https://wa.me/5592933008304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full transition-all animate-pulse"
                >
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                  <span className="font-bold">WhatsApp Direto</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-3 bg-dark-grey hover:bg-ruby-red/20 border border-white/10 px-6 py-3 rounded-full transition-all group"
                >
                  <i className="fa-solid fa-copy text-ruby-red group-hover:text-white"></i>
                  <span className="font-bold">brazaraujoneto12@gmail.com</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5592933008304"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[60] bg-green-500 w-14 h-14 flex items-center justify-center rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95"
      >
        <i className="fa-brands fa-whatsapp text-3xl text-white"></i>
      </a>

      {/* Footer */}
      <footer className="bg-custom-black py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-3xl font-bold mb-8">
            <span className="text-ruby-red">Braz</span> Neto <span className="text-ruby-red">Tech</span>
          </div>
          <div className="flex space-x-6 mb-12">
            {[
              { name: 'github', url: 'https://github.com/seu-usuario' },
              { name: 'linkedin-in', url: 'https://www.linkedin.com/in/braz-neto-78318a201/' },
              { name: 'instagram', url: 'https://www.instagram.com/brazneto.tech?igsh=MWx3b2l3NDY2MzZvcQ==' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-light-grey hover:bg-ruby-red transition-all transform hover:-translate-y-2"
              >
                <i className={`fa-brands fa-${social.name} text-xl`}></i>
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            © 2023 Braz Neto Tech. Todos os direitos reservados.
          </p>

          <p className="text-gray-500 text-sm">
             Feito com ❤️ por mim usando React e Tailwind CSS.
          </p>
        </div>
      </footer>

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        ::-webkit-scrollbar-thumb {
          background: #E0115F;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
