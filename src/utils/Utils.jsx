import _ from 'lodash';
import { Z_MEM_ERROR } from 'zlib';

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
  },
  isUserLogin: () => {
    return sessionStorage.getItem('token') != undefined && sessionStorage.getItem('token') != 'null' && sessionStorage.getItem('token') != 'undefined';
  },
  getRandomProductImageUrl: () => {
    const imageUrls = [
      'https://cdn11.bigcommerce.com/s-1u1m3wn/images/stencil/800x722/products/2819/4760/Claire_3_seat_sofa_in_grey_fabric_contoured__27743.1529320539.jpg?c=2',
      'https://images.crateandbarrel.com/is/image/Crate/Yukon92inDiningTableSHF17_16x9/?$web_zoom_furn_hero$&170420125355&wid=1008&hei=567',
      'https://cdn-images.article.com/products/SKU438/2890x1500/image23620.jpg?w=2890',
      'https://images.dfs.co.uk/i/dfs/peace_1p_texturedweave_charcoal_view1',
      'https://cb2.scene7.com/is/image/CB2/HelixBookcaseAcaciaSHF16_16x9/?$web_zoom_furn_hero$&160721145020&wid=1008&hei=567',
      'https://cdn11.bigcommerce.com/s-1u1m3wn/images/stencil/1280x1280/products/2102/4346/Alice_coffee_table__42525.1528282765.jpg?c=2&imbypass=on',
      'https://www.livingspaces.com/globalassets/productassets/100000-199999/110000-119999/110000-110999/110500-110599/110507/110507_0.jpg?w=1911&h=1288&mode=pad',
      'https://hniesfp.imgix.net/8/images/detailed/123/2cr1.jpg?fit=fill&bg=0FFF&w=1500&h=1000&auto=format,compress',
      'https://images.dfs.co.uk/i/dfs/windsor_3a_windsorvelvet_yellow_view1',
      'https://s3.eu-west-1.amazonaws.com/sleeproom.assets.d3r.com/images/original/173429-so-you-young-bean-chesterfield-vintage-luxury-deep-british-sofa.jpg',
      'https://thumbor.plush.com.au/unsafe/1153x633/center/middle/smart/filters:sharpen(0.5,0.5,true)/https://www.plush.com.au/static/media/catalog/product/c/i/citti_1_lifestyle_images_2100x1050px_4.jpg'
    ]

    return _.sample(imageUrls);
  }
}

export default Utils;