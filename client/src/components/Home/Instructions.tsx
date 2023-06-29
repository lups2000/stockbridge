/* eslint-disable no-lone-blocks */
import { palette } from '../../utils/colors';
import { ColoredLine } from '../ColoredLine';
import { Title } from '../Text/Title';
import { StepDescription } from './StepDescription';
import howWorks1 from '../../assets/howWorks1.svg';
import howWorks2 from '../../assets/howWorks2.svg';
import howWorks3 from '../../assets/howWorks3.svg';
import howWorks4 from '../../assets/howWorks4.svg';
import howWorks5 from '../../assets/howWorks5.svg';
import howWorks6 from '../../assets/howWorks6.svg';
import useMediaQuery from '../../hooks/useMediaQuery';

interface Step {
  message: string;
  icon: string;
}

interface StepDescriptionInterface {
  userType: string;
  steps: Step[];
}

const stepDescription: StepDescriptionInterface[] = [
  {
    userType: 'Buyer',
    steps: [
      {
        message: 'Search for what you are looking for.',
        icon: howWorks1,
      },
      {
        message: 'Wait for offers from customers.',
        icon: howWorks2,
      },
      {
        message: 'Accept an offer and finalize the deal.',
        icon: howWorks3,
      },
    ],
  },
  {
    userType: 'Seller',
    steps: [
      {
        message: 'Post your advertisement.',
        icon: howWorks4,
      },
      {
        message: 'Wait for offers from customers.',
        icon: howWorks5,
      },
      {
        message: 'Accept an offer and finalize the deal.',
        icon: howWorks6,
      },
    ],
  },
];

const Instructions = () => {
  const matches = useMediaQuery('(min-width: 1000px)');

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: palette.subSectionsBgLighter,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 70,
        paddingBottom: 50,
      }}
    >
      <Title
        style={{
          textAlign: 'center',
          fontSize: 28,
          color: 'black',
          fontWeight: 500,
          paddingTop: 50,
          marginBottom: -60,
        }}
      >
        HOW IT WORKS
      </Title>
      <ColoredLine color={palette.subSectionsBgAccent} height={5} width={60} />
      <div
        style={{
          display: 'flex',
          flexDirection: matches ? 'column' : 'row',
          gap: matches ? 20 : 100,
        }}
      >
        {stepDescription.map((obj, idx) => {
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: matches ? 'row' : 'column',
                gap: matches ? 70 : 20,
              }}
            >
              <div
                style={{
                  width: 200,
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 25,
                  fontWeight: 500,
                }}
              >
                {obj.userType}
              </div>
              {obj.steps.map((step, index) => {
                return (
                  <StepDescription
                    key={index}
                    number={index + 1}
                    message={step.message}
                    icon={step.icon}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Instructions };
