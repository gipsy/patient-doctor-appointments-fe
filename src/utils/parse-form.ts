export const parseForm = (data: string, validators: {[k: string]: any}) => {
  const rawData = data.split('\n').filter(patient => patient !== '');
  
  return rawData.map(item => {
    let results: any = {}
    item.split(',').forEach(data => {
      const trimmedData = data.trim();

      for (let [key, value] of Object.entries(validators)) {
        if (value.test(trimmedData)) results[key] = trimmedData
      }
    });
    return results
  });
}
