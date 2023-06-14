class HomepageController < ApplicationController
  def homepage 
    @allmovies = Moviedetail.limit([8, Moviedetail.count].min)
  end 

  def searchValue
    search = params[:search]
    filtertype = params[:filtertype]
    dropdown = params[:dropdown]
    sorttype = params[:sorttype]

    movies = if filtertype == "2000"
      Moviedetail.where("title LIKE ? AND released <= ?", "%#{search}%", Date.parse("2000-12-31"))
    elsif filtertype == "2001-2010"
      Moviedetail.where("title LIKE ? AND released BETWEEN ? AND ?", "%#{search}%",Date.parse("2001-12-31"),Date.parse("2010-12-31") )
    elsif filtertype == "2011"
      Moviedetail.where("title LIKE ? AND released >= ?", "%#{search}%",Date.parse("2011-12-31") )
    else
      Moviedetail.where("title LIKE ?", "%#{search}%")
    end

    movies = movies.where(movietype: dropdown) if dropdown != "all"

    movies = case sorttype
             when "title"
               movies.order(title: :asc)
             when "year"
               movies.order(released: :asc)
             else
               movies
             end



    if movies.present?
      max_movies = [movies.count, 8].min
  filtered_movies = movies.limit(max_movies)
  @allmovies = filtered_movies
      partial = render_to_string(partial: "homepage/partialhome")
      render json: { success: true, movie: partial }
    else
      render json: [], status: 404
    end
  end
end
