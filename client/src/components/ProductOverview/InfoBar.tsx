import { FC } from 'react';

type InfoBarProps = {
  contentLine1: React.ReactNode;
  contentLine2: React.ReactNode;
  onClick: () => void;
};
const InfoBar: FC<InfoBarProps> = (props) => {
  return (
    <div
      style={{
        border: 'solid',
        borderColor: 'lightgray',
        borderRadius: '15px',
        justifyContent: 'start',
        width: '100%',
        cursor: 'pointer',
      }}
      onClick={props.onClick}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          paddingLeft: '30px',
          paddingTop: '30px',
          gap: '80%',
        }}
      >
        {props.contentLine1}
      </div>
      {props.contentLine2}
    </div>
  );
};

export { InfoBar };
