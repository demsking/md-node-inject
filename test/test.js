/* global describe it expect */

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import inject from '../index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function loadJson(filename) {
  const packageFilename = resolve(__dirname, filename);

  return JSON.parse(await readFile(packageFilename));
}

describe('transform', () => {
  const newHeaderNode = {
    type: 'Header',
    depth: 3,
    children: [
      {
        type: 'Str',
        value: 'NEW_HEADER',
        raw: 'NEW_HEADER',
      },
    ],
    raw: '### NEW_HEADER ',
  };

  const newParagraphNode = {
    type: 'Str',
    value: 'NEW_PARAGRAPTH',
    raw: 'NEW_PARAGRAPTH',
  };

  it('should failed to inject with a not found section', () => {
    const section = 'API';
    const target = { children: [] };
    const source = { children: [{
      type: 'Header', value: 'Hello H1', children: [] }] };

    expect(() => inject(section, target, source)).toThrow(/not found/);
  });

  it('should successfully inject an empty source at last', async() => {
    const section = 'methods';
    const target = await loadJson('./tree.empty.source.last.json');
    const source = { children: [] };
    const expected = await loadJson('./tree.empty.source.last.expected.json');
    const doc = inject(section, target, source);

    expect(doc).toEqual(expected);
  });

  it('should successfully inject a source at last', async() => {
    const section = 'methods';
    const target = await loadJson('./tree.empty.source.last.json');
    const source = { children: [newHeaderNode, newParagraphNode] };
    const expected = await loadJson('./tree.source.last.expected.json');
    const doc = inject(section, target, source);

    expect(doc).toEqual(expected);
  });

  it('should successfully inject with an empty source from middle', async() => {
    const section = 'methods';
    const target = await loadJson('./tree.empty.source.middle.json');
    const source = { children: [] };
    const expected = await loadJson('./tree.empty.source.middle.expected.json');
    const doc = inject(section, target, source);

    expect(doc).toEqual(expected);
  });

  it('should successfully inject with a source from middle', async() => {
    const section = 'methods';
    const target = await loadJson('./tree.source.middle.json');
    const source = { children: [newHeaderNode, newParagraphNode] };
    const expected = await loadJson('./tree.source.middle.expected.json');
    const doc = inject(section, target, source);

    expect(doc).toEqual(expected);
  });

  it('should successfully inject with an existing section', async() => {
    const section = 'methods';
    const target = await loadJson('./tree.multiple.section.json');
    const source = { children: [newHeaderNode, newParagraphNode] };
    const expected = await loadJson('./tree.multiple.section.expected.json');
    const doc = inject(section, target, source);

    expect(doc).toEqual(expected);
  });
});
