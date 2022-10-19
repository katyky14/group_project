from flask import Blueprint, request
from ..forms.search_form import SearchForm
from ..models import Product

search_routes = Blueprint('search', __name__)

@search_routes.route('/', methods=['GET', 'POST'])
def search_products():
    searchForm = SearchForm()
    searchForm['csrf_token'].data = request.cookies['csrf_token']
    if searchForm.validate_on_submit():
        query = searchForm.data['search']
        searchResult = Product.query.filter(Product.name.ilike(f'%{query}%')).all()
        if searchResult:
            return {'products': [product.to_dict_product() for product in searchResult]}
        else:
            return {'products': {}}
    return searchForm.errors
