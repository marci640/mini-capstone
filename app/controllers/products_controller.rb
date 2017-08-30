class ProductsController < ApplicationController
  
  def display_all_method
    @products_all = Product.all
  end 

end
