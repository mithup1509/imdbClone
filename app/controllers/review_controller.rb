class ReviewController < ApplicationController
    def review
        cookie_value = cookies[:user]
        if cookie_value
        parsed_cookie = JSON.parse(cookie_value)
    
        id = parsed_cookie["id"]
        article=Article.find_by(id:id)
        @users = JSON.parse(article.to_json)
        
    end
       
     
        
        @movies = Moviedetail.find_by(id: params[:id])
        @reviews = Userreview.all
    
        @moviereview=[]
        @movieuser=[]
        @reviews.each do |review|
        

            if  @movies.id==review.movieid
                article=Article.find_by(id:review.userid)
                @moviereview << { review: review, article: article }
            end
        end
   
    end




    
end
