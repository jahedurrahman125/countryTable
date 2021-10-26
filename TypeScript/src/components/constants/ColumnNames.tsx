import { Column } from '../types/Types';

export const columns: readonly Column[] = [
  {
    id: 'flag',
    label: 'Flag',
    minWidth: 170
  },
  {
    id: 'name',
    label: 'Name',
    minWidth: 170
  },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
  },
  {
    id: 'languages',
    label: 'Language',
    minWidth: 170,
  },
  {
    id: 'region',
    label: 'Region',
    minWidth: undefined,
  },
];
