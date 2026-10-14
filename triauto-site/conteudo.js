/* =====================================================================
   TRIAUTO — ARQUIVO DE CONTEÚDO DO SITE
   Site desenvolvido por Wiliam Oliveira
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
      titulo: "Tampa traseira da Fiat Strada",
      antes: "assets/fotos/antes-strada.jpg",
      depois: "assets/fotos/depois-strada.jpg"
    }
  ],

  /* ---------------- GALERIA DE FOTOS E VÍDEOS ----------------
     tipo: "foto"  → arquivo .jpg / .png / .webp em assets/fotos/
     tipo: "video" → arquivo .mp4 em assets/videos/
                     capa = imagem que aparece antes do play (pode ser uma foto)
  */
  galeria: [
    { tipo: "video", arquivo: "assets/videos/byd-finalizado.mp4", capa: "assets/fotos/capa-byd-finalizado.jpg", legenda: "BYD finalizado" },
    { tipo: "foto",  arquivo: "assets/fotos/strada-traseira-finalizada.jpg", legenda: "Fiat Strada finalizada" },
    { tipo: "foto",  arquivo: "assets/fotos/lateral-reparo-massa.jpg", legenda: "Reparo de lataria na lateral" },
    { tipo: "video", arquivo: "assets/videos/byd-pintura-processo.mp4", capa: "assets/fotos/capa-byd-pintura-processo.jpg", legenda: "Pintura do BYD, do primer ao acabamento" },
    { tipo: "foto",  arquivo: "assets/fotos/fiat-frente-preparacao.jpg", legenda: "Frente preparada para pintura" },
    { tipo: "foto",  arquivo: "assets/fotos/corolla-frente-finalizado.jpg", legenda: "Toyota Corolla" },
    { tipo: "video", arquivo: "assets/videos/pintura-brilho.mp4", capa: "assets/fotos/capa-pintura-brilho.jpg", legenda: "Pintura com brilho de fábrica" },
    { tipo: "foto",  arquivo: "assets/fotos/onix-preparacao-pintura.jpg", legenda: "Preparação para pintura" },
    { tipo: "foto",  arquivo: "assets/fotos/yaris-traseira-finalizada.jpg", legenda: "Toyota Yaris" },
    { tipo: "video", arquivo: "assets/videos/corolla-finalizado.mp4", capa: "assets/fotos/capa-corolla-finalizado.jpg", legenda: "Corolla pronto para entrega" },
    { tipo: "foto",  arquivo: "assets/fotos/hatch-finalizado.jpg", legenda: "Volkswagen Polo" },
    { tipo: "video", arquivo: "assets/videos/byd-parachoque-pintura.mp4", capa: "assets/fotos/capa-byd-parachoque-pintura.jpg", legenda: "Para-choque dianteiro em pintura" }
  ],

  /* ---------------- VÍDEO DO TOPO (opcional) ----------------
     Se quiser um vídeo rodando no fundo do topo do site, coloque o
     arquivo em assets/videos/ e escreva o caminho aqui.
     Deixe "" para usar o efeito de pintura com reflexo (padrão).
  */
  videoTopo: ""
};
