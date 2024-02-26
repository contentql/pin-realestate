export const isParentActive = (children: any, path: any) => {
  if (!children && !path) {
    return false;
  }
  return children.some((item: any) =>
    item.path?.split("/")[1] === path.split("/")[1]
      ? true
      : item?.subMenu?.some(
          (item2: any) => item2.path?.split("/")[1] === path.split("/")[1]
        )
  );
};
