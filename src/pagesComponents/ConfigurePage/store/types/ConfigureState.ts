import { type Product } from '@prisma/client';

type FilterObjectKey = keyof ConfigureState['filterObject'];
type FilterObjectValue<K extends FilterObjectKey> =
  ConfigureState['filterObject'][K];

export type ConfigureState = {
  configuration: {
    cpus: Product | null;
    motherboards: Product | null;
    rams: Product | null;
    gpus: Product | null;
    powers: Product | null;
    coolers: Product | null;
    ssds: Product | null;
    hdds: Product | null;
    cases: Product | null;
  };
  setConfigurationItem: (
    key: keyof ConfigureState['configuration'],
    value: Product,
  ) => void;
  clearConfiguration: () => void;

  filterObject: {
    socket: string[];
    memoryType: string[];
    formFactor: string[];
    withButton: boolean;
    withUpdateButton: boolean;
  };
  setFilterObjectItem: (
    newItems: Partial<{
      [K in FilterObjectKey]: FilterObjectValue<K>;
    }>,
  ) => void;
  setWithButton: (value: boolean) => void;
  setWithUpdateButton: (value: boolean) => void;
  clearFilterObject: () => void;

  configurationToUpdate: {
    cpus: Product | null;
    motherboards: Product | null;
    rams: Product | null;
    gpus: Product | null;
    powers: Product | null;
    coolers: Product | null;
    ssds: Product | null;
    hdds: Product | null;
    cases: Product | null;
  };
  setConfigurationToUpdateItem: (
    items: Partial<
      Record<keyof ConfigureState['configurationToUpdate'], Product>
    >,
  ) => void;
  clearConfigurationToUpdate: () => void;
};
