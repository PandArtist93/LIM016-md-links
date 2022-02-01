const { 
  validateLinkResp, 
  validateAllLinks,
  allLinks, 
  searchBrokenLinks, 
  searchUniqueLinks, 
  linkStats, 
  statsAndValidateLinks 
} = require('../src/options.js');

const {
  readAllFileMd,
} = require('../src/searchFiles.js')

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

const arrayDefault = [
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

const arrayLinks = [
  'https://es.wikipedia.org/wiki/Markdown',
  'https://nodejs.org/es/',
  'https://www.google.com/',
  'https://bitly.com/404-error-page'
];

const arrayEnty = [];

const arrayFilesMd = [
  "C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file1.md",
  "C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file4.md"
]

const arrayLinkStats = [ { allLinks: 4, uniqueLinks: 4 } ];

const arrayLinkStatsAndValidate = [ { allLinks: 4, brokenLinks: 1, uniqueLinks: 4, duplicateLinks: 0 } ];

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
  it('verify the result of method', () => {
    const inputArg = readAllFileMd(arrayFilesMd);
    return expect(linkStats(inputArg)).resolves.toEqual(arrayLinkStats);
  });
  it('verify the result of method', () => {
    return expect(linkStats(inputArg)).resjects.toEqual(err);
  });
});

describe('verify statsAndValidateLinks', () => {

  it('is a function', () => {
    return expect(typeof statsAndValidateLinks).toBe('function');
  });
  it('verify the result of method ', () => {
    const inputArg = readAllFileMd(arrayFilesMd);
    const inputArgs = validateAllLinks(inputArg);
    return expect(statsAndValidateLinks(inputArgs)).resolves.toEqual(arrayLinkStatsAndValidate);
  });
  
});

