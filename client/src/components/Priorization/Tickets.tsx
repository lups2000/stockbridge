import { palette } from '../../utils/colors';

const Tickets = (tickets: number) => {
  const numberRange: number[] = [];
  for (let i = 1; i <= tickets; i++) {
    numberRange.push(i);
  }
  return (
    <div>
      {numberRange.map((star) => (
        <span key={star} style={{ color: palette.subSectionsBgAccent }}>
          &#x25CF;
        </span>
      ))}
    </div>
  );
};

export { Tickets };
