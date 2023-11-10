import { ValueTransformer } from 'typeorm';

export const JsonType: ValueTransformer = {
  to: (entityValue: number) => {
    if (entityValue == null) {
      return null;
    }
    return JSON.stringify(entityValue);
  },
  from: (databaseValue: string | null): number => {
    if (databaseValue == null) {
      return null;
    }
    return JSON.parse(databaseValue);
  },
};
