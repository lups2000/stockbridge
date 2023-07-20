import { palette } from '../../utils/colors';
import { BodyText } from '../Text/BodyText';

const Tickets = (tickets: number) => {
  const numberRange: number[] = [];
  for (let i = 1; i <= tickets; i++) {
    numberRange.push(i);
  }
  return (
    <div>
      {tickets > 20 ? (
        <BodyText>{tickets} tickets</BodyText>
      ) : (
        numberRange.map((star) => (
          <span key={star} style={{ color: palette.subSectionsBgAccent }}>
            &#x25CF;
          </span>
        ))
      )}
    </div>
  );
};

export { Tickets };
