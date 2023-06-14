class Api::WatchlistController < ApplicationController
  def index
    user=Watchlist.all
    render json:user,status:200
  end

  def show
user=Watchlist.find_by(id:params[:id])
if user
  render json:user,status:200
else
  render json:{
    error:"no data found"
  }
end

  end

  def create
 user=Watchlist.new(
  movieid:watchlist_params[:movieid],
  userid:watchlist_params[:userid]
 )
 if user.save
  render json:user,status:200
 else
  render json:{
    error:"error creation"
  }
 end

  end

  def update
  end

  def destroy
    user =Watchlist.find_by(movieid:params[:id])
    if user
      user.destroy
      render json:"deleted successfully"
      else
        render json:{
          error:"no data found"
        }
      end
  end

  def watchlist_params
    params.require(:watchlist).permit([
      :movieid,
      :userid,
     
    ])
  end
end
