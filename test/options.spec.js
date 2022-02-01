const { 
  validateLinkResp, 
  validateAllLinks, 
  linksValidated, 
  allLinks, 
  searchBrokenLinks, 
  searchUniqueLinks, 
  linkStats, 
  statsAndValidateLinks 
} = require('../src/options.js');

const arrayObj = [
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
];

const arrayObjWithoutBrokendLinks = [
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
      href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce',
      text: 'Array.prototype.reduce() - MDN',
      file: 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFile3.md',
      status: 200,
      ok: 'ok'
  }
       
];

const arrayLinks = [
  'https://es.wikipedia.org/wiki/Markdown',
  'https://nodejs.org/es/',
  'https://www.google.com/',
  'https://bitly.com/404-error-page'
];

const arrayEnty = [];
  
describe('verify validateLinkResp', () => {

  it('is a function', () => {
    expect(typeof validateLinkResp).toBe('function');
  });

});

describe('verify validateAllLinks', () => {

  it('is a function', () => {
    expect(typeof validateAllLinks).toBe('function');
  });
  
});

describe('verify linksValidated', () => {

  it('is a function', () => {
    expect(typeof linksValidated).toBe('function');
  });
  /* it('is a function', () => {
    expect(linksValidated()).resolves.toBe('function');
  }); */
});

describe('verify allLinks', () => {

  it('is a function', () => {
    expect(typeof allLinks).toBe('function');
  });
  it('if the input is a array to contain objects with links, return a array with only links', () => {
    expect(allLinks(arrayObj)).toEqual(arrayLinks);
  });    
  it('if the input is a array to contain objects with links, that could return a array emty', () => {
    expect(allLinks(arrayEnty)).toEqual([]);
  });
  
});

describe('verify searchBrokenLinks', () => {

  it('is a function', () => {
    expect(typeof searchBrokenLinks).toBe('function');
  });
  it('if the input is a array to contain objects with links, return a number', () => {
    expect(searchBrokenLinks(arrayObj)).toEqual(1);
  });   
  it('if the input is a array to contain objects with links, that could return a array emty', () => {
    expect(searchBrokenLinks(arrayObjWithoutBrokendLinks)).toEqual(0);
  });
  it('if the input is a array to contain objects with links, that could return a array emty', () => {
    expect(searchBrokenLinks(arrayEnty)).toEqual(0);
  });
  
});

describe('verify searchUniqueLinks', () => {

  it('is a function', () => {
    expect(typeof searchUniqueLinks).toBe('function');
  });
  it('if the input is a array to contain links uniques and brokend, that could return a number', () => {
    expect(searchUniqueLinks(arrayLinks)).toEqual(4);
  }); 
  it('if the input is a array to contain links uniques, that could return a number', () => {
    expect(searchUniqueLinks(arrayObjWithoutBrokendLinks)).toEqual(4);
  });
  it('if the input is a array emty, that could return 0', () => {
    expect(searchUniqueLinks(arrayEnty)).toEqual(0);
  });  
  
});

describe('verify linkStats', () => {

  it('is a function', () => {
    expect(typeof linkStats).toBe('function');
  });
  
});

describe('verify statsAndValidateLinks', () => {

  it('is a function', () => {
    expect(typeof statsAndValidateLinks).toBe('function');
  });
  
});

