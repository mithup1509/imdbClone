class Api::CreateaccountController < ApplicationController
  def index
    article=Article.all
    render json:article, status:200
  end

  def show
    article=Article.find_by(id:params[:id])
    if article
      render json:article, status:200
    else
      render json:{
        error:"No data Found"
      }
    end

  end

  def create
    article=Article.new(
      username:account_params[:username],
      email:account_params[:email],
      password:account_params[:password],
  

    )
    if article.save
      render json: article, status:200
    else
      render json:{
        error:"Error in Creating"
      }
    end
  end


  def update
    article=Article.find_by(id:params[:id])
    
    if article
      role=params[:role]
      password=params[:password]
      if role
        article.update(role:role)
      elsif password
        article.update(password:password,role:article.role)
      end
      
      render json:article,status:200
    else
      render json:{
        error:"No data Found"
      }
    end
    end

  def destroy
    article=Article.find_by(id:params[:id])
    if article
      article.destroy
      render json:"deleted successfully"
    else
      render json:{
        error:"no data found"
      }
    end
  end

  def account_params
    params.require(:createaccount).permit([
      :username,
      :email,
      :password,
   
    ])
  end

end
