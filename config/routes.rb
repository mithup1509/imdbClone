Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#signup"
  root "homepage#homepage"
  get "signin",to:"signin#signin"
  get "signup",to:"signup#signup"
  get "movie/:id",to:"movie#movie"
  get "movieadd",to:"addmovie#movieadd"
  
end
