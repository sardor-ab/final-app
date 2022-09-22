const filterList = (items: any[], search: string) => {
  return items.filter(
    (item: { name: string; id: string }) =>
      item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
  );
};

export default filterList;
