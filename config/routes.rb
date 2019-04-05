Rails.application.routes.draw do

  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/failure'
  get 'pages/home'
  get 'social_home', :to => 'social_home#index'
  get 'social_home/messages', :to => 'social_home#messages'
  get 'social_home/messages/:id', :to => 'social_home#message_show'
  get 'share/:id', :to => 'share#index'

  get '/login', :to => 'sessions#new', :as => :login
  get '/logout', :to => 'sessions#logout'
  match '/auth/:provider/callback', :to => 'sessions#create', via: 'get'
  match '/auth/failure', :to => 'sessions#failure', via: 'get'

  #data
  get '/data/rewards', :to => "data#rewards"
  get '/data/reward/:id', :to => "data#reward"
  get '/data/feed', :to => "data#feed"
  get '/data/history', :to => "data#history"
  get '/data/messages', :to => "data#messages"
  post '/data/mark_message_as_read/:id', :to => "data#mark_message_as_read"
  get '/data/user_twitter_credentials', :to => "data#user_twitter_credentials"

  #
  post '/actions/share', :to => "actions#share"
  post '/actions/background_scan', :to => "actions#background_scan"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  match '/', :to => 'social_login#index', :constraints => CustomerDomainConstraint, via: :all
  match '/', :to => 'bounce#bounce', via: :all

  namespace :api do
    namespace :v1 do
      resources :rewards, only: [:index]
      resources :feed, only: [:index]
    end
  end

end
