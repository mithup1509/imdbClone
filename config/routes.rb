Rails.application.routes.draw do
  namespace :api do
    resources :reviewuser, only: [:index, :show, :create, :update, :destroy]
    resources :watchlist, only: [:index, :show, :create, :update, :destroy]
    resources :userreview, only: [:index, :show, :create, :update, :destroy]
    resources :moviedetail, only: [:index, :show, :create, :update, :destroy]
    resources :createaccount, only: [:index, :show, :create, :update, :destroy]
  end

  root "homepage#homepage"
  get "homepage/searchValue", to: "homepage#searchValue"
  
  get "signin",to:"signin#signin"
  get "signup",to:"signup#signup"
  get "movie/:id",to:"movie#movie"
  get "movieadd",to:"addmovie#movieadd"
  get "watchlist",to:"watchlist#watchlist"
  get "review/:id",to:"review#review"
  get "review/searchreview", to: "review#searchreview"
  get "yourrating",to:"yourratings#yourrating"
  get "forgetpass",to:"forgetpass#forgetpass"
  

  get '*unmatched_route', to: 'pagenotfound#pagenotfound'
  
end
