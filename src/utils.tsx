import { ISelectItem } from "./Select";

interface IProps {
  items?: ISelectItem[];
  search?: string;
}
const filterList = (items: any[], search: string) => {
  return items.filter((item: any) => item === search);
};

export default filterList;
