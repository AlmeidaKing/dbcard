export const filterProps = (props: object, propsToFilter: string[]) =>
  Object.keys(props).reduce((acc, key) => {
    if (!propsToFilter.includes(key)) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
