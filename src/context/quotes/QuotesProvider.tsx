import {
  Slot,
  component$,
  useContextProvider,
  useResource$,
  useSignal,
} from '@builder.io/qwik';
import { QuotesContext } from './QuotesContext';
import { server$ } from '@builder.io/qwik-city';
import type { QuotesResponse } from '~/interfaces/QuotesResponse';

export const QuotesProvider = component$(() => {
  const firstAuthor = useSignal('');

  const quotesResource = useResource$(async () => {
    return await server$(async () => {
      const resp = await fetch(
        'https://api.quotable.io/quotes/random?limit=10'
      );
      const quotes = (await resp.json()) as QuotesResponse[];

      // here doesnt work too
      // firstAuthor.value = quotes[0].author;
      return quotes;
    })();
  });

  useContextProvider(QuotesContext, {
    quotesResource,
    firstAuthor,
  });
  return <Slot />;
});
