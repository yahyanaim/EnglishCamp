require('./register.cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { ALL_ARTICLES, LEVELS } = require('../src/data/articles/index.ts');
const { WIKIPEDIA_ARTICLES, WIKIPEDIA_LICENSE, wikipediaRevisionUrl } = require('../src/data/articles/simple-wikipedia.ts');
const { isFixedSpeech } = require('../src/lib/microsoftSpeechServer.ts');
const { readingWordDetails } = require('../src/lib/vocabularyLookup.ts');

test('Wikipedia readings cover each level with short, attributable passages and contextual Arabic vocabulary', () => {
  const all = [...ALL_ARTICLES, ...WIKIPEDIA_ARTICLES];
  assert.equal(new Set(all.map(article => article.id)).size, all.length);
  assert.equal(WIKIPEDIA_LICENSE, 'https://creativecommons.org/licenses/by-sa/4.0/');
  for (const level of LEVELS) {
    assert.equal(WIKIPEDIA_ARTICLES.filter(article => article.level === level).length, 2, level);
  }
  for (const article of WIKIPEDIA_ARTICLES) {
    assert.equal(article.paragraphs.length, 1, article.id + ' has a single short audio passage');
    const [{ en, ar }] = article.paragraphs;
    const count = en.trim().split(/\s+/).length;
    assert.ok(count >= 45 && count <= 100, article.id);
    assert.match(ar, /[\u0600-\u06ff]/);
    const url = new URL(wikipediaRevisionUrl(article.source));
    assert.equal(url.origin, 'https://simple.wikipedia.org');
    assert.equal(url.searchParams.get('title').replaceAll('_', ' '), article.source.title);
    assert.match(url.searchParams.get('oldid'), /^[1-9]\d+$/);
    assert.ok(isFixedSpeech(en), article.id + ' can use the existing public-text audio flow');
    assert.equal(article.vocabulary.length, 3);
    for (const { word, ar, def } of article.vocabulary) {
      const details = readingWordDetails(word, article, 0);
      assert.match(details.example, new RegExp('\\b' + word + '\\b', 'i'));
      assert.match(ar, /[\u0600-\u06ff]/);
      assert.equal(details.meaning, ar);
      assert.equal(details.definition, def);
      assert.equal(details.translationKind, 'word');
    }
  }
});
