### fetch interceptor

```ts
function debug(endPoint: string, message?: string) {
  console.log(`Debug : ${endPoint} - ${message}`);
}

const get = async (endPoint: string) => {
  let response = null;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endPoint}`;

  response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    debug(endPoint, response.text.toString());
  }

  try {
    return await response.json();
  } catch (error) {
    return error;
  }
};

const post = async (endPoint: string, data: any) => {
  let response = null;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endPoint}`;

  response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    debug(endPoint, response.text.toString());
  }

  try {
    return await response.json();
  } catch (error) {
    return error;
  }
};

const put = async (endPoint: string, data: any) => {
  let response = null;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endPoint}`;

  response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    debug(endPoint, response.text.toString());
  }

  try {
    return await response.json();
  } catch (error) {
    return error;
  }
};

const del = async (endPoint: string) => {
  let response = null;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${endPoint}`;

  response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    debug(endPoint, response.text.toString());
  }

  try {
    return await response.json();
  } catch (error) {
    return error;
  }
};
```

###
