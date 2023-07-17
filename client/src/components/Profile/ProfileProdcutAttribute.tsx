import { BodyText } from '../Text/BodyText';
import React, { useEffect, useRef } from 'react';

type ProfileProdcutAttributeProps = {
  name: string;
  value?: string | number | Date;
  unit?: string;
  border?: boolean;
  margin?: string;
  fontSize?: string;
  highlight? : string;
};
const ProfileProdcutAttribute: React.FC<ProfileProdcutAttributeProps> = (props) => {
  const textRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const node = textRef.current;
        if (node) {
          // Reset the div's content before adding new text
          node.innerHTML = '';
            const textNode = document.createTextNode(props.value as string);
            node.appendChild(textNode);

            if (props.highlight && props.highlight?.trim()) {
                const innerHTML = node.innerHTML;
                const index = innerHTML.toLocaleLowerCase().indexOf(props.highlight.toLowerCase());
                if (index >= 0) { 
                    node.innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index, index+props.highlight.length) + "</span>" + innerHTML.substring(index + props.highlight.length);
                }
            }
        }
    }, [props.value, props.highlight]);

  return (
    <div
      style={{
        marginTop: props.margin ? props.margin : '',
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'start',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        gap: '10%',
        color: 'black',
      }}
    >
      <BodyText
        style={{
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          //width: '100%',
          fontSize: props.fontSize ? props.fontSize : '20px',
        }}
      >
        {props.name}:
      </BodyText>
      {
        props.highlight ? <div
        className="font-link"
        style={{
          width: '100%',
          fontFamily: 'Poppins',
          font: 'light',
          fontSize: props.fontSize ? props.fontSize : '20px',
          marginBottom: "0.8em"
        }}
        ref={textRef}
      >
      </div> : <BodyText
        style={{
          width: '100%',
          //height: props.border ? '40px' : '',
          //borderRadius: '10px',
          //border: props?.border ? '3px solid black' : '',
          //textAlign: props.border ? 'center' : 'start',
          //justifyContent: 'start',
          fontFamily: 'Poppins',
          font: 'light',
          fontSize: props.fontSize ? props.fontSize : '20px',
        }}
      >
        {`${props?.value} ${props?.unit ? props?.unit : ''}`}
      </BodyText>
      }
      
    </div>
  );
};

export { ProfileProdcutAttribute };
