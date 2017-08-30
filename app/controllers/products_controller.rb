class ProductsController < ApplicationController
  
  def display_all_method
    @products = Product.all
    render "display_all.html.erb"
  end 

end
