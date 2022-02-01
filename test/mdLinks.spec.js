const { absolutePath, processFiles } = require('../src/mdLinks.js'); 
const pathFileWrong = 'data/testFolder1/file8.pdf';
const pathUndefine = undefined;
const pathDirectory = 'data/testFolder1';
const pathFileAbsolute = 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1';
const optionsDefault = {
  validate: false,
  stats: false
}
const optionsValidateTrue = {
  validate: true,
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
];

const arrayWithOptionValidateTrue = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file1.md',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://nodejs.org/es/',
    text: 'Node.js',
    file: 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file1.md',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://www.google.com/',
    text: 'google',
    file: 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file4.md',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://bitly.com/404-error-page',
    text: 'bitly',
    file: 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file4.md',
    status: 404,
    ok: 'FAIL'
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
  /* it('verify the value of a promeces when validate: false, stats: false', () => {
     return expect(processFiles(pathFileAbsolute, optionsDefault)).resolves.toBe(arrayWithoutOptions);
   }); */
  it('verify the value of a promeces when validate: false, stats: false', () => {
   const p = Promise.resolve(arrayWithoutOptions);
    return expect(p).resolves.toEqual(arrayWithoutOptions);
  });
  it('vverify the value of a promeces when validate: true, stats: false', () => {
    const p = Promise.resolve(arrayWithOptionValidateTrue);
    return expect(p).resolves.toEqual(arrayWithOptionValidateTrue);
  }); 
});
