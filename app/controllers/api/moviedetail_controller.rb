class Api::MoviedetailController < ApplicationController
  def index
    detail=Moviedetail.all
    render json:detail, status:200
  end

  def show
   
      search_value = params[:search_value]
      dropdown_value = params[:dropdown_value]

      if search_value==""
        detail=Moviedetail.all
        render json:detail, status:200
      else
        if dropdown_value == "all"
          movies = Moviedetail.where("title LIKE ? AND (movietype = ? OR movietype = ?)", "%#{search_value}%", "Movie", "Series")
          
          if movies.present?
            render json: movies, status: 200
          else
            render json: [], status: 404
          end
        elsif dropdown_value == "Movie"
  
          movies = Moviedetail.where("title LIKE ? AND movietype = ?", "%#{search_value}%", dropdown_value)
      
          if movies.present?
            render json: movies, status: 200
          else
            render json: [], status: 404
          end
        elsif dropdown_value == "series"
        
          series =Moviedetail.where("title LIKE ? AND movietype = ?", "%#{search_value}%", dropdown_value)
      
          if series.present?
            render json: series, status: 200
          else
            render json: [], status: 404
          end
        else
          detail = Moviedetail.find_by(id: params[:id])
    
          if detail
            render json: detail, status: 200
          else
            render json: [], status: 404
          end
        end
      end
    end

  def create
    detail=Moviedetail.new(
      title:moviedetail_params[:title],
      runtime:moviedetail_params[:runtime],
      plot:moviedetail_params[:plot],
      actors:moviedetail_params[:actors],
      director:moviedetail_params[:director],
      language:moviedetail_params[:language],
      released:moviedetail_params[:released],
      writer:moviedetail_params[:writer],
      country:moviedetail_params[:country],
      genre:moviedetail_params[:genre],
      poster:moviedetail_params[:poster],
      movietype:moviedetail_params[:movietype],
      rating:moviedetail_params[:rating],
    )
    if detail.save
      render json:detail, status:200
      else
        render json:{
          error:"error crete"
        }
        end
  end

  def update
  end

  def destroy
    detail=Moviedetail.find_by(id:params[:id])
    if detail
      detail.destroy
      render json:"deleted successfully"
    else
      render json:{
        error:"no data found"
      }
    end
  end
  def moviedetail_params
    params.require(:moviedetail).permit([
       :title,
       :runtime,
       :plot,
       :actors,
       :director,
       :language,
       :released,
       :writer,
       :country,
       :genre,
       :poster,
       :movietype,
      :rating
     ])
  end
end
