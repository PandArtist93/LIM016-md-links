const { searchAllFiles, filterMdFiles, readFileMd, readAllFileMd } = require('../src/searchFiles.js');

const pathFile = 'data/testFolder1/file3.pdf';
const pathDirectory = 'data/testFolder1';
const pathDirectoryAbsolute = 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1';
const pathFileMd = 'testFile1.md';
const pathFileWrong = 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFile1.md\\file1.md';
const pathFileAbsolute = 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file1.md';
const pathFileAbsoluteWithoutlinks = 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFile4.md';
const arrayPathFile = [
  "C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file1.md",
  "C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file2.txt",
  "C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file3.pdf",
  "C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file4.md", 
  "C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\folder1\\file5.pdf",
  "C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\folder1\\file6..html",
  "C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\folder1\\folder2\\file7.txt",
  "C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\folder1\\folder2\\file8.txt"
]

const arrayWithoutMdPathFiles = [
  "C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\folder1\\file5.pdf",
  "C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\folder1\\file6..html",
  "C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\folder1\\folder2\\file7.txt",
  "C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\folder1\\folder2\\file8.txt"
]

const arrayFilesMd = [
  "C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file1.md",
  "C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file4.md"
]

const arrayObj = 
[
  [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file1.md'
    },
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file1.md'
    }
  ],
  [
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
]

const arrayObj1 = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file1.md'
  },
  {
    href: 'https://nodejs.org/es/',
    text: 'Node.js',
    file: 'C:\\Users\\maiza\\Desktop\\Laboratoria\\4to_Proyecto\\LIM016-md-links\\data\\testFolder1\\file1.md'
  }
]

describe('verify searchAllFiles', () => {

  it('is a function', () => {
    expect(typeof searchAllFiles).toBe('function');
  });
  it('if the input is a path of a file, returna array to contain the path file ', () => {
    expect(searchAllFiles(pathFile)).toEqual([pathFile]);
  });
  it('is the input is a path of a Directory, return a array to contain all files', () => {
    expect(searchAllFiles(pathDirectory)).toEqual(arrayPathFile);
  });

});

describe('verify filterMdFiles', () => {

  it('is a function', () => {
    expect(typeof filterMdFiles).toBe('function');
  });
  it('if the input is a array of pathfiles, returna array to contain only de files with ext .md', () => {
    expect(filterMdFiles(arrayPathFile)).toEqual(arrayFilesMd);
  });
  it('if the input is a array without .md pathfiles, returna array emty', () => {
    expect(filterMdFiles(arrayWithoutMdPathFiles)).toEqual([]);
  });

});

describe('verify readFileMd', () => {

  it('is a function', () => {
    expect(typeof readFileMd).toBe('function');
  });
  it('if the input is a pathFile with ext .md, return a array with objects', () => {
    return expect(readFileMd(pathFileAbsolute)).resolves.toEqual(arrayObj1);
  });
  it('if the input is a pathFile with ext .md and this is wrong, return the error', () => {
    return expect(readFileMd(pathFileWrong)).rejects.toThrow();
  });
  it('if the input is a pathFile with ext .md without links, return a array emty', () => {
    return expect(readFileMd(pathFileAbsoluteWithoutlinks)).resolves.toBeO;
  });

});

describe('verify if readAllFileMd is a funtions', () => {

  it('is a function', () => {
    expect(typeof readAllFileMd).toBe('function');
  });
  it('recive like input to a array of pathfiles with ext .md, returna array to contain a object for any links in the file', () => {
    return expect(readAllFileMd(arrayFilesMd)).resolves.toEqual(arrayObj);
  });
  it('recive like input a array emty, returna array emty', () => {
    return expect(readAllFileMd([])).resolves.toEqual([]);
  });

});
