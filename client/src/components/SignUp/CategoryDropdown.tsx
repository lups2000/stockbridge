import { FC } from "react";
import { Dropdown } from "react-bootstrap";
import { palette } from "../../utils/colors";
import { PRODUCT_CATEGORY } from "../../api/collections/advert";

interface CategoryDropdownProps {
  category: string | undefined;
  onChangeCategory: (cat: string) => void;
}

const categories = Object.keys(PRODUCT_CATEGORY).filter((v) =>
  isNaN(Number(v))
) as (keyof typeof PRODUCT_CATEGORY)[];

/**
 * So far I'm not using it anymore but maybe it's useful
 */
export const CategoryDropdown: FC<CategoryDropdownProps> = (props) => {
  const { category, onChangeCategory } = props;

  return (
    <Dropdown>
      <Dropdown.Toggle
        style={{
          backgroundColor: "white",
          borderColor: palette.borderBoostrap,
          color: category ? "black" : palette.placeholderTextBootstrap,
        }}
      >
        {category ? category : "Select one category"}
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ overflowY: "scroll", maxHeight: 250 }}>
        {categories.map((category, index) => {
          const newCategory = category.replaceAll("_", " "); //just for design and user experience
          return (
            <Dropdown.Item key={index} onClick={() => onChangeCategory(newCategory)}>
              {newCategory}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
