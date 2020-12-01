export const ImageService = {
  async loadImage(url) {
    return new Promise((resolve, reject) => {
      const imageElement = new Image();
      imageElement.onload = () => {
        resolve(url); // se der certo retorna a url
      };
      imageElement.onerror = () => {
        reject(url); // se der ERRO retorna a url tbm
      };
      imageElement.src = url; // ela carrega a img e passa no src
    });
  },
  async loadImageAll(urlList) {
    // urllist é a lista de imagens que vao ser retornadas
    return Promise.all(urlList.map(ImageService.loadImage)); // retorna todas pra nao fica chamando uma por uma
  },
};
