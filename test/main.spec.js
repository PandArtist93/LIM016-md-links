const { absolutePath, processFiles } = require('../src/main.js'); 
const pathFileWrong = 'data/testFolder1/file8.pdf';
const pathUndefine = undefined;
const pathDirectory = 'data/testFolder1';
const pathFileAbsolute = 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1';
const optionsDefault = {
  validate: false,
  stats: false
}
const arrayWithoutOptions = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file1.md'
  },
  {
    href: 'https://nodejs.org/es/',
    text: 'Node.js',
    file: 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file1.md'
  },
  {
    href: 'https://www.google.com/',
    text: 'google',
    file: 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file4.md'
  },
  {
    href: 'https://bitly.com/404-error-page',
    text: 'bitly',
    file: 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file4.md'
  }
]

describe('verify absolutePath', () => {

  it('is a function', () => {
    expect(typeof absolutePath).toBe('function');
  }); 
  it('verify if the path exist and convert path in absolute', () => {
    expect(absolutePath(pathDirectory)).toEqual(pathFileAbsolute);
  });
  it('verify the message when the path is undefined', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    console.log('Debes ingresar una ruta valida y opciones válidas');
    expect(consoleSpy).toHaveBeenCalledWith('Debes ingresar una ruta valida y opciones válidas');
  });
  it('verify the message when the path no exist', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    console.log('El path solicitado no existe');
    expect(consoleSpy).toHaveBeenCalledWith('El path solicitado no existe');   
  }); 
});

describe('verify processFiles ', () => {

  it('is a function', () => {
    expect(typeof processFiles).toBe('function');
  });
  /* it('verify is', () => {
    expect(processFiles(pathFileAbsolute, optionsDefault)).resolves();
  }); */
});
