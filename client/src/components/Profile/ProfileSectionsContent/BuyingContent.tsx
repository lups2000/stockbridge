import React, { ReactElement } from 'react';
import Tabs from '../../ContentTabs/Tabs';
import ContentTab from '../../ContentTabs/ContentTab';
import ProductInfoBar from '../ProductInfoBar';

const products: {
  imageUrl: string;
  name: string;
  date: string;
  quantity: number;
  price: number;
}[] = [
  {
    imageUrl: 'https://placebear.com/g/200/200',
    name: 'Product Name',
    date: '01/01/2023',
    quantity: 10,
    price: 99.99,
  },

  {
    imageUrl: 'http://via.placeholder.com/120x120&text=image2',
    name: 'Product Testing Name 2',
    date: '01/01/2010',
    quantity: 100,
    price: 15,
  },
];

type Props = {
  children: ReactElement[];
};

/**
 * Component that displays the content of Buying section.
 */
const BuyingContent: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Tabs>
        <ContentTab title="Orders">
          {products.map((product, index) => {
            return (
              <ProductInfoBar
                imageUrl={product.imageUrl}
                name={product.name}
                date={product.date}
                quantity={product.quantity}
                price={product.price}
              />
            );
          })}
        </ContentTab>

        <ContentTab title="Incoming Offers">
          Hola guys, this is the container for the incoming offers
        </ContentTab>
        <ContentTab title="Outgoing Offers">
          Servus amigos, this is the container for the outgoing offers
        </ContentTab>
      </Tabs>
    </div>
  );
};

export default BuyingContent;
