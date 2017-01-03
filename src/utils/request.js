const Ajax = require("robe-ajax")
const IP="http://115.28.77.70:8080/";
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  if (options.cross) {
    return Ajax.getJSON("http://query.yahooapis.com/v1/public/yql", {
      q: "select * from json where url=\'"+url+"?"+Ajax.param(options.data)+"\'",
      format: "json"
    })
  } else {
    return Ajax.ajax({
      url: IP+url,
      method: options.method || 'get',
      data: options.data || {},
      processData: true,
      dataType: 'JSON',
      crossDomain:true,
    }).done((data) => {
      return data
    })
  }
}
