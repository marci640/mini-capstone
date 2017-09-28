class ProductsController < ApplicationController
  
  before_action :authenticate_admin!, except: [:index, :show, :search]
  
  def index
    # @cart_count = current_user.carted_products.where(status: "carted").count 

    @products = Product.all
    
      if params[:sort]
        @products = Product.all.order(params[:sort])
      end 

      if params[:sort_high]
        @products = Product.all.order(params[:sort_high] => :desc)
      end 

      if params[:discount]
        @products = Product.where("price < ?", 2.00)
      end 

      if params[:category]
        @products = Category.find_by(title: params[:category]).products 
      end

    render "index.html.erb"
  end 

  def new
    @product = Product.new
    render "new.html.erb"   
  end 

  def create
      @product = Product.new({
        name: params[:name],
        price: params[:price],
        description: params[:description],
        supplier_id: 1
        })
      if @product.save
        flash[:success] = "Successfully added new product."
        redirect_to "/products/#{@product.id}"
      else 
        render :new
      end 
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
    @product = Product.find(params[:id])
    @product.name = params[:name]
    @product.price = params[:price]
    @product.description = params[:description]
    if @product.save
      flash[:info] = "Product successfully updated."
      redirect_to "/products/#{product.id}"
    else 
      render :edit
    end 
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
