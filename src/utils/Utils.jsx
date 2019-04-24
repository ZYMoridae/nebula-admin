const Utils = {
  addToken: (options) => {
    let token = sessionStorage.getItem('token');
    let tokenOption = {};
    if(token !== undefined) {
      tokenOption = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
    return Object.assign({}, options, tokenOption);
  }
}

export default Utils;