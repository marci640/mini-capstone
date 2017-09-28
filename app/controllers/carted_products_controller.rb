class CartedProductsController < ApplicationController
  before_action :authenticate_user!

  def create
    carted_product = CartedProduct.create(
      user_id: current_user.id,
      product_id: params[:product_id],
      quantity: params[:quantity],
      status: "carted"
      )
    redirect_to "/cartedproducts"
  end 

  def index
    if current_user.carted_products.where(status: "carted").any?
      @carted_products = current_user.carted_products.where(status: "carted")
    render :index
    else
      flash[:warning] = "You have no items in your cart."
      redirect_to "/products"
    end
  end 

  def destroy
    carted_product = CartedProduct.find(params[:id])
    carted_product.update(status: "removed")
    flash[:success] = "Product removed from cart."
    redirect_to "/cartedproducts"
  end 
     

end
