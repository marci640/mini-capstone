class OrdersController < ApplicationController

  before_action :authenticate_user!
  
  def create
    @carted_products = current_user.carted_products.where(status: "carted")
    subtotal = 0
    @carted_products.each do |carted_product|
      subtotal += carted_product.quantity * carted_product.product.price
    end 

    tax = subtotal * 0.09
    total = subtotal + tax

    order = Order.create(
      user_id: current_user.id, 
      subtotal: subtotal, 
      tax: tax,
      total: total )

    @carted_products.update(status: "purchased", order_id: order.id)
    redirect_to "/orders/#{order.id}"
  end 

  def show
    @order = Order.find_by(id: params[:id])
    render :show 
  end 
end
