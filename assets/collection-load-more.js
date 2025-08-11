const products_on_page = document.getElementById('product-grid');
const nextUrl = document.getElementById('paginateNext');
let next_url = nextUrl.dataset.nextUrl;
let page = 3;

const load_more_btn = document.getElementsByClassName('load-more_btn')[0];
const load_more_spinner = document.getElementsByClassName('load-more_spinner')[0];
async function getNextPage() {
  try {
    let res = await fetch(next_url);
    return await res.text();
  } catch (error) {
    console.log(error);
  }
}

async function loadMoreProducts() {
  load_more_btn.style.display = 'none';
  load_more_spinner.style.display = 'block';
  let nextPage = await getNextPage();
  const parser = new DOMParser();
  const nextPageDoc = parser.parseFromString(nextPage, 'text/html');

  load_more_spinner.style.display = 'none';

  const productgrid = nextPageDoc.getElementById('product-grid');
  const new_products = productgrid.getElementsByClassName('grid__item');
  const newUrl = document.getElementById('paginateNext');
  const total_page = newUrl.dataset.totalPage;
  const new_url = next_url.split("page=")[0]+"page="+page;
  if (new_url && new_products.length) {
    load_more_btn.style.display = 'flex';
  }
  const length = new_products.length
  for (let i = 0; i < length; i++) {
    products_on_page.appendChild(new_products[0]);
  }
  next_url = new_url;
  page++;
}