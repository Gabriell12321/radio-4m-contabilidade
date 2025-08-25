#!/usr/bin/env python3
"""
Servidor local para Rádio Alo Voce
Permite acesso à rádio na rede local
"""

import http.server
import socketserver
import webbrowser
import socket
import os

def get_local_ip():
    """Obtém o IP local da máquina"""
    try:
        # Cria um socket temporário para obter o IP local
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

def main():
    # Define a porta do servidor
    PORT = 8000
    
    # Obtém o diretório atual
    web_dir = os.path.join(os.path.dirname(__file__))
    os.chdir(web_dir)
    
    # Cria o servidor
    Handler = http.server.SimpleHTTPRequestHandler
    httpd = socketserver.TCPServer(("", PORT), Handler)
    
    # Obtém o IP local
    local_ip = get_local_ip()
    
    print("=" * 50)
    print("🎵 SERVIDOR DE RÁDIO ALO VOCE 🎵")
    print("=" * 50)
    print(f"📍 Servidor rodando em: http://localhost:{PORT}")
    print(f"🌐 Acesso na rede: http://{local_ip}:{PORT}")
    print(f"📁 Diretório: {web_dir}")
    print("=" * 50)
    print("💡 Para acessar na rede, outros dispositivos devem usar:")
    print(f"   http://{local_ip}:{PORT}")
    print("=" * 50)
    print("📥 Arquivos disponíveis:")
    print("   - pages/radio.html (Rádio principal)")
    print("   - pages/admin.html (Painel administrativo)")
    print("   - pages/empresas.html (Portal de empresas)")
    print("   - pages/login.html (Área de login)")
    print("=" * 50)
    print("🛑 Pressione CTRL+C para parar o servidor")
    print("=" * 50)
    
    try:
        # Inicia o servidor
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor encerrado pelo usuário")
        httpd.shutdown()

if __name__ == "__main__":
    main()