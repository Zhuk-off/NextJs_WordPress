import { FRONTEND_SITE_URL } from './constants';

/** Use to modify page URLs from backend to frontend. 
 * The default WordPress tools don't work. 
 * When creating a post, an error occurs in WordPress. */

export const modifyUrlBackendToFrontend = (data: object) => {
  modifyUrl(data);

  function modifyUrl(data: object) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (typeof element === 'object') {
          modifyUrl(element);
        } else {
          let result = key.match(/^url$/);
          if (result) {
            if (typeof element === 'string') {
              const elementReplaced = element.replace(
                process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
                FRONTEND_SITE_URL
              );
              console.log('element replace', elementReplaced);
              data[key] = elementReplaced;
            }
          }
        }
      }
    }
  }

  return data;
};
