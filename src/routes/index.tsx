import { Resource, component$, useContext, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { QuotesContext } from '~/context/quotes/QuotesContext';

export default component$(() => {
  const { quotesResource, firstAuthor } = useContext(QuotesContext);

  useTask$(({ track }) => {
    track(() => firstAuthor.value);

    // This is the problem. firstAuthor.value is empty even when I've changed it below.
    console.log('firstAuthor.value', firstAuthor.value);
  });
  return (
    <>
      <h1>First Author</h1>
      {/* This isnt working?? */}
      <p>- {firstAuthor.value}</p>

      <h2>Random Quotes</h2>
      <Resource
        value={quotesResource}
        onResolved={(quotes) => {
          // this it doesnt updating the signal of firstAuthor.value
          firstAuthor.value = quotes[0].author;

          // this is working but only on this scope
          console.log('inside onResolved', firstAuthor.value);
          return (
            <ul>
              {quotes.map((quote) => (
                <li key={quote._id}>
                  <blockquote>{quote.content}</blockquote>
                  <cite> - {quote.author}</cite>
                </li>
              ))}
            </ul>
          );
        }}
      />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
