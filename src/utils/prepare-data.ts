export const getPreparedKeys = (body: Record<string, any>) =>
  Object.keys(body).join(',');

export const getPreparedValues = (body: Record<string, any>) =>
  Object.values(body)
    .map((el) => (typeof el === 'string' ? `'${el}'` : el))
    .join(',');
