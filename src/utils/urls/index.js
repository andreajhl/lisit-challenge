export const createUrl = (url) => new URL(url);

export const getQuerysUrl = (url) => {
  const searchParams = new URLSearchParams(url);
  const querysAll = [...searchParams.entries()];

  const queryParams = querysAll.reduce((acc, [key, value]) => { 
    acc[key] = value;
    return acc;
  }, {});

  return queryParams;
};
