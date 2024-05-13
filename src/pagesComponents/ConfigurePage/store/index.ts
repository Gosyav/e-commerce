import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type ConfigureState } from '~/pagesComponents/ConfigurePage/store/types/ConfigureState';

export const useConfigureStore = create<ConfigureState>()(
  persist(
    (set) => ({
      configuration: {
        cpus: null,
        motherboards: null,
        rams: null,
        gpus: null,
        powers: null,
        coolers: null,
        ssds: null,
        hdds: null,
        cases: null,
      },
      setConfigurationItem: (key, item) =>
        set((state) => ({
          configuration: { ...state.configuration, [key]: item },
        })),
      clearConfiguration: () =>
        set({
          configuration: {
            cpus: null,
            motherboards: null,
            rams: null,
            gpus: null,
            powers: null,
            coolers: null,
            ssds: null,
            hdds: null,
            cases: null,
          },
        }),

      filterObject: {
        socket: [],
        memoryType: [],
        formFactor: [],
        withButton: false,
        withUpdateButton: false,
      },
      setFilterObjectItem: (newItems) => {
        set((state) => ({
          filterObject: {
            socket: [],
            memoryType: [],
            formFactor: [],
            withButton: true,
            withUpdateButton: state.filterObject.withUpdateButton,
            ...newItems,
          },
        }));
      },
      setWithButton: (value) =>
        set((state) => ({
          filterObject: {
            ...state.filterObject,
            withUpdateButton: false,
            withButton: value,
          },
        })),
      setWithUpdateButton: (value) =>
        set((state) => ({
          filterObject: {
            ...state.filterObject,
            withButton: false,
            withUpdateButton: value,
          },
        })),
      clearFilterObject: () =>
        set((state) => ({
          filterObject: {
            socket: [],
            memoryType: [],
            formFactor: [],
            withButton: state.filterObject.withButton,
            withUpdateButton: state.filterObject.withUpdateButton,
          },
        })),
      configurationToUpdate: {
        cpus: null,
        motherboards: null,
        rams: null,
        gpus: null,
        powers: null,
        coolers: null,
        ssds: null,
        hdds: null,
        cases: null,
      },
      setConfigurationToUpdateItem: (items) =>
        set((state) => ({
          configurationToUpdate: {
            ...state.configurationToUpdate,
            ...items,
          },
        })),
      clearConfigurationToUpdate: () =>
        set({
          configurationToUpdate: {
            cpus: null,
            motherboards: null,
            rams: null,
            gpus: null,
            powers: null,
            coolers: null,
            ssds: null,
            hdds: null,
            cases: null,
          },
        }),
    }),
    {
      name: 'configureStore',
    },
  ),
);

export { type ConfigureState } from './types/ConfigureState';
