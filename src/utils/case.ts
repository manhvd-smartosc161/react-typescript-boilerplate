// Convert camelCase string to snake_case string
export const camelToSnake = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

// Convert object keys from camelCase to snake_case recursively
export const camelToSnakeKeys = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(camelToSnakeKeys);
  }

  if (typeof obj === 'object') {
    const converted: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const snakeKey = camelToSnake(key);
        converted[snakeKey] = camelToSnakeKeys(obj[key]);
      }
    }
    return converted;
  }

  return obj;
};
