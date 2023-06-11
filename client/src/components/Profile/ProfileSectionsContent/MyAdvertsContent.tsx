import React, { ReactElement } from 'react';
import Tabs from '../../ContentTabs/Tabs';
import ContentTab from '../../ContentTabs/ContentTab';

type Props = {
  children: ReactElement[];
};

/**
 * Component that displays the content of MyAdverts section.
 */
const MyAdvertsContent: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Tabs>
        <ContentTab title="Buying Ads">
          Ciao bella, this is the container for the buying Ads
        </ContentTab>
        <ContentTab title="Selling Ads">
          Hola guys, this is the container for the selling Ads
        </ContentTab>
      </Tabs>
    </div>
  );
};

export default MyAdvertsContent;
