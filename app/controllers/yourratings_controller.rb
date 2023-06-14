class YourratingsController < ApplicationController
    def yourrating

        cookie_value = cookies[:user]
        if cookie_value
            parsed_cookie = JSON.parse(cookie_value)
            id = parsed_cookie["id"]
        end

        @userallreviews = []
        allmoviereviewsperuser=Userreview.all

        allmoviereviewsperuser.each do |element|
            if element.userid==id && !element.rating.nil?
                @userallreviews << element
            end
        end

        @movieallreviews=[]

        @userallreviews.each do |review|

            movie = Moviedetail.find_by(id:review.movieid)
            @movieallreviews << {movie:movie,review:review}
        end


    end
   
end
