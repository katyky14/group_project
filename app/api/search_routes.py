from flask import Blueprint, request
from ..forms.search_form import SearchForm
from ..models import Product

search_routes = Blueprint('search', __name__)

@search_routes.route('/')
def search_products():
    searchForm = SearchForm()
    if searchForm.validate_on_submit():
        query = searchForm.data['search']
        searchResult = Product.query.filter(Product.name.ilike(f'%{query}%')).all()
        if searchResult:
            return {'products': [product.to_dict_product() for product in searchResult]}
        else:
            return {'products': {}}
    return searchForm.errors
