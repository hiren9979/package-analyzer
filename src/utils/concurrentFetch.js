// Concurrent fetch with limit to avoid rate limiting
export async function fetchWithConcurrency(items, fetchFn, concurrency = 5) {
  const results = [];
  const executing = [];
  
  for (const [index, item] of items.entries()) {
    const promise = fetchFn(item, index).then((result) => {
      results[index] = result;
      executing.splice(executing.indexOf(promise), 1);
      return result;
    });
    
    results[index] = promise;
    executing.push(promise);
    
    if (executing.length >= concurrency) {
      await Promise.race(executing);
    }
  }
  
  return Promise.allSettled(results);
}