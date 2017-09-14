class ProductsController < ApplicationController
  
  def index
    @products = Product.all
    sort_attribute = params[:sort]
    sort_high_attribute = params[:sort_high]
    
    
      if sort_attribute
        @products = Product.all.order(sort_attribute)
      end 

      if sort_high_attribute
        @products = Product.all.order(sort_high_attribute => :desc)
      end 

      if params[:discount]
        @products = Product.where("price < ?", 2.00)
      end 

    render "index.html.erb"
  end 

  def new
    render "new.html.erb"
  end 

  def create
    new_product = Product.new({
      name: params[:name],
      price: params[:price],
      image: params[:image],
      description: params[:description],
      supplier_id: 1
      })
    new_product.save
    flash[:success] = "Successfully added new product."
    redirect_to "/products/#{new_product.id}"
  end 

  def show
    @product = Product.find(params[:id]) 
    render "show.html.erb"
  end 

  def edit
    @product = Product.find(params[:id])
    render "edit.html.erb"
  end 

  def update
    product = Product.find(params[:id])
    product.update(
      name: params[:name],
      price: params[:price],
      description: params[:description]
      )
    flash[:info] = "Product successfully updated."
    redirect_to "/products/#{product.id}"
  end 

  def destroy
    product = Product.find(params[:id])
    product.destroy
    flash[:warning] = "Product succesfully deleted."
    redirect_to "/products"
  end 

  def search 
    @products = Product.where("name LIKE ?","%#{params[:search]}%")
    render "index.html.erb"
  end 

end
