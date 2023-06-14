class Api::UserreviewController < ApplicationController
  def index
    user=Userreview.all
    render json:user, status:200
  end

  def show
    user=Userreview.find_by(id:params[:id])
    if user
      render json:user, status:200
    else
      render json:{
        error:"no data found"
      }
    end
  end

  def create
    user=Userreview.new(
      movieid:review_params[:movieid],
      userid:review_params[:userid],
      review:review_params[:review],
      rating:review_params[:rating]
    )
    if user.save
      render json:user, status:200
      else
        render json:{
          error:"Error creation"
        }
    end
  end

  def update
    user=Userreview.find_by(id:params[:id])
    if user
      user.update(movieid:params[:movieid],userid:params[:userid],review:params[:review],rating:params[:rating])
     render json:user,status:200
    else
      render json:{
        error:"No data Found"
      }
    end
  end

  def destroy
    user=Userreview.find_by(id:params[:id])
    if user
      user.destroy
      render json:"deleted successfully"
      else
        render json:{
          error:"no data found"
        }
    end
  end

  def review_params
    params.require(:userreview).permit([
      :movieid,
      :userid,
      :review,
      :rating
    ])
  end
end
