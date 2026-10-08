/* =====================================================================
   TRIAUTO — ARQUIVO DE CONTEÚDO DO SITE
   ---------------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa mexer no dia a dia.
   Aqui ficam: telefone, endereço, serviços, fotos, vídeos e antes/depois.

   REGRAS DE OURO (leia antes de editar):
   1. Só troque o que está ENTRE ASPAS "assim".
   2. Nunca apague as vírgulas , no final das linhas.
   3. Cada item de lista fica entre chaves { } e termina com vírgula.
   4. Nomes de arquivo: sem espaço, sem acento, tudo minúsculo.
      Certo:  "assets/fotos/porta-civic.jpg"
      Errado: "assets/fotos/Porta do Civic.JPG"
   ===================================================================== */

window.TRIAUTO = {

  /* ---------------- DADOS DA EMPRESA ---------------- */
  empresa: {
    nome: "Triauto Soluções Automotivas",

    // WhatsApp: só números, com 55 (Brasil) + DDD + número
    whatsappNumero: "5537988389470",
    whatsappTexto: "(37) 98838-9470",
    whatsappMensagem: "Olá, Triauto! Vim pelo site e gostaria de um orçamento.",

    instagramUsuario: "@triauto_s_automotivas",
    instagramLink: "https://www.instagram.com/triauto_s_automotivas/",

    endereco: "R. das Nações, 27 - Bom Pastor",
    cidade: "Divinópolis - MG",
    cep: "35500-146",

    // Horário de funcionamento. Se deixar vazio "", a linha some do site.
    horario: ""
  },

  /* ---------------- SERVIÇOS ----------------
     Para tirar um serviço: apague o bloco { ... }, inclusive a vírgula.
     Para acrescentar: copie um bloco inteiro e cole embaixo.
     icone: escolha um destes nomes →
       "lanternagem" "pintura" "martelinho" "polimento" "parachoque" "seguro" "chave"
  */
  servicos: [
    {
      icone: "lanternagem",
      titulo: "Lanternagem",
      texto: "Desamassamos e alinhamos portas, capôs, para-lamas e colunas, devolvendo a forma original da lataria."
    },
    {
      icone: "pintura",
      titulo: "Pintura automotiva",
      texto: "Pintura parcial ou completa com acerto de cor, preparação da superfície e acabamento em verniz."
    },
    {
      icone: "martelinho",
      titulo: "Martelinho de ouro",
      texto: "Remoção de amassados pequenos sem precisar repintar, preservando a pintura de fábrica."
    },
    {
      icone: "polimento",
      titulo: "Polimento e espelhamento",
      texto: "Tiramos riscos leves, manchas e opacidade para a pintura voltar a refletir."
    },
    {
      icone: "parachoque",
      titulo: "Reparo de para-choques",
      texto: "Recuperação de trincas, ralados e encaixes quebrados sem trocar a peça inteira."
    },
    {
      icone: "seguro",
      titulo: "Sinistros e seguradoras",
      texto: "Ajudamos com o orçamento e a documentação para o conserto pelo seu seguro."
    }
  ],

  /* ---------------- ANTES E DEPOIS ----------------
     Coloque as duas fotos na pasta assets/fotos/
     As duas fotos precisam ser do MESMO ângulo para o efeito ficar bonito.
  */
  antesDepois: [
    {
      titulo: "Porta dianteira amassada",
      antes: "assets/fotos/antes-01.jpg",
      depois: "assets/fotos/depois-01.jpg"
    },
    {
      titulo: "Para-lama com risco profundo",
      antes: "assets/fotos/antes-02.jpg",
      depois: "assets/fotos/depois-02.jpg"
    }
  ],

  /* ---------------- GALERIA DE FOTOS E VÍDEOS ----------------
     tipo: "foto"  → arquivo .jpg / .png / .webp em assets/fotos/
     tipo: "video" → arquivo .mp4 em assets/videos/
                     capa = imagem que aparece antes do play (pode ser uma foto)
  */
  galeria: [
    { tipo: "foto",  arquivo: "assets/fotos/foto-01.jpg", legenda: "Pintura completa" },
    { tipo: "foto",  arquivo: "assets/fotos/foto-02.jpg", legenda: "Recuperação de lateral" },
    { tipo: "video", arquivo: "assets/videos/video-01.mp4", capa: "assets/fotos/capa-video-01.jpg", legenda: "Polimento em andamento" },
    { tipo: "foto",  arquivo: "assets/fotos/foto-03.jpg", legenda: "Acabamento em verniz" },
    { tipo: "foto",  arquivo: "assets/fotos/foto-04.jpg", legenda: "Para-choque recuperado" },
    { tipo: "foto",  arquivo: "assets/fotos/foto-05.jpg", legenda: "Entrega ao cliente" }
  ],

  /* ---------------- VÍDEO DO TOPO (opcional) ----------------
     Se quiser um vídeo rodando no fundo do topo do site, coloque o
     arquivo em assets/videos/ e escreva o caminho aqui.
     Deixe "" para usar o efeito de pintura com reflexo (padrão).
  */
  videoTopo: ""
};
