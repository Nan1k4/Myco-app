import { formatMonthsLabel } from '../../copy.pl';

describe('formatMonthsLabel', () => {
  it('obsługuje gatunki zimowe owocnikujące na przełomie roku', () => {
    expect(formatMonthsLabel([1, 2, 3, 10, 11, 12])).toBe('paź-mar');
    expect(formatMonthsLabel([9, 10, 11, 12, 1, 2, 3, 4])).toBe('wrz-kwi');
    expect(formatMonthsLabel([12, 1])).toBe('gru-sty');
  });

  it('obsługuje pełny rok, pojedynczy miesiąc i zwykły zakres', () => {
    expect(formatMonthsLabel([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).toBe('sty-gru');
    expect(formatMonthsLabel([8])).toBe('sie');
    expect(formatMonthsLabel([6, 7, 8, 9, 10])).toBe('cze-paź');
  });

  it('łączy dwa osobne sezony z uwzględnieniem zawinięcia', () => {
    expect(formatMonthsLabel([4, 5, 9, 10])).toBe('kwi-maj, wrz-paź');
    expect(formatMonthsLabel([11, 12, 1, 4, 5])).toBe('lis-sty, kwi-maj');
  });
});
