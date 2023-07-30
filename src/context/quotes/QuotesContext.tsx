import {
  type ResourceReturn,
  createContextId,
  type Signal,
} from '@builder.io/qwik';
import type { QuotesResponse } from '~/interfaces/QuotesResponse';

type QuotesContextType = {
  quotesResource: ResourceReturn<QuotesResponse[]>;
  firstAuthor: Signal<string>;
};

export const QuotesContext =
  createContextId<QuotesContextType>('QuotesContext');
