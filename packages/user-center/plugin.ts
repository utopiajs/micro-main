import { IApi } from '@umijs/max';

export default (api: IApi) => {
  api.modifyHTML(($) => {
    $('head').append(['<meta name="referrer" content="no-referrer" />']);
    return $;
  });
};
