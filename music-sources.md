# 🎵 Fontes de Música Gratuitas e Legais

## 📀 Arquivos de Áudio de Teste

### **Internet Archive**
```javascript
// Músicas de domínio público e creative commons
"https://archive.org/download/testmp3testfile/mpthreetest.mp3"
"https://archive.org/download/ClassicalMusicMp3/01-Pachelbel-Canon_in_D_Major.mp3"
"https://archive.org/download/ClassicalMusicMp3/02-Bach-Air_on_the_G_String.mp3"
```

### **Freesound.org**
```javascript
// Sons e músicas livres (necessário criar conta)
"https://freesound.org/data/previews/[id]/[id]_[name].mp3"
```

### **Incompetech (Kevin MacLeod)**
```javascript
// Música livre para uso comercial
"https://incompetech.com/music/royalty-free/mp3-royaltyfree/"
```

## 🎧 APIs de Música Recomendadas

### **YouTube API**
```javascript
// Usar YouTube Data API v3
// Requer chave de API do Google Cloud Console
const API_KEY = 'your-youtube-api-key';
const VIDEO_ID = 'video-id';
const url = `https://www.googleapis.com/youtube/v3/videos?id=${VIDEO_ID}&key=${API_KEY}`;
```

### **Spotify Web API**
```javascript
// Requer autenticação OAuth
// Só permite preview de 30 segundos
const CLIENT_ID = 'your-spotify-client-id';
const CLIENT_SECRET = 'your-spotify-client-secret';
```

### **SoundCloud API**
```javascript
// Requer chave de API
const CLIENT_ID = 'your-soundcloud-client-id';
const track_url = `https://api.soundcloud.com/tracks/${track_id}?client_id=${CLIENT_ID}`;
```

## 🎼 Músicas Livres de Direitos Autorais

### **Clássicas**
- Bach - Air on the G String
- Pachelbel - Canon in D Major
- Vivaldi - Four Seasons
- Mozart - Eine kleine Nachtmusik
- Beethoven - Moonlight Sonata

### **Modernas (Creative Commons)**
- Artistas que disponibilizam música livre
- Jamendo.com
- Free Music Archive
- ccMixter

## 🚀 Implementação Recomendada

### **Para Desenvolvimento/Teste**
```javascript
// Use arquivos do Internet Archive
const testSongs = [
    {
        title: "Teste MP3",
        artist: "Audio Test",
        src: "https://archive.org/download/testmp3testfile/mpthreetest.mp3",
        duration: "0:27"
    }
];
```

### **Para Produção**
```javascript
// Use suas próprias músicas ou APIs licenciadas
const prodSongs = [
    {
        title: "Sua Música",
        artist: "Seu Artista",
        src: "./musicas/sua-musica.mp3",
        duration: "3:45"
    }
];
```

## ⚖️ Considerações Legais

### **Uso Pessoal**
- ✅ Arquivos próprios
- ✅ Música de domínio público
- ✅ Creative Commons
- ✅ Música livre de direitos

### **Uso Comercial**
- ❌ Música protegida por direitos autorais
- ✅ Música licenciada
- ✅ Música própria/original
- ✅ Música com licença comercial

### **Streaming Público**
- 📋 Necessário licenças de transmissão
- 📋 Pagamento de direitos autorais
- 📋 Registro na ECAD (Brasil)
- 📋 Compliance com leis locais

## 🛠️ Configuração Rápida

### **Substitua no arquivo radio.html:**
```javascript
// Linha ~712-720 (aproximadamente)
{
    title: "Sua Música",
    artist: "Seu Artista",
    src: "URL_DA_SUA_MUSICA.mp3",
    duration: "3:45"
}
```

### **Adicione mais músicas:**
```javascript
// Copie e cole o formato acima para cada música
// Certifique-se de que a URL é acessível
// Teste cada URL antes de adicionar
```

## 📁 Estrutura de Pastas Recomendada

```
radio-project/
├── radio.html
├── README.md
├── music-sources.md
└── musicas/
    ├── manhã/
    │   ├── musica1.mp3
    │   ├── musica2.mp3
    │   └── musica3.mp3
    ├── tarde/
    │   ├── hit1.mp3
    │   ├── hit2.mp3
    │   └── hit3.mp3
    ├── noite/
    │   ├── romantica1.mp3
    │   ├── romantica2.mp3
    │   └── romantica3.mp3
    ├── rock/
    │   ├── rock1.mp3
    │   ├── rock2.mp3
    │   └── rock3.mp3
    ├── sertanejo/
    │   ├── sertanejo1.mp3
    │   ├── sertanejo2.mp3
    │   └── sertanejo3.mp3
    └── weekend/
        ├── relax1.mp3
        ├── relax2.mp3
        └── relax3.mp3
```

## 🎯 Próximos Passos

1. **Baixe músicas gratuitas** dos links acima
2. **Organize em pastas** por programa
3. **Substitua URLs** no arquivo radio.html
4. **Teste cada música** antes de publicar
5. **Verifique direitos autorais** para uso público

---

**🎵 Agora sua rádio pode tocar músicas reais 24/7! 🎵** 