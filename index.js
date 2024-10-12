function translate(text) {
  return text
    .replaceAll('aa', 'å')
    .replaceAll('oe', 'ø')
    .replaceAll('ae', 'æ')
    .replaceAll('Aa', 'Å')
    .replaceAll('Oe', 'Ø')
    .replaceAll('Ae', 'Æ');
};

function correct(text) {
  return text
    .replace(/(i)sræl/gi, '$1srael')
    .replace(/(r)isikøn/gi, '$1isikoen');
};

function update(input , output) {
  return () => {
    const urls = /(https?:\/\/[^\s]+)/g;
    const cuts = input.value.split(urls).filter(Boolean);
    const fixt = cuts.map((cut, i) => urls.test(cut) ? cut : translate(cut));
    output.value = correct(fixt.join('').trim());
  }
}

addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#input');
  const output = document.querySelector('#output');
  output.addEventListener('focus', () => output.select());
  const refresh = update(input, output);
  addEventListener('keyup', refresh);
  addEventListener('input', refresh);
  refresh();
});
