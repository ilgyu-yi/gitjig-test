import { readFileSync } from 'node:fs';
const actual = JSON.parse(readFileSync(new URL('./consumer.json', import.meta.url), 'utf8')).value;
const descriptor = JSON.parse(readFileSync('/input/verification-cases.json', 'utf8'));
const cases = descriptor.cases.map(c => ({ id: c.id, inputDigest: c.inputDigest, observed: { kind: actual === Number(c.declaration.input.literalUtf8) ? 'return' : 'rejection', value: String(actual) } }));
console.log(JSON.stringify({ version: 1, cases, assertions: [{ id: 'required-value', passed: actual === 3, actual: String(actual) }] }));
