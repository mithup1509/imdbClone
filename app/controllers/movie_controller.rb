class MovieController < ApplicationController
    def movie 
        @detail = Moviedetail.find_by(id:params[:id])
      
   
        @userreviews = Userreview.all
        movieid = params[:id].to_i
     

        cookie_value = cookies[:user]
        if cookie_value
            parsed_cookie = JSON.parse(cookie_value)
            id = parsed_cookie["id"]
            movieid = params[:id].to_i
            @movieallreviews =[]
            @userreviews.each do |review|
    
                if  review.movieid==movieid && review.userid==id
                    @movieallreviews << review
                end



            end
      
         
        end
        
        @rate=0.0
        i=0
        @userreviews.each do |review|

            if  review.movieid==movieid 
                if review.rating
                    i +=1
                    @rate += review.rating
                end
            end
        end

              if i==0 || @rate.nil?
                @rate=0
            else
                @rate/=i
            end
      
    end
end
