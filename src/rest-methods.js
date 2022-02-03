import fetch from 'node-fetch';

const API_URL = process.env.API_URL;

const get = (endPoint, urlParams, requestInit = {}) => {
  return fetch(
    `${API_URL}/${endPoint}?${new URLSearchParams(urlParams).toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application-json',
      },
      ...requestInit,
    },
  );
};

const post = (endpoint, body, requestInit = {}) => {
  return fetch(`${API_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...requestInit,
  });
};

const put = (endpoint, body, requestInit = {}) => {
  return fetch(`${API_URL}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...requestInit,
  });
};

const patch = (endpoint, body, requestInit = {}) => {
  return fetch(`${API_URL}/${endpoint}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...requestInit,
  });
};

const deleteMethod = (endpoint, requestInit = {}) => {
  return fetch(`${API_URL}/${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    ...requestInit,
  });
};

(async () => {
  // GET
  //const users = await (await get('users')).json();
  //const user = await (await get('users/771')).json();
  //console.log(users);
  //console.log();
  //console.log(user);
  // POST
  /*
    const userPostResponse = await post('users', {
      id: '6000',
      firstName: 'Pedro',
      lastName: 'Henrique',
      userName: 'pedro_henrique81',
      indexRef: 1,
      createdAt: new Date(),
    });
    const userData = await userPostResponse.json();
    console.log(userData);
  */
  // PUT
  /*
    const userPutResponse = await put('users/6000', {
      id: '6000',
      firstName: 'Pedro',
      lastName: 'Henrique',
      userName: 'pedro_henrique81',
      indexRef: 1,
      createdAt: new Date(),
    });
    const userData = await userPutResponse.json();
    console.log(userData);
  */
  // PATCH
  /*
    const userPatchResponse = await patch('users/6000', {
      firstName: 'LUIZ',
      lastName: 'HENRIQUE',
    });
    const userData = await userPatchResponse.json();
    console.log(userData);
  */
  // DELETE
  /*
    const userDeleteResponse = await deleteMethod('users/6000');
    const userData = await userDeleteResponse.json();
    console.log(userData);
  */
})();
