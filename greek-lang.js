const request = (word) =>
  fetch(
    `http://greeklang.ru/srchajax/?lookword=${encodeURI(word)}&action=lookword&isajax=true`,

    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest'
      },
      mode: 'no-cors',
    },
  ).then(console.log)
